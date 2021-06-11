---
title: Deployments
description: How systems are deployed at Artsy
---

# Deployment at Artsy

## Goals

- _Safe_: Only successfully-tested code should be deployed. Deploying should be _graceful_. I.e., shouldn't impact
  availability of the service.
- _Repeatable_: The result of a deploy should be consistent no matter the state of the developer's local
  environment, the particulars of a code change, the state of data, volume of traffic, etc.
- _Visible_: It should be transparent what deploy is happening when (and by whom...). An audit trail and
  instrumentation can be helpful in diagnosing production issues and interpreting monitoring results.
- _Simple_: Other things being equal, we prefer simple deployment operations whose impact can be easily understood
  by developers who may have to consider how to undo a change or its impact on other systems.
- _Independent_: Releases should be chunked and sequenced such that any one system can be updated independently of
  others.
- _Reversible\*_: We should be able to roll back a deploy while keeping the state of the system stable and
  consistent. (This may also include associated changes such as to dependencies or configuration.)
- _Consistent\*_: Ideally the deployment operation is the same whether a change includes just code, updated
  configuration, data migrations, or dependencies.
- _Fast\*_: Other things being equal, we prefer deploys to be fast so we can deploy regularly and focus on other
  things.

_\*Not all of these goals are routinely achieved._

## Recommendations

- Pull requests undergo the full test suite and any other linting or coverage steps imposed by the project.
- Once merged to the `master` branch and successfully tested/built, changes are automatically pushed to the
  container registry and deployed to staging by CI steps.
- Any necessary pre-deploy steps (such as migrations) or post-deploy steps occur automatically during the deploy.
- A `staging` branch is updated based on each deploy to the staging environment.
- Opening, reviewing, and merging a pull request from the `staging` to the `release` branch triggers a promotion
  from the staging to production environment (i.e., a release).
- For visibility, announce any production releases in [#dev](https://artsy.slack.com/messages/dev).

## Tools

We use the [hokusai](hokusai.md) tool to drive this process via
[CircleCI](https://app.circleci.com/projects/project-dashboard/github/artsy). The
[artsy/artsy-hokusai-templates](https://github.com/artsy/artsy-hokusai-templates) project provides solid starting
points for `.circleci/config.yml` and other configuration files. The
[artsy/hokusai orb](https://github.com/artsy/orbs/tree/master/src/hokusai) packages up the common steps for
convenient reuse. See
[Convection's .circleci/config.yml](https://github.com/artsy/convection/blob/master/.circleci/config.yml) for a
complete example.

We use [horizon](https://github.com/artsy/horizon/) to poll for the status of our deployments and visualize them as
a dashboard. See [its instructions](https://github.com/artsy/horizon#adding-a-new-project) for defining a new
project and configuring release pull requests to be opened [and optionally merged] automatically.

If a project should _not_ be released for any reason (such as needing QA or known issues in staging),
[create a deploy block](https://github.com/artsy/horizon#add-a-deploy-block) to record the reason and timing. The
[artsy/release](https://github.com/artsy/orbs/blob/master/src/release/release.yml) orb defines a `block` step that
will respect any unresolved deploy blocks and cause release builds to short-circuit.

If a project strays from these common practices, it's _especially_ important to document the correct process in its
README.

## Setting up a project in CircleCI

- See [CircleCI's docs](https://circleci.com/docs/2.0/getting-started/#section=getting-started) for general set-up
  steps.
- Artsy's project templates depend on write access to the repo (in order to push branches from CI steps). To create
  a _read+write Github key_ for CircleCI (rather than the default read-only key):
  - Generate a key with a helpful label: `ssh-keygen -t rsa -b 4096 -m PEM -C "github_rw_key_for_circle"` (provide
    a blank passphrase).
  - Log into Github as the `artsyit` user and, in the project's settings, go to _Deploy keys_ > _Add deploy key_.
    Give the key a descriptive name (like the label above) and paste in the contents of the _public_ (`.pub`) key
    file.
  - Check the _Allow write access_ box and click the _Add key_ button to save the new key.
  - In the CircleCI project settings, go to _Additional SSH Keys_ > _Add SSH Key_.
  - Enter `github.com` for _Hostname_ and the contents of the _private_ key file for _Private Key_, then click _Add
    SSH Key_ to save.
  - If necessary, add the ssh key fingerprint to your `.circleci/config.yml` following the instructions [here](https://circleci.com/docs/2.0/configuration-reference/#add_ssh_keys).
  - The default read-only key under _Checkout SSH Keys_ is still required for Circle to checkout the repo, so don't delete.
- In the projects' settings, generally speaking:
  - _build forked pull requests_ should be enabled
  - _pass secrets to builds from forked pull requests_ should be disabled

## "Hot" fixes and roll-backs

Sometimes there are urgent fixes to release. We always prefer using the typical pipeline to "roll forward," even in
cases of reverted PRs or timely fixes. When it's critical to avoid the delay of a full CI run or staging deploy,
it's possible to simply `hokusai production deploy <tag>` where _tag_ is an image tag (including git SHAs) and can
refer to a previous release such as `production--2018-09-25--10-19-2`. (Run `hokusai registry images` to see recent
tags.) Projects that depend on other release operations (e.g., to compile assets or update configuration) may
require additional steps.

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
- _Continuous_: Releases should not require manual involvement by engineers. Release increments should be small and
  tests, builds, migrations, and other safeguards should be sufficient to ensure most releases can be unattended.
- _Reversible\*_: We should be able to roll back a deploy while keeping the state of the system stable and
  consistent. (This may also include associated changes such as to dependencies or configuration.)
- _Consistent\*_: Ideally the deployment operation is the same whether a change includes just code, updated
  configuration, data migrations, or dependencies.
- _Fast\*_: Other things being equal, we prefer deploys to be fast so we can deploy regularly and focus on other
  things.

_\*Not all of these goals are routinely achieved._

## Recommendations

- Pull requests undergo the full test suite and any other linting or coverage steps imposed by the project.
- Once merged to the `main` branch and successfully tested/built, changes are automatically pushed to the container
  registry and deployed to staging by CI steps.
- Any necessary pre-deploy steps (such as migrations) or post-deploy steps occur automatically during the deploy.
- A `staging` branch is updated based on each deploy to the staging environment.
- Opening, reviewing, and merging a pull request from the `staging` to the `release` branch triggers a promotion
  from the staging to production environment (i.e., a release).
- Whenever possible, production releases should proceed automatically, typically after having been open for 24
  hours.
- For visibility, announce any manual production releases in [#dev](https://artsy.slack.com/messages/dev).

## Tools

We use the [hokusai](hokusai.md) tool to drive this process via
[CircleCI](https://app.circleci.com/projects/project-dashboard/github/artsy). The
[artsy/artsy-hokusai-templates](https://github.com/artsy/artsy-hokusai-templates) project provides solid starting
points for `.circleci/config.yml` and other configuration files. The
[artsy/hokusai orb](https://github.com/artsy/orbs/tree/master/src/hokusai) packages up the common steps for
convenient reuse. See
[Convection's .circleci/config.yml](https://github.com/artsy/convection/blob/master/.circleci/config.yml) for a
complete example.

We use [horizon](https://github.com/artsy/horizon/) to visualize the status of our deployments and automatically
open and [usually] merge production release PRs. See
[its instructions](https://github.com/artsy/horizon#adding-a-new-project) for defining a new project and
configuring deployment steps, including Slack channels to notify prior to releases.

If a project should _not_ be released for any reason (such as needing QA or known issues in staging),
[create a deploy block](https://github.com/artsy/horizon#adding-a-deploy-block) to record the reason and timing.
The [artsy/release](https://github.com/artsy/orbs/blob/master/src/release/release.yml) orb defines a `block` step
that will respect any unresolved deploy blocks and cause release builds to short-circuit.

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
  - If necessary, add the ssh key fingerprint to your `.circleci/config.yml` following the instructions
    [here](https://circleci.com/docs/2.0/configuration-reference/#add_ssh_keys).
  - The default read-only key under _Checkout SSH Keys_ is still required for Circle to checkout the repo, so don't
    delete.
- In the CircleCI project settings, navigate to the advanced tab. Generally speaking you should:
  - Enable the option to _Build forked pull requests_.
  - Disable the option to _Pass secrets to builds from forked pull requests_.

## "Hot" fixes and roll-backs

We prefer to use our CI pipeline to "roll forward" even for reverts or timely fixes.

When it's critical to avoid the delay of a full CI run or staging deploy, you can hot-fix/roll-back using Hokusai, as follows:

- List the project's production ECR images.

  ```
  $ hokusai registry images --filter-tags production

  Image Pushed At     | Image Tags
  ----------------------------------------------------------
  2022-01-27 12:15:21-05:00 | production, staging--2022-01-27--19-05-54, 9718ddb9334c3e9b2a0a0ffa5d744e1ca91d5cb3, production--2022-01-27--19-43-45
  2022-01-26 06:16:16-05:00 | staging--2022-01-26--11-55-47, production--2022-01-26--14-17-47, 84fd6dcd9b115482e2b1d2981c31f4c8bc97a015
  2022-01-25 11:02:42-05:00 | fcf109fa7db52c538755a4eac1b103ecf83dddce, staging--2022-01-25--16-57-31, production--2022-01-25--17-54-15
  ...

  81 more images available
  ```

  The one being used in Production right now is the one that has the canonical `production` tag. In the example output above, it's the first one in the list. Presumably, this is the image that is problematic. The other images that have `production-<timestamp>` tags (but not the canonical `production` tag) were used in Production in the past but are no longer. Presumably one of them is the known last good working image.

- Identify the tag of the known last good working image. This is the one you are to revert to.

- Deploy the known last good working image.

  ```
  hokusai production deploy <tag>
  ```

  That updates Kubernetes `Deployment` resources only. If other resources (e.g. `Ingress`) should be reverted as well, add `update-config` flag:

  ```
  hokusai production deploy <tag> --update-config
  ```

Please note that `hokusai production deploy...` may not be a comprehensive rollback. Depending on your situation, additional steps (e.g. assets compilation, updating configuration) may be required to achieve a complete fix/roll-back.

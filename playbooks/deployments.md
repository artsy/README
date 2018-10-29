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

## Current state

- A few different approaches, largely historical or based on local teams' preferences.
- In all cases, CI deploys to staging
- In almost all cases, **CircleCI** is responsible for CI
- Want to deploy? Check the **README** of any system to be sure.

### Hosting Environments:

- Heroku (Radiation, Impulse, Positron, ...)
- AWS OpsWorks (Gemini, Causality)
- **Kubernetes** (Gravity, Force, Metaphysics, Volt, Diffusion, ...)

### Approaches:

#### Run a single command from a developer's check-out

E.g.:

- `hokusai pipeline promote` (Metaphysics, Diffusion, Vibrations...)
- `git push heroku master` (...?)

This approach is simple and a straightforward usage of our existing tools, BUT:

- Requires a working environment (at least with `hokusai`/`git` and credentials)
- May have a different effect depending on the local state (e.g., of git remotes or `hokusai/*.yml` configurations)
- Isn't adaptable to multi-step deploys (e.g., compiling assets)
- Doesn't enforce the exact deploy commands (though they may be documented)
- May not match the code and configuration used (by CI) to deploy to staging

#### Run a jenkins job

E.g.:

- [deploy-gravity-production](https://joe.artsy.net/job/deploy-gravity-production/)
- [deploy-gemini-production](https://joe.artsy.net/job/deploy-gemini-production/)

Conveniently, jenkins jobs are visible to others. They leverage a precisely configured (and thus repeatable)
environment, and even prevent tasks from overlapping. However:

- Spinning up Jenkins slaves simply to execute a deploy command feels like overkill
- Once again, the set-up for such a job may not match that used by CI to deploy to staging

#### Open and merge a PR to trigger a release

E.g.:

- via `hokusai pipeline promote` ([Volt](https://github.com/artsy/volt/blob/master/.circleci/config.yml), ...)
- via `hokusai production deploy ...`
  ([Kaws](https://github.com/artsy/kaws/blob/2e8e0ca8be2bc14e30e979cf2481e01767762f5e/.circleci/config.yml),
  [Force](https://github.com/artsy/force/blob/4e81b8f92d40bcdcd6c575be31ac561e1500f203/.circleci/config.yml))
- via `git push heroku master` ([Impulse](https://github.com/artsy/impulse/blob/master/.circleci/config.yml))

This leverages the exact set-up already in use to deploy staging, and is independent of any developer's
environment. The pull request also acts as a convenient record of the deploy, including commits and any discussion.
It's possible, however, for deploys to end up blocked or delayed by other CI tasks. This approach also requires a
little extra CircleCI configuration.

Some projects trigger a deploy by PR-ing `master` to a `release` branch. This risks including commits that haven't
completed a full CI run over the `master` branch. To avoid this, others update a `staging` or `master-stable`
branch after the staging deploy is complete and PR from that branch.

## Recommendations

- It's acceptable for projects to start by recommending a basic `hokusai pipeline promote`
- When setting up projects, use `hokusai setup` in combination with the templates in
  [artsy/artsy-hokusai-templates](https://github.com/artsy/artsy-hokusai-templates). They provide reasonable
  starting points for `.circleci/config.yml` and other configuration files.
- Full-fledged projects should drive releases (via CircleCI) with pull requests from a `staging` branch to a
  `release` branch as described above.
  - The staging deploy must update a `staging` _branch_ (instead of publishing a `staging` tag) as a basis for
    release PRs.
  - Release PRs can usually be created from a URL like `<github project URL>/compare/release...staging?expand=1`.
  - See [Reflection's .circleci/config.yml](https://github.com/artsy/reflection/blob/master/.circleci/config.yml)
    as an example of a full set-up for staging and production deploys.
  - Note that this requires
    [configuring a read+write key for CircleCI](https://circleci.com/docs/2.0/gh-bb-integration/#creating-a-github-user-key)
    rather than the default read-only key.
  - Since a `hokusai pipeline promote` promotes the image currently in use by staging at the time of the command,
    it's possible that doesn't match what was merged into the `release` branch by the PR. In the future, we'd like
    to avoid this race condition with an argument to `hokusai pipeline promote`, possibly like
    `--only $CIRCLE_SHA1`.

In all cases:

- Announce deploys for visibility in [#dev](https://artsy.slack.com/messages/dev)
- Document accurate deploy procedure in README

## Advanced topics

### Tags

`hokusai` can automatically push tags to the artsy remote via the `--git-remote` argument.

E.g.:

- `hokusai staging deploy $SHA --git-remote upstream` pushes `staging` and, e.g., `staging--2018-10-16--16-59-42`
  tags
- `hokusai pipeline promote --git-remote upstream` pushes `production` and, e.g.,
  `production--2018-10-16--16-59-42` tags

This can be helpful for recording each release. However, Github doesn't support creating _PRs_ from tags like
`staging` so avoid that when employing the PR-driven release approach.

### "Hot" fixes and roll-backs

Sometimes there are urgent fixes to release. We always prefer using the typical pipeline (from pull requests to
`master` to staging and then to production), even in cases of reverted PRs or timely fixes. When it's absolutely
critical to avoid the delay of a full CI run or staging deploy, it's possible to simply
`hokusai production deploy <tag>` where _tag_ is an image tag (including git SHAs) and can refer to a previous
release such as `production--2018-09-25--10-19-2`. Projects that depend on other release operations (e.g., to
compile assets or update configuration) may require additional steps.

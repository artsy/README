---
title: Hokusai
description: a CLI to manage applications deployed to Kubernetes
---

# Hokusai

[Hokusai](https://github.com/artsy/hokusai) is a CLI tool for managing applications that run on Kubernetes. To learn more about it, please see its own repository.

This page contains information that applies specifically to Artsy users.


## Setting up Hokusai

These are steps that Artsy users should take to set up Hokusai.

### Install Hokusai and its pre-requisites

Most of the work is now taken care of by Artsy's [setup script](https://github.com/artsy/potential/blob/main/scripts/setup). If anything is missing or not working, please update the script.

The script should:

- Install AWS CLI and configure it
- Install Docker which should come with Docker Compose
- Install AWS IAM Authenticator
- Install Hokusai

Please see Hokusai's [setup instructions](https://github.com/artsy/hokusai/tree/main#setup) to learn more.

### Configure Hokusai

```
HOKUSAI_GLOBAL_CONFIG=s3://artsy-provisioning-public/hokusai/hokusai-dev.yml hokusai configure
```

It will install `kubectl` to `~/.local/bin` which can be overridden by command line options. Whichever directory you choose, please ensure it is in your PATH. We advise to avoid using `/usr/local/bin`, as [Docker Desktop uses that for its own `kubectl`](https://github.com/artsy/hokusai/issues/349) which doesn't work with our Kubernetes clusters.

Please see [hokusai configure's command reference](https://github.com/artsy/hokusai/blob/main/docs/Command_Reference.md#configuring-hokusai-for-your-organization) to learn more.


## Using Hokusai to set up a new Artsy project

We have [templates](https://github.com/artsy/artsy-hokusai-templates) for bootstrapping new Artsy projects. The templates currently cover Rails and NodeJS projects.

To set up a Rails/Puma project:

```
cd ./path/to/my/rails/project/git/repo
hokusai setup --template-remote git@github.com:artsy/artsy-hokusai-templates.git --template-dir rails-puma
```

To set up a NodeJS project:

```
cd ./path/to/my/node/project/git/repo
hokusai setup --template-remote git@github.com:artsy/artsy-hokusai-templates.git --template-dir nodejs
```

Please see [hokusai setup's command reference](https://github.com/artsy/hokusai/blob/main/docs/Command_Reference.md#setting-up-a-project) to learn more.


## Creating a review app

The full guide is at Hokusai's [Review Apps doc](https://github.com/artsy/hokusai/blob/main/docs/Review_Apps.md).

However, we are aware of some caveats with Artsy applications:

### Gravity redirect URL

If you get a _Back to Safety_ error when visiting the page, you have to add the `redirect_url` to Gravity:

- Take the client application ID from the URL and search for it in Gravity staging console:

    ```ruby
    app = ClientApplication.find_by app_id: '<app-id>'
    ```

- Then add your URL (with https://) to `redirect_urls`:

    ```ruby
    urls = app.redirect_urls
    urls << 'https://<your-app-url>'
    app.update_attributes! redirect_urls: urls
    ```

### Datastores, cache

Review apps usually employ a copy of the staging application's configuration. This means that, unless customized,
they may refer to the same backing services or datastores. Gravity and Metaphysics support an optional
`CACHE_NAMESPACE` configuration that can isolate review apps' cache keys from each other and from staging.


## Creating a canary deployment

Sometimes you want to test something new on a subset of users/traffic. It maybe a new application version (i.e. new feature) or new configuration. You would run a second Kubernetes deployment. This deployment has the new feature and it's called the "canary". It runs alongside the "canonical" deployment which does not have the new feature. When the canary has been running for a while, and everything is deemed good, you would then delete it, and roll out the change in the canonical deployment, thus releasing the new feature to all users/traffic.

Here's how to create a canary:

- Create the canary's spec

  - In the project's `staging.yml` / `production.yml`, add a "web" deployment, you can copy from the existing one
  - In the new deployment's spec, append "-canary" to `name` fields that contain the deployment name
  - Set the deployment's `spec.replicas` to the desired number of replicas (e.g. 1). The more replicas, the more traffic the cannary will receive.
  - If you want to override any of the application's env configs (e.g. `CACHE_NAMESPACE`), hardcode them in `container`'s `spec.env` field. Vars defined here supercede those loaded by `config.envFrom`. This is how you can for example enable a feature flag only in the canary.
  - If you are testing a new version of the application, change `container`'s `spec.image` to reference that version's tag.

  For an example canary deployment in Metaphysics, see https://github.com/artsy/metaphysics/pull/1619/files. In this case the canary is running image tag `ceb17aec2655475edeffd93a124b5c42f5663d5b`. Its `DD_TRACER_SERVICE_NAME` env var is overridden to `metaphysics-canary` which then shows up on Datadog.

- Launch the canary

  ```
  hokusai [staging|production] update
  ```

To tear down the canary:

- Delete the canary deployment spec
- Delete the canary deployment manually
  ```
  kubectl --context [staging|production] delete deployment {CANARY_DEPLOYMENT_NAME}`
  ```

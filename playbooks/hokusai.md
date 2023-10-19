---
title: Hokusai
description: a CLI to manage applications deployed to Kubernetes
---

## Hokusai

We built and maintain [Hokusai](https://github.com/artsy/hokusai), a CLI for developers to manage their
applications deployed to Kubernetes clusters. See [kubernetes.md](kubernetes.md) for other resources.

### Setup

Hokusai repo has general set up instructions.

Pre-requisities include:

- Installing and configurating AWS CLI
- Installing Docker
- Installing Docker Compose
- Installing aws-iam-authenticator

Artsy has a [setup script](https://github.com/artsy/potential/blob/main/scripts/setup) for its users to setup those things.

### Configure Hokusai

```
HOKUSAI_GLOBAL_CONFIG=s3://artsy-provisioning-public/hokusai/hokusai-dev.yml hokusai configure
```

### Setting up a new project

We keep templates for bootstrapping new projects in https://github.com/artsy/artsy-hokusai-templates

Set up a new Rails/Puma project with:

```
cd ./path/to/my/rails/project/git/repo
hokusai setup --template-remote git@github.com:artsy/artsy-hokusai-templates.git --template-dir rails-puma
```

Set up a new NodeJS project with:

```
cd ./path/to/my/node/project/git/repo
hokusai setup --template-remote git@github.com:artsy/artsy-hokusai-templates.git --template-dir nodejs
```

### Creating a review app

If you get gravity _Back to Safety_ error when visiting the page you need to add the `redirect_url` to Gravity:

- Take the client application id from the url and search for it in gravity staging console:

```ruby
app = ClientApplication.find_by app_id: '<app-id>'
```

- Then add your url (with https://) to `redirect_urls`:

```ruby
urls = app.redirect_urls
urls << 'https://<your-app-url>'
app.update_attributes! redirect_urls: urls
```

Review apps usually employ a copy of the staging application's configuration. This means that, unless customized,
they may refer to the same backing services or datastores. Gravity and Metaphysics support an optional
`CACHE_NAMESPACE` configuration that can isolate review apps' cache keys from each other and from staging.

### Creating a canary deployment

To create a "canary" deployment (run a different configuration or version of the application along with an old one,
monitoring its performance before commiting to rolling out the new version), take the following steps:

1. In your application's `staging.yml` / `production.yml` file, copy and duplicate your application's "web"
   deployment in that file, then:

1. Append "-canary" to the deployment and container `name` fields
1. Set the deployment's `spec.replicas` to a fixed number, i.e. `1` depending on how much traffic you want to be
   served by the canary deployment.
1. Hardcode any environment variables you want to override from the application's environment into the
   `container`'s `spec.env` field (e.g., `CACHE_NAMESPACE`). Anything defined here takes precedence over any
   environment variables defined in the `config.envFrom` directive. So if you are testing enabling a feature flag,
   you can set that flag only for the canary deployment in this way.
1. If you want to deploy a different version of the application, change the `container`'s `spec.image` to reference
   a new tag, i.e. a Git SHA1 tag.

For an example canary deployment in Metaphysics, see https://github.com/artsy/metaphysics/pull/1619/files - in this
case the canary is running the image tag `ceb17aec2655475edeffd93a124b5c42f5663d5b` and is configured to report to
Datadog under the `metaphysics-canary` service by overriding the `DD_TRACER_SERVICE_NAME` environment variable.

When you are ready to launch the Canary, run `hokusai [staging|production] update` (you will likely have to add the
`--skip-checks` flag for Hokusai version >= 0.5.5 if you choose not to merge the canary deployment into `master`).

Once you are ready to tear down the deployment, remove the canary deployment spec, and delete the canary deployment
manually (`hokusai [staging|production] update` will _not_ remove resources that become absent from config files).
So run `kubectl --context [staging|production] delete deployment {CANARY_DEPLOYMENT_NAME}`

### Configuring CircleCI for Hokusai

Our Hokusai projects adopt a common workflow on CircleCI. Merges to `master` trigger a `hokusai registry push`
followed by a `hokusai staging deploy` of the built image. The deploy step will fail if you have not created a
staging environment as detailed above.

Sample CircleCI configuration will be created when you run `hokusai setup` pulling in our application configuration
from `--template-remote git@github.com:artsy/artsy-hokusai-templates.git`

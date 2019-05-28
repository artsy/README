---
title: Hokusai
description: a CLI to manage applications deployed to Kubernetes
---

## Hokusai

We built and maintain [Hokusai](https://github.com/artsy/hokusai), a CLI for developers to manage their
applications deployed to Kubernetes clusters. See [kubernetes.md](kubernetes.md) for other resources.

## Setup

### Quickstart

Install [Git](https://git-scm.com/), [Docker and Docker Compose](https://docs.docker.com/install) with a preferred package manager.  MacOS users, install Docker and Docker Compose with [Docker for Mac](https://docs.docker.com/docker-for-mac/install/).

#### Install Hokusai

Via Homebrew:

```
brew tap artsy/formulas
brew install hokusai
```

Via `curl`:

```
curl --silent https://artsy-provisioning-public.s3.amazonaws.com/hokusai/hokusai-latest-$(uname -s)-$(uname -m) -o /usr/local/bin/hokusai && chmod +x /usr/local/bin/hokusai
```

### Manual Installation with Python / Pip

See https://github.com/artsy/hokusai#setup

#### Configure Hokusai

Prerequisite: install the AWS IAM Authenticator plugin

```
curl -L https://github.com/kubernetes-sigs/aws-iam-authenticator/releases/download/v0.4.0/aws-iam-authenticator_0.4.0_$(uname -s | tr '[:upper:]' '[:lower:]')_amd64 -o /usr/local/bin/aws-iam-authenticator
chmod a+x /usr/local/bin/aws-iam-authenticator
```

*Make sure IAM credentials are set in AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY or ~/.aws/credentials!*

```
hokusai configure --kubectl-version 1.10.7 --s3-bucket artsy-citadel --s3-key k8s/config-dev
```

#### Note

Due to
[recent PyPi upgrades](https://gis.stackexchange.com/questions/278989/pip-no-longer-works-with-qgis-2-18-x-python-tls-version-no-longer-supported)
`pip install --upgrade hokusai` may complain about SSL cipers being out of date. To fix this, make sure your
openssl libraries are up-to-date: `brew upgrade openssl` and reinstall python via `brew reinstall python`.

#### Configuring access to Kubernetes

Make sure that the environment variables `$AWS_ACCESS_KEY_ID` and `$AWS_SECRET_ACCESS_KEY` are set in your shell or persistently in your `~/.bash_profile`

Install `kubectl` along with our Kubernetes configuration with:

`hokusai configure --kubectl-version 1.10.7 --s3-bucket artsy-citadel --s3-key k8s/config`

Note: the artsy-citadel S3 bucket isn't open source, and the above will fail
for non-Artsy team-members.

#### Setting up a new project

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

### Developing with Hokusai

Use `hokusai dev` sub-commands to work with the Docker-Compose development environment defined in
`./hokusai/development.yml`. Modify this file to suit your project's specific needs and dependencies.

### Testing with Hokusai

Use `hokusai test` to run your test suites in the Docker-Compose test environment defined in `./hokusai/test.yml`.
Modify this file to suit your project's specific needs and dependencies.

### Building Docker images

Use `hokusai build` to build a local Docker image from your project's `Dockerfile`. Be aware of the `.dockerignore`
file and any local `.env` files that may leak into the built image if not ignored!

### Pushing images to the project's Docker registry

Use `hokusai registry push` to build an image tagged as the `HEAD` of your git repo to the project's registry. Be
careful of doing this locally, for as above, local configuration may leak into the image. It is better do do this
via CI as detailed below.

### Creating a staging environment

Prepare a staging environment with `hokusai staging env create` and populate environment values with
`hokusai staging env set KEY=VALUE`

Launch the staging environment with `hokusai staging create` to create the Kubernetes resources defined in
`./hokusai/staging.yml`. This will fail if you have not pushed a Docker image to the project's Docker registry.

### Creating a review app

Follow the instructions in https://github.com/artsy/hokusai/blob/master/docs/Review_Apps.md to create a review app from a branch or PR

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

### Creating a canary deployment

To create a "canary" deployment (run a different configuration or version of the application along with an old one, monitoring its performance before commiting to rolling out the new version), take the following steps:

1) In your application's `staging.yml` / `production.yml` file, copy and duplicate your application's "web" deployment in that file, then:

1) Append "-canary" to the deployment and container `name` fields
2) Set the deployment's `spec.replicas` to a fixed number, i.e. `1` depending on how much traffic you want to be served by the canary deployment.
3) Hardcode any environment variables you want to override from the application's environment into the `container`'s `spec.env` field.  Anythin defined here takes precedence over any environment variables defined in the `config.envFrom` directive.  So if you are testing enabling a feature flag, you can set that flag only for the canary deployment in this way.
4) If you want to deploy a different version of the application, change the `container`'s `spec.image` to reference a new tag, i.e. a Git SHA1 tag.

For an example canary deployment in Metaphysics, see https://github.com/artsy/metaphysics/pull/1619/files - in this case the canary is running the image tag `ceb17aec2655475edeffd93a124b5c42f5663d5b` and is configured to report to Datadog under the `metaphysics-canary` service by overriding the `DD_TRACER_SERVICE_NAME` environment variable.

When you are ready to launch the Canary, run `hokusai [staging|production] update` (you will likely have to add the `--skip-checks` flag for Hokusai version >= 0.5.5 if you choose not to merge the canary deployment into `master`).

Once you are ready to tear down the deployment, remove the canary deployment spec, and delete the canary deployment manually (`hokusai [staging|production] update` will _not_ remove resources that become absent from config files).  So run `kubectl --context [staging|production] delete deployment {CANARY_DEPLOYMENT_NAME}`

### Configuring CircleCI for Hokusai

Our Hokusai projects adopt a common workflow on CircleCI. Merges to `master` trigger a `hokusai registry push`
followed by a `hokusai staging deploy` of the built image. The deploy step will fail if you have not created a staging environment as detailed above.

Sample CircleCI configuration will be created when you run `hokusai setup` pulling in our application configuration from `--template-remote git@github.com:artsy/artsy-hokusai-templates.git`

### Creating a production environment

Prepare a production environment with `hokusai production env create` and populate environment values with
`hokusai production env set KEY=VALUE`

Launch the production environment with `hokusai production create` to create the Kubernetes resources defined in
`./hokusai/production.yml`.

### Promoting staging to production

To see differences between staging and production, use `hokusai pipeline gitlog`, `hokusai pipeline gitdiff` or `hokusai pipeline gitcompare`.

To roll out the image deployed on staging to production use `hokusai pipeline promote`.

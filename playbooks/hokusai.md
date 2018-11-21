---
title: Hokusai
description: a CLI to manage applications deployed to Kubernetes
---

## Hokusai

We built and maintain [Hokusai](https://github.com/artsy/hokusai), a CLI for developers to manage their
applications deployed to Kubernetes clusters. See [kubernetes.md](kubernetes.md) for other resources.

## Setup

### Quickstart

Install Git, Docker for Mac and Hokusai:

```
brew install git && brew tap caskroom/cask && brew cask install docker
curl https://artsy-provisioning-public.s3.amazonaws.com/hokusai/hokusai-latest-Darwin-x86_64 -o /usr/local/bin/hokusai && chmod +x /usr/local/bin/hokusai
# Make sure IAM credentials are set in AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY or ~/.aws/credentials
hokusai configure --kubectl-version 1.10.7 --s3-bucket artsy-citadel --s3-key k8s/config
```

### Manual Installation

We recommend that you install Python via Homebrew or [Miniconda](https://conda.io/miniconda.html) rather than use
your default system Python interpreter (OSX ships with a preinstalled python at `/usr/bin/python`). After
installing, ensure (`which python`) links to the brew/miniconda installed Python version rather than the system
Python. For example, if your brew-installed python interpreter is linked via
`/usr/local/bin/python -> ../Cellar/python@2/2.7.14_3/bin/python` then `/usr/local/bin` should come before
`/usr/bin` in your `$PATH`.

Install Hokusai's [requirements](https://github.com/artsy/hokusai#requirements) - Git, Docker and Docker Compose, then install hokusai itself via
`pip install --upgrade hokusai`

#### Note

Due to
[recent PyPi upgrades](https://gis.stackexchange.com/questions/278989/pip-no-longer-works-with-qgis-2-18-x-python-tls-version-no-longer-supported)
`pip install --upgrade hokusai` may complain about SSL cipers being out of date. To fix this, make sure your
openssl libraries are up-to-date: `brew upgrade openssl` and reinstall python via `brew reinstall python`.

#### Configuring access to Kubernetes

Make sure that the environment variables `$AWS_ACCESS_KEY_ID` and `$AWS_SECRET_ACCESS_KEY` are set in your shell or persistently in your ~/.bash_profile

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

### Configuring CircleCI for Hokusai

Our Hokusai projects adopt a common workflow on CircleCI. Merges to `master` trigger a `hokusai registry push`
followed by a `hokusai staging deploy` of the built image. The deploy step will fail if you have not created a
staging environment as detailed above.

```yml
version: 2
jobs:
  test:
    docker:
      - image: artsy/hokusai:0.4.0
    steps:
      - add_ssh_keys
      - checkout
      - setup_remote_docker
      - run:
          name: Test
          command: hokusai test
  push:
    docker:
      - image: artsy/hokusai:0.4.0
    steps:
      - add_ssh_keys
      - checkout
      - setup_remote_docker
      - run:
          name: Push
          command: hokusai registry push --tag $CIRCLE_SHA1 --force --overwrite
  deploy:
    docker:
      - image: artsy/hokusai:0.4.0
    steps:
      - add_ssh_keys
      - checkout
      - run:
          name: Configure
          command:
            hokusai configure --kubectl-version 1.6.3 --s3-bucket artsy-citadel --s3-key k8s/config --platform
            linux
      - run:
          name: Deploy
          command: hokusai staging deploy $CIRCLE_SHA1
workflows:
  version: 2
  default:
    jobs:
      - test
      - push:
          filters:
            branches:
              only: master
          requires:
            - test
      - deploy:
          filters:
            branches:
              only: master
          requires:
            - push
```

### Creating a production environment

Prepare a production environment with `hokusai production env create` and populate environment values with
`hokusai production env set KEY=VALUE`

Launch the production environment with `hokusai production create` to create the Kubernetes resources defined in
`./hokusai/production.yml`.

### Promoting staging to production

To roll out the image deployed on staging to production use `hokusai pipeline promote`.

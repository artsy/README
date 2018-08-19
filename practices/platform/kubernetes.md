# Kubernetes

[Kubernetes](https://kubernetes.io/) is an open-source container orchestration platform developed by Google and
maintained by a growing community. It provides the ability to manage and scale container deployments and integrates
with our existing AWS infrastructure.

## Substance

Artsy runs multiple Kubernetes clusters, for staging and production, service-level and user-level applications. The
clusters themselves are configured and managed by [Substance](https://github.com/artsy/substance).

Currently, we retain two clusters per VPC environment to separate stateless application-level deployments from
stateful, operational ones.

### Applications

The dashboards for our Kubernetes application clusters can be found at:

- Production: https://kubernetes.artsy.net/
- Staging: https://kubernetes-staging.artsy.net/

### Operations

The dashboards for our Kubernetes operations clusters can be found at:

- Production Operations: https://kubernetes-operations.artsy.net/
- Staging Operations: https://kubernetes-operations-staging.artsy.net/

### Monitoring

We use [Datadog](https://app.datadoghq.com/) for cluster monitoring and alerting.

#### Metrics

Useful dashboards:

- [Production Cluster Overview](https://app.datadoghq.com/infrastructure/map?mapid=4312&fillby=avg%3Acpuutilization&sizeby=avg%3Asystem.mem.used&groupby=autoscaling_group%2Cavailability-zone&filter=kubernetescluster%3Akubernetes-production-virgo.artsy.systems&nameby=name&nometrichosts=false&tvMode=false&nogrouphosts=false&palette=green_to_orange&paletteflip=false&node_type=host)
- [Staging Cluster Overview](https://app.datadoghq.com/infrastructure/map?mapid=4320&fillby=avg%3Acpuutilization&sizeby=avg%3Asystem.mem.used&groupby=autoscaling_group%2Cavailability-zone&filter=kubernetescluster%3Akubernetes-staging-lyra.artsy.systems&nameby=name&nometrichosts=false&tvMode=false&nogrouphosts=false&palette=green_to_orange&paletteflip=false&node_type=host)
- [Container Overview](https://app.datadoghq.com/containers?columns=container_name,container_cpu,container_memory,container_net_sent_bps,container_net_rcvd_bps,container_status,container_started&options=normalizeCPU&sort=container_memory,DESC)

#### Monitoring

Datadog provides monitoring and over metric aggregations. See https://app.datadoghq.com/monitors/manage

#### Logging

All system and container logs are piped to Papertrail.

- Production: https://papertrailapp.com/groups/3675843/
- Staging: https://papertrailapp.com/groups/3674473/

Searches for deployment-specific logs can be created via the `host:{deploymentName}` search syntax, for example:
`host:currents-web`, or to target multiple deployments: `host:(currents-web currents-sidekiq)`.

#### When things go wrong

Applications sometimes crash or become unresponsive. Kubernetes will automatically restart failed applications in
the event they crash, but in the event that an application is acting up (returning 5xx codes) and/or incredibly
slow, it may require a restart.

Pods are the basic abstraction Kubernetes uses to schedule and orchestrate multiple containers for a given
application. It is safe to delete Pods as Kubernetes will attempt to re-create any deleted pods, in the same way as
it re-starts crashed applications.

To diagnose application failures, navigate to the Kubernetes dashboard and search for your application using the
search box at the top of the dashboard to filter all Kubernetes domain objects by application name. Once you have a
view on your application's resources, look for any Pods in an "Error" or "CrashLoopBackoff" state, then _Delete_
these pods by either using the three-dots "actions" menu to the right of the pod's CPU / Memory graphs, or click
through to the Pod view and use the "Delete" menu with the trash can at the top of the page.

Alternatively, you can (in the application's git checkout, assuming you have the Hokusai CLI installed) run the
command `hokusai [staging|production] refresh` but be aware this is a _hard_ restart of the application and may
result in brief downtime as it will delete _all_ running pods simultaneously.

## Hokusai

We built and maintain [Hokusai](https://github.com/artsy/hokusai), a CLI for application developers working with
Docker and Kubernetes clusters.

Install Hokusai's [requirements](https://github.com/artsy/hokusai#requirements) and install hokusai itself via
`pip install --upgrade hokusai`

We recommend that you install Python via Homebrew rather than use your default system Python interpreter (OSX ships
with a preinstalled python at `/usr/bin/python`). Ensure (`which python`) links to the brew installed Python
version rather than the system Python. For example, if your brew-installed python interpreter is linked via
`/usr/local/bin/python -> ../Cellar/python@2/2.7.14_3/bin/python` then `/usr/local/bin` should come before
`/usr/bin` in your `$PATH`.

Note: due to
[recent PyPi upgrades](https://gis.stackexchange.com/questions/278989/pip-no-longer-works-with-qgis-2-18-x-python-tls-version-no-longer-supported)
`pip install --upgrade hokusai` may complain about SSL ciphers being out of date. To fix this, make sure your
openssl libraries are up-to-date: `brew upgrade openssl` and reinstall python via `brew reinstall python`.

#### Configuring Hokusai

Make sure to set `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` with your IAM credentials.

Configure Hokusai for our organization with:
`hokusai configure --kubectl-version 1.6.3 --s3-bucket artsy-citadel --s3-key k8s/config`

Set up a new Rails project with:

```
cd ./path/to/my/rails/project/git/repo
hokusai setup --project-type ruby-rails
```

### Developing with Hokusai

Use `hokusai dev` subcommands to work with the Docker-Compose development environment defined in
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

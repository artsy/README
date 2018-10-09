---
title: Kubernetes
description: Deploying containerized applications at Artsy
---

# Kubernetes

[Kubernetes](https://kubernetes.io/) is an open-source container orchestration platform developed by Google and
maintained by a growing community. It provides the ability to manage and scale container deployments and integrates
with our existing AWS infrastructure. See [hokusai.md](hokusai.md) for help managing deployed applications.

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

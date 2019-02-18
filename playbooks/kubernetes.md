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

#### Kubectl CLI

If you [installed and configured Hokusai](hokusai.md) you already have `kubectl` installed as well.  `kubectl` provides a CLI for interacting with Kubernetes clusters.  It uses the Kubernetes API like the Dashboard applications, and so provides a view over the same resources, but can switch between different clusters using a "context".

See all available contexts (set in the `~/.kube/config` file) with `kubectl config get-contexts`

Ignore the contexts with fully-qualified domain names `kubernetes-*.artsy.systems` such as `kubernetes-production-cepheus.artsy.systems` / `kubernetes-production-orion.artsy.systems` - you'll want to use the contexts `staging`, `production`, `ops-staging` and `ops-production` which are aliased to the correct FQDN for the currently running clusters (which change as we make cluster upgrades).

Use `kubectl config use-context {context}` to select a context.  All further `kubectl` commands will use this context, and issue commands against the API endpoint for that cluster.  You can also explicitly pass a context to an individual `kubectl` command with the `--context` flag (this is how Hokusai shells out to Kubectl so as not to conflict with any implicit context you may have set.)

Kubernetes also supports namespaces - this provides a level of resource isolation within a cluster.  We currently only use the "default" namespace to run applications, and the "kube-system" namespace to run Kubernetes services like DNS and cluster autoscaling.

__Example: get all pods in the staging cluster__

First run `kubectl config use-context staging`.  Then run `kubectl get pods` to see all pods running in the staging cluster's default namespace. Use the `--namespace=kube-system` flag to get all pods in the `kube-system` namespace and the `--all-namespaces` flag to get all pods running in the cluster in all namespaces.

You can get resources in Yaml or Json, edit, update and delete resources with Kubectl.  More examples can be found [here](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

### Monitoring

We use [Datadog](https://app.datadoghq.com/) for cluster monitoring and alerting.

#### Metrics

Useful dashboards:

- [Production Cluster Overview](https://app.datadoghq.com/infrastructure/map?mapid=4312&fillby=avg%3Acpuutilization&sizeby=avg%3Asystem.mem.used&groupby=autoscaling_group%2Cavailability-zone&filter=kubernetescluster%3Akubernetes-production-virgo.artsy.systems&nameby=name&nometrichosts=false&tvMode=false&nogrouphosts=false&palette=green_to_orange&paletteflip=false&node_type=host)
- [Staging Cluster Overview](https://app.datadoghq.com/infrastructure/map?mapid=4320&fillby=avg%3Acpuutilization&sizeby=avg%3Asystem.mem.used&groupby=autoscaling_group%2Cavailability-zone&filter=kubernetescluster%3Akubernetes-staging-lyra.artsy.systems&nameby=name&nometrichosts=false&tvMode=false&nogrouphosts=false&palette=green_to_orange&paletteflip=false&node_type=host)
- [Container Overview](https://app.datadoghq.com/containers?columns=container_name,container_cpu,container_memory,container_net_sent_bps,container_net_rcvd_bps,container_status,container_started&options=normalizeCPU&sort=container_memory,DESC)

#### Logging

All system and container logs are piped to Papertrail.

- Production: https://papertrailapp.com/groups/3675843/
- Staging: https://papertrailapp.com/groups/3674473/

Searches for deployment-specific logs can be created via the `host:{deploymentName}` search syntax, for example:
`host:currents-web`, or to target multiple deployments: `host:(currents-web currents-sidekiq)`.

#### When things go wrong (application level)

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
through to the Pod view and use the "Delete" menu with the trash can at the top of the page, or via the `kubectl` CLI: `kubectl delete {pod-name}`.

Alternatively, you can (in the application's git checkout, assuming you have the Hokusai CLI installed) run the
command `hokusai [staging|production] refresh`.

#### When things go wrong (cluster level)

Kubernetes cluster nodes may experience issues with their underlying system (too many open file handles, full disk, memory, etc) and require system-level debugging, or occasionally need to be re-provisioned.

To inspect a node, first find its FQDN, which is the private DNS name assigned by AWS EC2 autoscaling.

To view all nodes for a given cluster, run `kubectl get nodes`.  Another useful command, if you wish to see pods along with the node on which they are scheduled / running is `kubectl get pods -o wide`.  Hokusai will call this command when invoking `hokusai [staging|production] status`.

To ssh into an instance, first connect to the staging / production VPN then run `ssh -i ~/.artsyow.pem admin@{node-FQDN}`

Nodes run services using [systemd](https://wiki.debian.org/systemd).  Use `systemctl status` to see all running services or `systemctl status docker.service` to inspect the docker daemon service.  Get logs using [`journalctl`](https://manpages.debian.org/stretch/systemd/journalctl.1.en.html) to view logs for systemd services, so for example to see recent logs for the docker service use `journalctl -u docker.service --follow`

We pre-install useful packages for system level debugging in our base AMI for Kubernetes machines, so you have `htop` / `lsof` / `netstat` / `tcpdump` all available.  Another useful tool that aims to provide debugging for container environments is [`sysdig`](https://github.com/draios/sysdig/wiki/sysdig-user-guide) and its curses-interface [`csysdig`](https://github.com/draios/sysdig/wiki/Csysdig-Overview).  With it you can get stacktraces, inspect file allocations, network connections, etc while filtering on a specific process or container name.

If a node is for any reason unable to schedule containers, serve traffic or unresponsive, it can safely be terminated - AWS autoscaling will replace the machine automatically with a new one and it will rejoin the cluster.  However, terminating a node that is running application pods may result in service disruption for that application if they are the _only_ pods that back that service.  Kubernetes attempts to spread Pods for a given Deployment exposed by a Service across multiple hosts to provide redundancy, but in certain cases Pods can end up scheduled on the same host.  Applications should make use of [antiAffinity scheduling rules](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/) or [Pod disruption budgets](https://kubernetes.io/docs/tasks/run-application/configure-pdb/) to increase redundancy and failover.  Use the command `kubectl get pods --selector app={app-name} -o wide` or `hokusai [staging|production] status` to determine the hosts running pods for a given application.

To evict all running pods from a node before terminating it, use the following procedure:

1) Check all the pods running on the node with `kubectl get pods -o wide --all-namespaces | grep {node-FQDN}`

2) If you are concerned that forcefully evicting any of those pods would result in service disruption, temporarily scale up the relevant deployments with `kubectl scale deployment/{deployment-name} --replicas {desired-replicas}`.  Further config updates to the application will override this from the application's Yaml spec.

3) Drain the node, evicting all running pods with `kubectl drain {node-FQDN} --force --ignore-daemonsets`.

4) Once the node is drained, terminate it via the AWS CLI or Dashboard.

5) Wait for autoscaling to automatically launch a new instance in place of the terminated one.

The command `./manage.py rotate_cluster_nodes` [in the Substance repo](https://github.com/artsy/substance#rotate-cluster-nodes-drain-termainate-existing-nodes-and-relace-with-new-ones) automates this procedure.

---
title: Kubernetes
description: Deploying containerized applications at Artsy
---

# Kubernetes

[Kubernetes](https://kubernetes.io/) is an open-source container orchestration platform developed by Google and
maintained by a growing community. It provides the ability to manage and scale container deployments and integrates
with our existing AWS infrastructure. See [hokusai.md](hokusai.md) for help managing deployed applications.

## Substance

Artsy runs two Kubernetes clusters, one for staging and one for production. The clusters themselves are configured
and managed by [Substance](https://github.com/artsy/substance).

### Applications

The dashboards for our Kubernetes application clusters can be found (via VPN) at:

- Production: [kubernetes.prd.artsy.systems](https://kubernetes.prd.artsy.systems/)
- Staging: [kubernetes.stg.artsy.systems](https://kubernetes.stg.artsy.systems/)

### Monitoring

We use [Datadog](https://app.datadoghq.com/) for cluster monitoring and alerting.

- [Production Cluster Overview](https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&filter=env%3Aproduction&groupby=availability-zone%2Ck8s.io%2Fcluster-autoscaler%2Fnode-template%2Flabel%2Ftier)
- [Staging Cluster Overview](https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&filter=env%3Astaging&groupby=availability-zone%2Ck8s.io%2Fcluster-autoscaler%2Fnode-template%2Flabel%2Ftier)
- [Container Overview](https://app.datadoghq.com/containers?columns=container_name,container_cpu,container_memory,container_net_sent_bps,container_net_rcvd_bps,container_status,container_started&options=normalizeCPU&sort=container_memory,DESC)

### Allocating Kubernetes resources

Here are some
[guidelines](https://www.notion.so/artsy/Guidelines-on-tuning-an-app-s-CPU-and-memory-consumption-in-a-Kubernetes-cluster-797977be895643af84015a7d4b60a5dc)
on allocating CPU/Memory to Kubernetes deployments.

### Kubectl CLI

If you [installed and configured Hokusai](hokusai.md) you already have `kubectl` installed as well. `kubectl`
provides a CLI for interacting with Kubernetes clusters. It uses the Kubernetes API like the Dashboard
applications, and so provides a view over the same resources, but can switch between different clusters using a
"context".

See all available contexts (set in the `~/.kube/config` file) with `kubectl config get-contexts`

There should just be two contexts (staging, production) which are aliases to the FQDN of the running clusters
(which change as we make cluster upgrades).

Use `kubectl config use-context {context}` to select a context. All further `kubectl` commands will use this
context, and issue commands against the API endpoint for that cluster. You can also explicitly pass a context to an
individual `kubectl` command with the `--context` flag (this is how Hokusai shells out to Kubectl so as not to
conflict with any implicit context you may have set.)

Kubernetes also supports namespaces - this provides a level of resource isolation within a cluster. We currently
only use the "default" namespace to run applications, and the "kube-system" namespace to run Kubernetes services
like DNS and cluster autoscaling.

**Example: get all pods in the staging cluster**

First run `kubectl config use-context staging`. Then run `kubectl get pods` to see all pods running in the staging
cluster's default namespace. Use the `--namespace=kube-system` flag to get all pods in the `kube-system` namespace
and the `--all-namespaces` flag to get all pods running in the cluster in all namespaces.

You can get resources in Yaml or Json, edit, update and delete resources with Kubectl. More examples can be found
[here](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

#### Logging

All system and container logs are piped to
[Solarwinds](https://my.na-01.cloud.solarwinds.com/256573103075911680/logs). Filter to `Kubernetes Staging` or
`...Production`, or search for specific deployments like `program:deployment-name`.

#### When things go wrong (application level)

Applications sometimes crash or become unresponsive. Kubernetes will automatically restart failed applications in
the event they crash, but in the event that an application is acting up (returning 5xx codes) and/or incredibly
slow, it may require a restart.

Pods are the basic abstraction Kubernetes uses to schedule and orchestrate multiple containers for a given
application. Kubernetes will attempt to re-create any deleted pods, in the same way as it restarts crashed
applications.

The Kubernetes dashboard offers logs and resource metrics, and may be helpful in diagnosing application failures.
Use the search box at the top of the dashboard to filter all Kubernetes domain objects by application name. Once
you have a view on your application's resources, look for any Pods in an "Error" or "CrashLoopBackoff" state.
Rarely _deleting_ those pods from the menu or cli (`kubectl delete {pod-name}`) might be necessary.

Alternatively, you can (in the application's git checkout, assuming you have the Hokusai CLI installed) run the
command `hokusai [staging|production] refresh`.

#### When things go wrong (cluster level)

Kubernetes cluster nodes may experience issues with their underlying system (too many open file handles, full disk,
memory, etc) and require system-level debugging, or occasionally need to be re-provisioned.

To inspect a node, first find its FQDN, which is the private DNS name assigned by AWS EC2 autoscaling.

To view all nodes for a given cluster, run `kubectl get nodes`. Another useful command, if you wish to see pods
along with the node on which they are scheduled / running is `kubectl get pods -o wide`. Hokusai will call this
command when invoking `hokusai [staging|production] status`.

To ssh into an instance, first connect to the staging / production VPN then run
`ssh -i ~/.artsyow.pem admin@{node-FQDN}`

Nodes run services using [systemd](https://wiki.debian.org/systemd). Use `systemctl status` to see all running
services or `systemctl status containerd` to inspect the docker daemon service. Get logs using
[`journalctl`](https://manpages.debian.org/stretch/systemd/journalctl.1.en.html) to view logs for systemd services,
so for example to see recent logs for the docker service use `journalctl -u containerd --follow`

If a node is for any reason unable to schedule containers, serve traffic or unresponsive, it can safely be
terminated - AWS autoscaling will replace the machine automatically with a new one and it will rejoin the cluster.
However, terminating a node that is running application pods may result in service disruption for that application
if they are the _only_ pods that back that service. Kubernetes attempts to spread Pods for a given Deployment
exposed by a Service across multiple hosts to provide redundancy, but in certain cases Pods can end up scheduled on
the same host. Applications should make use of
[antiAffinity scheduling rules](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/) or
[Pod disruption budgets](https://kubernetes.io/docs/tasks/run-application/configure-pdb/) to increase redundancy
and failover. Use the command `kubectl get pods --selector app={app-name} -o wide` or
`hokusai [staging|production] status` to determine the hosts running pods for a given application.

To evict all running pods from a node before terminating it, use the following procedure:

1. Check all the pods running on the node with `kubectl get pods -o wide --all-namespaces | grep {NODE_FQDN}`

2. If you are concerned that forcefully evicting any of those pods would result in service disruption, temporarily
   scale up the relevant deployments with
   `kubectl scale deployment/{DEPLOYMENT_NAME} --replicas {NUM_DESIRED_REPLICAS}`. Further config updates to the
   application will override this from the application's Yaml spec.

3. Drain the node, evicting all running pods with
   `kubectl drain {NODE_FQDN} --force --ignore-daemonsets --delete-local-data`.

4. Once the node is drained, terminate it via the AWS CLI or Dashboard.

5. Wait for autoscaling to automatically launch a new instance in place of the terminated one.

The command `python manage.py replace_cluster_nodes {cluster_directory}`
[in the Substance repo](https://github.com/artsy/substance#replace-cluster-nodes-drain-termainate-existing-nodes-and-relace-with-new-ones)
automates this procedure.

##### Example: Kubernetes Nodes failing to Schedule Pods

Kubernetes pods may fail to create if the Docker Daemon becomes unresponsive. You may see a Pod error like "Failed
create pod sandbox: rpc error ... operation timeout: context deadline exceeded". Likely the Pod is also stuck in
the "ContainerCreating" state.

In this case, the Docker daemon on this host has become unresponsive. To mitigate the issue, take note of Node that
the Pod is scheduled on, i.e. for the node `ip-10-0-12-27.ec2.internal`...

1. Mark the node as unschedulable. Run `kubectl cordon ip-10-0-12-27.ec2.internal`

2. Drain the node to cordon it and evict all pods. Run
   `kubectl drain ip-10-0-12-27.ec2.internal --force --ignore-daemonsets --delete-local-data`

3. Terminate the instance
   `aws ec2 terminate-instances --instance-ids $(aws ec2 describe-instances --filter Name=private-dns-name,Values=ip-10-0-12-27.ec2.internal --query 'Reservations[].Instances[].InstanceId' --output text)`

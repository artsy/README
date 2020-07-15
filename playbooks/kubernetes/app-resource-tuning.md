Kubernetes has knobs that allow you to control how much of the clusters' cpu/memory will be used by an app. Some good references:

https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-resource/

https://kubernetes.io/docs/tasks/administer-cluster/out-of-resource/

These settings are configured in k8s manifests (Hokusai staging/production.yml), in each app's repo. Hokusai templates come with example values for these settings:

https://github.com/artsy/artsy-hokusai-templates

However, we should tune them per app. This doc provides some guidelines on tuning.


# Container CPU/Memory Request/Limit.

These parameters are set per container. `requests` means how much of a resource will be reserved for the container. `limits` means the maximum amount of a resource that the container is allowed to use. If an app hits CPU limit, it will get throttled and slows down but it won't terminate. If it hits memory limit, it will likely terminate with out-of-memory error.

CPU values are expressed in "number of CPU's". For example, 0.2 means 0.2 cpus. The value can also be expressed in units of milli cpus. So 200m is also 0.2 cpus. We prefer to use milli cpu units.

For memory, the value is in bytes.

For a pod that has a web container as well as an nginx container, our practice is that we set these parameters for the web container only.

```
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: example-web
  namespace: default
spec:
...
  template:
...
    spec:
      containers:
        - name: gravity-web

          resources:
            requests:
              cpu: ???
              memory: ???
            limits:
              cpu: ???
              memory: ???
```

## General Recommendations
These are very general recommendations, as CPU and memory usage are both hard to gauge. Some apps such as Pulse use a lot of CPU but only rarely. For memory, some apps such as Gemini try to use more and more until they hit OOM and crash.

### CPU Request
- Set it to as much as the app (pod) actually uses most of the time. Find that out by monitoring usage over weeks (see below). Beware that utilization might be constrained by HPA as discussed below.
- Set it to at least 200m cpu's even if the app uses less than that.
- Cap it at 1 cpu, but if the app can take advantage of more than 1 cpu, give it more but no more than 2. The more CPU's requested, the harder it is for k8s to find room to fit the pod.

When load spikes, HPA adds pods, which triggers Cluster Autoscaler to add EC2 instances.

### CPU Limit
- For critical apps such as Gravity, leave it, do not set it. The benefit is that when workload spikes, the pods can handle the load by using any idle CPU on the node, over what it requested. When HPA has kicked-in and added more pods, utilization per pod should go back to normal.
- For less critical apps, set it to 1, or 2 if CPU request is set to greater than 1.

### Memory Request
- Observe memory usage over time. Set request to 1.5x that. For example, if a pod uses 512Mi consistently, set request to 768Mi.

### Memory Limit
- Set it to 2x usage. Example, if a pod uses 512Mi consistently, set it to 1Gi. Beware that there might be similar limit set on app-side. For example, Nodejs apps might be configured with `max_old_space_size` setting which should match the limit set in k8s.

# Horizontal Pod Auto-Scaler (HPA)

HPA manages the pod count of a `deployment`. It adds or removes pods in response to load.

`minReplicas` sets the minimum number of pods. The deployment will have that number of pods, even when there's no load.

`maxReplicas` sets the maximum. The deployment pod count is capped at that, even if load is sky-high.

`targetCPUUtilizationPercentage` is a threshold that tells HPA when to add/remove pods.

Consider a pod's cpu utilization as % of its cpu `request` (see above).
If util goes above the threshold, HPA adds pods. If it goes below, HPA removes pods.
The effect is that the pods' cpu util always hovers around the threshold, until HPA can no longer add/remove pods as constrained by min/maxReplicas.

```
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: example-web
...
spec:
  scaleTargetRef:
    apiVersion: extensions/v1beta1
    kind: Deployment
    name: example-web
  minReplicas: ???
  maxReplicas: ???
  targetCPUUtilizationPercentage: ???
```
## Recommendations
### minReplicas
### maxReplicas
### targetCPUUtilizationPercentage

# Process of tuning those parameters.
It takes iterations to get those parameters right. Generally, when launching an app, give it more resources than you think it needs, observe actual utilization over time, and dial down as needed. Here's a dashboard that helps monitoring an app's resource usage over time:

https://app.datadoghq.com/dashboard/2n5-6tr-ypp/kubernetes-cpumemory-usage-by-deployment

It might help to have a view of resource usage/allocation cluster wide. Here's a dashboard for that:

https://app.datadoghq.com/dashboard/u2e-uhw-hwj/kubernetes-cpumemory-usage-by-cluster

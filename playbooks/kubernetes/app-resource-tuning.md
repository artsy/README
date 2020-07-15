Kubernetes has knobs that allow you to control how much of the clusters' cpu/memory will be used by an app.
This doc provides guidelines on how to set them.

These settings are configured in k8s manifests (Hokusai staging/production.yml), in each app's repo.

# Container CPU/Memory Request/Limit.

This is a container-level configuration. `requests` means how much of a resource will be reserved for the container. `limits` means the maxium of a resource the container is allowed to use. For CPU, values are expressed in number of CPU's. For example, value of 0.2 means 0.2 cpus. It can also be expressed in units of milli cpus. So 200m is also 0.2 cpus. For memory, the value is in bytes.

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
### CPU Request
- Set it to as much as the app (pod) actually uses most of the time. Find that out by monitoring usage over weeks (see below).
- Set it to at least 0.2 cpu's even if the app uses less than that.
- Cap it at 1 cpu, but if the app can take advantage of more than 1 cpu, give it more but no more than 2.

If there's more workload than one pod can handle, we add pods (via HPA) to handle the load.

### CPU Limit
### Memory Request
### Memory Limit

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

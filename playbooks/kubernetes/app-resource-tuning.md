Kubernetes has knobs that allow you to allocate cpu/memory for an app.

These settings are configured in k8s manifests (Hokusai staging/production.yml), in each app's repo. Hokusai templates come with example values for these settings:

https://github.com/artsy/artsy-hokusai-templates

However, we should tune them per app. This doc provides some guidelines on tuning.


# Container CPU/Memory Request/Limit.

https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-resource/

https://kubernetes.io/docs/tasks/administer-cluster/out-of-resource/

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
These are very general recommendations, as CPU and memory usage are both hard to gauge. Some apps such as Pulse use a lot of CPU but only momentarily. For memory, some apps such as Gemini try to use more and more until they hit OOM and crash.

### CPU Request
- Set it to as much as the app (pod) actually uses most of the time. Find that out by monitoring usage over weeks (see below). Beware that utilization might be constrained by HPA as discussed below.
- Set it to at least 200m even if the app uses less than that.
- Cap it at 1 cpu, but if the app can take advantage of more than 1 cpu, give it more but no more than 2. The more CPU's requested, the harder it is for k8s to find room to fit the pod.
- For apps that work efficiently with many instances, we can request less cpu per pod and use many pods.

### CPU Limit
- For critical apps such as Gravity, leave it, do not set it. The benefit is that when workload spikes, the pods can handle the load by using any idle CPU on the node, over what it requested.

- For less critical apps, set it to 1, or 2 if CPU request is set to greater than 1.

### Memory Request
- Observe memory usage over time. Set request to 1.5x that. For example, if a pod uses 512Mi consistently, set request to 768Mi.

### Memory Limit
- Set it to 2x usage. Example, if a pod uses 512Mi consistently, set it to 1Gi. Beware that there might be similar limit set on app-side. For example, Nodejs apps might be configured with `max_old_space_size` setting which should match the limit set in k8s.

# Horizontal Pod Auto-Scaler (HPA)

https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/

We scale our apps by scaling out, that is, by adding more instances. In k8s, each instance is a pod. Pods are managed by a `deployment`. HPA manages the pod count of a `deployment`. It adds or removes pods in response to changes in workload. It has several knobs:

- `minReplicas` specifies the number of pods a deployment has at a minimum. Even if there's zero load, HPA still ensures there is that number of pods.
- `maxReplicas` specifies the maximum number of pods a deployment can have. HPA caps the count at that, even if load is sky-high.
- `targetCPUUtilizationPercentage` tells HPA to maintain pods' CPU utilization at that level. When utilization exeeds (or drops below) the target, HPA adds (or removes) pods, but pod count will be constrained by min/max settings.

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
- Set it to 2 for redundancy.

### maxReplicas
- Set it to as many as required to meet reasonable workload. We have unlimited capacity. Cluster Auto-Scaler will add EC2 instances to back up the pods. Cap it at a number beyond which you feel is unreasonable for the app.

### targetCPUUtilizationPercentage
- Set it to less than 100% so there is headroom for the pods to meet quick surges in workload, so that client requests are not dropped while HPA/CA add pods/EC2-instances which takes time. But don't set it so low that a lot of CPU sits idle. Try 70%-80%. For example, if set at 70%, pods' CPU utilization will be around 70%. When there's a surge in workload and HPA has added pods up to max, utilization will go beyond 70%.

# Process of tuning those parameters.
It takes iterations to get those parameters right. Generally, when launching an app, give it more resources (especially memory) than you think it needs, observe actual utilization over time, and dial down as needed. Here's a dashboard that helps monitoring an app's resource usage over time:

https://app.datadoghq.com/dashboard/2n5-6tr-ypp/kubernetes-cpumemory-usage-by-deployment

It might help to have a view of resource usage/allocation cluster wide. Here's a dashboard for that:

https://app.datadoghq.com/dashboard/u2e-uhw-hwj/kubernetes-cpumemory-usage-by-cluster

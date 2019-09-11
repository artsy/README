---
title: System Criticality
description: A framework for treating systems differently according to how critical they are
---

We'd like to identify gaps in the health and resilience of our platform as well as prioritize efforts to address
them, but our platform comprises dozens of systems with very different needs and uses. This framework aims to
recognize those differences with a shared vocabulary, so we can set expectations for different systems accordingly.

## System Criticality Framework

### Level 3 (_critical_):

Systems that are essential to basic business operations such as registration, authentication, browsing, inquiring,
bidding, and buying. These systems understandably experience a relatively high throughput, and any disruptions can
have sizable financial and brand impact.

### Level 2 (_important_):

Systems with limited throughput or public-facing functions. Disruptions may interfere with certain business
operations or have mild financial or brand impact.

### Level 1 (_supported_):

Internal utilities or systems with only occasional usage. Experimentation should be cheap and easy, so we embrace
that some tools serve only a few individuals or use cases.

### Level 0 (_unsupported_):

Retired systems, spikes, or time-bound experiments that aren't significantly used. There shouldn't ever be many of
these systems, nor should product managers have to consider them. They aren't expected to satisfy the objectives
below.

## System expectations (draft)

Each level has corresponding expectations for how the system is built, operated, and maintained. These are _target_
expectations and existing systems may not fully comply [yet]. New systems should aim to abide by these as much as
possible.

|                   | Level 1                                                                                                                                                                                                    | Level 2                                                  | Level 3                                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Development       | READMEs contain up-to-date set-up instructions<br/>Code review on all [pull requests](/playbooks/engineer-workflow.md#pull-requests)<br/>New systems or significant new components undergo [tech review]() | &larr;ditto                                              | &larr;ditto +<br/>Production environment is replicable locally (TODO)                                                                   |
| Testing           | Automated tests<br/>Tests are run on PRs and `master` by a Continuous Integration pipeline                                                                                                                 | &larr;ditto                                              | &larr;ditto +<br/>Test coverage tooling                                                                                                 |
| Deployment        | Zero-downtime deployment                                                                                                                                                                                   | &larr;ditto +<br/>High-fidelity staging environment      | &larr;ditto +<br/>Deployment and orchestration by Kubernetes                                                                            |
| Availability      | External availability monitoring                                                                                                                                                                           | &larr;ditto                                              | &larr;ditto                                                                                                                             |
| Performance       |                                                                                                                                                                                                            |                                                          | Latency-based monitors and alerting (tailored to service)                                                                               |
| Errors            |                                                                                                                                                                                                            | Error tracking                                           | &larr;ditto +<br/>Error rate alerting                                                                                                   |
| Monitoring        |                                                                                                                                                                                                            | Application instrumentation (e.g., Datadog)              | &larr;ditto                                                                                                                             |
| Incident handling | Standard [incident response times](/playbooks/support/on-call-slo.md) (pending improved notifications)                                                                                                     | &larr;ditto                                              | &larr;ditto +<br/>Downtime automatically reported to Opsgenie as incidents<br/>Incidents are reported and updated on public status page |
| Data              | Automated backups<br/>PII usage is avoided and, when necessary, documented and integrated with account-deletion procedures                                                                                 | &larr;ditto                                              | &larr;ditto +<br/>Production data or a subset synced to staging environment                                                             |
| Security          | Github vulnerability-tracking enabled<br/>Database encryption at rest _advised_ for new systems<br/>Response times for bounties/vulnerabilities TBD (TODO)                                                 | &larr;ditto +<br/>Database encryption at rest _required_ | &larr;ditto                                                                                                                             |

See the [full list of projects](https://www.notion.so/artsy/17c4b550458a4cb8bcbf1b68060d63e6)🔒 for how individual
systems align with these levels.

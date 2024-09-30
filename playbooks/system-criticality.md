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

|                   | Level 1                                                                                                                                                                                                                              | Level 2                                                                                  | Level 3                                                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Development       | <ul><li>READMEs contain up-to-date set-up instructions</li><li>Code review on all [pull requests](/playbooks/engineer-workflow.md#pull-requests)</li><li>New systems or significant new components undergo [tech review]()</li></ul> | <ul><li>&larr;ditto</li></ul>                                                            | <ul><li>&larr;ditto and...</li><li>Production environment is replicable locally (TODO)</li></ul>                                                                       |
| Testing           | <ul><li>Automated tests</li><li>Tests are run on PRs and `master` by a Continuous Integration pipeline</li></ul>                                                                                                                     | <ul><li>&larr;ditto</li></ul>                                                            | <ul><li>&larr;ditto and...</li><li>Test coverage tooling</li></ul>                                                                                                     |
| Deployment        | <ul><li>Zero-downtime deployment</li></ul>                                                                                                                                                                                           | <ul><li>&larr;ditto and...</li><li>High-fidelity staging environment</li></ul>           | <ul><li>&larr;ditto and...</li><li>Deployment and orchestration by Kubernetes</li></ul>                                                                                |
| Performance       |                                                                                                                                                                                                                                      |                                                                                          | <ul><li>Latency-based monitors (e.g. p90) and alerting, tailored to service</li></ul>                                                                                  |
| Errors            |                                                                                                                                                                                                                                      | <ul><li>Error tracking (e.g., Sentry)</li>                                               | <ul><li>&larr;ditto and...</li><li>Error rate alerting (e.g., Datadog monitors)</li></ul>                                                                              |
| Monitoring        | <ul><li>External availability monitoring</li></ul>                                                                                                                                                                                   | <ul><li>&larr;ditto and...</li><li>Application instrumentation (e.g., Datadog)</li></ul> | <ul><li>&larr;ditto</li></ul>                                                                                                                                          |
| Incident handling | <ul><li>Standard [incident response times](https://www.notion.so/artsy/Incident-Handling-111cab0764a0808c993ec19b352cfab9?pvs=4#111cab0764a080f18b64e2194e2ef1d3)🔒 (pending improved notifications)</li></ul>                                                                                                             | <ul><li>&larr;ditto</li></ul>                                                            | <ul><li>&larr;ditto and...</li><li>Downtime automatically reported to Opsgenie as incidents</li><li>Incidents are reported and updated on public status page</li></ul> |
| Data              | <ul><li>Automated backups</li><li>PII usage is avoided and, when necessary, documented and integrated with account-deletion procedures</li></ul>                                                                                     | <ul><li>&larr;ditto</li></ul>                                                            | <ul><li>&larr;ditto and...</li><li>Production data or a subset synced to staging environment</li></ul>                                                                 |
| Security          | <ul><li>Github vulnerability-tracking enabled</li><li>Database encryption at rest _advised_ for new systems</li><li>X response time for bounties/vulnerabilities (TODO)</li></ul>                                                    | <ul><li>&larr;ditto and...</li><li>Database encryption at rest _required_</li></ul>      | <ul><li>&larr;ditto</li></ul>                                                                                                                                          |

See the [full list of projects](https://www.notion.so/artsy/17c4b550458a4cb8bcbf1b68060d63e6)🔒 for how individual
systems align with these levels.

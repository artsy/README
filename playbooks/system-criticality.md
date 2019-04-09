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
these systems, and they aren't expected to satisfy the objectives below.

## System expectations (DRAFT)

Each level has corresponding expectations for how the system is built, operated, and maintained:

**These are all TBD pending further discussion.**

|                              | Level 1                                                                      | Level 2                                                                                                    | Level 3                                                                                                                                                                           |
| ---------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Development                  | READMEs contain up-to-date set-up instructions                               | READMEs contain up-to-date set-up instructions                                                             | One-click development environment set-up                                                                                                                                          |
| Testing and Deployment       | Continuous integration                                                       | Continuous integration<br/>Zero-downtime deployment                                                        | Continuous integration<br/>Zero-downtime deployment<br/> Automated test coverage &gt;=90&percnt;                                                                                  |
| Availability and Performance |                                                                              | External availability monitoring<br/>&gt;99.9&percnt; uptime                                               | External availability monitoring<br/>&gt;99.99&percnt; uptime<br/>&lt;200ms average response time (APIs)<br/>&lt;1s average response time (interactive sites)                     |
| Monitoring                   |                                                                              | Application instrumentation (e.g., Datadog)<br/>Error tracking<br/>Latency and error rate threshold alerts | Application instrumentation (e.g., Datadog)<br/>Error tracking<br/>Latency and error rate threshold alerts<br/>Business metric anomaly alerts<br/>Dedicated monitoring dashboards |
| Support                      | Fixes are prioritized with respective teams' backlogs rather than #incidents | Incident response time &lt;30 min. during waking hours                                                     | Incident response time &lt;5 min.                                                                                                                                                 |
| Data                         |                                                                              | Weekly backups                                                                                             | Daily backups                                                                                                                                                                     |
| Security                     |                                                                              | Known vulnerabilities patched within 30 days                                                               | Known vulnerabilities patched within 7 days                                                                                                                                       |

See the [full list of projects](https://github.com/artsy/potential/blob/master/Project-List.md)🔒 for how
individual systems align with these levels.

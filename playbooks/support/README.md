# Engineering Support @ Artsy

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Wait!](#wait)
- [Process Overview](#process-overview)
- [On-Call Responsibilities](#on-call-responsibilities)
- [Preparing for your on-call shift](#preparing-for-your-on-call-shift)
- [Responding to an incident](#responding-to-an-incident)
- [Severity of Incidents](#severity-of-incidents)
- [Best practices](#best-practices)
- [Handing-off to a new shift](#handing-off-to-a-new-shift)
- [Helpful Resources and Playbooks](#helpful-resources-and-playbooks)
  - [Point-people](#point-people)
  - [Engineering team playbooks](#engineering-team-playbooks)
  - [Non-engineering team playbooks](#non-engineering-team-playbooks)
  - [Artsy domain information](#artsy-domain-information)
  - [External links](#external-links)
- [Special cases](#special-cases)
  - [Trading shifts](#trading-shifts)
  - [Team members who leave](#team-members-who-leave)
  - [Holidays](#holidays)
- [Examples](#examples)
  - [Non-incidents](#non-incidents)
  - [Incidents](#incidents)
- [Additional Resources](#additional-resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

This doc outlines our process for tackling _urgent engineering support_, which generally encompasses how we deal
with:

- **incidents:** timely issues relating to product availability, affecting a significant proportion of users, or
  business-critical functions.
- **critical defects:** issues that we discover that must be fixed with an _immediate_ code change or data update.

These are different than non-urgent bugs/change requests/features, which are prioritized and tackled in teams'
sprints. See [below](#examples) for some common examples.

## Wait!

If you are new to on-call or looking for a refresher, we recommend watching the
[on-call onboarding session](https://drive.google.com/file/d/1nGtNLCwP9zOBxhocnAFI-Ua1xs7eJYyD/view?usp=sharing) 🔒
we ran on June 13, 2019 which talks through your responsibilities as an on-call engineer.

Note: The [onboarding session](https://drive.google.com/file/d/1nGtNLCwP9zOBxhocnAFI-Ua1xs7eJYyD/view?usp=sharing)
🔒 we ran on March 8, 2019 is still largely relevant, but includes instructions for tracking incidents via Jira
Ops, which is now outdated. See the link above for instructions for how to use OpsGenie for this process.

## Process Overview

In order to ensure stability every week, **two** engineers will be "on-call." On a staggered rotating schedule
which is determined at least a month in advance (see [scheduling doc](scheduling.md)).

On Mondays and Wednesdays, rotating on-call engineers sync up and hand off any ongoing responsibilities:

- Review active and recent incidents [in OpsGenie][opsgenie-all-incidents]
- Hand off any in-progress incident remediation tasks ([see responding doc](responding.md))

[opsgenie-all-incidents]: https://artsy.app.opsgenie.com/incident/list

## On-Call Responsibilities

During work hours, on-call engineers are responsible for responding to issues in
[the #incidents slack channel](https://artsy.slack.com/messages/C9RK0BLEP/) 🔒 in a timely fashion. Outside of work
hours, engineers are _only_ responsible for downtime issues.

While on-call, you are accountable for investigating and fixing timely issues, escalating to additional
point-people and/or routing to team-specific backlogs where appropriate.

Your top priority during an on-call period is to ensure the resolution of critical issues. Use your judgment about
participating in ongoing sprint and team activities.

While we would _like_ to have 24/7 on-call coverage, we recognize that we don't yet have a good solution for
notifying engineers during non-work hours. Do your best to keep an eye out for issues, and lean on those in more
favorable timezones where appropriate. See our [On-Call SLO document](on-call-slo.md) for a detailed description of
the coverage we currently promise.

## Preparing for your on-call shift
- Make sure you have read all the above.
- [Set up Slack Notifications](https://github.com/artsy/README/blob/master/playbooks/support/slack-notifications.md)

## Responding to an incident

See the [responding doc](responding.md).

## Severity of Incidents

See the [responding doc](responding.md#severity-of-incidents) for levels of severity.

## Best practices

- **Use slack threads** religiously in #incidents and #alerts to keep the channel and its notifications focused,
  and allow others to monitor for new incidents at a glance.
- **Star dedicated incident channels**. If you subscribe to many channels, it's easy to lose track of new ones. If
  you're helping debug an incident, _Star_ its dedicated channel so it appears at the top of your list.
- **Improve the support process as you go**.
  - Document your debugging/fixing process in engineering playbooks
  - Contribute to shared resources (about monitoring, etc.)
  - Suggest improvements to the process
  - Consider updates to team playbooks (i.e. GR help site, auctions team playbooks)
  - Improve shared tooling/monitoring/alerting

## Handing-off to a new shift

- On the last day of your shift verify in [OpsGenie schedule](https://artsy.app.opsgenie.com/schedule/whoIsOnCall)
  who is coming to replace you and have a quick check in with them about current outstanding issues.
- Update header of the slack #incidents channel with the current on-call engeneers' names.

## Helpful Resources and Playbooks

### Point-people

You can find the point people in the [Potential Wiki](https://github.com/artsy/potential/wiki) 🔒.

### Engineering team playbooks

- [The wiki](https://github.com/artsy/potential/wiki) 🔒 contains playbooks of support procedures for various teams
  and systems.

### Non-engineering team playbooks

- [GR help site](https://sites.google.com/a/artsymail.com/gr-common-questions/)
- [Live Auction Integration Playbook](https://docs.google.com/presentation/d/1PQyolnGtglfqWxoam1ETgmQ3YeNxsSyyJI84tJh6Qsc/edit#slide=id.p)

### Artsy domain information

- [Engineering projects list](https://www.notion.so/artsy/17c4b550458a4cb8bcbf1b68060d63e6) 🔒
- [Monitoring](https://github.com/artsy/potential/blob/master/platform/Monitoring.md) 🔒
- [Domain Models](https://github.com/artsy/potential/blob/master/platform/DomainModels.md) 🔒
- [Status Page](http://status.artsy.net/)

### External links

- [Atlassian's guide to on-call](https://www.atlassian.com/software/jira/ops/handbook/responding-to-an-incident)

## Special cases

### Trading shifts

If you run into a scheduling conflict for your shift, please trade shifts as early as possible. Find someone to
swap with and update both parties' events in the
[OpsGenie schedule](https://artsy.app.opsgenie.com/teams/dashboard/ee381004-a72e-42ef-a733-b350d6693c6c/main) by
following
[these instructions](https://github.com/artsy/README/blob/master/playbooks/support/scheduling.md#trading--overriding-shifts).

### Team members who leave

If someone who is scheduled to be on-call ends up leaving the engineering team (by moving to a different team or
leaving Artsy altogether), it is their (previous) manager's responsibility to cover their shift. The manager will
either take the shift themselves or, if they are unavailable, find someone who can.

### Holidays

Holidays (such as labor day in the US) should be treated as if they are weekends.

For the week between Christmas and New Years, we operate outside of normal shifts. This week is broken into 2-day
shifts that individuals can volunteer for.

## Examples

If someone reports a non-incident, it's helpful to explain that what they're reporting isn't something you can help
with. People reporting problems are still learning the process too, so a response like:

> This falls outside the scope of immediate support, so I've opened a ticket for you. You can talk to the team PM
> about prioritization. `Add a link to the ticket here.`

This can be a lot more effective, and more in-line with Artsy's values, than "What you've reported isn't an
incident, talk to your PM." Remember, we're all on the same team!

### Non-incidents

- Charge details for partners need updating
- Single partner cannot access CMS
- Artwork appearance on site ("How come it's not showing up in...")

### Incidents

- Multiple simultaneous Intercom support requests from partners (payments not succeeding, login failures)
- Auction artworks are not available before auction open
- _Any_ automated alert that shows up in #incidents

## Additional Resources

<!-- prettier-ignore-start -->
<!-- start_toc -->
| Doc | Overview |
|--|--|
| [Scheduling On-Call](/playbooks/support/scheduling.md#readme) | How to schedule the next round of on-call |
<!-- end_toc -->
<!-- prettier-ignore-end -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Engineering Support @ Artsy](#engineering-support--artsy)
  - [Process Overview](#process-overview)
  - [On-Call Responsibilities](#on-call-responsibilities)
  - [Responding to an incident](#responding-to-an-incident)
    - [Step 1: Alert](#step-1-alert)
    - [Step 2: Raise](#step-2-raise)
    - [Step 3: Assess and Identify](#step-3-assess-and-identify)
    - [Step 4: Address Incident](#step-4-address-incident)
      - [Investigate --> Identify --> Escalate --> Fix](#investigate----identify----escalate----fix)
      - [Communicate](#communicate)
    - [Step 5: Resolve](#step-5-resolve)
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
    - [Team members who leave](#team-members-who-leave)
    - [Holidays](#holidays)
  - [Examples](#examples)
    - [Non-incidents](#non-incidents)
    - [Incidents](#incidents)
- [Additional Resources](#additional-resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Engineering Support @ Artsy

This doc outlines our process for tackling _urgent engineering support_, which generally encompasses how we deal
with:

- **incidents:** timely issues relating to product availability, affecting a significant proportion of users, or
  business-critical functions.
- **critical defects:** issues that we discover that must be fixed with an _immediate_ code change or data update.

These are different than non-urgent bugs/change requests/features, which are prioritized and tackled in teams'
sprints. See [below](#examples) for some common examples.

## Process Overview

In order to ensure stability every week, **two** engineers will be "on-call." On a staggered rotating schedule
which is determined at least a month in advance (giving people ample time to make changes if need-be).

The schedule is configured on the
[Engineering On-Call calendar](https://calendar.google.com/calendar/embed?src=artsymail.com_nolej2muchgbpne9etkf7qfet8%40group.calendar.google.com&ctz=America%2FNew_York).
Trading shifts (because of vacations, obligations, etc.) is encouraged as long as the calendar is kept up-to-date.
Please address any scheduling issues as early as possible.

During work hours, on-call engineers are responsible for responding to issues in
[the #incidents slack channel](https://artsy.slack.com/messages/C9RK0BLEP/) 🔒 in a timely fashion. Outside of work
hours, engineers are _only_ responsible for downtime issues.

## On-Call Responsibilities

While on-call, you are accountable for investigating and fixing timely issues, escalating to additional
point-people and/or routing to team-specific backlogs where appropriate.

Your top priority during an on-call period is to ensure the resolution of critical issues. Use your judgment about
participating in ongoing sprint and team activities.

While we would _like_ to have 24/7 on-call coverage, we recognize that we don't yet have a good solution for
notifying engineers during non-work hours. Do your best to keep an eye out for issues, and lean on those in more
favorable timezones where appropriate.

## Responding to an incident

### Step 1: Alert

Incidents can be raised by automated or manual means. While on-call, you are responsible for being available to
respond to these issues.

- Monitor the [#incidents slack channel](https://artsy.slack.com/messages/C9RK0BLEP/) 🔒 for critical issues. This
  is where urgent issues are raised, either manually or via automated alerts.
- Monitor the [#alerts](https://artsy.slack.com/messages/C0HP61PUJ/) slack channel _during business/waking hours_.
  These automated system alerts _may_ be the first sign of a problem but don't _necessarily_ warrant treatment as
  immediate incidents. E.g., load-balancers may route around failing EC2 instances or auto-scaling may bring up
  capacity in response to load.
- If the issue is obviously a non-incident, take the time to educate the reporter on the desired process (see the
  [examples](#examples) below). You may point them to the
  [Guide to Reporting Bugs](https://www.notion.so/artsy/Guide-to-reporting-bugs-cc25e1ff41194228b476c4963c646817)
  doc in Notion which describes this in a general way.

### Step 2: Raise

1. When an incident is raised in the channel or identified in another way, the on-call team first **tracks the
   incident** by creating a ticket in [Jira Ops](https://artsyproduct.atlassian.net/projects/INCIDENT/incidents),
   based on the information they know at that time. Some workflow steps:

- In the description on the ticket, link to the slack thread in #incidents.
- Take your best guess at the other information, it can always be edited later.

2. Using the slack integration on the Jira Ops ticket, create a new slack channel to discuss resolution.
3. In the original slack thread in #incidents, put a link to the incident that was created and _direct engineers to
   the newly created slack channel for discussing its resolution_.

### Step 3: Assess and Identify

1. A member of the on-call team marks the issue as **FIXING**. This person will be automatically assigned to the
   issue. For the duration of the incident resolution, this person is responsible for _facilitation_. This may
   involve pulling in other engineers to help solve the problem and delegating tasks like external communication to
   the other on-call team member.
2. Determine the severity of the incident by trying to reproduce the problem and capturing the answers to the
   following questions in the Jira Ops ticket:

- How many people (or partners, etc.) does this affect?
- Have you been able to reproduce?
- Is this a new problem or something that we are aware of?

3. Update the severity on the Jira Ops ticket. See [severity of incidents](#severity-of-incidents) below.
4. If the reported incident does not qualify for an immediate response:

- Direct stakeholders in the slack thread to a product team’s channel to ensure that a Jira Issue is tracked for
  this possible issue
- Link the Jira Ops ticket to any relevant bugs that are tracked (and create an additional one if necessary)
- Mark the ticket as **CANCELED**

### Step 4: Address Incident

#### Investigate --> Identify --> Escalate --> Fix

Discuss the incident's resolution in the dedicated slack channel.

- Fix if possible using [accumulated playbooks (wiki)](https://github.com/artsy/potential/wiki) 🔒.
- If unable to fix using shared resources, contact the relevant [point-person](#point-people) for help and pair
  with them on a fix. Be sure to contribute lessons back to shared documentation. **You are not expected to know
  the ins and outs of every system, so don't hesitate to involve the wider team.**
  - Point-people should only be contacted during off-hours for outages that the on-call engineers are unable to
    diagnose.
- Share any applicable work-arounds or talking points in the thread to unblock teammates or partners.
- If you make an immediate fix but addressing the root cause requires further work, add the issue to the bug
  backlog so it can be prioritized accordingly.

**Note:** You are not responsible for fixing all of the bugs that you find. Most problems that require a coding
change should be addressed by the relevant team.

#### Communicate

One of the on-call members handles internal and external communication for the incident.

- #incidents is for non-on-call people to raise possible incidents or follow up (questions, etc.) about existing
  threads.
- Resolution happens exclusively in the dedicated slack channel associated with the Jira Ops ticket.
- Any meaningful updates or discoveries are recorded (by the assignee, by default) to the Jira Ops ticket.
  Significant milestones (new incident, availability changes, incident resolved) are recorded this way.
- Any incident with a severity of Critical should be communicated externally via the status page. Communication
  does not have to be detailed. The most important thing is acknowledging issues and communicating progress towards
  a resolution. Use the status page integration on the Jira Ops ticket where possible.

### Step 5: Resolve

Incidents are resolved when the immediate issue has been addressed. After that, the team needs to make sure all
follow-up itesm are tracked and the Jira Ops ticket clearly reflects this state.

1. Create any necessary follow-up tickets either in the bug backlog or a specific team’s project board. Link these
   from within the Jira Ops ticket.
2. Post any final updates to the Jira Ops ticket

- Update timestamps
- Mark the ticket as **RESOLVED**
- Add any additional labels or metadata that may be relevant later

3. Resolve any outstanding incidents on our status page
4. If the incident was Critical, create a post mortem following the guidelines in our
   [post_mortems repo](https://github.com/artsy/post_mortems).

## Severity of Incidents

The following definitions are borrowed from
[Atlassian's playbook](https://www.atlassian.com/software/jira/ops/handbook/responding-to-an-incident):

- **Critical**: A critical incident with very high impact (i.e. customer data loss; customer-facing service like
  CMS is down)
- **Major**: A major incident with significant impact (i.e. a large number of images are not showing up; a small
  number of partners cannot access CMS)
- **Minor**: A minor incident with low impact (i.e. a single user cannot place a bid in an auction; a page linked
  from the app is showing a 404)

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

After [engineering-wide stand-up](/events/open-standup.md#dev-team-standup-at-artsy) is a good time for the coming
and going on-call engineers to sync up and hand off any ongoing responsibilities. Customarily we:

- Review resolved and active items on the Incidents board, sharing anything the new team must know to handle them
  or identifying any final action items for the departing team to fully resolve them (like creating Jira tickets,
  releasing PRs, etc.).
- Finally, the departing team should take this opportunity to update
  [the accumulated playbooks](https://github.com/artsy/potential/wiki) 🔒 with any last lessons.

## Helpful Resources and Playbooks

### Point-people

You can find the point people in the [Potential Wiki](https://github.com/artsy/potential/wiki) 🔒.

### Engineering team playbooks

- [The wiki](https://github.com/artsy/potential/wiki) 🔒 contains playbooks of support procedures for various teams
  and systems.
- [Setting up Slack Notifications](https://github.com/artsy/README/blob/master/playbooks/support/slack-notifications.md)

### Non-engineering team playbooks

- [GR help site](https://sites.google.com/a/artsymail.com/gr-common-questions/)
- [Live Auction Integration Playbook](https://docs.google.com/presentation/d/1PQyolnGtglfqWxoam1ETgmQ3YeNxsSyyJI84tJh6Qsc/edit#slide=id.p)

### Artsy domain information

- [Engineering projects map](https://github.com/artsy/potential/blob/master/Project-List.md) 🔒
- [Monitoring](https://github.com/artsy/potential/blob/master/platform/Monitoring.md) 🔒
- [Domain Models](https://github.com/artsy/potential/blob/master/platform/DomainModels.md) 🔒
- [Status Page](http://status.artsy.net/)

### External links

- [Atlassian's guide to on-call](https://www.atlassian.com/software/jira/ops/handbook/responding-to-an-incident)

## Special cases

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

# Additional Resources

<!-- prettier-ignore-start -->
<!-- start_toc -->
| Doc | Overview |
|--|--|
| [Scheduling On-Call](/playbooks/support/scheduling.md#readme) | How to schedule the next round of on-call |
<!-- end_toc -->
<!-- prettier-ignore-end -->

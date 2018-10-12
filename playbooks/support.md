---
title: The Artsy Engineering Support process
description: A process overview and some tips and tricks.
---

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
Trading shifts (because of vacations, obligations, etc.) is encouraged as long as the calendar is kept up-to-date. Please address any scheduling issues as early as possible.

During work hours, on-call engineers are responsible for responding to issues in
[the #incidents slack channel](https://artsy.slack.com/messages/C9RK0BLEP/) in a timely fashion. Outside of work
hours, engineers are _only_ responsible for downtime issues.

The two engineers who are on-call are free to split the responsibility for monitoring outside of work hours, but we
suggest either doing every other day or first half/second half.

## On-Call Responsibilities

While on-call, you are accountable for investigating and fixing timely issues, escalating to additional
point-people and/or routing to team-specific backlogs where appropriate.

Your top priority during an on-call period is to address critical issues. Use your judgement about participating in
ongoing sprint and team activities.

#### 1. Be available to answer requests and respond to immediate issues

- On-call is a 24/7 responsibility (for critical issues). The non-work hours can be split across the on-call
  engineers and over timezones where appropriate.
- Monitor the [#incidents slack channel](https://artsy.slack.com/messages/C9RK0BLEP/) for critical issues.
- Look out for trends and create bugs (in the
  [universal bug backlog](https://artsyproduct.atlassian.net/secure/RapidBoard.jspa?rapidView=34)) where necessary
  that can be triaged into individual teams' sprints by a PM.
- If the issue is obviously a non-incident, take the time to educate the reporter on the desired process (see the [examples](#examples) below). You may point them to the [Guide to Reporting Bugs](https://www.notion.so/artsy/Guide-to-reporting-bugs-cc25e1ff41194228b476c4963c646817) doc in Notion which describes this in a general way.

#### 2. Investigate and address critical issues

- Acknowledge the issue in slack (escalate to the [#incidents](https://artsy.slack.com/messages/C9RK0BLEP/) channel
  if not already there)
- **Use slack threads** to keep the channel and its notifications focused, and allow others to monitor for new
  incidents at a glance.
- Investigate the issue individually and as a pair.
- Judge the severity (based on intuition or a helpful PM/business owner)
- Fix if possible using [accumulated playbooks (wiki)](https://github.com/artsy/potential/wiki).
- If unable to fix using shared resources, contact the relevant [point-person](#point-people) for help and pair
  with them on a fix. Be sure to contribute lessons back to shared documentation. **You are not expected to know the ins and outs of every system, so don't hesitate to involve the wider team.**
- Point-people should only be contacted during off-hours for outages that the on-call engineers are unable to
  diagnose.
- Share any applicable work-arounds or talking points in the thread to unblock teammates or partners.
- If you make an immediate fix but addressing the root cause requires further work, add the issue to the bug
  backlog so it can be prioritized accordingly.
- If the issue was mis-reported and doesn't require a timely fix, surface to PM/add to backlog for tracking by the
  appropriate team

**Note:** You are not responsible for fixing all of the bugs that you find. Most problems that require a coding change should be addressed by the relevant team.

#### 3. Track incidents' status

Incidents are recorded on [the incidents Trello board](https://trello.com/b/sZQ9qpVo/incidents), which provides
visibility into what is being addressed and helps us track how often certain issues occur (so it's okay if
something appears multiple times throughout the week). This board should only be edited by the on-call engineers
and others helping out. It's not a replacement for reporting issues in slack, and tickets that require additional
engineering work should be tracked in Jira.

Tips for using the incidents Trello:

- Include a link to the original slack discussion
- Leave a link to the Trello card in the slack discussion
- Include links to any Jira tickets made
- Post updates to keep track of progress
- Document any FAQ updates
- Note what kind of follow-up is needed (if any)

#### 4. Improve the support process and resources for the next rotation

- Document your debugging/fixing process in engineering playbooks
- Contribute to shared resources (about monitoring, etc.)
- Suggest improvements to the process
- Consider updates to team playbooks (i.e. GR help site, auctions team playbooks)
- Improve shared tooling/monitoring/alerting

## Handing-off to a new shift

After [engineering-wide stand-up](https://github.com/artsy/potential#engineering-wide-standup) is a good time for
the coming and going on-call engineers to sync up and hand off any ongoing responsibilities. Customarily we:

- Update the "Resolved" column in [the Incidents trello](https://trello.com/b/sZQ9qpVo/incidents) with the past
  week's dates and create a new one for the upcoming shift.
- Review resolved and active board items, sharing anything the new team must know to handle them or identifying any
  final action items for the departing team to fully resolve them (like creating Jira tickets, releasing PRs,
  etc.).
- Finally, the departing team should take this opportunity to update
  [the accumulated playbooks](https://github.com/artsy/potential/wiki) with any last lessons.

## Point-people

You can find the point people in the [Potential Wiki](https://github.com/artsy/potential/wiki).

## Helpful Resources and Playbooks

### Slack channels

- [#incidents](https://artsy.slack.com/messages/C9RK0BLEP/) requires close monitoring (30 min. response is
  expected). This is where urgent issues are raised, either manually or via automated alerts.
- [#alerts](https://artsy.slack.com/messages/C0HP61PUJ/) should be monitored during business and waking hours.
  These automated system alerts _may_ be the first sign of a problem but don't _necessarily_ warrant treatment as
  immediate incidents. E.g., load-balancers may route around failing EC2 instances or auto-scaling may bring up
  capacity in response to load.
- Artsy team members can get help from peers in these additional channels:
  - [#gallery-help](https://artsy.slack.com/messages/C7LEJU1QU/): for GR team to get help from their peers on
    common issues
  - [#auctions-ops](https://artsy.slack.com/messages/C0RTGJHDG/): where the auctions ops team may discuss issues
    they are having/help each other

### Engineering team playbooks

- [The wiki](https://github.com/artsy/potential/wiki) contains playbooks of support procedures for various teams
  and systems.
- [Setting up Slack Notifications](https://github.com/artsy/README/blob/master/processes/support/slack-notifications.md)

### Non-engineering team playbooks

- [GR help site](https://sites.google.com/a/artsymail.com/gr-common-questions/)
- [Live Auction Integration Playbook](https://docs.google.com/presentation/d/1PQyolnGtglfqWxoam1ETgmQ3YeNxsSyyJI84tJh6Qsc/edit#slide=id.p)

### Artsy domain information

- [Engineering projects map](https://github.com/artsy/potential/wiki/Project-List)
- [Monitoring](https://github.com/artsy/potential/blob/master/platform/Monitoring.md)
- [Domain Models](https://github.com/artsy/potential/blob/master/platform/DomainModels.md)
- [Status Page](status.artsy.net)

## Special cases

### Team members who leave
If someone who is scheduled to be on-call ends up leaving the engineering team (by moving to a different team or leaving Artsy altogether), it is their (previous) manager's responsibility to cover their shift. The manager will either take the shift themselves or, if they are unavailable, find someone who can.

### Holidays

Holidays (such as labor day in the US) should be treated as if they are weekends.

For the week between Christmas and New Years, we operate outside of normal shifts. This week is broken into 2-day shifts that individuals can volunteer for.

## Examples

If someone reports a non-incident, it's helpful to explain that what they're reporting isn't something you can help
with. People reporting problems are still learning the process too, so a response like:

> This falls outside the scope of immediate support, so I've opened a ticket for you. You can talk to the team PM
> about prioritization. `Add a link to the ticket here.`

This can be a lot more effective, and more in-line with Artsy's values, than "What you've reported isn't an
incident, talk to your PM." Remember, we're all on the same team!

### Incidents

- Multiple simultaneous Intercom support requests from partners (payments not succeeding, login failures)
- Auction artworks are not available before auction open
- _Any_ automated alert that shows up in #incidents

### Non-incidents

- Charge details for partners need updating
- Single partner cannot access CMS
- Artwork appearance on site ("How come it's not showing up in...")

### Urgent Non-incident

- An auction bid which needs changing before an auction
- [...]

For issues like this it's best to contact the related PM, to ask for their advice. This is so that we can 
have a consistent voice across many support engineers and can raise awareness of how to fix these with tools.
If you are struggling to decide 

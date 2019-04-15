# Responding to an incident

## Step 1: Monitor

Incidents can be raised by automated or manual means. While on-call, you are responsible for being available to
respond to these issues.

- Monitor the [#incidents slack channel](https://artsy.slack.com/messages/C9RK0BLEP/) 🔒 for critical issues. This
  is where urgent issues are raised, either manually or via automated alerts.
- Monitor the [#alerts](https://artsy.slack.com/messages/C0HP61PUJ/) slack channel _during business/waking hours_.
  These automated system alerts _may_ be the first sign of a problem but don't _necessarily_ warrant treatment as
  immediate incidents. E.g., load-balancers may route around failing EC2 instances or auto-scaling may bring up
  capacity in response to load.

## Step 2: Raise

1. When an incident is raised in the channel or identified in another way, the on-call team first **tracks the
   incident** by creating a ticket in [Jira Ops](https://artsyproduct.atlassian.net/projects/INCIDENT/incidents),
   based on the information they know at that time. Some workflow steps:

   - In the description on the ticket, link to the slack thread in #incidents or #alerts.
   - Take your best guess at the other information, it can always be edited later.

2. Using the slack integration on the Jira Ops ticket, create a new slack channel to discuss resolution.

   _Jira integrations are known to be flakey. If you have trouble getting the integration to work, simply create a channel named `#incident-N` (where `N` corresponds to the Jira Ops ticket) and link to it from the ticket._

3. In the original slack thread in #incidents, put a link to the incident that was created and _direct engineers to
   the newly created slack channel for discussing its resolution_.

## Step 3: Assess

1. A member of the on-call team marks the issue as **FIXING**. This person will be automatically assigned to the
   issue. For the duration of the incident resolution, this person is responsible for _facilitation_. This may
   involve pulling in other engineers to help solve the problem and delegating tasks like external communication to
   the other on-call team member.
2. Determine and update the [severity of the incident](<(#severity-of-incidents)>) by trying to reproduce the
   problem and following up with stakeholders as-needed. It may be helpful to find answers to the following:

   - How many people (or partners, etc.) does this affect?
   - Have you been able to reproduce?
   - Is this a new problem or something that we are aware of?

3. If the reported incident does not qualify for an immediate response:
   - Take the time to educate the reporter on the desired process (see the
  [examples](#examples) below). You may point them to the
  [Guide to Reporting Bugs](https://www.notion.so/artsy/Guide-to-reporting-bugs-cc25e1ff41194228b476c4963c646817)
  doc in Notion which describes this in a general way.
   - Direct stakeholders in the slack thread to a product team’s channel to ensure that a Jira Issue is tracked for
     this possible issue
   - Link the Jira Ops ticket to any relevant bugs that are tracked (and create an additional one if necessary)
   - Mark the ticket as **CANCELED**


## Step 4: Address Incident

**Investigate --> Identify --> Escalate --> Fix**

Discuss the incident's resolution in the dedicated slack channel.

- Fix if possible using [accumulated playbooks (wiki)](https://github.com/artsy/potential/wiki) 🔒.
- If unable to fix using shared resources, contact the relevant [point-person](#point-people) for help and pair
  with them on a fix. Be sure to contribute lessons back to shared documentation. **You are not expected to know
  the ins and outs of every system, so don't hesitate to involve the wider team.**
- Share any applicable work-arounds or talking points in the thread to unblock teammates or partners.
- If you make an immediate fix but addressing the root cause requires further work, add the issue to the bug
  backlog so it can be prioritized accordingly.

**Note:** You are not responsible for fixing all of the bugs that you find. Most problems that require a coding
change should be addressed by the relevant team.

### Communicate

One of the on-call members handles internal and external communication for the incident.

- #incidents is for non-on-call people to raise possible incidents or follow up (questions, etc.) about existing
  threads.
- Resolution happens exclusively in the dedicated slack channel associated with the Jira Ops ticket.
- Meaningful updates, discoveries, or milestones (e.g. changes in availability or resolution) are added to the Jira
  Ops ticket by the assignee.
- Any incident with public impact should be communicated externally via the status page. Communication does not
  have to be detailed (Not every stage of the incident necessarily need to be communicated on status page). Remember that this page is targeted to a public audience(i.e., users and partners) of Artsy products. Some might be subscribed to receive updates on every communication here. Use your judgement based on severity and duration of the incident. The most important thing is acknowledging the issue, specifying the services affected and communicating key updates and resolutions. Use the status page integration on the Jira Ops ticket for updating Status page.

  _Jira integrations are known to be flakey. If you have trouble getting the integration to work, simply visit [Statuspage](https://statuspage.io), create an incident manually, and link to it from the ticket._

## Step 5: Resolve

Incidents are resolved when the immediate issue has been mitigated. After that, the team needs to make sure all
follow-up items are tracked and the Jira Ops ticket clearly reflects this state.

1. Create any necessary follow-up tickets either in the bug backlog or a specific team’s project board. Link these
   from within the Jira Ops ticket.
2. Post any final updates to the Jira Ops ticket

- Update timestamps
- Mark the ticket as **RESOLVED**
- Add any additional labels or metadata that may be relevant later

3. Resolve any outstanding incidents on our status page via the integration on the Jira Ops ticket.
4. If the incident was Critical, create a post mortem following the guidelines in our
   [post_mortems repo](https://github.com/artsy/post_mortems).
5. Update relevant [playbooks](https://github.com/artsy/potential/wiki) 🔒 with any lessons.

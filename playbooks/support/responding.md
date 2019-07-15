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
   incident** by creating an incident in [OpsGenie](https://artsy.app.opsgenie.com/incident/list), based on the
   information they know at that time. Some workflow steps:

   - Select Artsy as the Impacted Service.
   - Enter a quick description of the problem as the Incident message.
   - Enter a link to the #incidents thread as the Incident description.
   - Select a Priority level from the list using your gut instinct. Refer to the
     [section on Severity of Incidents for guidance](#severity-of-incidents).
   - Take your best guess at the other information, it can always be edited later.

2. Create a Slack channel for this incident for discussion of the technical resolution.

   - Name it #incident-N, where N is the incident number from OpsGenie.
   - Invite the other on-call engineer and any other active responders to the new channel.
   - Add a link to the OpsGenie incident as the Purpose

3. In the original slack thread in #incidents, put a link to the new #incident-N channel and _direct engineers to
   continue communication in that channel_.

4. Update the [Artsy status page](status.artsy.net) by logging into the
   [Artsy StatusPage.io](https://manage.statuspage.io/pages/hmhlbjlmdhgh/incidents) account (creds in 1Password).

   Any incident with public impact should be communicated externally via the status page.

   - Use your judgement to select an "Impact" based on severity and duration of the incident. Refer to the
     [section on Severity of Incidents for guidance](#severity-of-incidents).
   - Communication does not have to be detailed. Not every stage of the incident needs to be communicated on status
     page.
   - Remember that this page is targeted to a public audience (i.e., users and partners) of Artsy products. Some
     might be subscribed to receive updates on every communication here.
   - The most important thing is acknowledging the issue, specifying the services affected and communicating key
     updates and resolutions.

## Step 3: Assess

1. Assign an Incident Commander to the incident. This person is the main point-person for facilitating an incident
   response. The Incident Commander could be yourself, another on-call engineer, or a Subject Matter Expert. See
   the [OpsGenie docs](https://docs.opsgenie.com/docs/incident-response-roles) for more details about incident
   roles.

2. Determine and update the severity of the incident by trying to reproduce the problem and following up with
   stakeholders as-needed. It may be helpful to find answers to the following:

   - How many people (or partners, etc.) does this affect?
   - Have you been able to reproduce?
   - Is this a new problem or something that we are aware of?

3. If the reported incident does not qualify for an immediate response:
   - Take the time to educate the reporter on the desired process (see the [examples](#examples) below). You may
     point them to the
     [Guide to Reporting Bugs](https://www.notion.so/artsy/Guide-to-reporting-bugs-cc25e1ff41194228b476c4963c646817)
     doc in Notion which describes this in a general way.
   - Direct stakeholders in the slack thread to a product team’s channel to ensure that a Jira Issue is tracked for
     this possible issue
   - Link the OpsGenie incident to any relevant bugs that are tracked (and create an additional one if necessary)
   - Mark the incident as **CLOSED**

## Step 4: Address Incident

**Investigate --> Identify --> Escalate --> Fix**

Discuss the incident's resolution in the dedicated Slack channel.

- Fix if possible using [accumulated playbooks (wiki)](https://github.com/artsy/potential/wiki) 🔒.
- If unable to fix using shared resources, contact the relevant [point-person](#point-people) for help and pair
  with them on a fix. Be sure to contribute lessons back to shared documentation. **You are not expected to know
  the ins and outs of every system, so don't hesitate to involve the wider team.**
- Share any applicable work-arounds or talking points in the thread to unblock teammates or partners.
- If you make an immediate fix but addressing the root cause requires further work, add the issue to the bug
  backlog so it can be prioritized accordingly.

**Note:** You are **not** responsible for fixing all of the bugs that you find. Most problems that require a coding
change should be addressed by the relevant team.

### Communicate

One of the on-call members handles internal and external communication for the incident.

- #incidents is for non-on-call people to raise possible incidents or follow up (questions, etc.) about existing
  threads.
- Resolution happens exclusively in the dedicated slack channel associated with the OpsGenie incident.
- Meaningful updates, discoveries, or milestones (e.g. changes in availability or resolution) are added to the
  OpsGenie incident by its responders.
- Communicate progress and major milestones publicly through statuspage.io. Updates don't need to be specific, but
  it is important that we give customers confidence that we are dealing with the incident.

## Step 5: Resolve

Incidents are resolved when the immediate issue has been mitigated. After that, the team needs to make sure all
follow-up items are tracked and the OpsGenie incident clearly reflects this state.

1. Create any necessary follow-up tickets either in the bug backlog or a specific team’s project board. Link these
   from within the OpsGenie incident.
2. Post any final updates to the OpsGenie incident

   - Add a timeline entry describing why you're resolving the incident
   - Mark the incident as **RESOLVED**

3. Resolve any outstanding incidents on our status page via statuspage.io.
4. If the incident was Critical, create a post mortem in OpsGenie.
5. Update relevant [playbooks](https://github.com/artsy/potential/wiki) 🔒 with any lessons.

## Severity of Incidents

### P1 - **Critical**

Critical incidents have a very high impact:

- A user-facing service is down for all users.
- Confidentiality or privacy is breached.
- Customer data loss.
- “All hands on deck.”

The **Critical** level in OpsGenie equates to the **Critical** impact level in statuspage.io.

#### Examples

- Artsy website is down.
- Artsy website is under DDoS attack.

### P2 - **High**

High incidents have a significant impact:

- A user-facing service is down for a subset of users.
- Core functionality is impacted for a specific use-case.
- Need to find the best people to solve as soon as possible.

The **High** level in OpsGenie equates to the **Major** impact level in statuspage.io.

#### Examples

- Partners unable to delete artworks in CMS
- Multiple partners unable to add credit cards
- Artwork pages showing duplicate information

### P3 - **Moderate**

Moderate incidents have a low impact but require some urgency:

- A user-facing service is down for a single user.
- Core functionality is impacted for a single resource.
- Should inform the relevant product team about the issue.

The **Moderate** level in OpsGenie equates to the **Minor** impact level in statuspage.io.

#### Examples

- Broken links in Eigen on UNTITLED art fair page
- A single partner cannot access CMS
- User unable to place bid on lot in live sale, needs to be placed in the backend

### P4 - **Low**

Low incidents have low impact and low urgency:

- Known issues that are on a product team’s radar.
- Issues that can be handled in a regular sprint’s work.

Low incidents do not require an update to the Artsy status page.

#### Examples

- Charge details for a partner need updating.
- Artwork appearance on the site (“how come it’s not showing up in…”).

### P5 - **Informational**

Informational incidents are used primarily for training. Use this for incidents you create to practice incident
response.

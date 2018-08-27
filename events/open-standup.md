---
title: Open Standup
description: How do we do whole-team standup at Artsy?
---

# Dev Team Standup at Artsy

We've been doing engineering stand-ups for as long as there has been an engineering team. The format has changed
over time as the size and scope of Artsy has changed. We're now on our fourth iteration of this process.

Whichever two engineers are beginning their on-call rotation are responsible for running the standup. Pick one
person to run the talking parts, and one person to take notes.

### Ten minutes before a standup

The person handling the talking parts does this stuff ten minutes before standup:

- `@here`s the dev channel. Include where the meeting is in the NYC office (usually the Classroom).
- Remind last week's on-call staff in #dev to prepare their updates about last week's rotation. Something like:
  > @personA @personB reminder, we're looking for a list of major or notable incidents from last week during
  > standup.
- On Mondays that are NOT the start of a sprint, remind the team leads in #dev to prepare their tweet-sized
  updates, something like this:
  > friendly reminder: we’re doing summary updates from tech leads during open standup, so have yours ready! /cc
  > @tech-leads

### What is a good update?

On Mondays that are the start of a sprint, tech leads skip their updates as we've already heard what's going on
during sprint kickoff. It's ok for a tech lead's update to consist of "everything is cool, next!" but also feel
free to cover things like this:

- Should focus on status of product work
- Raises larger technical changes which affect other teams
- Talks about the team effort rather than an individual's work

### During standup

- We start off with props, as a nod towards [People are Paramount][pplp]
- Then we get an update from the CTO
- Then an update from the Product team (someone should be present to give one)
- Then an update from last week's on-call support team, including follow-up work items
- Each tech lead gives a summary of what their teams have been up to
- We leave a spot for potential cross-team issues
- We have a spot to talk about things people are proud of
- We then either announce [the Lunch & Learn][ll], or try find one for the week

These notes are then passed out on to Slack after standup. Everyone leaves links to things they have commented on
during the meeting, if they don't, we chase them up.

## Our Markdown Template

```md
_Props_

-

_CTO Update_

-

_Product Team Updates_

-

_On-call Support Updates_

- This week, @personC and @personD will be on-call for support.
- ## Last week, we saw the following notable incidents (please include follow-up details)

_Team Updates_

- Grow:
- DiscoValuate:
- Purchase:
- Sell:
- Platform:

_Cross-dependencies / Requests for Pairing_

-

_New Milestones / Repos / Blog posts_

-

_Current team-wide RFCs_

-

_Lunch & Learn_

-

_Closing Announcements_

- Ash will be available on Wednesday from 2–3 on the 24th floor, or over Slack, to assist with writing projects. If
  you're writing a blog post, proposing a conference talk, or writing documentation, this is where you can come for
  help.
- Show & Tell is this Friday at 11:30 NYC time in the Studio on 24 (and over Zoom). See the docs for more info:
  https://github.com/artsy/meta/blob/master/meta/show_and_tell.md
- The last two support engineers should stick around to chat with us, the new support engineers after this meeting.
-
```

[pplp]: https://github.com/artsy/meta/blob/master/meta/what_is_artsy.md#people-are-paramount
[ll]: https://github.com/artsy/meta/blob/master/meta/lunch_and_learn.md

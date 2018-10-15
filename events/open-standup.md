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

### During standup

- **Important**: Make sure the person taking notes doesn't have their laptop next to the Zoom speakerphone.
- We start off with props, as a nod towards [People are Paramount][pplp]
- Then we get an update from the CTO
- Then an update from the Product team (someone should be present to give one)
- Then we get updates on new hires, people starting this week, newly accepted offers and etc.
- Then an update from last week's on-call support team, including follow-up work items
- We leave a spot for potential cross-team issues
- We have a spot to talk about things people are proud of
- We then either announce [the Lunch & Learn][ll], or try find one for the week

These notes are then copied into a Notion document, and the link passed into #dev on Slack after standup. Everyone
else leaves links to things they have commented on during the meeting, if they don't, we chase them up.

## Our Markdown Template

```md
_Props_

-

_CTO Update_

-

_Product Manager Updates_

-

_Hiring Updates_

-

_On-call Support Updates_

- This week, @personC and @personD will be on-call for support.
- ## Last week, we saw the following notable incidents (please include follow-up details)

_Cross-dependencies / Requests for Pairing_

-

_New Milestones / Repos / Blog posts_

-

_Current team-wide RFCs_ (see #dev for list 9am EST on Mondays)

-

_Lunch & Learn_ (if you don't know, ask in #lunch_and_learn)

-

_Closing Announcements_

- Show & Tell is this Friday at 11:00 NYC time in the Studio on 24 (and over Zoom). See the docs for more info:
  https://github.com/artsy/meta/blob/master/meta/show_and_tell.md
- The last two support engineers should stick around to chat with us, the new support engineers after this meeting.
- We'll also be having the front-end office hours right after this meeting, so stick around if you have questions.
-
```

[pplp]: https://github.com/artsy/meta/blob/master/meta/what_is_artsy.md#people-are-paramount
[ll]: https://github.com/artsy/meta/blob/master/meta/lunch_and_learn.md

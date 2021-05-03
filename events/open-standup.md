---
title: Open Standup
description: How do we do whole-team standup at Artsy?
---

<!-- NOTE: When making updates to this document, please also update the Notion template https://www.notion.so/artsy/Month-Day-Year-fbc9df949fef430a9f9359f34158dec6 -->

# Dev Team Standup at Artsy

We've been doing engineering stand-ups for as long as there has been an engineering team. The format has changed
over time as the size and scope of Artsy has changed. We're now on our fourth iteration of this process, which you
can [read more about here][standup_blog].

The current on-call engineers run standup. On-call rotations are staggered so an engineer starting on a Monday will
team up with the engineer that started the preceding Wednesday. **Pick one person to do the talking parts
(facilitate the meeting) and one person to take notes**.

### Ten minutes before a standup

The person handling the talking parts does this stuff ten minutes before standup:

- `@here`s the dev channel. Include where the meeting is in the NYC office (usually the Annex).
- Make sure on-call staff are prepared to give an update about the past week's incidents. (if you were on call,
  great! If you weren't, remind your partner.)
- Check the [Lunch&Learn schedule][ll_schedule].
- The meeting starts with props (as a nod towards [People are Paramount][pplp]) and you should begin with giving
  props of your own.

### During standup

**Important**: Make sure the person taking notes doesn't have their laptop next to the Zoom speakerphone.

The person who is facilitating the meeting should use the template below as an agenda.

## After standup

These notes are then copied into a [Notion][] document, and the link passed into #dev on Slack after standup.
Everyone else leaves links to things they have commented on during the meeting, if they don't, we chase them up.

Finally, **review this document** for ways to improve the instructions for next week's meeting.

## Our Markdown Template

```md
_Welcome new team members!_

-

_Props_

-

_Company Updates & Important Communication_

-

_Hiring Updates_

-

_Practice Updates_

- Mobile:
- Web:
- Platform:
- Data:

_On-call Support Updates_

- This week, @personC and @personD will be on-call for support until Wednesday, when @personE rotates on.
- Last week, we saw the following notable incidents (please include follow-up details)

_Cross-dependencies / Requests for Pairing_

-

_Open RFCs (see #dev for list 9am EST on Mondays) or technical plans under consideration_

-

_New Milestones / Repos / Blog Posts / New features or updated functionality released: prompt Auction, Gallery,
Platform, Grow, Purchase teams_

-

_Lunch & Learn_ || _Show & Tell_ (if you don't know, ask in #lunch_and_learn or #dev-show-n-tell)

-

_Closing Announcements_

-

_Optional: Q&A / Open Discussion_

-
```

[pplp]: https://github.com/artsy/README/blob/master/culture/what-is-artsy.md#people-are-paramount
[ll]: https://github.com/artsy/README/blob/master/events/lunch-and-learn.md
[ll_schedule]: https://github.com/artsy/README/projects/1
[notion]: https://www.notion.so/artsy/Standup-Notes-28a5dfe4864645788de1ef936f39687c
[standup_blog]: https://artsy.github.io/blog/2018/05/07/fully-automated-standups/

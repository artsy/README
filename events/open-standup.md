---
title: Open Standup
description: How do we do whole-team standup at Artsy?
---

# Dev Team Standup at Artsy

We've been doing engineering stand-ups for as long as there has been an engineering team. The format has changed
over time as the size and scope of Artsy has changed. We're now on our fourth iteration of this process.

The current on-call engineers run standup. On-call rotations are staggered so an engineer starting on a Monday will
team up with the engineer that started the preceding Wednesday. Pick one person to run the talking parts, and one
person to take notes.

### Ten minutes before a standup

The person handling the talking parts does this stuff ten minutes before standup:

- `@here`s the dev channel. Include where the meeting is in the NYC office (usually the Classroom).
- Remind last week's on-call staff in #dev to prepare their updates about last week's rotation. Something like:
  > @personA @personB reminder, we're looking for a list of major or notable incidents from last week during
  > standup.
- Check the [Lunch&Learn schedule][ll_schedule].
- Think of who you'd like to give props to.

### During standup

**Important**: Make sure the person taking notes doesn't have their laptop next
to the Zoom speakerphone.

- Props, as a nod towards [People are Paramount][pplp]
- Update from the VP of Engineering
- Update from Product Managers (someone should be present to give one)
- Update on new hires, people starting this week, newly accepted offers, etc.
- What the practices (Front-End, Front-End iOS, and Platform) are currently thinking about
- Update from last week's on-call support team, including follow-up work items
- Potential cross-team dependencies and requests for pairing
- Open RFCs (see Peril's Monday morning post in the #dev Slack channel or [here on
  GitHub][open-rfcs-github])
- Running peer learning groups (the leads/participates will present this)
- Milestones spot to talk about things people are proud of (new repos, blog
  posts, updated functionality, etc.)
- We then either announce [the Lunch & Learn][ll], or try find one for the week
- Anyone is free to give closing announcements, or props!

[open-rfcs-github]: https://github.com/issues?utf8=%E2%9C%93&q=org%3Aartsy+label%3ARFC+state%3Aopen

These notes are then copied into a [Notion][] document, and the link passed into #dev on Slack after standup.
Everyone else leaves links to things they have commented on during the meeting, if they don't, we chase them up.

## Our Markdown Template

```md
_Props_

-

_Company Updates (VP of Engineering)_

-

_Product Manager Updates_

-

_Hiring Updates_

-

_Practice Updates_

- Front-End:
- Front-End iOS:
- Platform:

_On-call Support Updates_

- This week, @personC and @personD will be on-call for support.
- ## Last week, we saw the following notable incidents (please include follow-up details)

_Cross-dependencies / Requests for Pairing_

-

_Current team-wide RFCs_ (see #dev for list 9am EST on Mondays)

-

_Running peer learning groups_

-

_New Milestones / Repos / Blog Posts / New features or updated functionality released: prompt Auction, Gallery, Platform, Grow, Purchase teams_

-

_Lunch & Learn_ || _Show & Tell_ (if you don't know, ask in #lunch_and_learn or #dev-show-n-tell)

-

_Closing Announcements_

- The last two support engineers should stick around to chat with us, the new support engineers after this meeting.
-
```

Once you're done, follow the instructions [in Notion][notion] on how to add it to our archives.

[pplp]: https://github.com/artsy/README/blob/master/culture/what-is-artsy.md#people-are-paramount
[ll]: https://github.com/artsy/README/blob/master/events/lunch-and-learn.md
[ll_schedule]: https://github.com/artsy/README/projects/1
[notion]: https://www.notion.so/artsy/Standup-Notes-28a5dfe4864645788de1ef936f39687c

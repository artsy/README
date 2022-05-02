---
title: Technology choices
description: How to make technology decisions at Artsy
---

**High-level architecture and technology choices** are some of the most important and carefully considered
decisions we make as engineers. This document describes how we make decisions, including:

- A **radar** for capturing current technology preferences and
- **Technical plans and reviews** for adjusting those preferences or making other significant technology decisions

## Evolving Technology at Artsy

We want to accomplish a lot with a lean team, which means we must
[choose stable technologies](http://boringtechnology.club/). However, we also want to adopt best-of-breed
technologies or best-suited tools, which may need work or still be evolving. We've borrowed from
[ThoughtWorks' Radar](https://www.thoughtworks.com/radar/faq) to define the following stages for evaluating,
adopting, and retiring technologies:

- **Adopt:** Reasonable defaults for most work. These choices have been exercised successfully in production at
  Artsy and there is a critical mass of engineers comfortable working with them.
- **Trial:** These technologies are being evaluated in limited production circumstances. We don't have enough
  production experience to recommend them for high-risk or business-critical use cases, but they may be worth
  consideration if your project seems like a fit.
- **Assess:** Technologies we are interested in and maybe even built proofs-of-concept for, but haven't yet trialed
  in production.
- **Hold:** Based on our experience, these technologies should be avoided. We've found them to be flawed, immature,
  or simply supplanted by better alternatives. In some cases these remain in legacy production uses, but we should
  take every opportunity to retire or migrate away.

Artsy's current choices can be [edited in raw form here](/playbooks/technology_radar/artsy-tech-radar.csv) and
[viewed in radar format here](https://radar.thoughtworks.com/?sheetId=https%3A%2F%2Fraw.githubusercontent.com%2Fartsy%2Freadme%2Fmain%2Fplaybooks%2Ftechnology_radar%2Fartsy-tech-radar.csv).

## Technical Plans and Review

When new systems, technologies, or architectures are considered, we document their rationale and gather feedback in
a [technical plan document](https://github.com/artsy/README/issues/245)
([examples](https://www.notion.so/artsy/Technical-Plans-f94b206fcec54cee8b4d864e67d5b70f)🔒). This document states
the problem, surfaces questions, and lists possible approaches. Feedback should be invited from relevant experts
within the team _and beyond_, because these circumstances are rarely unique, and the choices tend to outlast
specific projects or even teams. [Weekly engineering stand-up](/events/open-standup.md) is a good opportunity to
request feedback from the wider team.

Once initial feedback and updates are reflected on the technical plan document, a face-to-face _technical review_
discussion is an efficient way to resolve open issues and confirm next steps. This discussion can be scheduled for
standing practice meetings, team knowledge-shares, or ad hoc if necessary. In the review, the relevant teams'
engineers are responsible for recommending a path forward. (If there isn't clear agreement, you may want to revisit
the problem and rationale.) The teams' technical leads and someone from engineering leadership (Dir/VP) should be
stakeholders on the plan and invited to the review discussion as well.

When a plan depends on technology that isn't in the "adopt" category, it's worth special care to:

- justify the suitability of the choice
- document the goals of the "trial"
- limit any production risk or organizational burden
- if successful, plan to deprecate competing or overlapping technologies

## Frequently Asked Questions

#### _Helm_ (e.g.) is an interesting technology to keep an eye on.

It sure is!

#### No, seriously. It might be a great fit for Artsy's needs.

Sounds like it should be **assess**ed. Go ahead and add it (via pull request) to the radar. This is also a great
time for spikes or proofs-of-concept.

#### I think we should incorporate _Sorbet_ (e.g.) into our stack!

Propose a [technical plan](#technical-plans-and-review) for how this choice could be trialed in production. Clarify
the goals and potential benefits of the trial. If replacing an alternative, consider whether we would consolidate
on the new choice (and _how_) or support multiple approaches. Specify a target timeline for deciding about the
trial either way. Avoid trialing multiple unproven things in the same project or system.

#### We've had a positive experience with _Phoenix_ (e.g.) and should adopt it in more places.

Congrats! Is there a critical mass of engineers (`>=3`) comfortable working with this tech? If so, consider a Knowledge Share
or practice meeting discussion to review your experience and share any lessons. Make a pull request to the
radar and make sure to request comments from the relevant engineers or experts. Remember that it may not be
sufficient to just "adopt" a new choice. If this replaces an alternative that's in place at Artsy, that should
probably move to "hold" and a strategy be decided for migrating away from the old tech (e.g., opportunistically or
deliberately).

#### I just want to build a feature _this_ way or with _this_ library. Is a technical plan necessary?

Use your judgment. Minor dependency selections may not warrant broad input. If a library or approach influences how
future code will be written or how other developers will work, though, it's often worth a time-out to consider
competing options, get feedback, choose deliberately, and document the choice.

#### What plans or communication are expected when creating new projects or repositories?

As above, if the new project will affect developers' work or employ technology that's not "adopted," a technical
plan is recommended. In all cases, lean on our other documentation and communication practices like:

- Ensure the README
  [provides necessary context](https://github.com/artsy/README/blob/c4bc55cfd6bb7b768cc9aef0e99f35bf175cbb33/playbooks/documentation.md#readmes)
- Share new repositories
  [in open stand-up](https://github.com/artsy/README/blob/c4bc55cfd6bb7b768cc9aef0e99f35bf175cbb33/events/open-standup.md)
- Add new projects to the
  [project list](https://www.notion.so/artsy/17c4b550458a4cb8bcbf1b68060d63e6?v=3604e2682d024b64bde705abb2facebd)
  🔒 and specify which team will support them.

#### When should I use an RFC? When should I write a technical plan?

[RFCs or _Requests for Comments_](https://github.com/artsy/README/blob/master/playbooks/rfcs.md) are ideal for
discussing changes to **how we work as engineers.** [Technical plans](https://github.com/artsy/README/issues/245)
are better for considering **technical approaches and technology or tool choices**. You can't go wrong, though!
Both ensure we discuss in the open and record our thinking.

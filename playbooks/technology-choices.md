---
title: Technology choices
description: How to make technology decisions at Artsy
---

**High-level architecture and technology choices** are some of the most important and carefully considered
decisions we make as engineers. This document goes into a lot of detail around how we made decisions, but the short
version is:

- If you have an idea,
  [write a technical plan](https://www.notion.so/artsy/Technical-Plans-f94b206fcec54cee8b4d864e67d5b70f), then...
- Share the plan with the wider engineering team: bring it up
  [at standup](https://github.com/artsy/README/blob/master/events/open-standup.md) in "cross-team dependencies" and
  share it in Slack.

This applies for really big ideas, and sometimes small ones, too! Check the [FAQ](#frequently-asked-questions) for
more context. Writing a technical plan is the go-to solution for making technology decisions at Artsy because even
if the decision is uncontroversial, the exercise of writing a plan will help guide your thought process _and_ will
record the rationale for the decision. (This historical context is super-userful.) You got this!

## Evolving Technology at Artsy

We want to accomplish a lot with a lean team, which means we must
[choose stable technologies](http://boringtechnology.club/). However, we also want to adopt best-of-breed
technologies or best-suited tools to a given need, which may need work or still be evolving. We've borrowed from
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

Artsy's current choices can be edited in [technology_radar/data.csv](/playbooks/technology_radar/data.csv) and
[viewed in radar format here](https://radar.thoughtworks.com/?sheetId=https%3A%2F%2Fraw.githubusercontent.com%2Fartsy%2Freadme%2Fmaster%2Fplaybooks%2Ftechnology_radar%2Fdata.csv).

## Technical Plans and Review

When new systems, technologies, or architectures are considered, we document their rationale and gather feedback in
a [technical plan document](https://github.com/artsy/README/issues/245)
([examples](https://www.notion.so/artsy/Technical-Plans-f94b206fcec54cee8b4d864e67d5b70f)🔒). This document is a
good place to state the problem, surface questions, and list possible approaches. Feedback should be invited from
relevant experts within the team _and beyond_, because these circumstances are rarely unique, and the choices tend
to outlast specific projects or even teams.

Sometimes consensus can be achieved with the document alone, but often a [technology review]() discussion helps
resolve open questions. Ultimately, a team's engineers should recommend a path forward. If there still isn't clear
agreement, you may want to revisit the problem and rationale (or just ask engineering leadership to weigh in).

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

Propose a [technical plan](#technical-plans-and-review) for how this choice could be trialed in production. Make
clear the goals of the trial and potential benefits it offers. If replacing an alternative, consider whether we
would consolidate on the new choice (and _how_) or support multiple approaches. Specify a target timeline for
deciding about the trial either way. Avoid trialing multiple unproven things in the same project or system.

#### We've had a positive experience with _Phoenix_ (e.g.) and should adopt it in more places.

Congrats! Is there a critical mass of engineers (`>=3`) comfortable working with this tech? If so, consider a lunch
& learn or practice meeting discussion to review your experience and share any lessons. Make a pull request to the
radar and make sure to request comments from the relevant engineers or experts. Remember that it may not be
sufficient to just "adopt" a new choice. If this replaces an alternative that's in place at Artsy, that should
probably move to "hold" and a strategy be decided for migrating away from the old tech (e.g., opportunistically or
deliberately).

#### I just want to build a feature _this_ way or with _this_ library. Is a technical plan necessary?

Use your judgment. Minor dependency selections may not warrant broad input. If a library or approach influences how
future code will be written or how other developers will work, though, it's often worth a time-out to consider
competing options, get feedback, choose deliberately, and document the choice.

#### When should I use an RFC? When should I write a technical plan?

RFC, or _Requests for Comments_ are
[defined in the RFC playbook](https://github.com/artsy/README/blob/master/playbooks/rfcs.md) as:

> a process used in large open source orgs to coordinate talking about a change and giving many people the chance
> to express ideas and discuss changes

Technical were [introduced in #245](https://github.com/artsy/README/issues/245) as:

> an effort to make our planning more consistent, deliberate, and discoverable.

These two things are not mutually exclusive, and there is some overlap. So which is the right one to use? In
practice, either can work. These are both tools to help guide us, and shouldn't be seen as constraints.

If you're asking which makes sense to use, this is a good general rule:

- RFC's are better at discussing changes to _how_ we work.
- Technical plans are better at discussing changes to _what_ tools we work with.

But there are always exceptions ([this RFC](https://github.com/artsy/README/issues/268), for example, covers both).
You really can't go wrong, though!

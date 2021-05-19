---
title: Engineering Team Introduction
description: A brief introduction
---

## Welcome Logistics

### Work hours

Depends on the person/where they are located! We try to schedule meetings at times that are amenable to people
being remote (from Amsterdam to Seattle on the engineering team), so they'll usually happen in the middle of the
day EST.

Ask your mentor/manager what their general work hours are. Artsy has no policy around this, so use your judgment
and be open with your team about when you expect to be available.

### Vacation

Artsy has an open vacation policy. This doesn't mean "don't take vacation." _Please take time off._ Most people
take off for bank holidays.

Join the
[Design/Product OOO calendar](https://calendar.google.com/calendar/embed?src=artsymail.com_gl81jptn59gjfv1kg0fer1i4jo%40group.calendar.google.com&ctz=America%2FNew_York)
and use that to set when you know you'll be out of the office or unavailable.

### Chat

Most of our day-to-day business is conducted in Slack. Teams, offices, and common concerns frequently have their
own channels. For more information on our usage of Slack, see [`/culture/slack.md`](/culture/slack.md).

### Events

See the [events list](/events) for descriptions of our recurring, engineering-wide events. Look at the
[Engineering - Open Meetings calendar](https://calendar.google.com/calendar/r?cid=YXJ0c3ltYWlsLmNvbV9nODFpbzRhOThkZHZuMWloMWEzbG0yb2NkNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t)
to see when they are scheduled and feel free to add yourself to any (or just show up).

We have an engineering team-wide standup on _Mondays at 12:00 p.m. Eastern_ where we:

- Share any team updates
- Mention significant project milestones or new repositories
- Ask for help if we're blocked or need input from a different team
- Plan the week's _lunch and learn_
- Recognize and congratulate each other for significant accomplishments

The standup is fully documented [here](/events/open-standup.md).

### Getting Help

- **Slack:** If you know what team could potentially help you, browse the channels in Slack to find the most
  relevant place to ask your question. If you aren't sure, all engineers are in
  [#dev](https://artsy.slack.com/messages/dev) 🔒 and [#dev-help](https://artsy.slack.com/messages/dev-help)🔒 is a
  good place for general questions.
- **Ask Your Neighbor:** Everyone is friendly. Don't hesitate to reach out to the people around you for even the
  most basic of questions.
- **Check Atlas:** Many company-wide resources and questions are addressed in
  [atlas.artsy.net](http://atlas.artsy.net) 🔒.

## Who we are

Some team members have backgrounds in art, but of course not all. [/resources/art.md](/resources/art.md) has some
useful links if you want to read more about the art world, or keep up with the latest news.

### Open Source Culture + Projects

At Artsy, we <3 open source and encourage you to become part of the community. Here is a
[list of some open source technologies](https://artsy.github.io/open-source/) we currently use.

Read @dblock's blog post on
[Becoming Open Source by Default](https://code.dblock.org/2015/02/09/becoming-open-source-by-default.html).

Read this [article by the mobile team](https://www.objc.io/issues/22-scale/artsy/) on the culture of open source at
Artsy and their reasons behind open-sourcing our [mobile app](https://github.com/artsy/eigen).

Orta also wrote a blog post on the
[mechanics behind open-sourcing Eigen](https://artsy.github.io/blog/2015/04/28/how-we-open-sourced-eigen/).

## Our stack/technologies

### GitHub

Artsy stores source code on [GitHub](https://github.com/artsy). Make sure you have an account and are part of the
Artsy organization. If you can't visit [this page](https://github.com/artsy/gravity) 🔒, then you don’t have the
right access. Your mentor can get you sorted out.

Our projects
[use physics terms as code names](https://artsy.github.io/blog/2019/05/10/why-projects-need-codenames/), starting
with [Gravity](https://github.com/artsy/gravity) 🔒 (inspired by
[Zachary Coffin's "Temple of Gravity"](http://www.zacharycoffin.com/work/temple-of-gravity)).

See the [engineering projects map](https://www.notion.so/artsy/17c4b550458a4cb8bcbf1b68060d63e6) 🔒 for a
comprehensive list of our (many) repos and associated teams. It can be a bit overwhelming, so here are some
important ones:

- [Gravity](https://github.com/artsy/gravity) 🔒: Artsy's main API
- [Force](https://github.com/artsy/force): Artsy web site ([www.artsy.net](https://www.artsy.net))
- [Eigen](https://github.com/artsy/eigen): iOS app
- [Volt](https://github.com/artsy/volt) 🔒: Content Management system for partners

### AWS

Many applications depend on Amazon Web Services. Your mentor or anyone else in Engineering can set you up with an
IAM profile within our organization's account (see
[instructions](https://github.com/artsy/potential/wiki/Platform-FAQ#add-a-new-aws-user) 🔒).

### Artsy's Stack(s)

Read @orta's
[blog post describing our stack in 2017](https://artsy.github.io/blog/2017/04/14/artsy-technology-stack-2017/),
which evolved from [our stack in 2015](https://artsy.github.io/blog/2015/03/23/artsy-technology-stack-2015/), which
evolved from [our tech stack at launch in 2012](https://artsy.github.io/blog/2012/10/10/artsy-technology-stack/),
which evolved from a Rails monolith.

### Artsy APIs and concepts

See [apis](https://github.com/artsy/potential/blob/master/apis/README.md) 🔒 and
[domain models](https://github.com/artsy/potential/blob/master/platform/DomainModels.md) 🔒 in Potential.

## How We Work

The engineering team [playbooks](/playbooks#readme) discuss why we make the technical and non-technical decisions
we do.

### Development Environments

The [scripts/setup](https://github.com/artsy/potential/blob/master/scripts/setup) 🔒 script will install common
dependencies for local development (homebrew, Ruby, etc.).

Projects can provide their own setup scripts that build on this common foundation. See
[Gravity's script/setup](https://github.com/artsy/gravity/blob/master/script/setup) 🔒 as an example.

Most projects use the [hokusai](https://github.com/artsy/hokusai) wrapper for testing, configuration, and
deployment to kubernetes. The `hokusai dev ...` commands simplify local development using Docker.

### Text Editor

Most engineers use [Visual Studio Code](https://code.visualstudio.com), but feel free to use whatever makes you
most comfortable. We recommend that projects include a `.vscode` folder with settings, and an
[extensions.json](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions) so
that developers can have the same experience. For example:

- [reaction](https://github.com/artsy/reaction/tree/master/.vscode)
- [emission](https://github.com/artsy/emission/tree/master/.vscode)
- [metaphysics](https://github.com/artsy/metaphysics/tree/master/.vscode)
- [force](https://github.com/artsy/force/tree/master/.vscode)
- [positron](https://github.com/artsy/positron/tree/master/.vscode)

A lot of engineers have moved from Sublime Text or vim, if you want to retain your keyboard shortcuts / modes, you
can find a
[list of extensions handling that](https://code.visualstudio.com/docs/getstarted/keybindings#_keymap-extensions).

### Contributing Code

As all of our code is housed on GitHub, we make contributions through
[pull requests](/playbooks/engineer-workflow.md#pull-requests).

Read more in [the engineer workflow playbook](/playbooks/engineer-workflow.md#readme) or see this
[step-by-step guide](https://github.com/artsy/potential/blob/master/github/workflow.md) 🔒. If you're unfamiliar
with Git, check out this [short tutorial](https://try.github.io) on basic git commands (such as `git status`,
`git commit`, and `git push`).

### Deploying

Once your pull request is merged, we use services like [CircleCI](https://circleci.com/) to run the full test suite
to make sure code changes did not break existing features.

Many of our apps automatically deploy to a staging environment once CI (continuous integration) succeeds.
Production deploys vary by project, but are usually documented in project READMEs.

We try to deploy early and often. You don't need permission to deploy--just announce in #dev slack channel in case the team has any concerns. _Seriously_, see this [slack message](https://artsy.slack.com/archives/CP9P4KR35/p1620259315282100?thread_ts=1620251649.277200&cid=CP9P4KR35) 🔒.

More about [continuous improvement](/playbooks/engineer-workflow.md#continuous-improvement).

### Project Management / Sprints

Teams at Artsy work with product management via [Jira](https://artsyproduct.atlassian.net/) 🔒. Teams tend to work in 2 week sprints, with a planning meeting at the start and a review/retrospective at the end. 

### Future Fridays

PDDE-wide, the 2nd Friday of each sprint is "Future Friday." This is a lightweight process focused on collecting ideas about longer-term opportunities during the course of day-to-day work. 

Conversations can be labeled with #ff so they're find-able later. When Friday comes (if you're so compelled), choose a direction to explore/experiment and report back any results at end-of-day. Participation is optional and collaborations are encouraged.

You can read more in the original [RFC](https://github.com/artsy/potential/issues/146) and [blog post](https://artsy.github.io/blog/2015/12/22/future-fridays/).

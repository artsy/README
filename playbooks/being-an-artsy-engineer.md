---
title: How to be an Artsy Engineer
description: What makes us tick
---

# Goals of this document

This playbook was inspired by [Thoughtbot's playbook](https://thoughtbot.com/playbook), as well as internal
discussions of ways for Artsy's engineering team to share a common vision and hard-won lessons internally. It aims
to make good decisions easy, leaving plenty of space for experiments and even radical departures, but improving
consistency where helpful. Rather than a set of policies for everyone to conform to, it's here to:

- Help refine our own thinking
- Create a forum for future discussion and iteration
- Establish shared vocabulary
- Offer a framework when it's desired

This is a living document--a perpetual work in progress as we acquire new experiences, struggle through
post-mortems, and experiment with new approaches. _You_ are the co-author, so when you're convinced a new tool or
practice should be incorporated, submit a PR!

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Working together](#working-together)
  - [Project Management](#project-management)
  - [Workflow](#workflow)
    - [Fork-and-branch](#fork-and-branch)
    - [Commits](#commits)
    - [Pull requests](#pull-requests)
  - [Continuous improvement](#continuous-improvement)
  - [Coordinating between teams](#coordinating-between-teams)
  - [Documentation](#documentation)
- [High-level architecture and technology choices](#high-level-architecture-and-technology-choices)
  - [Adopting new technology at Artsy](#adopting-new-technology-at-artsy)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Working together

## Project Management

Teams at Artsy work with product management [via Jira](https://artsyproduct.atlassian.net/). Teams tend to work in
2 week sprints, with a planning meeting at the start and a review/retrospective at the end.

## Workflow

All developers have access to all repositories. Pull requests are always welcome. Check in with responsible teams
or developers for help getting up to speed. Production repos should have a point-person or point-team in their
README if you want to know who to start asking questions to.

### Fork-and-branch

Artsy teams employ the [fork-and-branch](http://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/)
model of project collaboration popular in open source. That means work happens on developers' own repositories
(e.g., [mzikherman/force](https://github.com/mzikherman/force)) forked from the "trunk"
([artsy/force](https://github.com/artsy/force)). [Pull requests](#pull-requests) are then made from developers'
working branches to the trunk's `master` branch.

### Commits

> A well-crafted git commit message is the best way to communicate context about a change to fellow developers (and
> indeed to [our] future selves). -[How to write a git commit message](http://chris.beams.io/posts/git-commit/)

The code change itself should be internally consistent and coherent. If you're modifying a method signature,
propagate the change to calling code. If you've implemented a new behavior, update test assertions to match. Except
in rare cases where you intend to share a work-in-progress, commits should not leave tests in a failing state.

Commit subjects should concisely describe the enhancement or fix in the imperative form ("Add tracking of email
deliveries" or "Undo home page A/B test"). Git subcommands (like `git blame`, `revert`, `log`...) expect this
format and become more transparent to use when you adhere to that convention.

Expand on the subject to explain _why_ and add any helpful background or links in the commit body (separated by 1
line). If your project uses GitHub issues, you can include keywords (like `closes #23`) to
[close issues via commit](https://help.github.com/articles/closing-issues-via-commit-messages/).

Sometimes bad commit messages aren't apparent until later. Feel free to
[squash](https://github.com/blog/2141-squash-your-commits) and rewrite commits on your working branch (even when
it's in pull request form).

### Pull requests

The best pull requests start with good [commits](#commits). If commits are a unit of incremental, coherent change,
pull requests represent sensible deploy points. (This doesn't mean they represent a complete feature or launch. See
[continuous improvement](#continuous-improvement).)

At Artsy, **PRs are the most frequent form of collaboration**.

Once again, the title should concisely explain the change or addition. The description should clearly state:

- the original problem or rationale,
- the solution eventually agreed upon,
- any alternatives considered,
- and any to-dos, considerations for the future, or fall-out for other developers.
- Finally, any pre- or post-deploy migration steps should be clearly explained (see [migrations](#migrations)).

_Assign_ another team member to the PR. All team members are encouraged to contribute, but that team member has the
explicit responsibility to carefully review, consider any unanticipated impact, monitor discussion, and ultimately
merge or close the PR. You may also want to add reviewers to request other developers for specific input.

A successful PR leaves both submitter and reviewer of one mind, able to justify rationale, debug unintended
consequences, and monitor a graceful transition. For this reason, it's not uncommon to have PR bodies that are
longer than the corresponding code changes. Pull requests are often referred to _years_ later to understand the
events surrounding design decisions or code changes of interest. Keep this future reader in mind.

It's almost never too early to open a PR. Seeing real code encourages feedback that might not flow as freely in an
abstract discussion. A single failing test can be enough to trigger discussion, and clearly indicates that the PR
can't yet be merged. (We prefer intentionally failing tests to labels like `#dontmerge` for this purpose.)

PRs are monitored by [Peril](https://github.com/danger/peril/) with a set of rules that come from
[artsy/artsy-danger](https://github.com/artsy/artsy-danger). Any rule that is applied to every PR was submitted as
an RFC with an explanation of why, you can check out
[past/future RFCs here](https://github.com/artsy/artsy-danger/issues?utf8=✓&q=is%3Aissue%20RFC).

Further reading:

- See some epic examples of great PRs: [artsy/gravity#9787](https://github.com/artsy/gravity/pull/9787),
  [artsy/gravity#9557](https://github.com/artsy/gravity/pull/9557)
- [On empathy and pull requests](https://slack.engineering/on-empathy-pull-requests-979e4257d158)
- [Rules of communicating at GitHub](http://ben.balter.com/2014/11/06/rules-of-communicating-at-github/)

### Testing

Artsy uses a range of testing libraries to ensure that code is stable and able to withstand changes throughout the app over time. New code should employ unit as well as integration tests wherever possible. Thorough tests also have added benefit of easily documenting code, as other teammates can easily deduce intent and functionality from a well-written test suite.

## Continuous improvement

Artsy exists in a changing business environment and is itself building a shifting suite of services. Even over its
short lifetime, we've witnessed systems be conceived, grow beyond reasonable maintainabilty, and be abandoned or
fall out of favor. Since there's no end state (at least, that we know about), we try to be disciplined and
practiced at dealing with change.

**Big things don't ship.** To ship anything, it must first be made small. Large projects can be expedited not by
everyone combining efforts toward a grand vision, but by identifying the incremental, graceful steps that can be
taken _now_ in the correct direction.

To that end, we want to be able to **experiment quickly and easily**. A/B tests, feature flags, role-based access,
and robust metrics are investments that quickly help make new ideas more concrete.

The tools of change, including aggressive **refactoring**, **data migrations**, **frequent deploys**, and a robust
**test suite**, are essential. Obstacles such as slow tests, inconsistent tooling, or unreliable deploys can hamper
our efforts, so are worth significant investment despite being disconnected from user-facing features.

Finally, Artsy aims for a culture of continuous improvement to both code _and_ process. We try to share wins, teach
best practices and offer constructive feedback. Tools like lunch-and-learns,
[postmortems](https://github.com/artsy/post_mortems), [kaizen](https://en.wikipedia.org/wiki/Kaizen) or
[retrospectives](https://en.wikipedia.org/wiki/Retrospective) help us reflect on our own practices and make change.

## Coordinating between teams

Often there's tension between meeting a single product team's goals and building what could be shared or most
useful across the platform. We resist this dichotomy. Artsy's platform _is_ the cumulative work of its product
teams, and will only succeed when our efforts combine to enable higher and higher-level features rather than local
solutions.

Examples of such wins include:

- Kinetic and Watt libraries being shared broadly to unify management applications
- Devising a common pattern for exporting core data that is reused by many apps and consumed for accounting,
  analytics, and machine-learning purposes
- ...

When questions arise about worthwhile effort and investment, they can usually be resolved by respective teams
discussing trade-offs and agreeing. Often there are opportunities to join forces and/or make deliberate, short-term
compromises in pursuit of a healthful state.

## Documentation

Teams and projects change to adapt to business needs. Code repositories come and go as well, but usually more
slowly. The [project map](https://github.com/artsy/potential/wiki/Project-List) aims to list all the repositories
that Artsy maintains, organized by the responsible team.

Product team [slack channels](https://artsy.slack.com) are usually the first stop for help in a given team's area
of responsibility.

Project README files should provide enough context to understand and contribute to a project including:

- High-level description of the project's use, as well as metadata including:
- Development stage (development, beta, production, deprecated, retired...)
- Links to hosting environment(s)
- Links to GitHub repo(s)
- Continuous integration and branching information
- Deployment instructions
- Who to contact for guidance
- Any other relevant links
- Instructions for setting up, testing, and contributing to the project
- License (probably [MIT](https://opensource.org/licenses/MIT)) and copyright, if open source

See a [recent example](https://github.com/artsy/impulse#impulse-) as a template.

# High-level architecture and technology choices

These are some of the most important and carefully considered decisions we make as engineers.

## Adopting new technology at Artsy

We want to accomplish a lot with a lean team. This means we must choose stable technologies, but also that we must
leverage the work of others (e.g., open source) extensively. We rely on individual engineers' judgment to decide
what libraries, stacks, tools, etc. suit each use case, but here are some suggested criteria for incorporating new
technology into the Artsy platform:

- **Experimental** technologies are being assessed or evaluated. They:
  - are suitable for proofs-of-concept
  - can be applied to low-risk (e.g., internal) production projects
  - shouldn't block time-sensitive product efforts
- **Adopted** technologies represent reasonable, default choices. They:
  - can be worked on by a critical mass of Artsy engineers
  - have been exercised enough in production _at Artsy_ for bugs/gotchas to emerge, and for common usage patterns
    to be established
  - can be employed during routine product work without deep tool/library-specific expertise
  - have library support that doesn't require [much] upstream work to fix
- **Deprecated** technologies may remain in production but should be replaced [by _adopted_ choices]
  opportunistically.

(This framework is similar to the Hold/Assess/Trial/Adopt framework popularized by the
[ThoughtWorks technology radar](https://www.google.com/search?q=technology+radar&tbm=isch).)

Said in stronger terms, [choose boring technology](http://mcfunley.com/choose-boring-technology) because we expect
our business and product to generate enough risk already. And when in doubt (or in the rare cases when goals are
too difficult to achieve with existing tools), have an open conversation with the wider team so considerations are
shared and choices are deliberate.

<!--

WIP

## Choosing an architecture

## Communication patterns

## Choosing a stack

## Platform/Host

## Naming and locating projects

## When to open-source

# Application-level choices

## Authentication and authorization

## Analytics

## Metrics

## Monitoring

## Alerting

## Configuration

## DNS

## Licenses

## CI

## Deploys

# Designing APIs

# Working with the main API (Gravity)

 -->

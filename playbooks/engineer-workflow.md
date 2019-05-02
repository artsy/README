---
title: Engineer workflow
description: How we work together
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Working together](#working-together)
  - [Project Management](#project-management)
  - [Workflow](#workflow)
    - [Fork-and-branch](#fork-and-branch)
    - [Commits](#commits)
    - [Pull requests](#pull-requests)
    - [Testing](#testing)
    - [Deployment](#deployment)
  - [Continuous improvement](#continuous-improvement)
  - [Coordinating between teams](#coordinating-between-teams)
  - [Documentation](#documentation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Working together

## Project Management

Teams at Artsy work with product management [via Jira](https://artsyproduct.atlassian.net/) 🔒. Teams tend to work
in 2 week sprints, with a planning meeting at the start and a review/retrospective at the end.

## Workflow

All developers have access to all repositories. Pull requests are always welcome. Check in with responsible teams
or developers for help getting up to speed. Production repos should have a point-person or point-team in their
README if you want to know who to start asking questions to.

### Fork-and-branch

Artsy teams employ the [fork-and-branch](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/)
model of project collaboration popular in open source. That means work happens on developers' own repositories
(e.g., [mzikherman/force](https://github.com/mzikherman/force)) forked from the "trunk"
([artsy/force](https://github.com/artsy/force)). [Pull requests](#pull-requests) are then made from developers'
working branches to the trunk's `master` branch.

### Commits

> A well-crafted git commit message is the best way to communicate context about a change to fellow developers (and
> indeed to [our] future selves). -[How to write a git commit message](https://chris.beams.io/posts/git-commit/)

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
- Finally, any pre- or post-deploy migration steps should be clearly explained (see
  [migrations](data-migrations.md)).

**_Request a review_** from at least one team member. This should be someone who has context around the changes
that were made, experience with the system(s) being modified, and/or knowledge of the language/framework in use.
Team members that are not explicitly assigned to a PR are encouraged to contribute as well, but reviewers have the
explicit responsibility to read the code in question and provide commentary or feedback on it.

If you want to let someone know the PR is happening without requesting their review, just @ them in the body of the
PR.

Reviewers are asked to leave their review within one business day of being requested. If that's not possible for
any reason, it's the reviewer's responsibility to communicate with the author of the PR to establish a different
timeline or get someone else to review.

**_Assign_** a single team member (they will often also be one of your reviewers) to the PR. This is the person who
is responsible for moving the PR forward.

Assigning exactly one reviewer - no more and no less - helps ensure that there's no question about who is
responsible. Since assignees are not explicitly expected to review, it's perfectly fine to both assign and request
a review from the same person. Once someone has been assigned to a PR, they should make a good faith effort to take
one of the following actions within one business day:

- Merge the PR if comfortable doing so and the criteria below are met,
- Re-assign to the original author so that they can merge, or
- Request additional review from other developers

These criteria should be fulfilled before a PR is merged:

- All CI status checks should be green
- Peril/Danger status checks should be green
- At least one review _approval_ should have been submitted

**_Who should you assign and ask to review?_** You can ask yourself the following questions as a rubric:

- Do I know who this PR affects and/or someone familiar with the codebase? Assign them.
- Does the project have point persons listed in the README? Assign one of them.
- Is the project targeted by your changes owned by a team in the
  [Project list](https://github.com/artsy/potential/blob/master/Project-List.md)? Assign someone on that team.
- Does GitHub suggest any reviewers, based on git blame data? Consider one of them.

If none of these prompts yields a potential assignee, it's worth bringing up in Slack.

A successful PR leaves both submitter and reviewer of one mind, able to justify rationale, debug unintended
consequences, and monitor a graceful transition. For this reason, it's not uncommon to have PR bodies that are
longer than the corresponding code changes. Pull requests are often referred to _years_ later to understand the
events surrounding design decisions or code changes of interest. Keep this future reader in mind.

A pull request is assumed to be safe to merge and eventually to release. Hence, prerequisite changes in upstream
systems should be merged _and released to production_ before dependent pull requests are opened. The notable
exception to this is when the developer wants to solicit early feedback. Such PRs should be clearly designated as
`[WIP]` or blocked by a failing test. (See [discussion](https://github.com/artsy/README/issues/109).)

PRs are monitored by [Peril](https://github.com/danger/peril/) with a set of rules that come from
[artsy/artsy-danger](https://github.com/artsy/artsy-danger). Any rule that is applied to every PR was submitted as
an RFC with an explanation of why, you can check out
[past/future RFCs here](https://github.com/artsy/artsy-danger/issues?utf8=✓&q=is%3Aissue%20RFC).

Further reading:

- See some epic examples of great PRs: [artsy/gravity#9787](https://github.com/artsy/gravity/pull/9787) 🔒,
  [artsy/gravity#9557](https://github.com/artsy/gravity/pull/9557) 🔒
- [On empathy and pull requests](https://slack.engineering/on-empathy-pull-requests-979e4257d158)
- [Rules of communicating at GitHub](https://ben.balter.com/2014/11/06/rules-of-communicating-at-github/)
- [RFC on defining PR roles at Artsy](https://github.com/artsy/README/issues/177)

### Testing

Artsy uses a range of testing libraries to improve our designs, document our intent, and ensure stability as we
aggressively modify and expand the product over time. New features should be tested and bug-fixes should be
accompanied by regression tests.

In addition to developers executing tests locally, we rely on continuous integration to ensure tests pass and
handle [deploying](deployments.md) to staging (QA) environments.

### Deployment

See [deployments.md](deployments.md) for detail about releases to staging and production environments.

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
[postmortems](https://github.com/artsy/post_mortems) 🔒, [kaizen](https://en.wikipedia.org/wiki/Kaizen) or
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
slowly. The [project map](https://github.com/artsy/potential/blob/master/Project-List.md) 🔒 aims to list all the
repositories that Artsy maintains, organized by the responsible team.

Product team [slack channels](https://artsy.slack.com) 🔒 are usually the first stop for help in a given team's
area of responsibility.

See the [documentation playbook](documentation.md) for a discussion of where to document systems, processes, and so
on.

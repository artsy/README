---
title: Engineer workflow
description: How we work together
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Working together](#working-together)
  - [Project Management](#project-management)
  - [Workflow](#workflow)
    - [Working in branches](#working-in-branches)
    - [Commit Messages](#commit-messages)
    - [Pull requests](#pull-requests)
      - [Assignees and Reviewers](#assignees-and-reviewers)
      - [Sequencing](#sequencing)
    - [Code Reviews](#code-reviews)
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

All developers have access to all repositories. Pull requests are always welcome. Check the docs as well as with
responsible teams for help getting up to speed. Production repos should have a point-person or point-team in their
README if you're unsure.

### Working in branches

Artsy teams prefer to work in branches on a shared repository rather than forks. Developers should clone the repo,
create a working branch from `main`, then push that branch back to the shared repo. [Pull requests](#pull-requests)
are then made from the working branch back to the `main` branch. For tidiness, working branches should be named by
their creator like `<github_username>/<topic>`.

### Commit Messages

> A well-crafted git commit message is the best way to communicate context about a change to fellow developers (and
> indeed to [our] future selves). -[How to write a git commit message](https://chris.beams.io/posts/git-commit/)

Artsy prefers [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) (see
[these best practices](https://github.com/artsy/README/issues/327), the
[spec](https://www.conventionalcommits.org/en/v1.0.0/#specification), or
[examples](https://www.conventionalcommits.org/en/v1.0.0/#examples)). In general, commits should match the
following format:

```
<type>(optional scope): <description>

[optional body]

[optional footer(s)]
```

Including the Jira ticket id in the "scope" or PR title will conveniently link the PR to the Jira ticket. Examples:

```
feat: curated marketing collections

feat(FX-4093): curated marketing collections

feat(onboarding): add user onboarding flow analytics tracking
```

Well-structured and -described commits are helpful everywhere, but especially on `main` where they provide
long-term documentation and even [measurement](https://artsy.net/rework-metric). This brings us to...

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

Include any details that add context to the PR, as
[reviewers likely have less context than you](https://artsy.github.io/blog/2020/08/11/improve-pull-requests-by-including-valuable-context/).

If for any reason a PR doesn't contain well-structured commits,
[title the PR using the conventional commit format](https://github.com/artsy/README/issues/327) and recommend that
it be squashed into `main` rather than merged.

#### Assignees and Reviewers

**Request a review** from at least one team member. This should be someone who has context around the changes that
were made, experience with the system(s) being modified, and/or knowledge of the language/framework in use.
Feedback is always welcome from team members not specifically requested as well.

Requested reviews are appreciated within 1 business day. If that's not possible, set expectations with the author
or invite an alternative reviewer.

**Assign** a single team member to the PR. This is the person who is responsible for ultimately merging. It's
encouraged to assign PRs to a reviewer for the best velocity and shared ownership. However, self-assigning is fine
if an author wants to retain control over merging, sequencing or follow-ups related to the PR.

**Mention** a collaborator or team if you just want to inform them of the change without requesting their review.

**Who should you assign or ask for review?**

- Do I know who this PR affects and/or someone familiar with the codebase? Assign them.
- Does the project have point persons listed in the README? Assign one of them.
- Is the project targeted by your changes owned by a team in the
  [Project list](https://www.notion.so/artsy/17c4b550458a4cb8bcbf1b68060d63e6)? Assign someone on that team.
- Does GitHub suggest any reviewers, based on git blame data? Consider one of them.

A successful PR leaves both submitter and reviewer of one mind, able to justify rationale, debug unintended
consequences, and monitor a graceful transition. For this reason, it's not uncommon to have PR bodies that are
longer than the corresponding code changes. Pull requests are often referred to _years_ later to understand the
events surrounding design decisions or code changes of interest. Keep this future reader in mind.

#### Sequencing

A passing pull request is assumed to be safe to merge and eventually to release. Hence, prerequisite changes in
upstream systems should be merged _and released to production_ before dependent pull requests are opened
(https://github.com/artsy/README/issues/109). For early feedback and visibility, use "draft" PRs, mark them "WIP,"
or include a failing test.

Further reading:

- [Strategies for small, focused Pull Requests](https://artsy.github.io/blog/2021/03/09/strategies-for-small-focused-pull-requests/)
- See some epic examples of great PRs: [artsy/gravity#9787](https://github.com/artsy/gravity/pull/9787) 🔒,
  [artsy/gravity#9557](https://github.com/artsy/gravity/pull/9557) 🔒
- [On empathy and pull requests](https://slack.engineering/on-empathy-pull-requests-979e4257d158)
- [Rules of communicating at GitHub](https://ben.balter.com/2014/11/06/rules-of-communicating-at-github/)
- [RFC on defining PR roles at Artsy](https://github.com/artsy/README/issues/177)

### Code Reviews

The best PR comments are clear in their intention. We don't mandate that PR comments follow any specific format,
but some have adopted [Conventional Comments](https://conventionalcomments.org). In particular, we encourage the
use of `blocking` and `non-blocking` to signal whether or not a question or comment should be resolved before
merging.

### Testing

Artsy uses a range of testing libraries to improve our designs, document our intent, and ensure stability as we
aggressively modify and expand the product over time. New features should be tested and bug-fixes should be
accompanied by regression tests.

In addition to developers executing tests locally, we rely on continuous integration to ensure tests pass and
handle [deploying](deployments.md) to staging (QA) environments.

### Deployment

We deploy to production continuously and mostly automatically. See [Deployments](deployments.md).

## Continuous improvement

Artsy exists in a changing business environment and is itself building a shifting suite of services. Even over its
short lifetime, we've witnessed systems be conceived, grow beyond reasonable maintainabilty, and be abandoned or
fall out of favor. Since there's no end state (at least, that we know about), we try to be disciplined and
practiced at dealing with change.

**Big things don't ship.** To ship anything, it must first be made small. Large projects can be expedited not by
everyone combining efforts toward a grand vision, but by identifying the incremental, graceful steps that can be
taken _now_ in the correct direction.

To that end, we want to be able to **experiment quickly and easily**. A/B tests, feature flags, role- or
segment-based access, and robust metrics are investments that quickly help make new ideas more concrete.

The tools of change, including aggressive **refactoring**, **data migrations**, **frequent deploys**, and a robust
**test suite**, are essential. Obstacles such as slow tests, inconsistent tooling, or unreliable deploys can hamper
our efforts, so are worth significant investment despite being disconnected from user-facing features.

Finally, Artsy aims for a culture of continuous improvement to both code _and_ process. We try to share wins, teach
best practices and offer constructive feedback. Tools like knowledge-shares,
[postmortems](https://github.com/artsy/post_mortems) 🔒, [kaizen](https://en.wikipedia.org/wiki/Kaizen) or
[retrospectives](https://en.wikipedia.org/wiki/Retrospective) help us reflect on our own practices and make change.

## Coordinating between teams

Often there's tension between meeting a single product team's goals and building what could be shared or most
useful across the platform. We resist this dichotomy. Artsy's platform _is_ the cumulative work of its product
teams, and will only succeed when our efforts combine to enable higher and higher-level features rather than local
solutions.

When questions arise about worthwhile effort and investment, they can usually be resolved by respective teams
discussing trade-offs and agreeing. Often there are opportunities to join forces and/or make deliberate, short-term
compromises in pursuit of a healthful state.

## Documentation

Teams and projects change to adapt to business needs. Code repositories come and go as well, but usually more
slowly. The [project map](https://www.notion.so/artsy/17c4b550458a4cb8bcbf1b68060d63e6) 🔒 aims to list all the
repositories that Artsy maintains, organized by the responsible team.

Product team [slack channels](https://artsy.slack.com) 🔒 are usually the first stop for help in a given team's
area of responsibility.

See the [documentation playbook](documentation.md) for a discussion of where to document systems, processes, and so
on.

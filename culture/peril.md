---
title: Artsy Engineering Automation via Peril
description: How do we take on our workflow in GitHub
---

Peril has been running in Artsy since mid 2017, the blog post which [covers what Peril is and why it was
created][blog] is useful reading for this document.

This document covers, at the highest level, what Peril does at Artsy. The real source of truth for these rules is
the [`peril.settings.json`][settings] in [`artsy/peril-settings`][repo].

### Workflow improvements

#### Pull Requests

- All PRs should have a description [RFC #5](https://github.com/artsy/peril-settings/issues/5)
- All PRs should have an assignee if not WIP [RFC #13](https://github.com/artsy/peril-settings/issues/13)
- All PRs to repos with a CHANGELOG should require an entry in the CHANGELOG
  [RFC #16](https://github.com/artsy/peril-settings/issues/16)
- All PRs with a reference to a Jira ticket will be moved along their board for you
  [RFC #74](https://github.com/artsy/peril-settings/issues/74)
- Any commit message with a `[tag]` that matches a repo's label will be synced to the PR's metadata
  [RFC #7](https://github.com/artsy/peril-settings/issues/7)
- When PRs with specific labels are merged, they can send a notification to slack rooms
  [RFC #33](https://github.com/artsy/peril-settings/issues/33)
- You can comment "Merge on Green" on a PR to have Peril automatically merge the PR
  [RFC #10](https://github.com/artsy/peril-settings/issues/10)
- Any PR to an project that adds a new dependency gets a comment with an overview of the package and its dependencies.
- Any PR changing a markdown doc will go through a spell checker
- Any PR opened in a repo with an `.autorc` will have "Release: Patch" label added by default
  [RFC #1095](https://github.com/artsy/reaction/issues/1095)

#### Issues

- Any issue with RFC in the title becomes an "RFC"
  [RFC #40](https://github.com/artsy/peril-settings/issues/40)
- Any "RFC" gets sent into slack three times in the
  [upcoming week](https://github.com/artsy/peril-settings/pull/46)

#### Deployments

- When any repo has a new tag created, a message goes to our
  [#deployments](https://artsy.slack.com/messages/CA3LTRT0T) slack channel

### Scheduled Jobs

- 9am on a Monday EST, find [all open RFCs](https://github.com/artsy/peril-settings/pull/77) and send to slack
- Every day, check all our OSS repos for their licenses and update
  [this issue](https://github.com/artsy/potential/issues/157) 🔒
- Post diff notifications for all GraphQL APIs that changed in the last week into slack


[blog]: https://artsy.github.io/blog/2017/09/04/Introducing-Peril/
[settings]: https://github.com/artsy/peril-settings/blob/master/peril.settings.json
[repo]: https://github.com/artsy/peril-settings/

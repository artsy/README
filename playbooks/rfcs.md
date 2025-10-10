---
title: How to create an RFC at Artsy
description: The steps needed to request cultural changes
---

An RFC is a Request For Comments. It's a process used in large open source orgs
to coordinate talking about a change and giving many people the chance to
express ideas and discuss changes.

Example RFCs from other communities:

- React - [Overview](https://github.com/reactjs/rfcs/blob/master/README.md) -
  [Template](https://github.com/reactjs/rfcs/blob/master/0000-template.md)
- Swift - [Overview](https://github.com/apple/swift-evolution/blob/master/process.md#how-to-propose-a-change) -
  [Template](https://github.com/apple/swift-evolution/blob/master/proposal-templates/0000-swift-template.md)
- Rust - [Overview](https://github.com/rust-lang/rfcs#rust-rfcs) -
  [Template](https://github.com/rust-lang/rfcs/blob/master/0000-template.md)

These are bigger community projects than Artsy's dev team, so we don't need to
cargo cult them. We want to apply process with as much bang for buck as possible
given our size.

## Our process

- Find the right repo
- Create a plan
- Decide on resolution
- Create a PR
- Wait a week for discussion
- Resolve RFC

- Here is the list of [closed RFCs](https://github.com/artsy/README/issues?q=label%3ARFC+sort%3Aupdated-desc+is%3Aclosed) you can use as an example.

---

## Find the right repo

- Is your change local to one repo? (use that)
- Does it affect the whole dev team? (use [README](https://github.com/artsy/README))
- Can't figure it out or needs to be private? (use [Potential][] as a fallback)

## Create a plan

Start thinking about how the RFC will be implemented. If the change is complex
or large in scope consider defining a feedback process to iterate on the
proposal as you implement. You could also consider creating milestones and/or
metrics to track progress.

## Decide on resolution

- Specify whose feedback is necessary on this RFC with review requests.
- Specify for how long feedback will be collected and incorporated into the
  proposal. At least a week for feedback is appropriate for any proposal
  impacting all of engineering.
- Specify how approval will ultimately be decided. By default most proposals can
  be considered approved if there is no objection. However, if the change is
  complex or has wide impact you may want a more structured approval process. For
  example, does this depend on X% of the engineering team actively approving,
  point people of certain repos, or perhaps engineering leadership? If specific
  people need to approve use an `@` mention in the RFC to say so.

## Create a PR

Work from either the [generic rfc template](/.github/ISSUE_TEMPLATE/generic_rfc_template.md) or
the [dependency rfc template](/.github/ISSUE_TEMPLATE/dependency_rfc_template.md) (if your RFC is
about adding a dependency) and create a file in `/RFCs` with your proposal.

Open a pull request on a repo (or an issue, if it's a repo that doesn't have an
rfc directory to hold RFC docs) that begins with "RFC: "; this causes a message
to be posted to Slack's #dev channel via Peril.

## Give a week for discussion.

- The RFC proposer announces the RFC in the next weekly dev standup.
- At least a week goes by for discussion. After this the proposer uses the
  resolution template to summarize the outcome.

A lack of response from others is assumed to be positive indifference.

## Resolve RFC

Changes are either enacted or not, based on the discussion.

If the RFC is accepted, you should add the following template (changing the text
in each section, obviously!) and merge the PR. If the RFC is not accepted, you
should add this template and close the PR without merging. The details of
rejected PR can still be easily found by searching for closed PRs with the `RFC`
label.

```
## Resolution
We decided to do it. 50% of the engineering team actively approved of this change.

## Level of Support
3: Majority acceptance, with conflicting feedback.

#### Additional Context:
Some people were in favor of it, but some people said they didn't want to do it
for project X.

## Next Steps
We will implement it.

#### Exceptions
We will not implement it on project X. We will revisit the decision in 1 year.
```

If possible, please use one of these for the Level of Support section:

- `1: Overwhelming positive feedback.`
- `2: Positive feedback.`
- `3: Majority Acceptance, with conflicting Feedback.`
- `4: Acceptance, with Little Feedback.`
- `5: Unclear Resolution.`
- `6: RFC Rejected.`
- `7: RFC Rejected, with Conflicting Feedback.`

[potential]: https://github.com/artsy/potential/

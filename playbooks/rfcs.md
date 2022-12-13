---
title: How to create an RFC at Artsy
description: The steps needed to request cultural changes
---

An RFC is a Request For Comments. It's a process used in large open source orgs to coordinate talking about a
change and giving many people the chance to express ideas and discuss changes.

Example RFCs from other communities:

- React - [Overview](https://github.com/reactjs/rfcs/blob/master/README.md) -
  [Template](https://github.com/reactjs/rfcs/blob/master/0000-template.md)
- Swift - [Overview](https://github.com/apple/swift-evolution/blob/master/process.md#how-to-propose-a-change) -
  [Template](https://github.com/apple/swift-evolution/blob/master/proposal-templates/0000-swift-template.md)
- Rust - [Overview](https://github.com/rust-lang/rfcs#rust-rfcs) -
  [Template](https://github.com/rust-lang/rfcs/blob/master/0000-template.md)

These are bigger community projects than Artsy's dev team, so we don't need to cargo cult them. We want to apply
process with as much bang for buck as possible given our size.

### TLDR: Our process looks like:

- Someone opens a pull request on a repo (or an issue, if it's a repo that doesn't have an rfc directory to hold RFC docs) that begins with "RFC: "; this causes a message to be posted to Slack's #dev
  channel via Peril.
- The RFC proposer announces the RFC in the next weekly dev standup.
- At least a week goes by for discussion. After this the proposer uses the resolution template to summarize the
  outcome.
- Changes are either enacted or not, based on the discussion.

A lack of response from others is assumed to be positive indifference.

- Here is the list of [closed RFCs](https://github.com/artsy/README/issues?q=label%3ARFC+sort%3Aupdated-desc+is%3Aclosed) you can use as an example.

---

# Step by Step

Find the right repo:

- Is your change local to one repo? (use that)
- Does it affect the whole dev team? (use [README](https://github.com/artsy/README))
- Can't figure it out or needs to be private? (use [Potential][] as a fallback)

Create a plan for how the RFC will be implemented. If the change is complex or large in scope consider defining a
feedback process to iterate on the proposal as you implement and creating milestones and/or metrics to track
progress.

Decide how you'll resolve the RFC:

- Specify whose feedback is necessary on this RFC with review requests.
- Specify for how long feedback will be collected and incorporated into the proposal. At least a week for feedback
  is appropriate for any proposal impacting all of engineering.
- Specify how approval will ultimately be decided. By default most proposals can be considered approved if there is
  no objection. However, if the change is complex or has wide impact you may want a more structured approval
  process. For example, does this depend on X% of the engineering team actively approving, point people of certain
  repos, or perhaps engineering leadership? If specific people need to approve use an `@` mention in the RFC to say
  so.

Create a PR (or an issue), and work from this template:

    Title: "RFC: Add a Markdown Spell Checker to all Markdown docs in PR"

    ## Proposal:

    Apply a spell checker to every markdown document that appears in a PR.

    As a trial, we'll add a new Peril rule that implements spellchecking on every PR that includes
    a Markdown document in README. We'll then gather asynchronous feedback from engineers about the
    new Peril rule and how it impacted their workflow. We'll confirm we want this rule and incorporate
    any further changes to the original RFC. We'll then roll out the Peril rule to all systems.

    ## Reasoning

    We want to have polished documents, both internally and externally. Having a spellcheck
    happening without any effort on a developers part means that we'll get a second look at
    any documentation improvements on any repo.

    ## Exceptions:

    This won't be perfect, but it is better to get something working than to not have it at all.
    I added the ability to ignore files: so CHANGELOGs which tend to be really jargon heavy will
    be avoided in every repo.

    Other than that, we can continue to build up a global list of words to ignore.

    ## Additional Context:

    You can see our discussion [in slack here](/link/to/slack.com)

    ## How this RFC is resolved

    We'll collect feedback on this RFC from the team for a week. We'll consider this RFC approved
    if 50% of the engineering team actively approves of this change. Add a 👍 or 👎  reaction to
    this proposal to vote.

Give a week for discussion.

### Resolution

If the RFC is accepted, you should add the following template (changing the text in each section, obviously!) and merge the PR. If the RFC is not accepted, you should add this template and close the PR without merging. The details of rejected PR can still be easily found by searching for closed PRs with the `RFC` label.

    ## Resolution
    We decided to do it. 50% of the engineering team actively approved of this change.

    ## Level of Support
    3: Majority acceptance, with conflicting feedback.

    #### Additional Context:
    Some people were in favor of it, but some people said they didn't want to do it for project X.

    ## Next Steps
    We will implement it.

    #### Exceptions
    We will not implement it on project X. We will revisit the decision in 1 year.

If possible, please use one of these for the Level of Support section:

- `1: Overwhelming positive feedback.`
- `2: Positive feedback.`
- `3: Majority Acceptance, with conflicting Feedback.`
- `4: Acceptance, with Little Feedback.`
- `5: Unclear Resolution.`
- `6: RFC Rejected.`
- `7: RFC Rejected, with Conflicting Feedback.`

[potential]: https://github.com/artsy/potential/

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
  [Template](https://github.com/apple/swift-evolution/blob/master/0000-template.md)
- Rust - [Overview](https://github.com/rust-lang/rfcs#rust-rfcs) -
  [Template](https://github.com/rust-lang/rfcs/blob/master/0000-template.md)

These are bigger community projects than Artsy's dev team, so we don't need to cargo cult them. We want to apply
process with as much bang for buck as possible given our size.

### TLDR: Our process looks like:

- Someone opens an issue on a repo that begins with "RFC: ", and that causes a message to be posted to Slack's #dev
  room via Peril.
- The RFC proposer announces the RFC in the next weekly dev standup.
- At least a week goes by for discussion. After this the proposer uses the resolution template to summarize the
  outcome.
- Changes are either enacted, or not based on the discussion.

A lack of response from others is assumed to be positive indifference.

---

# Step by Step

Find the right repo:

- Is your change local to one repo? (use that)
- Does it affect the whole dev team? (use [README](https://github.com/artsy/README))
- Can't figure it out or needs to be private? (use [Potential][] as a fallback)

Create an issue, and work from this template:

    Title: "RFC: Add a Markdown Spell Checker to all Markdown docs in PR"

    ## Proposal:

    Apply a spell checker to every markdown document that appears in a PR.

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

Give a week.

### Resolution

Resolve the RFC, you can work with this template:

    ## Resolution
    We decided to do it.

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

Resolving an RFC requires you to have some nuance about the feedback. If it seems to be unresolved, or still active
a week later then calling a town hall style meeting for people involved will probably shake out some come kind of
resolution.

[potential]: https://github.com/artsy/potential/
[mobile]: https://github.com/artsy/mobile

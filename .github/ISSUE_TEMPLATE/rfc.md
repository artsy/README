---
name: RFC
about: Sample template for how to create a public RFC
---

## Proposal

Describe the change you'd like to make, including the scope of the change and who it impacts.

**Example**

> Apply a spell checker to every markdown document that appears in a PR in Artsy/README and our blog.

> Squash all commits before merging a PR across all Artsy systems. This will affect all engineers at Artsy.

## Reasoning

Describe the _why_ of the RFC. Why is this change important? What problem does this solve? What's the intended
outcome?

**Example**:

> We want to have polished documents, both internally and externally. Having a spellcheck happening without any
> effort on a developers part means that we'll get a second look at any documentation improvements on any repo.

> Squashing commits before merging creates a cleaner git commit history. This in turn makes the git log much more
> readable and useful, which saves time in incidents when handling critical bugs.

## Exceptions:

Describe any notable exceptions to the proposal or how someone might handle exceptions if they arise.

**Example**:

> This won't be perfect, but it is better to get something working than to not have it at all. I added the ability
> to ignore files: so CHANGELOGs which tend to be really jargon heavy will be avoided in every repo.
>
> Other than that, we can continue to build up a global list of words to ignore.

> We won't squash commits in Gravity PRs because _reason 1_, _reason 2_, ...

## Additional Context:

Provide any links that would help your teammates understand the rationale for the change in more detail, for
example Slack discussions, docs from GitHub or Notion, or other background learning.

**Example**:

> Slack discussion: `/link/to/slack`
>
> Related RFCs: `/link/to/RFC`

## How will this RFC be implemented?

Describe in detail how the team will carry out this change and at what point the implementation will be complete.
For more complex changes, this is a good section to discuss milestones or metrics that help communicate
implementation progress.

**Examples**:

> This RFC will be implemented by adding a PR to peril-settings which adds spellcheck to Markdown documents in PRs.

> This RFC will be implemented in multiple phases.
>
> 1. One-month trial in Force to try out this new process for our PRs.
> 2. Open, optional team-wide retro for the team to discuss how the new process went and if we want further changes
>    before we fully adopt the RFC.
> 3. If there are changes to make, we'll prioritize those changes and amend the original RFC with an updated
>    proposal.
> 4. If approved, we'll merge the RFC and immediately begin using this process across all systems at Artsy.

## How is this RFC resolved?

Describe how we will make a decision to accept or reject this RFC. If this RFC is just for feedback you can say so
here.

**Examples**:

> This RFC will be approved when the maintainers of the affected repos approve it. Feedback is welcome from the
> whole team.

> This RFC will be approved when 50% of the engineering team members vote to approve this new process.

> This RFC is just for feedback from the team. The changes will be approved by engineering leadership.

---
name: RFC
about: Sample template for how to create a public RFC

---

## Proposal

Apply a spell checker to every markdown document that appears in a PR.

## Reasoning

We want to have polished documents, both internally and externally. Having a spellcheck
happening without any effort on a developers part means that we'll get a second look at
any documentation improvements on any repo.

## Exceptions

This won't be perfect, but it is better to get something working than to not have it at all.
I added the ability to ignore files: so CHANGELOGs which tend to be really jargon heavy will
be avoided in every repo.

Other than that, we can continue to build up a global list of words to ignore.

## Additional Context

You can see our discussion [in slack here](/link/to/slack.com)

## How is this RFC resolved?

A PR to peril-settings adding the check

---
name: RFC
about: Sample template for how to create a public RFC

---

<!-- Read the docs about [how to write an RFC at Artsy](https://github.com/artsy/README/blob/43c400d81ff9fee7276c3dd934de26b985da362f/playbooks/rfcs.md) before starting an RFC.
 -->
 
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

<!-- 
Things to do after you create the RFC: 
 
- Publicise it. Post it on the different slack dev channels, talk about it in meetings, etc.
- Wait for some time to make sure as many people as possible have seen it and collect feedback
- Not everyone has to interact. A lack of response is assumed to be positive indifference.

Once the RFC is ready to be resolved, feel free to copy the resolution template that can be found here: https://github.com/artsy/README/blob/43c400d81ff9fee7276c3dd934de26b985da362f/playbooks/rfcs.md#resolution

post it as the last comment, if you want also post it on the bottom of RFC description and close the issue.
-->

---
title: Technology choices
description: Evaluating and adopting new technology at Artsy
---

**High-level architecture and technology choices** are some of the most important and carefully considered decisions we make as engineers.

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

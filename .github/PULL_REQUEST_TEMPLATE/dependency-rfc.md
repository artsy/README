---
name: Dependency RFC
about: Sample template for a dependency RFC
---

<!--
Hello Artsy Engineer 👋 Sometimes the best way to communicate an RFC for adding a new dependency is with a pull request! Feel free to copy the following template onto a pull request showing how you'd use the new dependency. Probably best to make it a small PR – just enough detail to help have a productive conversation.
-->

### New Dependency

Name:

URL:

### Motivation

<!--
Describe why you'd like to add the dependency. Your goal here is to help other engineers understand why a dependency will help us do our job. If it's an improvement to the User Experience, include a link to the designs and describe how the dependency helps us achieve that UX. If it's an improvement to the Developer Experience, then include a before-and-after comparison of code to describe how the dependency helps us achieve a better DX.

Remember that we're responsible for all the code we ship, even for our dependencies.
-->

### Check List

<!--
This list isn't a list of must-have requirements. It is a tool to help our team have a productive conversation. You don't have to check all the boxes, but maybe use any unchecked boxes as a jumping-off point for the Motivation section.
-->

- [ ] Have you read over the source code?
- [ ] Has had a release in the last year, or looks done and stable?
- [ ] Could you fit this codebase in your head after reading the source?
- [ ] Is this the stand-out obvious answer to a particular domain problem?
- [ ] Do you expect your team to be the only people who know about this dependency?
- [ ] Is this obviously being used in production by the maintainers? Is it battle-tested?
- [ ] Does our bundle already include a (transitive) dependency that solves the problem and could we use that
      instead?
- [ ] Do you feel well versed in the domain of this dependency and/or could you maintain it if that needs to become
      an option?

### Alternatives

<!--
List any alternative dependencies you considered here, as well as a brief description of why you didn't go with them.
-->

---
name: Dependency RFC
about: Sample template for a dependency RFC
---

### New Dependency

Name: danger

URL: https://danger.systems

### Focus

Allows us to start writing checks for things like changelog requirements, or requiring tests to simplify code
review

### Check List

- [ ] Have read over the source code
- [ ] Has had a release in the last year, or looks done and stable
- [ ] Could you fit this codebase in your head after reading the source?
- [ ] Is this the stand-out obvious answer to a particular domain problem?
- [ ] Do you expect your team to be the only people who know about this dependency?
- [ ] Is this obviously being used in production by the maintainers, and thus battle-tested?
- [ ] Does our bundle already include a (transitive) dependency that solves the problem and could we use that instead?
- [ ] Do you feel well versed in the domain of this dependency and/or could maintain it if that needs to become an
      option?

### Alternatives

- _Setting up Peril_

  This is a bit too much to just jump to right now

- _Rubocop_

  Only works for ruby projects, and we have iOS / JS projects too

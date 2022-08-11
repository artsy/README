---
title: Dependency Management Recommendations
description: How do we want to handle new dependencies to our apps?
---

## Adding a Dependency

In general we want to have a conservative dependency policy, which can be summed up as:

- Is it worth the time it saves? (In terms of API surface area, runtime cost, complexity.)
- Does it neatly fit the current problem domain, and are we likely to use the other parts?
- If it becomes un-maintained, can we take over?

Our policy should be **more** conservative when it’s code that is shipped to an end user or to multiple systems
within Artsy. E.g. A dependency added to palette (our design system primitives) ends up in many repos transitively.

This policy can be **less** conservative when it’s not used outside in production at runtime. Like, task runners,
developer tools, linters or CI steps. Issues around these tools won’t block daily work and can be removed in
exchange for some kind of tech debt.

This document aims to emphasise the downsides of dependencies; but there are a lot of positives! We should aim for
"Proudly found elsewhere" to ensure we don’t duplicate existing work and help improve projects for everyone. We
want to be adding thoughtfully, not blocking any new dependencies.

## Why?

Dependencies help you go from `A -> B` faster, maybe `B` is a working in-app modal popup which acts like how you’d
expect across many browsers or operating systems. There are trade-offs to taking on a dependency, though:

- They can exist outside of your control _( The maintainer may have moved on, transitive dependencies )_

- They can block you further down the line in unexpected ways _( Your animation library may only work on one
  platform, or may make updating another dependency harder because they use older APIs )_ which can make further
  migrations hard

- They can provide a lot more code than you need _( You only need a single function which lives inside a whole
  framework )_ every line of code you add is code we need to maintain, which again can make migrations hard ( The
  code we don’t use may be blocking an upgrade )

- More dependencies means more code churn _( Their APIs may change across versions, and if you don’t keep
  up-to-date then larger jumps are harder. They may have security vulnerabilities which means you have to update
  that dependencies and get any transitives in sync )_

## A rubric on whether a dependency needs an RFC?

If you answer yes to most of these questions, then you probably don’t need to write an RFC:

- Could you fit this codebase in your head after reading the source?
- Is this the stand-out obvious answer to a particular domain problem?
- Do you expect your team to be the only people who know about this dependency?
- Is this obviously being used in production by the maintainers, and thus battle-tested?
- Are the dependencies of this dependency already in our projects, or is the dependency itself a transitive
  dependency of another dependency we already rely on?
- Would this dependency be the first time we’ve needed something of this domain?
- Do you feel well versed in the domain of this dependency and/or could maintain it if that needs to become an
  option?

## Ways to safely work around this

- Re-use existing dependencies, or build the exact implementation that addresses just our needs today and open to
  the needs of tomorrow. Rather than trying to foresee everything the future brings, we should aim to re-assess
  once we have more information or when we [hit 10x][10x] the traffic/scale/contributors/etc

- Directly import just the code you need, and have it go through the same code-review process that any code we
  write goes through, see [Importing directly](#importing-directly).

## Importing Directly

If you need a single function or file of a dependency that is BSD, MIT, or ISC licensed; you can directly copy the
source code into your app (i.e. [vendor][] it). This code **should** contain a link to the original code and
**must** need a reference to the original license; which can either be a LICENSE file in the same folder, or the
inclusion of a stable license URL (such as those hosted by the [OSI][]) in a comment at the top.

When doing so, be sure to call-out the code that’s being vendored. Because of legal reasons, we don’t want the
code-reviewer to accidentally gloss over it.

The advantages are that this code is unlikely to surprise us in the future (because it is treated the same as app
code) and there are less chances of hitting dependency issues (because it cannot be the dependency of another
dependency.)

## Automatically updating Dependencies with Dependabot

In most of our repositories we have dependabot enabled (through github). You can find the configurations for the dependabot PRs for a repository in a file called _dependabot.yml_ where things like the package ecosystem and the interval for checking updates are defined. Here is an example:
```yml
version: 2
updates:
  - package-ecosystem: bundler
    directory: "/"
    schedule:
      interval: daily
    # Limit to 0 to enable only security updates:
    open-pull-requests-limit: 0
    assignees:
      - fclesio
    reviewers:
      - artsy/data-platform
```
## Notes

Prior Artsy engineer’s writing on the topic of dependency management:

- https://github.com/artsy/README/issues/117
- http://artsy.github.io/blog/2015/09/18/Cocoa-Architecture-Dependencies/
- https://www.objc.io/issues/22-scale/artsy/
- https://www.fngtps.com/2013/a-quick-note-on-minimal-dependencies-in-ruby-on-rails/
- http://artsy.github.io/blog/2017/01/04/OSS-FAQ/

Referential time-sinks, but valuable for extra info:

- [Roads and Bridges][rnb]
- https://guides.cocoapods.org/making/quality-indexes.html
- https://gist.github.com/dominictarr/9fd9c1024c94592bc7268d36b8d83b3a
- https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm

<!-- prettier-ignore-start -->

[vendor]: https://codeengineered.com/blog/2015/go-should-i-vendor/
[rnb]: https://www.fordfoundation.org/about/library/reports-and-studies/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure/
[10x]: https://github.com/artsy/README/blob/master/culture/engineering-principles.md#build-for-10x
[OSI]: https://opensource.org/licenses

<!-- prettier-ignore-end -->

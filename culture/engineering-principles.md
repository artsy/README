---
title: Engineering Principles
description: What are the guiding principles that got us this far
---

# Engineering Principles

We have [company values][values], and are working on our shared values with design and product. However, when we
make decisions on what and how to do engineering, we need guiding principles. These are the things that make
Artsy's development culture unique and that drive us to do great work. For more information on how and why we
defined our engineering guiding principles, check out [this blog post][blog].

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Open Source by Default](#open-source-by-default)
- [Psychological Safety](#psychological-safety)
- [Own Your Dependencies](#own-your-dependencies)
- [Incremental Revolution](#incremental-revolution)
- [Being Nice is Nice](#being-nice-is-nice)
- [Minimal Viable Process](#minimal-viable-process)
- [Leverage Your Impact](#leverage-your-impact)
- [De-silo Engineers](#de-silo-engineers)
- [Build for 10x](#build-for-10x)
- [Done Means Done](#done-means-done)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Open Source by Default

We consider that our data and relationships with the art world makes Artsy a difficult business to copy. Our source
code only represents ideals of our past and close-to present. A code project should start as open, then move to
closed if there are valid business needs that require it to be private.

Working in the open allows individual to retain their work and ideas post-Artsy. We can share the exact problems we
see with others, and provide great high ways to teach via direct references.

Expectations for our OSS _apps_ are different than OSS _libraries_. An app has little-to-no desire for community
contributions. Instead, it's open as a reference. With tools and libraries we can build communities around, but
most of our projects don’t get large enough for their stewardship to become burdensome.

- Examples:

  - [artsy/README][readme]
  - [artsy/force][force]
  - [artsy/eigen][eigen]

- Further Reading:

  - [Becoming Open Source by Default](https://code.dblock.org/2015/02/09/becoming-open-source-by-default.html)
  - Artsy Blog Series - [OSS by Default](https://artsy.github.io/series/open-source-by-default/)
  - [Open Source Ideology](https://ashfurrow.com/blog/open-source-ideology/)
  - [iOS at Scale: Artsy](https://www.objc.io/issues/22-scale/artsy/)

Note that if an app has begun life as a closed-source project, it is still possible to
[carefully open-source it](/playbooks/open-sourcing.md).

### Psychological Safety

At its core, engineering is the practice of learning. To learn effectively and to be productive, engineers
**must** feel safe asking questions and discussing mistakes. Everyone in Artsy Engineering, but especially those in
leadership positions, are responsible for fostering a psychologically safe work environment. Specifically, that
means:

- Admitting and discussing mistakes ("We introduced this bug, what can we learn from it?").
- Framing work primarily as a learning experience ("Let's pair on this feature so we can learn X new framework
  together.").
- Demonstrating curiosity and praising curiosity in others ("(When asked a question in a DM) This is a good
  question, would you mind asking in #channel-name so others can learn too?").

- Further Reading:

  - [What it Feels Like to Work in a Supportive Environment for Female Engineers](https://medium.com/artsy-blog/what-it-feels-like-to-work-in-a-supportive-environment-for-female-engineers-3c994a001007)
  - [Building Better Software by Building Better Teams](https://ashfurrow.com/blog/building-better-software-by-building-better-teams/)
  - [Building Compassionate Software](https://ashfurrow.com/blog/building-compassionate-software/)
  - [High-Performing Teams Need Psychological Safety. Here’s How to Create It](https://hbr.org/2017/08/high-performing-teams-need-psychological-safety-heres-how-to-create-it)
  - [Psychological Safety, Risk Tolerance and High Functioning Software Teams](https://hackernoon.com/psychological-safety-risk-tolerance-and-high-functioning-software-teams-75701ed23f68)

### Own Your Dependencies

Take the dependencies which fit your problem and make them better. Rather than try re-invent the wheel, aim for
proudly discovered elsewhere. If there's no perfect match, take a 90% fit and contribute back to get it to 100%.
We’re not the biggest team, so the most leverage for someone's time can be achieved by writing the glue code
between larger projects.

Consider all of the pieces related to your app as being part of your work. E.g. just like you would consider
working on an API when you're doing front-end work, making sure that React or TypeScript behave like we'd want is
an important part of product work. It's another part of our stack.

Own doesn't need to mean commit access, but to feel like you can influence the design and execution of all the
components in your apps. Aim to be a trusted contributor to the communities surrounding your work, communicate
clearly, publicly and be empathetic to the priorities of others.

- Examples:

  - [Grape](https://github.com/ruby-grape/grape)
  - [CocoaPods](https://cocoapods.org)
  - The Artsy Omakase

### Incremental Revolution

Introduce new technologies slowly and incrementally. Avoid re-writes. Build tools to allow hybrids of different
types of technology when possible. Sometimes you need to make a big leap, but aim to approach them incrementally.

Explore bleeding-edge technologies on projects with an end-date and can become safely classed "done". These can be
used to inform decisions on long-running projects. Run spike projects when trying to settle between technology
trade-offs.

- Examples

  - [Reaction][rn] (React component library for integration in other projects)
  - [Emission][em] (React component library for integration in our iOS app, eventually merged with [Eigen][eigen])
  - [Stitch](https://github.com/artsy/stitch) (A way to incrementally add React to web-apps)
  - [Metaphysics][mp] (Our GraphQL API which encapsulates and expands Artsy's APIs)

- Further Reading

  - [Building a Pod Library](https://artsy.github.io/blog/2018/04/17/making-a-components-pod/)
  - [Modernizing Force](https://artsy.github.io/blog/2017/09/05/Modernizing-Force/)

### Being Nice is Nice

Behind every piece of code is a human, internal or external to Artsy. Give people the benefit of the doubt and
always assume positive intent. Take the time to understand why they made a decision before making assumptions.
Realize that you may come across differently on Slack/GitHub than in-person and consider how the person on the
other side might respond to what you're saying. There's always a nice way to handle a situation, and we strive for
that.

- Examples

  - [CocoaPods Communication Guidelines](https://github.com/CocoaPods/CocoaPods/wiki/Communication-&-Design-Rules#communication-rules)
  - [Moya Community Continuity Guidelines](https://github.com/Moya/contributors#moya-community-continuity-guidelines-v200)

- Further Reading

  - [Being Nice is Nice in OSS](https://www.youtube.com/watch?v=cHDcFXXQGX0)

### Minimal Viable Process

As a team grows, so does the need for processes. Find ways to get the value of process without additional work.
Build automated tools to help others feel in the loop. Use systems like RFCs to broaden the availability of
information on process changes.

For meetings over 2-3 people, provide agendas and make as many people optional as possible. We've seen great
success on automation via documentation for recurring meetings.

- Examples

  - [Danger](http://danger.systems)
  - [Peril](https://github.com/danger/peril#README)
  - [RFC Process](/playbooks/rfcs.md)
  - [Retrospectives](/playbooks/retrospectives.md)
  - [artsy/README][readme]

- Further Reading

  - [The Artsy Support Process](https://artsy.github.io/blog/2018/05/25/support-process/)
  - [Introducing Peril to Artsy](https://artsy.github.io/blog/2017/09/04/Introducing-Peril/)
  - [Artsy Apogee](https://artsy.github.io/blog/2018/02/02/artsy-apogee/)

### Leverage Your Impact

We built a large reputation for our size as an engineering team via these principles. This gives internal engineers
the ability to move local impact to a larger communal impact.

Consider ways in which you can expand the scope of impact for your time:

- Avoid private messaging when you could communicate in a relevant public channel
- Team presentations could be re-worked for public consumption
- Internal notes could be turned into blog posts
- Documentation on teams and processes could be open for others to reference and learn from
- A regular meetup could be converted into a franchisable system for others to replicate

The small improvements eventually add up so that you can do industry-impact work as a part of building Artsy.

- Examples

  - [Artsy x React Native](https://artsy.github.io/artsy-x-react-native.html)
  - [JavaScriptures](https://artsy.github.io/series/javascriptures/)
  - [Learn Swift at Artsy](https://artsy.github.io/series/swift-at-artsy/)
  - [The Artsy Engineering Blog](https://artsy.github.io/)
  - [artsy/README][readme]
  - [Peer Labs](https://peerlab.community)
  - [Artsy Engineering Compensation Framework](https://artsy.github.io/blog/2015/04/03/artsy-engineering-compensation-framework/)

### De-silo Engineers

Provide people the ability to work in many spaces and not feel blocked by another team. Common languages, common
terminology and common idioms. There's definitely space for experimentation inside a shared framework. The aim here
is not to stifle creativity, but increase individual scope. By consolidating and de-siloing you can put concentrate
your efforts into maximizing value for time.

We intentionally try to avoid teams/people being silo'd from an organizational perspective by allowing ourselves to
re-staff periodically throughout a year.

- Examples

  - Moving to React Native
  - Teach Swift via Swift at Artsy
  - Migrating Admin tools to shared Front-End stacks
  - Consolidated Analytics schema
  - Dev Swap which switches teams and responsibilities

- Further Reading
  - [Loosely Held Strong Convictions](https://www.youtube.com/watch?v=hlLhtWLghGA)
  - [DevSwap: An Experiment in Randomizing Teams](https://artsy.github.io/blog/2017/09/11/DevSwap/)
  - [Artsy x React Native](https://artsy.github.io/artsy-x-react-native.html)

### Build for 10x

Technology choices should strive to be "optimal" while avoid over-engineering. When designing systems or evaluating
scalability and performance, we aim for today's decisions to withstand 10x the traffic, data, or scale. This
realistic horizon helps us balance the need to move quickly with the sometimes-competing need to invest in
infrastructure and architecture. It also recognizes that solutions are expected to evolve and be replaced.

- Further Reading

  - [Future Fridays](https://artsy.github.io/blog/2015/12/22/future-fridays/)
  - [Migrations: the sole scalable fix to tech debt](https://lethain.com/migrations/)
  - [Productivity in the age of hypergrowth.](https://lethain.com/productivity-in-the-age-of-hypergrowth/)

### Done Means Done

You can't just throw your code over a fence, shipping code is one part of an equation but running QA and ensuring
stability is just as important. Done being done means feeling confident in that you've protected your changes with
tests, ensured deployment works and feel confident in your tools for measuring.

When something is done, it doesn't mean that you'll never need to go back to it, but that going back to it is a new
project. It's done.

[em]: https://github.com/artsy/emission/
[rn]: https://github.com/artsy/reaction
[readme]: https://github.com/artsy/README
[force]: https://github.com/artsy/force
[eigen]: https://github.com/artsy/eigen
[mp]: https://github.com/artsy/metaphysics
[values]: https://github.com/artsy/README/blob/master/culture/what-is-artsy.md#artsy-in-a-nutshell
[blog]: https://artsy.github.io/blog/2018/08/22/engineering-guiding-principles/

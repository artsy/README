---
title: Artsy Mobile Learning Resources
description: Collections of further reading about iOS and, more specifically, iOS at Artsy.
---

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting Started](#getting-started)
- [An Introduction for React Native Developers](#an-introduction-for-react-native-developers)
- [How to use Xcode](#how-to-use-xcode)
- [Fundamentals of Objective-C](#fundamentals-of-objective-c)
- [How is Artsy's iOS App Architected?](#how-is-artsys-ios-app-architected)

<!-- prettier-ignore-end -->

Don't forget to check out the [Mobile Practice](../practices/mobile.md) for less technical, more organizational
resources.

Materials for the iOS Learning Group (conducted mid-2019 at Artsy) can be found [here](./learning-group/README.md).

## Getting Started

There are three distinct ways of developing iOS software at Artsy:

- Writing React Native components in [Emission](https://github.com/artsy/emission) (setup instructions in Readme)
- Writing Objective-C and Swift in [Eigen](https://github.com/artsy/eigen) (setup instructions in Readme),
  sometimes importing React Native components _from_ Emission (as Objective-C `ARComponentController` subclasses).
- Developing React Native _and_ Objective-C and Swift using Emission and Eigen linked together, at the same time.
  [Instructions are in the Eigen docs folder](https://github.com/artsy/eigen/tree/main/docs)

A few important things to know:

- Development and beta builds of the app appear on your homescreen as `Δrtsy`. App Store builds appear as `Artsy`.
- The specific version of the app you have installed is on the debug menu of the app (shake your device).
- The bottom tab bar uses a purple top border while on staging, and a black top border on production.

## An Introduction for React Native Developers

React Native developers are really common at Artsy; any engineer who writes React can write React Native, and
therefore, can contribute to our iOS software. But for some tasks, React Native alone is not enough – you need some
native development skills. This section highlights some of the ways that our React Native and native (Objective-C)
code interoperate.

The best resource to learn about the fundamentals of Artsy's app's interop is
[this blog post](https://artsy.github.io/blog/2016/08/24/On-Emission/).
[The Map to Emission](https://github.com/artsy/emission/blob/master/docs/map_to_emission.md) also contains an
[interop section](https://github.com/artsy/emission/blob/master/docs/map_to_emission.md#eigen-interop) that links
to further reading.

<!-- TODO: Find some resources on how+why to use Objective-C while developing React Native code. -->

## How to use Xcode

The documentation on how to use Xcode is in the [xcode.md](./xcode.md) doc.

## How to Find the Code

Say you have some piece of the app and you're looking for the code that backs that UI. How do you do it? It can be
a little disorienting, but [instructions are here](./finding-code.md).

## Fundamentals of Objective-C

<!-- TODO: Find some good foundational Objective-C resources -->

## How is Artsy's iOS App Architected?

Artsy's app is split across [Emission](https://github.com/artsy/emission) (React Native components, some backed by
Objective-C) and [Eigen](https://github.com/artsy/eigen) (Swift and Objective-C). Eigen depends on Emission. You
can think of Emission as a component library, and Eigen routes between the components.

Here are some further readings you can do to learn more about why we made these decisions:

- [Our initial blog post on using React Native](https://artsy.github.io/blog/2016/08/15/React-Native-at-Artsy/)
- [Our 3 year retrospective on using React Native](https://artsy.github.io/blog/2019/03/17/three-years-of-react-native/)
- [A blog post on how routing works in Eigen](https://artsy.github.io/blog/2015/08/19/Cocoa-Architecture-Switchboard-Pattern/)
  (predates our use of React Native but the concepts are unchanged)
- [The Map to Emission](https://github.com/artsy/emission/blob/master/docs/map_to_emission.md) is a list of the
  different technologies Emission uses, with links to helpful PRs, blog posts, and representative code.

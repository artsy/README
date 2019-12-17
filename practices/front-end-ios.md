---
title: The Front-End iOS Practice
description: How does Artsy make iOS Software?
---

## Practice Information

The Front-End iOS Practice is distinct from the Front-End practice at Artsy; although there is significant overlap
between the two, there are some things that are necessarily very different when building iOS software that it
warrants an iOS practice. Those things include:

- Much of our code is written in Objective-C and Swift, which aren't commonly used within Artsy Engineering.
- Testing is different from other Artsy systems (Front-End and Platform practices test on staging; we test in
  betas).
- Deploying is different from other Artsy systems (Front-End and Platform practices promote from staging to
  production; we cut betas and submit to Apple for App Store approval).
- Long-term maintenance is different (Front-End and Platform practices deploy code to hardware they control and can
  patch easily; we deploy code to hardware our users control and can't guarantee upgrading at all, so we have to
  anticipate how iOS code will continue to operate in production for _years_).

We do have a lot in common with the [Front-End Practice](./front-end.md):

- Large parts of our codebase are written in the [Artsy Omakase](./front-end.md#the-artsy-omakase).
- Our React/Native apps share [a common design system](https://github.com/artsy/palette/).
- We're all solving problems for Artsy.

We also have a lot of non-iOS engineers contributing to our React Native app. Part of the Front-End iOS Practice,
then, is to support Front-End engineers contributing to our iOS projects (mostly via React Native, but
[sometimes in native code](http://artsy.github.io/blog/2018/06/15/cocoapods-keys-react-native/)).

## Team Information

Engineers who work on iOS code at artsy are included in the **@ios-front-enders** Slack group. They'll be
automatically added to the #front-end-ios Slack channel. The Front-End iOS Practice meetings every two weeks;
meeting notes are
[available in Notion](https://www.notion.so/artsy/Front-End-iOS-ecc07763bfd04a848c74107dde3ec6dc).

### Team Goals

Our goals are the same as the [Front-End Practice goals](./front-end.md#team-goals), but with a focus on supporting
iOS software at Artsy. That means we have the following additional goals:

- Build tools and systems to help non-iOS engineers contribute to Artsy iOS software using React Native.
- Help our colleagues understand the differences between building iOS software and web software.

### Logistics

Each iOS app at Artsy is deployed according to its own unique needs. See their repos (listed
[below](#artsy-ios-apps)) for deployment instructions. Releases of the main, collector-focused app (Eigen) are
handled by the Mobile Experience team on [a 2-week cadence 🔐](../resources/mobile/release-cadence.md).

### Our Technologies

Initially, Artsy apps were built with Objective-C. Then Swift was announced in 2014, and
[we tried it](http://artsy.github.io/blog/2017/02/05/Retrospective-Swift-at-Artsy/) but have ultimately
[settled on React Native](http://artsy.github.io/blog/2018/03/17/two-years-of-react-native/). We will still use
Objective-C for the foreseeable future, [Swift is "on hold" at Artsy](https://github.com/artsy/README/pull/217),
and native code will likely always make sense for parts of our app (notably,
[the Augmented Reality feature](http://artsy.github.io/blog/2018/03/18/ar/) and the animation-driven
[Live Auctions Integration](http://artsy.github.io/blog/2016/08/09/the-tech-behind-live-auction-integration/#The.iOS.native.app:.Eigen),
user interface). New features are being built using React Native; the remaining native parts of our main app are
[listed here 🔒](https://www.notion.so/artsy/Eigen-migration-to-React-Native-54dda83b023b4cb4965a8defdae9687f)
alongside decisions and priorities for switching them to React Native. We have no plans at this time to rewrite our
native-only projects in React Native.

### Artsy iOS Apps

Artsy has the following iOS applications, which are all open source.

- [Eigen](https://github.com/artsy/eigen) is Artsy's main iOS app. (Objective-C, Swift)
  - [Emission](https://github.com/artsy/emission) is this app's React Native component library (see
    [this post](http://artsy.github.io/blog/2018/04/17/making-a-components-pod/)). (TypeScript)
- [Energy](https://github.com/artsy/energy) is Artsy's partner app. (Objective-C)
- [Eidolon](https://github.com/artsy/eidolon) is Artsy's auctions kiosk. (Swift)
- [Emergence](https://github.com/artsy/emergence) is Artsy's Apple TV app. (Swift)

All Artsy iOS codebases start with the letter `e`, but not all Artsy codebases that start with the letter `e` are
iOS ([example](https://github.com/artsy/exchange)).

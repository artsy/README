---
title: The Mobile Practice
description: How does Artsy make mobile Software?
---

## Practice Information

The Mobile Practice is distinct from the Web Practice at Artsy. While there is significant overlap between the
two, some things are necessarily different when building mobile software. Those differences include:

- Much of our code is written in React Native
- Testing is different from other Artsy systems (Web and Platform practices test on staging; we test in betas).
- Deploying is different from other Artsy systems (Web and Platform practices promote from staging to production;
  for mobile, we cut betas and submit to Apple for App Store approval and Google Play for Android).

We do have a lot in common with the [Web Practice](./web.md):

- Our React/Native apps share [a common design system](https://github.com/artsy/palette-mobile/).
- We're all solving problems for Artsy.

We also have a lot of non-mobile engineers contributing to our React Native app. Part of the Mobile Practice, then,
is to support them contributing to our mobile projects.

We have a practice meeting every two weeks to discuss mobile-specific topics, and a mobile office hours every other week where anyone can ask mobile-related questions / get help for mobile environment setup or even pair.

### Team Goals

Our goals are the same as the [Web Practice goals](./web.md#team-goals), but with a focus on supporting iOS and
Android software at Artsy. That means we have the following additional goals:

- Build tools and systems to help non-mobile engineers contribute to Artsy mobile software using React Native.
- Help our colleagues understand the differences between building iOS/Android software and web software.

### Logistics

Each mobile app at Artsy is deployed according to its own unique needs. We have a release process 

### Our Technologies

#### iOS Technologies

Initially, Artsy apps were built with Objective-C. Then Swift was announced in 2014, and
[we tried it](http://artsy.github.io/blog/2017/02/05/Retrospective-Swift-at-Artsy/) but have ultimately
[settled on React Native](http://artsy.github.io/blog/2018/03/17/two-years-of-react-native/). 

All the new features are developed in React Native and if possible, we try to migrate existing native code to React Native as well.

We do have still some native code for parts of our app (notably, [the Augmented Reality feature](http://artsy.github.io/blog/2018/03/18/ar/) and the animation-driven
[Live Auctions Integration](http://artsy.github.io/blog/2016/08/09/the-tech-behind-live-auction-integration/#The.iOS.native.app:.Eigen),
user interface). 

### Artsy mobile Apps

#### iOS Apps

Artsy has the following mobile applications, which are all open source except Energy.

- [Eigen](https://github.com/artsy/eigen) is Artsy's main mobile app. (React Native)
- [Energy](https://github.com/artsy/energy) is Artsy's partner app. (React Native)
- [Palette-mobile](https://github.com/artsy/palette-mobile) is our design system for mobile apps. (React Native)

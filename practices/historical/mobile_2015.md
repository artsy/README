# Mobile Practice Playbook

## Team Information

### Culture

We collectively created an article for the magazine
[objc.io on Artsy Mobiles's culture](http://www.objc.io/issue-22/artsy.html).

### Team Goals

- Create delightful, focused, mobile native experiences.
- Aggressively Open by Default.

### Onboarding

Most of the general Artsy Developer information for onboarding is covered in
[artsy/potential](https://github.com/artsy/potential#onboarding) 🔒. Further
below we have a section on code-signing.

### My first week

Ideally in your first week you should:

- Take some of our code, and turn it into a public pod. If you've never created a CocoaPod before.
- Squash a few easy bugs, and cover your tracks with tests for regressions.
- Start thinking about [blog posts](https://github.com/artsy/mobile/labels/Blog%20Post).
- Have installed and ran some of the mobile projects you're not actively working on for context.

### Logistics

- The whole dev team does a big standup on Monday 2pm NYC time.

- Weekly stand-up on Tuesday 11:00 (NYC time)

  - What are you working on or need help with?
  - Explain any new features or requests.
  - Orta fills in any "team"-y things

- Daily GeekBot stand-up per project

  - What have you been up to, what are you planning to do?

- Bi-weekly FeelsBot stand-up (Mon/Thr) posted in [#mobile-banter](https://artsy.slack.com/messages/mobile-banter/) 🔒

  - Done anything fun? How are you doing today? Feeling ok?

- Work is done through GitHub issues within sprint cycles.

  - Sprint Cycles timing varies between projects.
  - Eigen has a 6 week sprint cycle.
  - Milestones, and features are discussed and setup at a pre-sprint meeting.
  - Issues are created and added to the sprint milestone.

- Team-wide issues and TODOs can be found in [Artsy/Mobile](https://github.com/artsy/mobile/).
- The Mobile team specific
  [calendar](https://www.google.com/calendar/embed?src=artsymail.com_bke4sctkn8o072rjgtcsrrun3s%40group.calendar.google.com&ctz=America/New_York)
  is used for Out Of Office / Events.
- Chat in [#mobile-banter](https://artsy.slack.com/messages/mobile-banter/) 🔒
- Each app has its own focused channel in Slack - Eigen:
  [#gmv-ios-dev](https://artsy.slack.com/messages/gmv-ios-dev/) 🔒, Energy:
  [#energy](https://artsy.slack.com/messages/energy) 🔒 and Eidolon:
  [#auctions-dev](https://artsy.slack.com/messages/auctions-dev/) 🔒.
- Each app has a user facing slack, which is for bug reports / product discussion:
  [#gmv-ios](https://artsy.slack.com/messages/gmv-ios/) 🔒, [#folio](https://artsy.slack.com/messages/folio) 🔒 and
  [#auctions](https://artsy.slack.com/messages/auctions/) 🔒.
- GitHub notifications, etc. in [#mobile-notifications](https://artsy.slack.com/messages/mobile-notifications/) 🔒.

### Getting started

Chances are there's a `make artsy`, and otherwise follow the README for your project of choice. Some pods (like our
fonts) will only install if you're an Artsy team member though, and hence you'd want to set an environment variable
of `ARTSY_STAFF_MEMBER` to `true`.

If you use Xcode, we strongly recommend installing the plugins [Snapshots](https://github.com/orta/Snapshots) and
[You Can Do It](https://github.com/orta/You-Can-Do-It). [Alcatraz](http://alcatraz.io) is generally the go-to here.

### Code Signing

Certificates and keys for signing apps for development/distribution are in the Engineering 1Password vault. The
certs/keys are stored as a developer identity that can be imported into Xcode; the entry is named "Apple iOS Mobile
Developer Identity". Make sure to install from there instead of letting Xcode revoke the existing keys.

For more information related to choosing the right certificate and profile for development builds (that include
Push Notification support), see
[this document](https://github.com/artsy/eigen/blob/master/docs/push_notifications.md). In case you need to
manually install the right certificate, it is called “Eigen Developer Identity” in the Engineering 1Password vault.

You should check the documentation folder for the app you're looking at for more specific information.

### Our Apps

- [Eigen](https://github.com/artsy/eigen): The Artsy iOS App.
- [Energy](https://github.com/artsy/energy): Artsy Partner's Portfolio App.
- [Eidolon](https://github.com/artsy/eidolon): Kiosk App for Auctions.
- [Emergence](https://github.com/artsy/emergence): tvOS App for Browsing Shows.

Other mobile projects:

- [Emission](https://github.com/artsy/emission): A React Native Components Library.
- [Epsilon](https://github.com/orta/epsilon): An iPad app for running a web-browser in a fair.
- See the [engineering projects map](https://trello.com/b/VLlTIM7l/artsy-engineering-projects-map) for a
  comprehensive list of Mobile Practice libraries.

### GitHub

We use GitHub, tada. Because we run OSS then we use GitHub more like how
[GitHub](https://speakerdeck.com/holman/how-github-uses-github-to-build-github) does than
[Artsy](http://artsy.github.io/blog/2012/01/29/how-art-dot-sy-uses-github-to-build-art-dot-sy/). We use branches on
the app's main repos. All of our apps have convenient `make` commands to simplify name prefixes for branches. E.g.
`make push` would take the branch `new_vir` and push it as `orta-new_vir` making it obvious who is the owner. Check
the `Makefile` in the repo to see other commands like: `make fpush`, `make pr` etc.

### Our Key Technologies

#### Objective-C

A lot of our apps pre-date the swift language, and re-writes come at a big cost. Objective-C is still a fine
language, so a lot of development is still done in it. All projects now do support Swift, so additional components
can be written in Swift if preferred.

#### CocoaPods + Bundler

We rely on dependency managers, and plugins for them. If this is new to you, we recommend reading the
[Podfiles](https://guides.cocoapods.org/) and [Gemfiles](https://guides.cocoapods.org/using/a-gemfile.html) guides
on CocoaPods.

#### Testing

We test our apps to ensure that our behavior is what we expect. We use a collection of
[FBSnapshot](http://www.objc.io/issue-15/snapshot-testing.html) Tests and Unit Tests via
[Specta/Expecta](https://github.com/specta/specta) or [Quick/Nimble](https://github.com/Quick/Quick/).

#### Eigen

- **Useful:** [ORStackView](https://github.com/orta/ORStackView/),
  [ARAnalytics](https://github.com/orta/ARAnalytics) +
  [RAC DSL](https://github.com/artsy/eigen/blob/6bcacede194ca5b948e916746d313e7c96ec085e/Artsy/Classes/ARAppDelegate%2BAnalytics.m)
  and [ReactiveCocoa](http://reactivecocoa.io).
- **Essentials:** Auto Layout, [JLRoutes](https://github.com/joeldev/JLRoutes)

#### Energy

- **Useful:** [ORStackView](https://github.com/orta/ORStackView/),
  [ARAnalytics](https://github.com/orta/ARAnalytics).
- **Essentials:** Core Data, [DRBOperationTree](https://cocoapods.org/pods/DRBOperationTree)

#### Eidolon

- **Essentials:** Swift, [RxSwift](http://rxswift.org), [Moya](https://github.com/ashfurrow/moya/), Storyboards

#### Emergence

- **Essentials:** Swift, [Moya](https://github.com/ashfurrow/moya/), Storyboards

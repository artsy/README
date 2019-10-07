# iOS Learning Group Session One

Before we talk about iOS software, we're going to get started on some long-running tasks to get you set up with
local development environments. We'll bounce back and forth between this section and the next, as these
long-running tasks allow us.

## Before Arriving

- Download **Xcode 10.3** from [Apple's developer tools portal](https://developer.apple.com/download/more/) (login
  required, use your personal Apple ID)
  - It's important not to download Xcode from the App Store because it will auto-update, and we want to pin our
    developer tools.
- Unzip the download, it will take a while
- Install [CocoaPods](https://cocoapods.org)
  - `gem install cocoapods`
- Install the [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
  - `brew update && brew cask install react-native-debugger`

## Setup

First, let's clone Eigen and get it set up. Eigen is the native parts of our app (Objective-C and Swift).

```sh
git clone https://github.com/artsy/eigen.git
cd eigen
bundle install
make artsy
bundle exec pod install --repo-update # You'll be asked for keys here.
open Artsy.xcworkspace
```

> **Q**: What happens if `bundle exec pod install` fails to run?
>
> **A**: Your first step should always be to try re-running it, it often works!

This looks kind of weird, so let's break it down. First we clone the repo, then `cd` into it, then
`bundle install`. This is because our iOS dependency manager, [CocoaPods](https://cocoapods.org), is itself a
RubyGem. So we need to use Bundler to install CocoaPods. Then `make artsy` does some neat stuff with git, and then
finally we install our iOS dependencies and open the Xcode workspace.

`pod install` is what installs the actual iOS dependencies (called "pods"). Because of how CocoaPods works, it has
to cache all known pod specs on your disk, which takes a while the first time. Pods are installed into the `Pods`
directory, similar to `node_modules`.

> **Q**: When to run a repo update?
>
> **A**: If `bundle exec pod install` fails because it can't resolve a dependency (usually Emission) then try
> adding `--repo-update`.

During `pod install`, you'll be asked for keys (API keys, etc). Look for the "Eigen Keys" secure note in the
1Password vault. We use a CocoaPods plugin that Orta wrote,
[cocoapods-keys](https://www.github.com/orta/cocoapods-keys), to store keys securely in the macOS keychain. During
`pod install`, it will obfuscate them to be compiled into the binary (more on that later).

> **Q**: What if I enter a key incorrectly?
>
> **A**: You can interact with the key store through the CocoaPods-Keys plugin. Run `bundle exec pod keys --help`
> for a list of commands, but you'll probably want to _set_ a key. Check out usage with
> `bundle exec pod keys set --help`.

After that, you should be able to open the Xcode workspace and hit ⌘R to launch the app in a simulator.

Alright now let's do Emission, which is the React Native parts of our app.

```
git clone https://github.com/artsy/emission.git
cd emission
yarn install # Install JS dependencies
cd Example
bundle install
bundle exec pod install # Installs CocoaPods
open Emission.xcworkspace
cd ..
yarn start # Starts React Native packager
```

This clones the repo, installs the JavaScript dependencies, and then installs the CocoaPods for the Emission
Example app. So what's that?

Emission is kind of complicated. It's three things in one:

- An npm module (our React Native components).
- A CocoaPod (Objective-C wrappers for our React Native components).
- An Example app (a testbed for our components).

You'll be asked for keys again during `pod install`.

Emission and Eigen can be confusing, not least because they both start with the letter 'e'. Eigen is what we work
in for native code, and Emission for React Native components. Sometimes we link them together, but it's often
easier to just develop in them independently.

## What is iOS, Even?

Okay so while that's all happening, we can talk a bit about how iOS software works, and how that's different from
the web.

Web apps get served directly to users' browsers. The browser fetches the various JavaScript assets needed to
execute the app. If we want to update the web app, we just serve different assets to the browser. Rollbacks are
easy, since we just serve different assets.

iOS apps get submitted to Apple for App Store review, where Apple vets them for App Store guideline adherence. Once
satisfied (a day or so), Apple will then let users download the app. So there's two key differences here:

1. There's an intermediary (Apple) involved in deploying an iOS app.
2. Users aren't served the app, they download the binary executable.

Because users are downloading our app entirely, as an executable, we can't just switch to serving different assets
for deploys or rollbacks. **Any change we make takes at least a day to get into our users' hands**. Furthermore,
once the executable is installed, users never have to update it. **Users can keep using old versions of our app**,
and they frequently do.

No rollbacks and day-long deploys mean that QA is a lot more serious for iOS apps, which we
[document in Notion](https://www.notion.so/artsy/514e1e1c55604b1890f678c748d4223a?v=fb0bcb2e9e9d4d07afefb05a64cd371b).

---

Okay, so how do we get Eigen and Emission talking to each other? Since Eigen is the consumer of Emission's
components, we'll run Eigen and get it to work with our local Emission.

There are two levels of doing this. If you just need to link React Native changes, then it's easy to point Eigen to
the local React Native Packager (in the debug menu). If you're also making Objective-C changes to Emission and want
to see them reflected in Eigen, it's a little trickier. Both options are
[detailed in the documentation](https://github.com/artsy/eigen/blob/master/docs/using_dev_emission.md).

## Core Concept Review & Homework

Here are some questions to take away with you and ponder. Try to answer them, we'll review them next week.

- iOS Software is really different from web software: we ship a binary instead of serving a web page. - What other
  kinds of software have the same constraints?
  - We talked today about the disadvantages of iOS' approach to deployments, but can you think of any benefits?
- Come up with an idea for Artsy's iOS app. A feature, bug fix, a whole new screen, whatever! Think about how and
  where the code would be to implement it.
- Extra credit: look at the Palette repo and find a component that works in both React (web) and React Native. Find
  one that only works on one. Why do you think these limitations exist?

## Resources / Recommended Reading

- Eigen: [https://github.com/artsy/eigen](https://github.com/artsy/eigen)
- Emission: [https://github.com/artsy/emission](https://github.com/artsy/emission)
- Linking Emission and Eigen:
  [https://github.com/artsy/eigen/blob/master/docs/using_dev_emission.md](https://github.com/artsy/eigen/blob/master/docs/using_dev_emission.md)
- Apple developer tools download page (login required):
  [https://developer.apple.com/download/more/](https://developer.apple.com/download/more/)

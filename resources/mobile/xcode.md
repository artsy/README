---
title: How to Use Xcode
description: Introduction and further resources to using Xcode
---

## Installing Xcode

Xcode is Apple's IDE for developing, among many other things, iOS applications. You can install Xcode in one of two
ways:

- [From the App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
- [From Apple's Developer portal 🔐](https://developer.apple.com/download/more/)

Either works, **but beware**! If you have App Store automatic updates enabled, you may come in to work one day and
find that your IDE has changed (which has implications for Swift language and SDK versions). We recommend
downloading Xcode manually from [Apple's Developer portal 🔐](https://developer.apple.com/download/more/).

You can have two different versions of Xcode installed on your computer, which is useful when we haven't yet
upgraded old projects to be compatible with the latest Xcode version. They are just a Mac app like any other, so we
can organize them in the `/Applications` directory. Here's a common setup:

```
/Applications
├── Xcode9/Xcode.app
├── Xcode10/Xcode.app
└── Xcode11/Xcode.app
```

Note that none of the paths have spaces in them. Xcode gets invoked one of two ways, and switching which version is
invoked is different for each one:

- Opened from Finder, Xcode projects+workspaces can change versions by right-clicking and selecting "Open with...",
  optionally using "Get Info" to make the change permanent.
- Compiled from the command like, use `xcode-select`. `-p` will print the path to the current Xcode, and `-s` will
  switch it. For example: `sudo xcode-select -s /Application/Xcode10/Xcode.app`.

What about simulators? Officially, you need to run the new Xcode versions to use the new iOS version in a
simulator.
[Unofficially, there is a workaround](https://gist.github.com/steipete/d9b44d8e9f341e81414e86d7ff8fb62d). The tl;dr
is to copy a directory from the new Xcode version to the old Xcode app's bundle. With the above directory structure
as an example, one could install the iOS 13 simulators from Xcode 11 into Xcode 10 with the following commands:

```sh
cp -r /Applications/Xcode11/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport/13* /Applications/Xcode10/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport
```

You'll need to restart Xcode.

## Getting used to Xcode

Xcode is really different from VSCode. It's Apple's opinion on what a good IDE should be, and sometimes it's
uncomfortable at first. Some quick differences:

- Xcode doesn't encourage you to have multiple files open at a time, in tabs.
- Xcode uses web browser-like history for navigating back-and-forth between files (look at the top-right corner of
  the file editor for the arrows).
- Xcode's file browser doesn't represent the file system's directory structure – it is a distinct organization that
  just _happens_ to match the disk's directory structure most of the time.

<!-- TODO: Find-or-create an Xcode cheat sheet. -->

# iOS Learning Group Session Two

## Homework review

- iOS Software is really different from web software: we ship a binary instead of serving a web page. - What other
  kinds of software have the same constraints? - We talked today about the disadvantages of iOS' approach to
  deployments, but can you think of any benefits?
- Come up with an idea for Artsy's iOS app. A feature, bug fix, a whole new screen, whatever! Think about how and
  where the code would be to implement it.

## Exercise: Let's pull latest changes!

Over the past week, there have been changes to both the Eigen and Emission repositories. Let's pull from each and
make sure we're able to launch the latest code in our simulators.

> **Reminder**: Eigen and Emission use _branches_ on Artsy's repo, and **not** forks. Submit pull requests to
> Artsy's branch, with a good descriptive name.

### Eigen

Remember that Eigen uses CocoaPods, which is itself managed through Bundler. You might need to update your gems
_first_ and then your CocoaPods.

```sh
# cd into eigen directory
git pull
bundle install # if necessary
bundle exec pod install # might need to add --repo-update if it fails
# Open workspace
```

### Emission

Emission has [pull-lock](https://github.com/orta/pull-lock) configured, but can still get into problems. Here're
the manual steps in case it fails:

```sh
# cd into emission directory
git pull
yarn install # include --check-files if things get weird
cd Example
bundle exec pod install # might need to add --repo-update if it fails
# Open workspace
cd ..
yarn start
```

## Why React Native?

Artsy uses React Native because it
[allows Artsy engineers working on the iOS and web front-ends to share the same idioms and tooling](https://artsy.github.io/blog/2019/03/17/three-years-of-react-native/).
The primary benefit of using React Native is that
[we get to use React](https://ashfurrow.com/blog/the-case-for-react-native/#react-itself-is-amazing), which is not
only a better way of building iOS apps, but gives us those shared idioms and tools. (We're hoping to leverage React
Native for Android in the longterm, but for now that's the motivation.)

You can think of React Native as React, but instead of targeting `div`'s and the HTML DOM, you're targeting native
views to whatever target platform you're running on. So, Artsy uses React Native to target the iOS `UIView`
hierarchy. Developers write very similar, often identical components to the web, but at runtime, they get rendered
in native iOS views instead of DOM elements. We'll take a look at `EntityHeader` as an example shortly. All the
familiar [React component lifecycle methods](https://reactjs.org/docs/react-component.html) exist in React Native
components, too. From a high-level, rendering is the same on both platforms.

Okay, so using React Native lets us use React in a mobile context. There are a couple of problems with this:

- **React was built for the browser**. The idiom works on mobile, but the browser constraints that have guided
  React's development are often not present in mobile contexts. For example, React takes great pains to minimize
  component updates because browser reflows are expensive, but reflows don't even exist in iOS apps and view
  component updates are relatively cheap.
- **Mobile still has its own constraints**. React was built for the browser, but React Native has to operate on
  mobile devices which have their own constraints. This leads to patterns and components that are mobile-specific
  (and sometimes iOS-specific). For example, `FlatList`.

Let's talk about `FlatList`. Consider you are Apple or Google and you're building an SDK for a smartphone in 2007.
All your resources are constrained: CPU, disk I/O, and RAM are all way slower than desktop computers _and_ storage
is limited. You decide that your mobile operating system won't support virtual memory (ie: swap space) because it's
too expensive. Also, there's no garbage collection (on iOS) because it, too, is too expensive. To support the best
user experience, you would design your app SDK to minimize memory allocations.

Okay, keep that in mind while we think about a hypothetical app. It lists all your favourite art, and you have
thousands of favourites. As the user scrolls through a list of thousands of artworks, many artworks pass by, but
only a few are ever visible at the same time. To minimize memory allocations, mobile devices actually _reuse_ views
from the list. An artwork view that is scrolled offscreen is removed from the view hierarchy and queued up for
re-use, where it gets re-configured with new data.

**Note**: While `FlatList` often renders homogenous data (ie: every cell is display the same kind of information),
Artsy uses it generally to render lists of content. For example,
[the Artwork component](https://github.com/artsy/emission/blob/16cedc92d3420b6b94d78d7f38b9bbc71f152c09/src/lib/Scenes/Artwork/Artwork.tsx#L206-L219)
is one large list.

(This pattern is called _list virtualization_ and can be applied in many different contexts, mostly for performance
reasons. Check out [this library](https://github.com/bvaughn/react-virtualized) for a general-purpose React
implementation.)

Although the resource constraints of 2007 aren't as relevant in 2019, this pattern persists across iOS and Android
because it's _really_ performant, and there is now more than a decade of APIs built atop it. It is with this spirit
that React Native introduced the `FlatList` component.

All this dequeuing business takes a lot of code, and `FlatList` handles it all for you. Let's compare what a list
in React looks like compared to React Native.

```tsx
// In React
{conversations.map(({item}, index) => ( // Here's the data.
	<ConversationSnippet // Here's how to render each data item.
	  key={String(index)} // Here's what keys to use.
		conversation={item}
		onSelected={...}
	/>
)}

// In React Native
<FlatList
  data={conversations} // Here's the data.
  keyExtractor={(_item, index) => String(index)} // Here's what keys to use.
  renderItem={({ item }) => ( // Here's how to render each data item.
    <ConversationSnippet
      conversation={item}
      onSelected={...}
    />)}
/>
```

## Shared Infrastructure

In 2015, web and mobile engineers at Artsy used the following tools in common:

- GitHub.

The teams were operating in silos, and React/Native have really brought us together. Here are some of the tools
that we now share in common:

- [React](https://reactjs.org) (of course).
- [Relay](https://relay.dev) (and Metaphysics!).
- [Styled-system](https://github.com/styled-system/styled-system) / [Palette](https://github.com/artsy/palette).
- [TypeScript](https://www.typescriptlang.org).
- [Jest](https://jestjs.io).
- Tonnes of node modules (lodash, react-tracking, etc).
- [VSCode](https://code.visualstudio.com).
- ... and GitHub.

So we've gone from a point where two teams were using separate languages, text editors, testing frameworks, network
libraries... to a point where it's no longer productive to think about "web" and "mobile" engineers. Pretty great!

Let's dive into detail on Palette because, for front-end work, it's one of the most important packages to
understand. If you're using to using Palette on the web, then you'll _mostly_ be able to use Palette in React
Native like you're used to. We're going to look at two examples, of a fundamental component and a
slightly-more-complex component.

First, `Box`. Developers who have used Palette are accustomed to writing components with `Box` rather than `div`.
Why is that? Well, there are a few reasons, but one of the most important ones is to make the component compatible
with React Native. Earlier, we said:

> You can think of React Native as React, but instead of targeting `div`'s and the HTML DOM, you're targeting
> native views to whatever target platform you're running on.

`div` is an HTML-specific component, and `Box` is designed to be cross-platform. Let's see what it looks like in
the Palette source code.
[`Box` is defined as a "primitive view"](https://github.com/artsy/palette/blob/cef079d8a81002533fc9a977d9ba717a9eafd835/packages/palette/src/elements/Box/Box.tsx#L59):

```tsx
export const Box = primitives.View<BoxProps>`
```

`primitives` come from Palette, which is defined in two files.

```sh
➜ tree packages/palette/src/platform/
packages/palette/src/platform/
├── ...
├── primitives.ios.ts
└── primitives.ts
```

React Native will import the `.ios.ts` file when it gets `import`ed from iOS. Similarly, it will import
`.android.ts` (but we don't have an Android app). The web defaults to just `.ts`.
[Check out the docs](http://facebook.github.io/react-native/docs/platform-specific-code) for more detail on this
module resolution.

So when the `Box` is defined as `styled.View`, it's being defined
[as a styled-components `div` on web](https://github.com/artsy/palette/blob/cef079d8a81002533fc9a977d9ba717a9eafd835/packages/palette/src/platform/primitives.ts#L5-L9)
and
[as a styled-components `View` on iOS](https://github.com/artsy/palette/blob/cef079d8a81002533fc9a977d9ba717a9eafd835/packages/palette/src/platform/primitives.ios.ts#L7-L11).
(Styled-components is doing a bit more abstraction for us here, depending on iOS-vs-Android. Ultimately, on iOS,
`Box` components are rendered as native Objective-C `UIView` subclasses.)

Let's take a look at a more complex component example.

![Comparison between Reaction and Emission](./images/session-two-comparison.png)

Oh so that's interesting! Both Reaction and Emission are rendering an `EntityHeader` for the same entity, but they
look different! Why is that?

Palette sometimes makes idiom-specific decisions about how a component should be rendered on web or iOS. In this
case, we've turned the "Follow" link into a "Follow" button.

> **Q**: Why do you think a button would be better than a link in this case?
>
> **A**: Because it will be a larger tap target for users trying to hit the button with their fingers (instead of a
> mouse cursor).

Okay so if Reaction and Emission use the same component, how does this work? Let's look at
[Palette's code](https://github.com/artsy/palette/tree/master/packages/palette/src/elements/EntityHeader).

```sh
➜ tree packages/palette/src/elements/EntityHeader
packages/palette/src/elements/EntityHeader
├── EntityHeader.ios.tsx # iOS-specific implementation.
├── EntityHeader.tsx # Web-specific (ie: default) implementation.
└── index.tsx # The magic that makes it work.
```

`index.tsx` is how this component gets imported by both Reaction and Emission, and this is where the magic happens:

```sh
➜ cat packages/palette/src/elements/EntityHeader/index.tsx
export * from "./EntityHeader"
```

The trick is that we have Palette's module lookup configured to import `EntityHeader.tsx` on web, and
`EntityHeader.ios.tsx` on iOS, when _this_ file imports `from "./EntityHeader"`. So the resolution happens within
Palette, abstracted from the developer using the component.

The big exception to our shared infrastructure is displaying images in React Native. Emission has its own
`OpaqueImage` component that you should use instead – it shares an image cache with our native Objective-C / Swift
code.

> **Q**: If React Native uses CSS, what units does it support?
>
> **A**: React Native, like iOS, supports a kind of device-independent virtual pixel size called _points_. On
> 1x-scale devices (like the original iPhone) 1pt = 1px. On a 2x-scale device (like an iPhone 8) 1pt = 2px. We lay
> out our UI in points to avoid having to deal with these differences.
> [Check out this blog post](https://medium.com/@0saurabhgour/react-native-density-independent-pixels-pixelratio-1f10d86f631)
> or [the official docs](https://facebook.github.io/react-native/docs/pixelratio) for more information. Typically,
> though, we use styled-system and Flexbox (via [Yoga](https://yogalayout.com)) to avoid having to specify these
> values manually.

## iOS-Specific Infrastructure

Everything the user sees in the app can be categorized into one of the following:

- Native code (aka "UIKit code", Objective-C and Swift in Eigen)
- React Native (TypeScript in Emission)
- Web view (could be from anywhere!)

Web views are really interesting. In some ways, they've helped us move fast without maintaining strict parity
between web and iOS. On the other hand, we've also got some views that _should_ be native views, but are still web
views. Let's contrast some examples:

<details><summary>

**Q**: The BNMO flow is shown in a web view. What are the advantages/disadvantages of this approach?

</summary>

The BNMO flow is changed frequently, for example when we added SCA compliance. By building the flow in a web view,
we not only get to re-use the web implementation on iOS, but we also get users to see the latest-deployed web
version at any time. This bypasses App Store review, which is really convenient.

</details>

<details><summary>

**Q**: The Partner page (eg: a gallery) is shown in a web view. It looks awful, because the mobile web partner page
looks bad. But this could be an advantage, too! Why is that?

</summary>

**A**: The advantage of having the Partner page be a web view is that, if we improve the web view, iOS users see
the improved version without having to update their app version.

</details>

<details><summary>

**Q**: The BidFlow project, built by Purchase in 2018, is _not_ a web view. It's built in React Native. Why do you
think that was?

</summary>

**A**: BidFlows on web and iOS differ because user expectations on those platforms differ. By building the BidFlow
in iOS, we adhere more closely to the users' expectations during this critical path. It also gives us a "native
feel" to the app, by using UI controls that aren't available on the web (like `UIPickerView` for selecting a bid
increment).

</details>

(Routing between views in our app always happens via URLs in Eigen, in the
[ARSwitchboard class](https://github.com/artsy/eigen/blob/master/Artsy/App/ARSwitchBoard.m). If there is no route
for a given URL, it falls back to a web view. You can
[check out the docs for adding new components](https://github.com/artsy/emission/blob/master/docs/adding_new_components.md)
for more information about how Eigen/Emission routing interop works.)

Okay that's all great, but how do we know where the code lives? If you have a bug report, how do you know where to
look for the code you'll need to change to fix the bug?
[We have documented instructions](../finding-code.md) for this. The process involves finding the _view
controller_ for a given user interface, and then working backwards from there. We'll learn about view controllers
next week.

## Let's see some code

Objective-C predates what we'll call "common" programming syntax. The following code syntax is representative of
JavaScript, C, C++, Ruby, and a bunch of other languages:

```ts
this.relay.refetch(params, null)
```

So what would this same idea look like, in Objective-C?

```objc
[self.relay refetch:params renderVariables:nil];
```

Whoa! Really different. Objective-C has dot-syntax for property access, so `self.relay` works as you'd expect. But
we have to prefix the object that we're calling the function on with `[`. `params` look similar to the first code
example, but what is `renderVariables`? Well, Objective-C includes named parameters _at the call site_. This can
get a little confusing, but we'll cover Objective-C in more detail next week.

And what about Swift? Well, Swift is kind of a weird mix of both:

```swift
self.relay.refetch(params, renderVariables: nil)
```

We're going to focus mainly on Objective-C for this course, since
[Objective-C is our preferred native language](https://github.com/artsy/README/pull/217).

## Core Concept Review & Homework

- What are some of the constraints on mobile devices that aren't present on web browsers? What about mobile
  browsers, did they also have these constraints? Do they still have them?
- We've seen how Palette components differ across iOS and web, like the `EntityHeader`. How do you think this
  affects the Relay fragments we use for this component?
- Recall the idea you came up with for the app, from last week's homework. Considering that features in the app are
  built in one of three places (native code, React Native code, or a web view), where do you think Artsy should put
  build your idea? Why?
- Extra credit: we briefly looked at how to call a function in Objective-C. How do you think that function is
  defined at the _implementation_ site?

## Resources / Recommended Reading

- [Artsy's 3-year retrospective on React Native](https://artsy.github.io/blog/2019/03/17/three-years-of-react-native/)
- [Platform-specific code in React Native](http://facebook.github.io/react-native/docs/platform-specific-code)
- [How to find code for UI in the app](https://github.com/artsy/README/blob/master/resources/mobile/finding-code.md)
- [The Objective-C Language Reference](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Introduction/introObjectiveC.html)
- [Swift API Design Guidelines](https://swift.org/documentation/api-design-guidelines/)

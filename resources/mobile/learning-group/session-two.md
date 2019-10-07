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
in native iOS views instead of DOM elements. All the familiar
[React component lifecycle methods](https://reactjs.org/docs/react-component.html) exist in React Native
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
too expensive. To support the best user experience, you would design your app SDK to minimize memory allocations.

Okay, keep that in mind while we think about a hypothetical app. It lists all your favourite art, and you have
thousands of favourites. As the user scrolls through a list of thousands of artworks, many artworks pass by, but
only a few are ever visible at the same time. To minimize memory allocations, mobile devices actually _reuse_ views
from the list. An artwork view that is scrolled offscreen is removed from the view hierarchy and queued up for
re-use, where it gets re-configured with new data.

Although the resource constraints of 2007 aren't as relevant in 2019, this pattern persists across iOS and Android
because it's _really_ performant, and there is now more than a decade of APIs built atop it. It is with this spirit
that React Native introduced the `FlatList` component.

All this dequeuing business takes a lot of code, and `FlatList` handles it all for you. Let's compare what a list
in React looks like compared to React Native.

```tax
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
understand.

If you're using to using Palette on the web, then you'll _mostly_ be able to use Palette in React Native like
you're used to. Let's see how that works in practice.

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
`EntityHeader.ios.tsx` on iOS, when _this_ file imports `from "./EntityHeader"`. So the resolution happens at the
Palette-level instead of Emission or Reaction.

The big exception to our shared infrastructure is displaying images in React Native. Emission has its own
`OpaqueImage` component that you should use instead – it shares an image cache with our native Objective-C / Swift
code.

## iOS-Specific Infrastructure

// TODO:

What lives where

how to find where something is

## Core Concept Review & Homework

// TODO:

## Resources / Recommended Reading

// TODO:

# iOS Learning Group Session Three

## Homework review

- What is the purpose of a view controller, from a developer's perspective? What about from a user's perspective?

<details>
<summary>Answer</summary>

A view controller is the main unit of composition for building native iOS UI's. From a user's perspective, they
might call it "a screen", since view controllers commonly take up the entire screen of an app. However, view
controllers really can be _composed_ so while a view controller might indeed take up the entire screen, it might be
composed of child controllers as the develop sees fit.

</details>

- How does a parameters on the Objective-C view controller `init` method get sent to the React component hierarchy
  as a prop?

<details>
<summary>Answer</summary>

The parameter gets passed into the `initialProperties` parameter of the call to `super`'s
`initWithEmission:moduleName:initialProperties`. You need to add the prop to the component's `Props` type to access
it using TypeScript.
[Here are the docs](https://facebook.github.io/react-native/docs/native-modules-ios#argument-types) that describe
translating Objective-C types into JavaScript types.

</details>

- We've seen how to create new controllers and link them with Eigen. Routing between view controller is all
  URL-based; what are the advantages and disadvantages to this approach?

<details>
<summary>Answer</summary>

**Advantages**: Getting to use the same URL's as the web means push notifications, deep links, and email deep links
all use the same routing infrastructure as UI interactions.

**Disadvantages**: Data passed from one controller to another has to be serialized into a URL first. Common
patterns such as passing `delegate` references or completion handlers forward to new view controllers is not
possible.

</details>

- Related: in `ARSwitchBoard.m`, you'll see two different methods for adding routes: `addRoute:handler:` and
  `registerEchoRouteForKey:handler:`. This lets us define routing URL's in [Echo](https://github.com/artsy/echo),
  Artsy's feature-flag-as-a-service. Why do you think this added functionality here?

<details>
<summary>Answer</summary>

This was added very early so that Force could update its URLs and Eigen could be updated remotely to match the new
scheme. It's never been used, though.

</details>

- Extra credit: Emission's `ARComponentViewController` defines a few props that get passed down based on iOS View
  Controller lifecycle methods. What are they? (Hint: [here is a PR](https://github.com/artsy/emission/pull/1890)
  that uses them.)

<details>
<summary>Answer</summary>

The `isVisible` is passed to all top-level components (ie: components backed by a component view controller). This
lets the component know if it's currently visible to the user or not.

</details>

<!--
This week, we will create our own React component to fit within the new view controller from Week 3. This will be a
Relay container, fetching data from Metaphysics v2. We will cover how to fetch data, how to re-fetch data, as well
as how Eigen and Emission integrate together to provide client-side API response caches (both Relay and others).
-->

## Making a Relay Component

Last week we built the following `MyNewComponent`:

```tsx
export class MyNewComponent extends React.Component {
  render() {
    return <Serif size="3t">Hello world!</Serif>
  }
}
```

This doesn't really do anything. This week, we're going to look at turning this into a **Relay component** that
fetches actual data from Metaphysics v2. To keep things simple, **we will be staying totally within the Emission
test app**.

Let's start by checking out the code from the end of last session:

```sh
# cd into Emission's repo
git fetch --tags # Required!
git checkout ios-learning-session-three-finished
git checkout -b ios-learning-group-session-four
```

Okay, let's start turning this into a Relay component. It's an iterative process, and we're going to work on small
pieces at a time. Let's apply the following diff to `MyNewComponent.tsx`:

```diff
 import { Serif } from "@artsy/palette"
 import React from "react"
+import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"

-export class MyNewComponent extends React.Component {
+interface Props {
+  relay: RelayRefetchProp
+}
+
+export class MyNewComponent extends React.Component<Props> {
   render() {
     return <Serif size="3t">Hello world!</Serif>
   }
 }
+
+export const MyNewComponentFragmentContainer = createRefetchContainer(
+  MyNewComponent,
+  {
+    artist: graphql`
+      fragment MyNewComponent_artist on Artist {
+        name
+      }
+    `,
+  },
+  graphql`
+    query MyNewComponentRefetchQuery($id: String!) {
+      artist(id: $id) {
+        ...MyNewComponent_artist
+      }
+    }
+  `
+)
```

This blah blag

## Core Concept Review & Homework

- Come prepared with a bug or feature from your team's backlog to work on. Session Five will be a working session,
  where we'll either pair or mob as a group on these issues.

## Resources / Recommended Reading

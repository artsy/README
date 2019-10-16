# iOS Learning Group Session Three

## Homework review

- What are some of the constraints on mobile devices that aren't present on web browsers? What about mobile
  browsers, did they also have these constraints? Do they still have them?
- We've seen how Palette components differ across iOS and web, like the `EntityHeader`. How do you think this
  affects the Relay fragments we use for this component?
- Recall the idea you came up with for the app, from last week's homework. Considering that features in the app are
  built in one of three places (native code, React Native code, or a web view), where do you think Artsy should put
  build your idea? Why?
- Extra credit: we briefly looked at how to call a function in Objective-C. How do you think that function is
  defined at the _implementation_ site?

<details>
<summary>Answer</summary>

```objc
// Given this call site:
[self.relay refetch:params renderVariables:nil];

// What would the implementation look like?
- (void)refetch:(RefetchParameters *)params renderVariables:(NSDictionary *)renderVariables;
```

</details>

## View Controllers

In native iOS applications,
[view controllers](https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/) are
the main unit of composition for writing application code. Some view controllers are primarily responsible for
managing other view controllers, like `UINavigationController`. Its job is to manage a stack of view controllers so
that the user can push new view controllers onto the stack (through navigation UI actions) and pop view controllers
off of the stack (by pressing the back button). Another example is the tab controller, which is responsible for
switching view controllers based on the user's selected tab. Eigen uses both of these heavily.

While many iOS applications now use non-MVC frameworks, view controllers are still a core part of the iOS SDK. They
are responsible for a view hierarchy, kind of like a React component hierarchy.

What we do with Eigen and Emission is kind of sneaky. Recall that Emission is imported as a CocoaPod into Eigen,
and that Emission exports a bunch of view controllers for Eigen to use. From Eigen's perspective, these are regular
view controllers, even though they have React Native view hierarchies.

Whenever you want to display something to the user in Emission, it needs to ultimately be inside a view controller.
If you're adding a whole new screen, then you'll need to add a new view controller. And that means writing some
Objective-C.

## Creating a new Emission View Controller

(**Note**: You can find the Emission code after these changes at the
[`ios-learning-session-three-finished` tag](https://github.com/artsy/emission/tree/ios-learning-session-three-finished).)

Instead of outlining all the steps to take to build a new view controller in Emission, we're going to
[rely on the documentation](https://github.com/artsy/emission/blob/master/docs/adding_new_components.md). We're
going to follow all the steps here, up to (but not including) "Next Steps", and here's why.

Normally when we add a new controller, we want to actually use it within Eigen. This is cumbersome for tutorials,
since we don't _actually_ want to add the `ARMyNewComponentViewController` controller. However, what we'll do is
get Eigen and Emission linked together, so we can see how they two work together without actually having to deploy
a new version of Emission.

Make sure that Emission's packaging server is running (`yarn start`). Then go to Eigen's `Podfile` and make the
following change:

```diff
-  pod 'Emission', '~> 1.17'
+  pod 'Emission', path: '../emission'
```

Then re-run `bundle exec pod install`. This tells CocoaPods to use the Emission `podspec` that's defined in the
local `path` (instead of [the one in Artsy's Specs repo](https://github.com/artsy/Specs/tree/master/Emission)).
**Important**: Changes to existing Objective-C/React files are reflected _immediately_, while **newly created or
deleted files** will need to have `pod install` ran _first_ before the changes get picked up.

Now we need to set up routing to our new controller. We're going to be taking over the tap for any artwork, to
navigate to our new controller. Find Emission's `ArtworkGridItem.tsx` file and locate
[the component's `handleTap` method](https://github.com/artsy/emission/blob/ac291bbbc5774b7fefa9718f384d6cfecf14220b/src/lib/Components/ArtworkGrids/ArtworkGridItem.tsx#L49-L54).
Make the following change:

```diff
   handleTap() {
-    // FIXME: Should this be internalID?
-    this.props.onPress && this.props.artwork.slug
-      ? this.props.onPress(this.props.artwork.slug)
-      : SwitchBoard.presentNavigationViewController(this, this.props.artwork.href)
+    SwitchBoard.presentNavigationViewController(this, "/my-new-component")
+    // // FIXME: Should this be internalID?
+    // this.props.onPress && this.props.artwork.slug
+    //   ? this.props.onPress(this.props.artwork.slug)
+    //   : SwitchBoard.presentNavigationViewController(this, this.props.artwork.href)
   }
```

What we've done is comment out its implementation and instead, always try to route to `"/my-new-component"`. Let's
set up the routing for this in Eigen.

Open Eigen's `ARSwitchBoard.m` file (⌘⇧O in Xcode). This defines all the routes, based on URL's (like
`"/my-new-component"`). Make the following change:

```diff
 #import <Emission/ARFairBMWArtActivationComponentViewController.h>
 #import <Emission/ARCitySavedListComponentViewController.h>
 #import <Emission/ARArtworkAttributionClassFAQViewController.h>
+#import <Emission/ARMyNewComponentViewController.h>

 #import "ArtsyEcho.h"
 #import "Artsy-Swift.h"
@@ -342,6 +343,10 @@ - (void)updateRoutes
         return [sself loadUnknownPathWithID:parameters[@"slug"]];
     }];

+    [self.routes addRoute:@"/my-new-component/:text" handler:JLRouteParams{
+        return [[ARMyComponentViewController alloc] init];
+    }];
+
     // The menu items' paths are added in ARTopMenuViewController
 }
```

You can look at other examples
([like this one](https://github.com/artsy/eigen/blob/6782e612174d27206c2826f05a24c3ac6f25060a/Artsy/App/ARSwitchBoard.m#L218-L221))
for how to pass parameters through the URL into the new controller (to be used as props).

Recompile Eigen and tap any artwork in any artwork grid; it should route to your new component.

## Core Concept Review & Homework

- What is the purpose of a view controller, from a developer's perspective? What about from a user's perspective?
- How does a parameters on the Objective-C view controller `init` method get sent to the React component hierarchy
  as a prop?
- We've seen how to create new controllers and link them with Eigen. Routing between view controller is all
  URL-based; what are the advantages and disadvantages to this approach?
- Related: in `ARSwitchBoard.m`, you'll see two different methods for adding routes: `addRoute:handler:` and
  `registerEchoRouteForKey:handler:`. This lets us define routing URL's in [Echo](https://github.com/artsy/echo),
  Artsy's feature-flag-as-a-service. Why do you think this added functionality here?
- Extra credit: Emission's `ARComponentViewController` defines a few props that get passed down based on iOS View
  Controller lifecycle methods. What are they? (Hint: [here is a PR](https://github.com/artsy/emission/pull/1890)
  that uses them.)

## Resources / Recommended Reading

- [View Controller Programming Guide for iOS](https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/)
- [Adding a New Component](https://github.com/artsy/emission/blob/master/docs/adding_new_components.md)

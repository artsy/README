---
title: Deprecate completed_onboarding_at
description: Removing the completed_onboarding_at flag on gravity's User model, since it no longer tells us anything reliable.
---

## Proposal

I want to deprecate and remove `completed_onboarding_at` on gravity's `User` model, along with the
`completedOnboarding` mutation input on metaphysics and every place in eigen and force that sets it.

## Reasoning

This flag was added in [gravity#13858](https://github.com/artsy/gravity/pull/13858) to solve a specific problem:
letting Sailthru know whether a user had completed onboarding, so we could tailor the welcome email flow
([GRO-125](https://artsyproduct.atlassian.net/browse/GRO-125)). We don't use Sailthru for this anymore. Today the
only thing that reads this field is a sync to Braze as a custom attribute, and I've been told Marketing isn't
actually using it there. So the reason it exists in the first place doesn't apply anymore, and the one thing it's
still plumbed into doesn't need it either.

Separately, we already have analytics events that tell us a much richer story about onboarding than a single
timestamp ever could: when someone starts, when they finish a specific step, when they skip, when they abandon
the flow entirely. That's the GRO-125 ask ("not started" vs. "started but didn't finish" vs. "completed") done
properly, funnel by funnel, instead of collapsed into one boolean.

And even if we did want to keep it, I don't think it means what it's supposed to mean anymore, and it means
something different on each platform:

- **On the app**, every user is forced through onboarding — there's no way to opt out of seeing it. So the
  timestamp doesn't tell you whether someone "completed" anything meaningful; it tells you how long they were in
  the onboarding flow before they left, because we set the flag the same way whether someone finishes the flow
  properly or skips straight past it.
- **On web**, it's set when a user reaches one of the flow's terminal screens — but not always (there's a whole
  branch, the art quiz, where it's just a bug and never fires), and reaching a terminal screen doesn't mean they
  did anything either (a few of them fire the moment the screen loads, whether or not the user engages).

So depending on which platform a user is on, "completed" can mean "was forced to sit through onboarding for some
amount of time," "landed on some terminal screen, maybe," or nothing consistent at all. That's not a reliable
signal for anyone to build on, in Braze or anywhere else.

## Exceptions

If Marketing comes back and says a live Braze segment or canvas does depend on this attribute, we should hold off
until that's resolved — I haven't been able to verify Braze's configuration from any of our repos, only that the
attribute is still being synced.

## Additional Context

- Origin: [GRO-125](https://artsyproduct.atlassian.net/browse/GRO-125), added in
  [gravity#13858](https://github.com/artsy/gravity/pull/13858).
- Today, `completed_onboarding_at` is exposed as a write-only input on metaphysics's `UpdateMyProfileInput`
  (there's no way to read it back over GraphQL) and syncs to Braze via gravity's `BrazeUserSync` whenever it
  changes.
- While looking into a related bug (the new "experience-based" onboarding flow in eigen wasn't setting this flag
  at all on some exit paths, even though it was firing the "completed onboarding" analytics event), it became
  clear the flag has never been set consistently, even before that bug: both eigen's old quiz flow and force treat
  "skipped" and "completed" identically, and force has a separate, unrelated gap where choosing the art quiz never
  sets it. None of this is a knock on anyone who built it — the field was reasonable when it was added, it's just
  drifted a long way from telling us anything trustworthy.

## How is this RFC resolved?

If people agree with removing it:

1. Confirm with whoever owns our Braze setup that nothing live depends on the `completed_onboarding_at` custom
   attribute.
2. Remove the field, the mutation input, and the Braze sync entry from gravity and metaphysics.
3. Remove every place in eigen and force that sets it.
4. Leave the historical column/data alone for now — this RFC is about whether we keep maintaining it going
   forward, not about backfilling or purging what's already there.

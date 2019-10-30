# iOS Learning Group Session Five

## Homework Review

- Come prepared with a bug or feature from your team's backlog to work on. Session Five will be a working session,
  where we'll either pair or mob as a group on these issues.
- We saw how React apps, and Emission in particular, avoid DRY software development. What do you think of this?
  Why?
- Emission is currently the only client to use persisted queries. Why do you think Emission uses them while other
  client apps (like Volt and Reaction) don't yet?
  - **A**: Mobile apps often operate over cellular network connections, so sending only the query ID and variables
    (rather than the whole query) saves a lot of bandwidth and provides a better UX.
- Extra credit: We see that the content of our component is touching the top edge of the simulator screen. This
  makes sense, but poses a problem. What do you think the problem is, and how do you think we could fix it? Hint:
  take a look around the Emission codebase for "SafeAreaInsets" and see what you find.
  - **A**: The problem is the iPhone X-style notch. Use the `SafeAreaInsets` props to avoid it.

## Resources / Recommended Reading

-

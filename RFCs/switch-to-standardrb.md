---
name: Switch to Standard Ruby
about: Align on a single way of formatting Ruby.
---

## Proposal

We should switch to Standard Ruby for our Ruby projects.

## Reasoning

RuboCop is too configurable and results in drift from project to project.
Standard Ruby has reached 1.0 and solves this problem by not being configurable
at all (well mostly not)!

At this point Standard Ruby also has a Rails-specific add-on that we can also
use.

It's editor integration is well done and specifically for VS Code users, it is
fast. More here:

https://blog.testdouble.com/posts/2023-02-16-its-official-the-standard-ruby-vscode-extension/

## Exceptions

None that we can think of!

## Additional Context

Standard Ruby is built on top of RuboCop and can be thought of as a opinionated
list of RuboCop config.

There's been a lot of complaints around the RuboCop integration with VS Code and
that's been pretty frustrating for people.

Switching from one Ruby project to another at Artsy can be pretty confusing
because each project is able to configure RuboCop (even unintentionally!) and
that can cause valid code in one project to be invalid in another project.

## How is this RFC resolved?

If this is agreed upon then we would go to our Ruby projects and follow a
process like this:

* switch to [standardrb-rails][srb_rails] (or [standardrb][srb] for non-Rails)
* remove RuboCop config
* run the formatter with the fix flag
* update any git hooks that run linters
* update any VS Code settings
* update CI to run standard instead of RuboCop
* open a PR with the resulting changes

We would propose resolving this by running through this process on a good
example project - how about Exchange first.

[srb]: https://github.com/standardrb/standard
[srb_rails]: https://github.com/standardrb/standard-rails

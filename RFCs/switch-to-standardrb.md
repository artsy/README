---
name: Switch to Standard Ruby
about: Align on a single way of formatting Ruby.
---

## Proposal

We should switch to Standard Ruby for our Ruby projects but hold off on the
Rails plugin for now.

## Reasoning

RuboCop is too configurable and results in drift from project to project.
Standard Ruby has reached 1.0 and solves this problem by not being configurable
at all (well mostly not)!

It's editor integration is well done and specifically for VS Code users, it is
fast. More here:

https://blog.testdouble.com/posts/2023-02-16-its-official-the-standard-ruby-vscode-extension/

## Exceptions

A plugin exists for Rails but it's not ready yet - let's revisit using it at a
later date.

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

* remove RuboCop comments from the project
* enable the "noisy rules"
* comply with those "noisy rules"
* regenerate RuboCop todo file
* replace RuboCop with Standard Ruby
* comply with fixable rules
* manual comply with remaining rules
* update VS Code settings
* open a PR with the resulting changes

There are example PRs for this process including on Exchange and Impulse.

[srb]: https://github.com/standardrb/standard

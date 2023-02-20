---
title: Human conventional commits
description: Use conventional commit, but better.
---

We use a modified version of [conventional commits] for our PR titles:
- `HOTFIX`: If an urgent fix is required.
- `feat`: A new feature.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `format`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc, linting).
- `revert`: Revert something.
- `update` or `upgrade`: Update dependencies or pods or other related things.
- `refactor`: A code change that keeps functionality mostly the same.
- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- `uxui`: changes that affect how something looks or how the user experiences it.
- `cleanup`: When the main change is removing code, old or unused.
- `other`: catch-all, and once we have had a bunch of those, we can possibly make a new category.

We have the [peril check] checking this.


[conventional commits]: https://www.conventionalcommits.org/en/v1.0.0/#specification
[peril check]: https://github.com/artsy/peril-settings/blob/fcad894359533dbc777ea17ee536bd9e7d44a756/org/allPRs.ts#L225

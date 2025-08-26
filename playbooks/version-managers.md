---
title: Version managers
description: What we use to manager tool versions.
---


## mise by default

We use [mise] to manage our tool versions. mise can handle most languages via plugins; here are some:
- [nodejs](https://mise.jdx.dev/lang/node.html)
- [ruby](https://mise.jdx.dev/lang/ruby.html)
- [python](https://mise.jdx.dev/lang/python.html)
- [java](https://mise.jdx.dev/lang/java.html)

It uses other version managers under the hood, but it keeps everything clean and consistent.

When executing `mise install` in a repo, it will automatically fetch the language runtimes defined in `.tool-versions` if not yet installed on your system, making working with it transparent and easy.

## Differences

It uses just one file to set the versions, like [in eigen](https://github.com/artsy/eigen/blob/main/.tool-versions).
We can also use the existing version files like `.nvmrc` and `.ruby-version` to set the versions. mise has a `legacy_version_file` config option that makes it look at these files instead of `.tool-versions`, but keeping the old ones would make it easy for people that don't want to use mise to still get the right versions. (Though we highly encourage standardizing on one manager as it simplifies ones technical stack.)

## Installation

Installation is documented [here](https://mise.jdx.dev/getting-started.html).

## Usage

- First, `brew install mise` and follow post-setup instructions.

Here's some quick help:
- To install the right versions: `mise install`.
- To set a new local version (only for the repo you're in): `mise install node@22`.
- To set a new global version: `mise use -g node@22`.
- To see what versions are available: `mise list`.
- To see what versions are installed: `mise list node`.
- To see what versions are set: `mise current`.


[mise]: https://mise.jdx.dev/

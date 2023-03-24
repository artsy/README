---
title: Version managers
description: What we use to manager tool versions.
---


## asdf by default

We use [asdf] to manage our tool versions. asdf can handle most tools using plugins, here are some:
- [nodejs](https://github.com/asdf-vm/asdf-nodejs)
- [ruby](https://github.com/asdf-vm/asdf-ruby)
- [python](https://github.com/asdf-community/asdf-python)
- [java](https://github.com/halcyon/asdf-java)
- [yarn](https://github.com/twuni/asdf-yarn)

It uses other version managers under the hood, but it keeps everything clean and consistent.

## Differences

It uses just one file to set the versions, like [in eigen](https://github.com/artsy/eigen/blob/main/.tool-versions).
We can also use the existing version files like `.nvmrc` and `.ruby-version` to set the versions. asdf has a `legacy_version_file` config option that makes it look at these files instead of `.tool-versions`, but keeping the old ones would make it easy for people that don't want to use asdf to still get the right versions. (Though asdf is actually the best version manager there is.)

## Installation

Installation is documented [here](https://asdf-vm.com/guide/getting-started.html#_3-install-asdf). Basically `brew install asdf`, and adding `. $(brew --prefix asdf)/libexec/asdf.sh` to your shell's rc file.

## Usage

Here's some quick help:
- To install the right versions: `asdf install`.
- To set a new local version (only for the repo you're in): `asdf set nodejs 12.16.1`.
- To set a new global version: `asdf global nodejs 12.16.1`.
- To see what versions are available: `asdf list-all nodejs`.
- To see what versions are installed: `asdf list nodejs`.
- To see what versions are set: `asdf current`.


[asdf]: https://github.com/asdf-vm/asdf

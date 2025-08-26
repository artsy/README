---
title: Development environments
description: Getting set up to work on new projects
---

# Development environments

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Goals](#goals)
- [Prerequisites](#prerequisites)
- [Project set-up](#project-set-up)
- [Shared configuration](#shared-configuration)
- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Goals

- New working environments are set up quickly, easily, and consistently (ideally with a single command).
- Team- or project-wide configuration changes are rolled out without needing a lot of communication and
  coordination.
- Projects adopting favored technologies leverage common, simple set-up.
- Developers using common tools (mac, bash, homebrew, nvm...) get productive without any special set-up.
- Developers choosing less common tools are still productive, if necessary using the basic set-up as a guide.
- Projects default to configuration values that are appropriate for development (just as they run in "development"
  mode by default).
- Both local and containerized development are supported, with minimal duplication.
- Sensitive values are never committed to repositories, whether open- or closed-source.
- Other things being equal, less configuration, simpler-setup, and fewer dependencies are better than more.

## Prerequisites

Setup tooling is optimized for a default set of tools:

- Mac computers
- `bash` shell
- [Homebrew](https://brew.sh/) for installing and managing supporting services
- Docker for containerization
- [mise](https://mise.jdx.dev/) for managing ruby and nodeJS versions
- [hokusai](hokusai.md) for managing deployed applications
- [VSCode](https://code.visualstudio.com/) for text editing
- [awscli](https://aws.amazon.com/cli/) for AWS operations

Developers who find other tools compelling may need to adapt setup procedures to their choices. For the sake of
simplicity, we avoid making setup tooling heavily conditional on local choices.

The [shared setup script](https://github.com/artsy/potential/blob/main/scripts/setup)🔒 installs these tools, and
individual projects' setups may depend on them.

These choices can and should be improved (by [RFC-style](rfcs.md) pull request), but care should be taken to update
any dependent projects.

## Project set-up

Project's READMEs should clearly document the commands necessary for fresh set-up, ideally just reviewing and
running a `./bin/setup` script (or whatever is idiomatic for that stack). E.g.:

> Review the `bin/setup` script and run it _or the equivalent steps for your environment_.

The script should:

- install dependencies such as data stores
- install necessary language runtimes/versions
- initialize configuration with values that are appropriate for development (ideally none)
- install packages (rubygems, node modules, etc.)
- create and seed databases, if appropriate
- ideally be idempotent (i.e., re-running setup should work to update an existing environment)
- be clearly organized and commented, so it can serve as a guide in incompatible environments

## Shared configuration

By convention, projects load configuration values from both:

- a `.env.shared` file with _sensitive_ and _common_ configuration values
- a `.env` file with any developer-specific overrides (or empty)

These files are excluded from source-control. The setup command initializes them, updating `.env.shared` from a
private S3 location.

Local ruby development depends on the [`foreman`](https://github.com/ddollar/foreman) utility and a `.foreman` file
([e.g.](https://github.com/artsy/horizon/blob/master/.foreman)) to respect these files. Local node.js development
depends on [node-foreman](https://github.com/strongloop/node-foreman) and the `--env` argument
([e.g.](https://github.com/artsy/metaphysics/blob/edad4a5f2215a61bb09719901a4fdfd38cd0afcd/package.json#L19)).

Docker-based development respects these files by listing both in docker's `env_file` property
([e.g.](https://github.com/artsy/horizon/blob/2202391c9622b5ec655bf2c6d0f35ef379d0687f/hokusai/development.yml#L18-L20)).

To _update_ shared configuration values, first ensure that you have the _latest_ version of `.env.shared` from s3:

```sh
aws s3 cp s3://artsy-citadel/<project>/.env.shared ./
```

Then simply modify and re-upload it to its shared location as
`.env.<project>`. E.g.:

```sh
aws s3 cp .env.shared s3://artsy-citadel/<project>/.env.shared
```

If you are _adding_ a new configuration value and need it reflected on remote
environments, check this
[doc](https://github.com/artsy/README/blob/3b82f9d0853e55ec7ebba76d1f50dc5e386ac18d/playbooks/hokusai.md#updating-environment-variables)

## Examples

- [Gravity's `script/setup`](https://github.com/artsy/gravity/blob/master/bin/setup)🔒
- [Metaphysics' `scripts/setup.sh`](https://github.com/artsy/metaphysics/blob/master/scripts/setup.sh)

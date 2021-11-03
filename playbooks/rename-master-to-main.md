---
title: Renaming master branches to main
description: a CLI to manage applications deployed to Kubernetes
---

# Guide on how to rename master branches to 'main'

## Starting with the easier repositories

A list of repositories that are not software services or not connected / automatically hooked with software services and therefor could easily be changing the main branch name to 'main':

- [README](https://github.com/artsy/README) ✅
- [potential](https://github.com/artsy/potential) ✅
- [artsy.github.io](https://github.com/artsy/artsy.github.io) (contacted @pepopowitz)
- [clouds](https://github.com/artsy/clouds) (not sure about any references pointing to master)
- [minotaur](https://github.com/artsy/minotaur) ✅
- [infrastructure](https://github.com/artsy/infrastructure)
- [ops-util](https://github.com/artsy/ops-util)
- [cli](https://github.com/artsy/cli)
- [antigravity](https://github.com/artsy/antigravity)
- [arrow](https://github.com/artsy/arrow)
- [codemods](https://github.com/artsy/codemods)
- [substance](https://github.com/artsy/substance)
- [integrity](https://github.com/artsy/integrity)
- [peril-settings](https://github.com/artsy/peril-settings)
- [renovate-config](https://github.com/artsy/renovate-config)
- [next](https://github.com/artsy/next)
- [docker-images](https://github.com/artsy/docker-images)
- [kubernetes-node-doktor](https://github.com/artsy/kubernetes-node-doktor)
- [homebrew-formulas](https://github.com/artsy/homebrew-formulas)
- [artsy-hokusai-templates](https://github.com/artsy/artsy-hokusai-templates)
- [orbs](https://github.com/artsy/orbs)


A list of artsy gems and libraries that might be loaded into gemfiles with referring to the master branch.

- [watt](https://github.com/artsy/watt)
- [omniauth-artsy](https://github.com/artsy/omniauth-artsy)
- [estella](https://github.com/artsy/estella)
- [crispr](https://github.com/artsy/crispr)
- [money_helper](https://github.com/artsy/money_helper)
- [delta](https://github.com/artsy/delta) ⚠️ _seems more complex though_
- [gravitype](https://github.com/artsy/gravitype)
- [day-schedule-selector](https://github.com/artsy/day-schedule-selector)
- [fresnsel](https://github.com/artsy/fresnel)
- [reaction](https://github.com/artsy/reaction)
- [palette](https://github.com/artsy/palette)
- [cohesion](https://github.com/artsy/cohesion)
- [palette-figma](https://github.com/artsy/palette-figma)
- [artsy-passport](https://github.com/artsy/artsy-passport)
- [stitch](https://github.com/artsy/stitch)
- [lint-changed](https://github.com/artsy/lint-changed)
- [update-repo](https://github.com/artsy/update-repo)
- [passport-local-with-otp](https://github.com/artsy/passport-local-with-otp)

Projects that use hokusai for automated deployments but not mission-critical to the Artsy ecosystem:

- [joule](https://github.com/artsy/joule)
- [team](https://github.com/artsy/team)
- [dev-help-helper-bot](https://github.com/artsy/dev-help-helper-bot)

### Check for open PRs on master

Make sure that after the renaming process the PRs are still open and now pointing to main. 
### Renaming the Remote master Branch

Make sure you are on your local master branch and also pulled the latest changes.

Because on Github you probably configured the `master` branch as the default branch. To configure the main branch as default, go to the settings/branches and change the default branch to main.

![screen shot branch settings](https://user-images.githubusercontent.com/15628617/120303879-8d535680-c2cf-11eb-890c-a2ef4ac665ae.png)

Now every team member needs to update their local default branch. This is what you can see on GitHub once the master branch is renamed. You can copy the commands from the section [Team Duties after rename](#team-duties-after-rename) below. There are two options listed, a complicated and an easier way 😄.
![update local default branch](https://user-images.githubusercontent.com/15628617/120304648-431ea500-c2d0-11eb-82e7-a1431de19b93.png)

### Team Duties after rename
The complicated way:

```bash
# Switch to the "master" branch:
$ git checkout master

# Rename it to "main":
$ git branch -m master main

# Get the latest commits (and branches!) from the remote:
$ git fetch origin

# Create a new tracking connection with the new "origin/main" branch:
$ git branch -u origin/main main

# Reset the remote head to main:
$ git remote set-head origin -a
```

The easy way:
```bash
# fetch main
$ git fetch origin main

# get the remote main branch and check it out locally
$ git checkout main

# delete local master branch
$ git branch -D master
```
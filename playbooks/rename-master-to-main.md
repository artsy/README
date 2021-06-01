# Guide on how to rename master branches to 'main'

## Starting with the easier repositories

A list of repositories that are not software services or not connected / automatically hooked with software services and therefor could easily be changing the main branch name to 'main':

- [README](https://github.com/artsy/README)
- [potential](https://github.com/artsy/potential)
- [arts.github.io](https://github.com/artsy/artsy.github.io)
- [clouds](https://github.com/artsy/clouds)
- [minotaur](https://github.com/artsy/minotaur)
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

### Renaming the Local master Branch to main

Make sure you are on your local master branch and also pulled the latest changes.
The first step is to rename the "master" branch in your local Git repositories:

```bash
git branch -m master main
```
Check with `git status` if it worked.

### Renaming the Remote master Branch
Check out your local `main` branch with `git checkout main` and then push your branch to the remote repository with
```bash
git push -u origin main
```
Before deleting the remote master branch, you want to go and check for open PRs. Are they all comparing to master? If so, they will automatically be closed once you delete master. But this is no problem, since the working branches are all still there and the history with the closed PRs as well and you can just open new PRs comparing to main for them. Do that manually as you would for a new PR anyway. You can also do this after deleting the remote master branch.

Now remove the old master branch remotely with
```bash
git push origin --delete master
```
Now there could be the following error message coming up:
```bash
To https://github.com/gittower/git-crashcourse.git
! [remote rejected]   master (refusing to delete the current branch: refs/heads/master)
error: failed to push some refs to 'https://example@github.com/gittower/git-crashcourse.git'
```
Because on Github you probably configured the `master` branch as the default branch. To configure the main branch as default, go to the settings/branches and change the default branch to main. Then try deleting master again with the command given above and it should work.

### Team Duties after that
The complicated way:

```bash
# Switch to the "master" branch:
$ git checkout master

# Rename it to "main":
$ git branch -m master main

# Get the latest commits (and branches!) from the remote:
$ git fetch

# Remove the existing tracking connection with "origin/master":
$ git branch --unset-upstream

# Create a new tracking connection with the new "origin/main" branch:
$ git branch -u origin/main
```
The easy way:
```bash
# get the remote main branch and check it out locally
$ git checkout main

# delete local master branch
$ git branch -D master
```

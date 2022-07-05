## Proposal

Use [codepush](https://microsoft.github.io/code-push/) ([github](https://github.com/microsoft/react-native-code-push)) for QA-ing PRs before they are merged, even by non-engineers.

In the future, we will evaluate if we want to use codepush for faster, leaner releases and hotfixes, more often, and closer to `main`.

## Reasoning

Codepush can be very beneficial to us.

It can allow us to test/QA PRs before they are merged, and by non-engineers too.

Until now, reviewers of a PR can try to run the app on their machine, but this doesn't happen often, as it is a hassle. Also, before merging, is it next to impossible for designers and PMs and anyone else non-engineer to test the PR, since they would have to set up their machine for that.

As a result, we end up merging first, and then QA-ing by building a beta. The beta then can be used by non-engineers to try out the changes, and often we need to make another PR to address some issues big or small.

Why not avoid all that, and allow ourselves and everyone else at artsy with the beta app, to try out changes on a PR, without the need to merge first and build a new beta?

## PR list

Codepush allows for multiple "deployments", as they call them. Imagine each deployment is like a git branch, and each update is like a commit on that branch. So if your app on your device is on deployment `cool-deploy`, then your app will update every time there is an update on the `cool-deploy` deployment.

Deployments are cheap to make and easy to delete. So the idea here is this:

- For each PR, we make a deploy. For PR #123 for example, we make a deployment called `PR-123`. This happens on CI.
- On our app, in the admin menu, we will have a new list showing, with all the open PRs, their number and title. Each of those will be tappable.
- Once you tap on one, the app will change to the deployment of the tapped PR.
- Once this happens, we will force the app to make a check for the newest bundle on the deployment, and get it, and start using it.
- Behold, at this point we are using code from a PR, that is not merged yet, and we can run manual tests and do QA on it.

Even more importantly, now anyone with the beta app can do this! No need to try to compile the app so you can test something. Designers can immediately run a PR and see the progress. Same for PMs. Same for any engineer that doesn't run eigen often, and doesn't want to spend half an hour setting up and building. Same for the engineers that have eigen ready to goon their machine, because it's still easier to just shake the app, tap 3 times, and have the newest js bundle of a PR, rather than stash, change branches, wait for js to build locally etc.

## How is this RFC resolved?

- [ ] I make a tech plan (that I have started) for how we set up the PR list.
- [ ] Get the tech plan approved, and further work continues from there.
- [ ] Implement PR list.
- [ ] After some months of PR list usage, we can evaluate again what we think of it, and if we want to try and use it for hotfixes/releases.

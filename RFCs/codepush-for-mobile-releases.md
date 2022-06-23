## Proposal

Use [codepush](https://microsoft.github.io/code-push/) ([github](https://github.com/microsoft/react-native-code-push)) for
- QA-ing PRs before they are merged, even by non-engineers, and
- doing faster, leaner releases, more often, and closer to `main`.

## Reasoning

Codepush can be very beneficial to us in two ways.

- Allow us to test/QA PRs before they are merged, and by non-engineers too.

Until now, reviewers of a PR can try to run the app on their machine, but this doesn't happen often, as it is a hassle. Also, before merging, is it next to impossible for designers and PMs and anyone else non-engineer to test the PR, since they would have to set up their machine for that.

As a result, we end up merging first, and then QA-ing by building a beta. The beta then can be used by non-engineers to try out the changes, and often we need to make another PR to address some issues big or small.

Why not avoid all that, and allow ourselves and everyone else at artsy with the beta app, to try out changes on a PR, without the need to merge first and build a new beta?

- Allow us to do faster releases, more often, and closer to `main`.

They way `force` does releases is a thing to admire. `eigen` is always a bit slow with releases, and for a reason. And that reason is because it's slow to do releases. You see the issue here?

From the second we decide to do a release (after we have QA-ed and everything), a couple of days at least need to pass, for the appstore review. That causes us to be extra careful, because if a bug causes a huge issue, the only way to fix this is by fixing and then waiting two more days, and email Apple to speed this process up. It causes us to be more afraid to break things, because they would remain broken for a long time.

If we have a way to do hotfixes or even regular feature releases and changes in a matter of seconds or minutes, then it is much much easier to move faster. If something breaks, the fix will be delivered in a few minutes to every user. If we forgot to add something, toggle a flag, change a color, whatever, it can happen in a few minutes.

Why not give us this superpower, that web has had for a long time?

## Additional Context

The way codepush works is that it takes the js part of the app, that normally is just packaged with the app when we ship it to the appstores, and can replace it with a newer one.

The app will still ship to the appstores with a js bundle packaged within it. On appstart (or at a later time, we have control over this), the app will look at a certain url for a newer js bundle. If there is no newer bundle, it will continue using the packaged bundle. If there is a newer bundle, it will download it and use it (again, we have control over this. We could, say, download it, and use it on the next appstart, to avoid any strange user experience).

This is a neat way to bypass the review on the appstores. Hotfixes benefit from this, as we saw above. But not only that, imagine having a complete deploy process, for eigen that is very similar to force! We could, in the future, aim to go towards that.

Regarding the bypassing of review, there is no issue there. [According to the rules](https://github.com/microsoft/react-native-code-push#store-guideline-compliance) of Apple and Google, if the app doesn't change its purpose, then there is no problem. Our app will still be the app we are building. We would only have issues if we turn our app into a gambling app, or a game, or a car rental app, which I'm guessing and hoping we won't. And even if we do, we can do that with a native update first, get it reviewed, and then we can keep using codepush again!

Now, on to the main part of this rfc. Here is how I want this to work (more info on the tech plan).

### for PRs

Codepush allows for multiple "deployments", as they call them. Imagine each deployment is like a git branch, and each update is like a commit on that branch. So if your app on your device is on deployment `cool-deploy`, then your app will update every time there is an update on the `cool-deploy` deployment.

Deployments are cheap to make and easy to delete. So the idea here is this:

- For each PR, we make a deploy. For PR #123 for example, we make a deployment called `PR-123`. This happens on CI.
- On our app, in the admin menu, we will have a new list showing, with all the open PRs, their number and title. Each of those will be tappable.
- Once you tap on one, the app will change to the deployment of the tapped PR.
- Once this happens, we will force the app to make a check for the newest bundle on the deployment, and get it, and start using it.
- Behold, at this point we are using code from a PR, that is not merged yet, and we can run manual tests and do QA on it.

Even more importantly, now anyone with the beta app can do this! No need to try to compile the app so you can test something. Designers can immediately run a PR and see the progress. Same for PMs. Same for any engineer that doesn't run eigen often, and doesn't want to spend half an hour setting up and building. Same for the engineers that have eigen ready to goon their machine, because it's still easier to just shake the app, tap 3 times, and have the newest js bundle of a PR, rather than stash, change branches, wait for js to build locally etc.


### for releases

Any release that includes changes on native code or anything related, like fonts or plist files etc, will still go through the regular appstores process. This is the only way to get these updates to the users' devices, using native updates.

Any release that includes only js/ts file updates, even npm packages (if they don't include native code), they can do either through the regular appstores release process, or codepush. My proposal here would be to have codepush as the default, and only fallback to appstores release process every few releases, or if we have an important change that Apple or Google cares to see. We can keep our cadence as is for now, and re-evaluate later, as we have all the processes in place. But if we want to be very conservative, I would say we can go for a "1 native, 1 codepush" release schedule, unless there are changes that require a native one of course.

Some examples:

- Most of the PRs in the last year have been js/ts changes only, like my collection, or upgrades to moment/luxon or relay. The release that would include only these, would be a codepush update to the `release` deployment.
- Changes like the new fonts, or upgrading reanimated, would become a native release, so they would go through the appstores process. That is the only way.
- Changes like the "delete account" button, that Apple cares about having in time, could become a codepush release, but I would still make it a native one, so that they review and we can check that box for them. (Without trying to complicate things here, we could do both. We could ship that feature with codepush to the users, and then also have a native release for Apple to review. If that feels confusing, please ignore, and just know that it is possible to overlap as we please.)

## Exceptions

Using codepush will not work native code changes, PR or release. In these cases, nothing changes. We do things as we did. Appstore review for release, and merge-before-QA for PRs.

## How is this RFC resolved?

- [ ] I made a tech plan (that I have started) for how we set up the PR list and the releases.
- [ ] Get the tech plan approved, and further work continues from there.

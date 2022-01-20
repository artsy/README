---
title: Open-sourcing a project
description: How to take a private repo and make it open-source
---

# Open-sourcing a project

While we strive for [Open Source by Default](/culture/engineering-principles.md#open-source-by-default), sometimes
apps start as private repos and only get later open-sourced. This can happen for any number of reasons, such as
responding to a [nudge](https://github.com/artsy/peril-settings/blob/master/tasks/closedSourceRationaleCheck.ts)
from Peril.

Here is a list of things to consider in this situation.

## Audit your project for secrets

Typically our apps conform to the twelve-factor philosophy of keeping secrets and other configuration options out
of the codebase and [storing them in the runtime environment](https://12factor.net/config) instead.

But it is still worth auditing the repo to ensure no secrets have been checked in.

#### Manual search

- [ ] Use Github to search for telltale strings such as `key`, `token`, `secret`, `password`, `credential`
- [ ] On the results page, check both:
  - [ ] the **Code** tab, to view results from the current state of the repo
  - [ ] the **Commits** tab, to view historical commits that might contain secrets that would become newly visible
        to the public

#### Automated scan

As an extra precaution, scan the repo for secrets using the following tools:

- [ ] [detect-secrets](https://github.com/Yelp/detect-secrets). It scans a codebase for known secret patterns such as AWS keys, as well as "high entropy strings" that are typical of keys and tokens in general. Please note that it does NOT scan commit history.
  - [ ] Perform an initial scan and audit any found secrets
  - [ ] Consider adding a git hook to prevent committing secrets in the future

- [ ] [trufflehog](https://github.com/trufflesecurity/truffleHog). Similar to `detect-secrets`, but it scans both code and commit history.

## Review other repository areas for sensitive content

It is possible that the repo's issue backlog, or wiki, or "projects" (the kanban style boards that GH repos can
contain) might contain discussion of sensitive matters, so it is a good idea to review all of these as well.

- [ ] Review open _and_ closed issues
- [ ] Review "projects"
- [ ] Review wiki content

For some older/larger projects, this may be an unduly onerous chore, so we do have the option of a
[fresh start](#when-in-doubt-start-fresh) as well.

## Modify CI settings

We have two ways of accepting contributions on our projects:

1.  PRs are contributed via branches on the main Artsy repo, versus…
2.  PRs are contributed via branches on _forked_ repos

For apps that need to have secrets at build time (such as deploy keys, or GitHub tokens for private Ruby gems,
etc), option #2 represents a security risk, as any user can submit a pull request and potentially have your
project's secrets injected into their modified version of your app.

To ensure safety on CI you should review the following settings under Project Settings > Build Settings > Advanced
Settings:

- [ ] **Pass secrets to builds from forked pull requests** should _definitely_ be set to **Off**
- [ ] **Build forked pull requests** should be _probably_ set to **Off** (if it is not possible to build a project
      at all without the injected secrets)

If both of these are set to off, that implies that new contributions will have to come from branches on the main
Artsy repo, so you might also need to

- [ ] Update the project's README to describe the new required contribution style
- [ ] Add the project to the
      [list of repos](https://github.com/artsy/peril-settings/blob/master/org/ossPRsForbidForks.ts) for which Peril
      will enforce this check

## Update the license

Now that the project is open, it's a good idea to have an appropriate license in the repo as well. We typically use
the MIT license, which strikes a balance between permissiveness and commercialization.

- [ ] [Add](https://help.github.com/en/articles/adding-a-license-to-a-repository) an MIT license to the project

## Spread the word

- [ ] Consider adding a post to https://github.com/artsy/artsy.github.io

Now that your project is public, you might want to write a blog post to document it, for the community as well as
for future Artsy developers.

Some previous examples:

- [How we Open Source'd Eigen](https://artsy.github.io/blog/2015/04/28/how-we-open-sourced-eigen/) — Eigen
- [Open Sourcing Energy](https://artsy.github.io/blog/2015/08/06/open-sourcing-energy/) - Energy
- [On our implementation of React Native](https://artsy.github.io/blog/2016/08/24/On-Emission/) — Emission
- [Modernizing Force](https://artsy.github.io/blog/2017/09/05/Modernizing-Force/) — Stitch / express-reloadable
- [Rosalind and The Art Genome Project](https://artsy.github.io/blog/2019/05/09/rosalind/) — Rosalind

## When in doubt, start fresh

If it cannot be determined with confidence that a repo passes all of the above checks, and if it is still deemed
necessary to open the project, it is not unreasonable to start a new repository with a new history.

This is what happened with Force in 2016, and the
[process is described on the blog](https://artsy.github.io/blog/2016/09/06/Milestone-on-OSS-by-Default/).

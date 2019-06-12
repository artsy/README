---
title: Open-sourcing a project
description: How to take a private repo and make it open-source
---

# Open-sourcing a project

While we strive for [Open Source by Default](/culture/engineering-principles.md#open-source-by-default), it will
sometimes be the case that you need to take an existing private app and make it open source.

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

As an extra precaution, check the current state of your repo with a tool such as
https://github.com/Yelp/detect-secrets. This is a straightforward utility which scans a codebase for known secret
patterns such as AWS keys, as well as "high entropy strings" that are typical of keys and tokens in general.

- [ ] Use a tool such as detect-secrets to:
  - [ ] Perform an initial scan and audit any found secrets
  - [ ] Consider adding a git hook to prevent committing secrets in the future

## Review other repository areas for sensitive content

It is possible that the repo's issue backlog, or wiki, or "projects" (the kanban style boards that GH repos can
contain) might contain discussion of sensitive matters, so it is a good idea to review all of these as well.

- [ ] Review open _and_ closed issues
- [ ] Review "projects"
- [ ] Review wiki content

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

## Spread the word

- [ ] Consider adding a post to https://github.com/artsy/artsy.github.io

Now that your project is public, you might want to write a blog post to document it, for the community as well as
for future Artsy developers.

Some previous examples:

- [On our implementation of React Native](https://artsy.github.io/blog/2016/08/24/On-Emission/) — Emission
- [Modernizing Force](https://artsy.github.io/blog/2017/09/05/Modernizing-Force/) — Stitch / express-reloadable
- [Apogee: Doing More with Less](https://artsy.github.io/blog/2018/02/02/artsy-apogee/) — Apogee
- [Rosalind and The Art Genome Project](https://artsy.github.io/blog/2019/05/09/rosalind/) — Rosalind

## When in doubt, start fresh

If it cannot be determined with confidence that a repo passes all of the above checks, and if it is still deemed
necessary to open the project, it is not unreasonable to start a new repository with a new history.

This is what happened with Force in 2016, and the
[process is described on the blog](https://artsy.github.io/blog/2016/09/06/Milestone-on-OSS-by-Default/)

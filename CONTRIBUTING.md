# Contributing to Artsy README

This project is work of [many contributors](https://github.com/artsy/README/graphs/contributors).

If you work at [Artsy](https://www.artsy.net), you're encouraged to submit
[pull requests](https://github.com/artsy/README/pulls), [propose and discuss
issues](https://github.com/artsy/README/issues).

If you don't work at Artsy, we would love for you to [ask us a question or highlight
an issue](https://github.com/artsy/README/issues) in our processes, check out
[our Engineering blog](https://artsy.github.io) or [maybe even consider working with
us](https://www.artsy.net/jobs) :)

## Editing README

You can edit files via the GitHub interface if you're just trying to quickly make a change. If you want to make a
change that is a bit more nuanced, you can clone the repo and set it up with:

```sh
git clone https://github.com/artsy/README.git
cd README
yarn install

code .
```

## Helpful Automation

This repo has some useful automation set up for it to generate tables of contents. This is implemented in
[`scripts/create-readmes.ts`](scripts/create-readmes.ts), which handles:

- Creating a summary `README.md` for each section of docs
- Providing an overview of the section in the root `README.md`
- Enables running [doctoc](https://github.com/thlorenz/doctoc#readme) on any file with `<!-- START doctoc`

This script runs on every commit, so we'll always ensure all the table of contents are up-to-date.

Each markdown file in a section uses [yaml front-matter](https://jekyllrb.com/docs/frontmatter/) to add a
description and title to the document, which are used to generate a `README.md` for each section.

Each section has a `summary.json` which describes the section for the root `README.md`.

Adding a new folder, or markdown file into a section will generate `[TODO]` items which will appear as comments in
a pull request when you `git push` or on CI. This is implemented using [Danger](https://danger.systems) in
[`dangerfile.ts`](/dangerfile.ts).

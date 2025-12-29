# Contributing to Artsy README

This project is work of [many contributors](https://github.com/artsy/README/graphs/contributors).

If you work at [Artsy](https://www.artsy.net), you're encouraged to
[submit pull requests](https://github.com/artsy/README/pulls),
[propose and discuss issues](https://github.com/artsy/README/issues).

If you don't work at Artsy, we would love for you to
[ask us a question or highlight an issue](https://github.com/artsy/README/issues) in our processes, check out
[our Engineering blog](https://artsy.github.io) or maybe even consider
[working with us](https://www.artsy.net/jobs). :)

## Getting Started

Clone the repo and set it up with:

```sh
git clone https://github.com/artsy/README.git
cd README
yarn install
```

## Helpful Automation

This repo has automation that:

- Automatically generates table of contents for markdown files
- Creates summary `README.md` files for each documentation section
- Tracks missing documentation with `[TODO]` items in pull request comments

This automation runs on every commit to keep documentation organized and up-to-date.

### How Automation Works

The automation is implemented in [`scripts/create-readmes.ts`](scripts/create-readmes.ts), which:

- Creates a summary `README.md` for each section of docs
- Provides an overview of the section in the root `README.md`
- Enables running [doctoc](https://github.com/thlorenz/doctoc#readme) on any file with `<!-- START doctoc`

Each markdown file in a section uses [yaml front-matter](https://jekyllrb.com/docs/frontmatter/) to add a
description and title to the document, which are used to generate a `README.md` for each section.

Each section has a `summary.json` which describes the section for the root `README.md`.

Adding a new folder, or markdown file into a section will generate `[TODO]` items which will appear as comments in
a pull request when you `git push` or on CI. This is implemented using [Danger](https://danger.systems) in
[`dangerfile.ts`](/dangerfile.ts).

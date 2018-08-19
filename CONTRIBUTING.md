### Working in this repo

You can happily edit files via the GitHub interface if you're just trying to quickly make a change. If you want to
make a change that is a bit more nuanced, you can clone the repo and set it up with:

```sh
git clone https://github.com/artsy/README.git
cd README
yarn install

code .
```

### How this repo works

This repo has some useful automation set up for it. This mostly happens in the script
[`scripts/create-readmes.ts`](scripts/create-readmes.ts). It handles:

- Creating a summary README for each section of docs
- Provide an overview of the section in the root README
- Supports running [doctoc](https://github.com/thlorenz/doctoc#readme) on any file with `<!-- START doctoc`

This runs on every commit, so we'll always ensure all the table of contents are up-to-date.

Each markdown file in a section should use [yaml front-matter](https://jekyllrb.com/docs/frontmatter/) to add a
description and title to your document, these are used in generating the README.md for each section.

Each section has a `summary.json` which describes the section for the root README.

Adding a new folder, or markdown file into a section will generate `[TODO]` items which Danger will pick up when
you `git push` or on CI later.

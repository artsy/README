---
title: Documentation
description: How and where to document or share content
---

# Documentation

As engineers we operate in many parallel forums: Github, Jira, Slack, Google docs, e-mail, Notion, and so on. What
content should go where?

## Documentation or discussion of a specific system

When documentation relates to a particular system, leverage in-repository `README`s or `doc/`s wherever possible.
This includes when the consumers may not exclusively be engineers.

E.g.:

- How to set-up a local development environment
- Definitions of domain models
- API documentation

Other repo-specific interactions such as presenting the rationale for a design or offering code-review should
leverage the built-in mechanisms of [commit messages](/playbooks/engineer-workflow.md#commits),
[pull requests](/playbooks/engineer-workflow.md#pull-requests), and comments.

### READMEs

Project README files should provide enough context to understand and contribute to a project including:

- High-level description of the project's use, as well as metadata including:
- Development stage (development, beta, production, deprecated, retired...)
- Links to hosting environment(s)
- Links to GitHub repo(s)
- Continuous integration and branching information
- Deployment instructions
- Who to contact for guidance
- Any other relevant links
- Instructions for setting up, testing, and contributing to the project
- License (probably [MIT](https://opensource.org/licenses/MIT)) and copyright, if open source

See a [recent example](https://github.com/artsy/impulse#impulse-) 🔒 as a template.

## Public versus private content

When creating a repo, contributing a doc, or discussing in-progress work, consider whether it's appropriate for
this content to be public or private.

Content that should always be private:

- Contact or role details for individuals
- Information about candidates or new hires before they've joined or consented to announce their move
- Production data or logs (including indirectly through migration output, etc.)
- Repositories representing substantial business value, novelty, or criticality (such as the main API, content
  management system, or auction operator tools)
- Security or compliance topics, including pending security work items or vulnerability-handling procedures

Content that _maybe_ should be private, depending on its sensitivity:

- Incident/support instructions, including data recovery or incident-mitigation procedures
- Internal business rules, definitions, or implementations (tiering, targeting, buyer/bidder qualification, spam
  heuristics, search ranking algorithms, data partnerships...)
- Un-announced feature work
- User research or industry analysis that may hold competitive value
- References to private content (according to the criteria above) including documentation of private systems, links
  to private gists that may include private data or logs, etc.

## Engineering content _not_ specific to repos

This public [artsy/README](https://github.com/artsy/readme) repo is our default location for general engineering
content such as:

- onboarding resources
- team procedures and playbooks
- other public resources that are not repo-specific

The private [artsy/potential](https://github.com/artsy/potential) repo supplements artsy/README with resources such
as:

- documentation and diagrams of internal architecture
- security bounty program procedures
- playbooks for handling common on-call incidents (see [the wiki](https://github.com/artsy/potential/wiki))
- any other content that should be private according to the criteria above

## Engineering blog

Finally, don't forget about [artsy.github.io](https://artsy.github.io), the engineering blog. Blog posts can be
great resources both externally _and_ internally when you've released a new library, solved a technical challenge,
refined tooling, or just learned a lesson that might be of interest to other teams like ours.

## Resources

- [engineer-workflow.md](/playbooks/engineer-workflow.md)
- [issues/2](https://github.com/artsy/README/issues/2) about public vs. private content
- [artsy/README](https://github.com/artsy/readme)
- [artsy/potential](https://github.com/artsy/potential)
- [artsy.github.io](https://artsy.github.io)

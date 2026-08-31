---
title: RFC
description: Track where 1Password secrets/tokens are used
---

## Proposal

Every 1Password item for a shared secret/token should include two fields: "Used in" (every place the secret is
consumed) and "Source" (where it's generated/managed and which account owns it), plus a short checklist for
rotating it. Full draft with examples: [1Password Secret & Token Hygiene](https://app.notion.com/p/3c9cab0764a08166893bc14fcbd67527)

## Reasoning

When we need to rotate a secret stored in 1Password, it's often unclear where else that secret is set — CI env
vars, S3 config, GitHub Actions secrets, etc. Missing a consumer during rotation doesn't fail loudly; that system
just keeps using the old value until something downstream breaks, often much later and hard to trace back to the
rotation. Separately, items are often named only by what they are (`Eigen github pat`) with no record of which
account they're managed under or a link to the actual settings page, so rotation starts with hunting for where the
secret even lives. "Used in" and "Source" turn rotation into a checklist instead of a guessing game on both ends.

## Exceptions

- Sharing one secret's value across multiple unrelated systems is still allowed — this RFC recommends, but doesn't
  require, splitting into separate tokens per consuming system. Documenting it in "Used in" is what's required.
- Using 1Password's "Secret Note" item type (over Login/Password) for new or migrated items is a recommendation,
  not a requirement.
- No retroactive cleanup of existing 1Password items is required; this applies going forward and whenever an item
  is touched for rotation.
- No tooling/automation enforces this today — it's a documented convention, not a lint rule.

## Additional Context

Came out of discussions in [this](https://artsy.slack.com/archives/C02TD2JKX32/p1782934485507639?thread_ts=1782914187.669409&cid=C02TD2JKX32) and [this](https://artsy.slack.com/archives/C02BC3HEJ/p1787859507101909?thread_ts=1787839490.944139&cid=C02BC3HEJ) Slack threads about difficulty tracing secret usage during rotation.

## How is this RFC resolved?

If accepted:
- Move the [draft Notion page](https://app.notion.com/p/3c9cab0764a08166893bc14fcbd67527) from Drafts into
  Common Tasks in Engineering Playbooks.
- Announce the convention in the next dev standup.

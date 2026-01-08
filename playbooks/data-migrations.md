---
title: Data Migrations
description: Preparing, reviewing and executing data migrations
---

### Migrations

We want to move quickly, so it's in our interest to get good at aggressive change, including data migrations.

- Leverage the framework's first-class support for migrations when available (e.g., Rails). Committing the change
  ensures the code is reviewed, the migration is applied automatically, and the history continues to be
  well-understood.
- When first-class migration support isn't available, the migration should still be documented and code-reviewed in
  the form of PR or issue comments.
- We traditionally call out PRs needing manual migrations with `#migration` in the PR title.
- Make sure to specify what migration steps should be executed pre-deploy and/or post-deploy. Other developers
  should be able to shepherd the deploy and any migration in your absence.
- Just as with code changes, develop locally and apply the migration to staging before production.
- Before applying a migration to production, back up the impacted data. See
  [Database Backups, Syncs & Restores](https://www.notion.so/artsy/Database-Backups-Syncs-Restores-72cf166aa14a450a81ffa130ba56e34b) :lock:
  to learn more about related operations and where to backup to.
- If systems will be in a temporarily broken state prior to the migration being applied, consider how to break the
  change into more graceful deploy steps (e.g., supporting old and new fields concurrently as an intermediate
  step).
- Once any pending migration is applied in staging or production, comment on the corresponding PR/issue so the
  status is clear to others.

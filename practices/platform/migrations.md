---
title: Techniques for Handling Migrations
description: Tips for dealing with migration strategies with databases
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
- Before applying a migration to production, back up the impacted data. In gravity, back-ups to the `artsy-data` S3
  bucket are as simple as `rake db:production:backup:to_s3[collection_names]`
  ([docs](https://github.com/artsy/gravity/blob/master/doc/ProductionBackups.md#backing-up-a-single-collection)).
- If systems will be in a temporarily broken state prior to the migration being applied, consider how to break the
  change into more graceful deploy steps (e.g., supporting old and new fields concurrently as an intermediate
  step).
- Once any pending migration is applied in staging or production, comment on the corresponding PR/issue so the
  status is clear to others.

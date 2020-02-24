---
title: Migrating Sidekiq
description: How to migrate Sidekiq to a new Redis instance
---

# Migrating Sidekiq

We publish a [Docker image](https://hub.docker.com/r/artsy/sidekiq-migrate) `artsy/sidekiq-migrate` that can be
used to migrate Sidekiq jobs from one Redis database (on the same or different instance) - source code can be found
in our [docker-images repo](https://github.com/artsy/docker-images/tree/master/sidekiq-migrate)

## Migrate an application

1. Check the old Redis URL

```
hokusai [staging|production] get REDIS_URL
```

This will be supplied to the migration container via `$SIDEKIQ_OLD_REDIS_URL`

2. Update to the new Redis Url

```
hokusai [staging|production] env set "REDIS_URL=$SIDEKIQ_NEW_REDIS_URL"
```

3. Refresh the application

```
hokusai [staging|production] refresh
```

At this point, you should see a squeaky clean Sidekiq dashboard at your application's Sidekiq admin URL.

4. Migrate Sidekiq jobs and stats from the old Redis instance - plug in the old and new Redis URLs to
   `$SIDEKIQ_OLD_REDIS_URL` and `$SIDEKIQ_NEW_REDIS_URL`

4a) Run `docker pull artsy/sidekiq-migrate:latest` to pull the `artsy/sidekiq-migrate:latest` image to your local
Docker image cache, busting the cache if you happen to have an older version. Note: this step will become obsolte
[in Docker version 19.09](https://github.com/moby/moby/issues/13331#issuecomment-493531462) with the
[addition](https://github.com/docker/cli/pull/1498) of the `--pull` flag to `docker run`

4b) Connect to the staging or production VPN and
[ensure your local Docker is configured to use the VPN interface](https://www.notion.so/artsy/VPN-Configuration-60798c292185407687356997bf251d8c).

4c) Run
`docker run -ti --env "SIDEKIQ_OLD_REDIS_URL=$SIDEKIQ_OLD_REDIS_URL" --env "SIDEKIQ_NEW_REDIS_URL=$SIDEKIQ_NEW_REDIS_URL" artsy/sidekiq-migrate:latest`

See https://github.com/artsy/docker-images/tree/master/sidekiq-migrate for further options / enviornment variables
to enable debug logging, perform a dry run, or clean up the source redis database's Sidekiq-specific keys.

Refresh the Sidekiq dashboard at and confirm everything is migrated.

5. Update your app's Redis database assignments in our
   [staging](https://github.com/artsy/infrastructure/blob/master/terraform/staging/redis-database-assignments.tf)
   and
   [production](https://github.com/artsy/infrastructure/blob/master/terraform/production/redis-database-assignments.tf)
   Terrform config so we can track and reference it in our "shared-redis-db-assignments" Kubernetes ConfigMap

---
title: Migrating Redis
description: How to migrate data between Redis instances.
---

# Migrating Redis

We publish a [Docker image](https://hub.docker.com/r/artsy/redis-migrate) `artsy/redis-migrate` that can be used to
migrate all keys in a redis database (on the same or different instance) to another - source code can be found in
our [docker-images repo](https://github.com/artsy/docker-images/tree/master/redis-migrate)

Unfortunately AWS' managed Redis deployments on Elasticache do not allow us to use Redis' built-in
[MIGRATE](https://redis.io/commands/migrate) command, which would have made this a lot easier. Essentially this
script attempts to implement this command, but without deleting the key in the source database.

> The command internally uses DUMP to generate the serialized version of the key value, and RESTORE in order to
> synthesize the key in the target instance. The source instance acts as a client for the target instance. If the
> target instance returns OK to the RESTORE command, the source instance deletes the key using DEL.

## Migrate an application

Note: this migration process does not ensure data consistency if your app is activaly using Redis. If you want to
ensure data consistency, make sure to shut down your app or disable Redis writes in between steps 1 & 2, and
re-enable it after step 3.

1. Check the old Redis URL

```
hokusai [staging|production] get REDIS_URL
```

This will be supplied to the migration container via `$SOURCE_REDIS_URL`

2. Migrate all keys from the old Redis database to the new - plug in the old and new Redis URLs to
   `$SOURCE_REDIS_URL` and `$DESTINATION_REDIS_URL`

4a) Run `docker pull artsy/redis-migrate:latest` to pull the `artsy/redis-migrate:latest` image to your local
Docker image cache, busting the cache if you happen to have an older version. Note: this step will become obsolte
[in Docker version 19.09](https://github.com/moby/moby/issues/13331#issuecomment-493531462) with the
[addition](https://github.com/docker/cli/pull/1498) of the `--pull` flag to `docker run`

4b) Connect to the staging or production VPN and
[ensure your local Docker is configured to use the VPN interface](https://www.notion.so/artsy/VPN-Configuration-60798c292185407687356997bf251d8c).

4c) Run `docker run -ti artsy/redis-migrate:latest $SOURCE_REDIS_URL $DESTINATION_REDIS_URL`

See https://github.com/artsy/docker-images/tree/master/redis-migrate for further options / enviornment variables to
enable debug logging, perform a dry run, or clean up the source redis database's keys.

3. Update your app to use the new Redis Url

```
hokusai [staging|production] env set "REDIS_URL=$DESTINATION_REDIS_URL"
```

4. Refresh the application

```
hokusai [staging|production] refresh
```

5. Update your app's Redis database assignments in our
   [staging](https://github.com/artsy/infrastructure/blob/master/terraform/staging/redis-database-assignments.tf)
   and
   [production](https://github.com/artsy/infrastructure/blob/master/terraform/production/redis-database-assignments.tf)
   Terrform config so we can track and reference it in our "shared-redis-db-assignments" Kubernetes ConfigMap

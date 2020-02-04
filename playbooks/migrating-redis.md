# Migrating Redis

We publish a [Docker image](https://hub.docker.com/r/artsy/redis-migrate) `artsy/redis-migrate` that can be used to migrate all keys in a redis database (on the same or different instance) to another - source code can be found in our [docker-images repo](https://github.com/artsy/docker-images/tree/master/redis-migrate)

Unfortunately AWS' managed Redis deployments on Elasticache do not allow us to use Redis' built-in [MIGRATE](https://redis.io/commands/migrate) command, which would have made this a lot easier.  Essentially this script attempts to implement this command, but without deleting the key in the source database.

> The command internally uses DUMP to generate the serialized version of the key value, and RESTORE in order to synthesize the key in the target instance. The source instance acts as a client for the target instance. If the target instance returns OK to the RESTORE command, the source instance deletes the key using DEL.

## Migrate an application

Note: this migration process does not ensure data consistency if your app is activaly using Redis.  If you want to ensure data consistency, make sure to shut down your app or disable Redis writes in between steps 1 & 2, and re-enable it after step 3.

1) Check the old Redis URL

Assuming your app is `$MY_APP`...

```
hokusai [staging|production] get REDIS_URL
```

This will be supplied to the migration container via `$SOURCE_REDIS_URL`

2) Migrate all keys from the old Redis database to the new - plug in your app's name to $MY_APP the old and new Redis URLs to `$SOURCE_REDIS_URL` and `$DESTINATION_REDIS_URL`

```
kubectl --context [staging|production] run redis-migrate-$MY_APP --restart=Never --rm -i --tty --image artsy/redis-migrate --overrides='{"spec": {"containers": [{"tty": true, "stdin": true, "name": "redis-migrate-$MY_APP", "image": "artsy/redis-migrate:latest", "args": ["$SOURCE_REDIS_URL", "$DESTINATION_REDIS_URL"], "stdinOnce": true, "imagePullPolicy": "Always"}], "nodeSelector": {"tier": "background"}}, "apiVersion": "v1"}'
```

See https://github.com/artsy/docker-images/tree/master/redis-migrate for further options / enviornment variables to enable debug logging, perform a dry run, or clean up the source redis database's keys.

3) Update your app to use the new Redis Url

```
hokusai [staging|production] env set "REDIS_URL=$DESTINATION_REDIS_URL"
```

4) Refresh the application

```
hokusai [staging|production] refresh
```

5) Update your app's Redis database assignments in our [staging](https://github.com/artsy/infrastructure/blob/master/terraform/staging/redis-database-assignments.tf) and [production](https://github.com/artsy/infrastructure/blob/master/terraform/production/redis-database-assignments.tf) Terrform config so we can track and reference it in our "shared-redis-db-assignments" Kubernetes ConfigMap

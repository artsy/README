# Migrating Sidekiq

We publish a [Docker image](https://hub.docker.com/r/artsy/sidekiq-migrate) `artsy/sidekiq-migrate` that can be used to migrate Sidekiq jobs from one Redis database (on the same or different instance) - source code can be found in our [docker-images repo](https://github.com/artsy/docker-images/tree/master/sidekiq-migrate)

## Migrate an application

1) Check the old Redis URL

Assuming your app is `$MY_APP`...

```
hokusai [staging|production] get REDIS_URL
```

This will be supplied to the migration container via `$SIDEKIQ_OLD_REDIS_URL`

2) Update to the new Redis Url

```
hokusai [staging|production] env set "REDIS_URL=$SIDEKIQ_NEW_REDIS_URL"
```

3) Refresh the application

```
hokusai [staging|production] refresh
```

At this point, you should see a squeaky clean Sidekiq dashboard at your application's Sidekiq admin URL.

4) Migrate Sidekiq jobs and stats from the old Redis instance - plug in the old and new Redis URLs to `$SIDEKIQ_OLD_REDIS_URL` and `$SIDEKIQ_NEW_REDIS_URL`

```
kubectl --context [staging|production] run sidekiq-migrate-$MY_APP --restart=Never --rm -i --tty --image artsy/sidekiq-migrate --overrides='{"spec": {"containers": [{"tty": true, "stdin": true, "name": "sidekiq-migrate-$MY_APP", "env": [{"name": "SIDEKIQ_OLD_REDIS_URL", "value": "$SIDEKIQ_OLD_REDIS_URL"}, {"name": "SIDEKIQ_NEW_REDIS_URL", "value": "$SIDEKIQ_NEW_REDIS_URL"}, {"name": "MIGRATE_STATS", "value": "true"}, {"name": "ACTUAL_RUN", "value": "true"}], "image": "artsy/sidekiq-migrate:latest", "args": ["/usr/local/bin/ruby", "/migrate.rb"], "stdinOnce": true, "imagePullPolicy": "Always"}], "nodeSelector": {"tier": "background"}}, "apiVersion": "v1"}'
```

Refresh the Sidekiq dashboard at and confirm everything is migrated.

See https://github.com/artsy/docker-images/tree/master/sidekiq-migrate for further options / enviornment variables to enable debug logging, perform a dry run, or clean up the source redis database's Sidekiq-specific keys.

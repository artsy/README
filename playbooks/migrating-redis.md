# Migrating Redis

We publish a [Docker image](https://hub.docker.com/r/artsy/redis-migrate) `artsy/redis-migrate` that can be used to migrate all keys in a redis database (on the same or different instance) to another - source code can be found in our [docker-images repo](https://github.com/artsy/docker-images/tree/master/redis-migrate)

Unfortunately AWS' managed Redis deployments on Elasticache do not allow us to use Redis' built-in [MIGRATE](https://redis.io/commands/migrate) command, which would have made this a lot easier.  Essentially this script attempts to implement this command, but without deleting the key in the source database.

> The command internally uses DUMP to generate the serialized version of the key value, and RESTORE in order to synthesize the key in the target instance. The source instance acts as a client for the target instance. If the target instance returns OK to the RESTORE command, the source instance deletes the key using DEL.

For a quick migration:

1) `docker run artsy/redis-migrate:latest $SOURCE_REDIS $DESTINATION_REDIS`

See https://github.com/artsy/docker-images/blob/master/redis-migrate/README.md for all options

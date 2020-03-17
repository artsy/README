---
title: Migrating Postgres with Rubyrep
description: How to migrate a Postgres to a new instance using Rubyrep
---

# Migrating Postgres with Rubyrep

To set up database replication via [rubyrep](rubyrep.org), do the following:

1) Create the new Postgres database and user

2) Start a shell in the application with the new database connection and load the app schema with:
```
hokusai production run --env "DATABASE_URL=postgres://{new database credentials}" "bundle exec rake db:schema:load"
```

3) Backup and restore the existing database:

To backup, create the following Yaml file as `./hokusai/export-old-production.yml`
```
---
apiVersion: batch/v1
kind: Job
metadata:
  name: { myapp }-data-export
  namespace: default
spec:
  backoffLimit: 0
  completions: 1
  parallelism: 1
  template:
    spec:
      affinity:
        nodeAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - preference:
              matchExpressions:
              - key: tier
                operator: In
                values:
                - background
            weight: 1
      containers:
      - args:
        - sh
        - ./export-db.sh
        - { environment }
        - "-O -Fc -v"
        env:
        - name: APP_NAME
          value: { myapp }
        - name: DATABASE_URL
          value: { old-database-url }
        - name: AWS_ACCESS_KEY_ID
          value: { app aws access key id }
        - name: AWS_SECRET_ACCESS_KEY
          value: { app secret access key }
        image: artsy/pg-data-sync
        imagePullPolicy: Always
        name: { myapp }-data-export
      dnsPolicy: ClusterFirst
      restartPolicy: Never
      terminationGracePeriodSeconds: 30
```

Apply with `hokusai [staging|production] create --filename ./hokusai/export-old-production.yml`

Delete with `hokusai [staging|production] delete --filename ./hokusai/export-old-production.yml`

To restore to the new datanase, create the folling Yaml file as `./hokusai/import-to-new-production.yml`

```
---
apiVersion: batch/v1
kind: Job
metadata:
  name: { myapp }-data-import
  namespace: default
spec:
  backoffLimit: 0
  completions: 1
  parallelism: 1
  template:
    spec:
      affinity:
        nodeAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - preference:
              matchExpressions:
              - key: tier
                operator: In
                values:
                - background
            weight: 1
      containers:
      - args:
        - sh
        - ./import-db.sh
        - { environment }
        - "--clean --no-owner --schema=public -j 5 -v"
        env:
        - name: APP_NAME
          value: { myapp }
        - name: DATABASE_URL
          value: { new-database-url }
        - name: AWS_ACCESS_KEY_ID
          value: { app aws access key id }
        - name: AWS_SECRET_ACCESS_KEY
          value: { app secret access key }
        - name: SWALLOW_ERRORS_ON_RESTORE
          value: "1"
        image: artsy/pg-data-sync
        imagePullPolicy: Always
        name: { myapp }-data-import
      dnsPolicy: ClusterFirst
      restartPolicy: Never
      terminationGracePeriodSeconds: 30

```

Apply with `hokusai [staging|production] create --filename ./hokusai/import-to-new-production.yml`

Once complete, delete with `hokusai [staging|production] delete --filename ./hokusai/import-to-new-production.yml`

4) Check the database schemas.
  3a) If you want to download a dump of the current db to a local postgres, you can check schemas by running `rake db:schema:dump` locally, and checking in the diff in `db/schema.rb`.  You can also inspect the `schema_migrations` tables across the databases and compare to migrations.
  3b) Log into the new database and note all foreign key constraints.  You can get foreign key constraints for each table with `\d+ table` or to see forign key constraints for all tables in the `public` schema, run:
  ```
  SELECT conrelid::regclass AS table_from
       , conname
       , pg_get_constraintdef(oid)
  FROM   pg_constraint
  WHERE  contype IN ('f')
  AND    connamespace = 'public'::regnamespace  -- your schema here
  ORDER  BY conrelid::regclass::text, contype DESC;
  ```

  Example output:
  ```
        table_from     |       conname       |                    pg_get_constraintdef
  --------------------+---------------------+-------------------------------------------------------------
  foo                  | fk_rails_fbc9d01ca0 | FOREIGN KEY (bar_id) REFERENCES bar(id)
  bar                  | fk_rails_80eb82ccbf | FOREIGN KEY (foo_id) REFERENCES foo(id) ON DELETE CASCADE
  ```

  Save the constraints to later re-enable.

5) Disable all foreign key constraints, for example for tables `foo` and `bar` you would run:
```
ALTER TABLE foo DROP CONSTRAINT fk_rails_fbc9d01ca0;
ALTER TABLE bar DROP CONSTRAINT fk_rails_80eb82ccbf;
```

6) Create the file `hokusai/rubyrep-config.yml` (Credentials here are redacted but they should be supplied to Kubernetes and this file should not be checked in!) The "left" configuration refers to the source database and the "right" refers to the target database.  Note that for rails apps we can ignore both `ar_internal_metadata` and `schema_migrations` tables.

```
---
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    app: { myapp }
  name: rubyrep-{ myapp }
  namespace: default
data:
  default.conf: |
    RR::Initializer::run do |config|
      config.left = {
        :adapter  => 'postgresql',
        :database => 'REDACTED',
        :username => 'REDACTED',
        :password => 'REDACTED',
        :host     => 'OLD_DATABASE',
        :sslmode  => 'require',
        :logger   => STDOUT
      }

      config.right = {
        :adapter  => 'postgresql',
        :database => 'REDACTED',
        :username => 'REDACTED',
        :password => 'REDACTED',
        :host     => 'NEW_DATABASE',
        :sslmode  => 'require',
        :logger   => STDOUT
      }

      config.include_tables /./
      config.exclude_tables 'ar_internal_metadata'
      config.exclude_tables 'schema_migrations'

      config.options[:adjust_sequences] = false

      config.options[:sync_conflict_handling] = :left_wins
      config.options[:logged_sync_events] = :all_conflicts

      config.options[:replication_conflict_handling] = :left_wins
      config.options[:logged_replication_events] = :all_conflicts

    end
```

Create the configmap with:
```
$ hokusai production create --filename ./hokusai/rubyrep-config.yml
```

7) Create the file `./hokusai/rubyrep.yml`.  When the deployment is created, rubyrep will perform an initial sync.

```
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: { myapp }-rubyrep
  namespace: default
spec:
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: { myapp }
        component: rubyrep
        layer: data
      name: { myapp }-rubyrep
    spec:
      containers:
        - name: rubyrep-{ myapp }
          image: artsy/rubyrep
          args: ["/rubyrep-2.0.1/rubyrep", "replicate", "-c", "/mnt/default.conf"]
          imagePullPolicy: Always
          resources:
            requests:
              cpu: 200m
              memory: 256Mi
          volumeMounts:
            - name: rubyrep-{ myapp }
              mountPath: /mnt/default.conf
              subPath: default.conf
      volumes:
        - name: rubyrep-{ myapp }
          configMap:
            name: rubyrep-{ myapp }
```

Create the deployment with:
```
$ hokusai production create --filename ./hokusai/rubyrep.yml
```

8) When the database is synced and replication is active, we are ready to make a cutover.

  8a) Confirm that the databases are in-sync.  Run a rubyrep [scan command](http://www.rubyrep.org/scan_command.html) with:
  ```
  kubectl --context [staging|production] run rubyrep-$(whoami) --restart=Never --rm -i --tty --overrides '
  {
    "apiVersion": "v1",
    "kind": "Pod",
    "spec": {
      "containers": [
        {
          "name": "rubyrep",
          "image": "artsy/rubyrep",
          "args": ["/rubyrep-2.0.1/rubyrep", "sync", "-c", "/mnt/default.conf", "-s"],
          "stdin": true,
          "stdinOnce": true,
          "tty": true,
          "volumeMounts": [{
            "mountPath": "/mnt/default.conf",
            "subPath": "default.conf",
            "name": "rubyrep-{ myapp }"
          }]
        }
      ],
      "volumes": [{
        "name": "rubyrep-{ myapp }",
        "configMap": {
          "name": "rubyrep-{ myapp }"
        }
      }]
    }
  }' --image artsy/rubyrep
  ```

  The diff should show `0` in total for all tables.

  If you want to see verbose logging from the Rubyrep deployment, uncomment the logger sections in the above configuration, and delete the existing rubyrep pod to roll it out.  You can tail then logs from the `{ myapp }-rubyrep` pod.

  8b) To avoid race conditions regarding auto-incrementing primary keys, reset the table id sequences, leaving an offset for writes to the new database and headroom for replicated inserts from the old.  Check database / application write throughput to determine a reasonable value (i.e. writes/minute * 5) to leave room for the deployment rollout.  For, example, given an offset of `100`, run:
  ```
  SELECT setval('foo_id_seq', COALESCE((SELECT MAX(id)+100 FROM foo), 1), false);
  SELECT setval('bar_id_seq', COALESCE((SELECT MAX(id)+100 FROM bar), 1), false);
  ```

  8c) Update the application's DATABASE_URL environment variable
  ```
  hokusai production env set "DATABASE_URL={new database url}"
  ```

  8d) Refresh the application
  ```
  hokusai production refresh
  ```

  8e) Once the rollout is complete and all writes are going to the new database, Rubyrep's replication will work in reverse, propogating all changes from the new database back to the old.

  Monitor your application and verify data integrity with another `scan` command.

  If you need to rollback, simply repeat steps 7b on the original database, then steps 7c reverting to the old `DATABASE_URL` and 7d.

  8f) IMPORTANT! Re-enable foreign key constraints
  ```
  ALTER TABLE foo ADD CONSTRAINT fk_rails_fbc9d01ca0 FOREIGN KEY (bar_id) REFERENCES bar(id);
  ALTER TABLE bar ADD CONSTRAINT fk_rails_80eb82ccbf FOREIGN KEY (foo_id) REFERENCES foo(id) ON DELETE CASCADE;
  ```

  If there are any unsatisfiable foreign key constraints, these commands will fail and you should roll back / check data integrity.

  8g) Stop replication by deleting the Rubyrep deployment
  ```
  $ hokusai production delete --filename ./hokusai/rubyrep.yml
  ```


9) Finally, clean up Rubyrep's tables and triggers...
```
$ kubectl --context [staging|production] run rubyrep-$(whoami) --restart=Never --rm -i --tty --overrides '
{
  "apiVersion": "v1",
  "kind": "Pod",
  "spec": {
    "containers": [
      {
        "name": "rubyrep",
        "image": "artsy/rubyrep",
        "args": ["/rubyrep-2.0.1/rubyrep", "uninstall", "-c", "/mnt/default.conf"],
        "stdin": true,
        "stdinOnce": true,
        "tty": true,
        "volumeMounts": [{
          "mountPath": "/mnt/default.conf",
          "subPath": "default.conf",
          "name": "rubyrep-{ myapp }"
        }]
      }
    ],
    "volumes": [{
      "name": "rubyrep-{ myapp }",
      "configMap": {
        "name": "rubyrep-{ myapp }"
      }
    }]
  }
}' --image artsy/rubyrep

```

...and delete the rubyrep configmap
```
$ hokusai production delete --filename ./hokusai/rubyrep-config.yml
```

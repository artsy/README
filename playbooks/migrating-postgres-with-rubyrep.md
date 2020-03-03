---
title: Migrating Postgres with Rubyrep
description: How to migrate a Postgres to a new instance using Rubyrep
---

# Migrating Postgres with Rubyrep

To set up database replication via [rubyrep](rubyrep.org), do the following:

1) Create the new Postgres database and user

2) Start a shell in the application with the new database connection and load the app schema with:
```
hokusai [staging|production] run --env "DATABASE_URL=postgres://{new database credentials}" "bundle exec rake db:schema:load"
```

3) Check the database schemas.
  3a) If you want to download a dump of the current db to a local postgres, you can check schemas by running `rake db:schema:dump` locally, and checking in the diff in `db/schema.rb`.  You can also inspect the `schema_migrations` tables across the databases and compare to migrations.
  3b) Log into the new database and note all foreign key constraints.  You can get foreign key constraints for each table with `\d+ table`.  Save the constraints to later re-enable.

4) Disable all foreign key constraints, for example for tables `foo` and `bar` you would run:
```
ALTER TABLE foo DROP CONSTRAINT fk_rails_fbc9d01ca0;
ALTER TABLE bar DROP CONSTRAINT fk_rails_80eb82ccbf;
```

5) Create the file `hokusai/rubyrep-config.yml` (Credentials here are redacted but they should be supplied to Kubernetes and this file should not be checked in!) The "left" configuration refers to the source database and the "right" refers to the target database.  Note that for rails apps we can ignore both `ar_internal_metadata` and `schema_migrations` tables.

```
---
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    app: myapp
  name: rubyrep-myapp
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

      config.options[:logged_replication_events] = [:all_changes, :all_conflicts]

    end
```

Create the configmap with:
```
$ hokusai [staging|production] create --filename ./hokusai/rubyrep-config.yml
```

6) Create the file `./hokusai/rubyrep.yml`.  When the deployment is created, rubyrep will perform an initial sync.

```
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: myapp-rubyrep
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
        app: myapp
        component: rubyrep
        layer: data
      name: myapp-rubyrep
    spec:
      containers:
        - name: rubyrep-myapp
          image: artsy/rubyrep
          args: ["/rubyrep-2.0.1/rubyrep", "--verbose", "replicate", "-c", "/mnt/default.conf"]
          imagePullPolicy: Always
          resources:
            requests:
              cpu: 200m
              memory: 256Mi
          volumeMounts:
            - name: rubyrep-myapp
              mountPath: /mnt/default.conf
              subPath: default.conf
      volumes:
        - name: rubyrep-myapp
          configMap:
            name: rubyrep-myapp
```

Create the deployment with:
```
$ hokusai [staging|production] create --filename ./hokusai/rubyrep.yml
```

7) When the database is synced and replication is active, we are ready to make a cutover. To avoid race conditions regarding auto-incrementing primary keys, we will have to accept a brief window of downtime while performing a cutover to the new database.

  7a) Scale all deployments down to 0 replicas.  You may need to temporarily delete horizontal pod autoscalers if configured.
  ```
  kubectl --context [staging|production] delete hpa myapp-web
  kubectl --context [staging|production] scale deployment/myapp-web --replicas 0
  ```

  7b) Confirm that replication is complete.  You can tail logs from the `myapp-rubyrep` pod or run a rubyrep scan:
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
          "stdin": true,
          "stdinOnce": true,
          "tty": true,
          "volumeMounts": [{
            "mountPath": "/mnt/default.conf",
            "subPath": "default.conf",
            "name": "rubyrep-myapp"
          }]
        }
      ],
      "volumes": [{
        "name": "rubyrep-myapp",
        "configMap": {
          "name": "rubyrep-myapp"
        }
      }]
    }
  }' --image artsy/rubyrep -- /rubyrep-2.0.1/rubyrep --verbose scan -c /mnt/default.conf
  ```

  7c) Stop replication by deleting the replication deployment
  ```
  $ hokusai [staging|production] delete --filename ./hokusai/rubyrep.yml
  ```

  7d) IMPORTANT! Re-enable foreign key constraints
  ```
  ALTER TABLE foo ADD CONSTRAINT fk_rails_fbc9d01ca0 FOREIGN KEY (bar_id) REFERENCES bar(id);
  ALTER TABLE bar ADD CONSTRAINT fk_rails_80eb82ccbf FOREIGN KEY (foo_id) REFERENCES foo(id) ON DELETE CASCADE;
  ```

  7e) IMPORTANT! Reset table id sequences as Rubyrep does not propogate them
  ```
  SELECT setval('foo_id_seq', COALESCE((SELECT MAX(id) FROM foo), 1), false);
  SELECT setval('bar_id_seq', COALESCE((SELECT MAX(id) FROM bar), 1), false);
  ```

  7c) Update the DATABASE_URL environment variable
  ```
  hokusai [staging|production] env set "DATABASE_URL={new database url}"
  ```

  7d) Scale deployments back up to their original values
  ```
  hokusai [staging|production] update
  ```


8) Finally, clean up rubyrep's tables and triggers...
```
$ kubectl config use-context [staging|production]
$ kubectl run rubyrep-$(whoami) --restart=Never --rm -i --tty --overrides '
{
  "apiVersion": "v1",
  "kind": "Pod",
  "spec": {
    "containers": [
      {
        "name": "rubyrep",
        "image": "artsy/rubyrep",
        "stdin": true,
        "stdinOnce": true,
        "tty": true,
        "volumeMounts": [{
          "mountPath": "/mnt/default.conf",
          "subPath": "default.conf",
          "name": "rubyrep-myapp"
        }]
      }
    ],
    "volumes": [{
      "name": "rubyrep-myapp",
      "configMap": {
        "name": "rubyrep-myapp"
      }
    }]
  }
}' --image artsy/rubyrep -- /rubyrep-2.0.1/rubyrep --verbose uninstall -c /mnt/default.conf

```

...and delete the rubyrep configmap
```
$ hokusai [staging|production] delete --filename ./hokusai/rubyrep-config.yml
```

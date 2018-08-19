# Technology Roadmap

Artsy developers are free to select technologies most appealing to them in their particular project circumstances.
However, it's useful to document our general preferences so as to share lessons and avoid repeating past mistakes.
These are some of the technologies we prefer for common challenges, as well as evolutions in our thinking:

## Tools

- **PostgresQL** for common data storage needs. We rely on Heroku or Amazon's RDS to host these databases. Though
  MongoDB was chosen to host core API data, in the long run we found the data (and maybe all data) to be more
  relational than document-oriented.
- **Spark** jobs for data-intensive processing or learning tasks. Patterns exist for
  [our cluster](http://spark.artsy.net:7180/) to load data from the main Gravity database as well as other systems,
  distribute processing among all of the available nodes, and interact with S3, HDFS, or Redshift. See
  [Cinder](https://github.com/artsy/cinder).
- **CircleCI** for continuous integration over other services like Travis or Semaphore. See
  [projects](https://circleci.com/build-insights/gh/artsy).
- **JSON** over most other data formats.
- **Kubernetes** over Heroku for simple system deployments (or even some complex ones). We've built out clusters,
  monitoring, and logging, and have solutions for common needs like data storage, CI, crons, and shells. It's still
  the early days but production-ready. The [hokusai](https://github.com/artsy/hokusai) utility embeds many of our
  adopted practices, or see [the production dash](https://kubernetes.artsy.net).
- **Elasticsearch** for search, similarity, and sophisticated filtering. It replaces a large number of alternative
  solutions including Solr, offline indexes, and data snapshots.
- **GraphQL** is our go-to option for API communication, popular for the focused, customizable responses and direct
  applicability to client views. There are concerns include efficiency.
- **Hypermedia** (usually [HAL](http://stateless.co/hal_specification.html)) over custom resource-ful APIs. We like
  the self-documenting properties of a HAL API as well as how easily it can be consumed by clients (e.g., via
  [`hyperclient`](<(https://github.com/codegram/hyperclient)>). There remain concerns about clients being able to
  efficiently traverse large sets or extended relations.
- **RabbitMQ** offers a lightweight alternative to choosing _any_ API between systems. Its stream allows source
  systems to publish their notable events and other systems to subscribe as desired. The events themselves tend to
  be minimal JSON blobs, so some other data-sharing (e.g., via API) may be required. We prefer joining systems in
  this event-oriented way over directly invoking downstream systems from upstream ones.

## The Artsy Ecosystem

- **Focused services** over monolithic projects to ease developers' cognitive overhead, speed development and
  testing, and allow for flexible technology evolution (see above). Projects can be focused around a _function_
  (such as messaging) or a _domain_ (such as consignments).
- **Focused, smaller management utilities** over earlier iterations of admin utilities such as
  [Torque](https://admin.artsy.net). Examples include [CMS](https://cms.artsy.net)
  ([Volt](https://github.com/artsy/volt)) for partners, [Helix](https://helix.artsy.net) for genomers, and
  [auctions.artsy.net](https://auctions.artsy.net) ([Ohm](https://github.com/artsy/ohm)) for managing sales. We aim
  to _opportunitistically_ transition remaining administrative functions (such as for inquiries or users) to new
  tools.
- **Opaque IDs** over "slugs" for any programmatic access. While slugs are more friendly for URLs, they can change
  in practice so we prefer more opaque, permanent identifiers when used internally or programmatically.
- **Direct database exports** for extracting data from source systems into Redshift. In general we prefer loading
  raw source data into the warehouse and performing aggregation or calculations there (over synthesizing in source
  apps' code and exporting just the results). See Fulcrum's demonstration of extracting from
  [Mongodb sources](https://github.com/artsy/fulcrum/blob/master/lib/fulcrum/extract/gravity_extracts.rb) such as
  Gravity's or [Postgres sources](https://github.com/artsy/fulcrum/blob/master/tasks/extract.rake).
- **Artwork objects** over artwork pages. While much of our early infrastructure focused on serving content in the
  form artsy.net required, we expect our future product needs to demand more accurate representation of art world
  realities. That includes greater pricing variants, traceable provenance, an understanding of condition, physical
  location, and important distinctions among editions, sizes, and versions of a work.
- **Gravity's v2 API** corrects some of the out-of-favor patterns from v1. It also accommodates clients that are
  external to Artsy (usually only permitting them to access public-domain works). It is still far less complete
  than v1, but has strong patterns in place for making additions. Clients wanting to avoid implementing custom
  API-consuming code or ensure greater forward-compatibility can leverage v2 today.
- **Causality** for auction state. Historically, auctions were handled by the main API. Causality includes a
  better-suited architecture for near-real-time event handling. It currently exclusively handles processing of live
  auction events and shadows the Gravity bidding engine for timed auctions. Eventually, it will be the
  source-of-truth for all auction state.

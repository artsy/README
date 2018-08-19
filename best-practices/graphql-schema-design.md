---
title: GraphQL Schema Design
description: What are our best practices for GraphQL Schema Design?
---

## Notes

- GraphQL exposes a data set as [a graph](https://en.wikipedia.org/wiki/Graph_theory). See
  [Explaining GraphQL Connections](https://dev-blog.apollodata.com/explaining-graphql-connections-c48b7c3d6976) for
  a more detailed overview on how this applies to our codebase.

# How to model our graph

- As with most GraphQL advice, our schema should strive to always be backwards compatible. Thus careful
  consideration is needed about naming (be as unambiguous as possible) and the shape of the data returned by a
  field.

- Whenever a ‘namespace’ would be used in a field by adding a prefix or suffix (e.g. `for_sale_artwork` or
  `location_city`), this should be taken as a clue that this data needs to be nested instead. E.g.

  ```graphql
  {
    show(id: "kate-oh-gallery-metropolis") {
      # Don’t do this:
      location_city
      location_country
      # Instead do this:
      location {
        city
        country
      }
    }
  }
  ```

- Design the schema around first class domain-models, not functional details.

  For instance, rather than mimicking a backend endpoint that allows one to filter artworks by defining a
  `filter_artworks` field that has a nested artworks connection, expose the ability to filter artworks in a plain
  `artworks` connection field instead.

  The key aspect here is that we are trying to expose **artworks**, which are the same as artworks retrieved
  through other means, only the ‘feed’ they are retrieved from is different and that’s an implementation detail,
  there is no such model as **filter artworks**.

  ```graphql
  # Bad
  {
    filter_artworks(aggregations: [TOTAL]) {
      counts {
        total
      }
      artworks(first: 10) {
        edges {
          node {
            title
          }
        }
      }
    }
  }

  # Good
  {
    artworks(aggregations: [TOTAL], first: 10) {
      counts {
        total
      }
      edges {
        node {
          title
        }
      }
    }
  }
  ```

## Root fields

- These are entry points into the graph that is Artsy’s data set.

- Not all types necessarily make sense as root fields.

  - In general only domain models should be exposed as root fields. An ‘artwork’ is such a model, Artsy’s system
    time (for clock synchronization) probably is not.

- For the cases where there is no root field, but you still need to be able to retrieve an arbitrary node of the
  graph (e.g. when you need to refetch a node without needing to refetch all parent nodes along the path from the
  root to said node), there is the special
  [`node` root field](https://facebook.github.io/relay/graphql/objectidentification.htm).

  In short, this field is able to retrieve an arbitrary node by using a special ‘global’ ID, which has data encoded
  needed for our system to know the type of that entity and how to retrieve it. For example, based on just
  `banksy-champagne-formica-flag` the system wouldn’t be able to know what type of entity this refers to, a global
  ID would rather encode it like `Artwork:banksy-champagne-formica-flag`.

## Lists

It is undesirable to have multiple fields that semantically refer to the same data. So rather than defining both
e.g. an `artworks` field _and_ an `artworks_connection`, simply choose one form applicable to the data and call it
`artworks`.

- A paginated list (such as most associated types) should use ‘connections’ (see
  [the spec](https://facebook.github.io/relay/graphql/connections.htm) and
  [this blog post](https://dev-blog.apollodata.com/explaining-graphql-connections-c48b7c3d6976)).

  - These are more forward-compatible, as they allow for adding metadata to the association itself and the ‘edge’
    (the relation between the parent entity and the associated entity).
  - Connections use
    [cursor based pagination](https://www.sitepoint.com/paginating-real-time-data-cursor-based-pagination/), which
    has benefits over ‘page’ based pagination in systems where data availability could change (e.g. removing/adding
    of artworks) and it’s an abstraction that allows the underlying system to change the way it does pagination
    whilst staying API compatible.

- In rare cases an immediate list may be used, but this should only be done in cases where the list has few entries
  and doesn’t require pagination, i.e. fetch _all_ entries at once.

## Schema stitching

As we expand our microservices oriented architecture and take our use of GraphQL more serious, a need has arisen to
model GraphQL schemas more closely to the data source (i.e. database) in an effort to colocate schema code next to
the rest of the code related to that data and to make these schema resolvers more performant.

In this new scenario, metaphysics would be an orchestration layer that
[stitches together](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html) these various schemas
into a single coherent schema that clients can consume without needing to know about the existence of these various
microservices.

- Services should only model the data they themselves are responsible for and leave it up to metaphysics to model
  that further. For example, consider a list of consignment submissions for a user, rather than modelling the
  submissions under an ‘authenticated user’ in your upstream API like this:

  ```graphql
  {
    me {
      submissions {
        # ...
      }
    }
  }
  ```

  Make `submissions` a root field that takes a `user_id` argument:

  ```graphql
  {
    submissions(user_id: 42) {
      # ...
    }
  }
  ```

  then Metaphysics can then stitch that together the `submissions` query with a `User` type and model the schema as
  per the first example.

- Schemas that are exposed to Metaphysics for stitching, should preferably name the fields and mutations they
  define in such a way that doesn't leak any implementation details about the underlying service, and reflects
  actual real-world 'business' groupings.

  For instance, Convection has a `Submission` model (which represents a consignment), but `addSubmission` is
  probably not a great name to expose at the Metaphysics orchestration layer (even though in a more old-school
  approach where your client directly used Convection, this may have been fine).

  Additionally, `addSubmissionToConvection` is probably not a great name to expose at Metaphysics either. This
  leaks the underlying implementation (Convection), which will make it harder to update in the future.

  So, perhaps something like `addConsignment` or `addConsignmentSubmission` is the best name to give this mutation,
  in your Convection GraphQL schema.

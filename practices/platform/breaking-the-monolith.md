## Monoliths vs. microservices

The [Gravity](https://github.com/artsy/gravity/) project once encapsulated Artsy's entire product, but as the team
grew in size and the product in complexity, it became difficult to reason about all of the system's interconnected
parts. Tests became slow, and minor changes became bogged down in seemingly unrelated obstacles.

The team now prefers working on more focused applications and services, while Gravity has been distilled into the
main API responsible for much of the data shared by client applications. Some applications maintain their own data
stores, while others simply offer front-ends that employ the main API. This allows us to:

- Choose the best-fitting tools and technologies (data stores, languages, architectures, infrastructure) for each
  need
- Decrease cognitive burden on developers
- Develop, test, deploy with a frequency and speed that makes local sense
- Scale systems independently
- Launch, deprecate, or replace entire systems independently (when necessary)

There are significant drawbacks to this approach, too. To avoid needing to synchronize deploys of multiple systems,
updates must be made in graceful, backward-compatible ways. Sometimes the lines of communication between systems
remain narrow and neat, but other times systems grow coupled and changes cascade across multiple systems. Often,
conventions for testing, deploying, and interacting with systems are inconsistent. We strive to improve at dealing
with these problems, since maintaining a single monolithic product is infeasible at our scale.

## Extracting services

For the reasons mentioned above, we try to separate systems along natural boundaries (neither combining project
responsibilities unnecessarily nor splitting them to the extent that they must remain closely coupled). Some
questions help us identify those boundaries:

- Who or what teams are responsible for the relevant product concerns?
- Can existing systems be leveraged for this purpose, or does similar functionality already exist elsewhere?
- Would updates (fixes, new features, or business rule changes) to these responsibilities be closely tied to--and
  probably trigger related updates in--another existing system?
- What communication or coordination will be required? Will a limited interaction (API, callback, shared data...)
  be sufficient, or will ongoing synchronization be necessary?
- Are the scale or technology needs significantly different than existing services?

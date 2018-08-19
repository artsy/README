---
title: The Platform Practice
description: What do folks with a platform focus do?
---

## Team Information

### Team Goals

- Powerful, intelligent data and APIs
- Robust internal tools and infrastructure
- Platform for future growth

### Process

- Automated notifications appear in [#platform-machines](https://artsy.slack.com/messages/platform-machines/)
- Significant alerts go to [#platform-alerts](https://artsy.slack.com/messages/platform-alerts/)
- Fridays are **Future Fridays**, where we take a break from in progress work to focus on longer-term improvements.
  (See [blog post](http://artsy.github.io/blog/2015/12/22/future-fridays/).) _[Experimental]_

### Platform Documentation

- [Kubernetes at Artsy](/practices/platform/kubernetes.md)
- [Migration Strategies](/practices/platform/migrations.md)
- [Technology Roadmap](/practices/platform/technology-roadmap.md)
- [Breaking the Monolith](/practices/platform/breaking-the-monolith.md)

### Further Platform documentation

A lot of platform practice documentation is inside
[artsy/potential](https://github.com/artsy/potential/blob/master/platform/)

- [AWS](https://github.com/artsy/potential/blob/master/platform/AWS.md)
- [Configuration Management](https://github.com/artsy/potential/blob/master/platform/ConfigurationManagement.md)
- [Domain Models](https://github.com/artsy/potential/blob/master/platform/DomainModels.md)
- [Messaging](https://github.com/artsy/potential/blob/master/platform/Messaging.md)
- [Monitoring](https://github.com/artsy/potential/blob/master/platform/Monitoring.md)
- [Restoring Data](https://github.com/artsy/potential/blob/master/platform/RestoringData.md)
- [Working With Gravity](https://github.com/artsy/potential/blob/master/platform/WorkingWithGravity.md)

### Our Technologies

#### Rails

Most of the Platform Practice's apps are built on Rails. If you are unfamiliar with Rails, take some time to go
through a tutorial, such as [Michael Hartl's Rails Tutorial](https://www.railstutorial.org/book).

### API

Our API is implemented in the [Gravity](https://github.com/artsy/gravity) project and uses
[Grape](https://github.com/intridea/grape).

### Kubernetes

Some projects leverage [Docker](https://www.docker.com/) and our [Kubernetes](https://kubernetes.io/) clusters. See
[Kubernetes](Kubernetes.md).

### Installing Gravity

[Gravity](https://github.com/artsy/gravity) was Artsy’s original website. It was a monolithic Rails app that
included our API and front-end code. At some point, we broke out client-side code into its own application,
[Force](https://github.com/artsy/force).

Follow the [Gravity docs](https://github.com/artsy/gravity/blob/master/doc/GettingStarted.md) to get started.

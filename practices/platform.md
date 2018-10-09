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
- [Data Migrations](/playbooks/data-migrations.md)
- [Technology Choices](/playbooks/technology-choices.md)
- [Extracting Services](/playbooks/extracting-services.md)

### Further Platform documentation

A lot of platform practice documentation is inside
[artsy/potential](https://github.com/artsy/potential/blob/master/platform/)

Artsy's favorite resources (including those of the platform team) are in [Tech Learning](/resources/tech_learning.md#platform-practice)

- [AWS](https://github.com/artsy/potential/blob/master/platform/AWS.md) ([AWS login](https://artsy.signin.aws.amazon.com/console))
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
[Kubernetes](platform/Kubernetes.md).

### Setting up Gravity

[Gravity](https://github.com/artsy/gravity) was Artsy’s original monolith and now hosts the main API. Follow the [Gravity docs](https://github.com/artsy/gravity/blob/master/doc/GettingStarted.md) to get set up, or this introduction: [Working with Gravity](https://github.com/artsy/potential/blob/master/platform/WorkingWithGravity.md).

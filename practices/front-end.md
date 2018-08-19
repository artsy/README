---
title: The Front-End Practice
description: What do folks with a front-end focus do?
---

## Team Information

### Team Goals

- Build and maintain primarily user-facing applications.
- Support product goals through web technology.
- Productivity and developer happiness.
- Open source by default.

### Logistics

The front-end practice is more ad-hoc than the [platform practice](/practices/platform.md), as most members are in
different product teams. So the practice has two bi-weekly meetings on alternative weeks:

- A practice meeting with a web and general infrastructure focus
- A practice meeting with an iOS focus

### Our Technologies

#### Rails

Most of the Platform Practice's apps are built on Rails. If you are unfamiliar with Rails, take some time to go
through a tutorial, such as [Michael Hartl's Rails Tutorial](https://www.railstutorial.org/book).

#### Backbone

[Torque](https://github.com/artsy/torque), the main admin app, uses Backbone, so if you find yourself working on
that app it might be helpful to browse the [Backbone docs](http://backbonejs.org/) for more info.

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

---
title: The history of practices at Artsy
description: How did we get to where we are
---

Artsy has historically been transparent with its history, you can find a lot of blog posts documenting our team
structures at the time and their trade-offs. Internally we're also transparent, and you can access all historical
emails sent to `team@artsymail.com`. This is particularly useful when looking for announcements for example here's
all emails
[by orta](https://groups.google.com/a/artsymail.com/forum/#!topicsearchin/team/author$3Aorta@artsymail.com) 🔒 to
the team.

So, let's use `team@artsymail.com` as a tool to find out how the Artsy engineering team has evolved.

In the beginning, there were just engineers. We were a small team with only really ~4 main projects
(Gravity/Folio/CMS/Admin) which kept communication overhead low and there was little need for sub-teams.

Eventually it did.

Between 2013-2014 we:

- Created a
  [Partner Engineering team](https://groups.google.com/a/artsymail.com/d/msg/team/ya_L3I_1TCk/kE7uGKRd8JAJ) 🔒
- Created a [Mobile Team](https://groups.google.com/a/artsymail.com/d/msg/team/AgZSIEjZVs4/KDWTTRNEltQJ) 🔒

Which was mixed with a set of full-stack engineers working on the website, and it's corresponding platform work. We
stayed technology focused until 2015 where our teams
[switched](https://groups.google.com/a/artsymail.com/d/msg/team/tHZ_lfJQH9Y/cQQKlwIcCwAJ) 🔒 to be based around the
type of business stake-holders:

- Gallery Tools and Services
- Gallery SaaS
- Artsy.net
- Artsy iOS
- Auctions
- Messaging
- Publishing

Which left space for folks who should be thinking about how things should work across an entire technology stack.
This was the creation of platforms at Artsy, we had three of them:

- Web
- Platform
- Mobile

The product teams [simplified](https://groups.google.com/a/artsymail.com/d/msg/team/hwLvMwuBmJo/8xGcssucBwAJ) 🔒
this down into 4 major teams at the start of 2016:

- Auctions
- Collector Experience & GMV
- Partner Success & Revenue
- Publishing

However, practices staying the same.

With the Mobile team using to React Native, when the lead of the web practice
[left Artsy](https://groups.google.com/a/artsymail.com/d/msg/team/SQaJc-oMhZM/QlZEqIVICQAJ) 🔒. We consolidated the
Web and Mobile practices into a generic "front-end" practice. This was due to the amount of shared infrastructure,
people and concerns between the two.

Then in early 2019, we
[split those](https://github.com/artsy/README/commit/004b7b9b1a6f8facdd8ab9f4535d6b993f240b78#diff-04c6e90faac2675aa89e2176d2eec7d8)
practices back out into front-end iOS and front-end Web.

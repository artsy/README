---
title: Technical planning
description: How to write technical plans at Artsy
---

# Technical planning

Technical planning is a crucial part of our engineering process. Writing tech plans helps us:

- Keep track of technical decisions that we've made, and the associated rationale.
- Streamline a team's development of a feature and align within and across teams.
- Communicate and collaborate effectively on technical decisions in an async manner.
- Think through problems in a way that allows developers to practice technical decision-making & grow.
- Get feedback early on in the development process, to avoid costly U-turns further down the line.
- Refine and shape product requirements.

Developers should use their judgment when deciding whether or not to write a tech plan, but we recommend them when
planning:

1. Technical design for medium to large features
1. Architectural changes or new design patterns
1. Changes affecting other teams' products or engineers' workflows
1. New integrations or services

If the feature you're working on follows our established patterns, or the design and discussion can fit equally
well within a PR, it's OK to skip.

## Tech Plans vs. Product Briefs

Technical plans discuss and propose a technical implementation, while product briefs should govern the design, user
experience, and business requirements of a feature. We recommend linking to an associated product brief for
context, but product and requirement decisions should live on the product brief, not on the tech plan.

It's natural to discover new product implications through the tech planning process. If this happens, make sure
those discussions are routed to the product brief for clarity.

## Tech Plan States

- **Draft** - a work in progress
- **Open for Feedback** - Officially proposed and available for anyone's input and comments
- **Implementing** - Approved by all associated reviewers and being worked on
- **Done** - Implemented
- **Closed** - Either rejected outright (e.g. the team chooses an alternative) or abandoned before it was accepted

## Writing a tech plan

Follow the template in Notion, but feel free to add or skip sections. If the technical plan involves a notable
technical decision, we recommend briefly describing the alternatives considered. A
[decision matrix](https://review.firstround.com/this-matrix-helps-growing-teams-make-great-decisions) can help with
their evaluation
([example here](https://www.notion.so/artsy/d17290484e6b40ac9e871eb7070dd3e8?v=81f6f3bf425b43e48fadd3c36adc2e09)).

## Reviewers

Choose appropriate reviewers who can best evaluate your plan's approach, similar to Github PR reviewers. Some
guidelines:

- Aim for ~3-5 reviewers.
- Reviewers should be engineers given the tech plan is focused on implementation. Input from outside engineering is
  always welcome.
- Seek out the most critical review, to ensure the best decision. E.g., if the change affects another team's
  domain, include someone from that team. Consider including your team's tech lead as well as relevant staff
  engineers.

If you are not initially a reviewer but have blocking feedback, you may add yourself as a reviewer.

## Receiving Feedback

Since all developers are invited to participate on a tech plan and leave feedback, setting clear expectations on
the tech plan's timeline can help ensure this process is smooth. We recommend filling out the "Feedback requested
by" date field.

If there is someone that you explicitly want feedback from, include them in the Stakeholders section (and don't
hesitate to remind them directly).

Significant tech plans benefit from a synchronous review in a practice meeting. If there is not a practice meeting
that works for your timeline, schedule something ad-hoc. Make sure to mention the tech plan in
[our weekly engineering standup](https://github.com/artsy/README/blob/main/events/open-standup.md) to invite
broader feedback.

## Giving Tech Plan Feedback

Feedback is expected and encouraged. Similar to leaving PR comments, please distinguish between blocking and
non-blocking feedback so that your intent is clear.

If you have questions about or significant feedback on the overall direction of the tech plan, we recommend asking
the tech plan author to hop on a quick call to discuss.

## Reviewing and Approving a Tech Plan

Stakeholders are required to formally review the tech plan (also in a similar manner as Github PRs) by marking the
plan with the appropriate review status:

- **Approved** means that you are OK with the direction proposed by the plan.
- **Request changes** means that you require some changes (that you clarify in the Comments section) before
  accepting the plan.

Based on these review statuses, the tech plan author can make changes and ask for a subsequent review.

While the tech plan writer is responsible for the ultimate decision on whether a tech plan moves into the next
state, they are expected to seek and take feedback from reviewers seriously and address requested changes.

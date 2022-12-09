---
title: Technology choices
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

Developers should use their judgment when deciding whether or not to write a tech plan, but we recommend them when planning:
1. Technical design for medium to large features
1. Architectural changes or new design patterns
1. Changes affecting other teams' products or engineers' workflows
1. New integrations or services

If the feature you're working on follows our established patterns and doesn't require technical decisions larger than what would fit in a single PR, it's OK to skip.

If you're working on a small feature or it doesn't fit the criteria above but you still want to write one, that's fine! Feel free to keep it small. If you choose not to create a tech plan, make sure to document decisions (even small ones) as part of PR descriptions.

## Tech Plans vs. Product Briefs
Technical plans discuss and propose a technical implementation, while product briefs should govern the design, user experience, and business requirements of a feature. We recommend linking to an associated product brief for context, but product and requirement decisions should live on the product brief, not on the tech plan.

It's natural to discover new product implications through the tech planning process. If this happens, make sure those discussions are routed to the product brief for clarity.

If product-related feedback comes up while the tech plan is being reviewed, that is often a sign that there is more to discuss and debate at the product brief-level. If you are authoring a tech plan and this happens, it is recommended that you bring the conversation immediately to the associated PM(s). Once the question or feedback is addressed, the tech planning can continue.

## Tech Plan States
### Draft
A tech plan in this state is a work in progress.

### Open for Feedback
A tech plan in this state is officially open for feedback. Anyone should feel free to look at Proposed tech plans and leave their thoughts.

### Implementing
A tech plan in this state has been approved by all associated reviewers and is being worked on.

### Done
A tech plan in this state has been implemented. Generally, tech plans can be put into this state at the same time that the associated product brief, if there is one, is moved to "Done".

### Closed
A tech plan in this state has either been rejected outright (i.e. it was proposing a new technology that the team decides not to adopt), or otherwise abandoned before it was able to be formally accepted.

When closing a tech plan, include a description as to why it's been closed.

## Writing a tech plan
We recommend following the template in Notion, but feel free to add or remove sections. Be as clear, concise, and organized as possible when writing so that it is easy for others to understand and leave quality feedback.

If the technical plan involves a contentious or impactful technical decision, we recommend creating a separate, linked, document to capture the alternatives considered ([example here](https://www.notion.so/artsy/d17290484e6b40ac9e871eb7070dd3e8?v=81f6f3bf425b43e48fadd3c36adc2e09)). This allows the tech plan to focus on the chosen option.

As with the tech planning process itself, creating decision matrices benefits from [collaboration and feedback](https://review.firstround.com/this-matrix-helps-growing-teams-make-great-decisions).

## Reviewers
Reviewers represent the list of people from whom you require tech plan approval. Think of this as similar to the Reviewers field on Github PRs. As the author of the tech plan, you are responsible for choosing appropriate reviewers to arrive at the best technical approach.

Some guidelines for choosing reviewers:
- Aim for ~3-5 reviewers.
- Reviewers should be from the engineering team, given the tech plan is focused on implementation decisions. Of course it's great to share and collaborate outside of engineering, but other team members need not be on this list.
- Choose reviewers whose expertise is important for ensuring the best decision is made. If the change affects another team's domain, include someone from that team. Consider including your team's tech lead as well as relevant staff engineers.

If you are not initially included as a reviewer but have blocking feedback, you may add yourself as a reviewer.

## Receiving Feedback
Since all developers are invited to participate on a tech plan and leave feedback, setting clear expectations on the tech plan's timeline can help ensure this process is smooth. We recommend filling out the "Feedback requested by" date field.

If there is someone that you explicitly want feedback from, include them in the Stakeholders section (and don't hesitate to remind them directly, Notion notifications are easily lost).

Significant tech plans benefit from a synchronous review in a practice meeting. If there is not a practice meeting that works for your timeline, schedule something ad-hoc. Make sure to mention the tech plan in [our weekly engineering standup](https://github.com/artsy/README/blob/main/events/open-standup.md) to invite broader feedback.

## Giving Tech Plan Feedback
Feedback is expected and encouraged. Similar to leaving PR comments, please distinguish between blocking and non-blocking feedback so that your intent is clear.

If you have questions about or significant feedback on the overall direction of the tech plan, we recommend asking the tech plan author to hop on a quick call to discuss.

## Reviewing and Approving a Tech Plan
Stakeholders are required to formally review the tech plan (also in a similar manner as Github PRs) by marking the plan with the appropriate review status:
- **Approved** means that you are OK with the direction proposed by the plan.
- **Request changes** means that you require some changes (that you clarify in the Comments section) before accepting the plan.

Based on these review statuses, the tech plan author can make changes and ask for a subsequent review.

While the tech plan writer is responsible for the ultimate decision on whether a tech plan moves into the next state, they are expected to take feedback from reviewers seriously and address requested changes.

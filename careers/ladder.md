---
title: The Artsy Engineering Ladder
description: Career development at Artsy
---

# Engineering Ladder

This documents Artsy's Engineering Ladder. The Engineering Ladder is a framework to help evaluate performance,
goals, and compensation for engineers at Artsy. Our ladder was first established and opened in 2015, which you can
read more about [on our blog](https://artsy.github.io/blog/2015/04/03/artsy-engineering-compensation-framework/).

Since then Artsy has synced up with the Artsy
[company-wide framework 🔑](https://docs.google.com/spreadsheets/d/1SJXiaA5TYQxqDQmOiVG5NjLj3FFaAAC6aFVVB40bUAs/edit#gid=1182416267)
for levels and titles and we have added Technical Lead levels to the framework.

This document is open and evolving. We encourage you to submit issues or pull requests to suggest changes and
ensure our framework is doing the best it can to help Artsy fairly evaluate compensation and career growth for
engineers.

## Tracks

The Engineering Ladder encapsulates two tracks—an individual contributor (IC2–IC8) and manager track (M2–M6). The
manager track is available to engineers who have achieved an "IC5 Senior Engineer" level on the individual
contributor ladder.

| Individual Contributor | Artsy IC Level | Artsy M Level | Manager                        |
| ---------------------- | -------------- | ------------- | ------------------------------ |
| Intern                 | Intern         |               |                                |
| Engineer 1             | IC2            |               |                                |
| Engineer 2             | IC3            |               |                                |
| Senior Engineer 1      | IC4            | M2            | Engineering Manager 1          |
| Senior Engineer 2      | IC5            | M3            | Engineering Manager 2          |
| Staff Engineer         | IC6            | M4            | Senior Engineering Manager     |
| Senior Staff Engineer  | IC7            | M5            | Director of Engineering        |
| Principal Engineer     | IC8            | M6            | Senior Director of Engineering |

### How promotions work

TODO

## Individual Contributors

Individual contributor engineers define a "maker" role at Artsy where a person is responsible for writing code on a
regular basis and has no direct reports. As an individual contributor engineer grows at Artsy the scale and impact
of the code they write and systems they maintain is expected to increase.

From one level to another, the scope of direct impact gradually increases and so does the sphere of influence.
Increased mastery is a necessary condition but isn't sufficient to expand impact.

```
Scope of impact:     Self     >        Team          >  Teams  > Org
Level          : Eng 1, Eng 2 > Sen Eng 1, Sen Eng 2 >  Staff  > Sen Staff+
```

### tl;dr

- Intern: focuses on learning core skills and applying them to deliver business value
  - TODO: This level still needs to be added to the ladder.
- Engineer 1 (IC2): Focuses on being an effective individual contributor.
- Engineer 2 (IC3): Is an effective team member.
- Senior Engineer 1 (IC4): Consistently drives change and impact across a significant portion of their product
  team.
- Senior Engineer 2 (IC5): Consistently drives change and impact across their whole product team.
- Staff Engineer (IC6): can drive change and impact across multiple teams.
- Senior Staff Engineer (IC7): can drive change and impact across full Product, Data, Design and Engineering
  organization
  - TODO: This level still needs to be added to the ladder.

_Note: This ladder is heavily inspired by
[Better's Technical Career Ladder](https://better.engineering/technical-career-ladder/) and
[Rent the Runway's Engineering Ladder](https://dresscode.renttherunway.com/blog/ladder), which we believe have the
appropriate levels of specificity to enable meaningful career development conversations._

### Evaluation criteria

- Knowledge Leadership
  - Level of knowledge in a specific business area
  - Breadth and depth of technical and soft skills
- Impact
  - Nature and impact of problems solved and decisions made
  - Value delivered to the business and team
- Influence
  - Nature and level of influence on projects, strategy, and internal and external contacts
  - Effect on people around you and team dynamics
- Discretion
  - Nature of guidance received
  - Nature of guidance provided to others

### Knowledge Leadership

<table class="data-table">
  <tbody>
    <tr>
      <td class="border-top">Knowledge leadership</td>
      <td class="border-top">Engineer 1</td>
      <td class="border-top">Engineer 2</td>
      <td class="border-top">Senior Engineer 1</td>
      <td class="border-top">Senior Engineer 2</td>
      <td class="border-top">Staff Engineer</td>
    </tr>
    <tr>
      <td>Technical understanding</td>
      <td>
        <ul>
          <li>Has broad knowledge of CS concepts (data structures, databases, server/client, DNS).</li>
          <li>Proactively learns about Artsy best-practices (design system, our internal Technology Radar, etc.).</li>
          <li>Routinely pushes code through the entire lifecycle from development to production.</li>
          <li>Is familiar with basic troubleshooting and debugging tools including developer console, error-reporting and monitoring services.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Consistently applies Artsy best practices (design system, our internal Technology Radar, workflow, etc.).</li>
          <li>Exhibits a basic understanding of security, performance, and scalability concerns and can address them by extending existing patterns or soliciting input.</li>
          <li>Can trace production behaviors or issues across multiple layers.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Knows their own technical area well, has basic familiarity with a range of shared systems and developer tools and is eager to continue to deepen and broaden expertise.</li>
          <li>Can systematically trace and troubleshoot end-to-end issues using all available resources such as data, logs, and metrics.</li>
          <li>Proactively considers issues of security, performance, and scalability across systems when designing software.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Knows the production infrastructure (front-end, back-end, or both) very well and contributes to it within area of expertise</li>
          <li>Has a good understanding of and is a regular contributor to the entire software development lifecycle: testing, deployment, monitoring, alerting</li>
          <li>Exhibits advanced understanding of software engineering best practices (including security threats, performance, scalability and reliability) and creates space for necessary investment</li>
          <li>Leaves systems in a better state after each release, has a multiplier effect on the team by making it easier for others to contribute with high impact.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Demonstrates advanced knowledge in specific domains as well as basic expertise across the whole stack.</li>
          <li>Outstanding technical contributions, widely recognized throughout the whole engineering team as an expert in many parts of the code base.</li>
          <li>Actively contributes to complex systems (front-end and/or back-end, etc.) or products shared across the engineering team.</li>
          <li>Routinely contributes to the maintenance of large scale and impactful services.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Technical decision-making</td>
      <td>
        <ul>
          <li>Can create or update an API, test, or component by following existing examples or with guidance.</li>
          <li>Shows an understanding of when to take implementation shortcuts and when it needs to be paid back.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Consistently improves codebase while recognizing when to ship vs. invest.</li>
          <li>Carefully considers the appropriate layer or system with which to satisfy a given need.</li>
          <li>Routinely designs small-to-medium features within a single application or area that align with best-practices and anticipate basic questions and concerns about security, performance, scalability and reliability.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Can identify opportunities to responsibly evaluate new technologies and / or decide to stick with existing technologies.</li>
          <li>Within a contained service or application, shows excellent technical judgment in terms of when to build from scratch vs. using an external (i.e. library, vendor) solution.</li>
          <li>Uses a combination of industry practice, Artsy knowledge, and situational awareness to choose technical approaches that are in line with Artsy's overall technical choices.</li>
          <li>Demonstrates ability to design a medium-to-large feature (crossing multiple system boundaries or domains) that aligns with best-practices, proactively articulates tradeoffs against alternative design proposals, and anticipates questions/concerns.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Is trusted to think through all aspects of a problem. Seeks out and effectively weighs input from others.</li>
          <li>Invests in getting the rest of the engineering group familiar with these decisions.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Consistently makes decisions about the engineering team's technical roadmap and overall architecture.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Code quality</td>
      <td>
        <ul>
          <li>Writes code that is easy to read and follow, has no obvious bugs and has corresponding unit tests.</li>
          <li>Can identify minor file-level opportunities to refactor code and sets aside time to do it.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Contributes code that is correct, follows accepted patterns, and is commonly mergeable with minimal guidance within their own area of expertise.</li>
          <li>Identifies and makes time for straightforward refactoring opportunities.</li>
          <li>Doesn't write tests because they "think they should". Instead, uses tests, QA, monitoring systems, and other tools to guide the right changes and gain confidence.</li>
        </ul>
      </td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Industry knowledge</td>
      <td>&nbsp;</td>
      <td>
        <ul>
          <li>Spends some time staying up to date on technology trends by attending practice meetings, lunch and learns, reading blog posts, etc.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Generally up-to-date on the current technology landscape and relevant trends within a given area of expertise.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Is attentive to the technical landscape and aware of current trends. Can assess when to start using new technology vs. what's worth waiting a bit longer for.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Exhibits strong opinions and knowledge about the current technology landscape, can argue for/against technologies and their place at Artsy.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Impact

<table class="data-table">
  <tbody>
    <tr>
      <td class="border-top">Impact</td>
      <td class="border-top">Engineer 1</td>
      <td class="border-top">Engineer 2</td>
      <td class="border-top">Senior Engineer 1</td>
      <td class="border-top">Senior Engineer 2</td>
      <td class="border-top">Staff Engineer</td>
    </tr>
    <tr>
      <td>Team impact</td>
      <td>
        <ul>
          <li>Completes well-defined tasks.</li>
          <li>Actively seeks out learning opportunities in new product areas or technologies.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Contributes small improvements to our shared tools and libraries (i.e. chores from practices, fixes outside of immediate product work).</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Advocates for ways to improve our infrastructure or product in the context of a team's deliverables.</li>
          <li>Helps prioritize the team's project backlog and assess cost vs impact of the various initiatives.</li>
          <li>Contributes to the team longer-term planning (OKR definition, roadmap).</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Translate product/design specs into technical tasks that can be efficiently worked on by the members of the team and make sure team members understand the context behind what they will be building.</li>
          <li>Brings ideas to the PM and is trusted as someone who can run with and stake out bigger projects.</li>
          <li>When need be, can take on Tech Lead responsibilities or lead a key project.</li>
          <li>Often has conversations with the PM about improvements to the product or infrastructure, occasionally comes up with completely new ideas.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Comes up with larger ideas of changes to the product roadmap and advocates for them convincingly.</li>
          <li>Anticipates technical issues at the org level and helps everyone make architectural and design decisions to avoid them.</li>
          <li>Bonus: Does things to promote Artsy's engineering brand: i.e. writing blog posts, speaking at external events, open-sourcing projects or working with external contributors.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Product impact</td>
      <td>&nbsp;</td>
      <td>
        <ul>
          <li>Can be relied upon to deliver features on the team's critical path.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Delivers significant business value by helping the team deliver on its overall goals.</li>
          <li>Identifies and delivers technical improvements that benefit the team.</li>
          <li>Regularly leads larger initiatives (spanning a month or two) that require coordination with 2-3 engineers and / or a high level of technical complexity.</li>
          <li>Breaks down ambiguous business problems and sequences the tasks to deliver value quickly and incrementally.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Can lead a very large initiative (multiple months long) for a complex project, like introducing a new piece of technology.</li>
          <li>Keeps an eye on the entire team's quality and sets aside time to fix "tragedy of the commons" things (e.g. missing tests or tech debt). Holds team members to a high standard for testing, performance, and code readability.</li>
          <li>Accelerates team's impact by advocating for and by leading technical plans, spikes, proof of concepts, etc.</li>
          <li>Keeps an eye on Artsy's general architecture and team-wide technical decisions. Advocates for and is able to drive change when necessary.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Has made an obvious positive impact on some engineering or product top line metrics.</li>
          <li>Drives process changes in the entire engineering team.</li>
          <li>Has track record of creating sweeping improvements in stability, performance, and scalability across services and reduces complexity to get more done with less.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Influence

<table class="data-table">
  <tbody>
    <tr>
      <td class="border-top">Influence</td>
      <td class="border-top">Engineer 1</td>
      <td class="border-top">Engineer 2</td>
      <td class="border-top">Senior Engineer 1</td>
      <td class="border-top">Senior Engineer 2</td>
      <td class="border-top">Staff Engineer</td>
    </tr>
    <tr>
      <td>Team influence</td>
      <td>
        <ul>
          <li>Builds relationships with team members.</li>
          <li>Actively participates in team rituals.</li>
          <li>Provides clear, timely updates about tasks' progress or obstacles.</li>
          <li>Aims to understand others' pull requests and makes time to participate in code review, QA, and releases.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Provides constructive feedback and observations during team retrospectives.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Suggests process changes in the team</li>
          <li>Routinely takes ownership for retro action items.</li>
          <li>Routinely facilitates existing team ceremonies.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Proactively organizes retrospectives and other team discussions.</li>
          <li>Actively works to make the team function more effectively.</li>
          <li>Can drive change without formal authority.</li>
        </ul>
      </td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Engineering influence</td>
      <td>&nbsp;</td>
      <td>
        <ul>
          <li>Provides help and support to other engineers within their area of expertise.</li>
          <li>Participates in our interviewing process and is prompt and thoughtful in their feedback.</li>
          <li>Takes time to provide constructive feedback on pull requests.</li>
          <li>Participates in technical conversations within the team.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Mentors and/or trains other engineers in their area of expertise.</li>
          <li>Participates in decision making at the practice level.</li>
          <li>Can rally a small group of people beyond their team to solve a well-defined problem.</li>
          <li>Is a sought after collaborator to help advise and unblock projects that relate to a well-defined part of our stack</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Regularly administers technical interviews. Is fluent with interview best practices and actively tries to mitigate biases. Clearly identifies pros and cons of the candidate. Can represent the company and speak about the role well.</li>
          <li>Helps organize team events</li>
          <li>Thinks about team-wide culture and how to impact it</li>
          <li>Occasionally sets up internal training or relevant learning opportunities</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Multiplies the effectiveness of others by facilitating cross-team work.</li>
          <li>Recognized within engineering as having consistently good judgement and sought out by other team members for design input, code review, and technical guidance.</li>
          <li>Takes responsibility for the team's culture and morale.</li>
          <li>Identifies knowledge gaps and sets up whole training program/classes when necessary.</li>
          <li>Thinks strategically about our hiring needs and advocates for cultivating or hiring necessary skillsets.</li>
          <li>Improves the interviewing and hiring process.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Cross-functional collaboration</td>
      <td>&nbsp;</td>
      <td>
        <ul>
          <li>Effectively collaborates with other engineers and with team's cross-functional partners (including PM, Designer, Data Analyst).</li>
          <li>Can have a conversation with the PM and provide insights to the team about project scope and implementation tradeoffs for small-to-medium features</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Trusted by PM, Data, Design and team to reliably ships things, to make technical decisions and to be a thought partner for explorations or troubleshooting issues.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Proactively partners with PMs, Data, Design, and Business Stakeholders (on your team or other teams) to drive the best possible outcome.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Is a frequent thought partner and technical advisor for PMs.</li>
          <li>Respected by non-technical stakeholders for understanding business needs and providing reliable judgement. Can represent the entire engineering team in such conversations.</li>
          <li>Proactively shares technical context and relevant information to business and product stakeholders to drive the right outcome for ambiguous and complex initiatives.</li>
          <li>Can present larger technical initiatives to leadership.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Communication</td>
      <td>&nbsp;</td>
      <td>
        <ul>
          <li>Knows how to debate important (risky/costly) trade-offs while also exhibiting flexibility.</li>
          <li>Is always constructive in their communication, even in the face of significant disagreement.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Communicates clearly and concisely and with the appropriate level of technical detail depending on the audience.</li>
          <li>Learns from debate and keeps an open, flexible, constructive attitude</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Assumes positive intent and models positive, empathetic communication internally.</li>
          <li>Builds trust and understanding with those beyond engineering.</li>
          <li>Can effectively present the team's work in larger forums with a non-technical audience.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Communicates unambiguously and makes their main points very clear.</li>
          <li>Encourages ideas and suggestions even when they are wrong; can constructively redirect and improve others' work.</li>
          <li>Recognizes and graciously handles topics of emotion or defensiveness.</li>
          <li>Can sell Artsy to external candidates, tailoring the message to the individual.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Discretion

<table class="data-table">
  <tbody>
    <tr>
      <td class="border-top">Discretion</td>
      <td class="border-top">Engineer 1</td>
      <td class="border-top">Engineer 2</td>
      <td class="border-top">Senior Engineer 1</td>
      <td class="border-top">Senior Engineer 2</td>
      <td class="border-top">Staff Engineer</td>
    </tr>
    <tr>
      <td>Oversight</td>
      <td>
        <ul>
          <li>Can sequence tickets assigned by the team on a regular basis with guidance and knows how to get more when work is done.</li>
          <li>Understands team mission, goals, and backlog.</li>
          <li>Can work autonomously on small tickets with minor supervision.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Self-directed, prioritizes own work on a regular basis.</li>
          <li>Knows when to ask for help and how to get unblocked.</li>
          <li>Understands business impact and rationale for their and their team's work.</li>
          <li>Generally knows where the business is going.</li>
          <li>Makes steady, well-paced progress without the need for constant input from others.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Makes tradeoffs between business impact and technical strategy in order to plan own work and guide the team's decision-making.</li>
          <li>Regarded as a reliable team member who can own complex tasks end-to-end.</li>
          <li>Has a very good understanding of the team's priorities and why they matter from a business context</li>
          <li>Demonstrates fluency with team and business OKRs.</li>
        </ul>
      </td>
      <td>&nbsp;</td>
      <td>
        <ul>
          <li>Understands the Artsy business and makes decisions based on its direction.</li>
          <li>Proactively sets short to medium-term strategic technical direction and positively impacts business direction.</li>
          <li>Not just aware of the business priorities, but actively promotes knowledge to other people about what's important for the business and how the work fits into that bigger picture.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Initiative</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>
        <ul>
          <li>Has a bias for action, preferring to act, learn, and adjust as opposed to waiting for perfect information</li>
          <li>Jumps on to outages, is not a passive bystander</li>
          <li>Persistent in the face of roadblocks, dispatches them efficiently, pulling in others as necessary.</li>
          <li>Takes initiative to identify opportunities and solve problems outside of focus area; interprets role broadly.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Trusted to basically run with things with very little supervision beyond manager checking in.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Can drive change at the org level by identifying a critical need, spinning up a practice / working group / task force and seeing to completion.</li>
          <li>Responsible for coordinating technical projects that involve other people and takes ownership to delegate out tasks and hold people accountable</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Management relationship</td>
      <td>
        <ul>
          <li>Sets the agenda during 1:1s with their manager.</li>
          <li>Proactively raises issues and obstacles to their manager.</li>
          <li>Works closely with tech lead, team mates, mentor to get unblocked.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Comes to manager with problems and potential causes.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Comes to manager with observations and constructive ideas for how to address them</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Partners with manager on engineering-wide initiatives, proactively suggests problems and potential solutions.</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Initiates discussion of meaty topics during series of 1:1.</li>
          <li>Brings constructive ideas and action plans for sign-off.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Technical Leads

Every product team at Artsy needs a technical lead. A technical lead is the point person between business, product
and engineering for that project. Their responsibilities are to help keep project management up to date, and to
keep an eye on the larger picture of the project. This role is well suited to IC who has previous experience with
the types of technical work involved. Being a technical lead on a project is a short term role as projects are
launched, and wrapped up with some regularity, making a technical lead not a job title.

See
[this document](https://www.notion.so/artsy/Artsy-Tech-Lead-Expanded-Responsibilities-Public-710ee0cd2fce47dcaa722ece80e365b2)
for an expanded set of Tech Lead Responsibilities at Artsy.

## Engineering Management

A manager’s role at Artsy balances people management responsibilities with team delivery responsibilities. As a
people manager, they are responsible for hiring, retaining, growing and managing the performance of their reports.
Additionally, they're expected to significantly impact teams' delivery by providing a strong technical contribution
and / or contribute to delivery management. As an engineering manager grows at Artsy, their scope of impact will
increase from one team to multiple teams and from managing ICs to managing ICs and other EMs.

### People Management vs Technical Leadership

- People management is orthogonal to technical leadership.
- People management is a responsibility to develop and support people.

**vs**

- Technical Leadership is an official role in a project, not a title.
- Technical leadership is a recognition of technical ability.
- Technical leadership is a responsibility to ship software.

### tl;dr

- Engineering Manager 1: Transitional from an Individual Contributor role, the main focus is learn how to manage
  people.
- Engineering Manager 2: Proficient at managing 6+ Individual Contributors and act as a delivery multiplier on
  their team.
- Senior Engineering Manager: Has meaningful delivery impact across multiple teams and starts having engineering
  org wide impact, can start learning how to manage managers.
- Director of Engineering: Proficient at managing Engineering Managers and has consistent engineering org wide
  impact.
- Senior Director of Engineering: Has consistent company wide impact.

### Evaluation criteria

- People & Business Leadership
  - Nature and level of strategy used in people direction
  - Level of analysis and judgment applied to business issues
- Impact
  - Nature and level of accountability for results
  - Level and type of impact made via decisions and people direction
- Influence
  - Nature and level of influence on projects, strategy, and internal and external contacts
  - Size and complexity of managing organizations
- Discretion
  - Nature of guidance received
  - Nature of guidance provided to others

### Engineering Management Ladder

<table class="data-table">
  <tbody>
    <tr>
      <td class="border-top">Artsy Level</td>
      <td class="border-top">Title</td>
      <td class="border-top">People & Business Leadership</td>
      <td class="border-top">Impact</td>
      <td class="border-top">Influence</td>
      <td class="border-top">Discretion</td>
    </tr>
    <tr>
      <td class="border-top">M2</td>
      <td class="border-top">Engineering Manager 1</td>
      <td class="border-top">
        <ul>
          <li>Can own a hiring pipeline (including: JD, sourcing, interview process, closing, onboarding) for a junior role with support from their manager.</li>
          <li>Can manage effectively Engineering 1, 2 and Senior Eng 1 ICs, ensure engineers have the skills needed to support their team and help them grow to the next level.</li>
          <li>Can address performance issues with support from their manager.</li>
          <li>Knows how to run 1:1s effectively; facilitates constructive development conversations and reviews; and participates in Engineering Calibration.</li>
          <li>Ensures engineers understand how the work they are doing ladders up to OKRs & wider company goals.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Ensures that their reports consistently deliver high quality work.</li>
          <li>Active contributor in a given product / platform team.</li>
          <li>Proactively monitors team health and delivery.</li>
          <li>Identifies team dysfunctions and make them visible in forum like team retrospective or the manager forum when necessary.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Builds strong ties to the rest of the engineering manager community and activity participates in manager-wide forums.</li>
          <li>Knows how to get high quality feedback from PMs, TLs and other members of their reports' teams.</li>
          <li>Identifies team staffing needs.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Will usually have 2-4 direct reports.</li>
          <li>Provides timely, actionable feedback.</li>
          <li>Get support from their manager to establish the right growth path for their reports.</li>
          <li>This is usually a transitional step into management from an IC role. This level is internal only (i.e. we won't hire into this level) and we expect EM1 to grow to EM2 within ~18m or so.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td class="border-top">M3</td>
      <td class="border-top">Engineer Manager 2</td>
      <td class="border-top">
        <ul>
          <li>Can own a hiring pipeline and drive improvements to successfully fill open roles with high quality candidates without compromising on diversity within a reasonable timeline.</li>
          <li>Effectively coaches senior engineers in a way that lines up with team goals.</li>
          <li>Knows how to help engineers identify their superpowers and increase their impact by leaning into their strengths.</li>
          <li>Addresses performance issues in a timely manner and with empathy.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Works closely with the team to meet the sprint goals; significantly accelerates the delivery and increases the impact of the team throughout the quarter.</li>
          <li>Effectively addresses team health issues both in their own and their reports' teams when need be.</li>
          <li>Leads some engineering wide improvements.</li>
          <li>Partners effectively with the tech lead (and the core team) to get their team to a higher performing state.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Develops strong collaboration with PMs and can give feedback on the teams' strategy.</li>
          <li>Facilitates cross pollination to improve quality and delivery processes.</li>
          <li>Leverages insights from XFN partners to make globally optimal staffing decisions, aligning business needs with their reports' growth opportunities.</li>
          <li>Can effectively collaborate with XFN partners to drive team wide improvements.</li>
          <li>Knows how best to leverage strong technical guidance and / or effective delivery management to accelerate team's impact.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Will usually have 6+ Eng IC Reports.</li>
          <li>Establishes the right growth path for their reports with minimal guidance from their manager.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td class="border-top">M4</td>
      <td class="border-top">Senior Engineering Manager</td>
      <td class="border-top">
        <ul>
          <li>Optimizes Eng IC hiring at scale and across pipelines.</li>
          <li>Starts managing Engineering Managers.</li>
          <li>Can own a EM hiring pipeline with support from their manager.</li>
          <li>Can grow Tech Leads to have a multiplier effect on their team.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Can navigate and lead teams through ambiguous situations, tackle complex issues, and align strategy with company priorities.</li>
          <li>Significantly accelerates the delivery and increases the impact of multiple teams.</li>
          <li>Guides teams to provide maximum, user-focused impact. Pushes team to demonstrate greater sense of urgency. Constantly experiments with ways to become more efficient.</li>
          <li>Regularly drives engineering wide improvements.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Develops strong collaboration with PDDE Leadership team members.</li>
          <li>Can successfully influence XFN partners to drive improvements across teams (and even more so the Tech Leads).</li>
          <li>Suggest optimal resource allocation given business goals and constraints.</li>
          <li>Knows how to combine technical guidance, delivery management and coaching to increase teams' impact.</li>
          <li>Proactively identifies issues across multiple teams and effectively addresses them.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Get supports from their manager to establish the right growth path for their EM reports, autonomously drives career of all their ICs reports.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td class="border-top">M5</td>
      <td class="border-top">Director of Engineering</td>
      <td class="border-top">
        <ul>
          <li>Manage and coach Engineering Managers to be effective communicators and managers of their people.</li>
          <li>Can drive and improve EM hiring pipeline.</li>
          <li>Ensures that EMs and TLs are mentoring and managing teams effectively towards results.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Proactively identifies and drives engineering wide improvements.</li>
          <li>Proactively identifies issues across teams and disciplines and effectively addresses them.</li>
          <li>Drives execution of large & complex PDDE initiatives.</li>
          <li>Is accountable for long term technical roadmap to support the business needs and unlock growth.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Drives PDDE changes in close partnership with PDDE Leadership team.</li>
          <li>Actively participates in cross-org leadership activities.</li>
          <li>Leverages network across the company to develop strong empathy for the various business needs.</li>
          <li>Can give effective feedback on and influence company strategy.</li>
          <li>Regularly delegates and increases own impact by helping others to achieve more.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Works in partnership (provides input and data) with leadership to set goals and objectives for area of responsibility.</li>
          <li>Plans the growth of their organization and scales the team.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td class="border-top">M6</td>
      <td class="border-top">Senior Director of Engineering</td>
      <td class="border-top">
        <ul>
          <li>Can manage Directors as well as EMs.</li>
          <li>Can drive Director hiring pipeline.</li>
          <li>Grows engineering leaders.</li>
          <li>Provides the right balance of direction and empowerment so EMs, TLs, and teams make decisions that are aligned with the company and engineering strategy and goals.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Guide teams and their leaders in setting aggressive OKRs and goals that maximize impact while continually improving their ability to execute more quickly, effectively, and healthily towards delivering results.</li>
          <li>Drives execution of company-wide initiatives.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Builds effective collaboration with other organizations outside of PDDE.</li>
        </ul>
      </td>
      <td class="border-top">
        <ul>
          <li>Influences future strategy and results through input to leadership teams and management of key business operations.</li>
          <li>Develops innovative ideas, solutions and market opportunities by integrating expertise in area and understanding of the business and market.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

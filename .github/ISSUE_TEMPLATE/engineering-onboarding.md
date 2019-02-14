---
name: Engineering Onboarding
about: A list of things to do to become familiar with how our engineering team operates.
---

Mentor: <PICK A MENTOR>

## Your first day

_Goal: I’ve met my manager and some members of the engineering team (over lunch at Tataki). I’ve logged into slack,
google (artsymail), 1Password, and know how to use the coffee machine._

- [ ] Add a cool pic of yourself to Slack and Jira
- [ ] Say hi in the [onboarding-eng](https://artsy.slack.com/messages/CCC37HXE0) slack channel and give BLANK a
      :wave: as they are the most recently onboarded person.

## Your first week

_Goal: I can ssh into gravity (staging and production). I can PR to a repo in Artsy’s GitHub org. I know what the
engineering teams are, what their main focuses are, and who leads them. I know my way around the Artsy site._

### First week checklist

#### Dev environment:

Keep your eye out for ways to improve our documentation -- including in this repo! A code change is great, but
improving documentation (in _whatever_ little way) with your fresh set of eyes helps us help the next person
onboarding. We emphatically do not underestimate it, this is _real_ work!

_Remember to review *all* setup scripts before executing them :)_

- [ ] [Enable two-factor authentication on your GitHub account](https://help.github.com/articles/securing-your-account-with-two-factor-authentication-2fa/) _You'll need this enabled to join the Artsy GitHub org. You can use [1Password as an authenticator](https://support.1password.com/one-time-passwords/) for 2fa._
- [ ] Get invited to the Artsy GitHub org _Ask your mentor or another engineer for help, or log into GitHub using
      the it@artsymail.com account in 1Password and add yourself._
- [ ] Set up your general dev environment (download your favorite text editor, terminal application, etc.) _If you
      don't have a favorite, ask for advice- by default the initial developer setup script below will install and
      configure vscode._
- [ ] Set up a baseline development environment:
  - [ ] _Optional:_ Some Artsy engineers have used [strap](https://github.com/MikeMcQuaid/strap) to automate an
        initial, un-opinionated setup (applying updates, activating Xcode command line tools & encryption, etc) and
        avoid some later gotchas.
  - [ ] Artsy Engineering's [initial developer setup](https://github.com/artsy/potential/blob/master/scripts/setup)
        provides a base for many artsy projects. Confirm how you want to configure it (ask questions if you're
        unsure about the options), and run it on your computer.
- [ ] Set up (some) of our most critical projects:
  - [ ] [Gravity](https://github.com/artsy/gravity)
        ([#product-platform](https://artsy.slack.com/messages/product-platform))
    - [ ] Make MongoDB fast
          [by following these steps](https://code.dblock.org/2016/06/03/very-slow-mongodb-in-development-and-test.html)
  - [ ] [Force](https://github.com/artsy/force) ([#front-end](https://artsy.slack.com/messages/front-end))
  - [ ] [Metaphysics](https://github.com/artsy/metaphysics)
        ([#front-end](https://artsy.slack.com/messages/front-end/))
  - [ ] [Volt](https://github.com/artsy/volt) ([#product-sell](https://artsy.slack.com/messages/product-sell))
  - [ ] [Reaction](https://github.com/artsy/reaction) ([#front-end](https://artsy.slack.com/messages/front-end))
  - [ ] [Emission](https://github.com/artsy/emission)
        ([#front-end-ios](https://artsy.slack.com/messages/front-end-ios/)) _For each of these, follow the
        instructions in the README. If you encounter problems, it’s not your fault! Ask in the appropriate slack
        channels (always default to #dev if you don’t know) for help and PR clarifying changes._
- [ ] While scripts run, consider installing some common engineering tools:
  - [ ] [Jasper App](https://jasperapp.io/); this will help you manage GitHub interactions.
  - [ ] [Insomnia](https://insomnia.rest/) an API client that works for graphql and REST endpoints.
  - [ ] [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
- [ ] Make a PR to an Artsy repo.
- [ ] Ask an engineer for help getting set up with an AWS account. They can find instructions on creating your
      account [here](https://github.com/artsy/potential/wiki/Platform-FAQ#add-a-new-aws-user).
- [ ] Follow the instructions in https://github.com/artsy/hokusai to get set up with hokusai.
- [ ] Successfully open a gravity staging and production console

#### Product team:

- [ ] Get access to [JIRA](https://artsyproduct.atlassian.net/) and explore each of the product team’s sprints
- [ ] Scan through the issues labeled
      [“good-first-issue”](<https://artsyproduct.atlassian.net/browse/PLATFORM-966?filter=-4&jql=labels%20%3D%20good-first-issue%20and%20status%20not%20in%20(Done)%20order%20by%20created%20DESC>)
- [ ] Read through the [project list](https://github.com/artsy/potential/wiki/Project-List)

#### Reading/Learning:

- [ ] Take a tour of Artsy. Log into [staging.artsy.net](https://staging.artsy.net) with your admin account (i.e.
      your `@artsymail.com` account) and click around without fear. Visit each of the top-nav pages. Bid in an
      auction. Make an inquiry. _Ask your mentor or others for help with any of these concepts. Have them show you
      CMS and some internal apps, like Ohm or Torque._
- [ ] Read through the following (and anything else you find interesting) from [artsy/README](https://github.com/artsy/README):
  - [ ] Besides [Artsy’s base values](https://github.com/artsy/README/blob/master/culture/what-is-artsy.md#artsy-values), the engineering team has its own additional [set of principles](https://github.com/artsy/README/blob/master/culture/engineering-principles.md). Check 'em both out!
  - [ ] Scan our list of preferred technologies. Dig in where necessary.
    - [ ] [Front-end technologies](https://github.com/artsy/README/blob/master/practices/front-end.md)
    - [ ] [Front-end iOS technologies](https://github.com/artsy/README/blob/master/practices/front-end-ios.md)
    - [ ] [Back-end/Platform technologies](https://github.com/artsy/README/blob/master/practices/platform.md)
  - [ ] [Best of Our Blog](https://github.com/artsy/README/blob/master/resources/blog.md)
  - [ ] [Internal and external tech learning resources](https://github.com/artsy/README/blob/master/resources/tech-learning.md)
  - [ ] Check out the [Engineer Workflow](https://github.com/artsy/README/blob/master/playbooks/engineer-workflow.md) for info on how we use project management software and GitHub, among other things
  - [ ] Watch some of our [Lunch & Learns](https://github.com/artsy/README/blob/master/resources/lnl.md)
- [ ] Learn how code goes from your local machine --> production. _Talk to your mentor. Have them explain the
      Gravity, Metaphysics, and/or Force/Reaction deployment process. Read about our
      [staging environment](https://github.com/artsy/gravity/blob/master/doc/StagingEnvironment.md)._
- [ ] Join the [#incidents](https://artsy.slack.com/messages/front-end-ios/) slack channel and scan through some
      recent threads
- [ ] Read the [support doc](https://github.com/artsy/README/blob/master/playbooks/support#readme) about how
      support incidents are handled by our on-call rotation
- [ ] On-call onboarding #TODO

#### Personal:

- [ ] Get coffee/tea with your mentor
- [ ] Get coffee/tea with your manager
- [ ] Keep track of questions/feedback you have as you go through this process

#### Onboarding sessions:

_Your manager should have set these sessions up for you. If they haven't, poke them kindly._

- [ ] Leads of product teams and/or practices
- [ ] PM
- [ ] Data
- [ ] Design
- [ ] On-call

## End of first week

- [ ] Check-in with your manager

## Sprint Rotation

_Goal: I understand how different product teams run sprints and what their focus is at a deep level. I’ve paired
with multiple members of the engineering team and have a sense for how I might approach tasks._

See the [doc on the sprint rotation](https://github.com/artsy/README/blob/master/onboarding/sprint-rotation.md) for
expectations/an explanation.

## Join a Team

_Goal: I feel part of a team and understand how my work contributes to making Artsy the best way to buy art. I’m
learning about Artsy’s stack and systems while also shipping code._

### Before you join:

- [ ] Tech lead/PM of product team sets you up with all relevant meetings
- [ ] If necessary, review that team’s onboarding docs
- [ ] … go!

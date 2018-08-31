---
name: Engineering Onboarding
about: A list of things to do to become familiar with how our engineering team operates.

---

## Your first day

_Goal: I’ve met my manager and some members of the engineering team (over lunch at Tataki). I’ve logged into slack, google (artsymail), 1Password, and know how to use the coffee machine._

## Your first week

_Goal: I can ssh into gravity (staging and production). I can PR to a repo in Artsy’s Github org. I know what the engineering teams are, what their main focuses are, and who leads them. I know my way around the Artsy site._

### First week checklist

#### Dev environment:

- [ ] Get invited to the Artsy Github org
  _Ask your mentor or another engineer for help, or log into github using the it@artsymail.com account in 1Password and add yourself._
- [ ] Set up your general dev environment (download your favorite text editor, terminal application, etc.) _If you don't have a favorite, ask for advice but we'll probably tell you to install vscode._
- [ ] Download [Jasper App](https://jasperapp.io/); this will help you manage GitHub interactions.  
- [ ] Read the script in https://github.com/artsy/potential/blob/master/scripts/setup for initial setup. Confirm how you want to configure it (ask questions if you're unsure about the options), and run it on your computer.
- [ ] Set up (some) of our most critical projects
  - [ ] Gravity (#platform-humans)
  - [ ] Force (#front-end)
  - [ ] Metaphysics (#front-end)
  - [ ] Volt (#product-sell)
  - [ ] Reaction (#front-end)
  - [ ] Emission (#front-end-ios)
    _For each of these, follow the instructions in the README. If you encounter problems, it’s not your fault! Ask in the appropriate slack channels (always default to #dev if you don’t know) for help and PR clarifying changes._
- [ ] Make a PR to an Artsy repo.
- [ ] Keep your eye out for ways to improve our documentation-- including in this repo! A code change is great, but improving documentation (in _whatever_ little way) with your fresh set of eyes helps us help the next person onboarding. We emphatically do not underestimate it, this is _real_ work!
- [ ] Ask an engineer for help getting set up with an AWS account. Follow the instructions in https://github.com/artsy/hokusai for getting set up with hokusai.
- [ ] Successfully open a gravity staging and production console

#### Product team:

- [ ] Get access to [JIRA](https://artsyproduct.atlassian.net/) and explore each of the product team’s sprints
- [ ] Scan through the issues labeled [“good-first-issue”](https://artsyproduct.atlassian.net/issues/?filter=-4&jql=labels%20%3D%20good-first-issue%20order%20by%20created%20DESC)
- [ ] Read through the [project list](https://github.com/artsy/potential/wiki/Project-List)

#### Reading/Learning:

- [ ] Take a tour of Artsy. Log into [staging.artsy.net](https://staging.artsy.net) with your admin account and click around without fear. Visit each of the top-nav pages. Bid in an auction. Make an inquiry. _Ask your mentor or others for help with any of these concepts. Have them show you CMS and some internal apps, like Ohm or Torque._
- [ ] Learn how code goes from your local machine --> production. _Talk to your mentor. Have them explain gravity's deployment process. Read about our [staging environment](https://github.com/artsy/gravity/blob/master/doc/StagingEnvironment.md).
- [ ] Reading: [Working with the API](https://github.com/artsy/potential/blob/master/platform/WorkingWithGravity.md)
- [ ] Scan our list of preferred technologies. Dig in where necessary.
  - [ ] [Front-end technologies](https://github.com/artsy/README/blob/master/practices/front-end.md)
  - [ ] [Back-end/Platform technologies](https://github.com/artsy/README/blob/master/practices/platform.md)
  - [ ] iOS/React Native? #TODO
- [ ] Join the #incidents slack channel and scan through some recent threads
      Read the [support doc](https://github.com/artsy/README/blob/master/playbooks/support.md)
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
_Goal: I understand how different product teams run sprints and what their focus is at a deep level. I’ve paired with multiple members of the engineering team and have a sense for how I might approach tasks._

See the [doc on the sprint rotation](https://github.com/artsy/README/blob/master/onboarding/sprint-rotation.md) for expectations/an explanation.

## Join a Team
_Goal: I feel part of a team and understand how my work contributes to making Artsy the best way to buy art. I’m learning about Artsy’s stack and systems while also shipping code._

### Before you join:
- [ ] Tech lead/PM of product team sets you up with all relevant meetings
- [ ] If necessary, review that team’s onboarding docs
- [ ] … go!

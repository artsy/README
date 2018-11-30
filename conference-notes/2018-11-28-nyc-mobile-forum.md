---
title: 2018 NYC Mobile Forum
description: "[@ashfurrow](https://github.com/ashfurrow)'s notes from discussions at NYC Mobile Forum."
---

The NYC Mobile Forum is a small, one-day, discussion-based based conference hosted by Facebook and Instagram.
Facilitators (from the NYC tech industry) pitch the audience on a discussion topic and everyone goes into breakout
rooms for an in-depth discussion. Then we regroup and the facilitators summarize the discussion. I led a discussion
at last year's conference on team culture.

I attended two sessions, which I'll summarize below. The discussions were fruitful, but the nice thing was that
everyone got to pick the discussions they were most keen on. Most of my notes are from the lens of Artsy's
Engineering team and business, so they're not complete in any sense.

(I'm really sorry but I forgot to write down the facilitators' names, I'll try to follow-up. They both did a great
job, and all the other discussion participants were friendly and insightful.)

## Building Consensus on Architectural Changes

Not sure of the exact title, but this was actually a broader conversation about building consensus around change
more generally (which is something I've been thinking a lot about lately).

The group's initial discussion focused on RFC's, which were actually popular among participants. One participant
approaches RFCs as _actual_ requests for comments: "tell me why this wouldn't work, tell me a better solution." One
person's team uses FYI's as mini-RFC's, which is cute. Another company requires RFC's to be presented at the team's
weekly lunch-and-learn.

Yet another company uses a kind of _paste tense_ RFC: an Architectural Design Record. It's _past tense_ in the
sense that it documents the rationale and thought process behind decisions that have _already been made_. Not that
there isn't room for discussion or change, but the purpose of an ADR is primarily documentation.

One participant's job was to get the rest of the engineers thinking more carefully about app performance, which
they described as (I'm paraphrasing) "getting everyone to care about something instead of doing it alone." This
sentiment relates to some Lattice goals I have...

During the conversation, I was slightly surprised by the architectural churn I heard described. Artsy has obviously
changed our own architectural decisions over time, so it wasn't the quantity of architectural changes that
surprised me, but rather the specific kinds of changes. For example: massive, years-long refactors on individual
codebases to switch from framework (maybe MVC) to another (MVVM or VIPER). I think this is a difference in the
scale of some of the teams, some of which number in the hundreds of engineers (compared with Artsy's 4-ish native
iOS engineers, across 5 apps). The commonness of this churn isn't necessarily good or bad – I just found it
interesting.

## Building an OSS Practice

I learned _so_ much from this session because the other participants were mostly from large "megacorp" companies
whose relationships with open source are _very_ different from Artsy's.

Discussion started with the recent
[npm event-stream exploitation](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident),
and the subject of security lingered throughout the remainder of conversation (including some interesting
implications of the Android permissions model). We discussed various types of "compliance" and the difficulties of
both _open sourcing_ code from and also _using open source_ within large companies. It seems very arduous; one
participant summed it up as "it gets complicated when money and lawyers get involved."

(Artsy experienced a taste of this a few years ago when we audited all the open source libraries we used for
license compliance.)

We then moved onto a discussion of
[open source by default](https://github.com/artsy/README/blob/master/culture/engineering-principles.md#open-source-by-default),
an area I had more to contribute to (read: I was talking a lot so I don't have as many notes). What interested me
the most was the discussion of the parallels between experienced engineers not wanting to open source projects
until they have "cleaned them up" and the reluctance of junior engineers to open pull requests that aren't
similarly perfect.

Finally we talked about the "non-karma benefits" of companies participating in open source communities –
particularly things that do more than make it easier to hire (this is true but it didn't resonate with the group
(but it does resonate with CEOs)). Everyone seemed to agree it's beneficial for companies to contribute to OSS, but
many expressed frustrations that large companies impede it. Primarily:

- better code modularity,
- (by extension) better code testability,
- and engineering happiness.

---

I really like the format of this conference – I had a fun time and got to hear folks from really different
backgrounds describe their feelings on topics we both care about. I didn't always agree with everyone, but learning
about and appreciating those differences was worthwhile.

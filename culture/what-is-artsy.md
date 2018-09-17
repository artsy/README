---
title: What is Artsy?
description: An externally-aimed document on what the company does
---

# Artsy in a Nutshell

If you're interested in how the engineering team is set up specifically, I'd recommend this blog post:
[Artsy's Engineering Organization Stack, 2016](http://artsy.github.io/blog/2016/03/28/artsy-engineering-organization-stack/).
I'll be quoting it in here occasionally.

Artsy is well known for our work in the open source domain, but as developers we regularly get asked "What is
Artsy?" Well, Artsy pays our wages, so we probably owe you and the company an explanation.

## Artsy Vision

> A future where everyone is moved by art every day.

## Artsy Mission

> Expand the art market to support more artists and art in the world.

## Artsy Values

Artsy has 5 core values:

### Art meets Science

We believe in bringing together the often separated worlds of art and science, emotion and logic, creativity and
analysis, the subjective and the objective. While some people feel more comfortable on one side and like to keep
distance from the other, we believe that magical things happen at the intersection of the two, and look to create
that intersection in everything we do and in the people we hire.

> **Example**: We work as engineers, but we aren't defined by that role; Artsy holds an annual
> [Salon](http://www.dictionary.com/browse/salon) and we encourage our engineers (and indeed, all our colleagues)
> to submit work. Engineer contributions to this event have included generative pixel art, interactive video game,
> photo, video, sculpture, painting, live music and cartographic pieces.

### People are Paramount

We believe in empowering each of our team members to feel like the CEO of their area of responsibility. People are
our company’s most valuable asset, and this is reflected in the high degree of responsibility and freedom we afford
every team member. This approach guides how Artsy treats our people in all other realms as well.

> **Example**: We hold a weekly team lunch with a healthy, delicious meal; after introducing any new colleagues,
> our People Ops team encourages everyone to sit and eat with people they don't normally get to talk to.

### Quality Worthy of Art

We strive to be a platform that is worthy of presenting the world’s most beautiful and culturally significant
objects to all of humanity. By choosing to work at Artsy, we accept responsibility for this endeavor, and our work
demonstrates a level of quality and intention that is worthy of the artists and people we serve.

> **Example**: We have opted to not release products that are ready to ship because of they would not be up to par
> based on externalities we can't control. For example we choose not to ship an Apple Watch app because platform
> contraints would have made the bidding experience frustrating.

### Positive Energy

We believe that art is fundamentally a positive force that can allow people to feel more inspired, connected, and
present. Sadly, today many people’s perception of the art world is associated with negative feelings, such as
exclusion, confusion, or judgment. We actively work to counteract these negative feelings by making our users’
interactions with art as inclusive and positive as possible.

> **Example**: We begin our weekly engineering standups with "props"; everyone is encouraged to recognize and
> celebrate contributions that team members have made since the last standup.

### Openness

We believe that openness allows for fuller self-expression and for art to be more fully experienced. We believe
that being truly open in our communication—both giving and receiving—leads to more informed decisions and more
productive relationships, which leads to better business.

> **Example**: We encourage our engineering team members to be open about asking for help; our weekly stand-ups
> have a 'requests for pairing' where we encourage folks to ask for help on anything they've been struggling with.

## What does this mean in practice?

We map large aspects of the Art world in our apps and websites: [Shows](https://www.artsy.net/shows),
[Galleries](https://www.artsy.net/galleries), [Fairs](https://www.artsy.net/art-fairs),
[Auctions](https://www.artsy.net/auctions), [Museums & Institutions](https://www.artsy.net/institutions).

> Artsy is the global platform for discovering and collecting art. Artsy partners with leading museums,
> international galleries, auction houses, and art fairs to create the world’s largest marketplace for art. Artsy’s
> technology enables the growth of the entire art market by effectively connecting supply and demand at a global
> scale. With 1,800+ partners across 90+ countries and the most-read art publication online, Artsy empowers a
> global audience to learn about, discover, and collect art. Launched in 2012, Artsy is headquartered in New York
> City with offices in London and Berlin.

Currently Artsy is over 200 people, with ~30 of them being the Engineering team.

### How do we make money?

From
[Artsy's Engineering Organization Stack, 2016](http://artsy.github.io/blog/2016/03/28/artsy-engineering-organization-stack/):

> Artsy has 3 businesses: _Listings_, _Auctions_ and _Content_.

> **Listings**: Artsy [gallery partners](https://www.artsy.net/galleries) pay a flat monthly subscription fee to
> list an unlimited number of artworks for sale, plus a host of other benefits. They do not pay a commission fee on
> sales made through Artsy. We have
> [announced 1800 paying customers](theverge.com/2017/7/18/15983712/artsy-fine-art-galleries-online-auction-sales).

> **Auctions**: In 2015 Artsy expanded into hosting commercial auctions on our platform. Much like our Listings
> business, we work with top auction houses. The latter pay commissions from sales. Check out
> [current auctions on Artsy](https://www.artsy.net/auctions).

> **Content**: We are also working on making Artsy a go-to platform for brands to co-create and distribute content
> that engages a global arts and culture audience. In 2015 we debuted our first sponsored content feature on Artsy,
> a
> [series of 11 educational short films about the Venice Biennale in partnership with UBS](https://www.artsy.net/venice-biennale-2015)
> (if anything,
> [watch this amazing video](https://www.artsy.net/article/artsy-editorial-behind-the-venice-biennale-2015-a-short-history-of-the-world-s-most-important-art-exhibition)).

### How does the Engineering team work?

We've documented what we consider to be our
[Engineering principles](https://github.com/artsy/README/blob/master/culture/engineering-principles.md), which help
differentiate our team from other Engineering orgs.

If you're interested in what we've got up to since 2011? Check out the
[highlights](https://github.com/artsy/README/blob/master/culture/highlights.md).

### How/why do you produce so much OSS?

We bake it into our engineering team culture. I'll quote the
[Artsy team culture post on objc.io](https://www.objc.io/issues/22-scale/artsy/)

> The Artsy mobile team is small, especially in contrast to the other teams in this issue of objc.io. Despite this,
> we’re notable for our impact on the community. Members of our iOS development team are — and have been — involved
> in almost all major open-source projects in the Cocoa community.

...

> There are well-understood reasons to reduce the size and complexity of any given codebase. By writing small,
> well-tested components, we increase the overall stability and cohesion of our apps. Additionally, by writing
> reusable libraries, we reduce effort when building multiple apps.

...

> Dividing our applications into small, reusable pieces has a lot of technical advantages, but it also allows us to
> create distinct owners for the different components. When we do this, we need to make sure that we consciously
> spread knowledge to other team members

...

> People often ask why we operate in the open as we do. We’ve already discussed our technical motivations, as well
> as the sense of purpose it gives individual team members, but honestly, working in the open is just smart
> business. For example, we’re working on a single open-source library to handle authentication with our API. Not
> only does this make writing apps against our API easier for us, but it makes it easier for everyone else. Huzzah!

...

> We do know that some of our competitors use our code, because they offer their fixes back to us. We do the same.
> In reality, the biggest challenge to a business open sourcing a project is the obligation of stewardship. This
> responsibility is mostly a matter of working with people and needs to be managed correctly — especially if a
> project gains enough popularity. Most projects don’t get large enough for their stewardship to become burdensome.

...

> The extra time necessary to create and maintain open-source code often helps us unwind and relax from our
> day-to-day tasks, and over-communicating on GitHub has helped the remote members of our team.

We take the time to educate the rest of the team about why OSS is important for us, ranging
[from company videos](http://code.dblock.org/2015/02/09/becoming-open-source-by-default.html) to in-house training
sessions on GitHub. We work hard on this.

To quote [@dblock](http://code.dblock.org)'s post on
[OSS by Default](http://code.dblock.org/2015/02/09/becoming-open-source-by-default.html):

> To quote Scott Berkun’s A Year Without Pants: attributes of culture don’t arrive by some technique sprinkled
> around the company years after it started. This applies to organizations and individuals alike - I didn’t start
> my Engineering career with open-source, but my thinking has evolved, naturally, to a point where I was
> enthusiastic about it, and then to a place where I was doing it every day.

...

> Nobody ever told me that I must write open-source software. I have written and continue to write mountains of
> closed-source code and create more closed-source projects every day. However, as many engineers, I am motivated
> to create smaller, nimbler, reusable and well-tested components. Well designed libraries reduce the size of any
> application and help keep code dry. Well documented systems are easier to use by new team members. Well tested
> ones are faster to add features to and don’t break as often. By default, I contribute to other people’s generic
> open-source solutions to save time and money by not reinventing the wheel. Taking this further, I spend
> significant amount of time extracting non-domain-specific code into new or existing open-source libraries,
> reducing the footprint of the proprietary applications I work on.

We consider working in OSS the best way to be competitive.

### Do you like Art?

Aye.

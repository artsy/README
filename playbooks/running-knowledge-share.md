---
title: How to run a Knowledge Share
description: How to handle the people process for Knowledge Shares
---

# Running a Knowledge Share

Hello Artsy employee or curious outsider! This document outlines how to run our [knowledge shares][event]. The
process of planning a KS generally goes through the following steps. The planning process is
managed in the [Knowledge Shares GitHub project][project].

If you're interested in speaking at one of our knowledge shares, you can find out all about [it here][event]

- **Ideas**: These can be either people we'd like to present or ideas that we'd like to find speakers for – either Artsy employees or external speakers we'd like to invite in.
- **In Conversation**: We have reached out and are in talks with someone specific to present a KS
- **Scheduled**: A date has been confirmed with the speaker and they have received a calendar event invitation.
- **Add to README/Google Drive**: The presentation is finished but needs to be documented ([see below][after]).
- **Done**: It's done!

Read on for more specifics.

## Suggesting a Presenter

Are you an Artsy employee? Do you want to suggest someone to present a Knowledge Share? Great!

- Go to the #dev-knowledge-share Slack channel and let us know
- Add a card to the [project][project] in the appropriate column

We encourage you to follow the rest of this guide. You've got this! And if you need help, or would prefer someone
take over from you, just let the Slack channel know.

## Handling a Referral

Sometimes you'll get an introduction to a speaker from a colleague, passing the baton to you to organize the actual
event. Just follow these steps:

- Say thanks!
- Pass along the link to the [knowledge-share.md][event].
- Add a card to the "In Conversation" section of the [Knowledge Share project][project], or move the existing card
  there from "Ideas".
- Discuss what topic makes sense.
- Pick a date and move their card to the "Scheduled" column (and add the date to the card title). Send them a
  calendar invitation.

## Running a Knowledge Share

### The Monday Before

- Send a note to Camille and Katherine to be included in the weekly newsletter.
- Make some noise on Slack to get folks excited to come on Thursday.

### The Day Before

- Double-check with the speaker that they're still available. Make sure to thank them again for their time.
- Add the speaker to [Envoy](https://dashboard.envoy.com).

### The Day Of

If this is an IRL presentation from an external speaker, make sure there is a Zoom room booked and

- [ ] TV is turned on.
- [ ] Zoom iPad is on and plugged in.

Receive our guest (they should have been asked to arrive at 15 minutes early). While they're getting set up, offer some water. Get them set up on the Zoom.us meeting and remind them that you'll
take them out for lunch afterward.

Ten minutes beforehand, send an `@here` reminder in the #dev (also post in #general if applicable). Give folks a few minutes past to show up, but don't hold the show up waiting for them.

Immediately before you present the speaker, hit the record button in Zoom.us and it'll ask you for your email address.

### Afterward

Right after the talk, ask the speaker for their slides. Check to make sure it's okay for us to thank them on
Twitter. Then take the speaker and a few folks out to lunch. Tataki is never a bad choice in NYC. Make sure to expense
this meal.

Later, Zoom.us will email you the video recording. Upload the video and the slides to the [Google Drive archive][google_drive_presentation_archive] and post a link to Slack. Use the following convention to name the
subfolder:

```
YYYY-MM-DD <presentation title> with <speaker name>
```

Send a pull request to the [Knowledge Share docs][event] that adds the speaker to the list. Make sure to thank the
speaker again over email, offer a copy of the video, and reiterate that we owe them a talk now.

If the talk was given by an Artsy colleague, ask them if it would be appropriate to upload to YouTube for public
viewing. Maybe even a quick [blog post][blog].

If the talk was given by someone outside Artsy, log into the [@ArtsyOpenSource twitter account][twitter]
(credentials are in 1Password) to post a tweet thanking them (as long as it's okay with them).

Move the card to the "Done" column. Nice work!

[google_drive_presentation_archive]: https://drive.google.com/drive/folders/1X8w7iFbdeVwi6v_xWLWfQdeJ81iewYWB?usp=sharing
### Troubleshooting

##### Connecting to the screen

- For Artsy staff, they should be on the staff WiFi and connect via AirPlay to "27 - Classroom"
- For external folk:

  - They can join the zoom url [https://zoom.us/my/artsyclassroom](https://zoom.us/my/artsyclassroom). You can also
    email the zoom URL to the speaker from the iPad.
  - You can run their slides on your computer

##### The zoom isn't available

- Make sure the Mac mini behind the screen is turned on
- Make sure the Zoom iPad has power

##### The screen does not show the zoom meeting

- Check the TV is on
- Check that it's on the right input source (HDMI)
- Go behind the TV, and pull out the power and re-connect it

##### Audio problems

- Check the revolabs microphone has green lights
- Check that the mic is plugged in (under the table)
- Check the zoom iPad to see that it's mic is set up correctly

[after]: #Afterward
[blog]: https://github.com/artsy/artsy.github.io
[project]: https://github.com/artsy/README/projects/1
[event]: ../events/knowledge-share.md
[twitter]: https://twitter.com/ArtsyOpenSource

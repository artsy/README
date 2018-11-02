---
title: Podcast Setup
description: Setup docs for recording an epsiode of the podcast.
---

### Podcast Setup

Ideally you have three people: two people talking, and one person managing the recording.

- Sound board config
  - To Main Mix button has to be up
  - Pan set to opposite channels for both mics - Use mic inputs 1 and 2
- GarageBand config - Use the USB CODEC input - Track -> Configure Track Header - Enable recording (this will
  expose the _option_ to record multiple tracks) - Make sure both tracks are enabled (blinking red light while
  recording) - Disable count-in and metronome
- Computer problems? - Run this to restart CoreAudio and then restart GarageBand: -
  `ps ax | grep -i coreaudio | awk {'print $1'} | tail -r | tail -n +2 | xargs sudo kill -9`

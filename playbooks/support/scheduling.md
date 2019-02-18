# Scheduling

The schedule is configured on the [Engineering On-Call calendar](https://calendar.google.com/calendar/embed?src=artsymail.com_nolej2muchgbpne9etkf7qfet8%40group.calendar.google.com&ctz=America%2FNew_York). Trading shifts (because of vacations,
obligations, etc.) is encouraged as long as the calendar is kept up-to-date. Please address any scheduling issues
as early as possible.

A month before the next round of on-call is slated to begin (can check when the current round ends to verify this
timeline), we being scheduling the next round.

[engineering on-call calendar]:
  https://calendar.google.com/calendar/embed?src=artsymail.com_nolej2muchgbpne9etkf7qfet8%40group.calendar.google.com&ctz=America%2FNew_York

## Steps for Scheduling On-Call

1. Generate a list of current engineers. This should include everyone who started before the next round is supposed
   to begin. (Can use team.artsy.net as a reference)
2. Clone the
   [Notion template](https://www.notion.so/artsy/Template-On-Call-Scheduling-20079a4d56634b29bebfa80a6813c800) and
   generate a list of shift dates

- Dates should stagger where possible (so shifts go Monday --> Monday and Wednesday --> Wednesday)
- If the round covers the December/January holidays, segment the period into 2-day shifts. Tag them as "Holiday
  Volunteer Shift"
- Add tags for shifts that cover notable holidays (i.e. "American Thanksgiving")

3. Identify any exceptions/special cases and address them. These may include:

- People who doubled-up the last round (should be left out of this round)
- People who have very recently started (as a courtesy, you can ask them to sign up for a shift before opening it
  up for the group, as it is likely beneficial for them to choose a timeslot towards the end of the round)

4. Put a note in the #dev channel announcing that the shifts are open for signup. Give the team a week to
   self-select. This may look something like:

```
:alert: Hello team! It's time to sign up for the next round of on-call, which begins on January 10. Please visit the Notion doc here: <link> which has instructions on how to sign up. Please do so between now and **next Monday, December 17**. After that time I will randomly select shifts. Note relevant tags (notable holidays, the Holiday Volunteer Shifts). Thank you! :tada: :tada:
```

5. Remind the team to sign up during open standup, and if necessary on slack.
6. After announcing that signup is closed, assign the remaining people to shifts randomly. It's helpful to check
   the OOO calendar to avoid scheduling over someone's vacation.
7. Create Google calendar events for the shifts:

- Create a week-long event on the Engineering On-Call calendar
- Invite the on-call person
- Name the event "<their name> On-Call"
- Check the box so the guest can modify the event
- Make sure to say "yes" for sending email invites
- I usually create one this way and then duplicate it so all of the settings remain the same

8. Double-check that the calendar invites look okay, then announce in slack that scheduling has finished. Something
   like:

```
Hi team! Just finished creating calendar invites for this round of on-call. If something looks wrong, please let me know! Soon I will be deleting the Notion doc so we can use this as the source of truth. Note that you can still switch shifts if something comes up!
```

9. After a couple of days, delete the Notion doc to avoid confusion.
10. Schedule a reminder to repeat this process for the next round.

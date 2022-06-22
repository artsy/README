# Use PRs instead of issues for RFCs

We already have a [playbook](../playbooks/rfcs.md) for RFCs. We used to use GitHub [issues](https://github.com/artsy/README/issues?q=is%3Aissue+is%3Aclosed), but this approach has two drawbacks: 

- it's impossible to add inline or threaded comments to an issue, and the conversation can become very hard to follow
- it's impossible to tell from the list of closed issues which RFCs were accepted, and which rejected

Changing our process to use PRs that create documents within an RFC directory solves these two problems.

## Resolution
We decided to do it. 25% of the engineering team actively approved of this change; no-one disapproved.

## Level of Support
1: Overwhelming positive feedback.

## Next Steps
We will use PRs for all RFCs from now on. I have updated the [RFC Playbook](/artsy/README/blob/main/playbooks/rfcs.md) accordingly.

#### Exceptions
RFCs in individual repos should continue to use Issues, unless the team decides to add an rfc directory to a repo and start storing docs there.
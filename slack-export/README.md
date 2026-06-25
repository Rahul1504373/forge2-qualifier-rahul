# Slack Evidence Folder

This folder stores submission evidence for the multi-agent workflow used in this qualifier.

## Status Tracker

- [ ] Human prompt captured in `#sprint-main`
- [ ] Hermes plan/decomposition captured
- [ ] Hermes -> OpenClaw handoff captured in `#agent-coder`
- [ ] OpenClaw report captured (What I Did / What's Left / What Needs Your Call)
- [ ] Autonomous Hermes run captured in `#agent-log`
- [ ] Slack API round-trip evidence captured (`auth.test`, `chat.postMessage`, `conversations.history`)

## Required Artifacts

Add files that prove the following:

1. Human task prompt in `#sprint-main`
2. Hermes plan/decomposition
3. Hermes -> OpenClaw handoff in `#agent-coder`
4. OpenClaw report containing:
- What I Did
- What's Left
- What Needs Your Call
5. Autonomous Hermes run output in `#agent-log`
6. Slack API round-trip command proof (`auth.test`, `chat.postMessage`, `conversations.history`)

## Suggested Filename Convention

Keep files in chronological order:

- `01-round-trip-auth-test.png`
- `02-sprint-main-prompt-and-plan.png`
- `03-agent-coder-handoff.png`
- `04-openclaw-report.png`
- `05-agent-log-autonomous-run.png`
- `06-slack-api-curl-output.txt`

## Quick Capture Commands

```bash
curl -sS -H "Authorization: Bearer $SLACK_BOT_TOKEN" https://slack.com/api/auth.test
curl -sS -H "Authorization: Bearer $SLACK_BOT_TOKEN" -H "Content-type: application/json" \
  -d '{"channel":"#agent-log","text":"forge2 evidence ping"}' \
  https://slack.com/api/chat.postMessage
curl -sS -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  "https://slack.com/api/conversations.history?channel=$SLACK_CHANNEL_ID&limit=20"
```

Save command output or screenshots in this folder and reference them from the root README and section review notes.

## Notes

- Use UTC timestamps in filenames where possible to make judging sequence clear.
- Prefer PNG screenshots for UI and TXT for CLI/API output.

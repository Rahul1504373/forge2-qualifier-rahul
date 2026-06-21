# Final Lock-In Replacement Templates

Use these exact blocks to replace the remaining placeholders with your real data.

## 1) README.md live URLs

Replace the two lines under `## Live URL` with:

- Frontend: https://YOUR-FRONTEND-DEPLOYMENT-URL
- API: https://YOUR-BACKEND-API-BASE-URL

Example API base URL format:
- https://your-api-host.example.com/api

## 2) agent-log.md unedited transcript block

Replace everything under `## Raw log transcript` with real raw excerpts like this:

```
[2026-06-21 10:04] #sprint-main Rahul:
"Build Forge2 qualifier Kanban with Hermes + OpenClaw and keep it handbook-compliant."

[2026-06-21 10:06] #sprint-main Hermes:
"Plan:\n1) Validate repo requirements\n2) Implement frontend/backend\n3) Run strict checks\n4) Produce final report"

[2026-06-21 10:10] #agent-coder Hermes:
"OpenClaw task:\n- Build Kanban UI and Laravel API\n- Implement boards/lists/cards/tags/members\n- Return: What I Did / What's Left / What Needs Your Call"

[2026-06-21 10:38] #agent-coder OpenClaw:
"What I Did: ...\nWhat's Left: ...\nWhat Needs Your Call: ..."

[2026-06-21 10:49] #agent-log Hermes (autonomous run):
"Autonomous run started from memory trigger. Completed checklist sweep and posted status."
```

Rules:
- Keep messages unedited and chronological.
- Include channel names and timestamps if available.
- Do not paraphrase agent outputs.

## 3) video/README.md walkthrough link

Replace current content with:

```
# Walkthrough Video

- Loom: https://www.loom.com/share/YOUR_REAL_VIDEO_ID

Coverage in video:
1. Slack loop in action
2. Hermes memory recall and skill trigger
3. Kanban app running (board -> list -> card, move, tags, assignee, due date)
4. Live URL opening successfully
```

## 4) slack-export evidence files to add

Add real screenshots or exports into `slack-export/` with names like:

- 01-slack-auth-test.png
- 02-human-to-hermes-plan.png
- 03-hermes-to-openclaw-handoff.png
- 04-openclaw-structured-report.png
- 05-hermes-autonomous-run.png
- 06-roundtrip-chat-post-and-history.png

Minimum content expected in those captures:
- `auth.test` success
- `chat.postMessage` success to target channel
- `conversations.history` showing posted message
- Human prompt in `#sprint-main`
- Hermes handoff in `#agent-coder`
- OpenClaw report with 3 required sections
- Hermes autonomous run proof in `#agent-log`

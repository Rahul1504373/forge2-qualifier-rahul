# Slack Evidence Folder

This folder now contains actual transcript exports and command outputs used in the submission.

## Evidence Inventory

- 01-slack-auth-test.txt
- 02-human-to-hermes-plan.txt
- 03-hermes-to-openclaw-handoff.txt
- 04-openclaw-structured-report.txt
- 05-hermes-autonomous-run.txt
- 06-roundtrip-chat-post-and-history.txt
- 07-hermes-status-and-targets-2026-06-25.txt
- 08-hermes-send-ping-2026-06-25.txt
- 09-hermes-config-2026-06-25.txt
- 10-backend-health-2026-06-26.txt
- 11-openclaw-live-check-send-2026-06-26.txt
- 12-openclaw-reply-check-2026-06-26.txt
- 13-hermes-session-persistence-2026-06-26.txt
- 14-slack-scope-and-membership-blocker-2026-06-26.txt
- 15-hermes-memory-recall-2026-06-26.txt

## Coverage

1. Human task prompt in #sprint-main: captured.
2. Hermes plan/decomposition: captured.
3. Hermes -> OpenClaw handoff in #agent-coder: captured.
4. OpenClaw structured report (What I Did / What's Left / What Needs Your Call): captured.
5. Autonomous Hermes run message in #agent-log: captured.
6. Slack/API messaging proof: captured via auth/history exports and Hermes CLI send/status outputs.
7. Backend live health status at submission time: captured (HTTP 200).
8. OpenClaw liveness ping delivery evidence: captured (Hermes send JSON success + Slack message id).
9. OpenClaw reply readback blocker: captured (`not_in_channel` on thread history API from current workspace token).
10. Hermes cross-session persistence evidence: captured (session IDs listed across prior days).
11. Slack scope/membership blocker root-cause: captured (`missing_scope` and channel membership errors from Hermes logs).
12. Hermes memory recall evidence: captured from prior session export with a direct remembered name response.

## Notes

- All transcript files use plain text so they can be diffed and reviewed quickly.
- The 2026-06-25 files were generated in this workspace during final remediation.

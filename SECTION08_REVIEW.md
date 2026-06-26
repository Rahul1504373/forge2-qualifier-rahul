# Section 08 Repo Readiness Review (Strict)

Scope: handbook section 08 "What your repo MUST contain".

## Required item checks
- [x] README.md exists and includes app description + model routing + local run instructions: README.md
- [x] ARCHITECTURE.md exists and describes brain/hands roles + Slack channels + model routing: ARCHITECTURE.md
- [x] agent-log.md exists: agent-log.md
- [x] slack-export folder exists: slack-export/README.md
- [x] skills/<name>/SKILL.md exists: skills/status-report/SKILL.md
- [x] openclaw.json exists: openclaw.json
- [x] .env.example exists and no real secrets committed: .env.example
- [x] App directories exist: backend/ and frontend/
- [x] video note exists: video/README.md

## Strict blockers to clear before submission
- [x] README live frontend/API behavior is documented with non-placeholder production API base handling.
- [x] README live API URL is real and reachable.
- [x] agent-log.md contains raw chronological transcript excerpts.
- [x] video/README.md now contains the actual walkthrough URL.
- [x] slack-export includes committed evidence exports for:
  - Human -> Hermes plan in #sprint-main
  - Hermes -> OpenClaw handoff in #agent-coder
  - OpenClaw structured report in #agent-coder
  - Hermes autonomous run proof in #agent-log
  - Slack round-trip curl proof

## Notes
- Repository URL verified from git remote:
  - https://github.com/Rahul1504373/forge2-qualifier-rahul
- Do not fabricate evidence; placeholders must be replaced with real outputs to avoid disqualification risk.

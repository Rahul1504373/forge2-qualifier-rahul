# Forge 2 Qualifier Strict Checklist

## 1) Free-stack and setup
- [x] React frontend present in frontend/
- [x] Laravel backend present in backend/
- [x] OpenClaw config present in openclaw.json (secrets not committed)
- [x] Hermes skill present in skills/status-report/SKILL.md
- [x] Hermes runtime config present in hermes.config.json
- [ ] Runtime validated on PHP 8.2+ (current environment is PHP 8.1.2; upgrade still needed to match handbook)

## 2) Required app features
- [x] Boards -> Lists -> Cards structure implemented
- [x] Move cards between lists implemented
- [x] Card title + description editing implemented
- [x] Tags/labels implemented
- [x] Member assignment implemented
- [x] Due date with overdue visual flag implemented

## 3) Handbook-required repo artifacts
- [x] README.md present with run instructions and model routing
- [x] ARCHITECTURE.md present
- [x] agent-log.md present
- [x] slack-export/ folder present
- [x] skills/<name>/SKILL.md present
- [x] openclaw.json present
- [x] .env.example present
- [x] backend/ + frontend/ present
- [x] video/ note present

## 4) Validation commands
- [x] Frontend: npm run lint
- [x] Frontend: npm run build
- [x] Backend: php artisan migrate --force
- [x] Backend: php artisan test

## 5) Security and submission hygiene
- [x] No real tokens found in key config/docs files
- [x] .gitignore updated for env files and local environments
- [x] Replace placeholders before submit:
  - README live URLs
  - video/README.md walkthrough link
  - agent-log.md raw transcript
  - slack-export screenshots/exports

## 6) Slack loop evidence (must be real, not templated)
- [x] Human -> Hermes plan in #sprint-main
- [x] Hermes -> OpenClaw handoff in #agent-coder
- [x] OpenClaw structured report in #agent-coder
- [x] Hermes autonomous run proof in #agent-log
- [x] Slack round-trip curl proof

## 7) Environment notes from final validation pass
- [x] Composer installation unblocked by moving backend vendor to WSL tmp via symlink at backend/vendor -> /tmp/forge2-backend-vendor
- [ ] D: drive remains nearly full; keep enough free space before final packaging/deploy

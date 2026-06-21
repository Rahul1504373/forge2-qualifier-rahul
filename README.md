# Forge 2 Qualifier Submission

Tiny Trello-style Kanban built for Forge 2 Edition 1 qualifier with a free-stack, two-agent workflow.

## GitHub Repository
- https://github.com/Rahul1504373/forge2-qualifier-rahul

## Live URL
- Frontend: ADD_YOUR_VERCEL_OR_NETLIFY_URL
- API: ADD_YOUR_RENDER_OR_RAILWAY_URL

## What this app does
- Create and switch boards.
- Create lists inside a board.
- Create cards with title and description.
- Move cards between lists.
- Add tags/labels to cards.
- Add board members and assign cards.
- Set due dates and visually flag overdue cards.

## Stack
- Frontend: React + Vite
- Backend: Laravel 10 + SQLite
- Agent setup: Hermes (brain) + OpenClaw (hands) + Slack loop
- Free model routing:
  - Hermes planning: Groq openai/gpt-oss-120b
  - OpenClaw coding: Ollama qwen2.5-coder

## Project structure
- backend/: Laravel API
- frontend/: React UI
- skills/status-report/SKILL.md: reusable Hermes skill
- ARCHITECTURE.md: brain/hands responsibilities and routing
- agent-log.md: unedited agent transcript evidence
- slack-export/: Slack screenshots or exports
- video/: short walkthrough link and notes

## Local setup

### 1) Clone and env
1. Copy .env.example to .env in the repo root for local agent tooling.
2. Copy backend/.env.example to backend/.env.
3. Create SQLite file:
	- backend/database/database.sqlite
4. In backend/.env, set:
	- DB_CONNECTION=sqlite
	- DB_DATABASE=/absolute/path/to/backend/database/database.sqlite

### 2) Run backend
1. cd backend
2. composer install
3. php artisan key:generate
4. php artisan migrate
5. php artisan serve

Backend runs at http://127.0.0.1:8000

### 3) Run frontend
1. cd frontend
2. npm install
3. Create frontend/.env with:
	- VITE_API_BASE_URL=http://127.0.0.1:8000/api
4. npm run dev

Frontend runs at http://127.0.0.1:5173

## API endpoints (implemented)
- GET /api/boards
- POST /api/boards
- POST /api/boards/{board}/lists
- POST /api/boards/{board}/members
- POST /api/cards
- PATCH /api/cards/{card}

## Evidence checklist for judges
- Slack loop screenshots in slack-export/
- Autonomous Hermes run screenshot in slack-export/
- Slack round-trip curl output screenshot in slack-export/
- Unedited transcript in agent-log.md
- 60-90 sec walkthrough link in video/README.md

## Notes
- This repository intentionally excludes secrets; use placeholder values in .env.example.
- Replace live URL placeholders and evidence placeholders before final submission.

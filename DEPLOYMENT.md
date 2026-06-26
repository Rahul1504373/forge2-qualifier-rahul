# Deployment Guide: Vercel Frontend + Render Laravel Backend

This repository is now prepared for:
- Frontend deployment on Vercel from frontend/
- Backend deployment on Render from backend/ using render.yaml

## 1) Deploy Laravel backend to Render

1. Push your latest branch to GitHub.
2. In Render, choose New + Blueprint.
3. Connect this repository and deploy using render.yaml in the repo root.
4. In the created backend service, set APP_KEY manually:
   - Generate with local command: cd backend && php artisan key:generate --show
   - Paste the full output value into Render env var APP_KEY
5. Trigger Manual Deploy -> Deploy latest commit.
6. Verify health:
   - Open https://forge2-kanban-api.onrender.com/api/health (should return `status: ok`)
   - Open https://forge2-kanban-api.onrender.com/api/boards

Notes:
- Startup script backend/render-start.sh auto-creates SQLite DB and runs migrations at container start.
- render.yaml sets `DB_CONNECTION=sqlite` and `DB_DATABASE=/tmp/forge2-database.sqlite` (a writable path on Render).
- Update APP_URL in render.yaml to your actual Render hostname if your service name differs.

## 2) Deploy frontend to Vercel

1. In Vercel, click Add New -> Project.
2. Import this same GitHub repository.
3. Set Root Directory to frontend.
4. Build settings are already defined by frontend/vercel.json.
5. Add environment variable in Vercel project settings:
   - VITE_API_BASE_URL=https://forge2-kanban-api.onrender.com/api
6. Deploy.

## 3) Post-deploy lock-in updates

After both deployments succeed, update:
- README.md live URLs section with your real Vercel and Render links.
- frontend/.env locally if you want to test against hosted backend.

## 4) Quick verification checklist

- Backend URL responds: GET /api/health and GET /api/boards
- Frontend loads from Vercel URL
- Frontend can create board/list/card through Render API
- No CORS error in browser console

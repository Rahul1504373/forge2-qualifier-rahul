# Frontend (React + Vite)

This frontend supports two modes:
- API mode (recommended): uses the Laravel backend through `VITE_API_BASE_URL`
- Local demo mode: uses in-memory seed data when `VITE_API_BASE_URL` is not set

## Environment

Create `frontend/.env`:

```env
VITE_API_BASE_URL=https://forge2-kanban-api.onrender.com/api
```

For local backend development, override with:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

For production (Vercel), keep `VITE_API_BASE_URL=https://forge2-kanban-api.onrender.com/api`.

## Local run

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open the printed local URL (usually `http://127.0.0.1:5173`)

## Expected API contract

- `GET /boards`
- `POST /boards`
- `POST /boards/{board}/lists`
- `POST /boards/{board}/members`
- `POST /cards`
- `PATCH /cards/{card}`
- `GET /health`

## Behavior details

- The app auto-loads boards on mount in API mode.
- If API calls fail, the UI falls back to local demo data and shows an error banner.
- The "Sync API" button can be used for manual refresh.

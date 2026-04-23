# StellzOgeVentures (Monorepo)

This repo contains:

- `client/` — React + Vite frontend
- `server/` — Node.js + Express + MongoDB backend

## 1) Install MongoDB

Pick one option:

### Option A: MongoDB Atlas (no local install)

1. Create a free cluster at https://www.mongodb.com/atlas
2. Create a database user + allow your IP
3. Set `MONGODB_URI` in your server environment (include a database name in the path, e.g. `/stellzogeventures`)

Security note: never paste your full connection string publicly (it contains a password). If you already shared it, rotate that DB user password in Atlas.

### Option B: MongoDB Community Server (local)

- Install with `winget` (recommended):
  - `winget install -e --id MongoDB.Server`
- Or download the installer from https://www.mongodb.com/try/download/community

After installing locally, start MongoDB (Windows service):

- `net start MongoDB`

Quick check (optional):

- `mongosh "mongodb://127.0.0.1:27017/stellzogeventures"`

Then set `MONGODB_URI=mongodb://127.0.0.1:27017/stellzogeventures` in `server/.env`.

## 2) Install dependencies

From the repo root:

- `npm install`

## 3) Configure environment

For production, set these environment variables in your hosting platform (Render/Railway/Fly/Elastic Beanstalk/etc):

- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_ORIGIN`

For local development, create `server/.env` (this file is gitignored) with the same variables.

## 4) Run dev

From the repo root:

- `npm run dev`

Client runs at `http://localhost:5173`.
Server runs at `http://localhost:5000`.

## API

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (requires `Authorization: Bearer <token>`)

## Deploy on Render

### 1) Deploy the backend (Web Service)

In Render:

1. **New** → **Web Service** → connect your GitHub repo
2. **Root Directory**: `server`
3. **Environment**: Node
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `npm start`

Set these **Environment Variables** in Render:

- `NODE_ENV=production`
- `PORT=5000` (Render may set `PORT` automatically; keep it if you want)
- `MONGODB_URI=...` (MongoDB Atlas SRV URI, include a DB name in the path)
- `JWT_SECRET=...` (long random string)
- `CLIENT_ORIGIN=...` (your frontend URL on Render, e.g. `https://your-client.onrender.com`)

After deploy, confirm:

- `https://YOUR_SERVER_URL/api/health`

### 2) Deploy the frontend (Static Site)

In Render:

1. **New** → **Static Site** → connect the same repo
2. **Root Directory**: `client`
3. **Build Command**: `npm install && npm run build`
4. **Publish Directory**: `dist`

Set this **Environment Variable** in Render:

- `VITE_API_BASE_URL=https://YOUR_SERVER_URL/api`

Then redeploy the static site.

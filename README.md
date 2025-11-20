# TinyLink — URL Shortener (GitHub-ready)

This repository contains a full TinyLink URL shortener app (backend + frontend) designed to satisfy the take-home assignment requirements.

## Structure
```
tinylink_github_ready/
  backend/        # Node + Express backend (Mongoose)
  frontend/       # Vite + React + TypeScript + Tailwind frontend
  .github/workflows/ci.yml  # Basic CI (install & build)
  README.md
  LICENSE
```
## Quickstart (locally)

### Backend
```bash
cd backend
cp .env.example .env         # set MONGO_URI and APP_URL
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# open http://localhost:5173 and the frontend will call backend at http://localhost:3000
```

## GitHub notes
- This ZIP is ready to be uploaded to a GitHub repository.
- A simple GitHub Actions CI workflow is included at `.github/workflows/ci.yml` which installs dependencies and builds both frontend and backend.
- Add secrets (if deploying) and update workflow as needed for deployment targets like Vercel/Render/Neon.

## Uploaded reference files (local paths)
The following original assignment PDFs were included (local paths inside this environment). If you need these uploaded to a public URL, transform the local paths to URLs using your tooling.

## License
MIT — see LICENSE file.

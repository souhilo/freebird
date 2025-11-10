# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Framework: Next.js 14 (App Router) with TypeScript and TailwindCSS
- Server-side: Route Handlers under app/api; custom middleware for auth header propagation and CORS
- Data: Sequelize ORM with MySQL (automatic database creation and sync)
- Auth: JWT access tokens + DB-backed refresh tokens
- Email: SMTP via nodemailer for verification and password reset
- File uploads: Vercel Blob for CV storage

Commands
- Dev server: npm run dev
- Build production bundle: npm run build
- Start production server: npm run start
- Lint: npm run lint
- Typecheck (no emit): npx tsc --noEmit

Environment configuration
Create a .env file with at least the following keys (no secrets here; set values in your local env):
- NEXT_PUBLIC_BASE_URL: base URL used by the client to call this app’s APIs (e.g., http://localhost:3000 in dev)
- SECRET: JWT signing secret for access tokens
- DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME: MySQL connection
- DB_CERT: optional CA certificate (PEM string) if SSL is required; code replaces \n escapes automatically
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD: SMTP settings for nodemailer
- emailFrom: default From email address for transactional mails
Notes
- The app/api/candidatures POST route uploads files to Vercel Blob using @vercel/blob. Ensure your environment is configured per Vercel Blob’s docs (e.g., tokens/credentials in env) when running locally.
- The middleware reads the Authorization: Bearer <token> header and exposes it to route handlers as x-bearer-token.

High-level architecture
- App Router (app/)
  - UI pages: app/page.tsx, app/emploi/page.tsx, app/emploi/[id]/page.tsx and UI components in app/components.
  - API layer: app/api/** uses Next.js Route Handlers. Endpoints include:
    - Accounts: registration, authentication, refresh/revoke token, email verification, forgot/reset password, list/detail CRUD (admin-restricted where applicable).
    - Offres (job postings): list, detail, create/update/delete (writes require auth; delete requires Admin).
    - Candidatures (applications): list/detail CRUD (reads require auth; create accepts multipart, uploads CV to Blob), stats and filtered status endpoints.
    - API docs: GET /api/api-docs returns swagger.yaml parsed to JSON.
  - Middleware (middleware.ts):
    - Propagates bearer tokens by copying Authorization to x-bearer-token.
    - Sets permissive CORS headers and handles preflight.
- Domain/services layer (lib/services)
  - account.service.ts: auth flows (JWT + refresh tokens), registration, email verification, password reset, CRUD. Returns NextResponse on validation/auth failures in some paths.
  - offre.service.ts and candidature.service.ts: CRUD and domain-specific helpers (e.g., monthly stats for a given poste).
- Data layer (lib/db.ts, lib/models)
  - initDb() creates the database (CREATE DATABASE IF NOT EXISTS ...) and connects via Sequelize.
  - Models: account, refreshToken, offre, candidature. Relations: Account hasMany RefreshToken (cascade delete).
  - sync is performed on startup (sequelize.sync()).
- Utilities (lib/*)
  - authorize.ts: verifies JWT from x-bearer-token and enforces role-based access (optional roles argument). Returns a user context or a 401 JSON response.
  - validate-request.ts: Joi-based validation helpers that either return sanitized values or NextResponse 400 with aggregated errors.
  - send-email.ts: thin SMTP wrapper using env-based configuration.

Common development flows
- Authenticating and calling protected endpoints
  1) Obtain tokens
     curl -X POST "$BASE_URL/api/accounts/authenticate" \
       -H "Content-Type: application/json" \
       -d '{"email":"user@example.com","password":"<pass>"}'
     Response contains jwtToken and refreshToken. Set Authorization: Bearer <jwtToken> for subsequent requests.
  2) Call a protected write (example: create an offre)
     curl -X POST "$BASE_URL/api/offres" \
       -H "Authorization: Bearer <jwtToken>" \
       -H "Content-Type: application/json" \
       -d '{"title":"...","nature":"...","wilaya":"...","jobTitle":"...","jobDescription":"..."}'
- Uploading a candidature (multipart with CV)
  curl -X POST "$BASE_URL/api/candidatures" \
    -H "Content-Type: multipart/form-data" \
    -F "cv_file=@/absolute/path/to/file.pdf" \
    -F "designation=..." -F "nom=..." -F "prenom=..." -F "email=..." \
    -F "pays=..." -F "poste=..." -F "disponibilite=..."

Conventions and important details
- TypeScript path alias: @/* maps to project root (see tsconfig.json paths).
- Authorization helper returns either a user context or a NextResponse. Many route handlers check `result instanceof NextResponse` to short-circuit on 401.
- Services sometimes return NextResponse on validation/auth fails; route handlers propagate those directly.
- Swagger file lives at ./swagger.yaml; GET /api/api-docs returns it as JSON.

Notes from README.md
- This is a Next.js app created with create-next-app. Use npm run dev to start the dev server. Open your configured NEXT_PUBLIC_BASE_URL in a browser (default Next.js port is 3000 unless overridden by PORT).

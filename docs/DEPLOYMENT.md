# Deployment guide

This guide is for the team that hosts the G DRIVE website. The application is a single Node.js service
(Next.js standalone server with Payload CMS built in) plus a PostgreSQL database and, optionally, an
S3-compatible bucket for uploaded images.

## Requirements

| Component | Requirement |
| --- | --- |
| Runtime | Node.js 24 (or the provided Docker image) |
| Database | PostgreSQL 15 or newer |
| Media storage | S3-compatible bucket (recommended) or a persistent disk volume mounted at `/app/media` |
| Email (optional) | Any SMTP provider for lead notifications |
| Spam protection | Cloudflare Turnstile site and secret keys for the production domain |

## Environment variables

All variables are documented in [`.env.example`](../.env.example). In short:

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Postgres connection string |
| `PAYLOAD_SECRET` | Yes | At least 32 random characters. The server refuses to start without it. |
| `NEXT_PUBLIC_SITE_URL` | Yes, at build | Live URL without a trailing slash, e.g. `https://www.gdrive.example` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes, at build | Turnstile site key for the domain |
| `TURNSTILE_SECRET_KEY` | Yes | Turnstile secret. Forms reject submissions if it is missing. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | At build | `true` on production only; staging stays `false` |
| `NEXT_PUBLIC_LEGAL_APPROVED` | At build | `true` after legal sign-off; removes the draft notice on legal pages |
| `LEADS_NOTIFY_TO`, `SMTP_*`, `EMAIL_FROM_*` | No | Lead notification emails |
| `S3_*` | No | Media storage; without it, uploads go to `./media` |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Once | Used by `npm run seed:admin` |

`NEXT_PUBLIC_*` values are compiled into the browser bundle, so changing them needs a rebuild.

## Option A: Docker (any container host)

```bash
docker build -t gdrive-web \
  --build-arg NEXT_PUBLIC_SITE_URL=https://www.gdrive.example \
  --build-arg NEXT_PUBLIC_ALLOW_INDEXING=true \
  --build-arg NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site key> \
  --build-arg NEXT_PUBLIC_LEGAL_APPROVED=true .

docker run -d -p 3000:3000 --env-file .env.production \
  -v gdrive-media:/app/media gdrive-web
```

- The image runs as a non-root user and exposes port 3000.
- `HEALTHCHECK` calls `/healthz`, which returns 200 when the app and database respond.
- Put the container behind a TLS-terminating proxy or load balancer.

## Option B: Vercel

1. Import the repository and set every variable above in the project settings.
2. Use an external Postgres (for example Neon) and S3-compatible storage (local disk is not persistent on Vercel).
3. No build command changes are needed. Vercel ignores `output: 'standalone'`.

## Database migrations

- Migrations live in `src/migrations` and run automatically when the production server starts.
- Development uses schema push; after changing collections, run `npm run migrate:create -- <name>`
  and commit the generated files before deploying.
- Do not point a production server at a database that was created by development schema push.
  Start production from an empty database.

## First admin account

In production, creating the first user from the admin panel is disabled so nobody else can claim a fresh deploy.
Create it from the server once:

```bash
DATABASE_URL=<production url> PAYLOAD_SECRET=<production secret> \
ADMIN_EMAIL=it@company.com ADMIN_PASSWORD='<long passphrase>' npm run seed:admin
```

The standalone Docker image contains only the compiled server. Run `seed:admin` from a checkout of the repository
with `DATABASE_URL` pointing at the production database, or set `ALLOW_FIRST_USER_SIGNUP=true` for a few minutes,
create the account at `/admin`, then set it back to `false` and restart.

## Caching and CDN

- Content pages are pre-rendered at build time. A rebuild publishes content changes made in `src/content`.
- `/blog`, `/blog/*`, `/sitemap.xml`, `/thank-you`, `/admin` and `/api/*` are rendered per request.
- `/images/*` is served with a one-year immutable cache header.

## Scaling notes

- The app is stateless apart from the database and media storage, so it can run multiple instances.
- The lead form rate limit is kept in memory per instance. With several instances or serverless hosting,
  replace `src/lib/leads/rateLimit.ts` with a shared store (for example Redis) to keep the limit global.
- Database connections: each instance opens a small pool; use a pooled connection string on serverless hosts.

## Smoke test after deploy

```bash
curl -s https://www.gdrive.example/healthz          # {"status":"ok"}
curl -sI https://www.gdrive.example/ | grep -i strict-transport-security
curl -s https://www.gdrive.example/robots.txt        # allows crawling only when indexing is enabled
```

Then submit one test enquiry from `/request-a-quote/` and confirm it appears under Leads in `/admin`.

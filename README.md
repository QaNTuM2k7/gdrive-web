# G DRIVE website

Corporate mobility website for **G DRIVE**, the mobility brand of New Travel Liines India Private Limited.
Built with Next.js 16 (App Router), Payload CMS 3, PostgreSQL, Tailwind CSS v4, Motion and Lenis.

## What is in here

| Area | Where |
| --- | --- |
| Public pages (home, 5 sections with 22 detail pages, about, clients, contact, quote, legal) | `src/app/(frontend)` |
| Page content (copy, images, FAQs) for the section pages | `src/content/*.ts` |
| Shared page templates and content blocks | `src/components/templates`, `src/components/blocks` |
| Motion components (lane canvas, route diagrams, reveals, smooth scroll) | `src/components/motion` |
| CMS collections: Leads, Posts, Media, Users | `src/collections` |
| Lead form: schema, server action, Turnstile, rate limit | `src/lib/leads` |
| Database migrations (applied automatically in production) | `src/migrations` |
| Admin panel | `/admin` |

## Local development

Requirements: Node.js 24, Docker (for Postgres).

```bash
cp .env.example .env          # then edit values
docker compose up -d          # Postgres on port 5433
npm install
npm run seed:admin            # creates the admin from ADMIN_EMAIL / ADMIN_PASSWORD in .env
npm run dev -- -p 3100        # http://localhost:3100, admin at /admin
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server (schema changes are pushed to the dev database automatically) |
| `npm run build` / `npm start` | Production build and server |
| `npm run typecheck` / `npm run lint` | TypeScript and ESLint |
| `npm run test:e2e` | Playwright smoke test of every page (SEO basics, 200/404, console errors) |
| `npm run seed:admin` | Create the first admin account from environment variables |
| `npm run migrate:create -- <name>` | Generate a migration after changing collections |
| `npm run migrate` | Apply migrations manually (production also runs them on start) |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after changing collections |

## Documentation

- [Deployment](docs/DEPLOYMENT.md): environment variables, Docker image, hosting options
- [Security](docs/SECURITY.md): what is protected and how
- [SEO go-live checklist](docs/SEO-GO-LIVE.md): steps for launch day
- [Editor guide](docs/EDITOR-GUIDE.md): using the admin for leads and blog posts
- [Content review](docs/CONTENT-REVIEW.md): copy and assets the client must confirm before launch

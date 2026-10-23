# Security notes

## Lead forms

- **Validation** with one zod schema in the browser and again in the server action; lengths are capped.
- **Spam protection**: Cloudflare Turnstile (verified server-side, fails closed if the secret is missing),
  a hidden honeypot field, and a rate limit of 5 submissions per 10 minutes per IP.
- Leads are written only by the server action. The public REST API cannot create, read or list leads.
- Notification emails HTML-escape every value.
- Consent wording is stored with each lead (DPDP Act 2023).

## Admin and API (Payload)

- **Roles**: `admin` (everything), `editor` (blog posts and media), `sales` (leads). Only admins manage users.
- The first account is always an admin. In production, public first-user signup is disabled unless
  `ALLOW_FIRST_USER_SIGNUP=true`; use `npm run seed:admin` instead.
- Login lockout after 5 failed attempts for 10 minutes; sessions expire after 8 hours; cookies are
  `Secure` in production and `SameSite=Lax`.
- CORS and CSRF are restricted to `NEXT_PUBLIC_SITE_URL`.
- GraphQL is disabled; only the REST and local APIs are available.
- Uploads accept JPEG, PNG, WebP and AVIF only (no SVG), up to 5 MB.
- Blog posts are public only when published; drafts are visible to editors and admins.

## HTTP headers

Set for every response in `next.config.ts`:

- `Content-Security-Policy`: self only, plus Cloudflare Turnstile. `'unsafe-inline'` is required for
  Next.js inline scripts without per-request nonces (which would disable static pages).
- `Strict-Transport-Security` (production), `X-Frame-Options: DENY`, `frame-ancestors 'none'`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`.
- `X-Powered-By` is removed.

## Output safety

- Structured data (JSON-LD) escapes `<`, so CMS text cannot break out of the script tag.
- React escapes all rendered text; rich text is rendered by Payload's Lexical renderer.
- `/healthz` reports only `ok` or `error`.

## Dependencies

`npm audit` (October 2026): no critical or high findings after upgrading Next.js to 16.4.3 and sharp to 0.35.5.
Five moderate findings remain in `esbuild` via `drizzle-kit`, which Payload uses only for development schema
push. They affect the development server, not the production runtime, and have no upstream fix yet.
Re-run `npm audit` before each release.

## Recommendations for the hosting team

- Serve only over HTTPS and redirect HTTP to HTTPS at the proxy.
- Restrict `/admin` by IP or put it behind an access proxy if the team works from fixed locations.
- Keep `PAYLOAD_SECRET`, database and SMTP credentials in the host's secret manager, not in the image.
- Back up the database daily and keep media in versioned storage.
- Rotate the Turnstile keys and admin passwords if staff with access leave.

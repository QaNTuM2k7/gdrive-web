// Public site URL without a trailing slash. Uses NEXT_PUBLIC_SITE_URL when set; on Vercel it falls back to
// the project's production domain (a system variable Vercel exposes to builds), then to local development.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : '') ||
  'http://localhost:3100'
).replace(/\/$/, '')

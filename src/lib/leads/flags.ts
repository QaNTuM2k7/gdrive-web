// Cloudflare Turnstile is off until the client is ready for it. Set NEXT_PUBLIC_TURNSTILE_ENABLED=true
// (a build-time value) along with the two Turnstile keys to turn the check back on.
export const turnstileEnabled = process.env.NEXT_PUBLIC_TURNSTILE_ENABLED === 'true'

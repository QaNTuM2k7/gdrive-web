import 'server-only'

type SiteverifyResponse = { success: boolean; 'error-codes'?: string[] }

// Verifies a Cloudflare Turnstile token. Development uses Cloudflare's published test keys (see .env.example).
export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not set; rejecting form submission.')
    return false
  }

  const body = new URLSearchParams({ secret, response: token })
  if (ip) body.set('remoteip', ip)

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(8000),
    })
    const data = (await res.json()) as SiteverifyResponse
    if (!data.success) console.warn('Turnstile rejected a submission', data['error-codes'])
    return data.success
  } catch (err) {
    console.error('Turnstile verification failed', err)
    return false
  }
}

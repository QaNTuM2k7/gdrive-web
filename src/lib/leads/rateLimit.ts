import 'server-only'

// Fixed-window limiter kept in memory. Fine for a single server; if the site runs on several
// instances or serverless functions, swap this for a shared store (for example Upstash Redis).
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

const hits = new Map<string, { count: number; resetAt: number }>()

export function allowSubmission(key: string): boolean {
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS })
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k)
    }
    return true
  }

  entry.count += 1
  return entry.count <= MAX_PER_WINDOW
}

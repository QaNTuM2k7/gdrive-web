import config from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

// Health check for load balancers and uptime monitors: 200 when the app and database respond.
export async function GET() {
  try {
    const payload = await getPayload({ config })
    await payload.count({ collection: 'users', overrideAccess: true })
    return Response.json({ status: 'ok' }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return Response.json({ status: 'error' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
}

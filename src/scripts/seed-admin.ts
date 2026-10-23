/**
 * Creates the first admin account from environment variables:
 *   ADMIN_EMAIL=you@company.com ADMIN_PASSWORD='a long passphrase' npm run seed:admin
 * Safe to re-run: it does nothing if a user with that email already exists.
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD.')
    process.exit(1)
  }
  if (password.length < 12) {
    console.error('ADMIN_PASSWORD must be at least 12 characters.')
    process.exit(1)
  }

  const payload = await getPayload({ config })
  const existing = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1, overrideAccess: true })
  if (existing.totalDocs > 0) {
    console.log(`A user with ${email} already exists. Nothing to do.`)
    process.exit(0)
  }

  await payload.create({
    collection: 'users',
    overrideAccess: true,
    data: { email, password, name: 'Administrator', roles: ['admin'] },
  })
  console.log(`Admin account created for ${email}.`)
  process.exit(0)
}

// Top-level await: `payload run` imports this file and exits as soon as the import settles.
await main().catch((err) => {
  console.error(err)
  process.exit(1)
})

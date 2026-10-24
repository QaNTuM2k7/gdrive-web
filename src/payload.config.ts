import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig, type Plugin } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { siteUrl } from './lib/siteUrl'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProd = process.env.NODE_ENV === 'production'
const serverURL = siteUrl

const isBuild = process.env.NEXT_PHASE === 'phase-production-build'

if (isProd && !isBuild && (!process.env.PAYLOAD_SECRET || process.env.PAYLOAD_SECRET.length < 32)) {
  throw new Error('PAYLOAD_SECRET must be set to a random string of at least 32 characters in production.')
}

// Optional integrations switch on when the deployment team provides their environment variables.
const plugins: Plugin[] = []
if (process.env.S3_BUCKET) {
  plugins.push(
    s3Storage({
      collections: { media: true },
      bucket: process.env.S3_BUCKET,
      config: {
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || undefined,
        forcePathStyle: Boolean(process.env.S3_ENDPOINT),
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  )
}

// On Vercel (no persistent disk), uploads go to Vercel Blob when its token is present. Files are still
// served through /api/media, so access control and the CSP stay the same.
if (process.env.BLOB_READ_WRITE_TOKEN && !process.env.S3_BUCKET) {
  plugins.push(
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  )
}

const email = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'no-reply@example.com',
      defaultFromName: process.env.EMAIL_FROM_NAME || 'G DRIVE Website',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      },
    })
  : undefined

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' | G DRIVE Admin' },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Leads, Posts, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  // Only the site itself may call the API with cookies.
  cors: [serverURL],
  csrf: [serverURL],
  // The site uses the local and REST APIs only; GraphQL stays off to reduce the attack surface.
  graphQL: { disable: true },
  upload: { limits: { fileSize: 5 * 1024 * 1024 } },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Development pushes schema changes automatically; production applies committed migrations on start.
    push: !isProd,
    prodMigrations: migrations,
  }),
  email,
  sharp,
  plugins,
})

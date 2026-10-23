import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'

import type { Post } from '@/payload-types'

// Published posts for the public site. Failures (for example no database during a build)
// return empty results so pages still render and fill in on the next revalidation.

export async function listPosts(limit = 24): Promise<Post[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      sort: '-publishedAt',
      limit,
      depth: 1,
      overrideAccess: false,
    })
    return res.docs
  } catch (err) {
    console.error('Could not load blog posts', err)
    return []
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'posts',
      where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
      limit: 1,
      depth: 1,
      overrideAccess: false,
    })
    return res.docs[0] ?? null
  } catch (err) {
    console.error('Could not load blog post', err)
    return null
  }
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

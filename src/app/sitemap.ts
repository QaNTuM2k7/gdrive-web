import type { MetadataRoute } from 'next'

import { allSectionPages } from '@/lib/nav'
import { listPosts } from '@/lib/posts'
import { site } from '@/lib/site'

// Built per request (cached by the CDN) so blog posts are listed without the database at build time.
export const dynamic = 'force-dynamic'

const staticPaths = ['/', '/about/', '/clients/', '/contact/', '/request-a-quote/', '/blog/', '/privacy-policy/', '/terms/']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const url = (path: string) => new URL(path, site.url).toString()

  const pages: MetadataRoute.Sitemap = [...staticPaths, ...allSectionPages].map((path) => ({
    url: url(path),
    lastModified: now,
    changeFrequency: path === '/' || path === '/blog/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.split('/').filter(Boolean).length === 1 ? 0.8 : 0.6,
  }))

  const posts = (await listPosts(500)).map((p) => ({
    url: url(`/blog/${p.slug}/`),
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  return [...pages, ...posts]
}

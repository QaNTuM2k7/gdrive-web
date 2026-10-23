import type { MetadataRoute } from 'next'

import { site } from '@/lib/site'

// Staging and previews block all crawlers; production (NEXT_PUBLIC_ALLOW_INDEXING=true) allows the site
// but never the admin, API or thank-you page.
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'true') {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/thank-you/'] }],
    sitemap: new URL('/sitemap.xml', site.url).toString(),
    host: site.url,
  }
}

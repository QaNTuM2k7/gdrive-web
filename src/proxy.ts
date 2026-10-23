import { type NextRequest, NextResponse } from 'next/server'

// Public pages use trailing-slash URLs (as in the SEO sitemap). Payload's admin and API keep their own
// URLs, so the slash is added here for site pages only instead of through the global trailingSlash option.
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  if (pathname !== '/' && !pathname.endsWith('/')) {
    // Build from a plain URL: nextUrl.clone() would strip the slash again when serialized.
    return NextResponse.redirect(new URL(`${pathname}/${search}`, req.url), 308)
  }
  return NextResponse.next()
}

export const config = {
  // Skip the admin, API, Next internals, files with an extension and metadata routes.
  matcher: ['/((?!admin|api|_next|healthz|.*\\..*).*)'],
}

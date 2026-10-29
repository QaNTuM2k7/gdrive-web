import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// The site and the admin each have their own root layout, so an unmatched URL would otherwise get Next's
// plain default 404. Catching it here renders the branded not-found page inside the site layout.
// Next adds a noindex robots tag to 404 responses itself.
export const metadata: Metadata = {
  title: 'Page not found',
}

export default function Missing() {
  notFound()
}

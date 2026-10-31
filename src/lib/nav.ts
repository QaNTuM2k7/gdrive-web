import { fleetSection } from '@/content/fleet'
import { peopleSection } from '@/content/people'
import { safetySection } from '@/content/safety'
import { solutionsSection } from '@/content/solutions'
import { technologySection } from '@/content/technology'
import type { Section } from '@/content/types'

export type NavGroup = { label: string; href: string; children: { label: string; href: string }[] }

const group = (s: Section): NavGroup => ({
  label: s.label,
  href: `${s.base}/`,
  children: s.pages.map((p) => ({ label: p.label, href: `${s.base}/${p.slug}/` })),
})

// Full site navigation, derived from the content sections so new pages appear automatically.
export const navTree: NavGroup[] = [
  { label: 'Home', href: '/', children: [] },
  group(solutionsSection),
  group(fleetSection),
  group(technologySection),
  group(safetySection),
  group(peopleSection),
  {
    label: 'Company',
    href: '/about/',
    children: [
      { label: 'About G DRIVE', href: '/about/' },
      { label: 'Clients & Industries', href: '/clients/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
]

export const allSectionPages = [solutionsSection, fleetSection, technologySection, safetySection, peopleSection].flatMap(
  (s) => [`${s.base}/`, ...s.pages.map((p) => `${s.base}/${p.slug}/`)],
)

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { DetailTemplate, HubTemplate } from '@/components/templates/Templates'
import type { Section } from '@/content/types'
import { pageMetadata } from './seo'

type SlugProps = { params: Promise<{ slug: string }> }

// Builds the hub page and statically generated child pages for a content section.
export function sectionRoutes(section: Section, options: { cards?: ReactNode; figure?: ReactNode } = {}) {
  const find = (slug: string) => section.pages.find((p) => p.slug === slug)

  return {
    hub: {
      metadata: pageMetadata({
        title: section.seo.title,
        description: section.seo.description,
        path: `${section.base}/`,
        image: section.hero.src,
      }),
      Page: function HubPage() {
        return <HubTemplate section={section} cards={options.cards} figure={options.figure} />
      },
    },
    detail: {
      generateStaticParams: () => section.pages.map((p) => ({ slug: p.slug })),
      generateMetadata: async ({ params }: SlugProps): Promise<Metadata> => {
        const page = find((await params).slug)
        if (!page) return {}
        return pageMetadata({
          title: page.seo.title,
          description: page.seo.description,
          path: `${section.base}/${page.slug}/`,
          image: page.hero.src,
        })
      },
      Page: async function DetailPage({ params }: SlugProps) {
        const page = find((await params).slug)
        if (!page) notFound()
        return <DetailTemplate page={page} section={section} />
      },
    },
  }
}

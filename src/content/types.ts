import type { StaticImageData } from 'next/image'

import type { ServiceValue } from '@/lib/leads/options'

// Content model for inner pages. Each page is a list of blocks rendered by the shared templates,
// mirroring the block structure planned for the Payload Pages collection.

export type Img = { src: StaticImageData; alt: string; fit?: 'cover' | 'contain'; focus?: string }

export type Faq = { q: string; a: string }

export type Block =
  | { type: 'features'; title: string; intro?: string; items: { title: string; body: string; icon?: string }[] }
  | { type: 'split'; title: string; body: string[]; image: Img; points?: string[]; reverse?: boolean; tone?: 'paper' | 'blue' }
  | { type: 'steps'; title: string; intro?: string; items: { title: string; body: string }[] }
  | { type: 'checklist'; title: string; intro?: string; items: string[]; image?: Img }
  | { type: 'tiles'; title: string; intro?: string; items: { image: StaticImageData; label: string; body: string }[] }
  | { type: 'compare'; title: string; intro?: string; items: { image: Img; label: string; body: string }[] }
  | { type: 'diagram'; title: string; body: string; diagram: string }
  | { type: 'cities'; title: string; body: string }
  | { type: 'note'; body: string }

export type DetailPage = {
  slug: string
  /** Short label used in navigation, breadcrumbs and cards. */
  label: string
  seo: { title: string; description: string }
  h1: string
  intro: string
  hero: Img
  /** Service pre-selected on the quote form from this page's call to action. */
  service: ServiceValue
  blocks: Block[]
  faqs?: Faq[]
  /** Closing call to action heading. */
  cta: string
  related?: { href: string; label: string }[]
  /** Feature not yet live: shows a status badge so copy stays honest. */
  status?: 'live' | 'pilot' | 'coming-soon'
}

export type Section = {
  base: string
  label: string
  seo: { title: string; description: string }
  h1: string
  intro: string
  hero: Img
  service: ServiceValue
  /** Blocks shown on the hub page after the child cards. */
  blocks: Block[]
  cardsTitle: string
  pages: DetailPage[]
  faqs?: Faq[]
  cta: string
}

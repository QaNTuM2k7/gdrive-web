import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { JsonLd } from '@/components/JsonLd'
import { RevealText } from '@/components/motion/RevealText'
import type { Img } from '@/content/types'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import { PhotoBanner } from './PhotoBanner'

export type Crumb = { label: string; href: string }

const statusLabel = { live: 'Available now', pilot: 'In pilot', 'coming-soon': 'In development' } as const

// Page banner. Main pages pass a photo for the same banner as the home page; inner pages use the gold band
// from the approved inner page design; utility pages (contact, quote, blog, legal) keep plain blue.
export function PageHeader({
  title,
  intro,
  crumbs,
  children,
  image,
  status,
  tone = 'blue',
}: {
  title: string
  intro?: ReactNode
  crumbs: Crumb[]
  children?: ReactNode
  image?: Img
  status?: keyof typeof statusLabel
  tone?: 'blue' | 'gold'
}) {
  const trail = [{ label: 'Home', href: '/' }, ...crumbs]
  const gold = !image && tone === 'gold'

  const body = (
    <div className={`frame flex w-full flex-col px-4 pb-14 pt-6 sm:px-6 lg:px-10 ${image ? 'md:pb-10' : 'md:pb-20'}`}>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 font-mono text-xs uppercase tracking-[0.08em]">
          {trail.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 && <CaretRightIcon aria-hidden className="size-3" />}
              {i < trail.length - 1 ? (
                <Link href={c.href} className="opacity-85 hover:opacity-100">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className={`flex flex-col gap-6 ${image ? 'my-auto py-10' : 'mt-10 md:mt-14'}`}>
        {status && (
          <span className="rise w-fit rounded-full bg-navy px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-gold">
            {statusLabel[status]}
          </span>
        )}
        <RevealText
          as="h1"
          onMount
          text={title}
          className={`max-w-[20ch] font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] ${image ? 'opacity-90' : ''}`}
        />
        {intro && (
          <div className="rise max-w-[60ch] text-lg leading-relaxed" style={{ '--delay': '350ms' } as React.CSSProperties}>
            {intro}
          </div>
        )}
        {children && (
          <div className="rise flex flex-wrap gap-3" style={{ '--delay': '450ms' } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </div>
  )

  if (image) return <PhotoBanner src={image.src} focus={image.focus}>{body}</PhotoBanner>
  return <section className={gold ? 'bg-gold text-white [text-shadow:0_1px_2px_rgb(11_18_40/0.25)]' : 'bg-blue text-on-blue'}>{body}</section>
}

import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { LaneCanvas } from '@/components/motion/LaneCanvas'
import { ParallaxImage } from '@/components/motion/ParallaxImage'
import { RevealText } from '@/components/motion/RevealText'
import type { Img } from '@/content/types'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import { JsonLd } from '@/components/JsonLd'

export type Crumb = { label: string; href: string }

const statusLabel = { live: 'Available now', pilot: 'In pilot', 'coming-soon': 'In development' } as const

// Blue title band for inner pages: breadcrumbs (with BreadcrumbList data), revealed headline,
// intro, optional actions and an optional image band underneath.
export function PageHeader({
  title,
  intro,
  crumbs,
  children,
  image,
  status,
}: {
  title: string
  intro?: ReactNode
  crumbs: Crumb[]
  children?: ReactNode
  image?: Img
  status?: keyof typeof statusLabel
}) {
  const trail = [{ label: 'Home', href: '/' }, ...crumbs]

  return (
    <section data-section={crumbs[crumbs.length - 1]?.label ?? 'Overview'} className="on-blue border-b border-rule-on-blue">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <div className="frame">
        <nav aria-label="Breadcrumb" className="border-b border-rule-on-blue px-4 py-3 sm:px-6 lg:px-10">
          <ol className="flex flex-wrap items-center gap-1 font-mono text-xs uppercase tracking-[0.08em] text-on-blue-soft">
            {trail.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1">
                {i > 0 && <CaretRightIcon aria-hidden className="size-3" />}
                {i < trail.length - 1 ? (
                  <Link href={c.href} className="hover:text-on-blue">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-on-blue">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="flex flex-col gap-6 px-4 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-14 lg:col-span-8 lg:px-10">
            {status && (
              <span className="rise w-fit border border-gold px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-gold">
                {statusLabel[status]}
              </span>
            )}
            <RevealText
              as="h1"
              onMount
              text={title}
              className="display max-w-[18ch] text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[0.98]"
            />
            {intro && (
              <div
                className="rise max-w-[60ch] text-lg leading-relaxed text-on-blue-soft"
                style={{ '--delay': '350ms' } as React.CSSProperties}
              >
                {intro}
              </div>
            )}
            {children && (
              <div className="rise flex flex-wrap gap-3" style={{ '--delay': '450ms' } as React.CSSProperties}>
                {children}
              </div>
            )}
          </div>
          <div className="relative hidden min-h-[220px] border-l border-rule-on-blue p-8 lg:col-span-4 lg:block">
            <LaneCanvas laneGap={28} thickness={9} />
          </div>
        </div>

        {image && (
          <div className="relative h-[clamp(240px,42vw,560px)] overflow-hidden border-t border-rule-on-blue">
            {image.fit === 'contain' ? (
              <div className="absolute inset-0 bg-white">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  placeholder="blur"
                  sizes="100vw"
                  className="object-contain p-6 md:p-12"
                />
              </div>
            ) : (
              <ParallaxImage
                src={image.src}
                alt={image.alt}
                priority
                placeholder="blur"
                sizes="100vw"
                imageClassName={image.focus ? '' : 'object-center'}
                style={image.focus ? { objectPosition: image.focus } : undefined}
              />
            )}
          </div>
        )}
      </div>
    </section>
  )
}

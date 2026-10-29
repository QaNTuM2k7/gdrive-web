import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { JsonLd } from '@/components/JsonLd'
import { ParallaxImage } from '@/components/motion/ParallaxImage'
import { RevealText } from '@/components/motion/RevealText'
import type { Img } from '@/content/types'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import pin from '../../../public/images/brand/pin-white.png'

export type Crumb = { label: string; href: string }

const statusLabel = { live: 'Available now', pilot: 'In pilot', 'coming-soon': 'In development' } as const

// Banner at the top of inner pages. A photo fills the banner under a primary-blue tint; a vehicle cut-out sits
// on a white card at the right; pages without an image get the plain blue banner with the G pin.
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
  const photo = image && image.fit !== 'contain'
  const cutout = image && image.fit === 'contain'

  return (
    <section className="relative isolate overflow-hidden bg-blue text-on-blue">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      {photo && (
        <>
          <ParallaxImage
            src={image.src}
            alt=""
            priority
            placeholder="blur"
            sizes="100vw"
            className="-z-10"
            style={image.focus ? { objectPosition: image.focus } : undefined}
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-blue/95 via-blue/80 to-blue/45" />
        </>
      )}

      <div className="frame px-4 pb-14 pt-6 sm:px-6 md:pb-20 lg:px-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 font-mono text-xs uppercase tracking-[0.08em] text-on-blue">
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

        <div className="mt-10 grid grid-cols-1 items-center gap-10 md:mt-14 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            {status && (
              <span className="rise w-fit rounded-full border border-gold px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-gold">
                {statusLabel[status]}
              </span>
            )}
            <RevealText
              as="h1"
              onMount
              text={title}
              className="max-w-[20ch] font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05]"
            />
            {intro && (
              <div className="rise max-w-[60ch] text-lg leading-relaxed text-on-blue" style={{ '--delay': '350ms' } as React.CSSProperties}>
                {intro}
              </div>
            )}
            {children && (
              <div className="rise flex flex-wrap gap-3" style={{ '--delay': '450ms' } as React.CSSProperties}>
                {children}
              </div>
            )}
          </div>

          <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
            {cutout ? (
              <div className="rise relative aspect-[4/3] w-full max-w-[460px] rounded-2xl bg-white p-6 shadow-card" style={{ '--delay': '250ms' } as React.CSSProperties}>
                <Image src={image.src} alt={image.alt} fill priority placeholder="blur" sizes="460px" className="object-contain p-6" />
              </div>
            ) : (
              <Image
                src={pin}
                alt=""
                priority
                sizes="240px"
                className="rise h-auto w-[clamp(150px,16vw,240px)] opacity-95 drop-shadow-[0_20px_40px_rgb(11_18_40/0.25)]"
                style={{ '--delay': '250ms' } as React.CSSProperties}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

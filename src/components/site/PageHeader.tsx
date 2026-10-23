import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { breadcrumbJsonLd } from '@/lib/jsonld'

export type Crumb = { label: string; href: string }

// Blue title band for inner pages, with visible breadcrumbs and matching BreadcrumbList data.
export function PageHeader({
  title,
  intro,
  crumbs,
  children,
}: {
  title: string
  intro?: ReactNode
  crumbs: Crumb[]
  children?: ReactNode
}) {
  const trail = [{ label: 'Home', href: '/' }, ...crumbs]

  return (
    <section className="on-blue border-b border-rule-on-blue">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }}
      />
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
        <div className="flex flex-col gap-6 px-4 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-14 lg:px-10">
          <h1 className="display rise max-w-[18ch] text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[0.98]">
            {title}
          </h1>
          {intro && (
            <div
              className="rise max-w-[60ch] text-lg leading-relaxed text-on-blue-soft"
              style={{ '--delay': '120ms' } as React.CSSProperties}
            >
              {intro}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}

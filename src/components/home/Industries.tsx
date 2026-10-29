import { BuildingOfficeIcon, BuildingsIcon, DesktopTowerIcon, FactoryIcon, GraduationCapIcon } from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'
import Link from 'next/link'

import { RevealText } from '@/components/motion/RevealText'

const industries: { icon: Icon; label: string }[] = [
  { icon: BuildingOfficeIcon, label: 'Corporate Offices' },
  { icon: DesktopTowerIcon, label: 'IT & Technology Campuses' },
  { icon: FactoryIcon, label: 'Manufacturing Facilities' },
  { icon: BuildingsIcon, label: 'Business Parks' },
  { icon: GraduationCapIcon, label: 'Educational Institutions' },
]

// Industries We Serve on the gold band, as in the approved homepage design.
export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="bg-gold text-text-dark">
      <div className="frame grid grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-12 lg:px-10">
        <div className="flex flex-col gap-4 lg:col-span-4">
          {/* Deep blue reads clearly on gold; the default eyebrow colours do not. */}
          <p className="eyebrow [--eyebrow-color:var(--deep-blue)]">Industries</p>
          <RevealText id="industries-title" text="Industries We Serve" className="display text-3xl font-extrabold leading-tight md:text-4xl" />
          <p className="max-w-[46ch] leading-relaxed">
            G DRIVE supports transportation requirements across corporate offices, IT and technology campuses,
            manufacturing facilities, business parks and educational institutions.
          </p>
          <Link href="/clients/" className="w-fit font-mono text-[13px] uppercase tracking-[0.08em] text-deep-blue underline-offset-4 hover:underline">
            Clients &amp; industries
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
          {industries.map((ind) => (
            <li key={ind.label} className="reveal flex flex-col items-center gap-4 rounded-2xl bg-white p-5 text-center shadow-card">
              <span className="flex size-20 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary-blue)_12%,white)]">
                <ind.icon weight="duotone" aria-hidden className="size-11 text-deep-blue" />
              </span>
              <span className="text-sm font-semibold leading-snug text-text-dark">{ind.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

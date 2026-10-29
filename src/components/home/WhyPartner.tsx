import {
  CpuIcon,
  HandshakeIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  TreeStructureIcon,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'

import { SectionHeading } from './SectionHeading'

const reasons: { icon: Icon; title: string; body: string }[] = [
  { icon: TreeStructureIcon, title: 'Integrated mobility', body: 'Multiple transportation requirements coordinated through one mobility partner.' },
  { icon: CpuIcon, title: 'Technology-enabled operations', body: 'Digital tools for fleet visibility and trip coordination.' },
  { icon: ShieldCheckIcon, title: 'Safety-focused processes', body: 'Driver readiness, training, vehicle checks and intelligent monitoring.' },
  { icon: SlidersHorizontalIcon, title: 'Flexible solutions', body: 'Services designed around workforce size, schedules and operational needs.' },
  { icon: HandshakeIcon, title: 'Business-oriented support', body: 'Mobility arrangements aligned with organizational requirements.' },
]

export function WhyPartner() {
  return (
    <section aria-labelledby="why-title" className="bg-paper">
      <div className="frame px-4 py-16 sm:px-6 md:py-24 lg:px-10">
        <SectionHeading id="why-title" title="Why partner with G DRIVE" />
        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-6">
          {reasons.map((r, i) => (
            <li key={r.title} className={`card reveal flex items-start gap-4 p-6 md:p-7 ${i < 2 ? 'md:col-span-3' : 'md:col-span-2'}`}>
              <r.icon weight="light" aria-hidden className="size-10 shrink-0 text-link" />
              <div className="flex flex-col gap-2">
                <h3 className="display text-xl font-bold">{r.title}</h3>
                <p className="text-ink-soft">{r.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

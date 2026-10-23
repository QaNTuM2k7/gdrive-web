import {
  CpuIcon,
  HandshakeIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  TreeStructureIcon,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'
import Image from 'next/image'

import driverTraining from '../../../public/images/driver-training.jpg'

const reasons: { icon: Icon; title: string; body: string }[] = [
  {
    icon: TreeStructureIcon,
    title: 'Integrated mobility',
    body: 'Multiple transportation requirements coordinated through one mobility partner.',
  },
  {
    icon: CpuIcon,
    title: 'Technology-enabled operations',
    body: 'Digital tools for fleet visibility and trip coordination.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Safety-focused processes',
    body: 'Driver readiness, training, vehicle checks and intelligent monitoring.',
  },
  {
    icon: SlidersHorizontalIcon,
    title: 'Flexible solutions',
    body: 'Services designed around workforce size, schedules and operational needs.',
  },
  {
    icon: HandshakeIcon,
    title: 'Business-oriented support',
    body: 'Mobility arrangements aligned with organisational requirements.',
  },
]

const industries = [
  'Corporate offices',
  'IT and technology campuses',
  'Manufacturing facilities',
  'Business parks',
  'Educational institutions',
]

export function WhyPartner() {
  return (
    <section aria-labelledby="why-title" className="border-b border-rule">
      <div className="frame">
        <div className="border-b border-rule px-4 pb-10 pt-16 sm:px-6 md:pt-24 lg:px-10">
          <h2 id="why-title" className="display text-4xl font-extrabold md:text-6xl">
            Why partner with G DRIVE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`reveal flex flex-col gap-4 border-b border-rule p-6 md:p-8 ${
                i < 2 ? 'md:col-span-3' : 'md:col-span-2'
              } ${i === 0 || (i >= 2 && i < 4) ? 'md:border-r' : ''}`}
            >
              <r.icon weight="light" aria-hidden className="size-9 text-link" />
              <h3 className="display text-2xl font-bold">{r.title}</h3>
              <p className="max-w-[40ch] text-ink-soft">{r.body}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="relative aspect-[16/9] overflow-hidden border-b border-rule lg:col-span-5 lg:aspect-auto lg:border-b-0 lg:border-r">
            <Image
              src={driverTraining}
              alt="G DRIVE drivers in a defensive driving training session"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 px-4 py-10 sm:px-6 md:py-14 lg:col-span-7 lg:px-10">
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">Industries we serve</h3>
            <ul className="flex flex-col">
              {industries.map((name) => (
                <li
                  key={name}
                  className="display border-b border-rule py-3 text-2xl font-bold last:border-b-0 md:text-[2rem]"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

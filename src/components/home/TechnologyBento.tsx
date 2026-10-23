import {
  BellRingingIcon,
  CalendarCheckIcon,
  ChartBarIcon,
  DeviceMobileIcon,
  MapTrifoldIcon,
  NavigationArrowIcon,
  SirenIcon,
  SquaresFourIcon,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'

import busBoarding from '../../../public/images/bus-boarding.jpg'

type Feature = { icon: Icon; label: string }
type Group = { verb: string; features: Feature[]; tone: 'gold' | 'line' }

// The eight platform capabilities from the brochure, grouped by what a transport team does with them.
const groups: Group[] = [
  {
    verb: 'Plan',
    tone: 'gold',
    features: [
      { icon: CalendarCheckIcon, label: 'Digital transportation requests and scheduling' },
      { icon: MapTrifoldIcon, label: 'Route planning and optimisation' },
    ],
  },
  {
    verb: 'Track',
    tone: 'line',
    features: [
      { icon: NavigationArrowIcon, label: 'GPS-based vehicle tracking' },
      { icon: SquaresFourIcon, label: 'Centralised fleet monitoring' },
    ],
  },
  {
    verb: 'Inform',
    tone: 'line',
    features: [
      { icon: DeviceMobileIcon, label: 'Driver and passenger applications' },
      { icon: BellRingingIcon, label: 'Digital passenger notifications' },
    ],
  },
  {
    verb: 'Respond',
    tone: 'line',
    features: [
      { icon: ChartBarIcon, label: 'Trip status and operational reporting' },
      { icon: SirenIcon, label: 'Emergency escalation capabilities' },
    ],
  },
]

export function TechnologyBento() {
  return (
    <section aria-labelledby="tech-title" className="on-deep border-b border-rule-on-blue">
      <div className="frame">
        <div className="flex flex-col gap-6 border-b border-rule-on-blue px-4 pb-10 pt-16 sm:px-6 md:pt-24 lg:px-10">
          <h2 id="tech-title" className="display max-w-[18ch] text-4xl font-extrabold md:text-6xl">
            Technology-enabled transportation
          </h2>
          <p className="max-w-[60ch] text-lg leading-relaxed text-on-blue-soft">
            Booking, scheduling, driver and vehicle allocation, trip monitoring, reporting and billing,
            connected on one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="relative min-h-[320px] overflow-hidden border-b border-rule-on-blue md:col-span-5 md:border-b-0 md:border-r">
            <Image
              src={busBoarding}
              alt="Employees boarding a G DRIVE staff bus"
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[40%_100%]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-7">
          {groups.map((g, i) => (
            <div
              key={g.verb}
              className={`reveal flex flex-col gap-6 border-b border-rule-on-blue p-6 md:p-8 ${
                g.tone === 'gold' ? 'bg-gold text-navy' : ''
              } ${i % 2 === 0 ? 'sm:border-r' : ''} ${i >= 2 ? 'sm:border-b-0' : ''}`}
            >
              <h3 className="display text-3xl font-extrabold">{g.verb}</h3>
              <ul className="flex flex-col gap-4">
                {g.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-3">
                    <f.icon
                      weight="light"
                      aria-hidden
                      className={`mt-0.5 size-6 shrink-0 ${g.tone === 'gold' ? 'text-navy' : 'text-gold'}`}
                    />
                    <span className={g.tone === 'gold' ? 'text-navy' : 'text-on-blue-soft'}>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-rule-on-blue px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p className="text-sm text-on-blue-soft">
            Available features depend on the selected platform, configuration and service arrangement.
          </p>
          <Link
            href="/technology/"
            className="font-mono text-[13px] uppercase tracking-[0.08em] text-gold hover:text-on-blue"
          >
            Explore fleet technology
          </Link>
        </div>
      </div>
    </section>
  )
}

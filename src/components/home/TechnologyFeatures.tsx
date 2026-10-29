import {
  BellRingingIcon,
  ChartBarIcon,
  FileTextIcon,
  MapPinIcon,
  MonitorIcon,
  PathIcon,
  UsersThreeIcon,
  WarningIcon,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'
import Link from 'next/link'

import { SectionHeading } from './SectionHeading'

// Technology-Enabled Transportation, copy from the SEO master document's home page section.
const features: { icon: Icon; label: string }[] = [
  { icon: MonitorIcon, label: 'Digital transportation requests and scheduling' },
  { icon: ChartBarIcon, label: 'Centralized fleet monitoring' },
  { icon: PathIcon, label: 'Route planning and optimization' },
  { icon: FileTextIcon, label: 'Trip status and operational reporting' },
  { icon: MapPinIcon, label: 'GPS-based vehicle tracking' },
  { icon: BellRingingIcon, label: 'Digital passenger notifications' },
  { icon: UsersThreeIcon, label: 'Driver and passenger applications' },
  { icon: WarningIcon, label: 'Emergency escalation capabilities' },
]

export function TechnologyFeatures() {
  return (
    <section aria-labelledby="tech-title" className="on-deep">
      <div className="frame grid grid-cols-1 gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:px-10">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <SectionHeading
            id="tech-title"
            eyebrow="Technology"
            title="Technology-Enabled Transportation"
            intro={
              <p className="text-on-blue-soft">
                G DRIVE brings together transportation operations and connected digital platforms to support booking,
                scheduling, driver and vehicle allocation, trip monitoring, reporting and billing.
              </p>
            }
          />
          <Link href="/technology/" className="w-fit font-mono text-[13px] uppercase tracking-[0.08em] text-gold hover:text-on-blue">
            Explore fleet technology
          </Link>
        </div>
        <div className="lg:col-span-7">
          <ul className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f.label} className="reveal flex items-center gap-4">
                <f.icon weight="duotone" aria-hidden className="size-10 shrink-0 text-gold" />
                <span className="text-on-blue">{f.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-on-blue-soft">
            The availability of individual features depends on the selected platform, configuration and service arrangement.
          </p>
        </div>
      </div>
    </section>
  )
}

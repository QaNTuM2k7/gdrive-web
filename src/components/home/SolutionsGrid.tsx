import {
  ArrowRightIcon,
  BusIcon,
  CarIcon,
  CrownSimpleIcon,
  GearSixIcon,
  TrainIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import busBoarding from '../../../public/images/fleet/bus-boarding-portrait.jpg'
import itParkFleet from '../../../public/images/fleet/it-park-fleet.jpg'
import fleetHighway from '../../../public/images/fleet-highway.jpg'
import airportPickup from '../../../public/images/rental/airport-pickup.jpg'
import executiveArrival from '../../../public/images/rental/executive-arrival.jpg'
import controlRoom from '../../../public/images/technology/control-room.jpg'
import { SectionHeading } from './SectionHeading'

// "Our Mobility Solutions" cards, copy from the SEO master document's home page section.
const cards: { title: string; body: string; cta: string; href: string; icon: Icon; image: StaticImageData; focus: string }[] = [
  {
    title: 'Corporate Employee Transportation',
    body: "Organize daily employee commutes, shift-based travel and pickup and drop services with transportation solutions tailored to your organization's requirements.",
    cta: 'Explore Employee Transportation',
    href: '/solutions/employee-transportation/',
    icon: UsersThreeIcon,
    image: itParkFleet,
    focus: '50% 60%',
  },
  {
    title: 'Corporate Car Rental',
    body: 'Arrange corporate travel, airport transfers, guest transportation and business journeys with flexible car rental services.',
    cta: 'Explore Corporate Car Rental',
    href: '/solutions/corporate-car-rental/',
    icon: CarIcon,
    image: airportPickup,
    focus: '50% 40%',
  },
  {
    title: 'Premium Executive Car Rentals',
    body: 'Support executive travel, business meetings and corporate guest movement with premium car rental options.',
    cta: 'Explore Executive Rentals',
    href: '/solutions/executive-car-rental/',
    icon: CrownSimpleIcon,
    image: executiveArrival,
    focus: '50% 40%',
  },
  {
    title: 'Shuttle & Campus Mobility',
    body: 'Coordinate dedicated shuttle services for corporate campuses, business parks and educational institutions.',
    cta: 'Explore Shuttle Services',
    href: '/solutions/shuttle-services/',
    icon: BusIcon,
    image: busBoarding,
    focus: '50% 78%',
  },
  {
    title: 'Metro Connect Services',
    body: 'Support first-mile and last-mile connectivity through structured shuttle and metro feeder transportation arrangements.',
    cta: 'Explore Metro Connect',
    href: '/solutions/metro-connect/',
    icon: TrainIcon,
    image: fleetHighway,
    focus: '60% 48%',
  },
  {
    title: 'Intelligent Fleet Management',
    body: 'Connect fleet operations with digital trip management, GPS tracking, reporting and centralized operational visibility.',
    cta: 'Explore Fleet Technology',
    href: '/technology/',
    icon: GearSixIcon,
    image: controlRoom,
    focus: '50% 45%',
  },
]

export function SolutionsGrid() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-20 bg-paper-2">
      <div className="frame px-4 py-16 sm:px-6 md:py-24 lg:px-10">
        <SectionHeading id="solutions-title" eyebrow="Our solutions" title="Our Mobility Solutions" highlight="Solutions" align="center" />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <li key={c.href} className="reveal">
              <Link href={c.href} className="card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    style={{ objectPosition: c.focus }}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--eyebrow-color,var(--muted-red))_12%,transparent)]">
                      <c.icon weight="fill" aria-hidden className="size-6 text-[var(--eyebrow-color,var(--muted-red))]" />
                    </span>
                    <h3 className="display text-xl font-bold leading-snug">{c.title}</h3>
                  </div>
                  <p className="text-ink-soft">{c.body}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-link">
                    {c.cta}
                    <span className="flex size-6 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--link)_12%,transparent)] transition-transform group-hover:translate-x-1">
                      <ArrowRightIcon aria-hidden className="size-3.5" />
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

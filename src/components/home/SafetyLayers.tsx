import {
  ArrowRightIcon,
  CameraIcon,
  MapPinAreaIcon,
  SteeringWheelIcon,
  WindIcon,
} from '@phosphor-icons/react/dist/ssr'
import type { Icon } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'

import breathalyzer from '../../../public/images/breathalyzer-check.jpg'

const layers: { icon: Icon; title: string; body: string; href: string }[] = [
  {
    icon: WindIcon,
    title: 'IoT-enabled breathalyzer',
    body: 'Breath alcohol screening before each trip, with results sent to a central platform.',
    href: '/safety/iot-breathalyzer/',
  },
  {
    icon: MapPinAreaIcon,
    title: 'GPS and geofencing',
    body: 'Route monitoring, geofence alerts and route deviation visibility.',
    href: '/safety/gps-geofencing/',
  },
  {
    icon: CameraIcon,
    title: 'AI video telematics',
    body: 'Flags selected events such as fatigue, distraction, phone use and seatbelt violations.',
    href: '/safety/ai-video-telematics/',
  },
  {
    icon: SteeringWheelIcon,
    title: 'ADAS',
    body: 'Driver assistance that can warn of forward collision risk and lane departure.',
    href: '/safety/adas/',
  },
]

export function SafetyLayers() {
  return (
    <section aria-labelledby="safety-title" className="border-b border-rule">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className="relative min-h-[360px] overflow-hidden border-b border-rule lg:col-span-5 lg:min-h-full lg:border-b-0 lg:border-r">
          <Image
            src={breathalyzer}
            alt="A G DRIVE driver taking a breath alcohol test before starting a trip"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[30%_50%]"
          />
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-col gap-5 border-b border-rule px-4 pb-10 pt-16 sm:px-6 md:pt-24 lg:px-10">
            <h2 id="safety-title" className="display text-4xl font-extrabold md:text-6xl">
              Safety at every stage of the journey
            </h2>
            <p className="max-w-[56ch] leading-relaxed text-ink-soft">
              Driver readiness checks, route monitoring and intelligent alerts work alongside driver training and
              vehicle maintenance.
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2">
            {layers.map((l, i) => (
              <li
                key={l.href}
                className={`reveal border-b border-rule ${i % 2 === 0 ? 'sm:border-r' : ''} ${i >= 2 ? 'sm:border-b-0' : ''}`}
              >
                <Link href={l.href} className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-paper-2 md:p-8">
                  <l.icon weight="light" aria-hidden className="size-10 text-link" />
                  <h3 className="display text-2xl font-bold">{l.title}</h3>
                  <p className="text-ink-soft">{l.body}</p>
                  <ArrowRightIcon
                    aria-hidden
                    className="mt-auto size-5 text-link transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ol>

          <p className="border-t border-rule px-4 py-5 text-sm text-ink-soft sm:px-6 lg:px-10">
            Safety technology supports driver awareness. It does not replace responsible driving, training or
            traffic regulations.
          </p>
        </div>
      </div>
    </section>
  )
}

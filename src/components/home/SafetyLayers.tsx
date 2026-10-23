'use client'

import {
  ArrowRightIcon,
  CameraIcon,
  MapPinAreaIcon,
  SteeringWheelIcon,
  WindIcon,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { RevealText } from '@/components/motion/RevealText'
import aiAlerts from '../../../public/images/ai-telematics-alerts.jpg'
import breathalyzer from '../../../public/images/breathalyzer-check.jpg'
import fleetHighway from '../../../public/images/fleet-highway.jpg'
import sedanNight from '../../../public/images/sedan-night.jpg'

const layers: { icon: Icon; title: string; body: string; href: string; image: StaticImageData; alt: string; focus: string }[] = [
  {
    icon: WindIcon,
    title: 'IoT-enabled breathalyzer',
    body: 'Breath alcohol screening before each trip, with results sent to a central platform.',
    href: '/safety/iot-breathalyzer/',
    image: breathalyzer,
    alt: 'A G DRIVE driver taking a breath alcohol test before starting a trip',
    focus: '30% 50%',
  },
  {
    icon: MapPinAreaIcon,
    title: 'GPS and geofencing',
    body: 'Route monitoring, geofence alerts and route deviation visibility.',
    href: '/safety/gps-geofencing/',
    image: sedanNight,
    alt: 'A G DRIVE sedan on a monitored route at night',
    focus: '40% 70%',
  },
  {
    icon: CameraIcon,
    title: 'AI video telematics',
    body: 'Flags selected events such as fatigue, distraction, phone use and seatbelt violations.',
    href: '/safety/ai-video-telematics/',
    image: aiAlerts,
    alt: 'AI telematics alerts for driver fatigue, drowsiness and distraction',
    focus: '50% 50%',
  },
  {
    icon: SteeringWheelIcon,
    title: 'ADAS',
    body: 'Driver assistance that can warn of forward collision risk and lane departure.',
    href: '/safety/adas/',
    image: fleetHighway,
    alt: 'G DRIVE vehicles keeping lanes on a city highway',
    focus: '50% 75%',
  },
]

// Hovering or focusing a safety layer brings its photo forward on the left.
export function SafetyLayers() {
  const [active, setActive] = useState(0)

  return (
    <section data-section="Safety" aria-labelledby="safety-title" className="border-b border-rule">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className="relative min-h-[360px] overflow-hidden border-b border-rule lg:col-span-5 lg:min-h-full lg:border-b-0 lg:border-r">
          {layers.map((l, i) => (
            <motion.div
              key={l.href}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={l.image}
                alt={i === active ? l.alt : ''}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                style={{ objectPosition: l.focus }}
                className="object-cover"
              />
            </motion.div>
          ))}
          <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-navy/85 px-4 py-3 font-mono text-xs uppercase tracking-[0.1em] text-cream backdrop-blur-sm">
            <span className="text-gold">{String(active + 1).padStart(2, '0')}</span>
            {layers[active].title}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-col gap-5 border-b border-rule px-4 pb-10 pt-16 sm:px-6 md:pt-24 lg:px-10">
            <RevealText
              id="safety-title"
              text="Safety at every stage of the journey"
              className="display text-4xl font-extrabold md:text-6xl"
            />
            <p className="max-w-[56ch] leading-relaxed text-ink-soft">
              Driver readiness checks, route monitoring and intelligent alerts work alongside driver training and
              vehicle maintenance.
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2">
            {layers.map((l, i) => (
              <li
                key={l.href}
                className={`border-b border-rule ${i % 2 === 0 ? 'sm:border-r' : ''} ${i >= 2 ? 'sm:border-b-0' : ''}`}
              >
                <Link
                  href={l.href}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group relative flex h-full flex-col gap-4 overflow-hidden p-6 transition-colors md:p-8 ${
                    i === active ? 'bg-paper-2' : ''
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-1 origin-left bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      i === active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
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

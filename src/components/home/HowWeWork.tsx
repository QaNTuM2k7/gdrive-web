'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { RevealText } from '@/components/motion/RevealText'
import busBoarding from '../../../public/images/bus-boarding.jpg'
import driverTraining from '../../../public/images/driver-training.jpg'
import employeesBoarding from '../../../public/images/employees-boarding.jpg'
import maintenanceBay from '../../../public/images/maintenance-bay.jpg'
import sedanNight from '../../../public/images/sedan-night.jpg'

// "Our approach to mobility" from the About page, told as five steps.
const steps = [
  {
    title: 'Transportation planning and coordination',
    body: 'Routes, pickup points and schedules planned around your offices, campuses and shift timings.',
    image: employeesBoarding,
    alt: 'Employees boarding a G DRIVE shuttle at a pickup point',
  },
  {
    title: 'Fleet and driver allocation',
    body: 'Buses, vans, SUVs, sedans or electric vehicles matched to passenger numbers and journey types.',
    image: busBoarding,
    alt: 'Staff boarding a G DRIVE bus',
  },
  {
    title: 'Technology-enabled trip monitoring',
    body: 'GPS tracking, trip status and centralised visibility for your transport administrators.',
    image: sedanNight,
    alt: 'A G DRIVE sedan on a city highway at night',
  },
  {
    title: 'Safety, training and maintenance',
    body: 'Driver screening and training, routine inspections and preventive vehicle maintenance.',
    image: maintenanceBay,
    alt: 'A technician servicing a vehicle in the G DRIVE maintenance bay',
  },
  {
    title: 'Operational reporting and service support',
    body: 'Trip records, operational reports and billing information for structured transport administration.',
    image: driverTraining,
    alt: 'G DRIVE drivers in a training session',
  },
]

// A pinned panel on the left follows the step currently crossing the middle of the screen.
export function HowWeWork() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    stepRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section data-section="How we work" aria-labelledby="how-title" className="border-b border-rule">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className="border-b border-rule lg:col-span-5 lg:border-b-0 lg:border-r">
          <div className="flex flex-col lg:sticky lg:top-16 lg:h-[calc(100dvh-4rem)]">
            <div className="flex flex-col gap-4 border-b border-rule px-4 pb-8 pt-16 sm:px-6 md:pt-24 lg:px-10 lg:pt-14">
              <RevealText id="how-title" text="How we work" className="display text-4xl font-extrabold md:text-6xl" />
              <p className="font-mono text-sm text-ink-soft" aria-live="polite">
                <span className="text-link">{String(active + 1).padStart(2, '0')}</span> / {String(steps.length).padStart(2, '0')}
              </p>
            </div>
            <div className="relative hidden flex-1 overflow-hidden lg:block">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={s.image} alt={s.alt} fill placeholder="blur" sizes="40vw" className="object-cover" />
                </motion.div>
              ))}
              <div className="absolute inset-x-0 bottom-0 flex h-1.5 bg-navy/40">
                <motion.div
                  className="h-full bg-gold"
                  initial={false}
                  animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {steps.map((s, i) => (
            <li
              key={s.title}
              ref={(el) => {
                stepRefs.current[i] = el
              }}
              data-index={i}
              className="flex min-h-[46vh] flex-col justify-center gap-4 border-b border-rule px-4 py-12 transition-opacity duration-500 last:border-b-0 sm:px-6 lg:min-h-[64vh] lg:px-12"
              style={{ opacity: i === active ? 1 : 0.55 }}
            >
              <span className="font-mono text-sm text-link">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display max-w-[18ch] text-3xl font-extrabold md:text-5xl">{s.title}</h3>
              <p className="max-w-[46ch] text-lg leading-relaxed text-ink-soft">{s.body}</p>
              <div className="relative mt-4 aspect-[16/9] overflow-hidden lg:hidden">
                <Image src={s.image} alt={s.alt} fill placeholder="blur" sizes="100vw" className="object-cover" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

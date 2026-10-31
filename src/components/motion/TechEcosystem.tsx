'use client'

import {
  ArrowRightIcon,
  CarIcon,
  ChartBarIcon,
  DesktopIcon,
  DeviceMobileIcon,
  FileTextIcon,
  MapPinIcon,
  PauseIcon,
  PlayIcon,
  UserIcon,
} from '@phosphor-icons/react'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// The client's "G DRIVE Technology Ecosystem" flow as a live diagram: a marker follows a journey through the
// seven stages, and any stage can be opened. Coordinates are in the 1000 x 420 space of the SVG route.
const stages = [
  {
    label: ['Client /', 'Travel Request'],
    title: 'Client / Travel Request',
    body: 'Travel requests and schedules are managed digitally instead of through separate manual updates.',
    icon: UserIcon,
    x: 125,
    y: 90,
  },
  {
    label: ['Central', 'Operations Portal'],
    title: 'Central Operations Portal',
    body: 'A centralized operations portal provides a coordinated view of transport activity across vehicles, drivers and scheduled trips.',
    icon: DesktopIcon,
    x: 375,
    y: 90,
  },
  {
    label: ['Fleet & Driver', 'Allocation'],
    title: 'Fleet & Driver Allocation',
    body: 'Vehicles and drivers are allocated to each journey, alongside trip scheduling and route planning.',
    icon: CarIcon,
    x: 625,
    y: 90,
  },
  {
    label: ['Driver App', 'Passenger App'],
    title: 'Driver App & Passenger App',
    body: 'Drivers see trip information, assigned journey details and status updates. Passengers can receive driver and vehicle information and trip notifications, with booking and tracking where enabled.',
    icon: DeviceMobileIcon,
    x: 875,
    y: 90,
  },
  {
    label: ['GPS &', 'Telematics'],
    title: 'GPS & Telematics',
    body: 'Authorized operational teams can view vehicle locations, route movement and trip status updates, with geofence-based monitoring and route deviation alerts.',
    icon: MapPinIcon,
    x: 875,
    y: 290,
  },
  {
    label: ['Control', 'Tower'],
    title: 'Control Tower',
    body: 'Operational coordination, monitoring and reporting come together in one view of vehicles, drivers and scheduled trips.',
    icon: ChartBarIcon,
    x: 625,
    y: 290,
  },
  {
    label: ['Billing &', 'Reporting'],
    title: 'Billing & Reporting',
    body: 'Authorized teams can review trip records, service activity, selected operational metrics and billing information.',
    icon: FileTextIcon,
    x: 375,
    y: 290,
  },
]

// The route leaves Driver App on the right and comes back into GPS, so it never crosses a stage label.
const waypoints = [
  { x: 125, y: 90 },
  { x: 965, y: 90 },
  { x: 965, y: 290 },
  { x: 375, y: 290 },
]
const route = 'M125 90 H965 V290 H375'
const STEP_MS = 3600

// Length of each leg of the route, and how far along it each stage sits.
const legs = waypoints.slice(1).map((w, i) => Math.abs(w.x - waypoints[i].x) + Math.abs(w.y - waypoints[i].y))
const total = legs.reduce((a, b) => a + b, 0)
const distances = stages.map((s, i) => (i < 4 ? s.x - waypoints[0].x : legs[0] + legs[1] + (waypoints[2].x - s.x)))

function pointAt(d: number) {
  let i = 0
  let start = 0
  while (i < legs.length - 1 && d > start + legs[i]) start += legs[i++]
  const a = waypoints[i]
  const b = waypoints[i + 1]
  const t = (d - start) / legs[i]
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
}

// Direction markers between stages: position, rotation and the stage they lead away from.
const chevrons = [
  { x: 250, y: 90, angle: 0 },
  { x: 500, y: 90, angle: 0 },
  { x: 750, y: 90, angle: 0 },
  { x: 965, y: 190, angle: 90 },
  { x: 750, y: 290, angle: 180 },
  { x: 500, y: 290, angle: 180 },
]

const num = (i: number) => String(i + 1).padStart(2, '0')

function nodeTone(state: 'active' | 'done' | 'next') {
  if (state === 'active') return 'bg-gold text-navy scale-110 shadow-[0_0_0_6px_rgb(229_185_87/0.2)]'
  if (state === 'done') return 'bg-blue text-white'
  return 'bg-white/10 text-on-blue ring-1 ring-inset ring-white/30 group-hover:bg-white/20'
}

export function TechEcosystem() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState<boolean | null>(null)
  const [hovering, setHovering] = useState(false)
  const reduced = usePrefersReducedMotion()
  // Visitors who prefer less motion start paused, and can still press play.
  const isPaused = paused ?? reduced

  // Watches the wide layout, which is display:none on phones. So the tour never runs there, where expanding
  // stages would keep moving the page under the reader.
  const wideRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wideRef, { amount: 0.4 })
  const running = inView && !isPaused && !hovering

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setActive((a) => (a + 1) % stages.length), STEP_MS)
    return () => clearInterval(id)
  }, [running])

  const progress = useMotionValue(0)
  const x = useTransform(progress, (d) => pointAt(d).x)
  const y = useTransform(progress, (d) => pointAt(d).y)
  const pathLength = useTransform(progress, (d) => d / total)

  useEffect(() => {
    if (reduced) {
      progress.set(distances[active])
      return
    }
    const controls = animate(progress, distances[active], { duration: 1.1, ease: [0.65, 0, 0.35, 1] })
    return () => controls.stop()
  }, [active, reduced, progress])

  const stage = stages[active]
  const open = (i: number) => {
    setActive(i)
    setPaused(true)
  }

  return (
    <div className="on-deep mt-12 overflow-hidden rounded-2xl shadow-card">
      <h3 className="display px-6 pt-8 text-2xl font-bold md:px-10 md:text-3xl">G DRIVE Technology Ecosystem</h3>

      {/* Wide layout: the route with a detail panel beside it. */}
      <div ref={wideRef} className="hidden grid-cols-12 gap-6 p-6 pt-4 md:grid md:p-10 md:pt-6">
        <div
          className="relative col-span-12 aspect-[1000/420] xl:col-span-8"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <svg viewBox="0 0 1000 420" aria-hidden className="absolute inset-0 size-full overflow-visible" fill="none">
            <path d={route} stroke="rgb(255 255 255 / 0.22)" strokeWidth="4" strokeLinejoin="round" />
            <motion.path d={route} stroke="var(--gold)" strokeWidth="4" strokeLinejoin="round" style={{ pathLength }} />
            {chevrons.map((c, i) => (
              <path
                key={`${c.x}-${c.y}`}
                d="M-6 -8 L4 0 L-6 8"
                transform={`translate(${c.x} ${c.y}) rotate(${c.angle})`}
                stroke={i < active ? 'var(--gold)' : 'rgb(255 255 255 / 0.55)'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-[stroke] duration-500"
              />
            ))}
            <motion.g style={{ x, y }}>
              <circle r="15" fill="var(--gold)" opacity="0.25" />
              <circle r="7" fill="var(--gold)" />
            </motion.g>
          </svg>

          {stages.map((s, i) => {
            const Icon = s.icon
            const state = i === active ? 'active' : i < active ? 'done' : 'next'
            return (
              <div key={s.title} className="absolute size-0" style={{ left: `${s.x / 10}%`, top: `${(s.y / 420) * 100}%` }}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  aria-controls="ecosystem-detail"
                  onClick={() => open(i)}
                  onMouseEnter={() => setActive(i)}
                  className="group absolute left-0 top-0 flex size-[clamp(52px,6vw,72px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                >
                  {i === active && (
                    <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-gold/30 [animation-duration:2.2s] motion-reduce:hidden" />
                  )}
                  <span className={`relative flex size-full items-center justify-center rounded-full transition-[background-color,color,transform,box-shadow] duration-500 ${nodeTone(state)}`}>
                    <Icon weight={i === active ? 'fill' : 'regular'} aria-hidden className="size-[46%]" />
                  </span>
                  <span
                    className={`absolute left-1/2 top-full mt-3 w-[clamp(110px,14vw,150px)] -translate-x-1/2 text-center text-xs font-semibold leading-snug transition-colors duration-500 lg:text-sm ${
                      i === active ? 'text-gold' : 'text-on-blue'
                    }`}
                  >
                    {s.label[0]}
                    <br />
                    {s.label[1]}
                  </span>
                </button>
              </div>
            )
          })}
        </div>

        <div className="col-span-12 flex flex-col justify-between gap-6 rounded-2xl bg-white/[0.07] p-6 xl:col-span-4 xl:p-7">
          {/* Invisible copies of every stage hold the panel at the tallest one, so the page never shifts. */}
          <div id="ecosystem-detail" aria-live={running ? 'off' : 'polite'} className="grid">
            {stages.map((s) => (
              <div key={s.title} aria-hidden className="invisible flex flex-col gap-3 [grid-area:1/1]">
                <p className="font-mono text-xs uppercase tracking-[0.14em]">Stage</p>
                <p className="display text-2xl font-bold leading-tight">{s.title}</p>
                <p className="leading-relaxed">{s.body}</p>
              </div>
            ))}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3 [grid-area:1/1]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
                  Stage {num(active)} of {num(stages.length - 1)}
                </p>
                <p className="display text-2xl font-bold leading-tight">{stage.title}</p>
                <p className="leading-relaxed text-on-blue-soft">{stage.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setPaused(!isPaused)}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white/10 px-4 font-mono text-xs uppercase tracking-[0.08em] text-on-blue transition-colors hover:bg-white/20"
            >
              {isPaused ? <PlayIcon weight="fill" aria-hidden className="size-4" /> : <PauseIcon weight="fill" aria-hidden className="size-4" />}
              {isPaused ? 'Play tour' : 'Pause tour'}
            </button>
            <button
              type="button"
              onClick={() => open((active + 1) % stages.length)}
              className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-gold hover:text-on-blue"
            >
              {active === stages.length - 1 ? 'Back to start' : 'Next stage'}
              <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Phones: the same journey as a vertical timeline. Tap a stage to read about it. */}
      <ol className="flex flex-col px-6 pb-8 pt-6 md:hidden">
        {stages.map((s, i) => {
          const Icon = s.icon
          const state = i === active ? 'active' : i < active ? 'done' : 'next'
          return (
            <li key={s.title} className="relative pb-5 last:pb-0">
              {i < stages.length - 1 && (
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-[25px] top-[52px] w-0.5 transition-colors duration-500 ${i < active ? 'bg-gold' : 'bg-white/25'}`}
                />
              )}
              <button
                type="button"
                aria-expanded={i === active}
                aria-controls={`ecosystem-stage-${i}`}
                onClick={() => setActive(i)}
                className="group flex w-full items-center gap-4 text-left"
              >
                <span className={`flex size-[52px] shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform,box-shadow] duration-500 ${nodeTone(state)}`}>
                  <Icon weight={i === active ? 'fill' : 'regular'} aria-hidden className="size-6" />
                </span>
                <span className={`font-semibold leading-snug transition-colors ${i === active ? 'text-gold' : 'text-on-blue'}`}>{s.title}</span>
              </button>
              <div
                id={`ecosystem-stage-${i}`}
                className={`grid pl-[68px] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${i === active ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden" inert={i !== active}>
                  <p className="pt-2 text-sm leading-relaxed text-on-blue-soft">{s.body}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

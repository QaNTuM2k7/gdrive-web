'use client'

import { motion } from 'motion/react'
import { useEffect, useId, useRef } from 'react'

type Route = { d: string; rail?: boolean; draw?: boolean }
type Stop = { x: number; y: number; label?: string; hub?: boolean; labelAt?: 'above' | 'below' | 'left' | 'right' }
type Vehicle = { route: number; dur: number; begin?: number; train?: boolean }
type Diagram = { routes: Route[]; stops: Stop[]; vehicles: Vehicle[]; live?: boolean }

// Metro-map style diagrams of how each service moves people. Coordinates use a 480 x 300 grid.
export const diagrams: Record<string, Diagram> = {
  'employee-transportation': {
    routes: [{ d: 'M40 60 H220 V150 H440' }, { d: 'M40 150 H440' }, { d: 'M40 240 H220 V150 H440' }],
    stops: [
      { x: 40, y: 60, label: 'Pickup', labelAt: 'above' },
      { x: 40, y: 150, label: 'Pickup', labelAt: 'above' },
      { x: 40, y: 240, label: 'Pickup', labelAt: 'below' },
      { x: 440, y: 150, label: 'Office', hub: true, labelAt: 'above' },
    ],
    vehicles: [
      { route: 0, dur: 5 },
      { route: 1, dur: 4, begin: -1.5 },
      { route: 2, dur: 5.5, begin: -3 },
    ],
  },
  'corporate-car-rental': {
    routes: [{ d: 'M50 230 H210 V80 H430' }, { d: 'M50 230 H430 V80' }],
    stops: [
      { x: 50, y: 230, label: 'Airport', hub: true, labelAt: 'below' },
      { x: 210, y: 80, label: 'Meeting', labelAt: 'above' },
      { x: 430, y: 80, label: 'Office', hub: true, labelAt: 'above' },
    ],
    vehicles: [
      { route: 0, dur: 5 },
      { route: 1, dur: 6, begin: -2.5 },
    ],
  },
  'executive-car-rental': {
    routes: [{ d: 'M50 70 H260 V230 H430' }],
    stops: [
      { x: 50, y: 70, label: 'Hotel', labelAt: 'below' },
      { x: 260, y: 150, label: 'Meeting', labelAt: 'right' },
      { x: 430, y: 230, label: 'Airport', hub: true, labelAt: 'above' },
    ],
    vehicles: [{ route: 0, dur: 6 }],
  },
  'shuttle-services': {
    routes: [{ d: 'M80 70 H400 V230 H80 Z' }],
    stops: [
      { x: 80, y: 70, label: 'Gate', hub: true, labelAt: 'above' },
      { x: 400, y: 70, label: 'Tower A', labelAt: 'above' },
      { x: 400, y: 230, label: 'Tower B', labelAt: 'below' },
      { x: 80, y: 230, label: 'Parking', labelAt: 'below' },
    ],
    vehicles: [
      { route: 0, dur: 9 },
      { route: 0, dur: 9, begin: -4.5 },
    ],
  },
  'campus-mobility': {
    routes: [{ d: 'M200 70 H420 V230 H200 Z' }, { d: 'M60 150 H200' }],
    stops: [
      { x: 60, y: 150, label: 'Main gate', hub: true, labelAt: 'above' },
      { x: 200, y: 70, label: 'Library', labelAt: 'above' },
      { x: 420, y: 70, label: 'Academic', labelAt: 'above' },
      { x: 420, y: 230, label: 'Hostel', labelAt: 'below' },
      { x: 200, y: 230, label: 'Sports', labelAt: 'below' },
    ],
    vehicles: [
      { route: 0, dur: 10 },
      { route: 0, dur: 10, begin: -5 },
    ],
  },
  'metro-connect': {
    routes: [{ d: 'M10 80 H470', rail: true }, { d: 'M150 80 V230 H430' }, { d: 'M330 80 V160 H430' }],
    stops: [
      { x: 150, y: 80, label: 'Metro', hub: true, labelAt: 'above' },
      { x: 330, y: 80, label: 'Metro', hub: true, labelAt: 'above' },
      { x: 430, y: 160, label: 'Campus', labelAt: 'above' },
      { x: 430, y: 230, label: 'Office', labelAt: 'below' },
    ],
    vehicles: [
      { route: 0, dur: 7, train: true },
      { route: 1, dur: 5 },
      { route: 2, dur: 4, begin: -2 },
    ],
  },
  tower: {
    live: true,
    routes: [
      { d: 'M40 50 H440 V250 H40 Z' },
      { d: 'M40 150 H440' },
      { d: 'M170 50 V250' },
      { d: 'M310 250 V50' },
    ],
    stops: [
      { x: 40, y: 250, label: 'Depot', hub: true, labelAt: 'below' },
      { x: 440, y: 50, label: 'Campus', labelAt: 'above' },
      { x: 310, y: 150 },
      { x: 170, y: 150 },
    ],
    vehicles: [
      { route: 0, dur: 14 },
      { route: 0, dur: 14, begin: -7 },
      { route: 1, dur: 6, begin: -1 },
      { route: 2, dur: 5, begin: -2 },
      { route: 3, dur: 5.5, begin: -3.5 },
    ],
  },
}

const labelPos = (s: Stop) => {
  switch (s.labelAt) {
    case 'below':
      return { x: s.x, y: s.y + 32, anchor: 'middle' as const }
    case 'left':
      return { x: s.x - 22, y: s.y + 4, anchor: 'end' as const }
    case 'right':
      return { x: s.x + 22, y: s.y + 4, anchor: 'start' as const }
    default:
      return { x: s.x, y: s.y - 22, anchor: 'middle' as const }
  }
}

export function RouteDiagram({ name, className = '' }: { name: keyof typeof diagrams | string; className?: string }) {
  const diagram = diagrams[name] ?? diagrams.tower
  const svgRef = useRef<SVGSVGElement>(null)
  const patternId = useId()

  // SMIL ignores the reduced-motion setting, so pause the vehicles manually.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => (mq.matches ? svgRef.current?.pauseAnimations() : svgRef.current?.unpauseAnimations())
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 480 300" className={`h-full w-full ${className}`} aria-hidden>
      <defs>
        <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.2" fill="currentColor" opacity="0.28" />
        </pattern>
      </defs>
      <rect width="480" height="300" fill={`url(#${patternId})`} />

      {diagram.routes.map((r, i) =>
        r.rail ? (
          <g key={i}>
            <path d={r.d} stroke="currentColor" strokeWidth="12" fill="none" opacity="0.35" />
            <path d={r.d} stroke="currentColor" strokeWidth="4" strokeDasharray="14 10" fill="none" />
          </g>
        ) : (
          <motion.path
            key={i}
            d={r.d}
            stroke="currentColor"
            strokeWidth="6"
            strokeLinejoin="miter"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, delay: 0.15 * i, ease: [0.65, 0, 0.35, 1] }}
          />
        ),
      )}

      {diagram.vehicles.map((v, i) => {
        const d = diagram.routes[v.route].d
        const w = v.train ? 34 : 14
        const h = v.train ? 12 : 14
        return (
          <rect key={i} x={-w / 2} y={-h / 2} width={w} height={h} fill="var(--gold)">
            <animateMotion dur={`${v.dur}s`} begin={`${v.begin ?? 0}s`} repeatCount="indefinite" path={d} />
          </rect>
        )
      })}

      {diagram.stops.map((s, i) => {
        const size = s.hub ? 24 : 16
        const l = labelPos(s)
        return (
          <g key={i}>
            <rect
              x={s.x - size / 2}
              y={s.y - size / 2}
              width={size}
              height={size}
              fill={s.hub ? 'var(--gold)' : 'var(--blue-deep)'}
              stroke={s.hub ? 'var(--navy)' : 'currentColor'}
              strokeWidth="3"
            />
            {s.label && (
              <text
                x={l.x}
                y={l.y}
                textAnchor={l.anchor}
                fill="currentColor"
                className="font-mono text-[13px] uppercase tracking-[0.08em]"
              >
                {s.label}
              </text>
            )}
          </g>
        )
      })}

      {diagram.live && (
        <g className="font-mono text-[12px] uppercase tracking-[0.1em]">
          <rect x="16" y="12" width="10" height="10" fill="var(--gold)">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
          </rect>
          <text x="34" y="21" fill="currentColor">
            Live trips
          </text>
        </g>
      )}
    </svg>
  )
}

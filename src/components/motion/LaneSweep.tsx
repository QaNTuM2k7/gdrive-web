'use client'

import { motion, type MotionValue, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Lane markings that stretch across the screen as you scroll into the closing call to action.
const lanes = [
  { from: 'left', end: 0.5, gapAt: 0.62 },
  { from: 'right', end: 0.42, gapAt: 0.3 },
  { from: 'left', end: 0.58, gapAt: null },
  { from: 'right', end: 0.47, gapAt: 0.74 },
  { from: 'left', end: 0.4, gapAt: 0.18 },
  { from: 'right', end: 0.55, gapAt: null },
  { from: 'left', end: 0.45, gapAt: 0.5 },
  { from: 'right', end: 0.6, gapAt: 0.86 },
] as const

function Lane({
  progress,
  from,
  end,
  gapAt,
  still,
}: {
  progress: MotionValue<number>
  from: string
  end: number
  gapAt: number | null
  still: boolean
}) {
  const scaled = useTransform(progress, [0.05, end], [0.04, 1])
  // Scroll-linked motion is still motion: reduced-motion visitors get full, static lanes.
  const scaleX = still ? 1 : scaled
  return (
    <div className="relative h-3 md:h-4">
      <motion.div
        style={{ scaleX, transformOrigin: from === 'left' ? 'left' : 'right' }}
        className="absolute inset-0 bg-cream"
      />
      {gapAt !== null && (
        <span className="absolute inset-y-0 w-[4%] bg-blue" style={{ left: `${gapAt * 100}%` }} />
      )}
    </div>
  )
}

export function LaneSweep() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end center'] })
  const still = usePrefersReducedMotion()

  return (
    <div ref={ref} aria-hidden className="on-blue border-b border-rule-on-blue">
      <div className="frame flex flex-col gap-4 py-10 md:gap-5 md:py-14">
        {lanes.map((l, i) => (
          <Lane key={i} progress={scrollYProgress} still={still} {...l} />
        ))}
      </div>
    </div>
  )
}

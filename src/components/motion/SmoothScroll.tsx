'use client'

import 'lenis/dist/lenis.css'

import { ReactLenis } from 'lenis/react'
import { MotionConfig, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

// Inertia scrolling for the whole page; anchor links land below the sticky header.
// MotionConfig makes every Motion animation respect the visitor's reduced-motion setting,
// and those visitors also keep native scrolling.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      {reduce ? (
        children
      ) : (
        <ReactLenis root options={{ lerp: 0.11, anchors: { offset: -64 }, autoRaf: true }}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  )
}

'use client'

import 'lenis/dist/lenis.css'

import { ReactLenis } from 'lenis/react'
import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Inertia scrolling for the whole page; anchor links land below the sticky header.
// Lenis runs in root mode beside the content (useLenis still finds it), so turning it off for
// reduced-motion visitors never remounts the page. MotionConfig makes every Motion animation
// respect the same setting.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      {!reduce && <ReactLenis root options={{ lerp: 0.11, anchors: { offset: -64 }, autoRaf: true }} />}
      {children}
    </MotionConfig>
  )
}

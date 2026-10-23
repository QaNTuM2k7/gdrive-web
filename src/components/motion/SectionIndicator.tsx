'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

// Vertical label in the right gutter naming the section in view, like a route board.
// Only shown on screens wide enough to have a gutter outside the framed column.
export function SectionIndicator() {
  const [state, setState] = useState<{ index: number; total: number; name: string } | null>(null)

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')]
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const index = sections.indexOf(e.target as HTMLElement)
          setState({ index, total: sections.length, name: (e.target as HTMLElement).dataset.section ?? '' })
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  if (!state) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 mix-blend-difference min-[1460px]:block"
      style={{ right: 'max(4px, calc((100vw - 1400px) / 2 - 26px))' }}
    >
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-cream [writing-mode:vertical-rl]">
        <span>
          {String(state.index + 1).padStart(2, '0')}/{String(state.total).padStart(2, '0')}
        </span>
        <span className="h-10 w-px bg-cream/60" />
        <AnimatePresence mode="wait">
          <motion.span
            key={state.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {state.name}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

'use client'

import { motion, type Variants } from 'motion/react'

const NBSP = String.fromCharCode(160)

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p }

const container: Variants = {
  hidden: {},
  show: (delay: number) => ({ transition: { staggerChildren: 0.06, delayChildren: delay } }),
}

const word: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

// Headline whose words rise out of a mask, either on load (hero) or when scrolled into view.
// Screen readers get the plain sentence through aria-label.
export function RevealText({
  text,
  as = 'h2',
  id,
  className = '',
  delay = 0,
  onMount = false,
  highlight,
}: {
  text: string
  as?: keyof typeof tags
  id?: string
  className?: string
  delay?: number
  onMount?: boolean
  /** A word to colour with the accent, e.g. "Solutions" in "Our Mobility Solutions". */
  highlight?: string
}) {
  const Tag = tags[as]

  return (
    <Tag
      id={id}
      aria-label={text}
      className={className}
      variants={container}
      custom={delay}
      initial="hidden"
      {...(onMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.6 } })}
    >
      {/* Keep the brand name on one line: the non-breaking space stops "G" and "DRIVE" splitting. */}
      {text.replace(/G DRIVE/g, `G${NBSP}DRIVE`).split(' ').map((w, i) => (
        <span key={i} aria-hidden className="inline-flex overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            variants={word}
            className={`inline-block ${highlight && w === highlight ? 'text-[var(--eyebrow-color,var(--muted-red))]' : ''}`}
          >
            {w}
          </motion.span>
          {NBSP}
        </span>
      ))}
    </Tag>
  )
}

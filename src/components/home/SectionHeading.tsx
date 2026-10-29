import type { ReactNode } from 'react'

import { RevealText } from '@/components/motion/RevealText'

// Eyebrow, heading and optional intro used at the top of homepage sections.
export function SectionHeading({
  id,
  eyebrow,
  title,
  highlight,
  intro,
  align = 'left',
  className = '',
}: {
  id?: string
  eyebrow?: string
  title: string
  highlight?: string
  intro?: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  const centered = align === 'center'
  return (
    <div className={`flex flex-col gap-4 ${centered ? 'items-center text-center' : ''} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <RevealText
        id={id}
        text={title}
        highlight={highlight}
        className={`display text-3xl font-extrabold leading-tight md:text-5xl ${centered ? 'max-w-[24ch]' : 'max-w-[20ch]'}`}
      />
      {intro && <div className={`text-lg leading-relaxed text-ink-soft ${centered ? 'max-w-[72ch]' : 'max-w-[60ch]'}`}>{intro}</div>}
    </div>
  )
}

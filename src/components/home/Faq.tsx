'use client'

import { PlusIcon } from '@phosphor-icons/react'
import { useId, useState } from 'react'

import { RevealText } from '@/components/motion/RevealText'

export type FaqItem = { q: string; a: string }

// Accordion that opens one answer at a time. Height animates with a grid-rows transition, so no measuring.
export function Faq({ items, title = 'Questions we often hear' }: { items: FaqItem[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()

  return (
    <section data-section="FAQ" aria-labelledby={`${base}-title`} className="border-b border-rule">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className="border-b border-rule px-4 pb-10 pt-16 sm:px-6 md:pt-24 lg:col-span-4 lg:border-b-0 lg:border-r lg:px-10">
          <div className="lg:sticky lg:top-24">
            <RevealText id={`${base}-title`} text={title} className="display text-4xl font-extrabold md:text-5xl" />
          </div>
        </div>
        <ul className="lg:col-span-8">
          {items.map((item, i) => {
            const isOpen = open === i
            const btn = `${base}-q${i}`
            const panel = `${base}-a${i}`
            return (
              <li key={item.q} className="border-b border-rule last:border-b-0">
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 px-4 py-6 text-left transition-colors hover:bg-paper-2 sm:px-6 md:py-7 lg:px-10"
                  >
                    <span className="display text-xl font-bold md:text-2xl">{item.q}</span>
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center border transition-[background-color,color,border-color] duration-500 ${
                        isOpen ? 'border-gold bg-gold text-navy' : 'border-rule-strong text-ink'
                      }`}
                    >
                      <PlusIcon
                        aria-hidden
                        className={`size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-45' : ''}`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="max-w-[62ch] px-4 pb-8 text-lg leading-relaxed text-ink-soft sm:px-6 lg:px-10">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

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
    <section data-section="FAQ" aria-labelledby={`${base}-title`} className="bg-paper-2">
      <div className="frame grid grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <RevealText id={`${base}-title`} text={title} className="display text-3xl font-extrabold md:text-4xl" />
          </div>
        </div>
        <ul className="flex flex-col gap-4 lg:col-span-8">
          {items.map((item, i) => {
            const isOpen = open === i
            const btn = `${base}-q${i}`
            const panel = `${base}-a${i}`
            return (
              <li key={item.q} className="card overflow-hidden">
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
                  >
                    <span className="display text-lg font-bold group-hover:text-link md:text-xl">{item.q}</span>
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-[background-color,color] duration-500 ${
                        isOpen ? 'bg-gold text-navy' : 'bg-blue text-on-blue'
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
                    <p className="max-w-[62ch] px-6 pb-6 leading-relaxed text-ink-soft md:px-8 md:pb-8 md:text-lg">
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

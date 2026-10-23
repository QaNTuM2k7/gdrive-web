import { ArrowUpRightIcon, CheckIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { RevealText } from '@/components/motion/RevealText'
import { RouteDiagram } from '@/components/motion/RouteDiagram'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { quoteHref, solutions } from '@/lib/site'

const BAR = 68 // height of each card's title bar; cards stack with their bars still visible

// Solutions as a sticky stack: each card pins below the previous card's title bar as you scroll.
// Only stacks on screens tall and wide enough to show it; elsewhere the cards are a plain list.
export function SolutionsStack() {
  return (
    <section id="solutions" data-section="Solutions" aria-labelledby="solutions-title" className="scroll-mt-16 border-b border-rule">
      <div className="frame">
        <div className="flex flex-col gap-5 border-b border-rule px-4 pb-10 pt-16 sm:px-6 md:pt-24 lg:px-10">
          <RevealText
            id="solutions-title"
            text="Our mobility solutions"
            className="display text-4xl font-extrabold md:text-6xl"
          />
          <p className="max-w-[56ch] text-lg leading-relaxed text-ink-soft">
            Six ways we move people, from daily employee commutes to feeder shuttles at the metro station.
          </p>
        </div>

        <div>
          {solutions.map((s, i) => (
            <article
              key={s.slug}
              aria-labelledby={`sol-${s.slug}`}
              className="border-b border-rule bg-paper last:border-b-0 [@media(min-width:1024px)_and_(min-height:720px)]:sticky [@media(min-width:1024px)_and_(min-height:720px)]:mt-[var(--stack-mt)] [@media(min-width:1024px)_and_(min-height:720px)]:mb-[var(--stack-mb)]"
              // Sticky limits use the margin box, so a stepped bottom margin keeps every title bar visible
              // while the stack leaves the screen. The next card's negative top margin cancels the gap in layout.
              style={
                {
                  top: `${64 + i * BAR}px`,
                  '--stack-mb': `${(solutions.length - 1 - i) * BAR}px`,
                  '--stack-mt': i === 0 ? '0px' : `${-(solutions.length - i) * BAR}px`,
                } as React.CSSProperties
              }
            >
              <Link
                href={`/solutions/${s.slug}/`}
                className="group grid h-[68px] grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-4 border-b border-rule px-4 transition-colors hover:bg-blue hover:text-on-blue sm:px-6 lg:px-10"
              >
                <span className="font-mono text-sm text-ink-soft group-hover:text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 id={`sol-${s.slug}`} className="display truncate text-xl font-bold md:text-2xl">
                  {s.title}
                </h3>
                <ArrowUpRightIcon
                  aria-hidden
                  className="size-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="flex flex-col gap-6 px-4 py-8 sm:px-6 md:col-span-5 md:border-r md:border-rule lg:px-10 lg:py-10">
                  <p className="text-lg leading-relaxed">{s.summary}</p>
                  <ul className="flex flex-col gap-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-ink-soft">
                        <CheckIcon aria-hidden weight="bold" className="mt-1 size-4 shrink-0 text-link" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                    <ButtonLink href={quoteHref(s.slug)} variant="navy">
                      Request a Quote
                    </ButtonLink>
                    <Link
                      href={`/solutions/${s.slug}/`}
                      className="font-mono text-[13px] uppercase tracking-[0.08em] text-link hover:text-ink"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
                <div className="on-deep relative aspect-[8/5] text-cream md:col-span-7 md:aspect-auto md:min-h-[340px]">
                  <RouteDiagram name={s.slug} className="absolute inset-0 p-4 md:p-8" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

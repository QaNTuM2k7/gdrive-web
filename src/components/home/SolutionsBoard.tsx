import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { solutionIcons } from '@/components/icons'
import { solutions } from '@/lib/site'

// A departure board: each row is a route into one solution page.
export function SolutionsBoard() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-16 border-b border-rule">
      <div className="frame">
        <div className="border-b border-rule px-4 pb-8 pt-16 sm:px-6 md:pt-24 lg:px-10">
          <h2 id="solutions-title" className="display text-4xl font-extrabold md:text-6xl">
            Our mobility solutions
          </h2>
        </div>
        <ul>
          {solutions.map((s) => {
            const Icon = solutionIcons[s.icon]
            return (
              <li key={s.slug} className="border-b border-rule last:border-b-0">
                <Link
                  href={`/solutions/${s.slug}/`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 px-4 py-6 transition-colors duration-300 hover:bg-blue hover:text-on-blue sm:px-6 md:grid-cols-[64px_minmax(0,5fr)_minmax(0,6fr)_48px] md:py-8 lg:px-10"
                >
                  <Icon
                    weight="light"
                    aria-hidden
                    className="row-span-2 size-9 text-link transition-colors group-hover:text-gold md:row-span-1 md:size-11"
                  />
                  <h3 className="display text-xl font-bold md:text-3xl">{s.title}</h3>
                  <ArrowUpRightIcon
                    aria-hidden
                    className="row-span-2 size-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:order-last md:row-span-1 md:size-8"
                  />
                  <p className="col-start-2 max-w-[52ch] text-ink-soft transition-colors group-hover:text-on-blue-soft md:col-start-auto">
                    {s.summary}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

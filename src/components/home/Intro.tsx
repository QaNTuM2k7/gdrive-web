import { ArrowRightIcon, SealCheckIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { site } from '@/lib/site'

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="border-b border-rule">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className="reveal px-4 py-14 sm:px-6 md:py-20 lg:col-span-8 lg:border-r lg:border-rule lg:px-10">
          <h2 id="intro-title" className="display mb-8 text-4xl font-extrabold md:text-5xl">
            Moving people. Connecting possibilities.
          </h2>
          <p className="max-w-[34ch] text-2xl leading-snug text-ink md:text-[2rem]">
            G DRIVE is the flagship mobility brand of {site.legalName}, serving corporates, educational
            institutions and public transit networks.
          </p>
        </div>
        <div className="reveal flex flex-col justify-between gap-10 border-t border-rule px-4 py-10 sm:px-6 lg:col-span-4 lg:border-t-0 lg:px-10 lg:py-20">
          <p className="max-w-[40ch] leading-relaxed text-ink-soft">
            Our approach goes beyond transportation. We build an integrated mobility ecosystem connecting
            people, vehicles, technology and operations.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-y border-rule py-4">
              <SealCheckIcon weight="duotone" className="size-8 text-link" aria-hidden />
              <span className="text-sm">
                <strong className="block font-semibold">{site.certification} certified</strong>
                <span className="text-ink-soft">Quality management system</span>
              </span>
            </div>
            <Link
              href="/about/"
              className="group inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.08em] text-link hover:text-ink"
            >
              About G DRIVE
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

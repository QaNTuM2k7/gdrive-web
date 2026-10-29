import { ArrowRightIcon, SealCheckIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { RevealText } from '@/components/motion/RevealText'
import { site } from '@/lib/site'

export function Intro() {
  return (
    <section data-section="About" aria-labelledby="intro-title" className="bg-paper">
      <div className="frame grid grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-12 lg:px-10">
        <div className="reveal lg:col-span-8">
          <RevealText
            id="intro-title"
            text="Moving people. Connecting possibilities."
            className="display mb-8 text-4xl font-extrabold md:text-5xl"
          />
          <p className="max-w-[34ch] text-2xl leading-snug text-ink md:text-[2rem]">
            G DRIVE is the flagship mobility brand of {site.legalName}, serving corporates, educational
            institutions and public transit networks.
          </p>
        </div>
        <div className="reveal card flex flex-col justify-between gap-8 p-6 md:p-8 lg:col-span-4">
          <p className="max-w-[40ch] leading-relaxed text-ink-soft">
            Our approach goes beyond transportation. We build an integrated mobility ecosystem connecting
            people, vehicles, technology and operations.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 rounded-xl bg-paper-2 p-4">
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

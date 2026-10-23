import Link from 'next/link'

import { LaneCanvas } from '@/components/motion/LaneCanvas'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { mainNav } from '@/lib/site'

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="on-blue border-b border-rule-on-blue">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col gap-8 px-4 py-16 sm:px-6 md:py-24 lg:col-span-7 lg:border-r lg:border-rule-on-blue lg:px-10">
          <p className="font-mono text-sm uppercase tracking-[0.12em] text-gold">Error 404</p>
          <h1 className="display max-w-[14ch] text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[0.95]">
            This route doesn&apos;t exist
          </h1>
          <p className="max-w-[48ch] text-lg text-on-blue-soft">
            The page may have moved. Try one of these instead, or head back to the home page.
          </p>
          <ul className="flex flex-wrap gap-3">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="inline-flex border border-rule-on-blue px-4 py-2 font-mono text-sm uppercase tracking-[0.08em] text-on-blue transition-colors hover:bg-on-blue hover:text-blue"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <ButtonLink href="/">Back to home</ButtonLink>
          </div>
        </div>
        <div className="relative hidden min-h-[360px] p-10 lg:col-span-5 lg:block">
          <LaneCanvas laneGap={34} thickness={14} />
        </div>
      </div>
    </section>
  )
}

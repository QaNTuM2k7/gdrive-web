import { PhoneIcon } from '@phosphor-icons/react/dist/ssr'

import { LaneField } from '@/components/site/LaneField'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { primaryContact, quoteHref, telHref } from '@/lib/site'

export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="on-blue">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col gap-8 px-4 py-16 sm:px-6 md:py-24 lg:col-span-7 lg:border-r lg:border-rule-on-blue lg:px-10">
          <h2 id="cta-title" className="display max-w-[15ch] text-4xl font-extrabold leading-[1] md:text-6xl">
            Mobility for people. Progress for business.
          </h2>
          <p className="max-w-[52ch] text-lg leading-relaxed text-on-blue-soft">
            Share your locations, passenger numbers and schedules. Our team will propose a mobility arrangement
            that fits.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href={quoteHref()}>Request a Quote</ButtonLink>
            <a
              href={telHref(primaryContact.phone)}
              className="inline-flex items-center gap-2 font-mono text-sm text-on-blue hover:text-gold"
            >
              <PhoneIcon aria-hidden className="size-5" />
              {primaryContact.phone}
            </a>
          </div>
        </div>
        <div className="hidden p-10 text-cream lg:col-span-5 lg:flex">
          <LaneField className="h-full min-h-[320px] w-full" laneHeight={14} />
        </div>
      </div>
    </section>
  )
}

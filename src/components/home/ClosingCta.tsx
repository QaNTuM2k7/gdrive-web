import { PhoneIcon } from '@phosphor-icons/react/dist/ssr'

import { LaneCanvas } from '@/components/motion/LaneCanvas'
import { LaneSweep } from '@/components/motion/LaneSweep'
import { RevealText } from '@/components/motion/RevealText'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { ServiceValue } from '@/lib/leads/options'
import { primaryContact, quoteHref, telHref } from '@/lib/site'

export function ClosingCta({
  title = 'Mobility for people. Progress for business.',
  body = 'Share your locations, passenger numbers and schedules. Our team will propose a mobility arrangement that fits.',
  service,
  sweep = true,
}: {
  title?: string
  body?: string
  service?: ServiceValue
  sweep?: boolean
}) {
  return (
    <>
      {sweep && <LaneSweep />}
      <section data-section="Get a quote" aria-labelledby="cta-title" className="on-blue">
        <div className="frame grid grid-cols-1 lg:grid-cols-12">
          <div className="flex flex-col gap-8 px-4 py-16 sm:px-6 md:py-24 lg:col-span-7 lg:border-r lg:border-rule-on-blue lg:px-10">
            <RevealText
              id="cta-title"
              text={title}
              className="display max-w-[16ch] text-4xl font-extrabold leading-[1] md:text-6xl"
            />
            <p className="max-w-[52ch] text-lg leading-relaxed text-on-blue-soft">{body}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href={quoteHref(service)}>Request a Quote</ButtonLink>
              <a
                href={telHref(primaryContact.phone)}
                className="inline-flex items-center gap-2 font-mono text-sm text-on-blue hover:text-gold"
              >
                <PhoneIcon aria-hidden className="size-5" />
                {primaryContact.phone}
              </a>
            </div>
          </div>
          <div className="relative hidden min-h-[320px] p-10 lg:col-span-5 lg:block">
            <LaneCanvas laneGap={34} thickness={14} />
          </div>
        </div>
      </section>
    </>
  )
}

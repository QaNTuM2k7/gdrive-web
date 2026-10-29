import { PhoneIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import { RevealText } from '@/components/motion/RevealText'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { ServiceValue } from '@/lib/leads/options'
import { primaryContact, quoteHref, telHref } from '@/lib/site'
import pin from '../../../public/images/brand/pin-white.png'

// Closing call to action on inner pages: a rounded primary-blue panel with the G pin.
export function ClosingCta({
  title = 'Mobility for people. Progress for business.',
  body = 'Share your locations, passenger numbers and schedules. Our team will propose a mobility arrangement that fits.',
  service,
}: {
  title?: string
  body?: string
  service?: ServiceValue
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-paper">
      <div className="frame px-4 py-16 sm:px-6 md:py-20 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-blue px-6 py-12 text-on-blue shadow-card md:px-12 md:py-16">
          <Image
            src={pin}
            alt=""
            aria-hidden
            sizes="280px"
            className="pointer-events-none absolute -right-8 top-1/2 hidden h-auto w-[260px] -translate-y-1/2 opacity-20 md:block"
          />
          <div className="relative flex max-w-[640px] flex-col gap-6">
            <RevealText id="cta-title" text={title} className="font-serif text-4xl leading-[1.05] md:text-5xl" />
            <p className="text-lg leading-relaxed">{body}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href={quoteHref(service)}>Request a Quote</ButtonLink>
              <a href={telHref(primaryContact.phone)} className="inline-flex items-center gap-2 font-mono text-sm hover:text-gold">
                <PhoneIcon aria-hidden className="size-5" />
                {primaryContact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

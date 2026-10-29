import { PhoneIcon } from '@phosphor-icons/react/dist/ssr'
import type { Metadata } from 'next'
import Image from 'next/image'

import { ButtonLink } from '@/components/ui/ButtonLink'
import pin from '../../../../public/images/brand/pin-white.png'
import { primaryContact, telHref } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your enquiry has reached the G DRIVE business team.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/thank-you/' },
}

const nextSteps = [
  'Our business team reviews your requirement.',
  'We call you to understand your locations, schedules and passenger numbers.',
  'We propose a mobility arrangement that fits.',
]

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams
  const what = type === 'contact' ? 'enquiry' : 'quote request'

  return (
    <section className="on-blue border-b border-rule-on-blue">
      <div className="frame grid grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col gap-8 px-4 py-16 sm:px-6 md:py-24 lg:col-span-7 lg:border-r lg:border-rule-on-blue lg:px-10">
          <h1 className="display rise max-w-[16ch] text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[0.98]">
            Thank you. Your {what} has reached our team.
          </h1>
          <ol className="flex flex-col gap-4">
            {nextSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-4 text-lg text-on-blue-soft">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-rule-on-blue font-mono text-sm text-gold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/">Back to home</ButtonLink>
            <a
              href={telHref(primaryContact.phone)}
              className="inline-flex items-center gap-2 font-mono text-sm text-on-blue hover:text-gold"
            >
              <PhoneIcon aria-hidden className="size-5" />
              {primaryContact.phone}
            </a>
          </div>
        </div>
        <div className="hidden items-center justify-center p-10 lg:col-span-5 lg:flex">
          <Image src={pin} alt="" sizes="280px" className="h-auto w-[240px] opacity-90" />
        </div>
      </div>
    </section>
  )
}

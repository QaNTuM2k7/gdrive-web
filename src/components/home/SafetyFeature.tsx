import Image from 'next/image'

import { ButtonLink } from '@/components/ui/ButtonLink'
import breathalyzerCheck from '../../../public/images/breathalyzer-check.jpg'
import breathPass from '../../../public/images/safety/breathalyzer-pass.webp'
import { SectionHeading } from './SectionHeading'

// Safety at Every Stage of the Journey: driver photo with the breathalyzer PASS screen overlaid.
export function SafetyFeature() {
  return (
    <section aria-labelledby="safety-title" className="bg-paper">
      <div className="frame grid grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:px-10">
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-card">
            <Image
              src={breathalyzerCheck}
              alt="A G DRIVE driver taking a breath alcohol test before starting a trip"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[60%_50%]"
            />
          </div>
          <Image
            src={breathPass}
            alt="Breathalyzer screen showing PASS, no alcohol detected"
            sizes="200px"
            className="absolute -bottom-6 left-3 h-auto w-[30%] max-w-[200px] drop-shadow-[0_18px_30px_rgb(11_18_40/0.35)] md:left-6"
          />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-6 lg:pl-6">
          <SectionHeading
            id="safety-title"
            eyebrow="Safety"
            title="Safety at Every Stage of the Journey"
            intro={
              <p>
                G DRIVE incorporates safety-focused processes and technology into transportation operations, including
                driver breath alcohol screening, GPS and geofencing, AI video telematics and Advanced Driver Assistance
                Systems (ADAS). These capabilities can support driver readiness checks, route monitoring, identification of
                selected driving risks and improved operational awareness.
              </p>
            }
          />
          <div>
            <ButtonLink href="/safety/" variant="blue">
              Explore Safety &amp; Intelligent Monitoring
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

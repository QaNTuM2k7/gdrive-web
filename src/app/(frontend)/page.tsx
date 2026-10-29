import type { Metadata } from 'next'

import { JsonLd } from '@/components/JsonLd'
import { ClientMarquee } from '@/components/home/ClientMarquee'
import { FleetGrid } from '@/components/home/FleetGrid'
import { HeroBanner } from '@/components/home/HeroBanner'
import { Industries } from '@/components/home/Industries'
import { Intro } from '@/components/home/Intro'
import { IntroSplit } from '@/components/home/IntroSplit'
import { SafetyFeature } from '@/components/home/SafetyFeature'
import { SolutionsGrid } from '@/components/home/SolutionsGrid'
import { TechnologyFeatures } from '@/components/home/TechnologyFeatures'
import { WhyPartner } from '@/components/home/WhyPartner'
import { organizationJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/', type: 'website', siteName: 'G DRIVE', locale: 'en_IN' },
}

// Section order follows the approved homepage design.
export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <HeroBanner />
      <IntroSplit />
      <ClientMarquee />
      <Intro />
      <SolutionsGrid />
      <TechnologyFeatures />
      <SafetyFeature />
      <FleetGrid />
      <WhyPartner />
      <Industries />
    </>
  )
}

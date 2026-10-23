import { ClientMarquee } from '@/components/home/ClientMarquee'
import { ClosingCta } from '@/components/home/ClosingCta'
import { FleetStrip } from '@/components/home/FleetStrip'
import { Hero } from '@/components/home/Hero'
import { Intro } from '@/components/home/Intro'
import { SafetyLayers } from '@/components/home/SafetyLayers'
import { SolutionsBoard } from '@/components/home/SolutionsBoard'
import { TechnologyBento } from '@/components/home/TechnologyBento'
import { WhyPartner } from '@/components/home/WhyPartner'
import { organizationJsonLd } from '@/lib/jsonld'

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <Hero />
      <ClientMarquee />
      <Intro />
      <SolutionsBoard />
      <TechnologyBento />
      <SafetyLayers />
      <FleetStrip />
      <WhyPartner />
      <ClosingCta />
    </>
  )
}

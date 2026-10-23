import { ClientMarquee } from '@/components/home/ClientMarquee'
import { ClosingCta } from '@/components/home/ClosingCta'
import { Faq, type FaqItem } from '@/components/home/Faq'
import { FleetStrip } from '@/components/home/FleetStrip'
import { Hero } from '@/components/home/Hero'
import { HowWeWork } from '@/components/home/HowWeWork'
import { Intro } from '@/components/home/Intro'
import { SafetyLayers } from '@/components/home/SafetyLayers'
import { SolutionsStack } from '@/components/home/SolutionsStack'
import { TechnologyBento } from '@/components/home/TechnologyBento'
import { WhyPartner } from '@/components/home/WhyPartner'
import { SectionIndicator } from '@/components/motion/SectionIndicator'
import { faqJsonLd, organizationJsonLd } from '@/lib/jsonld'

// Answers come from the SEO master document's service-page FAQs.
const faqs: FaqItem[] = [
  {
    q: 'What are corporate employee transportation services?',
    a: 'Corporate employee transportation services organize employee commutes through planned routes, scheduled pickup and drop, fleet allocation and transport coordination.',
  },
  {
    q: 'Can employee transportation be arranged for night shifts?',
    a: 'Transportation arrangements can be planned around agreed shift timings, subject to service scope, route feasibility and availability.',
  },
  {
    q: 'Can transport operations be monitored digitally?',
    a: "G DRIVE's technology ecosystem includes GPS tracking, trip monitoring and centralized operational tools. Available functions depend on the implementation and service configuration.",
  },
  {
    q: 'Can shuttle routes be customized?',
    a: 'Routes and schedules can be evaluated according to passenger demand, location and operational requirements.',
  },
  {
    q: 'Can companies arrange airport transfers for business guests?',
    a: 'Yes. Corporate airport transfers can be discussed as part of a planned business travel arrangement.',
  },
  {
    q: 'How can a company request an employee transport proposal?',
    a: 'Share your office locations, employee numbers, shift timings, expected routes and vehicle requirements through the Request a Quote form.',
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd(), faqJsonLd(faqs)]) }}
      />
      <SectionIndicator />
      <Hero />
      <ClientMarquee />
      <Intro />
      <SolutionsStack />
      <TechnologyBento />
      <HowWeWork />
      <SafetyLayers />
      <FleetStrip />
      <WhyPartner />
      <Faq items={faqs} />
      <ClosingCta />
    </>
  )
}

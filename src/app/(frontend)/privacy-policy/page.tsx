import Link from 'next/link'

import { LegalPage } from '@/components/templates/LegalPage'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Privacy Policy | G DRIVE',
  description: 'How G DRIVE, a brand of New Travel Liines India Private Limited, collects, uses and protects personal data submitted through this website.',
  path: '/privacy-policy/',
})

// Draft written for the Digital Personal Data Protection Act, 2023, describing what this website actually
// collects. The client's legal adviser must review it before launch.
export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy/" updated="24 October 2026">
      <p>
        This policy explains how {site.legalName} (&quot;G DRIVE&quot;, &quot;we&quot;) handles personal data collected
        through this website. We process personal data in line with the Digital Personal Data Protection Act, 2023.
      </p>

      <h2>What we collect</h2>
      <p>When you submit the Request a Quote or Contact form, we collect:</p>
      <ul>
        <li>Your name, company name, business email address and mobile number</li>
        <li>Details of your transportation requirement, such as service, location and estimated passengers</li>
        <li>The page you came from and campaign tags in the link (for example utm_source), if present</li>
        <li>A record that you agreed to be contacted, and the wording you agreed to</li>
      </ul>
      <p>
        We use Cloudflare Turnstile to protect the forms from automated abuse. Turnstile processes technical information
        about your browser and connection to tell people and bots apart.
      </p>

      <h2>Why we use it</h2>
      <ul>
        <li>To respond to your enquiry and prepare a proposal</li>
        <li>To contact you about the service you asked about</li>
        <li>To understand which pages and campaigns lead to enquiries</li>
        <li>To keep the website secure and prevent spam</li>
      </ul>
      <p>We do not sell your personal data.</p>

      <h2>Consent and your choices</h2>
      <p>
        We process enquiry data on the basis of the consent you give when you submit a form. You can withdraw consent at
        any time by contacting us, and we will stop using your data for that purpose.
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask us for a summary of the personal data we hold about you, ask us to correct or erase it, and raise a
        grievance about how it is handled. You may also nominate another person to exercise these rights on your behalf.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry data for as long as needed to respond to you and manage any resulting business relationship, and
        then delete it unless we must keep it to meet a legal obligation.
      </p>

      <h2>Who we share it with</h2>
      <p>
        Your data is available only to authorized G DRIVE staff and to service providers that host and operate this
        website and its email notifications on our behalf, under appropriate safeguards.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable security safeguards, including encrypted connections, access controls and limits on who can view
        enquiries, to protect personal data.
      </p>

      <h2>Contact and grievances</h2>
      <p>
        {site.legalName}, {site.address.street}, {site.address.locality} {site.address.postalCode}, {site.address.region},
        India. You can reach us through the <Link href="/contact/">contact page</Link>.
      </p>
    </LegalPage>
  )
}

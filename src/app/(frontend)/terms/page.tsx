import Link from 'next/link'

import { LegalPage } from '@/components/templates/LegalPage'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Website Terms of Use | G DRIVE',
  description: 'Terms that apply to your use of the G DRIVE website operated by New Travel Liines India Private Limited.',
  path: '/terms/',
})

// Draft website terms. The client's legal adviser must review them before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms/" updated="24 October 2026">
      <p>
        This website is operated by {site.legalName}. By using it, you agree to these terms. If you do not agree, please do
        not use the website.
      </p>

      <h2>Information on this website</h2>
      <p>
        The content describes G DRIVE services for general information. Service availability, vehicle categories,
        technology features and coverage depend on location and the agreed service arrangement, and are confirmed in a
        written proposal or agreement. Nothing on this website is an offer or a binding commitment.
      </p>

      <h2>Safety technology</h2>
      <p>
        Descriptions of safety technology, including breath alcohol screening, GPS tracking, AI video telematics and ADAS,
        explain how these systems can support safer operations. They do not guarantee the prevention of accidents or
        incidents.
      </p>

      <h2>Enquiries</h2>
      <p>
        When you submit an enquiry, you confirm that the information is accurate and that you are authorized to share it.
        How we handle that information is explained in our <Link href="/privacy-policy/">Privacy Policy</Link>.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You must not misuse the website, attempt to gain unauthorized access to it or its systems, interfere with its
        operation, or submit automated or bulk enquiries.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The G DRIVE name, logo, text, images and design belong to {site.legalName} or its licensors. Client names and logos
        belong to their respective owners and are shown with their permission.
      </p>

      <h2>Liability</h2>
      <p>
        We work to keep the website accurate and available but do not guarantee that it is error-free or uninterrupted. To
        the extent permitted by law, we are not liable for losses arising from use of the website.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, and the courts at Chennai have jurisdiction.</p>
    </LegalPage>
  )
}

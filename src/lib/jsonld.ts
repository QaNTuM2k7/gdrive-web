import { site } from './site'

export function serviceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: new URL(path, site.url).toString(),
    provider: { '@id': `${site.url}/#organization` },
    areaServed: ['Chennai', 'Tamil Nadu', 'Bengaluru', 'Hyderabad'].map((name) => ({ '@type': 'Place', name })),
  }
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  }
}

export function breadcrumbJsonLd(trail: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: new URL(c.href, site.url).toString(),
    })),
  }
}

// Organization + LocalBusiness for the corporate office. alternateName helps separate the brand from "Google Drive".
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${site.url}/#organization`,
    name: 'G DRIVE',
    alternateName: ['G DRIVE Mobility', site.legalName],
    legalName: site.legalName,
    url: site.url,
    slogan: site.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    telephone: site.contacts[0].phone,
    contactPoint: site.contacts.map((c) => ({
      '@type': 'ContactPoint',
      telephone: c.phone,
      contactType: 'sales',
      name: `${c.name}, ${c.role}`,
      areaServed: 'IN',
    })),
    hasCredential: site.certification,
  }
}

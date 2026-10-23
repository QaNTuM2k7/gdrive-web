// Site-wide settings. These move to the Payload "Site settings" global once the CMS layer is wired up.

export const site = {
  name: 'G DRIVE',
  legalName: 'New Travel Liines India Private Limited',
  tagline: 'Safe. Intelligent. Reliable.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3100',
  address: {
    street: 'Plot No. 42 Part, Kalaimagal Nagar, 2nd Main Road, Ekkattuthangal',
    locality: 'Chennai',
    postalCode: '600032',
    region: 'Tamil Nadu',
    country: 'IN',
  },
  // TODO(client): confirm names and numbers are current before launch.
  contacts: [
    { name: 'Navazhagan R', role: 'Business Head', phone: '+91 72000 97506' },
    { name: 'Radhika Kumar', role: 'Business Development Manager', phone: '+91 99625 99451' },
    { name: 'Illango S', role: 'General Manager', phone: '+91 98436 90973' },
    { name: 'Chakravarthy G', role: 'Vice President', phone: '+91 91767 97906' },
  ],
  certification: 'ISO 9001:2015',
} as const

export const primaryContact = site.contacts[0]

export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, '')}`

export const quoteHref = (service?: string) =>
  service ? `/request-a-quote/?service=${encodeURIComponent(service)}` : '/request-a-quote/'

export type NavItem = { label: string; href: string }

export const mainNav: NavItem[] = [
  { label: 'Solutions', href: '/solutions/' },
  { label: 'Fleet', href: '/fleet/' },
  { label: 'Technology', href: '/technology/' },
  { label: 'Safety', href: '/safety/' },
  { label: 'About', href: '/about/' },
  { label: 'Clients', href: '/clients/' },
]

export const solutions = [
  {
    slug: 'employee-transportation',
    title: 'Corporate Employee Transportation',
    short: 'Employee transportation',
    summary: 'Daily commutes, shift-based travel and pickup and drop planned around your office hours.',
    icon: 'UsersThree',
    points: ['Pickup and drop planned around office hours', 'Day, evening, night and rotating shifts', 'Route planning and optimisation', 'GPS-based trip monitoring and reporting'],
  },
  {
    slug: 'corporate-car-rental',
    title: 'Corporate Car Rental',
    short: 'Corporate car rental',
    summary: 'Airport transfers, business meetings and guest travel with flexible vehicle options.',
    icon: 'Car',
    points: ['Airport transfers for employees and guests', 'Business meetings and conferences', 'Corporate guest transportation', 'Sedans, SUVs and other vehicle categories'],
  },
  {
    slug: 'executive-car-rental',
    title: 'Premium Executive Car Rentals',
    short: 'Executive car rental',
    summary: 'Coordinated, well-planned travel for leadership teams and visiting executives.',
    icon: 'Briefcase',
    points: ['Executive airport transfers', 'Business meeting transfers', 'Transportation for visiting leadership teams', 'Vehicle and chauffeur details confirmed at booking'],
  },
  {
    slug: 'shuttle-services',
    title: 'Shuttle Services',
    short: 'Shuttle services',
    summary: 'Scheduled shuttle routes for corporate campuses, business parks and institutions.',
    icon: 'Bus',
    points: ['Office shuttles between pickup points and buildings', 'Business park and campus circulation', 'Scheduled routes based on passenger demand', 'Buses and vans sized to capacity'],
  },
  {
    slug: 'campus-mobility',
    title: 'Campus Mobility',
    short: 'Campus mobility',
    summary: 'Transportation for students, staff and visitors, planned around campus layout.',
    icon: 'GraduationCap',
    points: ['Student and staff transportation', 'Corporate campus and business park movement', 'Route and pickup-point assessment', 'Coordination with campus transport teams'],
  },
  {
    slug: 'metro-connect',
    title: 'Metro Connect',
    short: 'Metro Connect',
    summary: 'First-mile and last-mile feeder shuttles between metro stations and workplaces.',
    icon: 'Train',
    points: ['First-mile and last-mile connectivity', 'Metro station to workplace shuttles', 'Feeder routes for campuses', 'Timetables matched to passenger demand'],
  },
] as const

export type Solution = (typeof solutions)[number]

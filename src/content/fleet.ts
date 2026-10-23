import busCutout from '../../public/images/fleet/bus-cutout.webp'
import busBoardingPortrait from '../../public/images/fleet/bus-boarding-portrait.jpg'
import electric from '../../public/images/fleet/electric-vehicles.jpg'
import cityPortrait from '../../public/images/fleet/fleet-city-portrait.jpg'
import lineup from '../../public/images/fleet/lineup-cutout.webp'
import premiumSedan from '../../public/images/fleet/premium-sedan-cutout.webp'
import suvs from '../../public/images/fleet/suvs.jpg'
import vanCutout from '../../public/images/fleet/van-cutout.webp'
import employeesBoarding from '../../public/images/employees-boarding.jpg'
import maintenance from '../../public/images/maintenance-bay.jpg'
import airportPickup from '../../public/images/rental/airport-pickup.jpg'
import sedanNight from '../../public/images/sedan-night.jpg'
import type { Block, DetailPage, Section } from './types'

// Fleet hub copy is from the SEO master document. Per-vehicle pages expand the category descriptions
// from the same section and the brochure; the client should review them before launch.

const readiness: Block = {
  type: 'checklist',
  title: 'Every vehicle, every trip',
  intro: 'Fleet categories share the same safety and maintenance processes described in the brochure.',
  items: [
    'Breath alcohol screening for drivers before trips',
    'GPS tracking with geofencing and route visibility',
    'Drivers trained in defensive driving and passenger etiquette',
    'Routine inspections and preventive maintenance',
  ],
}

const buses: DetailPage = {
  slug: 'buses',
  label: 'Buses',
  service: 'employee-transportation',
  seo: {
    title: 'Bus Rental for Corporates & Employee Transport | G DRIVE',
    description: 'Buses for employee commute routes, larger passenger groups and planned campus transportation from G DRIVE.',
  },
  h1: 'Buses for employee transportation',
  intro: 'Buses support larger passenger groups, employee commute routes and planned campus transportation.',
  hero: { src: busCutout, alt: 'A white G DRIVE bus', fit: 'contain' },
  blocks: [
    {
      type: 'features',
      title: 'Where buses fit',
      items: [
        { icon: 'users', title: 'Employee commute routes', body: 'Daily pickup and drop for large teams on planned routes.' },
        { icon: 'campus', title: 'Campus transportation', body: 'Scheduled movement for students and staff across institutions.' },
        { icon: 'clock', title: 'Shift-based transport', body: 'Capacity for shift changes at offices and industrial facilities.' },
      ],
    },
    {
      type: 'split',
      title: 'Planned around your routes',
      body: [
        'Choosing the right vehicle means looking at passenger numbers, journey distance and duration, route and access conditions, service frequency and travel schedules. Our team helps you decide where buses make sense.',
      ],
      image: { src: busBoardingPortrait, alt: 'Passengers boarding a G DRIVE bus', focus: '50% 70%' },
    },
    readiness,
  ],
  cta: 'Discuss your fleet requirements',
  related: [
    { href: '/solutions/employee-transportation/', label: 'Employee Transportation' },
    { href: '/solutions/campus-mobility/', label: 'Campus Mobility' },
    { href: '/fleet/vans/', label: 'Vans' },
  ],
}

const vans: DetailPage = {
  slug: 'vans',
  label: 'Vans',
  service: 'shuttle-services',
  seo: {
    title: 'Vans for Group Mobility & Shuttles | G DRIVE',
    description: 'Vans for smaller employee groups, shuttle requirements and institutional travel from G DRIVE.',
  },
  h1: 'Vans for group mobility',
  intro: 'Vans provide flexible transportation for smaller employee groups, shuttle requirements and institutional travel.',
  hero: { src: vanCutout, alt: 'A white G DRIVE van', fit: 'contain' },
  blocks: [
    {
      type: 'features',
      title: 'Where vans fit',
      items: [
        { icon: 'users', title: 'Smaller employee groups', body: 'Right-sized capacity for teams and low-density routes.' },
        { icon: 'route', title: 'Shuttle requirements', body: 'Office, business park and metro feeder shuttles.' },
        { icon: 'campus', title: 'Institutional travel', body: 'Group movement for schools, colleges and visiting teams.' },
      ],
    },
    {
      type: 'split',
      title: 'Flexible capacity',
      body: [
        'Vans sit between cars and buses. They suit shuttle loops, feeder routes and groups that are too large for a sedan but do not need a full-size bus.',
      ],
      image: { src: employeesBoarding, alt: 'Employees boarding a G DRIVE van', focus: '50% 70%' },
    },
    readiness,
  ],
  cta: 'Discuss your fleet requirements',
  related: [
    { href: '/solutions/shuttle-services/', label: 'Shuttle Services' },
    { href: '/solutions/metro-connect/', label: 'Metro Connect' },
    { href: '/fleet/buses/', label: 'Buses' },
  ],
}

const suvPage: DetailPage = {
  slug: 'suvs',
  label: 'SUVs',
  service: 'corporate-car-rental',
  seo: {
    title: 'SUVs for Corporate & Guest Travel | G DRIVE',
    description: 'SUVs for selected corporate journeys, guest transportation and executive travel requirements from G DRIVE.',
  },
  h1: 'SUVs for corporate mobility',
  intro: 'SUVs suit selected corporate journeys, guest transportation and executive travel requirements.',
  hero: { src: suvs, alt: 'A white SUV from the G DRIVE fleet', fit: 'contain' },
  blocks: [
    {
      type: 'features',
      title: 'Where SUVs fit',
      items: [
        { icon: 'briefcase', title: 'Corporate journeys', body: 'Business travel with room for colleagues and luggage.' },
        { icon: 'handshake', title: 'Guest transportation', body: 'Comfortable transfers for clients and visitors.' },
        { icon: 'car', title: 'Executive travel', body: 'A premium option for leadership and VIP movement.' },
      ],
    },
    {
      type: 'split',
      title: 'Ready for airport runs',
      body: ['Extra luggage space and seating make SUVs a common choice for airport transfers and visiting teams.'],
      image: { src: airportPickup, alt: 'A G DRIVE chauffeur loading luggage at the airport', focus: '50% 40%' },
      reverse: true,
    },
    readiness,
  ],
  cta: 'Discuss your fleet requirements',
  related: [
    { href: '/solutions/corporate-car-rental/', label: 'Corporate Car Rental' },
    { href: '/solutions/executive-car-rental/', label: 'Executive Car Rental' },
    { href: '/fleet/sedans/', label: 'Sedans' },
  ],
}

const sedans: DetailPage = {
  slug: 'sedans',
  label: 'Sedans',
  service: 'corporate-car-rental',
  seo: {
    title: 'Sedans for Business Travel & Airport Transfers | G DRIVE',
    description: 'Sedans for individual corporate travel, airport transfers, executive journeys and business meetings from G DRIVE.',
  },
  h1: 'Sedans for business travel',
  intro: 'Sedans support individual corporate travel, airport transfers, executive journeys and business meetings.',
  hero: { src: premiumSedan, alt: 'A white G DRIVE sedan', fit: 'contain' },
  blocks: [
    {
      type: 'features',
      title: 'Where sedans fit',
      items: [
        { icon: 'car', title: 'Individual corporate travel', body: 'Point-to-point journeys for employees.' },
        { icon: 'airport', title: 'Airport transfers', body: 'Pickups and drops timed to flights.' },
        { icon: 'briefcase', title: 'Executive journeys', body: 'Comfortable travel for leadership.' },
        { icon: 'building', title: 'Business meetings', body: 'Transfers between offices and venues.' },
      ],
    },
    {
      type: 'split',
      title: 'Day or night',
      body: ['Sedans in the G DRIVE fleet are tracked by GPS and driven by trained drivers, so late meetings and early flights are covered.'],
      image: { src: sedanNight, alt: 'A G DRIVE sedan on a city highway at night', focus: '40% 70%' },
    },
    readiness,
  ],
  cta: 'Discuss your fleet requirements',
  related: [
    { href: '/solutions/corporate-car-rental/', label: 'Corporate Car Rental' },
    { href: '/solutions/executive-car-rental/', label: 'Executive Car Rental' },
    { href: '/fleet/electric-vehicles/', label: 'Electric Vehicles' },
  ],
}

const ev: DetailPage = {
  slug: 'electric-vehicles',
  label: 'Electric Vehicles',
  service: 'other',
  seo: {
    title: 'Electric Vehicles for Corporate Mobility | G DRIVE',
    description: 'Electric vehicle options for organizations exploring alternative mobility arrangements and sustainability objectives.',
  },
  h1: 'Electric vehicles',
  intro:
    'Electric vehicle options for organizations exploring alternative mobility arrangements and sustainability objectives, subject to availability and operational suitability.',
  hero: { src: electric, alt: 'A white electric car beside a charging station', fit: 'contain' },
  blocks: [
    {
      type: 'features',
      title: 'Where electric vehicles fit',
      items: [
        { icon: 'leaf', title: 'Sustainability objectives', body: 'An option for organizations working towards lower-emission travel.' },
        { icon: 'route', title: 'Suitable routes', body: 'Journeys planned around range and operational requirements.' },
      ],
    },
    {
      type: 'note',
      body: 'Electric vehicle availability and suitability are confirmed for each requirement and location.',
    },
  ],
  cta: 'Discuss electric vehicle options',
  related: [
    { href: '/fleet/sedans/', label: 'Sedans' },
    { href: '/solutions/corporate-car-rental/', label: 'Corporate Car Rental' },
    { href: '/solutions/employee-transportation/', label: 'Employee Transportation' },
  ],
}

export const fleetSection: Section = {
  base: '/fleet',
  label: 'Fleet',
  service: 'employee-transportation',
  seo: {
    title: 'Corporate Transportation Fleet | Buses, Vans, SUVs & Sedans',
    description:
      'Explore G DRIVE fleet options for employee transportation, corporate travel, campus shuttles and executive mobility, including buses, vans, SUVs, sedans and electric vehicles.',
  },
  h1: 'Fleet solutions',
  intro:
    'Different journeys call for different capacities. G DRIVE operates buses, vans, SUVs, sedans and electric vehicles for employee commutes, corporate travel, campus transportation, shuttles and executive journeys.',
  hero: { src: cityPortrait, alt: 'G DRIVE buses and cars on a city road', focus: '50% 62%' },
  cardsTitle: 'Our fleet categories',
  pages: [buses, vans, suvPage, sedans, ev],
  blocks: [
    {
      type: 'checklist',
      title: 'Fleet selection and planning',
      intro: 'G DRIVE helps organizations evaluate suitable vehicle categories by looking at:',
      items: [
        'Number of passengers',
        'Journey distance and duration',
        'Route and access conditions',
        'Service frequency',
        'Travel schedules',
        'Vehicle availability and operational requirements',
      ],
      image: { src: lineup, alt: 'The G DRIVE fleet line-up', fit: 'contain' },
    },
    {
      type: 'split',
      title: 'Maintained for every journey',
      body: [
        'Routine inspections, preventive maintenance, engine servicing, electrical checks, tyre and air-conditioning maintenance and safety audits keep the fleet ready.',
      ],
      image: { src: maintenance, alt: 'A technician servicing a vehicle in the G DRIVE maintenance bay', focus: '50% 50%' },
      reverse: true,
      tone: 'blue',
    },
  ],
  cta: 'Discuss your fleet requirements',
}

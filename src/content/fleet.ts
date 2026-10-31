import busCutout from '../../public/images/fleet/bus-cutout.webp'
import electric from '../../public/images/fleet/electric-vehicles.jpg'
import fleetHighway from '../../public/images/fleet/fleet-highway-wide.jpg'
import premiumSedan from '../../public/images/fleet/premium-sedan-cutout.webp'
import suvs from '../../public/images/fleet/suvs.jpg'
import vanCutout from '../../public/images/fleet/van-cutout.webp'
import maintenance from '../../public/images/maintenance-bay.jpg'
import type { Section } from './types'

// Fleet page copy from the client's corrections document. Vehicle categories are shown as cards without
// links, as the client asked, so the fleet has no child pages.

export const fleetSection: Section = {
  base: '/fleet',
  label: 'Fleet',
  service: 'employee-transportation',
  seo: {
    title: 'Corporate Transportation Fleet | Buses, Vans, SUVs & Sedans',
    description:
      'Explore G DRIVE fleet options for employee transportation, corporate travel, campus shuttles and executive mobility, including buses, vans, SUVs, sedans and electric vehicles.',
  },
  h1: 'Fleet Solutions',
  intro:
    'Different transportation requirements call for different vehicle capacities, configurations and operating schedules. G DRIVE offers mobility solutions across multiple vehicle categories to support employee commutes, corporate travel, campus transportation, shuttle operations and executive journeys.',
  // TODO(client): the corrections document mentions an attached fleet banner, but none was supplied.
  hero: { src: fleetHighway, alt: 'G DRIVE buses and cars on a city road', focus: '50% 100%' },
  pages: [],
  blocks: [
    {
      type: 'cards',
      title: 'Our fleet categories',
      items: [
        {
          image: { src: busCutout, alt: 'A white G DRIVE bus', fit: 'contain' },
          title: 'Buses',
          body: 'Buses support larger passenger groups, employee commute routes and planned campus transportation.',
        },
        {
          image: { src: vanCutout, alt: 'A white G DRIVE van', fit: 'contain' },
          title: 'Vans',
          body: 'Vans provide flexible transportation for smaller employee groups, shuttle requirements and institutional travel.',
        },
        {
          image: { src: suvs, alt: 'A white SUV from the G DRIVE fleet', fit: 'contain' },
          title: 'SUVs',
          body: 'SUVs suit selected corporate journeys, guest transportation and executive travel requirements.',
        },
        {
          image: { src: premiumSedan, alt: 'A white G DRIVE sedan', fit: 'contain' },
          title: 'Sedans',
          body: 'Sedans support individual corporate travel, airport transfers, executive journeys and business meetings.',
        },
        {
          image: { src: electric, alt: 'A white electric car beside a charging station', fit: 'contain' },
          title: 'Electric Vehicles',
          body: 'Electric vehicle options for organizations exploring alternative mobility arrangements and sustainability objectives, subject to availability and operational suitability.',
        },
      ],
    },
    {
      type: 'split',
      title: 'Maintained for every journey',
      body: [
        'Routine inspections, preventive maintenance, engine servicing, electrical checks, tyre and air-conditioning maintenance and safety audits keep the fleet ready.',
      ],
      image: { src: maintenance, alt: 'A technician servicing a vehicle in the G DRIVE maintenance bay' },
      reverse: true,
      tone: 'blue',
    },
  ],
}

import busBoarding from '../../public/images/fleet/bus-boarding-wide.jpg'
import busCutout from '../../public/images/fleet/bus-cutout.webp'
import itParkFleet from '../../public/images/fleet/it-park-fleet.jpg'
import vanCutout from '../../public/images/fleet/van-cutout.webp'
import fleetHighway from '../../public/images/fleet/fleet-highway-wide.jpg'
import solutionsBanner from '../../public/images/banners/solutions.jpg'
import employeeTransport from '../../public/images/solutions/employee-transportation.jpg'
import controlRoom from '../../public/images/technology/control-room.jpg'
import chauffeur from '../../public/images/people/chauffeur.webp'
import airportPickup from '../../public/images/rental/airport-pickup.jpg'
import cabin from '../../public/images/rental/cabin-interior.jpg'
import executiveArrival from '../../public/images/rental/executive-arrival.jpg'
import executiveRear from '../../public/images/rental/executive-rear-seat.jpg'
import itParkPickup from '../../public/images/rental/it-park-pickup.jpg'
import type { DetailPage, Section } from './types'

// Copy from the SEO master document (sections 2 to 9).

const employeeTransportation: DetailPage = {
  slug: 'employee-transportation',
  label: 'Employee Transportation',
  service: 'employee-transportation',
  seo: {
    title: 'Employee Transportation Services for Corporates | G DRIVE',
    description:
      'Explore corporate employee transportation services from G DRIVE for daily commutes, shift-based travel, pickup and drop, route planning and fleet monitoring.',
  },
  h1: 'Corporate Employee Transportation',
  intro:
    'Employee transportation plays an important role in workforce coordination, particularly for organizations operating across multiple shifts, office locations and industrial facilities. G DRIVE provides corporate employee transportation solutions designed to support daily commutes, scheduled pickup and drop services, shift-based travel and organized fleet operations. Our approach combines transportation planning, vehicle allocation, route coordination and technology-enabled monitoring to help organizations manage employee mobility requirements.',
  hero: { src: employeeTransport, alt: 'Employees boarding a G DRIVE bus at a corporate campus' },
  blocks: [
    {
      type: 'split',
      title: 'Employee pickup and drop services',
      body: [
        'Organize scheduled employee journeys between designated pickup points and workplace locations. Our approach combines transportation planning, vehicle allocation, route coordination and technology-enabled monitoring.',
      ],
      points: [
        'Office start and closing times',
        'Shift-based schedules',
        'Designated pickup locations',
        'Route planning and optimization',
        'Vehicle and driver allocation',
        'Trip monitoring and reporting',
      ],
      image: { src: busBoarding, alt: 'Employees boarding a G DRIVE staff bus', fit: 'contain' },
    },
    {
      type: 'split',
      title: 'Shift-based employee transportation',
      body: [
        'Organizations with day, evening, night or rotating shifts need schedules that reflect their operating hours. G DRIVE plans transportation for different shift timings, subject to the agreed service scope and fleet availability, giving administrators a clearer view of daily operations.',
      ],
      image: { src: itParkFleet, alt: 'G DRIVE sedans and vans lined up outside an IT park' },
      reverse: true,
    },
    {
      type: 'features',
      title: 'Corporate transport management',
      intro:
        "Employee transport management means coordinating people, vehicles, routes and schedules. G DRIVE's technology ecosystem is designed to support it end to end.",
      items: [
        { icon: 'calendar', title: 'Digital travel requests', body: 'Requests and schedules managed digitally instead of through manual updates.' },
        { icon: 'network', title: 'Centralized coordination', body: 'One point of coordination for routes, vehicles and drivers.' },
        { icon: 'gps', title: 'Vehicle tracking', body: 'GPS-based visibility of vehicle locations for authorized teams.' },
        { icon: 'monitor', title: 'Trip status monitoring', body: 'Configured trip statuses keep transport teams and drivers in step.' },
        { icon: 'chart', title: 'Operational reporting', body: 'Trip records and reports for structured transport administration.' },
        { icon: 'bus', title: 'Vehicle categories', body: 'Buses, vans, SUVs and sedans matched to passenger numbers.' },
      ],
    },
    {
      type: 'checklist',
      title: 'Industries we serve',
      items: [
        'IT and technology companies',
        'Manufacturing and industrial facilities',
        'Corporate offices and business parks',
        'Shared service and business process operations',
        'Organizations operating multiple shifts',
      ],
      image: { src: itParkPickup, alt: 'A G DRIVE driver greeting an employee at an IT park', focus: '60% 50%' },
    },
    {
      type: 'cities',
      title: 'Employee transportation in Chennai, Bengaluru and Hyderabad',
      body: 'Our target markets include Chennai and Tamil Nadu, Bengaluru and Hyderabad. Contact our team to discuss your location, workforce size, shift schedules and service requirements. Service coverage and fleet availability are confirmed for each location.',
    },
  ],
  faqs: [
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
      q: 'How can a company request an employee transport proposal?',
      a: 'Share your office locations, employee numbers, shift timings, expected routes and vehicle requirements through the Request a Quote form.',
    },
  ],
  cta: 'Request an employee transportation proposal',
  related: [
    { href: '/solutions/shuttle-services/', label: 'Shuttle Services' },
    { href: '/technology/', label: 'Technology' },
    { href: '/safety/', label: 'Safety' },
  ],
}

const corporateCarRental: DetailPage = {
  slug: 'corporate-car-rental',
  label: 'Corporate Car Rental',
  service: 'corporate-car-rental',
  seo: {
    title: 'Corporate Car Rental Services for Business Travel | G DRIVE',
    description:
      'Arrange corporate car rental services for business meetings, airport transfers, corporate guests and professional travel with G DRIVE.',
  },
  h1: 'Corporate Car Rental',
  intro:
    'Dependable transportation for business meetings, airport transfers, visiting executives, corporate guests and other professional journeys, arranged around your schedules and vehicle preferences.',
  hero: { src: airportPickup, alt: 'A G DRIVE chauffeur loading luggage for a business traveller at the airport', focus: '50% 40%' },
  blocks: [
    {
      type: 'features',
      title: 'Corporate travel made easier',
      items: [
        { icon: 'airport', title: 'Airport transfers', body: 'Transportation to and from airports for employees, executives, visiting clients and business guests.' },
        { icon: 'briefcase', title: 'Business meetings', body: 'Transportation for meetings, conferences, office visits and other professional engagements.' },
        { icon: 'handshake', title: 'Corporate guest transportation', body: 'Vehicle arrangements for clients, business partners, visiting teams and corporate guests.' },
        { icon: 'calendar', title: 'Business travel requirements', body: 'Individual journeys and scheduled corporate travel, subject to the agreed service arrangement.' },
      ],
    },
    {
      type: 'split',
      title: 'Vehicle options for corporate travel',
      body: [
        'Depending on availability, requirements can be matched with suitable sedans, SUVs or other vehicle categories. Our objective is to help businesses coordinate travel through a professional mobility partner.',
      ],
      image: { src: cabin, alt: 'Clean, comfortable rear cabin of a G DRIVE vehicle', focus: '50% 50%' },
    },
    {
      type: 'checklist',
      title: 'Why choose G DRIVE?',
      items: [
        'Business-oriented transportation arrangements',
        'Vehicle options for different travel needs',
        'Airport and corporate guest transfers',
        'Coordinated booking and trip scheduling',
        'Technology-enabled operational visibility where available',
        'Service arrangements tailored to organizational requirements',
      ],
      image: { src: itParkPickup, alt: 'A G DRIVE driver welcoming a business guest at an IT park', focus: '60% 50%' },
    },
    {
      type: 'cities',
      title: 'Corporate car rental in Chennai and other business cities',
      body: 'Businesses operating in Chennai, Bengaluru, Hyderabad and other locations can contact G DRIVE to discuss corporate travel requirements and confirm service availability.',
    },
  ],
  faqs: [
    { q: 'Can companies arrange airport transfers for business guests?', a: 'Yes. Corporate airport transfers can be discussed as part of a planned business travel arrangement.' },
    { q: 'Can vehicles be arranged for business meetings?', a: 'Yes. Share your travel schedule, pickup location, destination and preferred vehicle category to discuss the appropriate arrangement.' },
    { q: 'Can a company arrange recurring corporate travel?', a: 'Recurring travel requirements can be evaluated according to journey frequency, routes, schedules and vehicle availability.' },
  ],
  cta: 'Enquire about corporate car rental',
  related: [
    { href: '/solutions/executive-car-rental/', label: 'Executive Car Rental' },
    { href: '/fleet/', label: 'Our Fleet' },
    { href: '/technology/', label: 'Technology' },
  ],
}

const executiveCarRental: DetailPage = {
  slug: 'executive-car-rental',
  label: 'Executive Car Rental',
  service: 'executive-car-rental',
  seo: {
    title: 'Executive Car Rental Services for Corporate Travel | G DRIVE',
    description:
      'Explore executive car rental solutions for business leaders, corporate guests, airport transfers and professional travel with G DRIVE.',
  },
  h1: 'Premium Executive Car Rentals',
  intro:
    'Thoughtfully planned transportation for business leaders, visiting executives, corporate guests and organizations that need dedicated travel arrangements.',
  hero: { src: executiveArrival, alt: 'A business executive arriving at a hotel entrance beside a G DRIVE car', focus: '50% 40%' },
  blocks: [
    {
      type: 'features',
      title: 'Executive transportation services',
      items: [
        { icon: 'airport', title: 'Executive airport transfers', body: 'Pickups and drops timed to flight schedules.' },
        { icon: 'handshake', title: 'Corporate guest transportation', body: 'Arrangements for important visitors and clients.' },
        { icon: 'briefcase', title: 'Business meeting transfers', body: 'Point-to-point travel between meetings and offices.' },
        { icon: 'calendar', title: 'Scheduled executive journeys', body: 'Recurring travel planned in advance.' },
        { icon: 'car', title: 'Individual business travel', body: 'Dedicated vehicles for single journeys.' },
        { icon: 'users', title: 'Visiting leadership teams', body: 'Coordinated movement for leadership groups.' },
      ],
    },
    {
      type: 'split',
      title: 'A professional approach to executive mobility',
      body: [
        'Executive transportation is part of the overall business travel experience. G DRIVE focuses on coordinated scheduling, suitable vehicle allocation and clear communication to support a well-organized journey.',
      ],
      image: { src: executiveRear, alt: 'An executive reading in the rear seat of a G DRIVE vehicle', focus: '50% 50%' },
    },
    {
      type: 'split',
      title: 'Executive car rentals for businesses',
      body: [
        'Our executive mobility solutions support corporate offices, manufacturing companies, business parks, professional services firms and organizations that regularly host business visitors.',
      ],
      image: { src: chauffeur, alt: 'A G DRIVE chauffeur in uniform', fit: 'contain' },
      reverse: true,
      tone: 'blue',
    },
    { type: 'note', body: 'Vehicle categories, chauffeur arrangements, service duration and other inclusions are confirmed during booking.' },
  ],
  cta: 'Plan your executive travel',
  related: [
    { href: '/solutions/corporate-car-rental/', label: 'Corporate Car Rental' },
    { href: '/fleet/', label: 'Our Fleet' },
    { href: '/people-excellence/driver-training/', label: 'Driver Training' },
  ],
}

const shuttleServices: DetailPage = {
  slug: 'shuttle-services',
  label: 'Shuttle Services',
  service: 'shuttle-services',
  seo: {
    title: 'Corporate Shuttle Services for Offices & Business Parks | G DRIVE',
    description:
      'Discover corporate shuttle services for offices, business parks and campuses, with dedicated routes and coordinated transportation planning.',
  },
  h1: 'Corporate Shuttle Services',
  intro:
    'Organized transportation between designated locations on planned schedules, for corporate offices, business parks, educational institutions and other recurring requirements.',
  hero: { src: vanCutout, alt: 'A white G DRIVE shuttle van', fit: 'contain' },
  blocks: [
    {
      type: 'features',
      title: 'Dedicated corporate shuttle solutions',
      items: [
        { icon: 'building', title: 'Office shuttle services', body: 'Employee movement between designated pickup points, office buildings and business campuses.' },
        { icon: 'grid', title: 'Business park shuttles', body: 'Transportation between campus zones, office facilities and selected transport connections.' },
        { icon: 'campus', title: 'Campus shuttle services', body: 'Shuttle routes within or around educational and corporate campuses.' },
        { icon: 'route', title: 'Scheduled shuttle routes', body: 'Route and schedule plans based on demand, journey duration and vehicle availability.' },
      ],
    },
    {
      type: 'split',
      title: 'Shuttle planning and operations',
      body: [
        'An effective shuttle service coordinates passenger demand and route assessment, pickup and drop-point planning, timetables, vehicle allocation, trip monitoring and operational reporting.',
      ],
      image: { src: itParkFleet, alt: 'G DRIVE shuttle vans lined up outside an office campus' },
      reverse: true,
    },
    {
      type: 'checklist',
      title: 'Benefits of organized shuttle mobility',
      items: [
        'Structured passenger movement',
        'Predictable scheduled services',
        'Centralized route coordination',
        'Options for different passenger capacities',
        'Support for campus and workplace connectivity',
      ],
      image: { src: busBoarding, alt: 'Employees boarding a G DRIVE shuttle', fit: 'contain' },
    },
    {
      type: 'cities',
      title: 'Corporate shuttle services in Chennai, Bengaluru and Hyderabad',
      body: 'Contact G DRIVE to discuss shuttle services for office campuses, business parks and designated passenger routes in your operating locations.',
    },
  ],
  faqs: [
    { q: 'What is a corporate shuttle service?', a: 'It is a planned transportation service that moves employees or other passengers between designated locations on an agreed schedule.' },
    { q: 'Can shuttle routes be customized?', a: 'Routes and schedules can be evaluated according to passenger demand, location and operational requirements.' },
    { q: 'Which vehicles can be used for shuttle services?', a: 'Suitable buses, vans or other vehicle categories may be considered based on capacity requirements and availability.' },
  ],
  cta: 'Discuss your shuttle requirements',
  related: [
    { href: '/solutions/campus-mobility/', label: 'Campus Mobility' },
    { href: '/solutions/metro-connect/', label: 'Metro Connect' },
    { href: '/fleet/', label: 'Our Fleet' },
  ],
}

const campusMobility: DetailPage = {
  slug: 'campus-mobility',
  label: 'Campus Mobility',
  service: 'campus-mobility',
  seo: {
    title: 'Campus Transportation Solutions for Institutions | G DRIVE',
    description:
      'Explore campus mobility and institutional transportation solutions for educational institutions and corporate campuses, including shuttle planning and fleet coordination.',
  },
  h1: 'Campus Mobility Solutions',
  intro:
    'Coordinated transportation for students, employees, visitors and campus operations, designed around institutional travel patterns, designated routes and operating schedules.',
  hero: { src: busCutout, alt: 'A white G DRIVE campus bus', fit: 'contain' },
  blocks: [
    {
      type: 'split',
      title: 'Transportation for educational institutions',
      body: [
        'Campus transport arrangements can be planned around student transportation, institutional schedules, designated pickup points and agreed route requirements.',
      ],
      image: { src: busBoarding, alt: 'Passengers boarding a G DRIVE bus', fit: 'contain' },
    },
    {
      type: 'split',
      title: 'Corporate campus mobility',
      body: [
        'Large office campuses and business parks may need transportation between entrances, facilities, buildings and nearby transit connections. G DRIVE helps evaluate shuttle arrangements based on campus layout and passenger requirements.',
      ],
      image: { src: itParkFleet, alt: 'G DRIVE vehicles lined up at a corporate campus' },
      reverse: true,
    },
    {
      type: 'steps',
      title: 'A structured approach to institutional transport',
      intro:
        'Every campus has different operational requirements. We work with your team to understand passenger movement, service schedules and the right vehicle categories.',
      items: [
        { title: 'Route and pickup-point assessment', body: 'Map where passengers start, stop and need to go.' },
        { title: 'Passenger capacity planning', body: 'Size vehicles and frequencies to expected demand.' },
        { title: 'Scheduled shuttle operations', body: 'Run agreed timetables with vehicle allocation.' },
        { title: 'Coordination with campus teams', body: 'Monitor trips and work with your transport office.' },
      ],
    },
  ],
  cta: 'Plan your campus transportation',
  related: [
    { href: '/solutions/shuttle-services/', label: 'Shuttle Services' },
    { href: '/fleet/', label: 'Our Fleet' },
    { href: '/solutions/metro-connect/', label: 'Metro Connect' },
  ],
}

const metroConnect: DetailPage = {
  slug: 'metro-connect',
  label: 'Metro Connect',
  service: 'metro-connect',
  seo: {
    title: 'Metro Connect & Feeder Transportation Services | G DRIVE',
    description:
      'Explore Metro Connect mobility solutions designed to support first-mile and last-mile connectivity between metro stations, workplaces, campuses and designated locations.',
  },
  h1: 'Metro Connect Services',
  intro:
    'Shuttle and feeder mobility arrangements that connect passengers between metro stations and their workplace, campus or designated destination.',
  hero: { src: fleetHighway, alt: 'G DRIVE vehicles on a road beneath an elevated metro line', focus: '50% 45%' },
  blocks: [
    {
      type: 'features',
      title: 'First-mile and last-mile connectivity',
      items: [
        { icon: 'building', title: 'Workplace connectivity', body: 'Planned transportation between metro stations and corporate offices or business parks.' },
        { icon: 'campus', title: 'Campus connectivity', body: 'Feeder and shuttle arrangements for educational institutions and larger campuses.' },
        { icon: 'route', title: 'Designated shuttle routes', body: 'Passenger movement between agreed pickup points, metro stations and destinations.' },
      ],
    },
    {
      type: 'split',
      title: 'Coordinated transit mobility',
      body: [
        'A feeder arrangement considers passenger demand, station and pickup-point locations, timetable coordination, route feasibility, vehicle capacity and operational monitoring.',
      ],
      image: { src: controlRoom, alt: 'An operator monitoring routes and trips in the G DRIVE control room' },
    },
    {
      type: 'split',
      title: 'Metro Connect for organizations',
      body: [
        'Organizations can contact G DRIVE to evaluate shuttle requirements for employees, students or other designated passenger groups.',
      ],
      image: { src: busBoarding, alt: 'Passengers boarding a G DRIVE feeder shuttle', fit: 'contain' },
      reverse: true,
    },
    { type: 'note', body: 'Specific routes, operating hours, transit partnerships and service coverage are confirmed before being offered as active services.' },
  ],
  cta: 'Enquire about Metro Connect',
  related: [
    { href: '/solutions/shuttle-services/', label: 'Shuttle Services' },
    { href: '/solutions/campus-mobility/', label: 'Campus Mobility' },
    { href: '/fleet/', label: 'Our Fleet' },
  ],
}

export const solutionsSection: Section = {
  base: '/solutions',
  label: 'Solutions',
  service: 'employee-transportation',
  seo: {
    title: 'Corporate Mobility Solutions | G DRIVE',
    description:
      'Explore G DRIVE mobility solutions: employee transportation, corporate and executive car rental, shuttle services, campus mobility and Metro Connect.',
  },
  h1: 'Mobility solutions for organizations',
  intro:
    'From corporate employee transportation and executive car rentals to campus shuttles and metro feeder services, G DRIVE coordinates your transportation through one technology-enabled partner.',
  hero: { src: solutionsBanner, alt: 'A G DRIVE chauffeur welcoming an executive beside a company car' },
  pages: [employeeTransportation, corporateCarRental, executiveCarRental, shuttleServices, campusMobility, metroConnect],
  blocks: [
    {
      type: 'cities',
      title: 'Where we operate',
      body: 'G DRIVE serves organizations in Chennai and Tamil Nadu, with growing operations for Bengaluru and Hyderabad. Coverage and fleet availability are confirmed for each location.',
    },
  ],
}

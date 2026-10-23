import busBoardingPortrait from '../../public/images/fleet/bus-boarding-portrait.jpg'
import airportPickup from '../../public/images/rental/airport-pickup.jpg'
import billing from '../../public/images/rental/billing-options.jpg'
import itParkPickup from '../../public/images/rental/it-park-pickup.jpg'
import controlRoom from '../../public/images/technology/control-room.jpg'
import gpsTelematics from '../../public/images/technology/gps-telematics.jpg'
import iconLive from '../../public/images/technology/icon-live-location.png'
import iconRoute from '../../public/images/technology/icon-route.png'
import iconSpeed from '../../public/images/technology/icon-vehicle-speed.png'
import iconTrip from '../../public/images/technology/icon-trip-status.png'
import routeMap from '../../public/images/technology/route-map.jpg'
import type { Block, DetailPage, Section } from './types'

// Technology and GPS copy from the SEO master document (sections 11 and 12). Fleet management,
// app and control tower pages expand the Technology section and the brochure's technology page.

const availability: Block = {
  type: 'note',
  body: 'Available functions depend on the selected platform, configuration and service arrangement. Our team will confirm what applies to your service.',
}

const gpsTiles: Block = {
  type: 'tiles',
  title: 'Key GPS and telematics capabilities',
  items: [
    { image: iconLive, label: 'Live location', body: 'View vehicle location information through configured tracking systems.' },
    { image: iconSpeed, label: 'Vehicle speed', body: 'Review speed-related information where the vehicle integration supports it.' },
    { image: iconRoute, label: 'Route monitoring', body: 'Review route movement and identify selected deviations from planned journeys.' },
    { image: iconTrip, label: 'Trip status', body: 'Monitor configured trip statuses to coordinate transport teams and drivers.' },
  ],
}

const fleetManagement: DetailPage = {
  slug: 'fleet-management',
  label: 'Fleet Management',
  service: 'fleet-management-technology',
  seo: {
    title: 'Fleet Management Solutions & Digital Trip Management | G DRIVE',
    description:
      'Technology-enabled fleet management from G DRIVE: vehicle and driver allocation, trip scheduling, route planning, GPS tracking, billing and reporting.',
  },
  h1: 'Fleet management solutions',
  intro:
    'Fleet management coordinates vehicles, drivers, routes, trip schedules and operational information. G DRIVE brings these together in digital workflows designed for centralized coordination.',
  hero: { src: gpsTelematics, alt: 'G DRIVE fleet tracking on laptop, tablet and phone screens', focus: '50% 50%' },
  blocks: [
    {
      type: 'features',
      title: 'What the platform supports',
      items: [
        { icon: 'users', title: 'Vehicle and driver allocation', body: 'Match vehicles and drivers to each trip.' },
        { icon: 'calendar', title: 'Trip scheduling', body: 'Automated scheduling for recurring and ad hoc trips.' },
        { icon: 'map', title: 'Route planning', body: 'Dynamic route optimization for planned journeys.' },
        { icon: 'gps', title: 'GPS-based vehicle tracking', body: 'Real-time vehicle location for authorized teams.' },
        { icon: 'monitor', title: 'Trip status monitoring', body: 'Digital trip management from start to finish.' },
        { icon: 'network', title: 'Centralized coordination', body: 'One view instead of separate manual updates.' },
        { icon: 'billing', title: 'Billing and reporting', body: 'Transparent billing and centralized reporting.' },
        { icon: 'chart', title: 'Fleet performance visibility', body: 'Performance dashboards for your transport team.' },
      ],
    },
    {
      type: 'split',
      title: 'Digital reporting and billing',
      body: [
        'Digital reporting helps authorized teams review trip records, service activity, selected operational metrics and billing information, for a more structured approach to transportation administration.',
      ],
      image: { src: billing, alt: 'Billing options for individual and corporate travel', focus: '50% 50%' },
      reverse: true,
    },
    availability,
  ],
  cta: 'Explore technology-enabled mobility',
  related: [
    { href: '/technology/control-tower/', label: 'Control Tower' },
    { href: '/technology/gps-telematics/', label: 'GPS & Telematics' },
    { href: '/solutions/employee-transportation/', label: 'Employee Transportation' },
  ],
}

const gps: DetailPage = {
  slug: 'gps-telematics',
  label: 'GPS & Telematics',
  service: 'fleet-management-technology',
  seo: {
    title: 'GPS Vehicle Tracking & Fleet Telematics | G DRIVE',
    description:
      'Explore GPS vehicle tracking and fleet telematics capabilities for vehicle location monitoring, route visibility, trip status, geofencing and operational reporting.',
  },
  h1: 'GPS Vehicle Tracking & Fleet Telematics',
  intro:
    'Fleet telematics connects vehicle information with digital systems. G DRIVE incorporates GPS and telematics so authorized teams can monitor vehicle movements and selected trip information.',
  hero: { src: gpsTelematics, alt: 'GPS and telematics dashboards showing live location, speed, route and trip status', focus: '50% 50%' },
  blocks: [
    gpsTiles,
    {
      type: 'features',
      title: 'Alerts and boundaries',
      items: [
        { icon: 'geofence', title: 'Geofencing', body: 'Virtual geographic boundaries for selected location-based monitoring and alerts.' },
        { icon: 'alert', title: 'Operational alerts', body: 'Configured alerts for defined events, subject to system capabilities and settings.' },
      ],
    },
    {
      type: 'split',
      title: 'How telematics supports fleet operations',
      body: [
        'GPS tracking and telematics help transportation teams improve visibility, coordinate operational responses and review journey-related information.',
        'The value of these tools depends on data quality, system configuration, network availability and how the information is used by operational teams.',
      ],
      image: { src: routeMap, alt: 'A route map from a pickup point to Chennai airport', focus: '50% 40%' },
    },
    { type: 'diagram', title: 'Live trip visibility', body: 'Every tracked vehicle, route and stop in one view for your transport desk.', diagram: 'tower' },
  ],
  faqs: [
    { q: 'Can GPS tracking help transport administrators?', a: 'Yes. GPS-based systems can provide vehicle location and journey visibility, subject to system configuration and access permissions.' },
    { q: 'What is technology-enabled fleet management?', a: 'It combines transportation planning and vehicle operations with digital tools such as scheduling, GPS tracking, trip monitoring and reporting.' },
  ],
  cta: 'Discuss GPS and telematics requirements',
  related: [
    { href: '/safety/gps-geofencing/', label: 'GPS & Geofencing' },
    { href: '/technology/control-tower/', label: 'Control Tower' },
    { href: '/technology/fleet-management/', label: 'Fleet Management' },
  ],
}

const driverApp: DetailPage = {
  slug: 'driver-app',
  label: 'Driver App',
  service: 'fleet-management-technology',
  seo: {
    title: 'Driver App for Trip Management | G DRIVE',
    description: 'The G DRIVE driver app gives drivers trip information, assigned journey details and trip status updates.',
  },
  h1: 'Driver app',
  intro: 'Driver-facing functions support each journey with trip information, assigned journey details and trip status updates.',
  hero: { src: itParkPickup, alt: 'A G DRIVE driver greeting a passenger at pickup', focus: '60% 50%' },
  blocks: [
    {
      type: 'features',
      title: 'What drivers see',
      items: [
        { icon: 'checklist', title: 'Trip information', body: 'The details of every assigned trip in one place.' },
        { icon: 'route', title: 'Assigned journey details', body: 'Pickup points, destinations and timing.' },
        { icon: 'monitor', title: 'Trip status updates', body: 'Status changes shared with the transport desk.' },
      ],
    },
    availability,
  ],
  cta: 'Ask about our driver app',
  related: [
    { href: '/technology/passenger-app/', label: 'Passenger App' },
    { href: '/technology/control-tower/', label: 'Control Tower' },
    { href: '/people-excellence/driver-training/', label: 'Driver Training' },
  ],
}

const passengerApp: DetailPage = {
  slug: 'passenger-app',
  label: 'Passenger App',
  service: 'fleet-management-technology',
  seo: {
    title: 'Passenger App for Corporate Commutes | G DRIVE',
    description:
      'The G DRIVE passenger app supports ride booking, driver and vehicle details, trip notifications, live tracking, support requests and SOS where enabled.',
  },
  h1: 'Passenger app',
  intro:
    'Passenger-facing functions keep employees and guests informed, from booking where enabled to live vehicle tracking and an SOS option where implemented.',
  hero: { src: busBoardingPortrait, alt: 'Employees boarding a G DRIVE bus', focus: '50% 70%' },
  blocks: [
    {
      type: 'features',
      title: 'Digital passenger experience',
      items: [
        { icon: 'calendar', title: 'Book and schedule rides', body: 'Where enabled for your service.' },
        { icon: 'id', title: 'Driver and vehicle details', body: 'Know who is coming and in which vehicle.' },
        { icon: 'alert', title: 'Trip notifications', body: 'Updates as the trip progresses.' },
        { icon: 'gps', title: 'Live vehicle tracking', body: 'Follow the vehicle on a map where enabled.' },
        { icon: 'network', title: 'Share trip information', body: 'Send trip details to colleagues or family.' },
        { icon: 'call', title: 'Support requests', body: 'Raise a request with the transport team.' },
        { icon: 'qr', title: 'QR-code boarding', body: 'Digital passes for faster boarding.' },
        { icon: 'sos', title: 'SOS emergency option', body: 'Emergency escalation where implemented.' },
      ],
    },
    availability,
  ],
  cta: 'Ask about our passenger app',
  related: [
    { href: '/technology/driver-app/', label: 'Driver App' },
    { href: '/safety/gps-geofencing/', label: 'GPS & Geofencing' },
    { href: '/solutions/employee-transportation/', label: 'Employee Transportation' },
  ],
}

const controlTower: DetailPage = {
  slug: 'control-tower',
  label: 'Control Tower',
  service: 'fleet-management-technology',
  seo: {
    title: 'Centralized Transport Control Tower | G DRIVE',
    description:
      'A centralized operations portal giving a coordinated view of vehicles, drivers and scheduled trips for monitoring and reporting.',
  },
  h1: 'Centralized control tower',
  intro:
    'A centralized operations portal gives a coordinated view of transport activity across vehicles, drivers and scheduled trips, instead of relying on separate manual updates.',
  hero: { src: controlRoom, alt: 'An operator monitoring live fleet dashboards in the G DRIVE control room', focus: '50% 45%' },
  blocks: [
    {
      type: 'diagram',
      title: 'One view of every trip',
      body: 'Vehicles, routes and stops on one live map, so the transport desk can coordinate, monitor and respond.',
      diagram: 'tower',
    },
    {
      type: 'features',
      title: 'What the control tower brings together',
      items: [
        { icon: 'car', title: 'Vehicles', body: 'Location and status across the fleet.' },
        { icon: 'users', title: 'Drivers', body: 'Assignments and trip progress.' },
        { icon: 'calendar', title: 'Scheduled trips', body: 'Every planned journey in one schedule.' },
        { icon: 'chart', title: 'Reporting', body: 'Operational records for review.' },
      ],
    },
    availability,
  ],
  cta: 'See how the control tower fits your operations',
  related: [
    { href: '/technology/fleet-management/', label: 'Fleet Management' },
    { href: '/technology/gps-telematics/', label: 'GPS & Telematics' },
    { href: '/safety/', label: 'Safety' },
  ],
}

export const technologySection: Section = {
  base: '/technology',
  label: 'Technology',
  service: 'fleet-management-technology',
  seo: {
    title: 'Fleet Management Technology & GPS Tracking Solutions | G DRIVE',
    description:
      'Discover G DRIVE technology-enabled fleet management, GPS vehicle tracking, route coordination, trip monitoring, driver and passenger apps, and centralized operations.',
  },
  h1: 'Technology-driven mobility',
  intro:
    "Transportation needs coordination between requests, schedules, drivers, vehicles, passengers and operations teams. G DRIVE's technology ecosystem brings these together for centralized coordination and fleet visibility.",
  hero: { src: controlRoom, alt: 'An operator monitoring live fleet dashboards in the G DRIVE control room', focus: '50% 45%' },
  cardsTitle: 'Our technology ecosystem',
  pages: [fleetManagement, gps, driverApp, passengerApp, controlTower],
  blocks: [
    gpsTiles,
    {
      type: 'split',
      title: 'Intelligent operations',
      body: ['The operations side of the platform focuses on scheduling, tracking and transparent reporting.'],
      points: [
        'Automated scheduling',
        'Dynamic route optimization',
        'Real-time vehicle tracking',
        'Digital trip management',
        'Performance dashboards',
        'Transparent billing and centralized reporting',
      ],
      image: { src: airportPickup, alt: 'A coordinated G DRIVE airport pickup', focus: '50% 40%' },
      tone: 'blue',
    },
    availability,
  ],
  faqs: [
    { q: 'What is technology-enabled fleet management?', a: 'It combines transportation planning and vehicle operations with digital tools such as scheduling, GPS tracking, trip monitoring and reporting.' },
    { q: 'Can GPS tracking help transport administrators?', a: 'Yes. GPS-based systems can provide vehicle location and journey visibility, subject to system configuration and access permissions.' },
  ],
  cta: 'Explore technology-enabled mobility',
}

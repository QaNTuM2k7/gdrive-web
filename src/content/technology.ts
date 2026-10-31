import technologyBanner from '../../public/images/banners/technology.jpg'
import gpsGeofencing from '../../public/images/safety/gps-geofencing.jpg'
import controlRoom from '../../public/images/technology/control-room.jpg'
import digitalReporting from '../../public/images/technology/digital-reporting.jpg'
import driverPassengerApp from '../../public/images/technology/driver-passenger-app.jpg'
import fleetManagement from '../../public/images/technology/fleet-management.jpg'
import flowDiagram from '../../public/images/technology/flow-diagram.jpg'
import type { Section } from './types'

// Technology page copy from the client's corrections document. The boxes are cards without links, as the
// client asked, so the section has no child pages.

export const technologySection: Section = {
  base: '/technology',
  label: 'Technology',
  service: 'fleet-management-technology',
  seo: {
    title: 'Fleet Management Technology & GPS Tracking Solutions | G DRIVE',
    description:
      'Discover G DRIVE technology-enabled fleet management, GPS vehicle tracking, route coordination, trip monitoring, driver and passenger apps, and centralized operations.',
  },
  h1: 'Technology-Driven Mobility',
  intro:
    "Managing transportation requires coordination between travel requests, schedules, drivers, vehicles, passengers and operational teams. G DRIVE's technology ecosystem brings together digital transportation workflows designed to support centralized coordination, fleet visibility and structured trip management.",
  hero: { src: technologyBanner, alt: 'An operator reviewing the G DRIVE transport management platform' },
  figure: {
    src: flowDiagram,
    alt: 'G DRIVE technology ecosystem: client or travel request, central operations portal, fleet and driver allocation, driver and passenger apps, GPS and telematics, control tower, then billing and reporting',
  },
  pages: [],
  blocks: [
    {
      type: 'cards',
      title: 'Our technology ecosystem',
      items: [
        {
          image: { src: fleetManagement, alt: 'An operator using the G DRIVE fleet management dashboard' },
          title: 'Fleet Management Solutions',
          body: "Fleet management involves coordinating vehicles, drivers, routes, trip schedules and operational information. G DRIVE's technology approach can support vehicle and driver allocation, trip scheduling, route planning, GPS-based vehicle tracking, trip status monitoring, centralized operational coordination, billing and reporting workflows, and fleet performance visibility. The precise functions available depend on the selected platform and implementation.",
        },
        {
          image: { src: gpsGeofencing, alt: 'Live vehicle tracking on a G DRIVE laptop and phone' },
          title: 'GPS Vehicle Tracking and Telematics',
          body: 'GPS tracking and telematics can help authorized operational teams view vehicle locations and review journey-related information. Potential uses include vehicle location monitoring, route movement visibility, trip status updates, geofence-based monitoring, route deviation alerts and selected event reporting.',
        },
        {
          // TODO(client): replace with the client's own image when supplied.
          image: { src: controlRoom, alt: 'An operator monitoring live fleet dashboards in the G DRIVE control room' },
          title: 'Centralized Control Tower',
          body: 'A centralized operations portal or control tower can provide a coordinated view of transport activity across vehicles, drivers and scheduled trips. It is intended to support operational coordination, monitoring and reporting rather than relying solely on separate manual updates.',
        },
        {
          image: { src: driverPassengerApp, alt: 'A G DRIVE driver completing a trip on the driver app' },
          title: 'Driver and Passenger Applications',
          body: 'Digital applications can support different parts of the transportation journey. Driver-facing functions may include trip information, assigned journey details and trip status updates. Passenger-facing functions may include ride booking or scheduling where enabled, driver and vehicle information, trip notifications, vehicle tracking where enabled, support requests and SOS functionality where implemented.',
        },
        {
          // TODO(client): replace with the client's own image when supplied.
          image: { src: digitalReporting, alt: 'Trip status, on-time performance and fleet utilization reports on a dashboard' },
          title: 'Digital Reporting and Billing',
          body: 'Digital reporting can help authorized teams review trip records, service activity, selected operational metrics and billing information. These capabilities support a more structured approach to transportation administration.',
        },
      ],
    },
    {
      type: 'note',
      body: 'Available functions depend on the selected platform, configuration and service arrangement. Our team will confirm what applies to your service.',
    },
  ],
  faqs: [
    { q: 'What is technology-enabled fleet management?', a: 'It combines transportation planning and vehicle operations with digital tools such as scheduling, GPS tracking, trip monitoring and reporting.' },
    { q: 'Can GPS tracking help transport administrators?', a: 'Yes. GPS-based systems can provide vehicle location and journey visibility, subject to system configuration and access permissions.' },
  ],
}

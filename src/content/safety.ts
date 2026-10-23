import breathalyzerCheck from '../../public/images/breathalyzer-check.jpg'
import driverTraining from '../../public/images/driver-training.jpg'
import sedanNight from '../../public/images/sedan-night.jpg'
import adasDashboard from '../../public/images/safety/adas-dashboard.jpg'
import aiAlertList from '../../public/images/safety/ai-alert-list.webp'
import aiMonitoring from '../../public/images/safety/ai-driver-monitoring.jpg'
import aiMonitoringB from '../../public/images/safety/ai-driver-monitoring-b.jpg'
import breathFail from '../../public/images/safety/breathalyzer-fail.webp'
import breathPass from '../../public/images/safety/breathalyzer-pass.webp'
import breathBusDriver from '../../public/images/safety/breathalyzer-bus-driver.jpg'
import faceId from '../../public/images/safety/face-id-verified.jpg'
import iconLive from '../../public/images/technology/icon-live-location.png'
import iconRoute from '../../public/images/technology/icon-route.png'
import iconSpeed from '../../public/images/technology/icon-vehicle-speed.png'
import iconTrip from '../../public/images/technology/icon-trip-status.png'
import routeMap from '../../public/images/technology/route-map.jpg'
import type { Block, DetailPage, Section } from './types'

// Breathalyzer, AI video telematics and ADAS copy from the SEO master document (sections 13 to 16).
// The hub and GPS & Geofencing page draw on the brochure's safety page.

const noGuarantee: Block = {
  type: 'note',
  body: 'Safety technology supports driver awareness and operational monitoring. It does not replace responsible driving, driver training or compliance with traffic regulations, and it does not guarantee accident prevention.',
}

const breathalyzer: DetailPage = {
  slug: 'iot-breathalyzer',
  label: 'IoT Breathalyzer',
  service: 'ai-telematics-safety',
  seo: {
    title: 'IoT-Enabled Breathalyzer for Transportation Safety | G DRIVE',
    description:
      "Explore G DRIVE's IoT-enabled breathalyzer approach for driver alcohol screening, centralized monitoring, digital records and configured vehicle safety interlocks.",
  },
  h1: 'IoT-enabled breathalyzer',
  intro:
    'Drivers complete breath alcohol screening before a trip. Results are transmitted to a centralized platform, creating a digital audit trail for authorized review.',
  hero: { src: breathBusDriver, alt: 'A G DRIVE bus driver using the breathalyzer before a trip', focus: '55% 45%' },
  blocks: [
    {
      type: 'steps',
      title: 'How the process works',
      items: [
        { title: 'Driver screening', body: 'The driver completes the prescribed breath alcohol test before the journey.' },
        { title: 'Digital result capture', body: 'The system records the result through the configured digital interface.' },
        { title: 'Centralized monitoring', body: 'Authorized personnel review screening information on the connected platform.' },
        { title: 'Alert and safety response', body: 'Configured rules can raise alerts and, with an integrated interlock, prevent vehicle operation.' },
      ],
    },
    {
      type: 'compare',
      title: 'Clear results, recorded every time',
      items: [
        { image: { src: breathPass, alt: 'Breathalyzer screen showing PASS, no alcohol detected', fit: 'contain' }, label: 'Pass', body: 'No alcohol detected. The result is logged and the trip can start.' },
        { image: { src: breathFail, alt: 'Breathalyzer screen showing FAIL and do not start', fit: 'contain' }, label: 'Fail', body: 'Alcohol detected. An alert is raised and, where an interlock is installed, the vehicle cannot start.' },
      ],
    },
    {
      type: 'checklist',
      title: 'Benefits of digital driver screening',
      items: [
        'Structured pre-trip screening processes',
        'Digital records for authorized review',
        'Centralized visibility of screening results',
        'Configurable alerts and escalation',
        'Integration with selected vehicle safety systems',
      ],
      image: { src: breathalyzerCheck, alt: 'A G DRIVE driver taking a breath alcohol test', focus: '30% 50%' },
    },
    { type: 'note', body: 'Exact workflows and integrations are verified for each deployed configuration.' },
  ],
  cta: 'Enquire about driver safety integration',
  related: [
    { href: '/safety/ai-video-telematics/', label: 'AI Video Telematics' },
    { href: '/people-excellence/driver-training/', label: 'Driver Training' },
    { href: '/safety/', label: 'All safety layers' },
  ],
}

const geofencing: DetailPage = {
  slug: 'gps-geofencing',
  label: 'GPS & Geofencing',
  service: 'ai-telematics-safety',
  seo: {
    title: 'GPS Tracking, Geofencing & SOS Escalation for Fleets | G DRIVE',
    description:
      'GPS and geofencing for fleet safety: vehicle location, route movement, trip status, geofence alerts, route deviation, speed and SOS escalation.',
  },
  h1: 'GPS & geofencing',
  intro:
    'Every trip is visible to the transport team: vehicle location, route movement, trip status, geofencing, route deviation, speed and SOS escalation.',
  hero: { src: routeMap, alt: 'A tracked route on a map of Chennai', focus: '50% 40%' },
  blocks: [
    {
      type: 'tiles',
      title: 'What the transport team can see',
      items: [
        { image: iconLive, label: 'Vehicle location', body: 'Where each vehicle is during the trip.' },
        { image: iconRoute, label: 'Route movement', body: 'The path taken against the planned route.' },
        { image: iconSpeed, label: 'Speed', body: 'Speed information where the vehicle supports it.' },
        { image: iconTrip, label: 'Trip status', body: 'Configured statuses from start to finish.' },
      ],
    },
    {
      type: 'features',
      title: 'When something needs attention',
      items: [
        { icon: 'geofence', title: 'Geofence alerts', body: 'Alerts when a vehicle enters or leaves a defined area.' },
        { icon: 'route', title: 'Route deviation', body: 'Visibility when a trip departs from its planned route.' },
        { icon: 'sos', title: 'SOS escalation', body: 'Emergency escalation to the operations team where implemented.' },
      ],
    },
    { type: 'diagram', title: 'Monitored from the control tower', body: 'Location, routes and alerts come together on one live map.', diagram: 'tower' },
    noGuarantee,
  ],
  cta: 'Discuss GPS and geofencing',
  related: [
    { href: '/technology/gps-telematics/', label: 'GPS & Telematics' },
    { href: '/technology/control-tower/', label: 'Control Tower' },
    { href: '/technology/passenger-app/', label: 'Passenger App' },
  ],
}

const aiVideo: DetailPage = {
  slug: 'ai-video-telematics',
  label: 'AI Video Telematics',
  service: 'ai-telematics-safety',
  seo: {
    title: 'AI Video Telematics for Fleet Safety & Driver Monitoring | G DRIVE',
    description:
      'Discover AI video telematics capabilities for identifying selected driver risk events, including fatigue, drowsiness, distraction, mobile phone use and seatbelt violations.',
  },
  h1: 'AI video telematics',
  intro:
    'Video-based monitoring with configured detection identifies selected driver behaviours and safety events, including fatigue, drowsiness, distraction, mobile phone use and seatbelt violations.',
  hero: { src: aiMonitoring, alt: 'An in-cab AI camera monitoring a G DRIVE driver for fatigue and distraction', focus: '50% 40%' },
  blocks: [
    {
      type: 'split',
      title: 'Driver monitoring capabilities',
      body: ['Configured systems can identify visual indicators and flag selected events for review.'],
      points: ['Driver fatigue and drowsiness', 'Driver distraction', 'Mobile phone usage while driving', 'Seatbelt compliance'],
      image: { src: aiAlertList, alt: 'Alert list for fatigue, drowsiness, distraction, phone use and seatbelt violations', fit: 'contain' },
    },
    {
      type: 'steps',
      title: 'From detection to operational response',
      items: [
        { title: 'Capture', body: 'Supported cameras capture video or sensor data.' },
        { title: 'Detect', body: 'The system identifies a configured event.' },
        { title: 'Alert', body: 'An alert or event record is generated.' },
        { title: 'Review and follow up', body: 'An authorized team reviews the event and acts where required.' },
      ],
    },
    {
      type: 'split',
      title: 'Supporting a safety-oriented fleet culture',
      body: [
        'AI video telematics is most effective alongside driver training, vehicle maintenance, clear operating procedures and safety policies.',
        'Detection accuracy and alert availability depend on the system, camera configuration, operating conditions and implementation.',
      ],
      image: { src: aiMonitoringB, alt: 'An AI driver monitoring system inside a G DRIVE vehicle', focus: '50% 40%' },
      reverse: true,
    },
    noGuarantee,
  ],
  cta: 'Enquire about AI video telematics',
  related: [
    { href: '/safety/adas/', label: 'ADAS' },
    { href: '/safety/iot-breathalyzer/', label: 'IoT Breathalyzer' },
    { href: '/people-excellence/driver-training/', label: 'Driver Training' },
  ],
}

const adas: DetailPage = {
  slug: 'adas',
  label: 'ADAS',
  service: 'ai-telematics-safety',
  seo: {
    title: 'ADAS for Fleet Safety & Driver Assistance | G DRIVE',
    description:
      'Learn about Advanced Driver Assistance Systems and their potential role in identifying collision risks, lane departure, surrounding vehicles and road hazards.',
  },
  h1: 'Advanced Driver Assistance Systems',
  intro:
    'ADAS uses supported sensors and cameras to help drivers recognize selected road conditions and potential hazards.',
  hero: { src: adasDashboard, alt: 'A driver with an ADAS display warning of a vehicle ahead', focus: '50% 45%' },
  blocks: [
    {
      type: 'features',
      title: 'Key ADAS functions',
      items: [
        { icon: 'warning', title: 'Forward collision risk', body: 'Supported systems may warn drivers of potential forward collision risks under specified conditions.' },
        { icon: 'route', title: 'Lane departure alerts', body: 'Lane monitoring may identify selected lane departure events and issue warnings.' },
        { icon: 'car', title: 'Surrounding vehicle awareness', body: 'Camera or sensor systems can provide information about nearby vehicles and traffic.' },
        { icon: 'eye', title: 'Road hazard awareness', body: 'Some systems identify selected road hazards or vulnerable road users.' },
      ],
    },
    {
      type: 'split',
      title: 'ADAS and fleet safety',
      body: [
        'ADAS contributes to driver awareness, but it does not replace responsible driving, driver training or compliance with traffic regulations.',
        'Performance depends on the vehicle, installed equipment, road conditions, visibility and system configuration.',
      ],
      image: { src: sedanNight, alt: 'A G DRIVE sedan on a city highway at night', focus: '40% 70%' },
    },
  ],
  cta: 'Discuss fleet safety technology',
  related: [
    { href: '/safety/ai-video-telematics/', label: 'AI Video Telematics' },
    { href: '/safety/gps-geofencing/', label: 'GPS & Geofencing' },
    { href: '/safety/', label: 'All safety layers' },
  ],
}

export const safetySection: Section = {
  base: '/safety',
  label: 'Safety',
  service: 'ai-telematics-safety',
  seo: {
    title: 'Fleet Safety & Intelligent Monitoring | G DRIVE',
    description:
      "Explore G DRIVE's safety approach: IoT breathalyzer screening, GPS and geofencing, AI video telematics, ADAS, driver training and vehicle maintenance.",
  },
  h1: 'Safety engineered into every journey',
  intro:
    'At G DRIVE, safety is integrated throughout the transportation lifecycle, from driver readiness to trip completion.',
  hero: { src: aiMonitoring, alt: 'An in-cab AI camera monitoring a G DRIVE driver', focus: '50% 40%' },
  cardsCta: { title: 'Planning safety for your fleet?', body: 'Tell us about your vehicles, drivers and routes. We will recommend the right combination of safety layers.' },
  cardsTitle: 'Four layers of safety technology',
  pages: [breathalyzer, geofencing, aiVideo, adas],
  blocks: [
    {
      type: 'split',
      title: 'Technology plus people',
      body: ['Technology provides intelligence. People deliver the experience. Drivers are trained in:'],
      points: ['Defensive driving', 'Emergency response and first aid', 'Passenger etiquette and traffic regulations', 'Night driving and monsoon preparedness'],
      image: { src: driverTraining, alt: 'G DRIVE drivers in a training session', focus: '50% 50%' },
      reverse: true,
    },
    {
      type: 'split',
      title: 'In development: face identification',
      body: [
        'G DRIVE is developing face identification integrated with the breathalyzer, and automated employee attendance capture using face identification or RFID, to support better workforce planning.',
      ],
      image: { src: faceId, alt: 'Face identification verifying a G DRIVE driver in the cab', focus: '50% 45%' },
      tone: 'blue',
    },
    noGuarantee,
  ],
  cta: 'Discuss safety for your fleet',
}

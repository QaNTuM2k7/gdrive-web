import breathalyzerCheck from '../../public/images/breathalyzer-check.jpg'
import driverTraining from '../../public/images/driver-training.jpg'
import itParkFleet from '../../public/images/fleet/it-park-fleet.jpg'
import maintenance from '../../public/images/maintenance-bay.jpg'
import chauffeur from '../../public/images/people/chauffeur.webp'
import type { Block, DetailPage, Section } from './types'

// Copy from the SEO master document, section 17 (People & Operational Excellence).

const trainingTopics: Block = {
  type: 'features',
  title: 'Driver training and development',
  items: [
    { icon: 'shield', title: 'Defensive driving', body: 'Hazard awareness, following distances, speed management and responsible driving.' },
    { icon: 'sos', title: 'Emergency response', body: 'Appropriate response procedures during unexpected situations.' },
    { icon: 'firstaid', title: 'First aid awareness', body: 'Basic awareness to support appropriate initial responses within the scope of training.' },
    { icon: 'handshake', title: 'Passenger etiquette', body: 'Professional conduct and courteous communication.' },
    { icon: 'checklist', title: 'Traffic regulations', body: 'Awareness of applicable traffic rules.' },
    { icon: 'night', title: 'Night driving', body: 'Visibility and alertness considerations after dark.' },
    { icon: 'monsoon', title: 'Monsoon preparedness', body: 'Driving in rain, on wet roads and in reduced visibility.' },
  ],
}

const maintenanceList: Block = {
  type: 'checklist',
  title: 'Vehicle maintenance and compliance',
  intro: 'Activities that form part of our operational approach:',
  items: [
    'Routine vehicle inspections',
    'Preventive maintenance',
    'Engine servicing',
    'Electrical checks',
    'Tyre maintenance',
    'Air-conditioning maintenance',
    'Safety audits',
  ],
  image: { src: maintenance, alt: 'A technician servicing a vehicle in the G DRIVE maintenance bay', focus: '50% 50%' },
}

const driverTrainingPage: DetailPage = {
  slug: 'driver-training',
  label: 'Driver Training',
  service: 'employee-transportation',
  seo: {
    title: 'Driver Training & Defensive Driving Programme | G DRIVE',
    description:
      "G DRIVE's driver training covers defensive driving, emergency response, first aid awareness, passenger etiquette, traffic regulations, night driving and monsoon preparedness.",
  },
  h1: 'Driver training and development',
  intro:
    'Trained drivers are at the centre of dependable transportation. Our training covers safe driving, emergency response and professional passenger service.',
  hero: { src: driverTraining, alt: 'G DRIVE drivers in a defensive driving training session', focus: '50% 50%' },
  blocks: [
    trainingTopics,
    {
      type: 'split',
      title: 'Readiness before every trip',
      body: [
        'Every G DRIVE driver completes breath alcohol screening before the start of a trip, with results recorded on a central platform.',
      ],
      image: { src: breathalyzerCheck, alt: 'A G DRIVE driver taking a breath alcohol test', focus: '30% 50%' },
      reverse: true,
    },
  ],
  cta: 'Discuss your transportation operations',
  related: [
    { href: '/safety/iot-breathalyzer/', label: 'IoT Breathalyzer' },
    { href: '/people-excellence/maintenance-compliance/', label: 'Maintenance & Compliance' },
    { href: '/solutions/executive-car-rental/', label: 'Executive Car Rental' },
  ],
}

const maintenancePage: DetailPage = {
  slug: 'maintenance-compliance',
  label: 'Maintenance & Compliance',
  service: 'employee-transportation',
  seo: {
    title: 'Fleet Maintenance & Compliance | G DRIVE',
    description:
      'Routine inspections, preventive maintenance, engine servicing, electrical, tyre and air-conditioning checks and safety audits across the G DRIVE fleet.',
  },
  h1: 'Vehicle maintenance and compliance',
  intro:
    'Routine inspections, preventive maintenance and safety audits keep the fleet ready for daily operations.',
  hero: { src: maintenance, alt: 'A technician servicing a vehicle in the G DRIVE maintenance bay', focus: '50% 50%' },
  blocks: [
    { ...maintenanceList, image: { src: itParkFleet, alt: 'The G DRIVE fleet ready for service', focus: '50% 60%' } },
    { type: 'note', body: 'Maintenance schedules align with vehicle requirements, manufacturer recommendations and applicable regulations.' },
  ],
  cta: 'Discuss your transportation operations',
  related: [
    { href: '/people-excellence/driver-training/', label: 'Driver Training' },
    { href: '/fleet/', label: 'Fleet' },
    { href: '/safety/', label: 'Safety' },
  ],
}

export const peopleSection: Section = {
  base: '/people-excellence',
  label: 'People & Excellence',
  service: 'employee-transportation',
  seo: {
    title: 'Driver Training & Fleet Maintenance for Safer Mobility | G DRIVE',
    description:
      "Learn about G DRIVE's driver training, defensive driving, emergency response, vehicle inspections and preventive maintenance approach to transportation operations.",
  },
  h1: 'People and operational excellence',
  intro:
    'Technology provides intelligence. People deliver the experience. Trained personnel, structured operating procedures and vehicle maintenance make transportation dependable.',
  hero: { src: driverTraining, alt: 'G DRIVE drivers in a training session', focus: '50% 30%' },
  cardsCta: { title: 'Want to see how we operate?', body: 'Talk to our team about training, screening and maintenance standards for your service.' },
  cardsTitle: 'How we keep standards high',
  pages: [driverTrainingPage, maintenancePage],
  blocks: [
    trainingTopics,
    maintenanceList,
    {
      type: 'split',
      title: 'Supporting dependable transportation',
      body: [
        'Driver training and vehicle maintenance work together with scheduling, operational coordination and safety technology to support organized mobility services.',
      ],
      image: { src: chauffeur, alt: 'A G DRIVE chauffeur in uniform', fit: 'contain' },
      tone: 'blue',
    },
  ],
}

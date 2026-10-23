import { fleetSection } from '@/content/fleet'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { hub } = sectionRoutes(fleetSection)

export const metadata = hub.metadata
export default hub.Page

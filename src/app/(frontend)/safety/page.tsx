import { safetySection } from '@/content/safety'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { hub } = sectionRoutes(safetySection)

export const metadata = hub.metadata
export default hub.Page

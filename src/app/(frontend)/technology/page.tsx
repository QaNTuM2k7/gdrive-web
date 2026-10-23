import { technologySection } from '@/content/technology'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { hub } = sectionRoutes(technologySection)

export const metadata = hub.metadata
export default hub.Page

import { solutionsSection } from '@/content/solutions'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { hub } = sectionRoutes(solutionsSection)

export const metadata = hub.metadata
export default hub.Page

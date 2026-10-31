import { SolutionsGrid } from '@/components/home/SolutionsGrid'
import { solutionsSection } from '@/content/solutions'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { hub } = sectionRoutes(solutionsSection, { cards: <SolutionsGrid /> })

export const metadata = hub.metadata
export default hub.Page

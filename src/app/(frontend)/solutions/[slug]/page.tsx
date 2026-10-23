import { solutionsSection } from '@/content/solutions'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { detail } = sectionRoutes(solutionsSection)

export const dynamicParams = false
export const generateStaticParams = detail.generateStaticParams
export const generateMetadata = detail.generateMetadata
export default detail.Page

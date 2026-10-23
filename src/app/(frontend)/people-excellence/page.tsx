import { peopleSection } from '@/content/people'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { hub } = sectionRoutes(peopleSection)

export const metadata = hub.metadata
export default hub.Page

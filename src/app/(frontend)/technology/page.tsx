import { TechEcosystem } from '@/components/motion/TechEcosystem'
import { technologySection } from '@/content/technology'
import { sectionRoutes } from '@/lib/sectionRoutes'

const { hub } = sectionRoutes(technologySection, { figure: <TechEcosystem /> })

export const metadata = hub.metadata
export default hub.Page

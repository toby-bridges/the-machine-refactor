import FeaturePlaceholder from '@/components/FeaturePlaceholder'
import { FEATURE_DESCRIPTIONS } from '@/lib/constants'

export default function SimulationPage() {
  return (
    <FeaturePlaceholder
      feature="simulation"
      title={FEATURE_DESCRIPTIONS.SIMULATION.title}
      description={FEATURE_DESCRIPTIONS.SIMULATION.description}
      targetVersion="v0.3.0"
      tagline={FEATURE_DESCRIPTIONS.SIMULATION.tagline}
    />
  )
}

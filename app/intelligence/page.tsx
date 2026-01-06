import FeaturePlaceholder from '@/components/FeaturePlaceholder'
import { FEATURE_DESCRIPTIONS } from '@/lib/constants'

export default function IntelligencePage() {
  return (
    <FeaturePlaceholder
      feature="intelligence"
      title={FEATURE_DESCRIPTIONS.INTELLIGENCE.title}
      description={FEATURE_DESCRIPTIONS.INTELLIGENCE.description}
      targetVersion="v0.2.0"
      tagline={FEATURE_DESCRIPTIONS.INTELLIGENCE.tagline}
    />
  )
}

import FeaturePlaceholder from '@/components/FeaturePlaceholder'
import { FEATURE_DESCRIPTIONS } from '@/lib/constants'

export default function SurveillancePage() {
  return (
    <FeaturePlaceholder
      feature="surveillance"
      title={FEATURE_DESCRIPTIONS.SURVEILLANCE.title}
      description={FEATURE_DESCRIPTIONS.SURVEILLANCE.description}
      targetVersion="v0.4.0"
      tagline={FEATURE_DESCRIPTIONS.SURVEILLANCE.tagline}
    />
  )
}

import LocationLanding, { locationMetadata } from '@/components/LocationLanding'

export const metadata = locationMetadata('my')

export default function MalaysiaPage() {
  return <LocationLanding market="my" />
}

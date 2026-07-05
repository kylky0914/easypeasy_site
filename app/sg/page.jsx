import LocationLanding, { locationMetadata } from '@/components/LocationLanding'

export const metadata = locationMetadata('sg')

export default function SingaporePage() {
  return <LocationLanding market="sg" />
}

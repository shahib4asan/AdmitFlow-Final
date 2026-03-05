import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getUniversitiesSimple, getSubscription } from '@/lib/db'
import UniversitiesClient from '@/components/dashboard/UniversitiesClient'

export default async function UniversitiesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const [universities, subscription] = await Promise.all([
    getUniversitiesSimple(session.user.id),
    getSubscription(session.user.id),
  ])

  return (
    <UniversitiesClient
      initialUniversities={universities as any}
      plan={subscription?.plan_type ?? 'free'}
      userId={session.user.id}
    />
  )
}

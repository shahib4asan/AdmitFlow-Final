import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getCostTracker, getUniversitiesSimple, getSubscription } from '@/lib/db'
import CostsClient from '@/components/dashboard/CostsClient'

export default async function CostsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const [costsData, unis, subscription] = await Promise.all([
    getCostTracker(session.user.id),
    getUniversitiesSimple(session.user.id),
    getSubscription(session.user.id),
  ])

  const totalAppFees = (unis ?? []).reduce((s: number, u: any) => s + (u.fee || 0), 0)

  return (
    <CostsClient
      initialData={costsData}
      userId={session.user.id}
      totalAppFees={totalAppFees}
      plan={subscription?.plan_type ?? 'free'}
    />
  )
}

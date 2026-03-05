import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getUniversities, getSubscription } from '@/lib/db'
import DocumentsClient from '@/components/dashboard/DocumentsClient'

export default async function DocumentsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const [unis, subscription] = await Promise.all([
    getUniversities(session.user.id),
    getSubscription(session.user.id),
  ])

  return <DocumentsClient universities={unis as any} plan={subscription?.plan_type ?? 'free'} />
}

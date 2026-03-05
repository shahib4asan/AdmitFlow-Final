import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getExamTracker } from '@/lib/db'
import ExamsClient from '@/components/dashboard/ExamsClient'

export default async function ExamsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const data = await getExamTracker(session.user.id)
  return <ExamsClient initialData={data} userId={session.user.id} />
}

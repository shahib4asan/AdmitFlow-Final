import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createUniversity, updateUniversity, deleteUniversity, sql } from '@/lib/db'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { action, id, ...data } = body
  const userId = session.user.id

  try {
    if (action === 'create') {
      const uni = await createUniversity(userId, data)

      // Create default document stubs
      const DOC_TYPES = ['sop', 'cv', 'ielts', 'transcript', 'passport', 'lor1', 'lor2']
      await sql`
        INSERT INTO documents (university_id, user_id, name, type, status)
        SELECT ${uni.id}, ${userId}, unnest(${DOC_TYPES}::text[]), unnest(${DOC_TYPES}::text[]), 'pending'
      `
      return NextResponse.json({ data: uni })
    }

    if (action === 'update') {
      const uni = await updateUniversity(id, userId, data)
      return NextResponse.json({ data: uni })
    }

    if (action === 'delete') {
      await deleteUniversity(id, userId)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

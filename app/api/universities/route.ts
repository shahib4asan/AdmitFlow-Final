import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createUniversity, updateUniversity, deleteUniversity, sql } from '@/lib/db'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { action, id, ...data } = body

  try {
    if (action === 'create') {
      const uni = await createUniversity({ ...data, userId: session.user.id })
      // Create default document stubs
      const DOC_TYPES = ['sop', 'cv', 'ielts', 'transcript', 'passport', 'lor1', 'lor2']
      await sql`
        INSERT INTO documents (university_id, type, completed, file_url)
        SELECT ${uni.id}, unnest(${DOC_TYPES}::text[]), false, null
      `
      return NextResponse.json({ data: uni })
    }

    if (action === 'update') {
      const uni = await updateUniversity(id, session.user.id, data)
      return NextResponse.json({ data: uni })
    }

    if (action === 'delete') {
      await deleteUniversity(id, session.user.id)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

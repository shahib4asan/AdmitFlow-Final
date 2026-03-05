import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { action, id, completed, file_url } = body

  try {
    if (action === 'toggle') {
      // Verify ownership via universities join
      const rows = await sql`
        UPDATE documents SET completed = ${completed}
        WHERE id = ${id}
          AND university_id IN (
            SELECT id FROM universities WHERE user_id = ${session.user.id}
          )
        RETURNING *
      `
      return NextResponse.json({ data: rows[0] })
    }

    if (action === 'setFileUrl') {
      const rows = await sql`
        UPDATE documents SET file_url = ${file_url}, completed = true
        WHERE id = ${id}
          AND university_id IN (
            SELECT id FROM universities WHERE user_id = ${session.user.id}
          )
        RETURNING *
      `
      return NextResponse.json({ data: rows[0] })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

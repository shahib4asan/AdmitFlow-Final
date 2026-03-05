import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const today = new Date()
    const in7Days = new Date(today); in7Days.setDate(today.getDate() + 7)
    const in2Days = new Date(today); in2Days.setDate(today.getDate() + 2)
    const d7 = formatDate(in7Days)
    const d2 = formatDate(in2Days)

    // Join universities with users table (no more auth.users)
    const universities = await sql`
      SELECT u.id, u.name, u.program, u.deadline, u.user_id,
             usr.email, usr.name AS user_name
      FROM universities u
      JOIN users usr ON usr.id = u.user_id
      WHERE u.deadline = ${d7}::date OR u.deadline = ${d2}::date
    `

    const results: string[] = []

    for (const uni of universities) {
      const daysLeft = Math.ceil((new Date(uni.deadline).getTime() - today.getTime()) / 86400000)
      if (uni.email) {
        await sendReminderEmail({
          to: uni.email,
          name: uni.user_name || 'there',
          university: uni.name,
          program: uni.program,
          deadline: uni.deadline,
          daysLeft,
        })
        results.push(`Sent to ${uni.email} for ${uni.name} (${daysLeft}d)`)
      }
    }

    return NextResponse.json({ success: true, sent: results.length, details: results })
  } catch (err: any) {
    console.error('Cron error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function formatDate(d: Date) {
  return d.toISOString().split('T')[0]
}

async function sendReminderEmail({ to, name, university, program, deadline, daysLeft }: {
  to: string; name: string; university: string; program: string; deadline: string; daysLeft: number
}) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) { console.warn('RESEND_API_KEY not set'); return }

  const urgency = daysLeft <= 2 ? '🚨 URGENT' : '⚠️ Reminder'
  const subject = `${urgency}: ${university} deadline in ${daysLeft} days`

  const html = `
    <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f5f3ee; padding: 40px 20px;">
      <div style="background: white; border-radius: 16px; padding: 40px; border: 1px solid rgba(10,15,30,0.1);">
        <div style="font-size: 28px; font-weight: 900; letter-spacing: 2px; color: #1a3cff; margin-bottom: 24px;">AdmitFlow</div>
        <div style="background: ${daysLeft <= 2 ? '#ff4d2e' : '#f59e0b'}; color: white; border-radius: 8px; padding: 12px 16px; font-weight: 700; font-size: 16px; margin-bottom: 24px;">
          ${daysLeft <= 2 ? '🚨' : '⏰'} ${daysLeft} day${daysLeft === 1 ? '' : 's'} until deadline!
        </div>
        <p style="font-size: 16px; color: #0a0f1e; margin-bottom: 8px;">Hi ${name},</p>
        <p style="font-size: 15px; color: #6b7280; line-height: 1.6; margin-bottom: 24px;">
          Your application deadline for <strong style="color: #0a0f1e;">${university}</strong> (${program}) is on
          <strong style="color: ${daysLeft <= 2 ? '#ff4d2e' : '#0a0f1e'};">${new Date(deadline).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
           style="display: inline-block; background: #1a3cff; color: white; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none;">
          Check Dashboard →
        </a>
      </div>
    </div>
  `

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'AdmitFlow <reminders@yourdomain.com>',
      to: [to],
      subject,
      html,
    }),
  })
}

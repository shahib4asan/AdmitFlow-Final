import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { randomUUID } from 'crypto'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'change-me-in-production-32-chars!!'
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, phone, country, target_universities,
            ielts_score, sat_score, toefl_score, gre_score } = body

    if (!name || name.length < 2)
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
    if (!password || password.length < 8)
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })

    const sql = neon(process.env.DATABASE_URL!)
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL, phone TEXT, country TEXT,
        target_universities TEXT[], ielts_score NUMERIC(3,1),
        sat_score INTEGER, toefl_score INTEGER, gre_score INTEGER,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    const id = randomUUID()
    const passwordHash = await bcrypt.hash(password, 10)
    const unis = target_universities
      ? target_universities.split(',').map((u: string) => u.trim()).filter(Boolean)
      : []

    const rows = await sql`
      INSERT INTO users (id, name, email, password_hash, phone, country,
        target_universities, ielts_score, sat_score, toefl_score, gre_score)
      VALUES (${id}, ${name.trim()}, ${email.toLowerCase().trim()}, ${passwordHash},
        ${phone||null}, ${country||null}, ${unis},
        ${ielts_score||null}, ${sat_score||null}, ${toefl_score||null}, ${gre_score||null})
      RETURNING id, name, email
    `

    const user = rows[0]
    const token = await new SignJWT({ sub: user.id, name: user.name, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET)

    const res = NextResponse.json({ ok: true })
    res.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return res
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[signup]', msg)
    if (msg.includes('unique') || msg.includes('duplicate'))
      return NextResponse.json({ error: 'Email already exists.' }, { status: 409 })
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
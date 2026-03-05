import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'change-me-in-production-32-chars!!'
)

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password)
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })

    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`SELECT id, name, email, password_hash FROM users WHERE email = ${email.toLowerCase().trim()}`

    if (!rows.length)
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })

    const user = rows[0]
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid)
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })

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
    console.error('[login]', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
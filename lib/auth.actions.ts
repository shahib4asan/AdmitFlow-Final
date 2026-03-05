'use server'

import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT } from 'jose'
import { randomUUID } from 'crypto'

function getDb() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is not set in .env.local')
  return neon(url)
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'change-me-in-production-32-chars!!'
)

export type SignupState = {
  error?: string
  success?: boolean
}

async function ensureTable() {
  const sql = getDb()
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id            TEXT PRIMARY KEY,
      name          TEXT NOT NULL,
      email         TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      phone         TEXT,
      country       TEXT,
      target_universities TEXT[],
      ielts_score   NUMERIC(3,1),
      sat_score     INTEGER,
      toefl_score   INTEGER,
      gre_score     INTEGER,
      created_at    TIMESTAMPTZ DEFAULT NOW(),
      updated_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

async function createSessionCookie(userId: string, name: string, email: string) {
  const token = await new SignJWT({ sub: userId, name, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  // Next.js 14 — cookies() is SYNCHRONOUS, no await
  cookies().set({
    name: 'session',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

// ── SIGNUP ───────────────────────────────────────────────────────────────────
export async function signupAction(
  _prev: SignupState,
  formData: FormData
): Promise<SignupState> {
  const name     = String(formData.get('name')     ?? '').trim()
  const email    = String(formData.get('email')    ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const phone    = String(formData.get('phone')    ?? '').trim() || null
  const country  = String(formData.get('country')  ?? '').trim() || null
  const targetUniversitiesRaw = String(formData.get('target_universities') ?? '').trim()
  const ielts = formData.get('ielts_score') ? Number(formData.get('ielts_score')) : null
  const sat   = formData.get('sat_score')   ? Number(formData.get('sat_score'))   : null
  const toefl = formData.get('toefl_score') ? Number(formData.get('toefl_score')) : null
  const gre   = formData.get('gre_score')   ? Number(formData.get('gre_score'))   : null

  if (!name || name.length < 2)
    return { error: 'Please enter your full name.' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: 'Enter a valid email address.' }
  if (!password || password.length < 8)
    return { error: 'Password must be at least 8 characters.' }

  const targetUniversities = targetUniversitiesRaw
    ? targetUniversitiesRaw.split(',').map((u) => u.trim()).filter(Boolean)
    : []

  try {
    const sql = getDb()
    await ensureTable()

    const id           = randomUUID()
    const passwordHash = await bcrypt.hash(password, 10)

    const rows = await sql`
      INSERT INTO users (
        id, name, email, password_hash, phone, country,
        target_universities, ielts_score, sat_score, toefl_score, gre_score
      ) VALUES (
        ${id}, ${name}, ${email}, ${passwordHash}, ${phone}, ${country},
        ${targetUniversities}, ${ielts}, ${sat}, ${toefl}, ${gre}
      )
      RETURNING id, name, email
    `

    const user = rows[0]
    await createSessionCookie(user.id, user.name, user.email)

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[signupAction]', msg)

    if (msg.includes('unique') || msg.includes('duplicate') || msg.includes('already exists')) {
      return { error: 'An account with this email already exists.' }
    }
    if (msg.includes('DATABASE_URL')) {
      return { error: 'Database not configured. Check your .env.local file.' }
    }
    if (process.env.NODE_ENV !== 'production') {
      return { error: `Error: ${msg}` }
    }
    return { error: 'Something went wrong. Please try again.' }
  }

  redirect('/dashboard')
}

// ── LOGIN ────────────────────────────────────────────────────────────────────
export async function loginAction(
  _prev: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email    = String(formData.get('email')    ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')

  if (!email || !password)
    return { error: 'Email and password are required.' }

  try {
    const sql = getDb()
    await ensureTable()

    const rows = await sql`
      SELECT id, name, email, password_hash FROM users WHERE email = ${email}
    `

    if (!rows.length) return { error: 'Invalid email or password.' }

    const user  = rows[0]
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return { error: 'Invalid email or password.' }

    await createSessionCookie(user.id, user.name, user.email)

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[loginAction]', msg)

    if (msg.includes('DATABASE_URL')) {
      return { error: 'Database not configured. Check your .env.local file.' }
    }
    if (process.env.NODE_ENV !== 'production') {
      return { error: `Error: ${msg}` }
    }
    return { error: 'Something went wrong. Please try again.' }
  }

  redirect('/dashboard')
}

// ── LOGOUT ───────────────────────────────────────────────────────────────────
export async function logoutAction() {
  cookies().delete('session')
  redirect('/')
}

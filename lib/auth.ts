import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SessionUser {
  id: string
  name: string
  email: string
}

export interface Session {
  user: SessionUser
}

// ─────────────────────────────────────────────────────────────────────────────
// Secret key — set AUTH_SECRET in your .env.local and Vercel env vars
// ─────────────────────────────────────────────────────────────────────────────

function getSecret() {
  const secret = process.env.JWT_SECRET ?? process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET
  if (!secret) throw new Error('JWT_SECRET environment variable is not set')
  return new TextEncoder().encode(secret)
}

const COOKIE_NAME = 'session'

// ─────────────────────────────────────────────────────────────────────────────
// Create a signed JWT and set it as a cookie
// ─────────────────────────────────────────────────────────────────────────────

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(getSecret())

  const cookieStore = cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Read and verify the session cookie
// Returns null if missing or invalid — never throws in API routes
// ─────────────────────────────────────────────────────────────────────────────

export async function auth(): Promise<Session | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return null

    const { payload } = await jwtVerify(token, getSecret())

    // login/signup stores: { sub: id, name, email }
    const id    = payload.sub    as string
    const name  = payload.name   as string
    const email = payload.email  as string

    if (!id || !email) return null

    return { user: { id, name, email } }
  } catch {
    return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Clear the session cookie (logout)
// ─────────────────────────────────────────────────────────────────────────────

export async function clearSession() {
  const cookieStore = cookies()
  cookieStore.delete(COOKIE_NAME)
}

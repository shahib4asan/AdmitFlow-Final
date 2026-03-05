// NextAuth handles OAuth callbacks automatically via /api/auth/callback/[provider]
// This file is kept as a fallback redirect only.
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/dashboard', request.url))
}

import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'change-me-in-production-32-chars!!'
)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('session')?.value

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
    try {
      await jwtVerify(token, SECRET)
      return NextResponse.next()
    } catch {
      const res = NextResponse.redirect(new URL('/auth/login', req.url))
      res.cookies.delete('session')
      return res
    }
  }

  if (pathname.startsWith('/auth')) {
    if (token) {
      try {
        await jwtVerify(token, SECRET)
        return NextResponse.redirect(new URL('/dashboard', req.url))
      } catch {
        return NextResponse.next()
      }
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}

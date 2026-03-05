'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError]     = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setPending(true)

    const fd = new FormData(e.currentTarget)
    const email    = fd.get('email')    as string
    const password = fd.get('password') as string

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <style suppressHydrationWarning>{`
        .auth-root { min-height:100vh; background:#0c0d0f; display:flex; align-items:center; justify-content:center; padding:2rem 1rem; position:relative; overflow:hidden; font-family:'Sora',-apple-system,sans-serif; }
        .auth-glow { position:fixed; top:-100px; left:50%; transform:translateX(-50%); width:700px; height:500px; pointer-events:none; background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(34,197,94,0.1) 0%,transparent 70%); }
        .auth-card { width:100%; max-width:440px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:20px; padding:2.5rem; position:relative; z-index:1; box-shadow:0 0 60px rgba(0,0,0,0.5); }
        .auth-logo { display:flex; align-items:center; gap:0.5rem; font-size:1.1rem; font-weight:800; color:#f0f2f5; text-decoration:none; letter-spacing:-0.03em; margin-bottom:2rem; }
        .auth-logo span { color:#22c55e; }
        .auth-title { font-size:1.6rem; font-weight:800; color:#f0f2f5; letter-spacing:-0.03em; margin-bottom:0.4rem; }
        .auth-sub { font-size:0.875rem; color:rgba(240,242,245,0.45); margin-bottom:2rem; }
        .field-group { margin-bottom:1.1rem; }
        .field-label { display:block; font-size:0.78rem; font-weight:600; color:rgba(240,242,245,0.55); letter-spacing:0.04em; text-transform:uppercase; margin-bottom:0.4rem; }
        .field-input { width:100%; padding:0.7rem 0.9rem; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); border-radius:10px; color:#f0f2f5; font-size:0.9rem; font-family:inherit; outline:none; transition:border-color 0.2s,box-shadow 0.2s; box-sizing:border-box; }
        .field-input::placeholder { color:rgba(240,242,245,0.2); }
        .field-input:focus { border-color:rgba(34,197,94,0.5); box-shadow:0 0 0 3px rgba(34,197,94,0.08); background:rgba(255,255,255,0.06); }
        .error-box { background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); border-radius:10px; padding:0.75rem 1rem; font-size:0.85rem; color:#fca5a5; margin-bottom:1.25rem; }
        .btn-submit { width:100%; padding:0.8rem; background:#22c55e; color:#0c0d0f; font-size:0.9rem; font-weight:700; border:none; border-radius:12px; cursor:pointer; font-family:inherit; transition:background 0.2s,box-shadow 0.2s,transform 0.15s; margin-top:0.5rem; }
        .btn-submit:hover:not(:disabled) { background:#4ade80; box-shadow:0 0 24px rgba(34,197,94,0.4); transform:translateY(-1px); }
        .btn-submit:disabled { opacity:0.6; cursor:not-allowed; }
        .auth-footer { text-align:center; margin-top:1.5rem; font-size:0.85rem; color:rgba(240,242,245,0.4); }
        .auth-footer a { color:#22c55e; text-decoration:none; font-weight:600; }
      `}</style>

      <div className="auth-root">
        <div className="auth-glow" />
        <div className="auth-card">
          <Link href="/" className="auth-logo">
            <svg width="20" height="20" viewBox="0 0 512 512" fill="none">
              <path d="M148 370 L256 130 L364 370" stroke="#22c55e" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="188" y1="280" x2="324" y2="280" stroke="#22c55e" strokeWidth="48" strokeLinecap="round"/>
              <circle cx="256" cy="130" r="34" fill="#22c55e"/>
            </svg>
            Admit<span>Flow</span>
          </Link>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Log in to continue tracking your applications.</p>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <input type="email" name="email" className="field-input" placeholder="rahim@example.com" required />
            </div>
            <div className="field-group">
              <label className="field-label">Password</label>
              <input type="password" name="password" className="field-input" placeholder="Your password" required />
            </div>
            <button type="submit" className="btn-submit" disabled={pending}>
              {pending ? 'Logging in…' : 'Log in →'}
            </button>
          </form>

          <div className="auth-footer">
            No account yet? <Link href="/auth/signup">Create one free</Link>
          </div>
        </div>
      </div>
    </>
  )
}

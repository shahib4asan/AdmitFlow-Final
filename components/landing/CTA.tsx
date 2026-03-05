'use client'

import { useEffect, useRef, useState } from 'react'

const PLACEHOLDER_EMAIL = 'shahibhasan@gmail.com'
const TYPING_SPEED = 60   // ms per char
const ERASE_SPEED  = 30
const PAUSE_AFTER  = 2200 // ms pause when fully typed

export default function CTA() {
  const [inputVal, setInputVal]       = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [status, setStatus]           = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  // ── Typing animation for placeholder ────────────────────────────────
  useEffect(() => {
    let idx   = 0
    let phase: 'typing' | 'pause' | 'erasing' = 'typing'
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (phase === 'typing') {
        idx++
        setPlaceholder(PLACEHOLDER_EMAIL.slice(0, idx))
        if (idx === PLACEHOLDER_EMAIL.length) {
          phase = 'pause'
          timer = setTimeout(tick, PAUSE_AFTER)
        } else {
          timer = setTimeout(tick, TYPING_SPEED)
        }
      } else if (phase === 'pause') {
        phase = 'erasing'
        timer = setTimeout(tick, ERASE_SPEED)
      } else {
        idx--
        setPlaceholder(PLACEHOLDER_EMAIL.slice(0, idx))
        if (idx === 0) {
          phase = 'typing'
          timer = setTimeout(tick, TYPING_SPEED * 4)
        } else {
          timer = setTimeout(tick, ERASE_SPEED)
        }
      }
    }

    timer = setTimeout(tick, 900)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim() || status === 'loading') return
    setStatus('loading')
    // Simulate API call — replace with real endpoint
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
  }

  return (
    <div style={{ padding: '100px 32px', textAlign: 'center' }}>
      <style suppressHydrationWarning>{`
        .af-cta-box{max-width:640px;margin:0 auto;padding:64px 48px;background:radial-gradient(ellipse 80% 60% at 50% 120%,rgba(34,197,94,0.13) 0%,transparent 70%),#111316;border-radius:20px;border:1px solid rgba(34,197,94,0.18);box-shadow:0 0 0 1px rgba(34,197,94,0.05),0 40px 80px rgba(0,0,0,0.3)}
        
        /* Email input row */
        .af-ea-form{display:flex;gap:8px;width:100%;max-width:420px;margin:0 auto}
        .af-ea-input{flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.13);border-radius:10px;padding:12px 16px;font-size:14px;color:#f0f2f5;outline:none;transition:border-color 0.15s,box-shadow 0.15s;min-width:0}
        .af-ea-input::placeholder{color:#4b5563}
        .af-ea-input:focus{border-color:rgba(34,197,94,0.5);box-shadow:0 0 0 3px rgba(34,197,94,0.1)}
        .af-ea-btn{background:#22c55e;color:#071a0e;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:700;border:none;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;transition:background 0.12s,box-shadow 0.12s,transform 0.1s;flex-shrink:0}
        .af-ea-btn:hover:not(:disabled){background:#4ade80;box-shadow:0 0 24px rgba(34,197,94,0.45);transform:translateY(-1px)}
        .af-ea-btn:disabled{opacity:0.6;cursor:not-allowed}

        /* Spinner */
        @keyframes af-spin{to{transform:rotate(360deg)}}
        .af-spinner{width:14px;height:14px;border:2px solid rgba(7,26,14,0.3);border-top-color:#071a0e;border-radius:50%;animation:af-spin 0.7s linear infinite}

        /* Success state */
        @keyframes af-pop{0%{transform:scale(0.8);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
        .af-ea-success{animation:af-pop 0.45s cubic-bezier(0.22,1,0.36,1) forwards}

        /* Subtle badge */
        .af-ea-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);border-radius:99px;padding:4px 12px;font-size:12px;font-weight:600;color:#4ade80;margin-bottom:20px;letter-spacing:0.3px}

        @media(max-width:500px){.af-ea-form{flex-direction:column}.af-ea-btn{width:100%;justify-content:center}}
      `}</style>

      <div className="af-cta-box">
        <div className="af-ea-badge">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
          Early Access — Limited Spots
        </div>

        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', color: '#fff', marginBottom: '14px' }}>
          Start tracking today.<br />Get in tomorrow.
        </h2>
        <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '32px' }}>
          Join the waitlist and get free lifetime access when we launch. No credit card required.
        </p>

        {status === 'success' ? (
          <div className="af-ea-success" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>✓</div>
            <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '16px' }}>You're on the list! 🎉</p>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>We'll email you the moment we launch.</p>
          </div>
        ) : (
          <form className="af-ea-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className="af-ea-input"
              type="email"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder={placeholder}
              required
              disabled={status === 'loading'}
            />
            <button className="af-ea-btn" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <><div className="af-spinner" /> Joining…</>
              ) : (
                <>Get early access →</>
              )}
            </button>
          </form>
        )}

        <p style={{ marginTop: '14px', fontSize: '12px', color: '#4b5563' }}>
          🔒 No spam. Unsubscribe any time.
        </p>
      </div>
    </div>
  )
}

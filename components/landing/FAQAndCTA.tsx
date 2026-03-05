'use client'
import { useEffect, useRef, useState } from 'react'

const FAQ_DATA = [
  { q: 'Is AdmitFlow only for Bangladeshi students?',   a: 'AdmitFlow is designed with Bangladeshi students in mind — local pricing, Bengali-friendly UX, and focus on programs popular in Bangladesh. But anyone applying abroad can use it!' },
  { q: 'Can I track multiple countries?',               a: 'Yes! You can add universities from any country — USA, Canada, Germany, Australia, Singapore, UK, and more. No limits on countries.' },
  { q: 'What happens if I miss the free plan limit?',   a: "On the free plan, you can track up to 3 universities. Once you hit the limit, you'll be prompted to upgrade to Premium for unlimited entries." },
  { q: 'Will I actually receive deadline reminders?',   a: "Yes! Premium users get automated email reminders 7 days and 2 days before each university's deadline." },
  { q: 'Is my data safe?',                              a: 'Your data is encrypted and stored securely in Neon (Postgres). Only you can access your own information.' },
]

const PLACEHOLDER_EMAIL = 'shahibhasan@gmail.com'

export default function FAQAndCTA() {
  const [open, setOpen] = useState<number | null>(null)
  const [inputVal, setInputVal] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let idx = 0, phase: 'typing'|'pause'|'erasing' = 'typing'
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (phase === 'typing') { idx++; setPlaceholder(PLACEHOLDER_EMAIL.slice(0,idx)); if (idx === PLACEHOLDER_EMAIL.length) { phase='pause'; timer=setTimeout(tick,2200) } else timer=setTimeout(tick,60) }
      else if (phase === 'pause') { phase='erasing'; timer=setTimeout(tick,30) }
      else { idx--; setPlaceholder(PLACEHOLDER_EMAIL.slice(0,idx)); if (idx===0){phase='typing';timer=setTimeout(tick,240)}else timer=setTimeout(tick,30) }
    }
    timer = setTimeout(tick, 900)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim() || status==='loading') return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
  }

  return (
    <section style={{ padding: '100px 32px', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,600;0,9..40,800;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        .fq-bg-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .fq-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; opacity: 0.13; }

        .fq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; max-width: 1160px; margin: 0 auto; align-items: start; position: relative; }
        @media(max-width:860px){ .fq-grid { grid-template-columns: 1fr; gap: 64px; } }

        /* FAQ */
        .fq-item { border-bottom: 1px solid rgba(255,255,255,0.07); transition: border-color 0.2s; }
        .fq-item.open { border-color: rgba(34,197,94,0.25); }
        .fq-trigger { display: flex; justify-content: space-between; align-items: center; padding: 18px 0; cursor: pointer; gap: 16px; user-select: none; }
        .fq-q { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; color: #d1d5db; flex: 1; transition: color 0.2s; }
        .fq-item.open .fq-q { color: #22c55e; }
        .fq-icon {
          width: 24px; height: 24px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #6b7280; font-size: 15px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s, color 0.2s;
        }
        .fq-item.open .fq-icon { background: rgba(34,197,94,0.12); border-color: rgba(34,197,94,0.35); color: #22c55e; transform: rotate(45deg); }
        .fq-body { font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: '#4b5563'; line-height: 1.75; overflow: hidden; transition: max-height 0.25s ease, padding-bottom 0.25s ease; color: #6b7280; font-weight: 300; }

        /* CTA box */
        .fq-cta-box {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 20px; padding: 36px 32px;
          position: sticky; top: 100px;
          backdrop-filter: blur(8px);
          overflow: hidden;
        }
        .fq-cta-box::before {
          content: '';
          position: absolute; top: 0; left: 15%; right: 15%; height: 2px;
          background: linear-gradient(90deg, transparent, #22c55e, transparent);
          border-radius: 0 0 4px 4px;
        }

        .fq-ea-input {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 12px 16px; font-size: 13.5px; color: #f0f2f5;
          outline: none; width: 100%; box-sizing: border-box;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .fq-ea-input::placeholder { color: #374151; }
        .fq-ea-input:focus { border-color: rgba(34,197,94,0.45); box-shadow: 0 0 0 3px rgba(34,197,94,0.08); }

        .fq-ea-btn {
          width: 100%; padding: 12px; border-radius: 10px; font-size: 13.5px; font-weight: 700;
          border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          background: #22c55e; color: #071a0e;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
        }
        .fq-ea-btn:hover:not(:disabled) { background: #4ade80; box-shadow: 0 0 24px rgba(34,197,94,0.4); transform: translateY(-1px); }
        .fq-ea-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        @keyframes fq-spin { to { transform: rotate(360deg); } }
        .fq-spinner { width: 14px; height: 14px; border: 2px solid rgba(7,26,14,0.3); border-top-color: #071a0e; border-radius: 50%; animation: fq-spin 0.7s linear infinite; }

        @keyframes fq-pop { 0%{transform:scale(0.8);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1} }
        .fq-success { animation: fq-pop 0.45s cubic-bezier(0.22,1,0.36,1) forwards; }

        @keyframes fq-dot-pulse { 0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.6} }
        .fq-dot-pulse { animation: fq-dot-pulse 2s ease-in-out infinite; }
      `}</style>

      <div className="fq-orb" style={{ width: 500, height: 500, top: '20%', left: '-120px', background: '#22c55e' }} />
      <div className="fq-orb" style={{ width: 400, height: 400, bottom: '10%', right: '-80px', background: '#a78bfa' }} />

      <div className="fq-grid">

        {/* FAQ */}
        <div id="faq">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
            <span style={{ fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#22c55e', fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>FAQ</span>
          </div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#f0f2f5', marginBottom: '32px', lineHeight: 1.05 }}>
            Common<br />
            <span style={{ background: 'linear-gradient(90deg, #4ade80, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>questions.</span>
          </h2>

          {FAQ_DATA.map((item, i) => (
            <div key={i} className={`fq-item${open === i ? ' open' : ''}`}>
              <div className="fq-trigger" onClick={() => setOpen(open === i ? null : i)}>
                <span className="fq-q">{item.q}</span>
                <span className="fq-icon">+</span>
              </div>
              <div className="fq-body" style={{ maxHeight: open === i ? '200px' : '0', paddingBottom: open === i ? '18px' : '0' }}>
                {item.a}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div>
          <div className="fq-cta-box">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '99px', padding: '4px 14px', fontSize: '11.5px', fontFamily: "'DM Mono', monospace", color: '#4ade80', marginBottom: 20, letterSpacing: '0.5px' }}>
              <div className="fq-dot-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
              Early Access — Limited Spots
            </div>

            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(22px, 2.5vw, 34px)', fontWeight: 800, letterSpacing: '-1px', color: '#f0f2f5', marginBottom: '10px', lineHeight: 1.1 }}>
              Start tracking today.<br />
              <span style={{ background: 'linear-gradient(90deg, #4ade80, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Get in tomorrow.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13.5px', color: '#4b5563', marginBottom: '28px', lineHeight: 1.7, fontWeight: 300 }}>
              Join the waitlist and get free lifetime access when we launch. No credit card required.
            </p>

            {status === 'success' ? (
              <div className="fq-success" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '16px 0' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4ade80', fontWeight: 700, fontSize: '15px' }}>You're on the list! 🎉</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4b5563', fontSize: '13px' }}>We'll email you the moment we launch.</p>
              </div>
            ) : (
              <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }} onSubmit={handleSubmit}>
                <input className="fq-ea-input" type="email" value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder={placeholder} required disabled={status==='loading'} />
                <button className="fq-ea-btn" type="submit" disabled={status==='loading'}>
                  {status==='loading' ? <><div className="fq-spinner" /> Joining…</> : <>Get early access →</>}
                </button>
              </form>
            )}

            <p style={{ marginTop: 14, fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#374151', textAlign: 'center', letterSpacing: '0.5px' }}>
              🔒 No spam. Unsubscribe any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'

const FAQ_DATA = [
  { q: 'Is AdmitFlow only for Bangladeshi students?',   a: 'AdmitFlow is designed with Bangladeshi students in mind — local pricing, Bengali-friendly UX, and focus on programs popular in Bangladesh. But anyone applying abroad can use it!' },
  { q: 'Can I track multiple countries?',               a: 'Yes! You can add universities from any country — USA, Canada, Germany, Australia, Singapore, UK, and more. No limits on countries.' },
  { q: 'What happens if I miss the free plan limit?',   a: "On the free plan, you can track up to 3 universities. Once you hit the limit, you'll be prompted to upgrade to Premium for unlimited entries." },
  { q: 'Will I actually receive deadline reminders?',   a: "Yes! Premium users get automated email reminders 7 days and 2 days before each university's deadline." },
  { q: 'Is my data safe?',                              a: 'Your data is encrypted and stored securely in Neon (Postgres). Only you can access your own information.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" style={{ padding: '100px 32px', maxWidth: '1120px', margin: '0 auto' }}>
      <style suppressHydrationWarning>{`
        .af-faq-item{border-bottom:1px solid rgba(255,255,255,0.07);transition:border-color 0.12s ease}
        .af-faq-item.af-open{border-color:rgba(34,197,94,0.2)}
        .af-faq-trigger{display:flex;justify-content:space-between;align-items:center;padding:20px 0;cursor:pointer;font-size:15px;font-weight:600;transition:color 0.12s ease;user-select:none;gap:16px}
        .af-faq-trigger:hover .af-faq-q{color:#e5e7eb}
        .af-faq-q{transition:color 0.12s ease;flex:1}
        .af-faq-icon{width:22px;height:22px;border-radius:50%;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;line-height:1;transition:background 0.12s ease,border-color 0.12s ease,transform 0.15s ease,color 0.12s ease;color:#6b7280}
        .af-faq-item.af-open .af-faq-icon{background:rgba(34,197,94,0.12);border-color:rgba(34,197,94,0.3);color:#22c55e;transform:rotate(45deg)}
        .af-faq-body{font-size:14px;color:#9ca3af;line-height:1.75;overflow:hidden;transition:max-height 0.22s ease,padding-bottom 0.22s ease}
      `}</style>

      <div style={{ display: 'inline-flex', fontSize: '12px', fontWeight: 600, color: '#22c55e', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>FAQ</div>
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, letterSpacing: '-1px', color: '#fff', marginBottom: '40px' }}>Common questions.</h2>

      <div style={{ maxWidth: '680px' }}>
        {FAQ_DATA.map((item, i) => (
          <div key={i} className={`af-faq-item${open === i ? ' af-open' : ''}`}>
            <div className="af-faq-trigger" onClick={() => setOpen(open === i ? null : i)}>
              <span className="af-faq-q" style={{ color: open === i ? '#22c55e' : '#fff' }}>{item.q}</span>
              <span className="af-faq-icon">+</span>
            </div>
            <div className="af-faq-body" style={{ maxHeight: open === i ? '200px' : '0', paddingBottom: open === i ? '20px' : '0' }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

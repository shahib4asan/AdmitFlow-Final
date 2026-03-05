'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const PLANS = [
  {
    id: 'free', label: 'Free', price: '0', period: 'forever',
    desc: 'Perfect to get started. No credit card required.',
    cta: 'Get started free', color: '#6b7280', accentColor: '#9ca3af', badge: null,
    features: [
      { t: 'Up to 3 universities',        ok: true  },
      { t: 'Deadline tracker',             ok: true  },
      { t: 'Document checklist',           ok: true  },
      { t: 'Basic readiness score',        ok: true  },
      { t: 'File uploads',                 ok: false },
      { t: 'Email reminders',              ok: false },
      { t: 'Fund calculator',              ok: false },
      { t: 'AI SOP assistant',             ok: false },
      { t: 'Scholarship tracker',          ok: false },
      { t: 'Priority support',             ok: false },
    ],
  },
  {
    id: 'plus', label: 'Plus', price: '500', period: '/mo',
    desc: 'For serious applicants tracking multiple universities.',
    cta: 'Start Plus →', color: '#38bdf8', accentColor: '#38bdf8', badge: '⚡ Most Popular',
    features: [
      { t: 'Up to 10 universities',        ok: true  },
      { t: 'Deadline tracker',             ok: true  },
      { t: 'Document checklist + uploads', ok: true  },
      { t: 'Full readiness score',         ok: true  },
      { t: '7 & 2-day email reminders',    ok: true  },
      { t: 'Fund calculator (BDT)',        ok: true  },
      { t: 'Exam tracker (IELTS + GRE)',   ok: true  },
      { t: 'AI SOP assistant',             ok: false },
      { t: 'Scholarship tracker',          ok: false },
      { t: 'Priority support',             ok: false },
    ],
  },
  {
    id: 'pro', label: 'Pro', price: '1,050', period: '/mo',
    desc: 'Everything you need to get into your dream program.',
    cta: 'Start Pro →', color: '#22c55e', accentColor: '#22c55e', badge: '🔥 Early Bird',
    features: [
      { t: 'Unlimited universities',       ok: true  },
      { t: 'Deadline tracker',             ok: true  },
      { t: 'Document checklist + uploads', ok: true  },
      { t: 'Full readiness score',         ok: true  },
      { t: '7 & 2-day email reminders',    ok: true  },
      { t: 'Fund calculator (BDT)',        ok: true  },
      { t: 'Exam tracker (IELTS + GRE)',   ok: true  },
      { t: 'AI SOP assistant',             ok: true  },
      { t: 'Scholarship tracker',          ok: true  },
      { t: 'Priority support',             ok: true  },
    ],
  },
]

const METHODS = [
  {
    id: 'bkash', name: 'bKash', tag: 'MOBILE BANKING',
    color: '#E2136E', bg: 'rgba(226,19,110,0.1)', border: 'rgba(226,19,110,0.3)',
    pill: { bg: '#E2136E', text: '#fff', label: 'bK' },
  },
  {
    id: 'nagad', name: 'Nagad', tag: 'MOBILE BANKING',
    color: '#F4821F', bg: 'rgba(244,130,31,0.1)', border: 'rgba(244,130,31,0.3)',
    pill: { bg: '#F4821F', text: '#fff', label: 'NG' },
  },
  {
    id: 'rocket', name: 'Rocket', tag: 'MOBILE BANKING',
    color: '#8B3EC8', bg: 'rgba(139,62,200,0.1)', border: 'rgba(139,62,200,0.3)',
    pill: { bg: '#8B3EC8', text: '#fff', label: 'RKT' },
  },
  {
    id: 'upay', name: 'Upay', tag: 'MOBILE BANKING',
    color: '#00A859', bg: 'rgba(0,168,89,0.1)', border: 'rgba(0,168,89,0.3)',
    pill: { bg: '#00A859', text: '#fff', label: 'U' },
  },
  {
    id: 'card', name: 'Debit / Credit Card', tag: 'VISA · MASTERCARD · AMEX',
    color: '#38bdf8', bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.3)',
    pill: { bg: '#0369a1', text: '#fff', label: '💳' },
  },
  {
    id: 'netbanking', name: 'Net Banking', tag: 'INTERNET BANKING',
    color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)',
    pill: { bg: '#5b21b6', text: '#fff', label: '🏦' },
  },
]

const BD_BANKS = [
  'Dutch-Bangla Bank', 'BRAC Bank', 'Islami Bank Bangladesh', 'City Bank',
  'Eastern Bank', 'Southeast Bank', 'Mutual Trust Bank', 'Prime Bank',
  'Sonali Bank', 'Janata Bank', 'AB Bank', 'Mercantile Bank', 'Standard Bank',
]

type Plan   = typeof PLANS[0]
type Method = typeof METHODS[0]
type Step   = 'pick' | 'details' | 'confirm' | 'success'

// ─────────────────────────────────────────────────────────────────────────────
// PAYMENT MODAL
// ─────────────────────────────────────────────────────────────────────────────

function PaymentModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const [step, setStep]         = useState<Step>('pick')
  const [method, setMethod]     = useState<Method | null>(null)
  // mobile
  const [phone, setPhone]       = useState('')
  // card
  const [cardNo, setCardNo]     = useState('')
  const [cardExp, setCardExp]   = useState('')
  const [cardCvv, setCardCvv]   = useState('')
  const [cardName, setCardName] = useState('')
  // bank
  const [bank, setBank]         = useState('')
  const [accNo, setAccNo]       = useState('')
  // ui
  const [loading, setLoading]   = useState(false)
  const [txnRef]                = useState(() => 'AF' + Math.random().toString(36).slice(2, 9).toUpperCase())

  const isMobile = ['bkash', 'nagad', 'rocket', 'upay'].includes(method?.id ?? '')
  const isCard   = method?.id === 'card'
  const isBank   = method?.id === 'netbanking'

  const canContinue = isMobile
    ? phone.replace(/\D/g, '').length >= 10
    : isCard
      ? cardNo.replace(/\s/g, '').length === 16 && cardExp.length === 5 && cardCvv.length >= 3 && cardName.trim().length > 1
      : bank !== '' && accNo.replace(/\D/g, '').length >= 6

  async function pay() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
    setStep('success')
  }

  const STEP_ORDER: Step[] = ['pick', 'details', 'confirm']
  const stepIdx = STEP_ORDER.indexOf(step)

  // ── helpers ──────────────────────────────────────────────────────────────
  function fmtCard(raw: string) {
    return raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }
  function fmtExp(raw: string) {
    const d = raw.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d
  }
  const maskedCard = cardNo.replace(/\s/g, '').slice(-4)

  // ── styles shared ─────────────────────────────────────────────────────────
  const inputBase: React.CSSProperties = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12, color: '#f0f2f5', fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color .2s, box-shadow .2s',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      {/* Scrim */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }} />

      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700;9..40,800&family=DM+Mono:wght@400;500&display=swap');
        .pm-input::placeholder { color: #4b5563; }
        .pm-input:focus { border-color: rgba(255,255,255,0.25) !important; box-shadow: 0 0 0 3px rgba(255,255,255,0.05); }
        .pm-input.good:focus { border-color: rgba(74,222,128,0.5) !important; box-shadow: 0 0 0 3px rgba(74,222,128,0.08); }
        .pm-input.good { border-color: rgba(74,222,128,0.4) !important; }
        .pm-method { width:100%; display:flex; align-items:center; gap:14px; padding:14px 18px; border-radius:14px; cursor:pointer; text-align:left; transition:transform .15s, box-shadow .15s; }
        .pm-method:hover { transform: translateY(-2px); }
        .pm-back { display:inline-flex; align-items:center; gap:6px; padding:8px 14px; border-radius:10px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#9ca3af; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; font-weight:500; transition:color .15s; }
        .pm-back:hover { color:#f0f2f5; }
        .pm-label { display:block; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#4b5563; margin-bottom:8px; }
        @keyframes pm-spin { to { transform:rotate(360deg) } }
        @keyframes pm-pop  { 0%{transform:scale(.65);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes pm-rise { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .pm-rise { animation: pm-rise .25s cubic-bezier(.22,1,.36,1) both; }
        select.pm-input option { background:#111316; color:#f0f2f5; }
      `}</style>

      {/* Modal card */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 480,
        background: '#0c0e11',
        border: `1px solid ${plan.color}44`,
        borderRadius: 24, overflow: 'hidden',
        boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 80px ${plan.color}22, 0 48px 80px rgba(0,0,0,0.8)`,
        fontFamily: "'DM Sans', sans-serif",
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        {/* Top glow line */}
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 2, background: `linear-gradient(90deg,transparent,${plan.color},transparent)` }} />

        {/* ── Header ─────────────────────────────────────────── */}
        <div style={{ padding: '24px 26px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 18, height: 1, background: plan.color, opacity: 0.8 }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9.5, letterSpacing: '2.5px', textTransform: 'uppercase', color: plan.color }}>Secure Checkout</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px', color: '#f0f2f5' }}>
              AdmitFlow <span style={{ color: plan.color }}>{plan.label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 5 }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: '#4b5563' }}>৳</span>
              <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px', color: '#e8eaf0' }}>{plan.price}</span>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#4b5563' }}>{plan.period}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f0f2f5'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* ── Step bar ───────────────────────────────────────── */}
        {step !== 'success' && (
          <div style={{ display: 'flex', gap: 6, padding: '14px 26px 0' }}>
            {STEP_ORDER.map((s, i) => (
              <div key={s} style={{
                flex: 1, height: 3, borderRadius: 99,
                background: i <= stepIdx ? plan.color : 'rgba(255,255,255,0.07)',
                boxShadow: i === stepIdx ? `0 0 8px ${plan.color}99` : 'none',
                transition: 'background .35s',
              }} />
            ))}
          </div>
        )}

        <div style={{ padding: '22px 26px 28px' }}>

          {/* ══════════════════════════════════════════════════ */}
          {/* STEP 1 — Pick method                              */}
          {/* ══════════════════════════════════════════════════ */}
          {step === 'pick' && (
            <div className="pm-rise">
              <span className="pm-label" style={{ marginBottom: 14 }}>Select payment method</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {METHODS.map(m => (
                  <button key={m.id} className="pm-method"
                    style={{ background: m.bg, border: `1px solid ${m.border}` }}
                    onClick={() => { setMethod(m); setStep('details') }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = `0 6px 24px ${m.color}22`}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                    {/* Logo badge */}
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: m.pill.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: m.pill.label.length === 1 ? 22 : 11, fontWeight: 700, color: m.pill.text, fontFamily: m.pill.label.length > 2 ? "'DM Mono',monospace" : 'inherit', letterSpacing: m.pill.label.length > 2 ? '0.5px' : undefined, boxShadow: `0 2px 12px ${m.color}44` }}>
                      {m.pill.label}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#e8eaf0' }}>{m.name}</div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9.5, color: m.color, letterSpacing: '1.5px', marginTop: 2 }}>{m.tag}</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════ */}
          {/* STEP 2 — Enter details                            */}
          {/* ══════════════════════════════════════════════════ */}
          {step === 'details' && method && (
            <div className="pm-rise">
              {/* Back row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <button className="pm-back" onClick={() => { setStep('pick'); setPhone(''); setCardNo(''); setCardExp(''); setCardCvv(''); setCardName(''); setBank(''); setAccNo('') }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                  Back
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: method.pill.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: method.pill.label.length === 1 ? 20 : 11, fontWeight: 700, color: method.pill.text, fontFamily: method.pill.label.length > 2 ? "'DM Mono',monospace" : 'inherit', letterSpacing: method.pill.label.length > 2 ? '0.5px' : undefined }}>
                    {method.pill.label}
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#e8eaf0' }}>{method.name}</span>
                </div>
              </div>

              {/* ── Mobile banking ── */}
              {isMobile && (
                <>
                  <label className="pm-label">{method.name} account number</label>
                  <input className={`pm-input${phone.replace(/\D/g,'').length >= 10 ? ' good' : ''}`}
                    style={{ ...inputBase, fontFamily: "'DM Mono',monospace", fontSize: 16, letterSpacing: '1.5px', marginBottom: 14 }}
                    type="tel" placeholder="01XXXXXXXXX" value={phone}
                    onChange={e => setPhone(e.target.value.slice(0, 14))} />
                  <div style={{ padding: '13px 16px', background: `${method.color}0e`, border: `1px solid ${method.color}22`, borderRadius: 12, marginBottom: 20 }}>
                    <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>
                      After clicking <strong style={{ color: method.color }}>Pay</strong>, open your <strong style={{ color: '#e8eaf0' }}>{method.name}</strong> app and approve the payment request sent to this number.
                    </div>
                  </div>
                </>
              )}

              {/* ── Card ── */}
              {isCard && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 20 }}>
                  <div>
                    <label className="pm-label">Card number</label>
                    <input className={`pm-input${cardNo.replace(/\s/g,'').length === 16 ? ' good' : ''}`}
                      style={{ ...inputBase, fontFamily: "'DM Mono',monospace", letterSpacing: '3px' }}
                      type="text" placeholder="1234  5678  9012  3456" value={cardNo}
                      onChange={e => setCardNo(fmtCard(e.target.value))} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label className="pm-label">Expiry</label>
                      <input className={`pm-input${cardExp.length === 5 ? ' good' : ''}`}
                        style={{ ...inputBase, fontFamily: "'DM Mono',monospace", letterSpacing: '2px' }}
                        type="text" placeholder="MM/YY" maxLength={5} value={cardExp}
                        onChange={e => setCardExp(fmtExp(e.target.value))} />
                    </div>
                    <div>
                      <label className="pm-label">CVV</label>
                      <input className={`pm-input${cardCvv.length >= 3 ? ' good' : ''}`}
                        style={{ ...inputBase, fontFamily: "'DM Mono',monospace", letterSpacing: '4px' }}
                        type="password" placeholder="•••" maxLength={4} value={cardCvv}
                        onChange={e => setCardCvv(e.target.value.replace(/\D/g,'').slice(0,4))} />
                    </div>
                  </div>
                  <div>
                    <label className="pm-label">Name on card</label>
                    <input className={`pm-input${cardName.trim().length > 1 ? ' good' : ''}`}
                      style={{ ...inputBase }}
                      type="text" placeholder="Rahim Uddin" value={cardName}
                      onChange={e => setCardName(e.target.value)} />
                  </div>
                </div>
              )}

              {/* ── Net banking ── */}
              {isBank && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                  <div>
                    <label className="pm-label">Select your bank</label>
                    <select className={`pm-input${bank ? ' good' : ''}`}
                      style={{ ...inputBase, cursor: 'pointer', color: bank ? '#f0f2f5' : '#4b5563' }}
                      value={bank} onChange={e => setBank(e.target.value)}>
                      <option value="">Choose bank…</option>
                      {BD_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="pm-label">Account / customer ID</label>
                    <input className={`pm-input${accNo.replace(/\D/g,'').length >= 6 ? ' good' : ''}`}
                      style={{ ...inputBase, fontFamily: "'DM Mono',monospace", letterSpacing: '1px' }}
                      type="text" placeholder="Your account number" value={accNo}
                      onChange={e => setAccNo(e.target.value)} />
                  </div>
                  <div style={{ padding: '13px 16px', background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.18)', borderRadius: 12 }}>
                    <div style={{ fontSize: 12.5, color: '#6b7280', lineHeight: 1.7 }}>
                      You will be redirected to your bank's secure portal to authorise the payment.
                    </div>
                  </div>
                </div>
              )}

              {/* Continue button */}
              <button disabled={!canContinue} onClick={() => setStep('confirm')}
                style={{
                  width: '100%', padding: '13px', borderRadius: 12, border: 'none',
                  background: canContinue ? `linear-gradient(135deg,${method.color}cc,${method.color})` : 'rgba(255,255,255,0.06)',
                  color: canContinue ? (method.id === 'nagad' ? '#111' : '#fff') : '#374151',
                  fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
                  cursor: canContinue ? 'pointer' : 'not-allowed',
                  transition: 'filter .15s, transform .12s, box-shadow .15s',
                  boxShadow: canContinue ? `0 4px 20px ${method.color}33` : 'none',
                }}
                onMouseEnter={e => { if(canContinue){ e.currentTarget.style.filter='brightness(1.08)'; e.currentTarget.style.transform='translateY(-1px)' }}}
                onMouseLeave={e => { e.currentTarget.style.filter=''; e.currentTarget.style.transform='' }}>
                Review payment →
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════════════ */}
          {/* STEP 3 — Confirm                                  */}
          {/* ══════════════════════════════════════════════════ */}
          {step === 'confirm' && method && (
            <div className="pm-rise">
              <button className="pm-back" style={{ marginBottom: 20 }} onClick={() => setStep('details')}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                Edit details
              </button>

              {/* Summary card */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '20px 22px', marginBottom: 18 }}>
                <span className="pm-label" style={{ marginBottom: 14 }}>Payment summary</span>

                {/* Rows */}
                {([
                  ['Plan',    `AdmitFlow ${plan.label}`],
                  ['Billing', plan.period === 'forever' ? 'Free forever' : `Monthly · ৳${plan.price}`],
                  ['Method',  method.name],
                  ...(isMobile
                    ? [['Number', phone]]
                    : isCard
                      ? [['Card', `•••• •••• •••• ${maskedCard}`], ['Name', cardName]]
                      : [['Bank', bank], ['Account', `••••${accNo.slice(-4)}`]]),
                ] as [string, string][]).map(([k, v], i, arr) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                    <span style={{ fontSize: 13, color: '#4b5563' }}>{k}</span>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: '#d1d5db' }}>{v}</span>
                  </div>
                ))}

                {/* Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTop: `1px solid ${plan.color}33` }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#e8eaf0' }}>Total due</span>
                  <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', color: plan.color }}>৳{plan.price}</span>
                </div>
              </div>

              {/* Pay button */}
              <button onClick={pay} disabled={loading}
                style={{
                  width: '100%', padding: '14px', borderRadius: 12, border: 'none', marginBottom: 10,
                  background: loading ? 'rgba(255,255,255,0.06)' : `linear-gradient(135deg,${plan.color}cc,${plan.color})`,
                  color: loading ? '#6b7280' : (plan.id === 'plus' ? '#fff' : '#071a0e'),
                  fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: loading ? 'none' : `0 4px 28px ${plan.color}44`,
                  transition: 'filter .15s, transform .12s, box-shadow .15s',
                }}
                onMouseEnter={e => { if(!loading){ e.currentTarget.style.filter='brightness(1.08)'; e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow=`0 10px 36px ${plan.color}55` }}}
                onMouseLeave={e => { e.currentTarget.style.filter=''; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=loading?'none':`0 4px 28px ${plan.color}44` }}>
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'pm-spin .7s linear infinite' }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Processing payment…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    Pay ৳{plan.price} now
                  </>
                )}
              </button>

              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: '#374151', textAlign: 'center', letterSpacing: '0.5px', lineHeight: 1.8, margin: 0 }}>
                🔒 256-bit SSL encrypted · No card data stored<br/>
                <span style={{ color: '#1e2730' }}>TXN REF: {txnRef}</span>
              </p>
            </div>
          )}

          {/* ══════════════════════════════════════════════════ */}
          {/* STEP 4 — Success                                  */}
          {/* ══════════════════════════════════════════════════ */}
          {step === 'success' && (
            <div className="pm-rise" style={{ textAlign: 'center', padding: '10px 0 4px' }}>
              {/* Animated check */}
              <div style={{ width: 84, height: 84, borderRadius: '50%', background: `${plan.color}18`, border: `2px solid ${plan.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px', animation: 'pm-pop .55s cubic-bezier(.22,1,.36,1)', boxShadow: `0 0 48px ${plan.color}44` }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>

              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', color: '#f0f2f5', marginBottom: 8 }}>Payment Successful! 🎉</div>
              <div style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.8, marginBottom: 8, fontWeight: 300 }}>
                Welcome to <strong style={{ color: plan.color, fontWeight: 700 }}>AdmitFlow {plan.label}</strong>.<br/>Your account has been upgraded instantly.
              </div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#374151', marginBottom: 28, letterSpacing: '0.5px' }}>
                Receipt ref: {txnRef}
              </div>

              <Link href="/dashboard" onClick={onClose} style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '13px 32px', borderRadius: 12,
                background: plan.color, color: plan.id === 'plus' ? '#fff' : '#071a0e',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                boxShadow: `0 4px 24px ${plan.color}55`,
                transition: 'filter .15s, transform .12s',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter='brightness(1.1)'; e.currentTarget.style.transform='translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.filter=''; e.currentTarget.style.transform='' }}>
                Go to Dashboard →
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PRICING SECTION
// ─────────────────────────────────────────────────────────────────────────────

export default function Pricing() {
  const [activePlan, setActivePlan] = useState<Plan | null>(null)

  return (
    <>
      {activePlan && <PaymentModal plan={activePlan} onClose={() => setActivePlan(null)} />}

      <div id="pricing" style={{ padding: '100px 32px', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
        <style suppressHydrationWarning>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,600;9..40,800&family=DM+Mono:wght@400;500&display=swap');
          .pr-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; opacity: 0.12; }
          .pr-card {
            background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.07);
            border-radius: 20px; padding: 32px 28px; position: relative; overflow: hidden;
            transition: border-color .25s, background .25s, transform .25s, box-shadow .25s;
            backdrop-filter: blur(8px);
          }
          .pr-card:hover { transform: translateY(-6px); background: rgba(255,255,255,0.055); }
          .pr-card::after { content:''; position:absolute; inset:0; border-radius:20px; background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.05) 50%,transparent 65%); opacity:0; transition:opacity .25s; }
          .pr-card:hover::after { opacity:1; }
          .pr-top-line { position:absolute; top:0; left:15%; right:15%; height:2px; border-radius:0 0 4px 4px; }
          .pr-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; align-items:start; }
          @media(max-width:860px){ .pr-grid { grid-template-columns:1fr; } }
          .pr-feat-row { display:flex; align-items:center; gap:10px; padding:6px 0; font-family:'DM Sans',sans-serif; font-size:13px; }
          .pr-btn { display:block; width:100%; padding:13px; border-radius:10px; font-size:14px; font-weight:700; text-align:center; text-decoration:none; box-sizing:border-box; margin-bottom:24px; transition:filter .15s, box-shadow .15s, transform .12s; font-family:'DM Sans',sans-serif; cursor:pointer; border:none; }
          .pr-btn:hover { filter:brightness(1.1); transform:translateY(-2px); }
          .pr-btn-ghost { background:transparent !important; border:1px solid rgba(255,255,255,0.12) !important; color:#9ca3af !important; }
          .pr-btn-ghost:hover { border-color:rgba(255,255,255,0.24) !important; color:#d1d5db !important; }
          @keyframes pr-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:.6} }
          .pr-dot-pulse { animation:pr-pulse 2s ease-in-out infinite; }
          hr.pr-divider { border:none; border-top:1px solid rgba(255,255,255,0.07); margin-bottom:20px; }
        `}</style>

        <div className="pr-orb" style={{ width: 500, height: 500, top: -200, left: -100, background: '#38bdf8' }} />
        <div className="pr-orb" style={{ width: 400, height: 400, bottom: -100, right: -80, background: '#22c55e' }} />

        <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative' }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
            <span style={{ fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#22c55e', fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>Pricing</span>
          </div>

          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#f0f2f5', lineHeight: 1.05, marginBottom: 10 }}>
            Bangladesh-friendly<br />
            <span style={{ background: 'linear-gradient(90deg, #38bdf8, #4ade80, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>pricing.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#4b5563', marginBottom: 52, fontStyle: 'italic', fontWeight: 300 }}>
            Start free. Upgrade when you're ready. Pay with bKash, Nagad, Rocket, Upay, card, or bank transfer.
          </p>

          {/* Plan cards */}
          <div className="pr-grid">
            {PLANS.map(plan => (
              <div key={plan.id} className="pr-card" style={{
                borderColor: plan.id !== 'free' ? `${plan.color}44` : 'rgba(255,255,255,0.07)',
                boxShadow:   plan.id !== 'free' ? `0 0 40px ${plan.color}12` : 'none',
              }}>
                <div className="pr-top-line" style={{ background: plan.id !== 'free' ? `linear-gradient(90deg,transparent,${plan.color},transparent)` : 'transparent' }} />

                {plan.badge && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${plan.color}18`, border: `1px solid ${plan.color}44`, color: plan.color, borderRadius: 99, padding: '4px 12px', fontSize: 11, fontFamily: "'DM Mono',monospace", fontWeight: 500, letterSpacing: '0.5px', marginBottom: 16 }}>
                    {plan.badge}
                  </div>
                )}

                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: plan.accentColor, marginBottom: 14, fontWeight: 500 }}>{plan.label}</div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 17, fontWeight: 500, color: '#9ca3af' }}>৳</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 48, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-2px' }}>{plan.price}</span>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#6b7280' }}>{plan.period}</span>
                </div>

                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#4b5563', marginBottom: 24, lineHeight: 1.65, fontWeight: 300 }}>{plan.desc}</p>

                {/* ── CTA buttons ── */}
                {plan.id === 'free' ? (
                  <Link href="/auth/signup" className="pr-btn pr-btn-ghost">{plan.cta}</Link>
                ) : (
                  <button className="pr-btn" onClick={() => setActivePlan(plan)}
                    style={plan.id === 'plus'
                      ? { background: 'linear-gradient(135deg,#0ea5e9,#38bdf8)', color: '#fff', boxShadow: `0 4px 20px ${plan.color}33` }
                      : { background: '#22c55e', color: '#071a0e', boxShadow: '0 4px 20px rgba(34,197,94,0.3)' }
                    }>{plan.cta}</button>
                )}

                <hr className="pr-divider" />

                {plan.features.map((f, i) => (
                  <div key={i} className="pr-feat-row">
                    <span style={{ color: f.ok ? plan.accentColor : '#374151', fontSize: 13, flexShrink: 0, width: 16 }}>
                      {f.ok
                        ? <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="currentColor" opacity=".15"/><path d="M4 7 L6.2 9.2 L10 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : '—'}
                    </span>
                    <span style={{ color: f.ok ? '#9ca3af' : '#374151', fontWeight: f.ok ? 400 : 300 }}>{f.t}</span>
                  </div>
                ))}

                <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: 2, borderRadius: '2px 2px 0 0', background: plan.color, opacity: 0.4 }} />
              </div>
            ))}
          </div>

          {/* Accepted payments strip */}
          <div style={{ marginTop: 24, padding: '15px 22px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9.5, color: '#374151', letterSpacing: '2px', textTransform: 'uppercase', flexShrink: 0 }}>We accept</span>
            {[
              { name: 'bKash',  color: '#E2136E' },
              { name: 'Nagad',  color: '#F4821F' },
              { name: 'Rocket', color: '#8B3EC8' },
              { name: 'Upay',   color: '#00A859' },
              { name: 'Card',   color: '#38bdf8' },
              { name: 'Bank',   color: '#a78bfa' },
            ].map(m => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 99, background: `${m.color}11`, border: `1px solid ${m.color}2e` }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: m.color }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10.5, color: m.color, letterSpacing: '0.5px', fontWeight: 500 }}>{m.name}</span>
              </div>
            ))}
          </div>

          {/* Footer strip */}
          <div style={{ marginTop: 14, background: 'linear-gradient(135deg,rgba(34,197,94,0.06),rgba(56,189,248,0.04))', border: '1px solid rgba(34,197,94,0.18)', borderRadius: 16, padding: '22px 32px', display: 'flex', alignItems: 'center', gap: 18, backdropFilter: 'blur(6px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg,#22c55e,#38bdf8)', borderRadius: '16px 0 0 16px' }} />
            <div className="pr-dot-pulse" style={{ width: 9, height: 9, borderRadius: '50%', background: '#22c55e', flexShrink: 0, marginLeft: 8 }} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
              <strong style={{ color: '#e8eaf0', fontWeight: 700 }}>All prices in BDT.</strong> Plans can be cancelled anytime. Early bird pricing is limited.
            </div>
            <div style={{ marginLeft: 'auto', flexShrink: 0, fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#22c55e', letterSpacing: '2px', opacity: 0.7 }}>3 PLANS</div>
          </div>

        </div>
      </div>
    </>
  )
}

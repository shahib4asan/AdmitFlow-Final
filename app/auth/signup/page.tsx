'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const COUNTRIES = [
  'Bangladesh','USA','Canada','UK','Australia','Germany','Netherlands',
  'Sweden','Denmark','Norway','Finland','Japan','South Korea','Singapore',
  'New Zealand','Ireland','France','Switzerland','Austria','Belgium',
]

const EXAM_FIELDS = [
  { key:'ielts_score',  label:'IELTS',  placeholder:'7.5',  min:'0',   max:'9',    step:'0.5' },
  { key:'toefl_score',  label:'TOEFL',  placeholder:'100',  min:'0',   max:'120',  step:'1'   },
  { key:'sat_score',    label:'SAT',    placeholder:'1450', min:'400', max:'1600', step:'10'  },
  { key:'gre_score',    label:'GRE',    placeholder:'320',  min:'260', max:'340',  step:'1'   },
]

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep]       = useState<1|2>(1)
  const [error, setError]     = useState('')
  const [pending, setPending] = useState(false)
  const [formData, setFormData] = useState({
    name:'', email:'', password:'', phone:'', country:'',
    target_universities:'', ielts_score:'', toefl_score:'', sat_score:'', gre_score:'',
  })

  const set = (k: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
      setFormData(prev => ({ ...prev, [k]: e.target.value }))

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password) return
    if (formData.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setError('')
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setPending(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
        .auth-card { width:100%; max-width:520px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:20px; padding:2.5rem; position:relative; z-index:1; box-shadow:0 0 60px rgba(0,0,0,0.5); }
        .auth-logo { display:flex; align-items:center; gap:0.5rem; font-size:1.1rem; font-weight:800; color:#f0f2f5; text-decoration:none; letter-spacing:-0.03em; margin-bottom:2rem; }
        .auth-logo span { color:#22c55e; }
        .auth-title { font-size:1.6rem; font-weight:800; color:#f0f2f5; letter-spacing:-0.03em; margin-bottom:0.4rem; }
        .auth-sub { font-size:0.875rem; color:rgba(240,242,245,0.45); margin-bottom:2rem; }
        .step-indicator { display:flex; gap:0.5rem; margin-bottom:2rem; }
        .step-dot { height:3px; border-radius:99px; transition:all 0.3s; flex:1; }
        .step-dot.active { background:#22c55e; }
        .step-dot.inactive { background:rgba(255,255,255,0.1); }
        .field-group { margin-bottom:1.1rem; }
        .field-row { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:1.1rem; }
        .field-label { display:block; font-size:0.78rem; font-weight:600; color:rgba(240,242,245,0.55); letter-spacing:0.04em; text-transform:uppercase; margin-bottom:0.4rem; }
        .field-input { width:100%; padding:0.7rem 0.9rem; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); border-radius:10px; color:#f0f2f5; font-size:0.9rem; font-family:inherit; outline:none; transition:border-color 0.2s,box-shadow 0.2s; box-sizing:border-box; -webkit-appearance:none; }
        .field-input::placeholder { color:rgba(240,242,245,0.2); }
        .field-input:focus { border-color:rgba(34,197,94,0.5); box-shadow:0 0 0 3px rgba(34,197,94,0.08); background:rgba(255,255,255,0.06); }
        select.field-input option { background:#1a1c1f; color:#f0f2f5; }
        textarea.field-input { resize:none; min-height:72px; line-height:1.5; }
        .exam-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; }
        .section-title { font-size:0.78rem; font-weight:700; letter-spacing:0.05em; text-transform:uppercase; color:rgba(34,197,94,0.7); margin-bottom:0.75rem; margin-top:1.5rem; display:flex; align-items:center; gap:0.5rem; }
        .section-title::after { content:''; flex:1; height:1px; background:rgba(34,197,94,0.15); }
        .error-box { background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); border-radius:10px; padding:0.75rem 1rem; font-size:0.85rem; color:#fca5a5; margin-bottom:1.25rem; }
        .btn-submit { width:100%; padding:0.8rem; background:#22c55e; color:#0c0d0f; font-size:0.9rem; font-weight:700; border:none; border-radius:12px; cursor:pointer; font-family:inherit; transition:background 0.2s,box-shadow 0.2s,transform 0.15s; margin-top:0.5rem; }
        .btn-submit:hover:not(:disabled) { background:#4ade80; box-shadow:0 0 24px rgba(34,197,94,0.4); transform:translateY(-1px); }
        .btn-submit:disabled { opacity:0.6; cursor:not-allowed; }
        .btn-next { width:100%; padding:0.8rem; background:#22c55e; color:#0c0d0f; font-size:0.9rem; font-weight:700; border:none; border-radius:12px; cursor:pointer; font-family:inherit; transition:background 0.2s,box-shadow 0.2s,transform 0.15s; margin-top:0.5rem; }
        .btn-next:hover { background:#4ade80; box-shadow:0 0 24px rgba(34,197,94,0.4); transform:translateY(-1px); }
        .btn-back { width:100%; padding:0.75rem; background:transparent; color:rgba(240,242,245,0.5); font-size:0.875rem; font-weight:500; border:1px solid rgba(255,255,255,0.08); border-radius:12px; cursor:pointer; font-family:inherit; transition:color 0.2s,border-color 0.2s; margin-top:0.5rem; }
        .btn-back:hover { color:#f0f2f5; border-color:rgba(255,255,255,0.2); }
        .auth-footer { text-align:center; margin-top:1.5rem; font-size:0.85rem; color:rgba(240,242,245,0.4); }
        .auth-footer a { color:#22c55e; text-decoration:none; font-weight:600; }
        .optional-tag { font-size:0.7rem; color:rgba(240,242,245,0.3); font-weight:400; margin-left:0.3rem; text-transform:none; letter-spacing:0; }
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

          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? 'active' : 'inactive'}`} />
            <div className={`step-dot ${step >= 2 ? 'active' : 'inactive'}`} />
          </div>

          <h1 className="auth-title">{step === 1 ? 'Create your account' : 'Your academic profile'}</h1>
          <p className="auth-sub">{step === 1 ? 'Start tracking your applications today.' : 'Help us personalise your experience. All fields optional.'}</p>

          {error && <div className="error-box">{error}</div>}

          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={handleStep1}>
              <div className="field-group">
                <label className="field-label">Full Name</label>
                <input type="text" className="field-input" placeholder="Rahim Uddin"
                  value={formData.name} onChange={set('name')} required autoFocus />
              </div>
              <div className="field-group">
                <label className="field-label">Email Address</label>
                <input type="email" className="field-input" placeholder="rahim@example.com"
                  value={formData.email} onChange={set('email')} required />
              </div>
              <div className="field-group">
                <label className="field-label">Password</label>
                <input type="password" className="field-input" placeholder="At least 8 characters"
                  value={formData.password} onChange={set('password')} required minLength={8} />
              </div>
              <button type="submit" className="btn-next">Continue →</button>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div className="section-title">Location & Target Schools</div>
              <div className="field-row">
                <div>
                  <label className="field-label">Country</label>
                  <select className="field-input" value={formData.country} onChange={set('country')}>
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label">Phone <span className="optional-tag">optional</span></label>
                  <input type="tel" className="field-input" placeholder="+880 1xxx xxxxxx"
                    value={formData.phone} onChange={set('phone')} />
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">Target Universities <span className="optional-tag">comma-separated</span></label>
                <textarea className="field-input" placeholder="MIT, University of Toronto, TU Berlin..."
                  value={formData.target_universities} onChange={set('target_universities')} />
              </div>
              <div className="section-title">Exam Scores <span className="optional-tag" style={{textTransform:'none',letterSpacing:0,fontSize:'0.7rem',color:'rgba(240,242,245,0.3)'}}>all optional</span></div>
              <div className="exam-grid">
                {EXAM_FIELDS.map(f => (
                  <div key={f.key}>
                    <label className="field-label">{f.label}</label>
                    <input type="number" className="field-input"
                      placeholder={f.placeholder} min={f.min} max={f.max} step={f.step}
                      value={formData[f.key as keyof typeof formData]}
                      onChange={set(f.key as keyof typeof formData)} />
                  </div>
                ))}
              </div>
              <button type="submit" className="btn-submit" disabled={pending}>
                {pending ? 'Creating account…' : 'Create account →'}
              </button>
              <button type="button" className="btn-back" onClick={() => setStep(1)}>← Back</button>
            </form>
          )}

          <div className="auth-footer">
            Already have an account? <Link href="/auth/login">Log in</Link>
          </div>
        </div>
      </div>
    </>
  )
}

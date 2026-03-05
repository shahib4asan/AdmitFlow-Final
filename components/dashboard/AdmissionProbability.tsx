'use client'

import { useState, useMemo } from 'react'

interface Profile {
  cgpa: string
  ielts: string
  workExp: string
  publications: string
}

interface UniversityTarget {
  id: string
  name: string
  reqCgpa: string
  reqIelts: string
  category: string
}

type Band = 'Safe' | 'Moderate' | 'Ambitious'

const BAND_META: Record<Band, { color: string; bg: string; border: string; icon: string; desc: string }> = {
  Safe:      { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.25)',   icon: '✅', desc: 'Your profile comfortably meets requirements.' },
  Moderate:  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', icon: '🎯', desc: 'Good chance with a strong SOP and LORs.' },
  Ambitious: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)',   icon: '🔥', desc: 'A stretch — but possible with an exceptional application.' },
}

function calcBand(profile: Profile, target: UniversityTarget): Band {
  const cgpa = parseFloat(profile.cgpa) || 0
  const ielts = parseFloat(profile.ielts) || 0
  const work = parseInt(profile.workExp) || 0
  const pubs = parseInt(profile.publications) || 0
  const reqCgpa = parseFloat(target.reqCgpa) || 3.0
  const reqIelts = parseFloat(target.reqIelts) || 6.5

  let score = 0
  // CGPA scoring
  if (cgpa >= reqCgpa + 0.3) score += 3
  else if (cgpa >= reqCgpa) score += 2
  else if (cgpa >= reqCgpa - 0.3) score += 1
  // IELTS scoring
  if (ielts >= reqIelts + 0.5) score += 2
  else if (ielts >= reqIelts) score += 2
  else if (ielts >= reqIelts - 0.5) score += 1
  // Bonus factors
  if (work >= 2) score += 1
  if (pubs >= 1) score += 1

  if (score >= 6) return 'Safe'
  if (score >= 3) return 'Moderate'
  return 'Ambitious'
}

const EMPTY_TARGET = (): UniversityTarget => ({
  id: Date.now().toString(),
  name: '', reqCgpa: '3.0', reqIelts: '6.5', category: ''
})

export default function AdmissionProbability() {
  const [profile, setProfile] = useState<Profile>({ cgpa: '', ielts: '', workExp: '', publications: '' })
  const [targets, setTargets] = useState<UniversityTarget[]>([EMPTY_TARGET()])

  const results = useMemo(() =>
    targets.map(t => ({ ...t, band: profile.cgpa && profile.ielts ? calcBand(profile, t) : null as Band | null })),
    [profile, targets]
  )

  const updateProfile = (k: keyof Profile, v: string) => setProfile(p => ({ ...p, [k]: v }))
  const updateTarget = (id: string, k: keyof UniversityTarget, v: string) =>
    setTargets(prev => prev.map(t => t.id === id ? { ...t, [k]: v } : t))
  const addTarget = () => setTargets(prev => [...prev, EMPTY_TARGET()])
  const removeTarget = (id: string) => targets.length > 1 && setTargets(prev => prev.filter(t => t.id !== id))

  return (
    <div style={{ background: '#111316', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px 24px', maxWidth: '600px' }}>
      <style suppressHydrationWarning>{`
        .ap-input{background:#0d0f12;border:1px solid rgba(255,255,255,0.1);color:#f0f2f5;padding:7px 11px;borderRadius:8px;fontSize:13px;outline:none;width:100%;boxSizing:border-box;transition:border-color .15s}
        .ap-input:focus{border-color:rgba(34,197,94,0.4)}
        .ap-label{fontSize:12px;color:#6b7280;marginBottom:4px;display:block}
      `}</style>

      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Admission Probability</div>
      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '20px', fontWeight: 800, color: '#f0f2f5', marginBottom: '20px' }}>
        Know your chances before applying
      </div>

      {/* Profile inputs */}
      <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>Your Profile</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {([
            { key: 'cgpa',         label: 'CGPA (out of 4.0)',     placeholder: '3.6' },
            { key: 'ielts',        label: 'IELTS Overall',          placeholder: '7.0' },
            { key: 'workExp',      label: 'Work Experience (yrs)',  placeholder: '2' },
            { key: 'publications', label: 'Publications',           placeholder: '0' },
          ] as { key: keyof Profile; label: string; placeholder: string }[]).map(f => (
            <div key={f.key}>
              <label className="ap-label">{f.label}</label>
              <input className="ap-input" placeholder={f.placeholder} value={profile[f.key]}
                onChange={e => updateProfile(f.key, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      {/* University targets */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', letterSpacing: '1px', textTransform: 'uppercase' }}>Target Universities</div>
        <button onClick={addTarget} style={{ fontSize: '12px', fontWeight: 600, color: '#22c55e', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {results.map(t => {
          const meta = t.band ? BAND_META[t.band] : null
          return (
            <div key={t.id} style={{ background: '#0d0f12', border: `1px solid ${meta ? meta.border : 'rgba(255,255,255,0.07)'}`, borderRadius: '12px', padding: '14px 16px', transition: 'border-color .3s' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                <input className="ap-input" placeholder="University name" value={t.name} onChange={e => updateTarget(t.id, 'name', e.target.value)} style={{ flex: 2 }} />
                <button onClick={() => removeTarget(t.id)} style={{ background: 'none', border: 'none', color: '#374151', cursor: 'pointer', fontSize: '14px', flexShrink: 0, paddingTop: '6px' }}>✕</button>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label className="ap-label">Min CGPA Required</label>
                  <input className="ap-input" placeholder="3.0" value={t.reqCgpa} onChange={e => updateTarget(t.id, 'reqCgpa', e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="ap-label">Min IELTS Required</label>
                  <input className="ap-input" placeholder="6.5" value={t.reqIelts} onChange={e => updateTarget(t.id, 'reqIelts', e.target.value)} />
                </div>
                {meta && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2px', flexShrink: 0 }}>
                    <div style={{ padding: '6px 14px', borderRadius: '99px', background: meta.bg, border: `1px solid ${meta.border}`, fontSize: '13px', fontWeight: 700, color: meta.color, whiteSpace: 'nowrap' }}>
                      {meta.icon} {t.band}
                    </div>
                  </div>
                )}
              </div>
              {meta && (
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>{meta.desc}</div>
              )}
            </div>
          )
        })}
      </div>

      {!profile.cgpa && (
        <div style={{ marginTop: '16px', fontSize: '12.5px', color: '#374151', textAlign: 'center' }}>
          Enter your profile above to see probability bands.
        </div>
      )}
    </div>
  )
}

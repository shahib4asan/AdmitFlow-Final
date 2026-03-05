'use client'

import { useState } from 'react'

interface University {
  id: string
  name: string
  country: string
  tuition: string
  ielts: string
  deadline: string
  acceptance: string
  scholarship: boolean
  living: string
  notes: string
}

const EMPTY_UNI = (): University => ({
  id: Date.now().toString(),
  name: '', country: '', tuition: '', ielts: '',
  deadline: '', acceptance: '', scholarship: false,
  living: '', notes: ''
})

const FIELDS: { key: keyof University; label: string; icon: string }[] = [
  { key: 'country',     label: 'Country',        icon: '🌍' },
  { key: 'tuition',     label: 'Tuition/yr',     icon: '💵' },
  { key: 'ielts',       label: 'IELTS Min',      icon: '🧪' },
  { key: 'deadline',    label: 'Deadline',        icon: '📅' },
  { key: 'acceptance',  label: 'Acceptance Rate', icon: '📊' },
  { key: 'scholarship', label: 'Scholarship',     icon: '🎓' },
  { key: 'living',      label: 'Living Cost/yr',  icon: '🏠' },
  { key: 'notes',       label: 'Notes',           icon: '📝' },
]

export default function UniversityComparison() {
  const [unis, setUnis] = useState<University[]>([EMPTY_UNI(), EMPTY_UNI()])

  const update = (id: string, field: keyof University, value: string | boolean) => {
    setUnis(prev => prev.map(u => u.id === id ? { ...u, [field]: value } : u))
  }

  const addUni = () => {
    if (unis.length < 4) setUnis(prev => [...prev, EMPTY_UNI()])
  }

  const removeUni = (id: string) => {
    if (unis.length > 2) setUnis(prev => prev.filter(u => u.id !== id))
  }

  const colWidth = unis.length === 2 ? '50%' : unis.length === 3 ? '33.3%' : '25%'

  return (
    <div style={{ background: '#111316', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px 24px', overflowX: 'auto' }}>
      <style suppressHydrationWarning>{`
        .uc-input{background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,0.1);color:#f0f2f5;padding:4px 0;fontSize:13px;outline:none;width:100%;transition:border-color .15s}
        .uc-input:focus{border-bottom-color:rgba(34,197,94,0.5)}
        .uc-input::placeholder{color:#374151}
        .uc-cell{padding:10px 12px;borderBottom:1px solid rgba(255,255,255,0.05);verticalAlign:top}
        .uc-header-cell{padding:14px 12px;verticalAlign:top}
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>University Comparison</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '20px', fontWeight: 800, color: '#f0f2f5' }}>Compare side by side</div>
        </div>
        {unis.length < 4 && (
          <button onClick={addUni} style={{ padding: '7px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.22)', color: '#22c55e', cursor: 'pointer' }}>
            + Add University
          </button>
        )}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: '480px' }}>
        <thead>
          <tr>
            <td style={{ width: '110px', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)' }} />
            {unis.map(u => (
              <td key={u.id} className="uc-header-cell" style={{ width: colWidth, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#4b5563', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>University</span>
                  {unis.length > 2 && (
                    <button onClick={() => removeUni(u.id)} style={{ background: 'none', border: 'none', color: '#374151', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                  )}
                </div>
                <input className="uc-input" placeholder="University name…" value={u.name}
                  onChange={e => update(u.id, 'name', e.target.value)}
                  style={{ fontSize: '14px', fontWeight: 700, color: '#f0f2f5' }} />
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {FIELDS.map(f => (
            <tr key={f.key}>
              <td className="uc-cell" style={{ fontSize: '12.5px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                <span style={{ marginRight: '6px' }}>{f.icon}</span>{f.label}
              </td>
              {unis.map(u => (
                <td key={u.id} className="uc-cell">
                  {f.key === 'scholarship' ? (
                    <button onClick={() => update(u.id, 'scholarship', !u.scholarship)} style={{
                      padding: '4px 12px', borderRadius: '99px', fontSize: '12px', cursor: 'pointer',
                      background: u.scholarship ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${u.scholarship ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
                      color: u.scholarship ? '#22c55e' : '#6b7280'
                    }}>
                      {u.scholarship ? 'Yes ✓' : 'No'}
                    </button>
                  ) : (
                    <input className="uc-input"
                      placeholder={f.key === 'deadline' ? 'YYYY-MM-DD' : f.key === 'ielts' ? '6.5' : f.key === 'acceptance' ? '15%' : '—'}
                      value={u[f.key] as string}
                      onChange={e => update(u.id, f.key, e.target.value)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '16px', fontSize: '12px', color: '#374151', textAlign: 'right' }}>
        📥 Export as PDF — coming soon
      </div>
    </div>
  )
}

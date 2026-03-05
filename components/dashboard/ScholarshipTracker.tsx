'use client'

import { useState } from 'react'

type ScholarshipStatus = 'Not Applied' | 'Applying' | 'Submitted' | 'Awarded' | 'Rejected'

interface Scholarship {
  id: string
  name: string
  amount: string
  deadline: string
  requirements: string
  status: ScholarshipStatus
}

const STATUS_STYLES: Record<ScholarshipStatus, { color: string; bg: string; border: string }> = {
  'Not Applied': { color: '#6b7280', bg: 'rgba(107,114,128,0.08)', border: 'rgba(107,114,128,0.2)' },
  'Applying':    { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)' },
  'Submitted':   { color: '#38bdf8', bg: 'rgba(56,189,248,0.08)',  border: 'rgba(56,189,248,0.2)' },
  'Awarded':     { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)'  },
  'Rejected':    { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)'  },
}

const STATUSES: ScholarshipStatus[] = ['Not Applied', 'Applying', 'Submitted', 'Awarded', 'Rejected']

const INITIAL: Scholarship[] = [
  { id: '1', name: 'Commonwealth Scholarship',  amount: '£12,000/yr', deadline: '2025-10-15', requirements: 'CGPA 3.5+, 2 years work exp', status: 'Not Applied' },
  { id: '2', name: 'Chevening Scholarship',     amount: 'Full Funding', deadline: '2025-11-05', requirements: 'Leadership potential, IELTS 6.5', status: 'Applying' },
  { id: '3', name: 'DAAD Scholarship',          amount: '€861/month', deadline: '2025-09-30', requirements: 'Strong academic record', status: 'Submitted' },
]

function daysUntil(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000)
}

export default function ScholarshipTracker() {
  const [items, setItems] = useState<Scholarship[]>(INITIAL)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', amount: '', deadline: '', requirements: '' })

  const updateStatus = (id: string, status: ScholarshipStatus) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i))
  }

  const addScholarship = () => {
    if (!form.name) return
    setItems(prev => [...prev, { ...form, id: Date.now().toString(), status: 'Not Applied' }])
    setForm({ name: '', amount: '', deadline: '', requirements: '' })
    setShowForm(false)
  }

  const totalAwarded = items.filter(i => i.status === 'Awarded').length
  const urgent = items.filter(i => {
    const d = daysUntil(i.deadline)
    return d >= 0 && d <= 14 && i.status !== 'Submitted' && i.status !== 'Awarded' && i.status !== 'Rejected'
  })

  return (
    <div style={{ background: '#111316', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px 24px', maxWidth: '640px' }}>
      <style suppressHydrationWarning>{`
        .st-input{background:#0d0f12;border:1px solid rgba(255,255,255,0.1);color:#f0f2f5;padding:8px 12px;borderRadius:8px;fontSize:13px;outline:none;width:100%;boxSizing:border-box}
        .st-input:focus{border-color:rgba(34,197,94,0.4)}
        .st-select{background:#0d0f12;border:1px solid rgba(255,255,255,0.1);color:#f0f2f5;padding:4px 8px;borderRadius:6px;fontSize:12px;outline:none;cursor:pointer}
      `}</style>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Scholarship Tracker</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '20px', fontWeight: 800, color: '#f0f2f5' }}>
            {items.length} scholarships · {totalAwarded} awarded
          </div>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
          background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)',
          color: '#22c55e', cursor: 'pointer', flexShrink: 0
        }}>
          + Add
        </button>
      </div>

      {/* Urgent alert */}
      {urgent.length > 0 && (
        <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', fontSize: '13px', color: '#fca5a5' }}>
          🚨 {urgent.length} scholarship{urgent.length > 1 ? 's' : ''} deadline within 14 days!
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input className="st-input" placeholder="Scholarship name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <input className="st-input" placeholder="Amount (e.g. $5,000/yr)" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} />
            <input className="st-input" type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} style={{ width: '160px', flexShrink: 0 }} />
          </div>
          <input className="st-input" placeholder="Requirements" value={form.requirements} onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))} />
          <button onClick={addScholarship} style={{ padding: '8px', borderRadius: '8px', background: '#22c55e', border: 'none', color: '#000', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
            Add Scholarship
          </button>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map(item => {
          const days = daysUntil(item.deadline)
          const style = STATUS_STYLES[item.status]
          return (
            <div key={item.id} style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '6px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f2f5', marginBottom: '2px' }}>{item.name}</div>
                  <div style={{ fontSize: '12.5px', color: '#6b7280' }}>{item.amount} · {item.requirements}</div>
                </div>
                <select className="st-select" value={item.status} onChange={e => updateStatus(item.id, e.target.value as ScholarshipStatus)}
                  style={{ color: style.color, background: style.bg, borderColor: style.border }}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {item.deadline && (
                <div style={{ fontSize: '12px', color: days < 0 ? '#4b5563' : days <= 7 ? '#ef4444' : days <= 14 ? '#f59e0b' : '#6b7280' }}>
                  📅 {item.deadline} {days >= 0 ? `· ${days} days left` : '· Passed'}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

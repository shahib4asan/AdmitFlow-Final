'use client'

import { useMemo, useState } from 'react'

type Intake = 'Fall' | 'Spring' | 'Summer'
type Year = 2025 | 2026 | 2027

interface Milestone {
  month: number   // 0-indexed offset from start
  label: string
  icon: string
  category: 'exam' | 'docs' | 'apply' | 'visa'
}

const MILESTONES: Milestone[] = [
  { month: 0,  label: 'IELTS / GRE Prep',        icon: '📚', category: 'exam'  },
  { month: 2,  label: 'Take IELTS',               icon: '🧪', category: 'exam'  },
  { month: 3,  label: 'Shortlist Universities',   icon: '🔎', category: 'apply' },
  { month: 4,  label: 'Draft SOP',                icon: '✍️', category: 'docs'  },
  { month: 5,  label: 'Collect LORs',             icon: '📬', category: 'docs'  },
  { month: 6,  label: 'Submit Applications',      icon: '📤', category: 'apply' },
  { month: 7,  label: 'Pay Application Fees',     icon: '💳', category: 'apply' },
  { month: 8,  label: 'Wait for Decisions',       icon: '⏳', category: 'apply' },
  { month: 9,  label: 'Accept Offer / I-20',      icon: '✅', category: 'apply' },
  { month: 10, label: 'Prepare Financial Docs',   icon: '🏦', category: 'visa'  },
  { month: 11, label: 'Visa Interview',            icon: '🛂', category: 'visa'  },
  { month: 12, label: '✈️ Fly Out',               icon: '🌍', category: 'visa'  },
]

const CATEGORY_COLORS: Record<string, string> = {
  exam:  '#818cf8',
  docs:  '#f59e0b',
  apply: '#22c55e',
  visa:  '#38bdf8',
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function getStartMonth(intake: Intake, year: Year): Date {
  const deadlineMap: Record<Intake, number> = { Fall: 5, Spring: 10, Summer: 1 }
  // start 12 months before approximate deadline
  const deadline = new Date(year, deadlineMap[intake], 1)
  return new Date(deadline.getFullYear(), deadline.getMonth() - 12, 1)
}

export default function IntakeRoadmap() {
  const [intake, setIntake] = useState<Intake>('Fall')
  const [year, setYear] = useState<Year>(2026)
  const [done, setDone] = useState<Set<number>>(new Set())

  const startDate = useMemo(() => getStartMonth(intake, year), [intake, year])

  const milestones = useMemo(() =>
    MILESTONES.map(m => {
      const d = new Date(startDate.getFullYear(), startDate.getMonth() + m.month, 1)
      return { ...m, date: d, monthLabel: `${MONTHS[d.getMonth()]} ${d.getFullYear()}` }
    }),
    [startDate]
  )

  const today = new Date()
  const completedCount = done.size
  const totalCount = MILESTONES.length

  const toggle = (idx: number) => {
    setDone(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  return (
    <div style={{ background: '#111316', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px 24px', maxWidth: '680px' }}>
      <style suppressHydrationWarning>{`
        .ir-select{background:#0d0f12;border:1px solid rgba(255,255,255,0.1);color:#f0f2f5;padding:6px 12px;borderRadius:8px;font-size:13px;outline:none;cursor:pointer}
        .ir-milestone{display:flex;align-items:flex-start;gap:14px;padding:10px 0;cursor:pointer;border-radius:8px;transition:background .15s}
        .ir-milestone:hover{background:rgba(255,255,255,0.03)}
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Intake Roadmap Planner</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '20px', fontWeight: 800, color: '#f0f2f5' }}>
            {intake} {year} — {completedCount}/{totalCount} done
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <select className="ir-select" value={intake} onChange={e => setIntake(e.target.value as Intake)}>
            {(['Fall','Spring','Summer'] as Intake[]).map(i => <option key={i}>{i}</option>)}
          </select>
          <select className="ir-select" value={year} onChange={e => setYear(Number(e.target.value) as Year)}>
            {([2025,2026,2027] as Year[]).map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', marginBottom: '24px' }}>
        <div style={{ height: '100%', width: `${(completedCount / totalCount) * 100}%`, background: '#22c55e', borderRadius: '99px', transition: 'width .4s ease' }} />
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: '22px', top: '8px', bottom: '8px', width: '1px', background: 'rgba(255,255,255,0.07)' }} />

        {milestones.map((m, i) => {
          const isPast = m.date < today
          const isDone = done.has(i)
          const color = CATEGORY_COLORS[m.category]
          return (
            <div key={i} className="ir-milestone" onClick={() => toggle(i)} style={{ padding: '10px 8px' }}>
              {/* Dot */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0, zIndex: 1,
                background: isDone ? 'rgba(34,197,94,0.15)' : isPast ? 'rgba(255,255,255,0.04)' : '#0d0f12',
                border: `2px solid ${isDone ? '#22c55e' : isPast ? 'rgba(255,255,255,0.12)' : color + '40'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', transition: 'all .2s'
              }}>
                {isDone ? '✓' : m.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: isDone ? '#6b7280' : '#f0f2f5', textDecoration: isDone ? 'line-through' : 'none' }}>{m.label}</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: color, background: color + '12', border: `1px solid ${color}30`, padding: '1px 7px', borderRadius: '99px' }}>{m.category}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#4b5563' }}>{m.monthLabel}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: '16px', fontSize: '12px', color: '#374151', textAlign: 'center' }}>
        Click any milestone to mark it done
      </div>
    </div>
  )
}

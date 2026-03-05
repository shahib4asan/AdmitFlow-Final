'use client'

import { useMemo } from 'react'

interface ReadinessField {
  label: string
  done: boolean
  weight: number
}

interface ReadinessScoreProps {
  fields?: ReadinessField[]
}

const DEFAULT_FIELDS: ReadinessField[] = [
  { label: 'At least one university added', done: false, weight: 10 },
  { label: 'SOP drafted',                   done: false, weight: 20 },
  { label: 'CV uploaded',                   done: false, weight: 15 },
  { label: 'IELTS score entered',            done: false, weight: 15 },
  { label: 'Transcripts checked off',        done: false, weight: 15 },
  { label: 'LOR status tracked',             done: false, weight: 15 },
  { label: 'Application fee recorded',       done: false, weight: 10 },
]

export default function ReadinessScore({ fields = DEFAULT_FIELDS }: ReadinessScoreProps) {
  const score = useMemo(
    () => fields.filter(f => f.done).reduce((sum, f) => sum + f.weight, 0),
    [fields]
  )

  const color =
    score >= 80 ? '#22c55e'
    : score >= 50 ? '#f59e0b'
    : '#ef4444'

  const label =
    score >= 80 ? 'Almost Ready 🎉'
    : score >= 50 ? 'In Progress'
    : 'Just Getting Started'

  const circumference = 2 * Math.PI * 44
  const offset = circumference - (score / 100) * circumference

  return (
    <div style={{ background: '#111316', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px 24px', maxWidth: '400px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Application Readiness</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '22px', fontWeight: 800, color: '#f0f2f5' }}>{label}</div>
        </div>
        {/* Circular progress */}
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="44" fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset .6s ease, stroke .4s ease' }}
          />
          <text x="50" y="54" textAnchor="middle" fill={color} fontSize="18" fontWeight="800"
            style={{ fontFamily: "'Sora', sans-serif", transform: 'rotate(90deg)', transformOrigin: '50px 50px' }}>
            {score}%
          </text>
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {fields.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '18px', height: '18px', borderRadius: '5px', flexShrink: 0,
              background: f.done ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${f.done ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.1)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', color: '#22c55e'
            }}>
              {f.done ? '✓' : ''}
            </div>
            <span style={{ fontSize: '13.5px', color: f.done ? '#d1d5db' : '#6b7280' }}>{f.label}</span>
            <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#4b5563' }}>+{f.weight}%</span>
          </div>
        ))}
      </div>

      {score < 100 && (
        <div style={{ marginTop: '18px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.12)', fontSize: '12.5px', color: '#6b7280' }}>
          💡 Complete the remaining items to boost your readiness score.
        </div>
      )}
    </div>
  )
}

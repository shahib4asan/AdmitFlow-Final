'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STATUS_CONFIG: Record<string, { color: string; bg: string; dot: string }> = {
  'Not started': { color: '#94a3b8', bg: 'rgba(148,163,184,0.15)', dot: '#94a3b8' },
  'In progress': { color: '#fbbf24', bg: 'rgba(251,191,36,0.15)',   dot: '#fbbf24' },
  'Submitted':   { color: '#60a5fa', bg: 'rgba(96,165,250,0.15)',   dot: '#60a5fa' },
  'Interview':   { color: '#a78bfa', bg: 'rgba(167,139,250,0.15)', dot: '#a78bfa' },
  'Accepted':    { color: '#34d399', bg: 'rgba(52,211,153,0.15)',   dot: '#34d399' },
  'Rejected':    { color: '#f87171', bg: 'rgba(248,113,113,0.15)', dot: '#f87171' },
}
const FLAGS: Record<string, string> = { Canada: '🇨🇦', Germany: '🇩🇪', Singapore: '🇸🇬', Australia: '🇦🇺', USA: '🇺🇸', UK: '🇬🇧', Netherlands: '🇳🇱', Sweden: '🇸🇪', Bangladesh: '🇧🇩' }
function daysUntil(d: string) { return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000) }

export default function OverviewClient({ universities, plan }: { universities: any[]; plan: string }) {
  const router = useRouter()
  const total    = universities.length
  const submitted = universities.filter(u => ['Submitted','Accepted'].includes(u.status)).length
  const accepted  = universities.filter(u => u.status === 'Accepted').length
  const dueSoon   = universities.filter(u => { const d = daysUntil(u.deadline); return d >= 0 && d <= 14 }).length

  const stats = [
    { label: 'Total Applications', value: total,     sub: 'universities tracked', color: 'var(--text)' },
    { label: 'Submitted',          value: submitted,  sub: 'applications sent',   color: 'var(--blue)' },
    { label: 'Accepted',           value: accepted,   sub: 'offers received',     color: 'var(--green)' },
    { label: 'Due Soon',           value: dueSoon,    sub: 'within 14 days',      color: 'var(--amber)' },
  ]

  return (
    <div>
      {/* Topbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', height: '58px', borderBottom: '1px solid var(--border)', background: 'rgba(12,13,15,0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>AdmitFlow /</span>
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>Overview</span>
        </div>
        <button onClick={() => router.push('/dashboard/universities')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--green)', color: '#0c0d0f', padding: '7px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', border: 'none' }}>
          + Add University
        </button>
      </div>

      <div style={{ padding: '28px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: '18px 20px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginBottom: '8px' }}>{s.label}</div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '34px', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1, marginBottom: '4px', color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '17px', fontWeight: 700, color: 'var(--text)' }}>All Applications</div>
          <button onClick={() => router.push('/dashboard/universities')} style={{ fontSize: '13px', color: 'var(--green)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>View all →</button>
        </div>

        {universities.length === 0 ? (
          <div style={{ background: 'var(--card)', borderRadius: 'var(--radius2)', border: '1px solid var(--border)', padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🏛</div>
            <div style={{ fontWeight: 700, fontSize: '17px', color: 'var(--text)', marginBottom: '8px' }}>Add your first university</div>
            <div style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>Start tracking deadlines, documents, and application status.</div>
            <button onClick={() => router.push('/dashboard/universities')} style={{ background: 'var(--green)', color: '#0c0d0f', padding: '10px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', border: 'none' }}>+ Add University</button>
          </div>
        ) : (
          <div style={{ background: 'var(--card)', borderRadius: 'var(--radius2)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1.5fr 1fr 1fr 90px', padding: '10px 18px', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', fontWeight: 600 }}>
              <span>University</span><span>Country</span><span>Program</span><span>Deadline</span><span>Status</span><span>Actions</span>
            </div>
            {universities.map(u => {
              const cfg  = STATUS_CONFIG[u.status] || STATUS_CONFIG['Not started']
              const days = daysUntil(u.deadline)
              return (
                <div key={u.id} style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1.5fr 1fr 1fr 90px', padding: '14px 18px', borderBottom: '1px solid var(--border)', alignItems: 'center', transition: 'background 0.12s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{u.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted2)', marginTop: '2px' }}>{u.program}</div>
                  </div>
                  <div style={{ color: 'var(--muted2)', fontSize: '14px' }}>{FLAGS[u.country] || '🌍'} {u.country}</div>
                  <div style={{ color: 'var(--muted2)', fontSize: '13px' }}>{u.program}</div>
                  <div style={{ fontSize: '12.5px', fontFamily: 'monospace', color: days <= 14 && days >= 0 ? 'var(--amber)' : 'var(--muted2)', fontWeight: days <= 14 && days >= 0 ? 600 : 400 }}>
                    {new Date(u.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    {days >= 0 && days <= 14 && <div style={{ fontSize: '10px', marginTop: '1px' }}>{days}d left</div>}
                  </div>
                  <div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, padding: '3px 9px', borderRadius: '99px', color: cfg.color, background: cfg.bg }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
                      {u.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => router.push('/dashboard/universities')} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', padding: '5px 9px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: 'var(--muted2)' }}>✏</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

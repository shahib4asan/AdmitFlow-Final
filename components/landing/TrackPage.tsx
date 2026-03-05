'use client'

import { useState } from 'react'
import Link from 'next/link'

function AdmitFlowLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '22%', display: 'block', flexShrink: 0 }}>
      <defs>
        <linearGradient id="nb-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d1f12" />
          <stop offset="100%" stopColor="#091209" />
        </linearGradient>
        <linearGradient id="nb-stroke" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
        <filter id="nb-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="nb-glow-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="nb-inner-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#nb-bg)" />
      <rect width="512" height="512" rx="112" fill="url(#nb-inner-glow)" />
      <g filter="url(#nb-glow)">
        <path d="M140 385 L256 118 L372 385" stroke="url(#nb-stroke)" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="183" y1="285" x2="329" y2="285" stroke="url(#nb-stroke)" strokeWidth="40" strokeLinecap="round" />
      </g>
      <circle cx="256" cy="118" r="30" fill="#4ade80" filter="url(#nb-glow-soft)" />
      <circle cx="256" cy="118" r="18" fill="#fff" opacity="0.9" />
    </svg>
  )
}

// ── Types ────────────────────────────────────────────────────────────────────
type Status = 'not_started' | 'in_progress' | 'completed' | 'blocked'

interface Step {
  id: string
  label: string
  status: Status
  note: string
  updatedAt: string
}

interface Category {
  id: string
  icon: string
  title: string
  steps: Step[]
}

// ── Initial Data ─────────────────────────────────────────────────────────────
const INITIAL: Category[] = [
  {
    id: 'application',
    icon: '🏛',
    title: 'Application',
    steps: [
      { id: 'a1', label: 'University shortlist finalised',  status: 'completed',   note: 'TU Munich, NUS, UoT',          updatedAt: 'Feb 20' },
      { id: 'a2', label: 'Online portal accounts created',  status: 'completed',   note: 'All 3 portals active',         updatedAt: 'Feb 22' },
      { id: 'a3', label: 'Application forms filled',        status: 'in_progress', note: 'TU Munich 80% done',           updatedAt: 'Feb 27' },
      { id: 'a4', label: 'Applications submitted',          status: 'not_started', note: '',                             updatedAt: '' },
    ],
  },
  {
    id: 'documents',
    icon: '📄',
    title: 'Documents',
    steps: [
      { id: 'd1', label: 'Academic transcripts',            status: 'completed',   note: 'Notarised & scanned',          updatedAt: 'Feb 15' },
      { id: 'd2', label: 'IELTS / English certificate',     status: 'completed',   note: 'Band 7.5 — expires 2026',      updatedAt: 'Jan 10' },
      { id: 'd3', label: 'Passport copy',                   status: 'completed',   note: 'Valid till 2029',              updatedAt: 'Feb 10' },
      { id: 'd4', label: 'Letters of Recommendation (LOR)', status: 'in_progress', note: '2 of 3 received',              updatedAt: 'Feb 26' },
      { id: 'd5', label: 'Birth certificate',               status: 'not_started', note: '',                             updatedAt: '' },
    ],
  },
  {
    id: 'sop',
    icon: '✍️',
    title: 'SOP / Essays',
    steps: [
      { id: 's1', label: 'Research university requirements', status: 'completed',   note: 'Done for all 3',              updatedAt: 'Feb 18' },
      { id: 's2', label: 'First draft written',              status: 'completed',   note: '850 words',                   updatedAt: 'Feb 21' },
      { id: 's3', label: 'Peer / mentor review',             status: 'in_progress', note: 'Waiting on Prof. Rahman',     updatedAt: 'Feb 27' },
      { id: 's4', label: 'Final SOP ready',                  status: 'not_started', note: '',                            updatedAt: '' },
    ],
  },
  {
    id: 'payment',
    icon: '💳',
    title: 'Payment',
    steps: [
      { id: 'p1', label: 'Application fee — TU Munich',     status: 'completed',   note: '€75 paid via card',           updatedAt: 'Feb 23' },
      { id: 'p2', label: 'Application fee — NUS',           status: 'in_progress', note: 'Bank transfer initiated',     updatedAt: 'Feb 27' },
      { id: 'p3', label: 'Application fee — UoT',           status: 'not_started', note: '',                            updatedAt: '' },
      { id: 'p4', label: 'Visa fee payment',                 status: 'not_started', note: '',                            updatedAt: '' },
    ],
  },
  {
    id: 'visa',
    icon: '🛂',
    title: 'Visa',
    steps: [
      { id: 'v1', label: 'Offer letter received',            status: 'not_started', note: '',                            updatedAt: '' },
      { id: 'v2', label: 'Financial solvency proof',         status: 'not_started', note: '',                            updatedAt: '' },
      { id: 'v3', label: 'Visa application submitted',       status: 'not_started', note: '',                            updatedAt: '' },
      { id: 'v4', label: 'Visa approved',                    status: 'not_started', note: '',                            updatedAt: '' },
    ],
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
const STATUS_META: Record<Status, { label: string; color: string; bg: string; dot: string }> = {
  completed:   { label: 'Done',        color: '#4ade80', bg: 'rgba(74,222,128,0.12)',  dot: '#4ade80' },
  in_progress: { label: 'In Progress', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', dot: '#fbbf24' },
  not_started: { label: 'Not Started', color: '#6b7280', bg: 'rgba(107,114,128,0.1)', dot: '#374151' },
  blocked:     { label: 'Blocked',     color: '#f87171', bg: 'rgba(248,113,113,0.12)',dot: '#f87171' },
}

const STATUSES: Status[] = ['not_started', 'in_progress', 'completed', 'blocked']

function categoryProgress(cat: Category) {
  const done = cat.steps.filter(s => s.status === 'completed').length
  return { done, total: cat.steps.length, pct: Math.round((done / cat.steps.length) * 100) }
}

function overallProgress(cats: Category[]) {
  const total = cats.reduce((a, c) => a + c.steps.length, 0)
  const done  = cats.reduce((a, c) => a + c.steps.filter(s => s.status === 'completed').length, 0)
  return Math.round((done / total) * 100)
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function TrackPage() {
  const [data, setData]         = useState<Category[]>(INITIAL)
  const [expanded, setExpanded] = useState<string | null>('application')
  const [editing, setEditing]   = useState<string | null>(null)   // step id being edited
  const [noteVal, setNoteVal]   = useState('')

  const overall = overallProgress(data)

  function cycleStatus(catId: string, stepId: string) {
    setData(prev => prev.map(cat => {
      if (cat.id !== catId) return cat
      return {
        ...cat,
        steps: cat.steps.map(s => {
          if (s.id !== stepId) return s
          const idx  = STATUSES.indexOf(s.status)
          const next = STATUSES[(idx + 1) % STATUSES.length]
          const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
          return { ...s, status: next, updatedAt: today }
        }),
      }
    }))
  }

  function saveNote(catId: string, stepId: string) {
    setData(prev => prev.map(cat => {
      if (cat.id !== catId) return cat
      return { ...cat, steps: cat.steps.map(s => s.id === stepId ? { ...s, note: noteVal } : s) }
    }))
    setEditing(null)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#080a0f', fontFamily: "'DM Sans', sans-serif", color: '#f0f2f5', position: 'relative' }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;0,9..40,800;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}

        /* Hero bg grid */
        .tr-bg-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%);pointer-events:none;z-index:0}
        /* Orbs */
        .tr-orb{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;opacity:0.12;z-index:0}

        /* Header */
        .tr-header{position:sticky;top:0;z-index:100;background:rgba(8,10,15,0.88);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.07);padding:0 32px}
        .tr-header-inner{max-width:960px;margin:0 auto;height:60px;display:flex;align-items:center;justify-content:space-between;gap:16px}
        .tr-back{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#4b5563;text-decoration:none;font-family:'DM Mono',monospace;letter-spacing:0.5px;transition:color 0.15s}
        .tr-back:hover{color:#f0f2f5}

        /* Page wrapper */
        .tr-page{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:52px 32px 100px}

        /* Page eyebrow + title — Hero style */
        .tr-eyebrow{display:flex;align-items:center;gap:10px;margin-bottom:14px}
        .tr-eyebrow-line{width:28px;height:1px;background:#22c55e;opacity:0.7}
        .tr-eyebrow-text{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:3.5px;text-transform:uppercase;color:#22c55e;font-weight:500}

        /* Overall progress — glassmorphism card */
        .tr-overall{background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:28px 32px;margin-bottom:32px;backdrop-filter:blur(8px)}
        .tr-progress-track{height:4px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden;margin-top:18px}
        .tr-progress-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#a78bfa,#38bdf8,#4ade80);transition:width 0.6s cubic-bezier(0.4,0,0.2,1);box-shadow:0 0 8px rgba(34,197,94,0.3)}

        /* Category accordion — glassmorphism */
        .tr-cat{background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);border-radius:18px;margin-bottom:10px;overflow:hidden;backdrop-filter:blur(8px);transition:border-color 0.25s,background 0.25s}
        .tr-cat:hover{border-color:rgba(255,255,255,0.12);background:rgba(255,255,255,0.045)}
        .tr-cat.open{border-color:rgba(34,197,94,0.25);background:rgba(255,255,255,0.04)}

        .tr-cat-header{display:flex;align-items:center;gap:14px;padding:18px 22px;cursor:pointer;user-select:none;position:relative;overflow:hidden}
        .tr-cat-header::before{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.04) 50%,transparent 65%);pointer-events:none}
        .tr-cat-icon{width:38px;height:38px;border-radius:10px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.15);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;transition:background 0.2s,box-shadow 0.2s}
        .tr-cat.open .tr-cat-icon{background:rgba(34,197,94,0.14);box-shadow:0 0 16px rgba(34,197,94,0.2)}
        .tr-cat-meta{flex:1;min-width:0}
        .tr-cat-title{font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;color:#f0f2f5}
        .tr-cat-sub{font-family:'DM Mono',monospace;font-size:11px;color:#4b5563;margin-top:3px;letter-spacing:0.5px}
        .tr-cat-chevron{color:#4b5563;transition:transform 0.25s cubic-bezier(0.4,0,0.2,1),color 0.2s;flex-shrink:0}
        .tr-cat.open .tr-cat-chevron{transform:rotate(180deg);color:#22c55e}

        /* Mini progress bar */
        .tr-mini-bar{width:80px;height:3px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden;flex-shrink:0}
        .tr-mini-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#22c55e,#4ade80);transition:width 0.4s ease}

        /* Accent bar on open cat */
        .tr-cat.open .tr-cat-header::after{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#22c55e,#38bdf8);border-radius:0 2px 2px 0}

        /* Steps list */
        .tr-steps{border-top:1px solid rgba(255,255,255,0.06)}
        .tr-step{display:grid;grid-template-columns:1fr auto;align-items:start;gap:12px;padding:14px 22px;border-bottom:1px solid rgba(255,255,255,0.04);transition:background 0.15s}
        .tr-step:last-child{border-bottom:none}
        .tr-step:hover{background:rgba(255,255,255,0.025)}
        .tr-step-left{display:flex;align-items:flex-start;gap:12px;min-width:0}
        .tr-step-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:5px;transition:background 0.2s}
        .tr-step-label{font-size:14px;font-weight:500;color:#d1d5db;line-height:1.4}
        .tr-step-note{font-size:11.5px;color:#4b5563;margin-top:3px;line-height:1.5;font-style:italic;font-weight:300}
        .tr-step-date{font-family:'DM Mono',monospace;font-size:10px;color:#374151;margin-top:3px;letter-spacing:0.5px}

        /* Status badge */
        .tr-status-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:99px;font-family:'DM Mono',monospace;font-size:10.5px;font-weight:600;cursor:pointer;border:none;outline:none;white-space:nowrap;transition:opacity 0.15s,transform 0.1s;flex-shrink:0;letter-spacing:0.5px}
        .tr-status-badge:hover{opacity:0.82;transform:scale(0.97)}
        .tr-status-badge:active{transform:scale(0.93)}

        /* Note edit */
        .tr-note-input{background:rgba(255,255,255,0.05);border:1px solid rgba(34,197,94,0.3);border-radius:8px;padding:6px 10px;font-size:12px;color:#f0f2f5;outline:none;width:100%;margin-top:4px;font-family:inherit;transition:border-color 0.15s,box-shadow 0.15s}
        .tr-note-input:focus{border-color:rgba(34,197,94,0.5);box-shadow:0 0 0 3px rgba(34,197,94,0.08)}
        .tr-note-actions{display:flex;gap:6px;margin-top:6px}
        .tr-btn-save{background:#22c55e;color:#071a0e;border:none;border-radius:7px;padding:5px 13px;font-size:11.5px;font-weight:700;cursor:pointer;transition:background 0.12s}
        .tr-btn-save:hover{background:#4ade80}
        .tr-btn-cancel{background:transparent;color:#4b5563;border:1px solid rgba(255,255,255,0.1);border-radius:7px;padding:5px 10px;font-size:11.5px;cursor:pointer;transition:color 0.12s,border-color 0.12s}
        .tr-btn-cancel:hover{color:#f0f2f5;border-color:rgba(255,255,255,0.18)}
        .tr-edit-btn{background:none;border:none;color:#374151;font-size:11px;cursor:pointer;padding:2px 4px;font-family:'DM Mono',monospace;letter-spacing:0.5px;transition:color 0.12s;text-decoration:underline;text-underline-offset:2px}
        .tr-edit-btn:hover{color:#9ca3af}

        /* Stat cards — Hero glassmorphism */
        .tr-stats{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:32px}
        .tr-stat{background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:18px 20px 20px;flex:1;min-width:120px;backdrop-filter:blur(8px);position:relative;overflow:hidden;transition:border-color 0.25s,background 0.25s,transform 0.25s}
        .tr-stat:hover{transform:translateY(-4px);background:rgba(255,255,255,0.055)}
        .tr-stat::before{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.05) 50%,transparent 65%);pointer-events:none}
        .tr-stat-num{font-family:'DM Sans',sans-serif;font-size:26px;font-weight:800;letter-spacing:-1px;line-height:1}
        .tr-stat-lbl{font-family:'DM Mono',monospace;font-size:10px;color:#4b5563;margin-top:5px;letter-spacing:1.5px;text-transform:uppercase}
        .tr-stat-bar{position:absolute;bottom:0;left:20%;right:20%;height:2px;border-radius:2px 2px 0 0;opacity:0.7}

        /* Bottom strip — Hero style */
        .tr-strip{background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(56,189,248,0.04));border:1px solid rgba(34,197,94,0.18);border-radius:16px;padding:20px 28px;display:flex;align-items:center;gap:16px;backdrop-filter:blur(6px);position:relative;overflow:hidden}
        .tr-strip-bar{position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#22c55e,#38bdf8);border-radius:16px 0 0 16px}
        @keyframes trdp{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.6}}
        .tr-dp{animation:trdp 2s ease-in-out infinite}

        @media(max-width:600px){
          .tr-page{padding:36px 16px 80px}
          .tr-cat-header{padding:14px 16px}
          .tr-step{padding:12px 16px}
          .tr-stats{gap:8px}
        }
      `}</style>

      {/* Hero bg grid + orbs */}
      <div className="tr-bg-grid" />
      <div className="tr-orb" style={{ width:500,height:500,top:-200,left:-100,background:'#a78bfa' }} />
      <div className="tr-orb" style={{ width:400,height:400,top:-100,right:-80,background:'#22c55e' }} />

      {/* ── Header ── */}
      <header className="tr-header">
        <div className="tr-header-inner">
          <Link href="/" className="tr-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to home
          </Link>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}>
            <AdmitFlowLogo size={30} />
            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: '14px', fontWeight: 700, color: '#f0f2f5' }}>AdmitFlow</span>
          </Link>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Last updated today</div>
        </div>
      </header>

      <div className="tr-page">

        {/* ── Page title ── */}
        <div style={{ marginBottom: '32px' }}>
          <div className="tr-eyebrow">
            <div className="tr-eyebrow-line" />
            <span className="tr-eyebrow-text">Progress Tracker</span>
          </div>
          <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.05, color: '#f0f2f5', marginBottom: '10px' }}>
            Your journey, step<br />
            <span style={{ background: 'linear-gradient(90deg,#a78bfa,#38bdf8,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>by step.</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: '#4b5563', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.7 }}>
            Click any status badge to cycle through stages. Tap a note to edit.
          </p>
        </div>

        {/* ── Stat cards ── */}
        <div className="tr-stats">
          {[
            { num: data.reduce((a,c) => a + c.steps.filter(s=>s.status==='completed').length, 0),   label: 'Completed',   color: '#4ade80' },
            { num: data.reduce((a,c) => a + c.steps.filter(s=>s.status==='in_progress').length, 0), label: 'In Progress', color: '#fbbf24' },
            { num: data.reduce((a,c) => a + c.steps.filter(s=>s.status==='not_started').length, 0), label: 'Not Started', color: '#6b7280' },
            { num: data.reduce((a,c) => a + c.steps.filter(s=>s.status==='blocked').length, 0),     label: 'Blocked',     color: '#f87171' },
          ].map(s => (
            <div key={s.label} className="tr-stat">
              <div className="tr-stat-num" style={{ color: s.color }}>{s.num}</div>
              <div className="tr-stat-lbl">{s.label}</div>
              <div className="tr-stat-bar" style={{ background: s.color }} />
            </div>
          ))}
        </div>

        {/* ── Overall progress ── */}
        <div className="tr-overall">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: 700, color: '#f0f2f5' }}>Overall completion</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', color: '#4b5563', marginTop: '3px', letterSpacing: '0.5px' }}>
                {data.reduce((a,c) => a + c.steps.filter(s=>s.status==='completed').length, 0)} of {data.reduce((a,c) => a + c.steps.length, 0)} steps done
              </div>
            </div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '28px', fontWeight: 800, color: overall >= 70 ? '#4ade80' : overall >= 40 ? '#fbbf24' : '#f0f2f5' }}>
              {overall}%
            </div>
          </div>
          <div className="tr-progress-track">
            <div className="tr-progress-fill" style={{ width: `${overall}%` }} />
          </div>
        </div>

        {/* ── Category accordions ── */}
        {data.map(cat => {
          const { done, total, pct } = categoryProgress(cat)
          const isOpen = expanded === cat.id

          return (
            <div key={cat.id} className={`tr-cat${isOpen ? ' open' : ''}`}>
              {/* Header */}
              <div className="tr-cat-header" onClick={() => setExpanded(isOpen ? null : cat.id)}>
                <div className="tr-cat-icon">{cat.icon}</div>
                <div className="tr-cat-meta">
                  <div className="tr-cat-title">{cat.title}</div>
                  <div className="tr-cat-sub">{done}/{total} steps · {pct}%</div>
                </div>
                <div className="tr-mini-bar">
                  <div className="tr-mini-fill" style={{ width: `${pct}%` }} />
                </div>
                <svg className="tr-cat-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>

              {/* Steps */}
              {isOpen && (
                <div className="tr-steps">
                  {cat.steps.map(step => {
                    const meta    = STATUS_META[step.status]
                    const isEdit  = editing === step.id
                    return (
                      <div key={step.id} className="tr-step">
                        <div className="tr-step-left">
                          <div className="tr-step-dot" style={{ background: meta.dot }} />
                          <div style={{ minWidth: 0 }}>
                            <div className="tr-step-label">{step.label}</div>

                            {/* Note area */}
                            {isEdit ? (
                              <>
                                <input
                                  className="tr-note-input"
                                  value={noteVal}
                                  onChange={e => setNoteVal(e.target.value)}
                                  onKeyDown={e => { if (e.key === 'Enter') saveNote(cat.id, step.id); if (e.key === 'Escape') setEditing(null) }}
                                  autoFocus
                                  placeholder="Add a note…"
                                />
                                <div className="tr-note-actions">
                                  <button className="tr-btn-save" onClick={() => saveNote(cat.id, step.id)}>Save</button>
                                  <button className="tr-btn-cancel" onClick={() => setEditing(null)}>Cancel</button>
                                </div>
                              </>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                {step.note
                                  ? <span className="tr-step-note">{step.note}</span>
                                  : <span className="tr-step-note" style={{ fontStyle: 'italic' }}>No note</span>
                                }
                                <button className="tr-edit-btn" onClick={() => { setEditing(step.id); setNoteVal(step.note) }}>
                                  {step.note ? 'edit' : '+ add note'}
                                </button>
                              </div>
                            )}

                            {step.updatedAt && <div className="tr-step-date">Updated {step.updatedAt}</div>}
                          </div>
                        </div>

                        {/* Status badge — click to cycle */}
                        <button
                          className="tr-status-badge"
                          style={{ background: meta.bg, color: meta.color }}
                          onClick={() => cycleStatus(cat.id, step.id)}
                          title="Click to change status"
                        >
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
                          {meta.label}
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* ── Footer strip ── */}
        <div className="tr-strip" style={{ marginTop: '48px' }}>
          <div className="tr-strip-bar" />
          <div className="tr-dp" style={{ width:9,height:9,borderRadius:'50%',background:'#22c55e',flexShrink:0,marginLeft:8 }} />
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'14px', color:'#6b7280', lineHeight:1.6, flex:1 }}>
            <strong style={{ color:'#e8eaf0', fontWeight:700 }}>Changes are saved locally in this session.</strong>
            {' '}Sign up to save your progress permanently.
          </div>
          <Link href="/auth/signup" style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'#22c55e', color:'#071a0e', padding:'10px 20px', borderRadius:'9px', fontSize:'13px', fontWeight:700, textDecoration:'none', flexShrink:0, transition:'background 0.12s' }}>
            Save permanently →
          </Link>
        </div>

      </div>
    </main>
  )
}

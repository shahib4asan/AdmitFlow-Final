'use client'

import { useState } from 'react'
import Link from 'next/link'

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'overview',      label: 'Overview',      color: '#22c55e',
    icon: <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.12"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.12"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg> },
  { id: 'universities',  label: 'Universities',  color: '#38bdf8',
    icon: <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M3 21h18M3 10h18M12 3L3 10h18L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><rect x="7" y="14" width="3" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="14" width="3" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.6"/></svg> },
  { id: 'documents',     label: 'Documents',     color: '#a78bfa',
    icon: <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  { id: 'exams',         label: 'Exams',         color: '#fb923c',
    icon: <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M9 15l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id: 'costs',         label: 'Costs',         color: '#fbbf24',
    icon: <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 6v2M12 16v2M9 9.5c0-1.1.9-2 2-2h2a2 2 0 110 4h-2a2 2 0 100 4h2a1.9 1.9 0 002-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
]

// ── Demo data ──────────────────────────────────────────────────────────────────
const UNIS_INIT = [
  { name: 'TU Munich',             program: 'MSc Computer Science',        deadline: 'Mar 31', status: 'in_progress', country: '🇩🇪', color: '#38bdf8', fee: 150 },
  { name: 'University of Toronto', program: 'MEng Software Engineering',   deadline: 'Apr 15', status: 'not_started', country: '🇨🇦', color: '#a78bfa', fee: 200 },
  { name: 'NUS Singapore',         program: 'MSc Data Science',            deadline: 'Apr 30', status: 'in_progress', country: '🇸🇬', color: '#4ade80', fee: 100 },
  { name: 'Univ. of Edinburgh',    program: 'MSc AI & Machine Learning',   deadline: 'May 10', status: 'completed',   country: '🏴',   color: '#fbbf24', fee: 175 },
  { name: 'McGill University',     program: 'MEng Electrical Engineering', deadline: 'May 20', status: 'not_started', country: '🇨🇦', color: '#fb923c', fee: 125 },
]

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  completed:   { label: 'Submitted',   color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  in_progress: { label: 'In Progress', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  not_started: { label: 'Not Started', color: '#6b7280', bg: 'rgba(107,114,128,0.1)' },
}

const DOCS_INIT = [
  { name: 'IELTS Certificate',        category: 'Language',  status: 'ready',   uni: 'All' },
  { name: 'Academic Transcripts',     category: 'Academic',  status: 'ready',   uni: 'All' },
  { name: 'Passport Copy',            category: 'Identity',  status: 'ready',   uni: 'All' },
  { name: 'SOP — TU Munich',          category: 'Statement', status: 'missing', uni: 'TU Munich' },
  { name: 'LOR from Prof. Rahman',    category: 'Reference', status: 'missing', uni: 'All' },
  { name: 'Financial Solvency Proof', category: 'Finance',   status: 'missing', uni: 'All' },
  { name: 'SOP — NUS Singapore',      category: 'Statement', status: 'draft',   uni: 'NUS Singapore' },
  { name: 'CV / Resume',              category: 'Academic',  status: 'ready',   uni: 'All' },
]

const DOC_STATUS: Record<string, { label: string; color: string; bg: string }> = {
  ready:   { label: 'Ready',   color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  missing: { label: 'Missing', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  draft:   { label: 'Draft',   color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
}

const EXAMS_INIT = [
  { name: 'IELTS', score: '7.5', target: '7.0', date: 'Jan 12, 2024', status: 'passed',  color: '#4ade80' },
  { name: 'TOEFL', score: '—',   target: '100', date: 'Not taken',    status: 'pending', color: '#6b7280' },
  { name: 'GRE',   score: '318', target: '320', date: 'Nov 20, 2023', status: 'below',   color: '#fbbf24' },
  { name: 'SAT',   score: '—',   target: '—',   date: 'Not required', status: 'na',      color: '#4b5563' },
]

const EXAM_STATUS: Record<string, { label: string; color: string; bg: string }> = {
  passed:  { label: 'Passed',       color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  pending: { label: 'Not Taken',    color: '#6b7280', bg: 'rgba(107,114,128,0.1)' },
  below:   { label: 'Below Target', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  na:      { label: 'N/A',          color: '#4b5563', bg: 'rgba(75,85,99,0.1)' },
}

const COSTS_INIT = [
  { label: 'Application Fees',    amount: 750,  color: '#38bdf8', icon: '🏛' },
  { label: 'IELTS / GRE Exams',  amount: 340,  color: '#a78bfa', icon: '📝' },
  { label: 'Document Notary',     amount: 80,   color: '#fb923c', icon: '📄' },
  { label: 'Visa Application',    amount: 200,  color: '#fbbf24', icon: '🛂' },
  { label: 'Flight (Estimated)',  amount: 1200, color: '#4ade80', icon: '✈️' },
  { label: 'Accommodation Dep.', amount: 600,  color: '#f87171', icon: '🏠' },
]

const CHECKLIST_INIT = [
  { label: 'IELTS Certificate',        done: true,  color: '#a78bfa' },
  { label: 'Academic Transcripts',     done: true,  color: '#a78bfa' },
  { label: 'Passport Copy',            done: true,  color: '#a78bfa' },
  { label: 'SOP — TU Munich',          done: false, color: '#38bdf8' },
  { label: 'LOR from Prof. Rahman',    done: false, color: '#38bdf8' },
  { label: 'Financial Solvency Proof', done: false, color: '#38bdf8' },
]

// ── Shared header ──────────────────────────────────────────────────────────────
function SectionHeader({ title, sub, color = '#22c55e' }: { title: string; sub: string; color?: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <div style={{ width: 20, height: 1, background: color, opacity: 0.7 }} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color, fontWeight: 500 }}>{sub}</span>
      </div>
      <h1 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-1px', color: '#f0f2f5', lineHeight: 1.1 }}>{title}</h1>
    </div>
  )
}

// ── OVERVIEW ───────────────────────────────────────────────────────────────────
function OverviewView({ userName, checks, setChecks, readiness }: { userName: string; checks: boolean[]; setChecks: any; readiness: number }) {
  const STATS = [
    { label: 'Universities Tracked', value: '5',           sub: '3 in progress',  color: '#38bdf8', icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M3 21h18M3 10h18M12 3L3 10h18L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><rect x="7" y="14" width="3" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="14" width="3" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.6"/></svg> },
    { label: 'Deadlines Coming',      value: '2',           sub: 'Next: Mar 31',   color: '#f87171', icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="16" r="2" fill="currentColor" opacity="0.7"/></svg> },
    { label: 'Docs Ready',            value: '8/12',        sub: '4 still missing',color: '#a78bfa', icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { label: 'Readiness Score',       value: `${readiness}%`, sub: '+8% this week',color: '#4ade80', icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  ]
  return (
    <div>
      <SectionHeader title={`Welcome back, ${userName.split(' ')[0]}`} sub="Overview" />
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginBottom: 36, overflow: 'hidden' }}>
        <div className="db-progress-fill" style={{ height: '100%', background: 'linear-gradient(90deg,#a78bfa,#38bdf8,#4ade80)', borderRadius: 4, '--pct': `${readiness}%` } as React.CSSProperties} />
      </div>
      <div className="db-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 28 }}>
        {STATS.map((s, i) => (
          <div key={i} className="db-stat-card" style={{ borderColor: `${s.color}33` }}>
            <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', width: 60, height: 60, borderRadius: '50%', background: s.color, filter: 'blur(25px)', opacity: 0.15, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: `${s.color}18`, border: `1.5px solid ${s.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</div>
              <div className="db-dot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: s.color, opacity: 0.7, marginTop: 4 }} />
            </div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px', color: '#f0f2f5', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: '#9ca3af', marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: s.color, opacity: 0.7, letterSpacing: '0.5px' }}>{s.sub}</div>
            <div className="db-stat-line" style={{ background: s.color }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>
        <div className="db-section">
          <div className="db-section-header">
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, color: '#e8eaf0' }}>Universities</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: '#4b5563', letterSpacing: '1px', marginTop: 2 }}>5 TRACKED</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 16, padding: '10px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {['University','Deadline','Status',''].map((h, i) => <div key={i} style={{ fontFamily: "'DM Mono',monospace", fontSize: 9.5, letterSpacing: '2px', textTransform: 'uppercase', color: '#374151' }}>{h}</div>)}
          </div>
          {UNIS_INIT.map((u, i) => {
            const meta = STATUS_META[u.status]
            return (
              <div key={i} className="db-uni-row">
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, fontWeight: 600, color: '#e8eaf0', marginBottom: 2 }}>{u.country} {u.name}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, color: '#4b5563', fontWeight: 300 }}>{u.program}</div>
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#6b7280', whiteSpace: 'nowrap' }}>{u.deadline}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: meta.bg, color: meta.color, padding: '4px 10px', borderRadius: 99, fontSize: 11, fontFamily: "'DM Mono',monospace", whiteSpace: 'nowrap' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />{meta.label}
                </div>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: u.color, opacity: 0.6, flexShrink: 0 }} />
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="db-section" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9.5, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#22c55e', fontWeight: 500 }}>Readiness</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
                  <circle cx="36" cy="36" r="28" fill="none" stroke="url(#db-prog-g)" strokeWidth="6"
                    strokeDasharray={`${2*Math.PI*28}`} strokeDashoffset={`${2*Math.PI*28*(1-readiness/100)}`}
                    strokeLinecap="round" transform="rotate(-90 36 36)" style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)' }}/>
                  <defs><linearGradient id="db-prog-g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#4ade80"/></linearGradient></defs>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 800, color: '#f0f2f5' }}>{readiness}%</div>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, color: '#e8eaf0', marginBottom: 4 }}>Overall Ready</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, color: '#4b5563', fontWeight: 300 }}>{checks.filter(Boolean).length} of {checks.length} items</div>
              </div>
            </div>
            {CHECKLIST_INIT.map((item, i) => (
              <div key={i} className="db-check-item" onClick={() => setChecks((prev: boolean[]) => { const n=[...prev]; n[i]=!n[i]; return n })}>
                <div className="db-checkbox" style={{ background: checks[i] ? `${item.color}22` : 'transparent', border: `1.5px solid ${checks[i] ? item.color : 'rgba(255,255,255,0.12)'}` }}>
                  {checks[i] && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, color: checks[i] ? '#4b5563' : '#9ca3af', textDecoration: checks[i] ? 'line-through' : 'none', transition: 'color 0.2s', fontWeight: checks[i] ? 300 : 400 }}>{item.label}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'linear-gradient(135deg,rgba(34,197,94,0.06),rgba(56,189,248,0.04))', border: '1px solid rgba(34,197,94,0.18)', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg,#22c55e,#38bdf8)', borderRadius: '14px 0 0 14px' }} />
            <div className="db-dot-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0, marginLeft: 6 }} />
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, color: '#4b5563', lineHeight: 1.55 }}>
              <strong style={{ color: '#e8eaf0', fontWeight: 600 }}>Next deadline</strong> in 12 days — TU Munich, Mar 31
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── UNIVERSITIES ───────────────────────────────────────────────────────────────
function UniversitiesView() {
  const [unis, setUnis] = useState(UNIS_INIT.map(u => ({ ...u })))
  const [showAdd, setShowAdd] = useState(false)
  const [newUni, setNewUni] = useState({ name: '', program: '', deadline: '', country: '🌍' })

  const cycleStatus = (i: number) => {
    const order = ['not_started', 'in_progress', 'completed']
    setUnis(prev => { const n=[...prev]; const cur=order.indexOf(n[i].status); n[i]={...n[i],status:order[(cur+1)%order.length]}; return n })
  }
  const addUni = () => {
    if (!newUni.name) return
    setUnis(prev => [...prev, { ...newUni, status: 'not_started', color: '#6b7280', fee: 0 }])
    setNewUni({ name: '', program: '', deadline: '', country: '🌍' })
    setShowAdd(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <SectionHeader title="Universities" sub="Tracked Schools" color="#38bdf8" />
        <button onClick={() => setShowAdd(!showAdd)} style={{ padding: '8px 16px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 10, color: '#38bdf8', fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: '1px', cursor: 'pointer', marginTop: 4 }}>+ ADD</button>
      </div>
      {showAdd && (
        <div className="db-section" style={{ padding: 20, marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 14 }}>
            {[{k:'name',p:'University name'},{k:'program',p:'Program / Degree'},{k:'deadline',p:'Deadline (e.g. Apr 30)'},{k:'country',p:'Flag emoji 🇩🇪'}].map(f => (
              <input key={f.k} placeholder={f.p} value={(newUni as any)[f.k]} onChange={e => setNewUni(p => ({...p,[f.k]:e.target.value}))}
                style={{ padding:'8px 12px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, color:'#f0f2f5', fontFamily:"'DM Sans',sans-serif", fontSize:13, outline:'none' }} />
            ))}
          </div>
          <button onClick={addUni} style={{ padding:'8px 20px', background:'#38bdf8', border:'none', borderRadius:8, color:'#051a22', fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:13, cursor:'pointer' }}>Add University</button>
        </div>
      )}
      <div className="db-section" style={{ marginBottom: 20 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto auto auto', gap:16, padding:'12px 20px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          {['University & Program','Deadline','Status','Action'].map((h,i) => <div key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, letterSpacing:'2px', textTransform:'uppercase', color:'#374151' }}>{h}</div>)}
        </div>
        {unis.map((u, i) => {
          const meta = STATUS_META[u.status]
          return (
            <div key={i} className="db-uni-row">
              <div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:600, color:'#e8eaf0', marginBottom:2 }}>{u.country} {u.name}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11.5, color:'#4b5563', fontWeight:300 }}>{u.program}</div>
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'#6b7280', whiteSpace:'nowrap' }}>{u.deadline || '—'}</div>
              <div onClick={() => cycleStatus(i)} style={{ display:'flex', alignItems:'center', gap:5, background:meta.bg, color:meta.color, padding:'4px 10px', borderRadius:99, fontSize:11, fontFamily:"'DM Mono',monospace", whiteSpace:'nowrap', cursor:'pointer', userSelect:'none' }}>
                <div style={{ width:5, height:5, borderRadius:'50%', background:'currentColor' }} />{meta.label}
              </div>
              <button onClick={() => setUnis(prev => prev.filter((_,j) => j!==i))} style={{ padding:'4px 10px', background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:6, color:'#f87171', fontFamily:"'DM Mono',monospace", fontSize:10, cursor:'pointer' }}>REMOVE</button>
            </div>
          )
        })}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
        {Object.entries(STATUS_META).map(([key, meta]) => (
          <div key={key} className="db-section" style={{ padding:'18px 20px' }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:28, fontWeight:800, color:meta.color, marginBottom:4 }}>{unis.filter(u=>u.status===key).length}</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'1.5px', color:'#4b5563', textTransform:'uppercase' }}>{meta.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── DOCUMENTS ──────────────────────────────────────────────────────────────────
function DocumentsView() {
  const [docs, setDocs] = useState(DOCS_INIT.map(d => ({...d})))
  const [filter, setFilter] = useState<'all'|'ready'|'missing'|'draft'>('all')

  const cycleStatus = (i: number) => {
    const order = ['missing','draft','ready']
    setDocs(prev => { const n=[...prev]; const cur=order.indexOf(n[i].status); n[i]={...n[i],status:order[(cur+1)%order.length]}; return n })
  }
  const filtered = filter === 'all' ? docs : docs.filter(d => d.status === filter)

  return (
    <div>
      <SectionHeader title="Documents" sub="Application Docs" color="#a78bfa" />
      <div style={{ display:'flex', gap:10, marginBottom:24, flexWrap:'wrap' }}>
        {(['all','ready','missing','draft'] as const).map(f => {
          const count = f === 'all' ? docs.length : docs.filter(d=>d.status===f).length
          const colors: Record<string,string> = { all:'#9ca3af', ready:'#4ade80', missing:'#f87171', draft:'#fbbf24' }
          const active = filter === f
          return (
            <button key={f} onClick={() => setFilter(f)} style={{ padding:'6px 14px', background: active ? `${colors[f]}18`:'rgba(255,255,255,0.04)', border:`1px solid ${active?colors[f]+'55':'rgba(255,255,255,0.08)'}`, borderRadius:99, color: active?colors[f]:'#6b7280', fontFamily:"'DM Mono',monospace", fontSize:11, cursor:'pointer', textTransform:'capitalize', letterSpacing:'0.5px' }}>
              {f} ({count})
            </button>
          )
        })}
      </div>
      <div className="db-section" style={{ marginBottom: 20 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto auto auto', gap:16, padding:'12px 20px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          {['Document','Category','University','Status'].map((h,i) => <div key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, letterSpacing:'2px', textTransform:'uppercase', color:'#374151' }}>{h}</div>)}
        </div>
        {filtered.map((d, i) => {
          const meta = DOC_STATUS[d.status]
          const origIdx = docs.findIndex(x => x === d)
          return (
            <div key={i} className="db-uni-row">
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, color:'#e8eaf0' }}>{d.name}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'#4b5563', background:'rgba(255,255,255,0.04)', padding:'3px 8px', borderRadius:6, whiteSpace:'nowrap' }}>{d.category}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'#6b7280', whiteSpace:'nowrap' }}>{d.uni}</div>
              <div onClick={() => cycleStatus(origIdx)} style={{ display:'flex', alignItems:'center', gap:5, background:meta.bg, color:meta.color, padding:'4px 10px', borderRadius:99, fontSize:11, fontFamily:"'DM Mono',monospace", whiteSpace:'nowrap', cursor:'pointer', userSelect:'none' }}>
                <div style={{ width:5, height:5, borderRadius:'50%', background:'currentColor' }} />{meta.label}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
        {Object.entries(DOC_STATUS).map(([key, meta]) => (
          <div key={key} className="db-section" style={{ padding:'18px 20px' }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:28, fontWeight:800, color:meta.color, marginBottom:4 }}>{docs.filter(d=>d.status===key).length}</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'1.5px', color:'#4b5563', textTransform:'uppercase' }}>{meta.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── EXAMS ──────────────────────────────────────────────────────────────────────
function ExamsView() {
  const [exams, setExams] = useState(EXAMS_INIT.map(e => ({...e})))
  const [editing, setEditing] = useState<number|null>(null)
  const [editScore, setEditScore] = useState('')

  const saveScore = (i: number) => {
    setExams(prev => { const n=[...prev]; n[i]={...n[i],score:editScore||'—'}; return n })
    setEditing(null)
  }

  return (
    <div>
      <SectionHeader title="Exam Scores" sub="Test Results" color="#fb923c" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16, marginBottom:24 }}>
        {exams.map((e, i) => {
          const meta = EXAM_STATUS[e.status]
          return (
            <div key={i} className="db-section" style={{ padding:24, borderColor:`${e.color}33` }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:18, fontWeight:800, color:'#f0f2f5' }}>{e.name}</span>
                <div style={{ display:'flex', alignItems:'center', gap:5, background:meta.bg, color:meta.color, padding:'4px 10px', borderRadius:99, fontSize:11, fontFamily:"'DM Mono',monospace" }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', background:'currentColor' }} />{meta.label}
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'flex-end', gap:16, marginBottom:14 }}>
                <div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, letterSpacing:'2px', color:'#4b5563', textTransform:'uppercase', marginBottom:4 }}>Score</div>
                  {editing === i ? (
                    <div style={{ display:'flex', gap:8 }}>
                      <input value={editScore} onChange={ev => setEditScore(ev.target.value)} autoFocus
                        onKeyDown={ev => ev.key==='Enter'&&saveScore(i)}
                        style={{ width:70, padding:'4px 8px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:6, color:'#f0f2f5', fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:700, outline:'none' }}/>
                      <button onClick={() => saveScore(i)} style={{ padding:'4px 10px', background:`${e.color}22`, border:`1px solid ${e.color}55`, borderRadius:6, color:e.color, fontFamily:"'DM Mono',monospace", fontSize:10, cursor:'pointer' }}>SAVE</button>
                    </div>
                  ) : (
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:32, fontWeight:800, color:e.color, letterSpacing:'-1px', lineHeight:1 }}>{e.score}</span>
                      <button onClick={() => {setEditing(i); setEditScore(e.score==='—'?'':e.score)}} style={{ padding:'3px 8px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:6, color:'#6b7280', fontFamily:"'DM Mono',monospace", fontSize:10, cursor:'pointer' }}>EDIT</button>
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, letterSpacing:'2px', color:'#4b5563', textTransform:'uppercase', marginBottom:4 }}>Target</div>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:20, fontWeight:700, color:'#6b7280' }}>{e.target}</span>
                </div>
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'#374151', letterSpacing:'0.5px' }}>{e.date}</div>
            </div>
          )
        })}
      </div>
      <div className="db-section" style={{ padding:20 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, letterSpacing:'2.5px', textTransform:'uppercase', color:'#fb923c', marginBottom:14 }}>Tips</div>
        {['Your IELTS score meets most university requirements.','GRE is 2 points below target — consider retaking.','Check if TOEFL is required alongside IELTS for your universities.'].map((tip,i,arr) => (
          <div key={i} style={{ display:'flex', gap:12, padding:'10px 0', borderBottom:i<arr.length-1?'1px solid rgba(255,255,255,0.05)':'none' }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#fb923c', flexShrink:0, marginTop:5 }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#9ca3af', lineHeight:1.6 }}>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── COSTS ──────────────────────────────────────────────────────────────────────
function CostsView() {
  const [costs, setCosts] = useState(COSTS_INIT.map(c => ({...c})))
  const total = costs.reduce((s, c) => s + c.amount, 0)

  const updateAmount = (i: number, val: string) => {
    const n = parseInt(val) || 0
    setCosts(prev => { const a=[...prev]; a[i]={...a[i],amount:n}; return a })
  }

  return (
    <div>
      <SectionHeader title="Cost Tracker" sub="Budget Overview" color="#fbbf24" />
      <div style={{ background:'linear-gradient(135deg,rgba(251,191,36,0.08),rgba(251,191,36,0.03))', border:'1px solid rgba(251,191,36,0.2)', borderRadius:16, padding:'24px 28px', marginBottom:24, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(251,191,36,0.6)', marginBottom:6 }}>Total Estimated Cost</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:42, fontWeight:800, color:'#fbbf24', letterSpacing:'-2px', lineHeight:1 }}>${total.toLocaleString()}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:'1.5px', color:'#4b5563', textTransform:'uppercase', marginBottom:6 }}>Categories</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:24, fontWeight:700, color:'#9ca3af' }}>{costs.length}</div>
        </div>
      </div>
      <div className="db-section" style={{ marginBottom:20 }}>
        <div className="db-section-header">
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:700, color:'#e8eaf0' }}>Breakdown <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'#4b5563', letterSpacing:'1px', marginLeft:8 }}>CLICK AMOUNT TO EDIT</span></div>
        </div>
        {costs.map((c, i) => {
          const pct = total > 0 ? (c.amount/total)*100 : 0
          return (
            <div key={i} style={{ padding:'16px 20px', borderBottom:i<costs.length-1?'1px solid rgba(255,255,255,0.05)':'none' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ fontSize:18 }}>{c.icon}</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:600, color:'#e8eaf0' }}>{c.label}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, color:'#4b5563', letterSpacing:'0.5px' }}>{pct.toFixed(1)}%</span>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#9ca3af' }}>$</span>
                    <input type="number" value={c.amount} onChange={e => updateAmount(i, e.target.value)}
                      style={{ width:80, padding:'4px 8px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:6, color:'#f0f2f5', fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:700, outline:'none', textAlign:'right' }}/>
                  </div>
                </div>
              </div>
              <div style={{ height:4, background:'rgba(255,255,255,0.06)', borderRadius:99, overflow:'hidden' }}>
                <div style={{ width:`${pct}%`, height:'100%', background:c.color, borderRadius:99, transition:'width 0.5s cubic-bezier(.4,0,.2,1)' }} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="db-section" style={{ padding:20 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9.5, letterSpacing:'2px', textTransform:'uppercase', color:'#fbbf24', marginBottom:10 }}>Note</div>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#6b7280', lineHeight:1.7 }}>All amounts are estimates in USD. Edit any amount by clicking the number field. Costs may vary based on currency exchange rates and individual university requirements.</p>
      </div>
    </div>
  )
}

// ── MAIN ───────────────────────────────────────────────────────────────────────
export default function DashboardClient({
  userName = 'Demo User',
  userEmail = 'demo@admitflow.com',
}: {
  userName?: string
  userEmail?: string
}) {
  const [activeNav, setActiveNav] = useState('overview')
  const [checks, setChecks] = useState(CHECKLIST_INIT.map(c => c.done))

  const initial = (userName || userEmail).charAt(0).toUpperCase()
  const readiness = Math.round((checks.filter(Boolean).length / checks.length) * 100)

  const activeItem = NAV_ITEMS.find(n => n.id === activeNav)!

  const renderView = () => {
    switch (activeNav) {
      case 'overview':     return <OverviewView userName={userName} checks={checks} setChecks={setChecks} readiness={readiness} />
      case 'universities': return <UniversitiesView />
      case 'documents':    return <DocumentsView />
      case 'exams':        return <ExamsView />
      case 'costs':        return <CostsView />
      default:             return <OverviewView userName={userName} checks={checks} setChecks={setChecks} readiness={readiness} />
    }
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#080a0f', fontFamily:"'DM Sans','Sora',sans-serif", color:'#f0f2f5', position:'relative' }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,600;0,9..40,800;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .db-bg-grid{position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px);background-size:48px 48px}
        .db-orb{position:fixed;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:0;opacity:0.1}
        .db-sidebar{width:220px;flex-shrink:0;background:rgba(255,255,255,0.025);border-right:1px solid rgba(255,255,255,0.07);display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow:hidden;z-index:10;backdrop-filter:blur(20px)}
        .db-logo{display:flex;align-items:center;gap:9px;padding:22px 20px 18px;border-bottom:1px solid rgba(255,255,255,0.07);text-decoration:none}
        .db-nav-section{font-family:'DM Mono',monospace;font-size:9.5px;font-weight:500;color:#374151;letter-spacing:2.5px;text-transform:uppercase;padding:18px 20px 8px}
        .db-nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px 9px 20px;margin:1px 10px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:500;color:#6b7280;transition:background 0.18s,color 0.18s;position:relative;border:1px solid transparent}
        .db-nav-item:hover{background:rgba(255,255,255,0.04);color:#d1d5db}
        .db-nav-item.active{background:rgba(34,197,94,0.1);color:#f0f2f5;border-color:rgba(34,197,94,0.18)}
        .db-nav-item.active::before{content:'';position:absolute;left:-10px;top:50%;transform:translateY(-50%);width:3px;height:20px;background:#22c55e;border-radius:0 3px 3px 0}
        .db-stat-card{background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:22px 20px;position:relative;overflow:hidden;transition:border-color 0.25s,background 0.25s,transform 0.25s;backdrop-filter:blur(8px);cursor:default}
        .db-stat-card:hover{transform:translateY(-4px);background:rgba(255,255,255,0.055)}
        .db-stat-card::after{content:'';position:absolute;inset:0;border-radius:16px;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.05) 50%,transparent 65%);opacity:0;transition:opacity 0.25s}
        .db-stat-card:hover::after{opacity:1}
        .db-stat-line{position:absolute;bottom:0;left:20%;right:20%;height:2px;border-radius:2px 2px 0 0;opacity:0;transition:opacity 0.25s}
        .db-stat-card:hover .db-stat-line{opacity:0.6}
        .db-uni-row{display:grid;grid-template-columns:1fr auto auto auto;align-items:center;gap:16px;padding:14px 20px;border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.15s}
        .db-uni-row:last-child{border-bottom:none}
        .db-uni-row:hover{background:rgba(255,255,255,0.025)}
        .db-check-item{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer;transition:opacity 0.15s}
        .db-check-item:last-child{border-bottom:none}
        .db-check-item:hover{opacity:0.85}
        .db-checkbox{width:18px;height:18px;border-radius:5px;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:background 0.15s,border-color 0.15s}
        @keyframes db-bar-grow{from{width:0}to{width:var(--pct)}}
        .db-progress-fill{animation:db-bar-grow 1s cubic-bezier(.4,0,.2,1) forwards}
        @keyframes db-dot-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.6}}
        .db-dot-pulse{animation:db-dot-pulse 2s ease-in-out infinite}
        .db-section{background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);border-radius:20px;overflow:hidden;backdrop-filter:blur(8px)}
        .db-section-header{padding:18px 20px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between}
        .db-main::-webkit-scrollbar{width:4px}
        .db-main::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:99px}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
        @media(max-width:768px){.db-sidebar{display:none!important}.db-stats-grid{grid-template-columns:1fr 1fr!important}}
      `}</style>

      <div className="db-bg-grid"/>
      <div className="db-orb" style={{ width:600, height:600, top:-200, left:-100, background:'#22c55e' }}/>
      <div className="db-orb" style={{ width:500, height:500, bottom:-100, right:-100, background:'#38bdf8' }}/>

      {/* Sidebar */}
      <aside className="db-sidebar">
        <Link href="/" className="db-logo">
          <svg width="26" height="26" viewBox="0 0 512 512" style={{ borderRadius:'22%', flexShrink:0 }}>
            <defs>
              <linearGradient id="db-bg-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0d1f12"/><stop offset="100%" stopColor="#091209"/></linearGradient>
              <linearGradient id="db-str-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#16a34a"/><stop offset="100%" stopColor="#4ade80"/></linearGradient>
            </defs>
            <rect width="512" height="512" rx="112" fill="url(#db-bg-g)"/>
            <path d="M148 370L256 130L364 370" stroke="url(#db-str-g)" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <line x1="188" y1="280" x2="324" y2="280" stroke="url(#db-str-g)" strokeWidth="40" strokeLinecap="round"/>
            <circle cx="256" cy="130" r="30" fill="#4ade80"/>
          </svg>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:15, color:'#f0f2f5' }}>AdmitFlow</span>
        </Link>

        <div className="db-nav-section">Navigation</div>

        <nav style={{ flex:1, paddingBottom:8 }}>
          {NAV_ITEMS.map(item => (
            <div key={item.id}
              className={`db-nav-item${activeNav===item.id?' active':''}`}
              onClick={() => setActiveNav(item.id)}
              style={{ color: activeNav===item.id ? item.color : undefined }}
            >
              <span style={{ color: activeNav===item.id ? item.color : '#4b5563', flexShrink:0 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        <div style={{ padding:'14px 16px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'rgba(255,255,255,0.03)', borderRadius:12, border:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ width:34, height:34, borderRadius:'50%', background:'rgba(34,197,94,0.15)', border:'1.5px solid rgba(34,197,94,0.35)', display:'flex', alignItems:'center', justifyContent:'center', color:'#22c55e', fontFamily:"'DM Mono',monospace", fontWeight:500, fontSize:13, flexShrink:0 }}>{initial}</div>
            <div style={{ overflow:'hidden', flex:1 }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, color:'#e8eaf0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{userName}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'#22c55e', letterSpacing:'1px', marginTop:1 }}>FREE PLAN</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="db-main" style={{ flex:1, minHeight:'100vh', overflowY:'auto', position:'relative', zIndex:1 }}>
        {/* Top bar */}
        <div style={{ position:'sticky', top:0, zIndex:5, background:'rgba(8,10,15,0.85)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(255,255,255,0.05)', padding:'14px 32px', display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ color: activeItem.color, flexShrink:0 }}>{activeItem.icon}</span>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, color:'#e8eaf0' }}>{activeItem.label}</span>
          <div style={{ marginLeft:'auto', fontFamily:"'DM Mono',monospace", fontSize:10, color:'#374151', letterSpacing:'1.5px' }}>ADMITFLOW</div>
        </div>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'36px 32px 80px' }}>
          {renderView()}
        </div>
      </main>
    </div>
  )
}

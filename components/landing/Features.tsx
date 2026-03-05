'use client'

const FEATURES = [
  { title: 'Deadline Tracker',     desc: 'Visual calendar with 7-day and 2-day automated email alerts. Never scramble at the last minute again.', color: '#38bdf8', num: '01',
    icon: <svg viewBox="0 0 40 40" fill="none" width="22" height="22"><rect x="6" y="8" width="28" height="26" rx="4" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25"/><rect x="6" y="8" width="28" height="26" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="6" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="2"/><line x1="14" y1="6" x2="14" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="26" y1="6" x2="26" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="20" cy="24" r="3" fill="currentColor" opacity="0.8"/></svg> },
  { title: 'Document Checklist',   desc: 'SOP, CV, IELTS, transcripts, LORs — track every document per university with one click.', color: '#a78bfa', num: '02',
    icon: <svg viewBox="0 0 40 40" fill="none" width="22" height="22"><rect x="8" y="5" width="20" height="28" rx="3" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25"/><rect x="8" y="5" width="20" height="28" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="13" y1="13" x2="23" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="13" y1="19" x2="23" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M13 25 L16 28 L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="24" y="22" width="10" height="14" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/></svg> },
  { title: 'Readiness Score',      desc: "See your application completion as a live percentage. Know exactly what's missing before the deadline.", color: '#4ade80', num: '03',
    icon: <svg viewBox="0 0 40 40" fill="none" width="22" height="22"><circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25"/><path d="M20 6 A14 14 0 0 1 34 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/><circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.8"/><line x1="20" y1="20" x2="28" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
  { title: 'Intake Roadmap',       desc: 'Auto-generated 6–12 month timeline: IELTS prep → SOP draft → shortlist → apply → visa.', color: '#fb923c', num: '04',
    icon: <svg viewBox="0 0 40 40" fill="none" width="22" height="22"><circle cx="8" cy="20" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="32" cy="20" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="12" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="2"/><line x1="24" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="2"/><circle cx="8" cy="20" r="2" fill="currentColor"/><circle cx="20" cy="20" r="2" fill="currentColor"/></svg> },
  { title: 'Fund Calculator',      desc: 'Select your target country and instantly see required bank balance, tuition, and living costs in BDT.', color: '#fbbf24', num: '05',
    icon: <svg viewBox="0 0 40 40" fill="none" width="22" height="22"><rect x="6" y="10" width="28" height="20" rx="4" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25"/><rect x="6" y="10" width="28" height="20" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="20" y1="15" x2="20" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="23" x2="20" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { title: 'Scholarship Tracker',  desc: 'Never miss a scholarship deadline. Track amounts, requirements, and application status all in one place.', color: '#f472b6', num: '06',
    icon: <svg viewBox="0 0 40 40" fill="none" width="22" height="22"><path d="M20 6 L23.1 15.4 H33 L25.4 20.9 L28.5 30.3 L20 24.8 L11.5 30.3 L14.6 20.9 L7 15.4 H16.9 Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25" strokeLinejoin="round"/><path d="M20 6 L23.1 15.4 H33 L25.4 20.9 L28.5 30.3 L20 24.8 L11.5 30.3 L14.6 20.9 L7 15.4 H16.9 Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/></svg> },
  { title: 'University Manager',   desc: 'Track status from Not Started to Accepted. Store portal links, fees, program details, and deadlines.', color: '#22c55e', num: '07',
    icon: <svg viewBox="0 0 40 40" fill="none" width="22" height="22"><rect x="4" y="24" width="32" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25"/><rect x="4" y="24" width="32" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M10 24 L10 16 L20 8 L30 16 L30 24" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/><rect x="16" y="28" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg> },
  { title: 'AI SOP Assistant',     desc: 'AI-powered suggestions to strengthen your Statement of Purpose. Draft editor, version history, structural checklist.', color: '#60a5fa', num: '08',
    icon: <svg viewBox="0 0 40 40" fill="none" width="22" height="22"><path d="M8 28 L8 32 L12 30 L34 12 L30 8 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.25"/><path d="M8 28 L8 32 L12 30 L34 12 L30 8 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"/><line x1="26" y1="10" x2="30" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="32" cy="30" r="5" stroke="currentColor" strokeWidth="2" fill="none"/><line x1="36" y1="34" x2="38" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
]

const STATS = [
  { num: '2,400+', label: 'Students tracking',    color: '#4ade80' },
  { num: '12,000+', label: 'Applications managed', color: '#38bdf8' },
  { num: '99.1%',  label: 'Deadline hit rate',    color: '#a78bfa' },
  { num: '৳0',     label: 'Consultant fee saved', color: '#fbbf24' },
]

export default function Features() {
  return (
    <section id="features" style={{ padding: '100px 32px', background: 'transparent', position: 'relative', overflow: 'hidden' }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,600;0,9..40,800;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        .ft-bg-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .ft-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; opacity: 0.12; }

        .ft-card {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 28px 24px;
          display: flex; flex-direction: column; gap: 0;
          position: relative; overflow: hidden;
          cursor: default;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .ft-card:hover {
          background: rgba(255,255,255,0.055);
          transform: translateY(-3px);
        }
        .ft-card::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.05) 50%, transparent 65%);
          opacity: 0; transition: opacity 0.25s;
        }
        .ft-card:hover::after { opacity: 1; }

        .ft-icon-ring {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; flex-shrink: 0;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .ft-card:hover .ft-icon-ring { transform: scale(1.1) rotate(-4deg); }

        .ft-card-line {
          position: absolute; bottom: 0; left: 20%; right: 20%;
          height: 2px; border-radius: 2px 2px 0 0;
          opacity: 0; transition: opacity 0.25s;
        }
        .ft-card:hover .ft-card-line { opacity: 0.6; }

        .ft-num { opacity: 0; transition: opacity 0.2s; }
        .ft-card:hover .ft-num { opacity: 1; }

        @keyframes ft-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
        .ft-dot-pulse { animation: ft-dot-pulse 2s ease-in-out infinite; }

        @media(max-width: 900px) { .ft-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media(max-width: 560px) { .ft-grid { grid-template-columns: 1fr !important; } }
        @media(max-width: 680px) { .ft-stats { flex-direction: column; gap: 0 !important; } }
      `}</style>

      <div className="ft-orb" style={{ width: 500, height: 500, top: -150, left: -100, background: '#a78bfa' }} />
      <div className="ft-orb" style={{ width: 400, height: 400, bottom: -100, right: -80, background: '#38bdf8' }} />

      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative' }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
          <span style={{ fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#22c55e', fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>Features</span>
        </div>

        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(30px, 4vw, 52px)',
          fontWeight: 800, letterSpacing: '-1.5px',
          color: '#f0f2f5', lineHeight: 1.05, marginBottom: '10px',
        }}>
          Everything you need<br />
          <span style={{ background: 'linear-gradient(90deg, #a78bfa, #38bdf8, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            to get admitted.
          </span>
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#4b5563', marginBottom: '52px', fontStyle: 'italic', fontWeight: 300, maxWidth: 480 }}>
          From the first university on your list to the acceptance letter. All in one place.
        </p>

        {/* Progress bar */}
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginBottom: 48, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, #a78bfa, #38bdf8, #fb923c, #4ade80, #f472b6, #22c55e)', borderRadius: 4 }} />
        </div>

        {/* Grid */}
        <div className="ft-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px', background: 'rgba(255,255,255,0.06)',
          borderRadius: '20px', overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="ft-card">
              <div className="ft-num" style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '2px', color: f.color, marginBottom: 10 }}>{f.num}</div>
              <div className="ft-icon-ring" style={{ background: `${f.color}18`, border: `1.5px solid ${f.color}44`, color: f.color }}>
                {f.icon}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 700, color: '#e8eaf0', marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12.5px', color: '#4b5563', lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</div>
              <div className="ft-card-line" style={{ background: f.color }} />
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="ft-stats" style={{
          marginTop: 60,
          background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(56,189,248,0.04))',
          border: '1px solid rgba(34,197,94,0.18)',
          borderRadius: '16px', padding: '6px',
          display: 'flex',
          backdropFilter: 'blur(6px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(180deg, #22c55e, #38bdf8)', borderRadius: '16px 0 0 16px' }} />
          {STATS.map((s, i) => (
            <div key={i} style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', padding: '18px 12px',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px', color: s.color }}>{s.num}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#4b5563', letterSpacing: '1px', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

'use client'
import Link from 'next/link'

const pains = [
  {
    title: 'Deadlines Get Missed',
    desc: 'One slip and you are locked out for an entire admission cycle. There are no second chances.',
    color: '#f87171',
    glow: 'rgba(248,113,113,0.35)',
    num: '01',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" fill="none"/>
        <line x1="20" y1="10" x2="20" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="20" cy="27" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Documents Are Scattered',
    desc: 'SOP drafts in Google Drive, transcripts on email, LOR requests forgotten — chaos everywhere.',
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.35)',
    num: '02',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <rect x="6" y="8" width="20" height="26" rx="3" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <rect x="6" y="8" width="20" height="26" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <line x1="11" y1="16" x2="21" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="11" y1="21" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="11" y1="26" x2="17" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="26" y1="18" x2="34" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="34" y1="18" x2="26" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Costs Go Out of Control',
    desc: 'App fees, courier, IELTS re-sit, visa — small costs stack up fast and surprise you.',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.35)',
    num: '03',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M20 10 V14 M20 26 V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 15.5 C15 13.5 17 12 20 12 C23 12 25 13.5 25 15.5 C25 17.5 23 19 20 19 C17 19 15 20.5 15 22.5 C15 24.5 17 26 20 26 C23 26 25 24.5 25 22.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Visa Process Feels Confusing',
    desc: 'After your offer letter, the visa maze begins. Without a checklist, it is easy to get lost.',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.35)',
    num: '04',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <rect x="6" y="8" width="28" height="24" rx="4" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <rect x="6" y="8" width="28" height="24" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="20" cy="18" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M13 28 C13 24 16 22 20 22 C24 22 27 24 27 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
]

export default function ProblemSection() {
  return (
    <section style={{
      padding: '100px 32px',
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,600;0,9..40,800;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        .ps-bg-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .ps-orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; opacity: 0.14; }

        .ps-card {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 28px 24px;
          display: flex; gap: 20px; align-items: flex-start;
          position: relative; overflow: hidden;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
          backdrop-filter: blur(8px);
        }
        .ps-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.055);
        }
        .ps-card::after {
          content: ''; position: absolute; inset: 0; border-radius: 20px;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.05) 50%, transparent 65%);
          opacity: 0; transition: opacity 0.25s;
        }
        .ps-card:hover::after { opacity: 1; }

        .ps-icon-ring {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .ps-card:hover .ps-icon-ring { transform: scale(1.1) rotate(-4deg); }

        .ps-card-line {
          position: absolute; bottom: 0; left: 20%; right: 20%;
          height: 2px; border-radius: 2px 2px 0 0;
          opacity: 0; transition: opacity 0.25s;
        }
        .ps-card:hover .ps-card-line { opacity: 0.6; }

        @keyframes ps-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
        .ps-dot-pulse { animation: ps-dot-pulse 2s ease-in-out infinite; }

        @media(max-width: 680px) { .ps-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="ps-orb" style={{ width: 500, height: 500, top: -200, right: -100, background: '#f87171' }} />
      <div className="ps-orb" style={{ width: 350, height: 350, bottom: -100, left: -80, background: '#fbbf24' }} />

      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative' }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 28, height: 1, background: '#f87171', opacity: 0.7 }} />
          <span style={{ fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#f87171', fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>The Problem</span>
        </div>

        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(30px, 4vw, 52px)',
          fontWeight: 800, letterSpacing: '-1.5px',
          color: '#f0f2f5', lineHeight: 1.05, marginBottom: '10px',
        }}>
          Applying Abroad Is<br />
          <span style={{ background: 'linear-gradient(90deg, #f87171, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Overwhelming.
          </span>
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#4b5563', marginBottom: '52px', fontStyle: 'italic', fontWeight: 300 }}>
          Four pain points every Bangladeshi applicant faces.
        </p>

        {/* Progress bar */}
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginBottom: 48, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: '100%',
            background: 'linear-gradient(90deg, #f87171, #fb923c, #fbbf24, #a78bfa)',
            borderRadius: 4,
          }} />
        </div>

        {/* Cards */}
        <div className="ps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {pains.map((p, i) => (
            <div key={i} className="ps-card" style={{ '--card-color': p.color } as React.CSSProperties}>
              <div
                className="ps-icon-ring"
                style={{
                  background: `${p.color}18`,
                  border: `1.5px solid ${p.color}44`,
                  color: p.color,
                  boxShadow: `0 0 0 0 ${p.glow}`,
                }}
              >
                {p.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '2px', color: p.color, opacity: 0.7 }}>{p.num}</span>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '15px', color: '#e8eaf0' }}>{p.title}</div>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13.5px', color: '#4b5563', lineHeight: 1.7, fontWeight: 300 }}>{p.desc}</div>
              </div>
              <div className="ps-card-line" style={{ background: p.color }} />
            </div>
          ))}
        </div>

        {/* Emotional closer strip */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(248,113,113,0.06), rgba(251,191,36,0.04))',
          border: '1px solid rgba(248,113,113,0.18)',
          borderRadius: '16px', padding: '22px 32px',
          display: 'flex', alignItems: 'center', gap: '18px',
          backdropFilter: 'blur(6px)',
          position: 'relative', overflow: 'hidden',
          flexWrap: 'wrap',
        }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(180deg, #f87171, #fbbf24)', borderRadius: '16px 0 0 16px' }} />
          <div className="ps-dot-pulse" style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#f87171', flexShrink: 0, marginLeft: 8 }} />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#6b7280', lineHeight: 1.5, flex: 1 }}>
            <strong style={{ color: '#e8eaf0', fontWeight: 700 }}>One missed deadline can delay your dream by a whole year.</strong>
          </div>
          <Link href="/auth/signup" style={{
            background: '#22c55e', color: '#071a0e',
            padding: '11px 24px', borderRadius: '10px',
            fontSize: '13px', fontWeight: 700,
            textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Never Miss One →
          </Link>
        </div>
      </div>
    </section>
  )
}

'use client'
import { useState } from 'react'

const steps = [
  {
    label: 'IELTS / GRE',
    sub: 'Prep & sit your exams',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.4)',
    num: '01',
    // Flaticon - pencil/exam icon (inline SVG)
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
        <rect x="8" y="8" width="34" height="44" rx="4" fill="currentColor" opacity="0.15"/>
        <rect x="8" y="8" width="34" height="44" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <line x1="16" y1="22" x2="34" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="30" x2="34" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="38" x2="26" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M40 44 L52 32 L56 36 L44 48 Z" fill="currentColor" opacity="0.9"/>
        <path d="M40 44 L38 52 L46 50 Z" fill="currentColor" opacity="0.6"/>
        <line x1="50" y1="30" x2="54" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Shortlist',
    sub: 'Pick your universities',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.4)',
    num: '02',
    // Flaticon - bookmark/list icon
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
        <path d="M18 8 H46 A4 4 0 0 1 50 12 V56 L32 46 L14 56 V12 A4 4 0 0 1 18 8 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
        <line x1="24" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="24" y1="30" x2="36" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Apply',
    sub: 'Submit applications',
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.4)',
    num: '03',
    // Flaticon - send/paper plane icon
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
        <path d="M8 32 L56 10 L38 56 L28 36 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="28" y1="36" x2="56" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="28" y1="36" x2="28" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M28 50 L34 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Offer',
    sub: 'Receive decisions',
    color: '#4ade80',
    glow: 'rgba(74,222,128,0.4)',
    num: '04',
    // Flaticon - trophy/star icon
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
        <path d="M32 8 L36.9 22.1 H52 L39.6 30.8 L44.4 44.9 L32 36.2 L19.6 44.9 L24.4 30.8 L12 22.1 H27.1 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="24" y1="52" x2="40" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="32" y1="44" x2="32" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Visa',
    sub: 'Complete visa process',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.4)',
    num: '05',
    // Flaticon - passport/ID icon
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
        <rect x="10" y="8" width="44" height="48" rx="5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="32" cy="26" r="8" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <path d="M32 18 C28 18 24 22 24 26 C24 30 28 34 32 34 C36 34 40 30 40 26 C40 22 36 18 32 18 Z" fill="currentColor" opacity="0.1"/>
        <ellipse cx="32" cy="26" rx="4" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <line x1="24" y1="26" x2="40" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="18" y1="42" x2="46" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="18" y1="49" x2="36" y2="49" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Fly!',
    sub: 'Live your dream',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.5)',
    num: '06',
    // Flaticon - airplane icon
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
        <path d="M54 12 C58 16 56 26 42 34 L46 52 L40 48 L34 36 L24 40 L26 46 L20 44 L18 32 C10 28 8 20 12 14 C16 8 26 10 32 18 C38 10 50 8 54 12 Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Timeline() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [active, setActive] = useState<number | null>(null)

  return (
    <section style={{
      padding: '100px 32px',
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'DM Sans', 'Sora', sans-serif",
    }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,600;0,9..40,800;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

        /* Background grid */
        .tl-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
          pointer-events: none;
        }
        /* Orb blobs */
        .tl-orb {
          position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; opacity: 0.18;
        }

        /* Card */
        .tl-card {
          position: relative;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 28px 20px 24px;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          cursor: default;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
          backdrop-filter: blur(8px);
          overflow: hidden;
        }
        .tl-card::before {
          content: '';
          position: absolute; inset: 0; border-radius: 20px;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .tl-card.hov {
          transform: translateY(-6px);
          background: rgba(255,255,255,0.055);
        }
        .tl-card.hov::before { opacity: 1; }

        /* Icon ring */
        .tl-ring {
          width: 60px; height: 60px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s;
        }
        .tl-ring.hov {
          transform: scale(1.18) rotate(-5deg);
        }

        /* Number badge */
        .tl-num {
          font-family: 'DM Mono', monospace;
          font-size: 10px; letter-spacing: 2px;
          opacity: 0.5; font-weight: 500;
          transition: opacity 0.2s;
        }
        .tl-card.hov .tl-num { opacity: 1; }

        /* Connector dots */
        .tl-connector {
          position: absolute; top: 50px; left: calc(50% + 32px);
          right: calc(-50% + 32px);
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03));
          pointer-events: none;
        }
        .tl-connector::after {
          content: '';
          position: absolute; right: -4px; top: -3px;
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
        }

        /* Label */
        .tl-label {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700; font-size: 13px;
          text-align: center; line-height: 1.3;
          color: #e8eaf0;
          transition: color 0.2s;
        }
        .tl-card.hov .tl-label { color: #fff; }

        /* Sub */
        .tl-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; color: #4b5563; text-align: center; line-height: 1.45;
          transition: color 0.2s;
        }
        .tl-card.hov .tl-sub { color: #6b7280; }

        /* Shimmer on card hover */
        @keyframes tl-shimmer {
          0% { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(200%) rotate(25deg); }
        }
        .tl-card.hov .tl-shim {
          animation: tl-shimmer 0.7s ease-out forwards;
        }
        .tl-shim {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%);
        }

        /* Progress bar */
        @keyframes tl-bar-grow {
          from { width: 0; }
          to { width: 100%; }
        }
        .tl-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #a78bfa, #38bdf8, #fb923c, #4ade80, #f472b6, #22c55e);
          border-radius: 4px;
          animation: tl-bar-grow 1.4s cubic-bezier(.4,0,.2,1) forwards;
          animation-delay: 0.3s;
          width: 0;
        }

        /* Strip glow pulse */
        @keyframes tl-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
        .tl-dot-pulse { animation: tl-dot-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* Background elements */}
      <div className="tl-orb" style={{ width: 500, height: 500, top: -200, left: -100, background: '#a78bfa' }} />
      <div className="tl-orb" style={{ width: 400, height: 400, top: -100, right: -80, background: '#22c55e' }} />

      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative' }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
          <span style={{
            fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase',
            color: '#22c55e', fontFamily: "'DM Mono', monospace", fontWeight: 500,
          }}>The Journey</span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(30px, 4vw, 52px)',
          fontWeight: 800, letterSpacing: '-1.5px',
          color: '#f0f2f5', lineHeight: 1.05,
          marginBottom: '10px',
        }}>
          Your Entire Journey —<br />
          <span style={{
            background: 'linear-gradient(90deg, #a78bfa, #38bdf8, #4ade80)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>From IELTS to Visa.</span>
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px', color: '#4b5563', marginBottom: '56px',
          fontStyle: 'italic', fontWeight: 300,
        }}>Six steps. One seamless path.</p>

        {/* Progress bar */}
        <div style={{
          height: '3px', background: 'rgba(255,255,255,0.06)',
          borderRadius: 4, marginBottom: 48, overflow: 'hidden',
        }}>
          <div className="tl-progress-fill" />
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '12px',
          position: 'relative',
        }}>
          {steps.map((step, i) => {
            const isHov = hovered === i

            return (
              <div
                key={i}
                className={`tl-card${isHov ? ' hov' : ''}`}
                style={{
                  borderColor: isHov ? `${step.color}55` : 'rgba(255,255,255,0.07)',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setActive(active === i ? null : i)}
              >
                {/* Shimmer sweep */}
                <div className="tl-shim" />

                {/* Top glow spot */}
                {isHov && (
                  <div style={{
                    position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
                    width: 80, height: 80, borderRadius: '50%',
                    background: step.color, filter: 'blur(30px)', opacity: 0.25,
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Icon ring */}
                <div
                  className={`tl-ring${isHov ? ' hov' : ''}`}
                  style={{
                    background: isHov ? `${step.color}22` : 'rgba(255,255,255,0.04)',
                    border: `1.5px solid ${isHov ? step.color + '88' : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: isHov ? `0 0 24px ${step.glow}` : 'none',
                    color: isHov ? step.color : '#9ca3af',
                  }}
                >
                  {step.icon}
                </div>

                {/* Number */}
                <div className="tl-num" style={{ color: step.color }}>
                  {step.num}
                </div>

                {/* Label */}
                <div className="tl-label">{step.label}</div>

                {/* Sub */}
                <div className="tl-sub">{step.sub}</div>

                {/* Bottom accent line */}
                <div style={{
                  position: 'absolute', bottom: 0, left: '20%', right: '20%',
                  height: '2px', borderRadius: '2px 2px 0 0',
                  background: isHov ? step.color : 'transparent',
                  transition: 'background 0.25s',
                  opacity: 0.7,
                }} />
              </div>
            )
          })}
        </div>

        {/* Step connectors (arrows) */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '12px', marginTop: '10px', pointerEvents: 'none',
        }}>
          {steps.map((_, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '16px' }}>
              {i < steps.length - 1 && (
                <svg width="100%" height="12" viewBox="0 0 120 12" fill="none" style={{ overflow: 'visible' }}>
                  <line x1="0" y1="6" x2="110" y2="6" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="4 3"/>
                  <polygon points="110,3 118,6 110,9" fill="rgba(255,255,255,0.1)"/>
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div style={{
          marginTop: '44px',
          background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(56,189,248,0.04))',
          border: '1px solid rgba(34,197,94,0.18)',
          borderRadius: '16px', padding: '22px 32px',
          display: 'flex', alignItems: 'center', gap: '18px',
          backdropFilter: 'blur(6px)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Strip accent bar */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
            background: 'linear-gradient(180deg, #22c55e, #38bdf8)',
            borderRadius: '16px 0 0 16px',
          }} />
          <div className="tl-dot-pulse" style={{
            width: '9px', height: '9px', borderRadius: '50%',
            background: '#22c55e', flexShrink: 0, marginLeft: 8,
          }} />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
            <strong style={{ color: '#e8eaf0', fontWeight: 700 }}>AdmitFlow tracks every stage</strong>
            {' '}— deadlines, documents, costs, and visa steps, all in one place.
          </div>
          <div style={{
            marginLeft: 'auto', flexShrink: 0,
            fontFamily: "'DM Mono', monospace", fontSize: '11px',
            color: '#22c55e', letterSpacing: '2px', opacity: 0.7,
          }}>6 STEPS</div>
        </div>

      </div>
    </section>
  )
}

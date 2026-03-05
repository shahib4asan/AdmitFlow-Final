'use client'

const TESTIMONIALS = [
  {
    quote: "Tracked 5 universities without missing a single deadline. The reminders are a lifesaver.",
    name: 'Hiyan Arham',
    detail: 'UBC Computer Science — Vancouver',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.35)',
    initial: 'H',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <path d="M12 28 C12 22 16 18 20 18 C24 18 28 22 28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
  },
  {
    quote: "Finally stopped using messy spreadsheets. AdmitFlow keeps everything in one clean place.",
    name: 'Ayra Inaya',
    detail: 'TU Munich MSc — Germany',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.35)',
    initial: 'A',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <path d="M12 28 C12 22 16 18 20 18 C24 18 28 22 28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
  },
  {
    quote: "The fund calculator showed me exactly how much I needed. No more guessing about bank statements.",
    name: 'Dristy A',
    detail: 'University of Toronto — Canada',
    color: '#4ade80',
    glow: 'rgba(74,222,128,0.35)',
    initial: 'D',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <path d="M12 28 C12 22 16 18 20 18 C24 18 28 22 28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
  },
  {
    quote: "Got into my dream program. AdmitFlow kept me sane through the whole application chaos.",
    name: 'Rafi Islam',
    detail: 'NUS MSc Data Science — Singapore',
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.35)',
    initial: 'R',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <path d="M12 28 C12 22 16 18 20 18 C24 18 28 22 28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
  },
  {
    quote: "Visa checklist alone is worth it. I never would've remembered half those documents.",
    name: 'Nadia Sultana',
    detail: 'University of Edinburgh — UK',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.35)',
    initial: 'N',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <path d="M12 28 C12 22 16 18 20 18 C24 18 28 22 28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
  },
  {
    quote: "Built for Bangladeshi students, by someone who lived it. That trust factor is everything.",
    name: 'Tanvir Hossain',
    detail: 'McGill University — Montréal',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.35)',
    initial: 'T',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <path d="M12 28 C12 22 16 18 20 18 C24 18 28 22 28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="20" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    ),
  },
]

const ROW1 = [...TESTIMONIALS, ...TESTIMONIALS]

function Card({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="af-sp-card" style={{ '--card-color': t.color, '--card-glow': t.glow } as React.CSSProperties}>
      {/* Top glow accent */}
      <div className="af-sp-card-glow" />

      {/* Quote mark deco */}
      <div className="af-sp-qdeco">
        <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
          <path d="M0 22V13.2C0 5.8 4.4 1.6 13.2 0L14.4 2.4C10.4 3.4 8 5.6 7.2 9.2H12V22H0ZM16 22V13.2C16 5.8 20.4 1.6 29.2 0L30.4 2.4C26.4 3.4 24 5.6 23.2 9.2H28V22H16Z" fill="currentColor" opacity="0.18"/>
        </svg>
      </div>

      {/* Stars */}
      <div className="af-sp-stars">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 1L7.3 4.4H11L8.1 6.5L9.2 10L6 7.9L2.8 10L3.9 6.5L1 4.4H4.7Z" fill="currentColor"/>
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <p className="af-sp-quote">"{t.quote}"</p>

      {/* Footer */}
      <div className="af-sp-footer">
        <div className="af-sp-avatar">
          <span className="af-sp-initial">{t.initial}</span>
        </div>
        <div>
          <div className="af-sp-name">{t.name}</div>
          <div className="af-sp-detail">{t.detail}</div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="af-sp-card-line" />
    </div>
  )
}

export default function SocialProof() {
  return (
    <section style={{
      padding: '100px 0',
      background: 'transparent',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,600;0,9..40,800;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

        /* Background grid */
        .af-sp-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .af-sp-orb {
          position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; opacity: 0.14;
        }

        /* Header */
        .af-sp-header {
          max-width: 1160px; margin: 0 auto;
          padding: 0 32px; margin-bottom: 56px;
        }

        /* Marquee */
        .af-sp-row {
          overflow: hidden; margin-bottom: 16px; cursor: default;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
        }
        .af-sp-track { display: flex; gap: 16px; width: max-content; }
        @keyframes af-marquee-left  { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
        @keyframes af-marquee-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .af-sp-row-1 .af-sp-track { animation: af-marquee-left  52s linear infinite; }
        .af-sp-row-2 .af-sp-track { animation: af-marquee-right 44s linear infinite; }
        .af-sp-row:hover .af-sp-track { animation-play-state: paused; }

        /* Card */
        .af-sp-card {
          flex-shrink: 0; width: 290px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 24px 22px 20px;
          display: flex; flex-direction: column; gap: 14px;
          position: relative; overflow: hidden;
          transition: border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s;
          opacity: 0.6;
          backdrop-filter: blur(8px);
        }
        .af-sp-card:hover {
          border-color: color-mix(in srgb, var(--card-color) 40%, transparent);
          background: rgba(255,255,255,0.055);
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          opacity: 1;
        }

        /* Shimmer on hover */
        .af-sp-card::after {
          content: '';
          position: absolute; inset: 0; border-radius: 20px;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .af-sp-card:hover::after { opacity: 1; }

        /* Top glow */
        .af-sp-card-glow {
          position: absolute; top: -30px; left: 50%; transform: translateX(-50%);
          width: 80px; height: 80px; border-radius: 50%;
          background: var(--card-color); filter: blur(30px); opacity: 0;
          pointer-events: none; transition: opacity 0.3s;
        }
        .af-sp-card:hover .af-sp-card-glow { opacity: 0.2; }

        /* Quote deco */
        .af-sp-qdeco {
          position: absolute; top: 14px; right: 16px;
          color: var(--card-color); pointer-events: none;
          opacity: 0; transition: opacity 0.25s;
        }
        .af-sp-card:hover .af-sp-qdeco { opacity: 1; }

        /* Stars */
        .af-sp-stars {
          display: flex; gap: 3px;
          color: var(--card-color);
          opacity: 0.75;
        }
        .af-sp-card:hover .af-sp-stars { opacity: 1; }

        /* Quote */
        .af-sp-quote {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #6b7280; line-height: 1.75; margin: 0;
          font-style: italic; font-weight: 300;
          transition: color 0.2s;
        }
        .af-sp-card:hover .af-sp-quote { color: #9ca3af; }

        /* Footer */
        .af-sp-footer { display: flex; align-items: center; gap: 10px; margin-top: auto; }

        .af-sp-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: color-mix(in srgb, var(--card-color) 15%, transparent);
          border: 1.5px solid color-mix(in srgb, var(--card-color) 35%, transparent);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: box-shadow 0.25s;
        }
        .af-sp-card:hover .af-sp-avatar {
          box-shadow: 0 0 16px var(--card-glow);
        }
        .af-sp-initial {
          font-family: 'DM Mono', monospace;
          font-size: 13px; font-weight: 500;
          color: var(--card-color);
        }

        .af-sp-name {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700; color: #e8eaf0; font-size: 13px;
          transition: color 0.2s;
        }
        .af-sp-card:hover .af-sp-name { color: #fff; }

        .af-sp-detail {
          font-family: 'DM Sans', sans-serif;
          color: #4b5563; font-size: 11px; margin-top: 2px;
          transition: color 0.2s;
        }
        .af-sp-card:hover .af-sp-detail { color: #6b7280; }

        /* Bottom accent line */
        .af-sp-card-line {
          position: absolute; bottom: 0; left: 20%; right: 20%;
          height: 2px; border-radius: 2px 2px 0 0;
          background: var(--card-color);
          opacity: 0; transition: opacity 0.25s;
        }
        .af-sp-card:hover .af-sp-card-line { opacity: 0.6; }

        /* Bottom strip dot pulse */
        @keyframes af-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
        .af-sp-dot-pulse { animation: af-dot-pulse 2s ease-in-out infinite; }

        /* Badge */
        .af-sp-badge {
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          color: #22c55e;
          border-radius: 99px; padding: 4px 14px;
          font-size: 11.5px;
          font-family: 'DM Mono', monospace;
          font-weight: 500; letter-spacing: 0.5px;
        }
      `}</style>

      {/* Background */}
      <div className="af-sp-orb" style={{ width: 500, height: 500, top: '10%', left: '-120px', background: '#a78bfa' }} />
      <div className="af-sp-orb" style={{ width: 400, height: 400, bottom: '5%', right: '-80px', background: '#22c55e' }} />

      {/* Header */}
      <div className="af-sp-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
            <span style={{
              fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase',
              color: '#22c55e', fontFamily: "'DM Mono', monospace", fontWeight: 500,
            }}>Social Proof</span>
          </div>
          <div className="af-sp-badge">Designed after interviewing 50+ students</div>
        </div>

        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(30px, 4vw, 52px)',
          fontWeight: 800, letterSpacing: '-1.5px',
          color: '#f0f2f5', lineHeight: 1.05,
          marginBottom: '10px',
        }}>
          Built By Someone Who<br />
          <span style={{
            background: 'linear-gradient(90deg, #a78bfa, #38bdf8, #4ade80)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Gets It.</span>
        </h2>

        <p style={{
          color: '#4b5563', fontSize: '15px', maxWidth: '480px',
          lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif",
          fontStyle: 'italic', fontWeight: 300,
        }}>
          AdmitFlow was born from the real frustrations of Bangladeshi students navigating the study abroad process alone.
        </p>
      </div>

      {/* Row 1 — left */}
      <div className="af-sp-row af-sp-row-1" style={{ marginBottom: 16 }}>
        <div className="af-sp-track">
          {ROW1.map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>

      {/* Row 2 — right (reversed order for variety) */}
      <div className="af-sp-row af-sp-row-2">
        <div className="af-sp-track">
          {[...ROW1].reverse().map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{
        maxWidth: '1160px', margin: '44px auto 0',
        padding: '0 32px',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(56,189,248,0.04))',
          border: '1px solid rgba(34,197,94,0.18)',
          borderRadius: '16px', padding: '22px 32px',
          display: 'flex', alignItems: 'center', gap: '18px',
          backdropFilter: 'blur(6px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
            background: 'linear-gradient(180deg, #22c55e, #38bdf8)',
            borderRadius: '16px 0 0 16px',
          }} />
          <div className="af-sp-dot-pulse" style={{
            width: '9px', height: '9px', borderRadius: '50%',
            background: '#22c55e', flexShrink: 0, marginLeft: 8,
          }} />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>
            <strong style={{ color: '#e8eaf0', fontWeight: 700 }}>Real students. Real results.</strong>
            {' '}— AdmitFlow was shaped by 50+ interviews with students just like you.
          </div>
          <div style={{
            marginLeft: 'auto', flexShrink: 0,
            fontFamily: "'DM Mono', monospace", fontSize: '11px',
            color: '#22c55e', letterSpacing: '2px', opacity: 0.7,
          }}>50+ STORIES</div>
        </div>
      </div>
    </section>
  )
}

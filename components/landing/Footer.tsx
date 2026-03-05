'use client'

// Top university SVG logos rendered as text/shapes with opacity
// Using clean SVG text representations of well-known universities

const UNIVERSITIES = [
  { name: 'MIT',             abbr: 'MIT',    full: 'Massachusetts Institute of Technology' },
  { name: 'Stanford',        abbr: 'Stanford', full: 'Stanford University' },
  { name: 'Harvard',         abbr: 'Harvard', full: 'Harvard University' },
  { name: 'Oxford',          abbr: 'Oxford',  full: 'University of Oxford' },
  { name: 'Cambridge',       abbr: 'Cam.',    full: 'University of Cambridge' },
  { name: 'Toronto',         abbr: 'UofT',   full: 'University of Toronto' },
  { name: 'NUS',             abbr: 'NUS',    full: 'Natl. Univ. of Singapore' },
  { name: 'TU Munich',       abbr: 'TUM',    full: 'TU Munich' },
  { name: 'Melbourne',       abbr: 'UoM',    full: 'Univ. of Melbourne' },
  { name: 'ETH Zürich',      abbr: 'ETH',    full: 'ETH Zürich' },
]

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/shahib4asan',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/shahib',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/shahibhasan0',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>,
  },
]

export default function Footer() {
  return (
    <>
      {/* University logos strip */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080a0f', padding: '52px 32px', position: 'relative', overflow: 'hidden' }}>
        {/* Hero bg grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.08, width: 400, height: 400, bottom: -200, left: '20%', background: '#22c55e', pointerEvents: 'none' }} />
        <style suppressHydrationWarning>{`
        .af-uni-strip-label{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:3.5px;text-transform:uppercase;color:#22c55e;text-align:center;margin-bottom:28px;display:flex;align-items:center;justify-content:center;gap:10px}
          .af-uni-strip-label::before,.af-uni-strip-label::after{content:'';display:block;width:28px;height:1px;background:#22c55e;opacity:0.7}
          .af-uni-logos{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:0}
          .af-uni-logo-item{display:flex;flex-direction:column;align-items:center;gap:5px;padding:14px 22px;opacity:0.15;transition:opacity 0.2s ease,transform 0.2s ease;cursor:default;border-right:1px solid rgba(255,255,255,0.05);backdrop-filter:blur(4px)}
          .af-uni-logo-item:last-child{border-right:none}
          .af-uni-logo-item:hover{opacity:0.4;transform:translateY(-2px)}
          .af-uni-abbr{font-family:'DM Sans',sans-serif;font-size:17px;font-weight:800;color:#fff;letter-spacing:-0.5px;line-height:1}
          .af-uni-full{font-family:'DM Mono',monospace;font-size:9px;color:#9ca3af;text-align:center;white-space:nowrap;letter-spacing:0.5px}
          .af-footer-inner{max-width:1120px;margin:0 auto;padding:0 0 28px}
          .af-footer-top{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:32px;padding-bottom:28px;border-bottom:1px solid rgba(255,255,255,0.06)}
          .af-footer-logo{font-family:'DM Sans',sans-serif;font-weight:700;font-size:16px;color:#f0f2f5;display:flex;align-items:center;gap:9px;text-decoration:none}
          .af-footer-logo-svg{border-radius:22%;flex-shrink:0}
          .af-footer-nav-link{font-family:'DM Sans',sans-serif;font-size:13px;color:#4b5563;text-decoration:none;padding:5px 12px;border-radius:99px;transition:color 0.12s ease}
          .af-footer-nav-link:hover{color:#d1d5db}
          .af-social-btn{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);color:#4b5563;text-decoration:none;transition:color 0.12s ease,background 0.12s ease,border-color 0.12s ease,transform 0.15s ease;backdrop-filter:blur(4px)}
          .af-social-btn:hover{color:#f0f2f5;background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.15);transform:translateY(-2px)}
          .af-footer-bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding-top:20px}
        `}</style>

        <p className="af-uni-strip-label">Trusted by students targeting the world's top universities</p>
        <div className="af-uni-logos">
          {UNIVERSITIES.map((u) => (
            <div key={u.name} className="af-uni-logo-item">
              <span className="af-uni-abbr">{u.abbr}</span>
              <span className="af-uni-full">{u.full}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#080a0f', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '0 32px' }}>
        <div className="af-footer-inner">
          <div className="af-footer-top" style={{ paddingTop: '36px' }}>
            {/* Brand */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="/" className="af-footer-logo">
                <svg className="af-footer-logo-svg" width="28" height="28" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ft-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0f1612"/><stop offset="100%" stopColor="#0c0d0f"/>
                    </linearGradient>
                    <linearGradient id="ft-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e"/><stop offset="100%" stopColor="#4ade80"/>
                    </linearGradient>
                  </defs>
                  <rect width="512" height="512" rx="112" fill="url(#ft-bg)"/>
                  <path d="M148 370 L256 130 L364 370" stroke="url(#ft-stroke)" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <line x1="188" y1="280" x2="324" y2="280" stroke="url(#ft-stroke)" strokeWidth="36" strokeLinecap="round"/>
                  <circle cx="256" cy="130" r="34" fill="#22c55e"/>
                </svg>
                AdmitFlow
              </a>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: '#4b5563', lineHeight: 1.7, maxWidth: '260px', fontStyle: 'italic', fontWeight: 300 }}>
                The all-in-one application tracker built for Bangladeshi students going abroad.
              </p>
            </div>

            {/* Right col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {[['Features','#features'],['How it works','#how'],['Pricing','#pricing'],['FAQ','#faq']].map(([l,h]) => (
                  <a key={l} href={h} className="af-footer-nav-link">{l}</a>
                ))}
                <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.08)', alignSelf: 'center', margin: '0 6px' }} />
                {[['Privacy','#'],['Terms','#']].map(([l,h]) => (
                  <a key={l} href={h} className="af-footer-nav-link">{l}</a>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="af-social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="af-footer-bottom">
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', color: '#374151', letterSpacing: '0.5px' }}>© 2026 AdmitFlow. All rights reserved.</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', color: '#374151', display: 'flex', alignItems: 'center', gap: '5px', letterSpacing: '0.5px' }}>
              Developed by <span style={{ color: '#22c55e', fontWeight: 600 }}>Shahib Hasan</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

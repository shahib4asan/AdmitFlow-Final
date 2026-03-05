'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'FAQ',      href: '#faq'      },
]

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
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="nb-glow-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle inner background glow */}
        <radialGradient id="nb-inner-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="512" height="512" rx="112" fill="url(#nb-bg)" />
      {/* Inner radial glow on bg */}
      <rect width="512" height="512" rx="112" fill="url(#nb-inner-glow)" />

      {/* A-shape — thicker, with glow filter */}
      <g filter="url(#nb-glow)">
        <path
          d="M140 385 L256 118 L372 385"
          stroke="url(#nb-stroke)"
          strokeWidth="46"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Crossbar */}
        <line
          x1="183" y1="285"
          x2="329" y2="285"
          stroke="url(#nb-stroke)"
          strokeWidth="40"
          strokeLinecap="round"
        />
      </g>

      {/* Apex dot — bright, crisp, with its own tight glow */}
      <circle cx="256" cy="118" r="30" fill="#4ade80" filter="url(#nb-glow-soft)" />
      <circle cx="256" cy="118" r="18" fill="#fff" opacity="0.9" />
    </svg>
  )
}

export default function Navbar() {
  const navRef       = useRef<HTMLElement>(null)
  const pillRef      = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(-1)

  function movePill(el: HTMLElement, instant = false) {
    const pill = pillRef.current
    const nav  = navRef.current
    if (!pill || !nav) return
    const nr = nav.getBoundingClientRect()
    const er = el.getBoundingClientRect()
    pill.style.transition = instant ? 'none' : 'width 0.18s ease, height 0.18s ease, left 0.18s ease, top 0.18s ease'
    pill.style.width  = er.width  + 'px'
    pill.style.height = er.height + 'px'
    pill.style.left   = (er.left - nr.left) + 'px'
    pill.style.top    = (er.top  - nr.top)  + 'px'
    if (instant) requestAnimationFrame(() => {
      if (pill) pill.style.transition = 'width 0.18s ease, height 0.18s ease, left 0.18s ease, top 0.18s ease'
    })
  }

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const links = Array.from(nav.querySelectorAll<HTMLElement>('.af-nav-link'))
    if (links[active]) movePill(links[active], true)
  }, [active])

  useEffect(() => {
    const nav       = navRef.current
    const spotlight = spotlightRef.current
    if (!nav || !spotlight) return

    const onMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect()
      spotlight.style.left    = `${e.clientX - rect.left}px`
      spotlight.style.top     = `${e.clientY - rect.top}px`
      spotlight.style.opacity = '1'
    }
    const onLeave = () => { spotlight.style.opacity = '0' }

    nav.addEventListener('mousemove', onMove)
    nav.addEventListener('mouseleave', onLeave)
    return () => {
      nav.removeEventListener('mousemove', onMove)
      nav.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const links = Array.from(nav.querySelectorAll<HTMLElement>('.af-nav-link'))
    const cleanups: (() => void)[] = []

    links.forEach((link) => {
      const onMove = (e: MouseEvent) => {
        const rect = link.getBoundingClientRect()
        const dx = (e.clientX - (rect.left + rect.width  / 2)) * 0.3
        const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.3
        link.style.transform = `translate(${dx}px, ${dy}px)`
      }
      const onLeave = () => { link.style.transform = 'translate(0, 0)' }
      link.addEventListener('mousemove', onMove)
      link.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        link.removeEventListener('mousemove', onMove)
        link.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <>
      <style suppressHydrationWarning>{`
        .af-navbar-outer{position:fixed;top:20px;left:0;right:0;display:flex;justify-content:center;z-index:200;pointer-events:none}
        .af-navbar{pointer-events:all;position:relative;display:flex;align-items:center;gap:2px;background:rgba(11,13,16,0.9);backdrop-filter:blur(24px) saturate(200%);-webkit-backdrop-filter:blur(24px) saturate(200%);border:1px solid rgba(255,255,255,0.1);border-radius:99px;box-shadow:0 8px 40px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.06);transition:padding 0.35s cubic-bezier(0.4,0,0.2,1),width 0.35s cubic-bezier(0.4,0,0.2,1),height 0.35s cubic-bezier(0.4,0,0.2,1);overflow:hidden}
        .af-navbar.expanded{padding:5px 6px}
        /* Collapsed = pill just big enough to hold the logo */
        .af-navbar.collapsed{padding:10px 12px;width:auto;height:auto}

        .af-nav-spotlight{position:absolute;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(34,197,94,0.11) 0%,transparent 68%);transform:translate(-50%,-50%);pointer-events:none;transition:opacity 0.3s ease;opacity:0;z-index:0}

        #af-nav-pill{position:absolute;background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.11);border-radius:99px;pointer-events:none;transition:opacity 0.2s ease;z-index:1}
        .af-navbar.collapsed #af-nav-pill{opacity:0}

        /* Logo */
        .af-nav-logo{display:flex;align-items:center;gap:9px;text-decoration:none;flex-shrink:0;position:relative;z-index:2;transition:padding 0.35s cubic-bezier(0.4,0,0.2,1),margin 0.35s cubic-bezier(0.4,0,0.2,1),border-color 0.3s ease}
        .af-navbar.expanded .af-nav-logo{padding:3px 14px 3px 4px;margin-right:4px;border-right:1px solid rgba(255,255,255,0.08)}
        .af-navbar.collapsed .af-nav-logo{padding:0;margin:0;border-right:none}

        /* Logo icon wrapper */
        .af-nav-logo-icon{position:relative;display:flex;align-items:center;justify-content:center;transition:background 0.35s ease,box-shadow 0.35s ease,border-radius 0.35s ease,padding 0.35s cubic-bezier(0.4,0,0.2,1)}
        .af-navbar.expanded .af-nav-logo-icon{background:transparent;box-shadow:none;border-radius:0;padding:0}
        /* Rounded-rect bg matching SVG shape */
        .af-navbar.collapsed .af-nav-logo-icon{background:rgba(34,197,94,0.1);box-shadow:0 0 0 1px rgba(34,197,94,0.3),0 0 20px rgba(34,197,94,0.4);border-radius:28%;padding:7px}

        /* Glowing halo */
        .af-nav-logo-icon::before{content:'';position:absolute;inset:-8px;border-radius:50%;background:radial-gradient(circle, rgba(34,197,94,0.7) 0%, rgba(34,197,94,0.3) 35%, transparent 70%);filter:blur(8px);animation:af-logo-pulse 2.4s ease-in-out infinite;pointer-events:none;z-index:-1}
        .af-nav-logo-icon::after{content:'';position:absolute;inset:-14px;border-radius:50%;background:radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 65%);filter:blur(12px);animation:af-logo-pulse 2.4s ease-in-out infinite 0.4s;pointer-events:none;z-index:-1}
        @keyframes af-logo-pulse{0%,100%{opacity:0.6;transform:scale(0.95)}50%{opacity:1;transform:scale(1.15)}}

        .af-nav-logo-text{font-family:'Sora',sans-serif;font-size:14px;font-weight:700;color:#f0f2f5;letter-spacing:-0.3px;white-space:nowrap;overflow:hidden;transition:opacity 0.25s ease,max-width 0.35s cubic-bezier(0.4,0,0.2,1)}
        .af-navbar.expanded .af-nav-logo-text{opacity:1;max-width:120px}
        .af-navbar.collapsed .af-nav-logo-text{opacity:0;max-width:0}

        .af-nav-link{position:relative;z-index:2;font-size:13.5px;font-weight:500;color:#6b7280;border-radius:99px;white-space:nowrap;text-decoration:none;cursor:pointer;
          transition:color 0.15s ease,opacity 0.25s ease,max-width 0.35s cubic-bezier(0.4,0,0.2,1),padding 0.35s cubic-bezier(0.4,0,0.2,1),transform 0.18s cubic-bezier(0.22,1,0.36,1),background 0.15s ease,box-shadow 0.15s ease}
        .af-nav-link.active{color:#f0f2f5;font-weight:600}
        .af-navbar.expanded .af-nav-link{opacity:1;max-width:160px;padding:7px 14px}
        .af-navbar.collapsed .af-nav-link{opacity:0;max-width:0;padding:7px 0;pointer-events:none}

        .af-nav-link::after{content:'';position:absolute;bottom:5px;left:50%;transform:translateX(-50%);width:0;height:2px;background:#22c55e;border-radius:99px;box-shadow:0 0 7px rgba(34,197,94,0.9);transition:width 0.22s cubic-bezier(0.22,1,0.36,1)}
        .af-nav-link:hover{color:#f0f2f5;background:rgba(34,197,94,0.07);box-shadow:0 0 18px rgba(34,197,94,0.08)}
        .af-nav-link:hover::after{width:55%}

        /* CTA — changed to "Watch Demo" on the left side, "Start free" stays */
        .af-nav-cta{background:#22c55e;color:#071a0e;font-size:13px;font-weight:700;border-radius:99px;z-index:2;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center;gap:5px;position:relative;overflow:hidden;
          transition:opacity 0.25s ease,max-width 0.35s cubic-bezier(0.4,0,0.2,1),padding 0.35s cubic-bezier(0.4,0,0.2,1),margin 0.35s cubic-bezier(0.4,0,0.2,1),background 0.2s,box-shadow 0.2s,transform 0.15s cubic-bezier(0.22,1,0.36,1)}
        .af-navbar.expanded .af-nav-cta{opacity:1;max-width:160px;padding:7px 17px;margin-left:4px}
        .af-navbar.collapsed .af-nav-cta{opacity:0;max-width:0;padding:7px 0;margin-left:0;pointer-events:none}
        .af-nav-cta:hover{background:#4ade80;box-shadow:0 0 22px rgba(34,197,94,0.45);transform:translateY(-1px)}

        .af-nav-dashboard{background:transparent;color:#9ca3af;font-size:13px;font-weight:600;border-radius:99px;border:1px solid rgba(255,255,255,0.12);z-index:2;white-space:nowrap;text-decoration:none;display:inline-flex;align-items:center;gap:5px;position:relative;
          transition:opacity 0.25s ease,max-width 0.35s cubic-bezier(0.4,0,0.2,1),padding 0.35s cubic-bezier(0.4,0,0.2,1),margin 0.35s cubic-bezier(0.4,0,0.2,1),color 0.2s,border-color 0.2s,background 0.2s,transform 0.15s cubic-bezier(0.22,1,0.36,1)}
        .af-navbar.expanded .af-nav-dashboard{opacity:1;max-width:160px;padding:7px 14px;margin-left:2px}
        .af-navbar.collapsed .af-nav-dashboard{opacity:0;max-width:0;padding:7px 0;margin-left:0;pointer-events:none}
        .af-nav-dashboard:hover{color:#f0f2f5;border-color:rgba(255,255,255,0.25);background:rgba(255,255,255,0.05);transform:translateY(-1px)}

      `}</style>

      <div className="af-navbar-outer">
        <nav className="af-navbar expanded" ref={navRef}>
          <div className="af-nav-spotlight" ref={spotlightRef} />
          <div id="af-nav-pill" ref={pillRef} />

          <Link href="/" className="af-nav-logo">
            <div className="af-nav-logo-icon">
              <AdmitFlowLogo size={32} />
            </div>
            <span className="af-nav-logo-text">AdmitFlow</span>
          </Link>

          {LINKS.map((link, i) => (
            <a
              key={link.href}
              className={`af-nav-link${active === i ? ' active' : ''}`}
              href={link.href}
              onClick={() => setActive(i)}
              onMouseEnter={(e) => movePill(e.currentTarget)}
              onMouseLeave={() => {
                const nav = navRef.current
                if (!nav) return
                const links = Array.from(nav.querySelectorAll<HTMLElement>('.af-nav-link'))
                if (links[active]) movePill(links[active])
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Register */}
          <Link href="/auth/signup" className="af-nav-cta">Track Now →</Link>
        </nav>
      </div>
    </>
  )
}

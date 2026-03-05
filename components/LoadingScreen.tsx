'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [label, setLabel] = useState('Initializing...')

  useEffect(() => {
    const t1 = setTimeout(() => setLabel('Loading your data...'), 600)
    const t2 = setTimeout(() => setLabel('Almost ready...'), 1400)
    const t3 = setTimeout(() => setLabel('Welcome!'), 2000)
    const t4 = setTimeout(() => setHidden(true), 2400)
    const t5 = setTimeout(() => setRemoved(true), 3150)
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [])

  if (removed) return null

  return (
    <>
      <style>{`
        @keyframes af-breathe {
          0%, 100% { transform: scale(0.95); opacity: 0.7; }
          50%       { transform: scale(1.1);  opacity: 1; }
        }
        @keyframes af-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes af-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes af-spinR {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes af-iconPulse {
          0%,100% { box-shadow: 0 0 0 1px rgba(34,197,94,0.08), 0 0 20px rgba(34,197,94,0.1); }
          50%     { box-shadow: 0 0 0 1px rgba(34,197,94,0.2),  0 0 40px rgba(34,197,94,0.25); }
        }
        @keyframes af-load {
          0%   { width: 0%; }
          30%  { width: 35%; }
          60%  { width: 65%; }
          85%  { width: 85%; }
          100% { width: 100%; }
        }
        @keyframes af-dotPop {
          0%,100% { background: #1f2937; transform: scale(1); }
          50%     { background: #22c55e; transform: scale(1.4); box-shadow: 0 0 6px rgba(34,197,94,0.6); }
        }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: '#0c0d0f',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Sora', sans-serif",
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        opacity: hidden ? 0 : 1,
        transform: hidden ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: hidden ? 'none' : 'all',
      }}>
        {/* BG glow */}
        <div style={{
          position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)',
          animation: 'af-breathe 3s ease-in-out infinite', pointerEvents: 'none',
        }} />

        {/* Logo wrap */}
        <div style={{
          position: 'relative', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '28px',
          animation: 'af-fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          {/* Ring wrap */}
          <div style={{ position: 'relative', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Outer spinning arc */}
            <div style={{ position: 'absolute', inset: 0, animation: 'af-spin 1.6s linear infinite' }}>
              <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="af-arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#22c55e" stopOpacity="0" />
                    <stop offset="60%"  stopColor="#22c55e" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#4ade80" />
                  </linearGradient>
                </defs>
                <circle cx="70" cy="70" r="64" stroke="rgba(34,197,94,0.08)" strokeWidth="1.5" />
                <path d="M70 6 A64 64 0 1 1 6 70"
                  stroke="url(#af-arcGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </div>

            {/* Inner slower reverse ring */}
            <div style={{ position: 'absolute', inset: 0, animation: 'af-spinR 3s linear infinite', opacity: 0.35 }}>
              <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <circle cx="70" cy="70" r="54" stroke="rgba(34,197,94,0.06)" strokeWidth="1" />
                <path d="M70 16 A54 54 0 0 1 124 70"
                  stroke="rgba(34,197,94,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>

            {/* Icon box */}
            <div style={{
              width: '80px', height: '80px', borderRadius: '20px',
              background: '#111316', border: '1px solid rgba(34,197,94,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'af-iconPulse 2.5s ease-in-out infinite',
            }}>
              <svg width="46" height="46" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="af-imark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#4ade80" />
                  </linearGradient>
                  <filter id="af-iglow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="10" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <path d="M148 370 L256 130 L364 370"
                  stroke="url(#af-imark)" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round"
                  fill="none" filter="url(#af-iglow)" />
                <line x1="188" y1="280" x2="324" y2="280"
                  stroke="url(#af-imark)" strokeWidth="32" strokeLinecap="round" filter="url(#af-iglow)" />
                <circle cx="256" cy="130" r="28" fill="#22c55e" filter="url(#af-iglow)" />
                <circle cx="256" cy="130" r="14" fill="#4ade80" />
              </svg>
            </div>
          </div>

          {/* Wordmark */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
            animation: 'af-fadeUp 0.8s 0.2s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.8px', color: '#f0f2f5', lineHeight: 1 }}>
              Admit<span style={{ color: '#22c55e' }}>Flow</span>
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#374151' }}>
              Track · Apply · Succeed
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '20px', width: '180px', animation: 'af-fadeUp 0.8s 0.35s cubic-bezier(0.16,1,0.3,1) both' }}>
            <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                borderRadius: '99px',
                boxShadow: '0 0 10px rgba(34,197,94,0.6)',
                animation: 'af-load 2.2s cubic-bezier(0.4,0,0.2,1) forwards',
              }} />
            </div>
            <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '11.5px', color: '#374151', fontWeight: 500, letterSpacing: '0.5px' }}>
              {label}
            </div>
          </div>
        </div>

        {/* Bottom dots */}
        <div style={{
          position: 'absolute', bottom: '40px',
          display: 'flex', gap: '6px',
          animation: 'af-fadeUp 0.8s 0.5s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: '5px', height: '5px', borderRadius: '50%', background: '#1f2937',
              animation: `af-dotPop 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }} />
          ))}
        </div>
      </div>
    </>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [wordIndex, setWordIndex] = useState(0)

  // Words with their line grouping and gradient flag
  const titleLines = [
    [{ w: 'Track', g: false }, { w: 'every', g: false }],
    [{ w: 'step',  g: true  }, { w: 'to',   g: false }, { w: 'your', g: true }],
    [{ w: 'dream', g: true  }, { w: 'uni.', g: false }],
  ]
  const allWords = titleLines.flat()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight * 1.1

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight * 1.1
    }
    window.addEventListener('resize', onResize)

    const COLS = Math.floor(W / 48)
    const ROWS = Math.floor(H / 48)
    const dots: { x: number; y: number; alpha: number; speed: number; phase: number }[] = []
    for (let r = 0; r <= ROWS; r++)
      for (let c = 0; c <= COLS; c++)
        dots.push({ x: c * 48, y: r * 48, alpha: Math.random() * 0.15 + 0.03, speed: Math.random() * 0.4 + 0.2, phase: Math.random() * Math.PI * 2 })

    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x: W * (0.1 + i * 0.2), y: H * (0.15 + Math.random() * 0.5),
      r: 140 + Math.random() * 180,
      dx: (Math.random() - 0.5) * 0.25, dy: (Math.random() - 0.5) * 0.18,
      hue: i % 2 === 0 ? 142 : 160,
    }))

    let raf: number
    let t = 0
    const draw = () => {
      t += 0.008
      ctx.clearRect(0, 0, W, H)
      orbs.forEach(orb => {
        orb.x += orb.dx; orb.y += orb.dy
        if (orb.x < -orb.r) orb.x = W + orb.r
        if (orb.x > W + orb.r) orb.x = -orb.r
        if (orb.y < -orb.r) orb.y = H + orb.r
        if (orb.y > H + orb.r) orb.y = -orb.r
        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
        g.addColorStop(0, `hsla(${orb.hue},80%,42%,0.06)`)
        g.addColorStop(1, `hsla(${orb.hue},80%,42%,0)`)
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2); ctx.fill()
      })
      dots.forEach(d => {
        const a = d.alpha * (0.5 + 0.5 * Math.sin(t * d.speed + d.phase))
        ctx.beginPath(); ctx.arc(d.x, d.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,197,94,${a})`; ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) return
    let i = 0
    const iv = setInterval(() => {
      i++
      setWordIndex(i)
      if (i >= allWords.length) clearInterval(iv)
    }, 100)
    return () => clearInterval(iv)
  }, [visible])

  const stats = [
    { num: '50+',  lbl: 'Students Helped',  color: '#4ade80', glow: 'rgba(74,222,128,0.35)' },
    { num: '6',    lbl: 'Countries Tracked', color: '#38bdf8', glow: 'rgba(56,189,248,0.35)' },
    { num: '100%', lbl: 'Free to Start',     color: '#a78bfa', glow: 'rgba(167,139,250,0.35)' },
  ]

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', background: '#080a0f' }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;0,9..40,800;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

        /* Word animation */
        @keyframes hword{from{opacity:0;transform:translateY(22px) skewY(3deg)}to{opacity:1;transform:translateY(0) skewY(0deg)}}
        .h-word{display:inline-block;opacity:0}
        .h-word.in{animation:hword 0.5s cubic-bezier(0.22,1,0.36,1) forwards}

        /* Reveal */
        .h-reveal{opacity:0;transform:translateY(24px);transition:opacity 0.8s cubic-bezier(0.22,1,0.36,1),transform 0.8s cubic-bezier(0.22,1,0.36,1)}
        .h-reveal.in{opacity:1;transform:translateY(0)}

        /* Eyebrow */
        .h-eyebrow{display:flex;align-items:center;gap:10px;margin-bottom:20px}
        .h-ey-line{width:28px;height:1px;background:#22c55e;opacity:0.7;flex-shrink:0}
        .h-ey-text{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:3.5px;text-transform:uppercase;color:#22c55e;font-weight:500;display:flex;align-items:center;gap:8px}
        .h-ey-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e;flex-shrink:0;animation:hblink 1.8s ease-in-out infinite}
        @keyframes hblink{0%,100%{opacity:1;box-shadow:0 0 8px #22c55e}50%{opacity:0.35;box-shadow:0 0 3px #22c55e}}

        /* Title */
        .h-title{font-family:'DM Sans',sans-serif;font-size:clamp(42px,5vw,70px);font-weight:800;letter-spacing:-2px;color:#f0f2f5;line-height:1.0;margin-bottom:8px}
        .h-tg{background:linear-gradient(90deg,#a78bfa,#38bdf8,#4ade80);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

        /* Subtitle */
        .h-sub{font-family:'DM Sans',sans-serif;font-size:15px;color:#4b5563;font-style:italic;font-weight:300;line-height:1.7;max-width:480px;margin-bottom:44px}

        /* Progress bar */
        @keyframes hbar{from{width:0}to{width:100%}}
        .h-bar-fill{height:100%;background:linear-gradient(90deg,#a78bfa,#38bdf8,#fb923c,#4ade80,#22c55e);border-radius:4px;animation:hbar 1.4s 0.5s cubic-bezier(.4,0,.2,1) both;width:0}

        /* CTAs */
        .h-cta-p{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:10px;background:#22c55e;color:#061a0c;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;text-decoration:none;transition:background 0.2s,transform 0.2s,box-shadow 0.2s}
        .h-cta-p:hover{background:#4ade80;transform:translateY(-2px);box-shadow:0 12px 36px rgba(34,197,94,0.3)}
        .h-cta-g{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:10px;background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.55);font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;text-decoration:none;backdrop-filter:blur(8px);transition:background 0.2s,border-color 0.2s,color 0.2s,transform 0.2s}
        .h-cta-g:hover{background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.18);color:#f0f2f5;transform:translateY(-2px)}

        /* Stat cards */
        .h-sc{position:relative;background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);border-radius:18px;padding:20px 18px 22px;flex:1;cursor:default;transition:border-color 0.25s,background 0.25s,transform 0.25s;backdrop-filter:blur(8px);overflow:hidden}
        .h-sc.hv{transform:translateY(-6px);background:rgba(255,255,255,0.055)}
        .h-sc-shim{position:absolute;inset:0;pointer-events:none;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.06) 50%,transparent 65%)}
        .h-sc-num{font-family:'DM Sans',sans-serif;font-size:32px;font-weight:800;letter-spacing:-1.5px;line-height:1;margin-bottom:5px}
        .h-sc-lbl{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#4b5563;font-weight:500}
        .h-sc-bar{position:absolute;bottom:0;left:20%;right:20%;height:2px;border-radius:2px 2px 0 0;transition:background 0.25s;opacity:0.7}

        /* Mockup */
        .h-mock{border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);background:#0b0e14;box-shadow:0 32px 80px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.06);position:relative}
        .h-mock:hover{border-color:rgba(34,197,94,0.2)}
        .h-mock-bar{height:34px;background:rgba(0,0,0,0.35);border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;padding:0 14px;gap:6px}
        .h-mock-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
        .h-mock-blabel{font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,0.18);margin-left:10px;letter-spacing:1px}
        .h-mock-row{display:flex;align-items:center;gap:9px;padding:9px 12px;border-bottom:1px solid rgba(255,255,255,0.04)}
        .h-mock-row:last-child{border-bottom:none}
        .h-rtrack{height:3px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden;flex:1}
        .h-rfill{height:100%;border-radius:99px}

        /* Float cards */
        .h-fc{position:absolute;border-radius:12px;background:rgba(9,12,18,0.95);border:1px solid rgba(255,255,255,0.09);backdrop-filter:blur(20px);padding:13px 16px;box-shadow:0 16px 48px rgba(0,0,0,0.5)}

        /* Float animations */
        @keyframes hfa{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-12px) rotate(-1.5deg)}}
        @keyframes hfb{0%,100%{transform:translateY(0) rotate(1.5deg)}50%{transform:translateY(-9px) rotate(1.5deg)}}

        /* Mockup entrance */
        @keyframes hmin{from{opacity:0;transform:translateY(36px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .h-mock-wrap{animation:hmin 1s 0.5s cubic-bezier(0.22,1,0.36,1) both}

        /* Float card entrances */
        @keyframes hfc1{from{opacity:0;transform:translateX(-20px) rotate(1.5deg)}to{opacity:1;transform:translateX(0) rotate(1.5deg)}}
        @keyframes hfc2{from{opacity:0;transform:translateX(20px) rotate(-1.5deg)}to{opacity:1;transform:translateX(0) rotate(-1.5deg)}}
        .h-fc1-in{animation:hfc1 0.7s 1.1s cubic-bezier(0.22,1,0.36,1) both}
        .h-fc2-in{animation:hfc2 0.7s 1.3s cubic-bezier(0.22,1,0.36,1) both}

        /* Bottom strip */
        .h-strip{background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(56,189,248,0.04));border:1px solid rgba(34,197,94,0.18);border-radius:16px;padding:22px 32px;display:flex;align-items:center;gap:18px;backdrop-filter:blur(6px);position:relative;overflow:hidden}
        .h-strip-bar{position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#22c55e,#38bdf8);border-radius:16px 0 0 16px}
        @keyframes hdp{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.6}}
        .h-dp{animation:hdp 2s ease-in-out infinite}

        @media(max-width:960px){.h-right{display:none!important}}
        @media(max-width:600px){.h-ctas{flex-direction:column!important}.h-stats{flex-direction:column!important}}
      `}</style>

      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, transparent 30%, #080a0f 100%)', pointerEvents: 'none' }} />

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1160px', margin: '0 auto', padding: '120px 40px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

        {/* ── LEFT ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

          {/* Eyebrow */}
          <div className={`h-eyebrow h-reveal${visible ? ' in' : ''}`} style={{ transitionDelay: '0ms' }}>
            <div className="h-ey-line" />
            <span className="h-ey-text">
              <span className="h-ey-dot" />
              Built for Bangladeshi students
            </span>
          </div>

          {/* Title */}
          <h1 className={`h-title h-reveal${visible ? ' in' : ''}`} style={{ transitionDelay: '80ms' }}>
            {(() => {
              let globalIdx = 0
              return titleLines.map((line, li) => (
                <span key={li} style={{ display: 'block' }}>
                  {line.map(({ w, g }) => {
                    const idx = globalIdx++
                    return (
                      <span
                        key={w}
                        className={`h-word${wordIndex > idx ? ' in' : ''}`}
                        style={{ marginRight: '0.22em' }}
                      >
                        {g ? <span className="h-tg">{w}</span> : w}
                      </span>
                    )
                  })}
                </span>
              ))
            })()}
          </h1>

          {/* Subtitle */}
          <p className={`h-sub h-reveal${visible ? ' in' : ''}`} style={{ transitionDelay: '160ms' }}>
            Deadlines, documents, costs, visa — AdmitFlow keeps your entire study abroad journey in one place.
          </p>

          {/* Progress bar */}
          <div className={`h-reveal${visible ? ' in' : ''}`} style={{ transitionDelay: '220ms', height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginBottom: 40, overflow: 'hidden', width: '100%' }}>
            <div className="h-bar-fill" />
          </div>

          {/* CTAs */}
          <div className={`h-ctas h-reveal${visible ? ' in' : ''}`} style={{ transitionDelay: '280ms', display: 'flex', gap: '12px', marginBottom: '44px', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="h-cta-p">Open Dashboard →</Link>
            <Link href="/track" className="h-cta-g">Track Progress</Link>
          </div>

          {/* Stat cards */}
          <div className={`h-stats h-reveal${visible ? ' in' : ''}`} style={{ transitionDelay: '360ms', display: 'flex', gap: '10px', width: '100%' }}>
            {stats.map((s, i) => {
              const isHov = hovered === i
              return (
                <div key={s.lbl} className={`h-sc${isHov ? ' hv' : ''}`}
                  style={{ borderColor: isHov ? `${s.color}50` : 'rgba(255,255,255,0.07)' }}
                  onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                  <div className="h-sc-shim" />
                  {isHov && <div style={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', width: 80, height: 80, borderRadius: '50%', background: s.color, filter: 'blur(28px)', opacity: 0.22, pointerEvents: 'none' }} />}
                  <div className="h-sc-num" style={{ color: isHov ? s.color : '#f0f2f5' }}>{s.num}</div>
                  <div className="h-sc-lbl">{s.lbl}</div>
                  <div className="h-sc-bar" style={{ background: isHov ? s.color : 'transparent' }} />
                </div>
              )
            })}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="h-right" style={{ position: 'relative', padding: '40px 32px' }}>

          {/* Glow blob behind mockup */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 420, height: 340, background: 'radial-gradient(ellipse, rgba(34,197,94,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

          {/* Mockup */}
          <div className="h-mock-wrap" style={{ position: 'relative', zIndex: 1, animation: 'hfa 6s ease-in-out infinite' }}>
            <div className="h-mock">
              {/* Shimmer */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.04) 50%,transparent 65%)', zIndex: 2 }} />

              {/* Title bar */}
              <div className="h-mock-bar">
                <div className="h-mock-dot" style={{ background: '#ff5f57' }} />
                <div className="h-mock-dot" style={{ background: '#febc2e' }} />
                <div className="h-mock-dot" style={{ background: '#28c840' }} />
                <span className="h-mock-blabel">AdmitFlow — Dashboard</span>
              </div>

              {/* Body */}
              <div style={{ padding: '16px 14px', display: 'flex', gap: '10px' }}>
                {/* Sidebar */}
                <div style={{ width: 36, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', paddingTop: 2 }}>
                  {['📊','🏛','📄','🧪','💳','🗺️'].map((ic, i) => (
                    <div key={i} style={{ width: 28, height: 28, borderRadius: 7, background: i === 0 ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, border: i === 0 ? '1px solid rgba(34,197,94,0.2)' : 'none' }}>{ic}</div>
                  ))}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Mini stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, marginBottom: 11 }}>
                    {[
                      { label: 'Universities', val: '3', color: '#22c55e' },
                      { label: 'Due Soon',     val: '2', color: '#f59e0b' },
                      { label: 'Missing Docs', val: '4', color: '#ef4444' },
                    ].map(s => (
                      <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 7, padding: '8px 9px' }}>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.val}</div>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 8, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.5px', marginTop: 3 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* University rows */}
                  {[
                    { name: 'Univ. of Toronto', flag: '🇨🇦', status: 'Submitted',   sc: '#8b5cf6', pct: 85 },
                    { name: 'TU Munich',         flag: '🇩🇪', status: 'In Progress', sc: '#38bdf8', pct: 55 },
                    { name: 'Univ. Melbourne',   flag: '🇦🇺', status: 'Not Started', sc: '#6b7280', pct: 15 },
                  ].map((u, i) => (
                    <div key={i} className="h-mock-row">
                      <span style={{ fontSize: 12, flexShrink: 0 }}>{u.flag}</span>
                      <span style={{ flex: 1, fontSize: 10, color: 'rgba(255,255,255,0.65)', fontFamily: "'DM Sans',sans-serif", fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</span>
                      <div className="h-rtrack"><div className="h-rfill" style={{ width: `${u.pct}%`, background: u.pct > 70 ? '#22c55e' : u.pct > 40 ? '#38bdf8' : '#6b7280' }} /></div>
                      <span style={{ fontSize: 8, fontFamily: "'DM Mono',monospace", color: u.sc, background: u.sc + '1a', padding: '2px 6px', borderRadius: 99, whiteSpace: 'nowrap', marginLeft: 4 }}>{u.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Float card — deadline (bottom-left of mockup) */}
            <div className={`h-fc h-fc1-in`} style={{ bottom: '-20px', left: '-28px', animation: 'hfb 5s 0.5s ease-in-out infinite', borderColor: 'rgba(251,191,36,0.2)', minWidth: 172 }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(251,191,36,0.6)', marginBottom: 7 }}>Next Deadline</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, color: '#f0f2f5', marginBottom: 4 }}>UoT Application</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 6px #f59e0b', flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>8 days left</span>
              </div>
            </div>

            {/* Float card — IELTS (top-right of mockup) */}
            <div className={`h-fc h-fc2-in`} style={{ top: '-20px', right: '-28px', animation: 'hfa 7s 1s ease-in-out infinite', borderColor: 'rgba(74,222,128,0.2)', minWidth: 148 }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(74,222,128,0.6)', marginBottom: 7 }}>IELTS Score</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 28, fontWeight: 800, color: '#4ade80', letterSpacing: '-1px', lineHeight: 1 }}>7.5</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontStyle: 'italic', fontWeight: 300, color: '#4b5563', marginTop: 4 }}>Target met ✓</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1160px', margin: '0 auto', padding: '0 40px 80px' }}>
        <div className="h-strip">
          <div className="h-strip-bar" />
          <div className="h-dp" style={{ width: 9, height: 9, borderRadius: '50%', background: '#22c55e', flexShrink: 0, marginLeft: 8 }} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
            <strong style={{ color: '#e8eaf0', fontWeight: 700 }}>AdmitFlow tracks every stage</strong>
            {' '}— deadlines, documents, costs, and visa steps, all in one place.
          </div>
          <div style={{ marginLeft: 'auto', flexShrink: 0, fontFamily: "'DM Mono',monospace", fontSize: 11, color: '#22c55e', letterSpacing: '2px', opacity: 0.7 }}>6 STEPS</div>
        </div>
      </div>
    </section>
  )
}

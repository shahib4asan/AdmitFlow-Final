'use client'
import { useEffect, useRef, useState } from 'react'

// ─────────────────────────────────── CTA ───────────────────────────────────
const PLACEHOLDER_EMAIL = 'shahibhasan@gmail.com'

export function CTA() {
  const [inputVal, setInputVal] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let idx = 0, phase: 'typing'|'pause'|'erasing' = 'typing'
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (phase==='typing'){ idx++; setPlaceholder(PLACEHOLDER_EMAIL.slice(0,idx)); if(idx===PLACEHOLDER_EMAIL.length){phase='pause';timer=setTimeout(tick,2200)}else timer=setTimeout(tick,60) }
      else if(phase==='pause'){phase='erasing';timer=setTimeout(tick,30)}
      else{idx--;setPlaceholder(PLACEHOLDER_EMAIL.slice(0,idx));if(idx===0){phase='typing';timer=setTimeout(tick,240)}else timer=setTimeout(tick,30)}
    }
    timer=setTimeout(tick,900); return()=>clearTimeout(timer)
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if(!inputVal.trim()||status==='loading')return
    setStatus('loading'); await new Promise(r=>setTimeout(r,1200)); setStatus('success')
  }

  return (
    <div style={{ padding:'100px 32px', textAlign:'center', background:'transparent', position:'relative', overflow:'hidden' }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,600;0,9..40,800;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        .cta-orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;opacity:0.14;}
        .cta-box{max-width:640px;margin:0 auto;padding:56px 44px;background:rgba(255,255,255,0.035);border-radius:24px;border:1px solid rgba(34,197,94,0.2);box-shadow:0 0 60px rgba(34,197,94,0.06);backdrop-filter:blur(12px);position:relative;overflow:hidden;}
        .cta-box::before{content:'';position:absolute;top:0;left:15%;right:15%;height:2px;background:linear-gradient(90deg,transparent,#22c55e,transparent);}
        .cta-input{flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 16px;font-size:13.5px;color:#f0f2f5;outline:none;transition:border-color .2s,box-shadow .2s;min-width:0;font-family:'DM Sans',sans-serif;}
        .cta-input::placeholder{color:#374151;}
        .cta-input:focus{border-color:rgba(34,197,94,0.45);box-shadow:0 0 0 3px rgba(34,197,94,0.08);}
        .cta-btn{background:#22c55e;color:#071a0e;padding:12px 22px;border-radius:10px;font-size:13.5px;font-weight:700;border:none;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;transition:background .15s,box-shadow .15s,transform .1s;flex-shrink:0;font-family:'DM Sans',sans-serif;}
        .cta-btn:hover:not(:disabled){background:#4ade80;box-shadow:0 0 24px rgba(34,197,94,0.4);transform:translateY(-1px);}
        .cta-btn:disabled{opacity:0.6;cursor:not-allowed;}
        @keyframes cta-spin{to{transform:rotate(360deg)}}
        .cta-spinner{width:14px;height:14px;border:2px solid rgba(7,26,14,0.3);border-top-color:#071a0e;border-radius:50%;animation:cta-spin .7s linear infinite;}
        @keyframes cta-pop{0%{transform:scale(0.8);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
        .cta-success{animation:cta-pop .45s cubic-bezier(0.22,1,0.36,1) forwards;}
        @keyframes cta-dot-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.6}}
        .cta-dot-pulse{animation:cta-dot-pulse 2s ease-in-out infinite;}
        @media(max-width:500px){.cta-form{flex-direction:column!important}.cta-btn{width:100%;justify-content:center;}}
      `}</style>

      <div className="cta-orb" style={{width:500,height:500,top:-200,left:'50%',transform:'translateX(-50%)',background:'#22c55e'}} />

      <div className="cta-box">
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.25)',borderRadius:'99px',padding:'4px 14px',fontSize:'11.5px',fontFamily:"'DM Mono',monospace",color:'#4ade80',marginBottom:20,letterSpacing:'0.5px'}}>
          <div className="cta-dot-pulse" style={{width:6,height:6,borderRadius:'50%',background:'#4ade80'}} />
          Early Access — Limited Spots
        </div>

        <h2 style={{fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(28px,4vw,44px)',fontWeight:800,letterSpacing:'-1.5px',color:'#f0f2f5',marginBottom:12,lineHeight:1.05}}>
          Start tracking today.<br />
          <span style={{background:'linear-gradient(90deg,#4ade80,#38bdf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Get in tomorrow.</span>
        </h2>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'15px',color:'#4b5563',marginBottom:32,fontWeight:300,fontStyle:'italic'}}>
          Join the waitlist and get free lifetime access when we launch.
        </p>

        {status==='success' ? (
          <div className="cta-success" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
            <div style={{width:52,height:52,borderRadius:'50%',background:'rgba(34,197,94,0.15)',border:'1px solid rgba(34,197,94,0.3)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p style={{fontFamily:"'DM Sans',sans-serif",color:'#4ade80',fontWeight:700,fontSize:'16px'}}>You're on the list! 🎉</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",color:'#4b5563',fontSize:'13px'}}>We'll email you the moment we launch.</p>
          </div>
        ):(
          <form className="cta-form" style={{display:'flex',gap:8,width:'100%',maxWidth:420,margin:'0 auto'}} onSubmit={handleSubmit}>
            <input ref={inputRef} className="cta-input" type="email" value={inputVal} onChange={e=>setInputVal(e.target.value)} placeholder={placeholder} required disabled={status==='loading'} />
            <button className="cta-btn" type="submit" disabled={status==='loading'}>
              {status==='loading'?<><div className="cta-spinner"/>Joining…</>:<>Get access →</>}
            </button>
          </form>
        )}

        <p style={{marginTop:14,fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#374151',letterSpacing:'0.5px'}}>🔒 No spam. Unsubscribe any time.</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────── FAQ ───────────────────────────────────
const FAQ_DATA = [
  { q:'Is AdmitFlow only for Bangladeshi students?', a:"AdmitFlow is designed with Bangladeshi students in mind — local pricing, Bengali-friendly UX, and focus on programs popular in Bangladesh. But anyone applying abroad can use it!" },
  { q:'Can I track multiple countries?', a:"Yes! You can add universities from any country — USA, Canada, Germany, Australia, Singapore, UK, and more. No limits on countries." },
  { q:"What happens if I miss the free plan limit?", a:"On the free plan, you can track up to 3 universities. Once you hit the limit, you'll be prompted to upgrade to Premium for unlimited entries." },
  { q:"Will I actually receive deadline reminders?", a:"Yes! Premium users get automated email reminders 7 days and 2 days before each university's deadline." },
  { q:"Is my data safe?", a:"Your data is encrypted and stored securely in Neon (Postgres). Only you can access your own information." },
]

export function FAQ() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section id="faq" style={{padding:'100px 32px',background:'transparent',position:'relative',overflow:'hidden'}}>
      <style suppressHydrationWarning>{`
        .faq-item{border-bottom:1px solid rgba(255,255,255,0.07);transition:border-color .2s;}
        .faq-item.open{border-color:rgba(34,197,94,0.25);}
        .faq-trigger{display:flex;justify-content:space-between;align-items:center;padding:18px 0;cursor:pointer;gap:16px;user-select:none;}
        .faq-q{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;color:#d1d5db;flex:1;transition:color .2s;}
        .faq-item.open .faq-q{color:#22c55e;}
        .faq-icon{width:24px;height:24px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#6b7280;font-size:15px;transition:background .2s,border-color .2s,transform .2s,color .2s;}
        .faq-item.open .faq-icon{background:rgba(34,197,94,0.12);border-color:rgba(34,197,94,0.35);color:#22c55e;transform:rotate(45deg);}
        .faq-body{font-family:'DM Sans',sans-serif;font-size:13.5px;color:#4b5563;line-height:1.75;overflow:hidden;transition:max-height .25s ease,padding-bottom .25s ease;font-weight:300;}
      `}</style>

      <div style={{maxWidth:'1160px',margin:'0 auto',position:'relative'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
          <div style={{width:28,height:1,background:'#22c55e',opacity:0.7}} />
          <span style={{fontSize:'11px',letterSpacing:'3.5px',textTransform:'uppercase',color:'#22c55e',fontFamily:"'DM Mono',monospace",fontWeight:500}}>FAQ</span>
        </div>
        <h2 style={{fontFamily:"'DM Sans',sans-serif",fontSize:'clamp(30px,4vw,52px)',fontWeight:800,letterSpacing:'-1.5px',color:'#f0f2f5',marginBottom:10,lineHeight:1.05}}>
          Common<br />
          <span style={{background:'linear-gradient(90deg,#4ade80,#38bdf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>questions.</span>
        </h2>
        <div style={{height:'3px',background:'rgba(255,255,255,0.06)',borderRadius:4,margin:'40px 0 48px',overflow:'hidden'}}>
          <div style={{height:'100%',width:'60%',background:'linear-gradient(90deg,#22c55e,#38bdf8)',borderRadius:4}} />
        </div>

        <div style={{maxWidth:720}}>
          {FAQ_DATA.map((item,i)=>(
            <div key={i} className={`faq-item${open===i?' open':''}`}>
              <div className="faq-trigger" onClick={()=>setOpen(open===i?null:i)}>
                <span className="faq-q">{item.q}</span>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-body" style={{maxHeight:open===i?'200px':'0',paddingBottom:open===i?'18px':'0'}}>{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────── Footer ───────────────────────────────────
const UNIVERSITIES = [
  {abbr:'MIT',   full:'Massachusetts Inst. of Technology'},
  {abbr:'Stanford', full:'Stanford University'},
  {abbr:'Harvard', full:'Harvard University'},
  {abbr:'Oxford', full:'University of Oxford'},
  {abbr:'Cam.', full:'University of Cambridge'},
  {abbr:'UofT', full:'University of Toronto'},
  {abbr:'NUS', full:'Natl. Univ. of Singapore'},
  {abbr:'TUM', full:'TU Munich'},
  {abbr:'UoM', full:'Univ. of Melbourne'},
  {abbr:'ETH', full:'ETH Zürich'},
]
const SOCIALS = [
  {label:'GitHub',   href:'https://github.com/shahib4asan',   icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> },
  {label:'LinkedIn', href:'https://www.linkedin.com/shahib', icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  {label:'Facebook',href:'https://facebook.com/shahibhasan0',icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg> },
]

export function Footer() {
  return (
    <>
      <style suppressHydrationWarning>{`
        .ft-uni-item{display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 24px;opacity:0.18;transition:opacity .2s;cursor:default;border-right:1px solid rgba(255,255,255,0.05);}
        .ft-uni-item:last-child{border-right:none;}
        .ft-uni-item:hover{opacity:0.38;}
        .ft-social-btn{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#6b7280;text-decoration:none;transition:color .15s,background .15s,border-color .15s;}
        .ft-social-btn:hover{color:#f0f2f5;background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15);}
        .ft-nav-link{font-size:13px;color:#6b7280;text-decoration:none;padding:5px 12px;border-radius:99px;transition:color .15s;font-family:'DM Sans',sans-serif;}
        .ft-nav-link:hover{color:#d1d5db;}
      `}</style>

      {/* University strip */}
      <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',background:'transparent',padding:'44px 32px'}}>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:'10px',fontWeight:500,color:'#374151',letterSpacing:'2.5px',textTransform:'uppercase',textAlign:'center',marginBottom:28}}>
          Trusted by students targeting the world's top universities
        </p>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',gap:0,maxWidth:'1160px',margin:'0 auto'}}>
          {UNIVERSITIES.map(u=>(
            <div key={u.abbr} className="ft-uni-item">
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'17px',fontWeight:800,color:'#fff',letterSpacing:'-0.5px',lineHeight:1}}>{u.abbr}</span>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:'9px',color:'#9ca3af',textAlign:'center',whiteSpace:'nowrap'}}>{u.full}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{background:'transparent',borderTop:'1px solid rgba(255,255,255,0.06)',padding:'0 32px'}}>
        <div style={{maxWidth:'1160px',margin:'0 auto',paddingBottom:28}}>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:32,paddingTop:36,paddingBottom:28,borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            {/* Brand */}
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <a href="/" style={{display:'flex',alignItems:'center',gap:9,textDecoration:'none'}}>
                <svg width="28" height="28" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style={{borderRadius:'22%'}}>
                  <defs>
                    <linearGradient id="ft-bg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0f1612"/><stop offset="100%" stopColor="#0c0d0f"/></linearGradient>
                    <linearGradient id="ft-str" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22c55e"/><stop offset="100%" stopColor="#4ade80"/></linearGradient>
                  </defs>
                  <rect width="512" height="512" rx="112" fill="url(#ft-bg2)"/>
                  <path d="M148 370 L256 130 L364 370" stroke="url(#ft-str)" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <line x1="188" y1="280" x2="324" y2="280" stroke="url(#ft-str)" strokeWidth="36" strokeLinecap="round"/>
                  <circle cx="256" cy="130" r="34" fill="#22c55e"/>
                </svg>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:'15px',fontWeight:700,color:'#f0f2f5'}}>AdmitFlow</span>
              </a>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:'13px',color:'#374151',lineHeight:1.65,maxWidth:260,fontWeight:300}}>
                The all-in-one application tracker built for Bangladeshi students going abroad.
              </p>
            </div>

            {/* Right */}
            <div style={{display:'flex',flexDirection:'column',gap:16,alignItems:'flex-end'}}>
              <div style={{display:'flex',gap:2,flexWrap:'wrap',justifyContent:'flex-end'}}>
                {[['Features','#features'],['Pricing','#pricing'],['FAQ','#faq']].map(([l,h])=>(
                  <a key={l} href={h} className="ft-nav-link">{l}</a>
                ))}
                <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.08)',alignSelf:'center',margin:'0 6px'}} />
                {[['Privacy','#'],['Terms','#']].map(([l,h])=>(
                  <a key={l} href={h} className="ft-nav-link">{l}</a>
                ))}
              </div>
              <div style={{display:'flex',gap:6}}>
                {SOCIALS.map(s=>(
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ft-social-btn" aria-label={s.label}>{s.icon}</a>
                ))}
              </div>
            </div>
          </div>

          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12,paddingTop:20}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#374151',letterSpacing:'0.5px'}}>© 2026 AdmitFlow. All rights reserved.</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:'11px',color:'#374151',letterSpacing:'0.5px'}}>
              Developed by <span style={{color:'#22c55e',fontWeight:500}}>Shahib Hasan</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

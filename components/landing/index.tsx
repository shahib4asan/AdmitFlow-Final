'use client'
import { useState } from 'react'
import Link from 'next/link'

export function Timeline() {
  const steps = [
    { icon: '📝', label: 'IELTS / GRE', sub: 'Prep & sit your exams' },
    { icon: '🏛', label: 'Shortlist', sub: 'Pick your universities' },
    { icon: '📄', label: 'Apply', sub: 'Submit applications' },
    { icon: '🎉', label: 'Offer', sub: 'Receive decisions' },
    { icon: '🛂', label: 'Visa', sub: 'Complete visa process' },
    { icon: '✈️', label: 'Fly!', sub: 'Live your dream' },
  ]
  return (
    <section style={{ padding: '80px 48px', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>The Journey</div>
        <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '1px', marginBottom: '56px' }}>Your Entire Journey —<br />From IELTS to Visa.</div>

        {/* Timeline track */}
        <div style={{ position: 'relative' }}>
          {/* Connector line */}
          <div style={{ position: 'absolute', top: '28px', left: '40px', right: '40px', height: '2px', background: 'linear-gradient(90deg, var(--accent), #7c9fff)', borderRadius: '2px', zIndex: 0 }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', position: 'relative', zIndex: 1 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                {/* Circle node */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: i === steps.length - 1 ? 'var(--accent)' : 'white',
                  border: `2px solid ${i === steps.length - 1 ? 'var(--accent)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                  boxShadow: i === steps.length - 1 ? '0 4px 20px rgba(26,60,255,0.3)' : '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  {step.icon}
                </div>
                {/* Step number */}
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '2px', color: 'var(--accent)', textTransform: 'uppercase' }}>0{i + 1}</div>
                {/* Label */}
                <div style={{ fontWeight: '700', fontSize: '14px', textAlign: 'center', lineHeight: '1.3' }}>{step.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center', lineHeight: '1.4' }}>{step.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AdmitFlow tracks all of this */}
        <div style={{ marginTop: '48px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px 28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
          <div style={{ fontSize: '15px', color: 'var(--muted)' }}>
            <strong style={{ color: 'var(--ink)' }}>AdmitFlow tracks every stage</strong> — deadlines, documents, costs, and visa steps, all in one place.
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProblemSection() {
  const pains = [
    { icon: '❌', title: 'Deadlines Get Missed', desc: 'One slip and you are locked out for an entire admission cycle. There are no second chances.', color: '#f87171' },
    { icon: '❌', title: 'Documents Are Scattered', desc: 'SOP drafts in Google Drive, transcripts on email, LOR requests forgotten — chaos everywhere.', color: '#fb923c' },
    { icon: '❌', title: 'Costs Go Out of Control', desc: 'App fees, courier, IELTS re-sit, visa — small costs stack up fast and surprise you.', color: '#fbbf24' },
    { icon: '❌', title: 'Visa Process Feels Confusing', desc: 'After your offer letter, the visa maze begins. Without a checklist, it is easy to get lost.', color: '#f472b6' },
  ]
  return (
    <section style={{ padding: '100px 40px', background: '#080a0f', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%,black 30%,transparent 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.1, width: 400, height: 400, top: -100, right: -80, background: '#f87171', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 28, height: 1, background: '#f87171', opacity: 0.7 }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#f87171', fontWeight: 500 }}>The Problem</span>
        </div>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(30px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#f0f2f5', lineHeight: 1.05, marginBottom: '10px' }}>
          Applying Abroad Is<br />
          <span style={{ background: 'linear-gradient(90deg,#f87171,#fb923c,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Overwhelming.</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '15px', color: '#4b5563', marginBottom: '52px', fontStyle: 'italic', fontWeight: 300 }}>Four common ways students fail before they even begin.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '44px' }}>
          {pains.map((p, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.035)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '18px', alignItems: 'flex-start', backdropFilter: 'blur(8px)', position: 'relative', overflow: 'hidden', transition: 'border-color 0.25s,transform 0.25s' }}>
              <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: p.color, borderRadius: '2px 2px 0 0', opacity: 0.5 }} />
              <div style={{ width: '42px', height: '42px', background: `${p.color}14`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', flexShrink: 0, border: `1px solid ${p.color}30` }}>{p.icon}</div>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '15px', marginBottom: '7px', color: p.color }}>{p.title}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: '#4b5563', lineHeight: '1.7', fontStyle: 'italic', fontWeight: 300 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Hero bottom strip style */}
        <div style={{ background: 'linear-gradient(135deg,rgba(248,113,113,0.06),rgba(251,146,60,0.04))', border: '1px solid rgba(248,113,113,0.18)', borderRadius: '16px', padding: '22px 32px', display: 'flex', alignItems: 'center', gap: '18px', backdropFilter: 'blur(6px)', position: 'relative', overflow: 'hidden', flexWrap: 'wrap' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg,#f87171,#fb923c)', borderRadius: '16px 0 0 16px' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#f87171', boxShadow: '0 0 8px #f87171', marginLeft: 8, flexShrink: 0 }} />
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: '#6b7280', lineHeight: 1.6, flex: 1 }}>
            <strong style={{ color: '#e8eaf0', fontWeight: 700 }}>One missed deadline can delay your dream by a whole year.</strong>
          </div>
          <Link href="/auth/signup" style={{ background: '#22c55e', color: '#071a0e', padding: '11px 24px', borderRadius: '9px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Never Miss One →</Link>
        </div>
      </div>
    </section>
  )
}

export function SocialProof() {
  const testimonials = [
    { quote: 'I almost missed my Canada deadline before using AdmitFlow. The 7-day reminder saved me. Now I\'m at UBC.', name: 'Tasnim R.', detail: 'UBC Computer Science — Vancouver', avatar: '👩‍💻' },
    { quote: 'Everything was scattered across 6 spreadsheets. AdmitFlow replaced all of them. Simple, clean, and built for us.', name: 'Rafiul H.', detail: 'TU Munich MSc — Germany', avatar: '👨‍🎓' },
    { quote: 'The cost tracker alone was worth it. I finally knew how much I was spending before I ran out of budget.', name: 'Nadia K.', detail: 'University of Melbourne — Australia', avatar: '🧑‍💼' },
  ]
  return (
    <section style={{ padding: '100px 40px', background: '#080a0f', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.12, width: 500, height: 500, top: -200, left: -100, background: '#a78bfa', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.1, width: 400, height: 400, top: -100, right: -80, background: '#38bdf8', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#22c55e', fontWeight: 500 }}>Social Proof</span>
          <div style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', color: '#38bdf8', borderRadius: '100px', padding: '4px 14px', fontSize: '11px', fontFamily: "'DM Mono',monospace", letterSpacing: '1px' }}>
            Designed after interviewing 50+ students
          </div>
        </div>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(30px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#f0f2f5', lineHeight: 1.05, marginBottom: '10px' }}>
          Built By Someone Who<br />
          <span style={{ background: 'linear-gradient(90deg,#a78bfa,#38bdf8,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Gets It.</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '15px', color: '#4b5563', marginBottom: '52px', fontStyle: 'italic', fontWeight: 300, maxWidth: 500, lineHeight: 1.7 }}>
          AdmitFlow was born from the real frustrations of Bangladeshi students navigating the study abroad process alone.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', backdropFilter: 'blur(8px)', overflow: 'hidden', transition: 'border-color 0.25s,transform 0.25s' }}>
              <div style={{ fontFamily: 'Georgia,serif', fontSize: '56px', color: 'rgba(167,139,250,0.15)', lineHeight: 1, position: 'absolute', top: '12px', right: '20px' }}>"</div>
              <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: 'linear-gradient(90deg,#a78bfa,#38bdf8)', borderRadius: '2px 2px 0 0', opacity: 0.5 }} />
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.75', margin: 0, fontStyle: 'italic', fontWeight: 300 }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: '#f0f2f5', fontSize: '14px' }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", color: '#4b5563', fontSize: '10px', letterSpacing: '0.5px', marginTop: '2px' }}>{t.detail}</div>
                </div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(56,189,248,0.07)', border: '1px solid rgba(56,189,248,0.15)', color: 'rgba(56,189,248,0.6)', borderRadius: '6px', padding: '4px 10px', fontSize: '10px', fontFamily: "'DM Mono',monospace", letterSpacing: '1px', width: 'fit-content' }}>⏳ Future Student</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Features() {
  const items = [
    { icon: '🗓', title: 'Deadline Tracker', desc: 'Never lose track of application deadlines. Get email alerts 7 and 2 days before.', color: '#22c55e' },
    { icon: '📄', title: 'Document Checklist', desc: 'SOP, CV, IELTS, transcripts, LORs — track every required document per university.', color: '#38bdf8' },
    { icon: '🏛', title: 'University Manager', desc: 'Track status from Not Started to Accepted. Store portal links and program details.', color: '#a78bfa' },
    { icon: '💰', title: 'Cost Calculator', desc: 'Track app fees, IELTS cost, courier and visa fees. See your total spend in BDT.', color: '#fbbf24' },
    { icon: '✉️', title: 'Smart Reminders', desc: 'Automated email alerts before your deadlines. Never scramble at the last minute.', color: '#fb923c' },
    { icon: '📊', title: 'Exam Tracker', desc: 'Log your IELTS date, target score, achieved score, and GRE prep in one place.', color: '#f472b6' },
  ]
  return (
    <section id="features" style={{ padding: '100px 40px', background: '#080a0f', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,black 40%,transparent 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.1, width: 400, height: 400, top: -100, right: -80, background: '#22c55e', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#22c55e', fontWeight: 500 }}>Features</span>
        </div>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(30px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#f0f2f5', lineHeight: 1.05, marginBottom: '10px' }}>
          Everything You Need<br />
          <span style={{ background: 'linear-gradient(90deg,#a78bfa,#38bdf8,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>To Get In.</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '15px', color: '#4b5563', marginBottom: '52px', fontStyle: 'italic', fontWeight: 300 }}>Six tools. One platform. Zero stress.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {items.map(f => (
            <div key={f.title} style={{ background: 'rgba(255,255,255,0.035)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)', position: 'relative', overflow: 'hidden', transition: 'border-color 0.25s,transform 0.25s,background 0.25s' }}>
              <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: f.color, borderRadius: '2px 2px 0 0', opacity: 0.6 }} />
              <div style={{ width: '42px', height: '42px', background: `${f.color}14`, borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '16px', border: `1px solid ${f.color}30` }}>{f.icon}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: '#f0f2f5' }}>{f.title}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13.5px', color: '#4b5563', lineHeight: '1.7', fontStyle: 'italic', fontWeight: 300 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Pricing() {
  return (
    <section id="pricing" style={{ padding: '100px 40px', background: '#080a0f', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%,black 30%,transparent 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.12, width: 500, height: 500, top: -200, left: -100, background: '#22c55e', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#22c55e', fontWeight: 500 }}>Pricing</span>
          <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
        </div>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(30px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#f0f2f5', lineHeight: 1.05, marginBottom: '10px' }}>
          Bangladesh-Friendly
          <span style={{ background: 'linear-gradient(90deg,#22c55e,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Pricing.</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '15px', color: '#4b5563', marginBottom: '52px', fontStyle: 'italic', fontWeight: 300 }}>Start free. Upgrade when you're ready.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {/* Free */}
          <div style={{ background: 'rgba(255,255,255,0.035)', borderRadius: '20px', padding: '36px', border: '1px solid rgba(255,255,255,0.07)', textAlign: 'left', backdropFilter: 'blur(8px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px 2px 0 0' }} />
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#4b5563', marginBottom: '16px' }}>Free Plan</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '52px', fontWeight: 800, color: '#f0f2f5', letterSpacing: '-2px', lineHeight: 1 }}><span style={{ fontSize: '18px', verticalAlign: 'top', marginTop: '12px', display: 'inline-block' }}>৳</span>0</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", color: '#4b5563', fontSize: '13px', margin: '12px 0 24px', fontStyle: 'italic', fontWeight: 300 }}>Forever free, no credit card</div>
            {['Up to 3 universities', 'Deadline tracking', 'Document checklist', 'Basic reminders'].map((f, i) => (
              <div key={i} style={{ fontFamily: "'DM Sans',sans-serif", color: '#6b7280', fontSize: '13.5px', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: '#22c55e', fontSize: '12px' }}>✓</span>{f}
              </div>
            ))}
            <Link href="/auth/signup" style={{ display: 'block', width: '100%', marginTop: '28px', padding: '13px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', color: '#f0f2f5', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '14px', textAlign: 'center', textDecoration: 'none', transition: 'background 0.2s' }}>
              Get Started Free
            </Link>
          </div>
          {/* Premium */}
          <div style={{ background: 'rgba(34,197,94,0.08)', borderRadius: '20px', padding: '36px', border: '1px solid rgba(34,197,94,0.25)', textAlign: 'left', backdropFilter: 'blur(8px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg,#22c55e,#38bdf8)', borderRadius: '20px 0 0 20px' }} />
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', borderRadius: '6px', padding: '4px 12px', fontFamily: "'DM Mono',monospace", fontSize: '10px', letterSpacing: '1px', marginBottom: '12px' }}>🔥 EARLY BIRD</div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#4ade80', marginBottom: '12px' }}>Premium Plan</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '52px', fontWeight: 800, color: '#f0f2f5', letterSpacing: '-2px', lineHeight: 1 }}><span style={{ fontSize: '18px', verticalAlign: 'top', marginTop: '12px', display: 'inline-block' }}>৳</span>1,999</div>
              <div style={{ color: '#4b5563', textDecoration: 'line-through', fontSize: '22px', fontFamily: "'DM Sans',sans-serif" }}>2,499</div>
            </div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", color: '#4b5563', fontSize: '13px', margin: '12px 0 24px', fontStyle: 'italic', fontWeight: 300 }}>One-time payment, lifetime access</div>
            {['Unlimited universities', 'File uploads (SOP, CV, docs)', 'Advanced deadline reminders', 'Full cost tracker', 'Visa stage tracker (soon)', 'Priority support'].map((f, i) => (
              <div key={i} style={{ fontFamily: "'DM Sans',sans-serif", color: '#d1d5db', fontSize: '13.5px', padding: '9px 0', borderBottom: '1px solid rgba(34,197,94,0.1)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: '#22c55e', fontSize: '12px' }}>✓</span>{f}
              </div>
            ))}
            <Link href="/auth/signup" style={{ display: 'block', width: '100%', marginTop: '28px', padding: '13px', borderRadius: '10px', background: '#22c55e', color: '#071a0e', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: '14px', textAlign: 'center', textDecoration: 'none', transition: 'background 0.2s' }}>
              Get Premium Access
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const items = [
    { q: 'Is AdmitFlow only for Bangladeshi students?', a: 'AdmitFlow is designed with Bangladeshi students in mind — local pricing, and focus on programs popular from Bangladesh. But anyone applying abroad can use it!' },
    { q: 'Can I track multiple countries?', a: 'Yes! You can add universities from any country — USA, Canada, Germany, Australia, Singapore, UK, and more. No limits on countries.' },
    { q: 'What happens when I hit the free plan limit?', a: 'On the free plan you can track up to 3 universities. Once you hit the limit, you will be prompted to upgrade to Premium for unlimited entries.' },
    { q: 'Will I actually receive deadline reminders?', a: 'Yes! Premium users get automated email reminders 7 days and 2 days before each university deadline. Never miss one again.' },
    { q: 'Is my data safe?', a: 'Your data is encrypted and stored securely via Supabase. Row-level security ensures only you can access your own information.' },
  ]
  return (
    <section id="faq" style={{ padding: '100px 40px', background: '#080a0f', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%,black 30%,transparent 100%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#22c55e', fontWeight: 500 }}>FAQ</span>
        </div>
        <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(30px,4vw,48px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#f0f2f5', lineHeight: 1.05, marginBottom: '10px' }}>
          <span style={{ background: 'linear-gradient(90deg,#a78bfa,#38bdf8,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Common Questions.</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '15px', color: '#4b5563', marginBottom: '44px', fontStyle: 'italic', fontWeight: 300 }}>Everything you need to know.</p>
        {items.map((item, i) => (
          <div key={i} onClick={() => setOpen(open === i ? null : i)}
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '22px 0', cursor: 'pointer', transition: 'padding 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: '15px', color: open === i ? '#f0f2f5' : '#d1d5db' }}>
              {item.q}
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '18px', color: open === i ? '#22c55e' : '#4b5563', marginLeft: '16px', flexShrink: 0, transition: 'transform 0.2s,color 0.2s', display: 'inline-block', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </div>
            {open === i && <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: '#4b5563', lineHeight: '1.75', marginTop: '12px', fontStyle: 'italic', fontWeight: 300 }}>{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section style={{ padding: '100px 40px', background: '#080a0f', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(90px)', opacity: 0.12, width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#22c55e', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        {/* Hero strip style */}
        <div style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '24px', padding: '64px 48px', backdropFilter: 'blur(8px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg,#22c55e,#38bdf8)', borderRadius: '24px 0 0 24px' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', letterSpacing: '3.5px', textTransform: 'uppercase', color: '#22c55e', fontWeight: 500 }}>Get Started</span>
            <div style={{ width: 28, height: 1, background: '#22c55e', opacity: 0.7 }} />
          </div>
          <h2 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, color: '#f0f2f5', marginBottom: '14px' }}>
            Your Dream University<br />
            <span style={{ background: 'linear-gradient(90deg,#22c55e,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Awaits. Start Today.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", color: '#4b5563', marginBottom: '36px', fontSize: '15px', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.7 }}>Join Bangladeshi students who track their applications with AdmitFlow.</p>
          <Link href="/auth/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#22c55e', color: '#071a0e', padding: '15px 36px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", transition: 'background 0.2s,transform 0.2s' }}>
            Open Free Dashboard →
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{ padding: '32px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080a0f', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '15px', fontWeight: 800, letterSpacing: '-0.5px', color: '#22c55e' }}>AdmitFlow</div>
      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', color: '#374151', letterSpacing: '0.5px' }}>© 2025 AdmitFlow · Made with ❤️ for Bangladesh</div>
    </footer>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

// ── Knowledge base ────────────────────────────────────────────────────────────
const KB: { patterns: string[]; answer: string }[] = [
  {
    patterns: ['free', 'cost', 'price', 'pricing', 'how much', 'pay'],
    answer: 'AdmitFlow is **free forever** for up to 3 universities — no credit card needed. For unlimited universities, file uploads, and advanced reminders, our Premium plan is a one-time payment of ৳1,999 (early bird price, normally ৳2,499).',
  },
  {
    patterns: ['deadline', 'reminder', 'alert', 'notify', 'notification', 'miss'],
    answer: 'Our Deadline Tracker sends you automated **email reminders 7 days and 2 days** before each application deadline. Never scramble at the last minute again — just set it and focus on applying.',
  },
  {
    patterns: ['document', 'checklist', 'sop', 'cv', 'ielts', 'transcript', 'lor', 'letter'],
    answer: 'The Document Checklist lets you track every required file — SOP, CV, IELTS certificate, academic transcripts, and Letters of Recommendation — **per university**, with a single click to mark each as ready.',
  },
  {
    patterns: ['university', 'universities', 'track', 'status', 'portal', 'manage', 'add'],
    answer: 'The University Manager lets you add each target university with its program, deadline, portal link, and fees. You can track status from **Not Started → In Progress → Submitted → Accepted**. Free plan supports up to 3 universities.',
  },
  {
    patterns: ['visa', 'immigration', 'travel'],
    answer: 'We have a **Visa Tracker** section where you can follow each stage — from receiving your offer letter to financial solvency proof, visa application, and final approval. It keeps everything in one timeline.',
  },
  {
    patterns: ['scholarship', 'fund', 'money', 'bank', 'balance', 'bdt', 'taka', 'living'],
    answer: 'The **Fund Calculator** shows required bank balance, tuition estimate, and living costs in BDT for your target country. The **Scholarship Tracker** helps you never miss a scholarship deadline — track amounts, requirements, and status.',
  },
  {
    patterns: ['ai', 'sop assistant', 'statement', 'purpose', 'essay', 'write'],
    answer: 'Our **AI SOP Assistant** gives personalized suggestions to strengthen your Statement of Purpose for each university based on program requirements and your profile. It includes a draft editor, version history, word count tracker, and a structural checklist.',
  },
  {
    patterns: ['roadmap', 'timeline', 'plan', 'when', 'start', 'intake', 'schedule'],
    answer: 'The **Intake Roadmap Planner** auto-generates a 6–12 month personalized timeline: IELTS prep → SOP draft → shortlist → apply → visa. Think of it as your personal admissions mentor.',
  },
  {
    patterns: ['bangladesh', 'bangladeshi', 'bd', 'local', 'country'],
    answer: 'AdmitFlow is **built specifically for Bangladeshi students** applying abroad — with BDT pricing, local bank balance calculators, and focus on popular programs from Bangladesh to Germany, Canada, UK, Australia, and Singapore.',
  },
  {
    patterns: ['signup', 'register', 'join', 'create account', 'login', 'sign in'],
    answer: 'Getting started is easy! Click **"Track Now"** in the navbar or visit **/auth/signup**. The free plan takes under a minute to set up — no credit card required.',
  },
  {
    patterns: ['safe', 'secure', 'privacy', 'data', 'encrypted'],
    answer: 'Your data is **encrypted and stored securely** via Supabase with row-level security — meaning only you can access your own information. We never sell your data.',
  },
  {
    patterns: ['help', 'support', 'contact', 'question', 'problem'],
    answer: "I'm here to help! You can ask me anything about AdmitFlow's features, pricing, or how to get started. For technical support, reach us at **support@admitflow.app**.",
  },
  {
    patterns: ['hello', 'hi', 'hey', 'helo', 'hii', 'howdy'],
    answer: "Hey there! 👋 I'm **Admit**, your AdmitFlow assistant. Ask me anything — pricing, features, how to track your applications, or how to get started!",
  },
  {
    patterns: ['what', 'admitflow', 'about', 'what is', 'explain'],
    answer: 'AdmitFlow is a **free application tracking platform** built for Bangladeshi students applying to universities abroad. Track deadlines, documents, costs, visas, and SOPs — all in one place. No expensive consultant needed.',
  },
]

const SUGGESTIONS = [
  'Is it free?',
  'How do deadline reminders work?',
  'What documents can I track?',
  'Tell me about the AI SOP assistant',
  'Is my data safe?',
  'What countries are supported?',
]

interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
  time: string
}

function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function getBotReply(input: string): string {
  const lower = input.toLowerCase()
  for (const entry of KB) {
    if (entry.patterns.some(p => lower.includes(p))) return entry.answer
  }
  return "I'm not sure about that yet! Try asking about **pricing**, **deadlines**, **documents**, **universities**, or **the AI SOP assistant**."
}

function RenderText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <span>
      {parts.map((p, i) =>
        i % 2 === 1
          ? <strong key={i} style={{ color: '#f0f2f5', fontWeight: 700 }}>{p}</strong>
          : p
      )}
    </span>
  )
}

export default function AIAskPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: "Hi! I'm **Admit**, your AdmitFlow assistant 🎓 Ask me anything about the app — features, pricing, or how to get started!",
      time: getTime(),
    },
  ])
  const [input, setInput]   = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef           = useRef<HTMLDivElement>(null)
  const inputRef            = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function sendMessage(text: string) {
    if (!text.trim() || typing) return
    const userMsg: Message = { id: Date.now(), role: 'user', text, time: getTime() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const reply = getBotReply(text)
      setTyping(false)
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: reply, time: getTime() }])
    }, 800 + Math.random() * 400)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0c0d0f', fontFamily: "'Sora', -apple-system, sans-serif", display: 'flex', flexDirection: 'column' }}>

      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ask-page { display: flex; flex-direction: column; height: 100vh; }

        /* Navbar */
        .ask-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 32px; border-bottom: 1px solid rgba(255,255,255,0.07);
          background: rgba(12,13,15,0.95); backdrop-filter: blur(12px);
          position: sticky; top: 0; z-index: 10; flex-shrink: 0;
        }
        .ask-nav-logo {
          font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 800;
          color: #22c55e; text-decoration: none; letter-spacing: -0.5px;
        }
        .ask-nav-back {
          display: flex; align-items: center; gap: 6px;
          color: #6b7280; font-size: 13px; font-weight: 500; text-decoration: none;
          padding: 7px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04); transition: color 0.15s, background 0.15s;
        }
        .ask-nav-back:hover { color: #f0f2f5; background: rgba(255,255,255,0.08); }

        /* Layout */
        .ask-layout {
          flex: 1; display: grid; grid-template-columns: 260px 1fr;
          max-width: 1100px; width: 100%; margin: 0 auto;
          padding: 32px 24px; gap: 24px; overflow: hidden;
        }

        /* Sidebar */
        .ask-sidebar { display: flex; flex-direction: column; gap: 20px; overflow-y: auto; }
        .ask-sidebar-card {
          background: #161a1f; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 20px;
        }
        .ask-sidebar-title {
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #22c55e; margin-bottom: 14px;
        }
        .ask-suggestion-btn {
          display: block; width: 100%; text-align: left;
          background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.15);
          color: #9ca3af; font-size: 13px; font-family: 'Sora', sans-serif;
          padding: 10px 13px; border-radius: 9px; cursor: pointer; margin-bottom: 8px;
          transition: background 0.15s, color 0.15s, border-color 0.15s; line-height: 1.4;
        }
        .ask-suggestion-btn:last-child { margin-bottom: 0; }
        .ask-suggestion-btn:hover { background: rgba(34,197,94,0.12); color: #f0f2f5; border-color: rgba(34,197,94,0.3); }

        .ask-topic-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: #1a1f27; border: 1px solid rgba(255,255,255,0.07);
          color: #6b7280; font-size: 12px; padding: 6px 12px;
          border-radius: 99px; margin: 0 4px 8px 0; cursor: pointer;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .ask-topic-pill:hover { color: #22c55e; border-color: rgba(34,197,94,0.3); background: rgba(34,197,94,0.06); }

        /* Chat panel */
        .ask-chat {
          background: #111316; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; display: flex; flex-direction: column;
          overflow: hidden; min-height: 0;
        }
        .ask-chat-head {
          padding: 18px 22px; border-bottom: 1px solid rgba(255,255,255,0.07);
          background: linear-gradient(135deg, #0d1f12, #111a14);
          display: flex; align-items: center; gap: 14px; flex-shrink: 0;
        }
        .ask-chat-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #16a34a, #4ade80);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0; box-shadow: 0 0 16px rgba(34,197,94,0.35);
        }
        .ask-chat-name { font-size: 15px; font-weight: 700; color: #f0f2f5; }
        .ask-chat-status { font-size: 12px; color: #4ade80; display: flex; align-items: center; gap: 5px; margin-top: 2px; }

        /* Messages */
        .ask-messages {
          flex: 1; overflow-y: auto; padding: 24px; display: flex;
          flex-direction: column; gap: 16px;
          scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.08) transparent;
        }
        .ask-messages::-webkit-scrollbar { width: 4px; }
        .ask-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 99px; }

        .ask-msg { display: flex; flex-direction: column; gap: 4px; max-width: 75%; animation: msg-in 0.25s cubic-bezier(0.22,1,0.36,1); }
        @keyframes msg-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .ask-msg.user { align-self: flex-end; align-items: flex-end; }
        .ask-msg.bot  { align-self: flex-start; align-items: flex-start; }

        .ask-bubble { padding: 12px 16px; border-radius: 16px; font-size: 14px; line-height: 1.65; color: #d1d5db; }
        .ask-msg.bot  .ask-bubble { background: #1a1f27; border: 1px solid rgba(255,255,255,0.06); border-radius: 4px 16px 16px 16px; }
        .ask-msg.user .ask-bubble { background: linear-gradient(135deg, #16a34a, #22c55e); color: #071a0e; font-weight: 500; border-radius: 16px 16px 4px 16px; }
        .ask-msg-time { font-size: 10px; color: #374151; padding: 0 3px; }

        /* Typing dots */
        .ask-typing {
          display: flex; align-items: center; gap: 5px; padding: 14px 16px;
          background: #1a1f27; border: 1px solid rgba(255,255,255,0.06);
          border-radius: 4px 16px 16px 16px; align-self: flex-start;
          animation: msg-in 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .ask-typing span { width: 7px; height: 7px; border-radius: 50%; background: #4b5563; animation: dot 1.2s ease-in-out infinite; }
        .ask-typing span:nth-child(2) { animation-delay: 0.2s; }
        .ask-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dot { 0%,60%,100% { transform: translateY(0); background: #4b5563; } 30% { transform: translateY(-6px); background: #22c55e; } }

        /* Input area */
        .ask-input-row {
          padding: 16px 22px; border-top: 1px solid rgba(255,255,255,0.07);
          background: #0e1114; display: flex; gap: 10px; align-items: center; flex-shrink: 0;
        }
        .ask-input {
          flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px; padding: 12px 16px; font-size: 14px; color: #f0f2f5;
          outline: none; font-family: 'Sora', sans-serif; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ask-input::placeholder { color: #374151; }
        .ask-input:focus { border-color: rgba(34,197,94,0.4); box-shadow: 0 0 0 3px rgba(34,197,94,0.08); }
        .ask-input:disabled { opacity: 0.5; }
        .ask-send {
          width: 44px; height: 44px; border-radius: 12px; background: #22c55e;
          border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #071a0e; transition: background 0.15s, transform 0.1s;
        }
        .ask-send:hover:not(:disabled) { background: #4ade80; transform: scale(1.06); }
        .ask-send:disabled { background: rgba(34,197,94,0.25); cursor: not-allowed; }

        /* Glow */
        .ask-glow {
          position: fixed; top: 0; left: 50%; transform: translateX(-50%);
          width: 800px; height: 400px; pointer-events: none; z-index: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 70%);
        }

        @media (max-width: 768px) {
          .ask-layout { grid-template-columns: 1fr; padding: 16px; }
          .ask-sidebar { display: none; }
        }
      `}</style>

      <div className="ask-glow" />

      {/* Navbar */}
      <nav className="ask-nav">
        <Link href="/" className="ask-nav-logo">AdmitFlow</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '99px', padding: '5px 12px', fontSize: '12px', fontWeight: 500, color: '#22c55e' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
            Admit AI · Online
          </div>
          <Link href="/" className="ask-nav-back">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Body */}
      <div className="ask-layout" style={{ position: 'relative', zIndex: 1 }}>

        {/* Sidebar */}
        <aside className="ask-sidebar">
          <div className="ask-sidebar-card">
            <div className="ask-sidebar-title">Quick Questions</div>
            {SUGGESTIONS.map(s => (
              <button key={s} className="ask-suggestion-btn" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>

          <div className="ask-sidebar-card">
            <div className="ask-sidebar-title">Topics</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {['Pricing', 'Deadlines', 'Documents', 'Visa', 'SOP', 'Security', 'Universities', 'Bangladesh'].map(t => (
                <button key={t} className="ask-topic-pill" onClick={() => sendMessage(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="ask-sidebar-card" style={{ background: 'rgba(34,197,94,0.05)', borderColor: 'rgba(34,197,94,0.15)' }}>
            <div style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.65 }}>
              <strong style={{ color: '#f0f2f5', display: 'block', marginBottom: '8px' }}>🎓 About Admit AI</strong>
              I'm your AdmitFlow assistant — trained to answer questions about features, pricing, and the study abroad process for Bangladeshi students.
            </div>
          </div>
        </aside>

        {/* Chat */}
        <div className="ask-chat">
          {/* Header */}
          <div className="ask-chat-head">
            <div className="ask-chat-avatar">🎓</div>
            <div>
              <div className="ask-chat-name">Admit AI</div>
              <div className="ask-chat-status">
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 5px #4ade80' }} />
                Always online · AdmitFlow assistant
              </div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#6b7280', fontFamily: "'Sora', sans-serif" }}>
              {messages.length - 1} message{messages.length !== 2 ? 's' : ''}
            </div>
          </div>

          {/* Messages */}
          <div className="ask-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`ask-msg ${msg.role}`}>
                <div className="ask-bubble">
                  <RenderText text={msg.text} />
                </div>
                <div className="ask-msg-time">{msg.time}</div>
              </div>
            ))}
            {typing && (
              <div className="ask-typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="ask-input-row">
            <input
              ref={inputRef}
              className="ask-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything about AdmitFlow…"
              disabled={typing}
            />
            <button
              className="ask-send"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              aria-label="Send"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
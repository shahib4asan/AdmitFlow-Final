'use client'

import { useState, useRef, useEffect } from 'react'

// ── Canned Q&A knowledge base ─────────────────────────────────────────────────
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
    patterns: ['scholarship', 'fund', 'money', 'bank', 'balance', 'bdt', 'taka', 'cost', 'living'],
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
    patterns: ['signup', 'register', 'join', 'start', 'create account', 'login', 'sign in'],
    answer: 'Getting started is easy! Click **"Track Now"** in the navbar or visit **/auth/signup**. The free plan takes under a minute to set up — no credit card required.',
  },
  {
    patterns: ['safe', 'secure', 'privacy', 'data', 'encrypted'],
    answer: 'Your data is **encrypted and stored securely** via Supabase with row-level security — meaning only you can access your own information. We never sell your data.',
  },
  {
    patterns: ['help', 'support', 'contact', 'question', 'problem'],
    answer: 'I\'m here to help! You can ask me anything about AdmitFlow\'s features, pricing, or how to get started. For technical support, reach us at **support@admitflow.app**.',
  },
  {
    patterns: ['hello', 'hi', 'hey', 'helo', 'hii', 'howdy'],
    answer: 'Hey there! 👋 I\'m **Admit**, your AdmitFlow assistant. Ask me anything — pricing, features, how to track your applications, or how to get started!',
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
    if (entry.patterns.some(p => lower.includes(p))) {
      return entry.answer
    }
  }
  return "I'm not sure about that yet! Try asking about **pricing**, **deadlines**, **documents**, **universities**, or **the AI SOP assistant**. Or visit our [FAQ](#faq) section."
}

// Simple markdown bold renderer
function RenderText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <span>
      {parts.map((p, i) =>
        i % 2 === 1 ? <strong key={i} style={{ color: '#f0f2f5', fontWeight: 700 }}>{p}</strong> : p
      )}
    </span>
  )
}

export default function AIChat() {
  const [open, setOpen]           = useState(false)
  const [messages, setMessages]   = useState<Message[]>([
    { id: 0, role: 'bot', text: "Hi! I'm **Admit**, your AdmitFlow assistant 🎓 Ask me anything about the app — features, pricing, or how to get started!", time: getTime() },
  ])
  const [input, setInput]         = useState('')
  const [typing, setTyping]       = useState(false)
  const [unread, setUnread]       = useState(0)
  const bottomRef                 = useRef<HTMLDivElement>(null)
  const inputRef                  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, open])

  function sendMessage(text: string) {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now(), role: 'user', text, time: getTime() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const reply = getBotReply(text)
      setTyping(false)
      const botMsg: Message = { id: Date.now() + 1, role: 'bot', text: reply, time: getTime() }
      setMessages(prev => [...prev, botMsg])
      if (!open) setUnread(n => n + 1)
    }, 900 + Math.random() * 400)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  return (
    <>
      <style suppressHydrationWarning>{`
        /* ── Bubble ── */
        .af-chat-bubble{position:fixed;bottom:28px;right:28px;z-index:999;cursor:pointer;display:flex;align-items:center;justify-content:center}
        .af-chat-btn{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#16a34a,#22c55e);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(34,197,94,0.45),0 0 0 0 rgba(34,197,94,0.4);animation:af-bubble-pulse 2.8s ease-in-out infinite;transition:transform 0.2s cubic-bezier(0.22,1,0.36,1),box-shadow 0.2s;position:relative}
        .af-chat-btn:hover{transform:scale(1.1);box-shadow:0 6px 32px rgba(34,197,94,0.6),0 0 0 0 rgba(34,197,94,0.4)}
        .af-chat-btn.open{animation:none;transform:scale(0.95)}
        @keyframes af-bubble-pulse{0%,100%{box-shadow:0 4px 24px rgba(34,197,94,0.45),0 0 0 0 rgba(34,197,94,0.35)}60%{box-shadow:0 4px 24px rgba(34,197,94,0.45),0 0 0 14px rgba(34,197,94,0)}}

        /* Unread badge */
        .af-chat-badge{position:absolute;top:-4px;right:-4px;width:20px;height:20px;border-radius:50%;background:#ef4444;color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #0b0d10;animation:af-badge-pop 0.3s cubic-bezier(0.22,1,0.36,1)}
        @keyframes af-badge-pop{from{transform:scale(0)}to{transform:scale(1)}}

        /* Tooltip label */
        .af-chat-label{position:absolute;right:68px;background:rgba(11,13,16,0.95);border:1px solid rgba(255,255,255,0.1);color:#f0f2f5;font-size:12.5px;font-weight:600;padding:7px 13px;border-radius:8px;white-space:nowrap;pointer-events:none;opacity:0;transform:translateX(6px);transition:opacity 0.2s,transform 0.2s;font-family:'DM Sans','Sora',sans-serif}
        .af-chat-label::after{content:'';position:absolute;right:-5px;top:50%;transform:translateY(-50%);border:5px solid transparent;border-right:none;border-left-color:rgba(11,13,16,0.95)}
        .af-chat-bubble:hover .af-chat-label{opacity:1;transform:translateX(0)}

        /* ── Panel ── */
        .af-chat-panel{position:fixed;bottom:96px;right:28px;z-index:998;width:364px;max-width:calc(100vw - 40px);background:#080a0f;border:1px solid rgba(255,255,255,0.08);border-radius:20px;box-shadow:0 32px 80px rgba(0,0,0,0.7),0 0 0 1px rgba(34,197,94,0.05);display:flex;flex-direction:column;overflow:hidden;font-family:'DM Sans',sans-serif;
          transform:scale(0.92) translateY(16px);transform-origin:bottom right;opacity:0;pointer-events:none;transition:transform 0.28s cubic-bezier(0.22,1,0.36,1),opacity 0.22s ease}
        .af-chat-panel.visible{transform:scale(1) translateY(0);opacity:1;pointer-events:all}

        /* Panel header — Hero glassmorphism */
        .af-chat-head{background:rgba(255,255,255,0.03);padding:16px 18px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;gap:12px;backdrop-filter:blur(8px);position:relative;overflow:hidden}
        .af-chat-head::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#22c55e,#38bdf8)}
        .af-chat-avatar{width:38px;height:38px;border-radius:50%;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.25);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;box-shadow:0 0 12px rgba(34,197,94,0.2)}
        .af-chat-head-info{flex:1}
        .af-chat-head-name{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;color:#f0f2f5}
        .af-chat-head-status{font-family:'DM Mono',monospace;font-size:10.5px;color:#22c55e;display:flex;align-items:center;gap:5px;margin-top:2px;letter-spacing:0.5px}
        .af-chat-close{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.07);border-radius:8px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#4b5563;transition:background 0.15s,color 0.15s,border-color 0.15s}
        .af-chat-close:hover{background:rgba(255,255,255,0.09);border-color:rgba(255,255,255,0.15);color:#f0f2f5}

        /* Messages */
        .af-chat-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;max-height:320px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.07) transparent}
        .af-chat-body::-webkit-scrollbar{width:4px}
        .af-chat-body::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.07);border-radius:99px}

        .af-msg{display:flex;flex-direction:column;gap:3px;max-width:85%;animation:af-msg-in 0.25s cubic-bezier(0.22,1,0.36,1)}
        @keyframes af-msg-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .af-msg.user{align-self:flex-end;align-items:flex-end}
        .af-msg.bot{align-self:flex-start;align-items:flex-start}

        /* Bubble — Hero glassmorphism */
        .af-msg-bubble{padding:10px 14px;border-radius:14px;font-size:13.5px;line-height:1.6;color:#d1d5db}
        .af-msg.bot .af-msg-bubble{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:4px 14px 14px 14px;backdrop-filter:blur(4px)}
        .af-msg.user .af-msg-bubble{background:linear-gradient(135deg,#16a34a,#22c55e);color:#071a0e;font-weight:500;border-radius:14px 14px 4px 14px}
        .af-msg-time{font-family:'DM Mono',monospace;font-size:10px;color:#374151;padding:0 2px;letter-spacing:0.5px}

        /* Typing dots */
        .af-typing{display:flex;align-items:center;gap:4px;padding:12px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:4px 14px 14px 14px;backdrop-filter:blur(4px);align-self:flex-start}
        .af-typing span{width:5px;height:5px;border-radius:50%;background:#4b5563;animation:af-dot 1.2s ease-in-out infinite}
        .af-typing span:nth-child(2){animation-delay:0.2s}
        .af-typing span:nth-child(3){animation-delay:0.4s}
        @keyframes af-dot{0%,60%,100%{transform:translateY(0);background:#4b5563}30%{transform:translateY(-5px);background:#22c55e}}

        /* Suggestions */
        .af-suggestions{padding:10px 14px 6px;display:flex;gap:6px;flex-wrap:wrap;border-top:1px solid rgba(255,255,255,0.05)}
        .af-suggestion{background:rgba(34,197,94,0.07);border:1px solid rgba(34,197,94,0.18);color:#4ade80;font-family:'DM Mono',monospace;font-size:11px;font-weight:500;padding:5px 11px;border-radius:99px;cursor:pointer;letter-spacing:0.3px;transition:background 0.15s,transform 0.1s;white-space:nowrap}
        .af-suggestion:hover{background:rgba(34,197,94,0.14);transform:scale(1.03)}

        /* Input row */
        .af-chat-foot{padding:12px 14px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:8px;align-items:center;background:rgba(0,0,0,0.3)}
        .af-chat-input{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 14px;font-size:13.5px;color:#f0f2f5;outline:none;font-family:'DM Sans',sans-serif;transition:border-color 0.15s,box-shadow 0.15s}
        .af-chat-input::placeholder{color:#374151}
        .af-chat-input:focus{border-color:rgba(34,197,94,0.35);box-shadow:0 0 0 3px rgba(34,197,94,0.07)}
        .af-send-btn{width:38px;height:38px;border-radius:10px;background:#22c55e;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.15s,transform 0.1s;color:#071a0e}
        .af-send-btn:hover{background:#4ade80;transform:scale(1.05)}
        .af-send-btn:disabled{background:rgba(34,197,94,0.2);cursor:not-allowed;transform:none}

        @media(max-width:400px){
          .af-chat-panel{right:12px;bottom:88px;width:calc(100vw - 24px)}
          .af-chat-bubble{right:16px;bottom:20px}
        }
      `}</style>

      {/* ── Floating bubble ── */}
      <div className="af-chat-bubble">
        <span className="af-chat-label">Ask Admit AI</span>
        <button
          className={`af-chat-btn${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Open chat"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          )}
          {!open && unread > 0 && <div className="af-chat-badge">{unread}</div>}
        </button>
      </div>

      {/* ── Chat panel ── */}
      <div className={`af-chat-panel${open ? ' visible' : ''}`} role="dialog" aria-label="AdmitFlow AI Chat">

        {/* Header */}
        <div className="af-chat-head">
          <div className="af-chat-avatar">🎓</div>
          <div className="af-chat-head-info">
            <div className="af-chat-head-name">Admit AI</div>
            <div className="af-chat-head-status">
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 5px #4ade80' }} />
              Always online · AdmitFlow assistant
            </div>
          </div>
          <button className="af-chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="af-chat-body">
          {messages.map(msg => (
            <div key={msg.id} className={`af-msg ${msg.role}`}>
              <div className="af-msg-bubble">
                <RenderText text={msg.text} />
              </div>
              <div className="af-msg-time">{msg.time}</div>
            </div>
          ))}
          {typing && (
            <div className="af-typing" style={{ animation: 'af-msg-in 0.25s cubic-bezier(0.22,1,0.36,1)' }}>
              <span /><span /><span />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions — show only at start */}
        {messages.length <= 2 && (
          <div className="af-suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} className="af-suggestion" onClick={() => sendMessage(s)}>{s}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="af-chat-foot">
          <input
            ref={inputRef}
            className="af-chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything about AdmitFlow…"
            disabled={typing}
          />
          <button
            className="af-send-btn"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            aria-label="Send"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </>
  )
}

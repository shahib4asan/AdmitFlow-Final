'use client'

import { useRouter } from 'next/navigation'

interface BackButtonProps {
  href?: string
  label?: string
}

export default function BackButton({ href, label = 'Back' }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) router.push(href)
    else router.back()
  }

  return (
    <>
      <style suppressHydrationWarning>{`
        .af-back-btn{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#9ca3af;font-size:13px;font-weight:500;padding:7px 14px 7px 10px;border-radius:99px;cursor:pointer;text-decoration:none;transition:background 0.12s ease,color 0.12s ease,border-color 0.12s ease;font-family:inherit}
        .af-back-btn:hover{background:rgba(255,255,255,0.08);color:#e5e7eb;border-color:rgba(255,255,255,0.18)}
        .af-back-arrow{display:flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,0.07);flex-shrink:0}
      `}</style>
      <button className="af-back-btn" onClick={handleClick}>
        <span className="af-back-arrow">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        {label}
      </button>
    </>
  )
}

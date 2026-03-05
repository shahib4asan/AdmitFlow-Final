'use client'

import { useRouter, usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const NAV_ITEMS = [
  { href: '/dashboard', icon: '◈', label: 'Overview' },
  { href: '/dashboard/universities', icon: '🏛', label: 'Universities' },
  { href: '/dashboard/documents', icon: '📄', label: 'Documents' },
  { href: '/dashboard/exams', icon: '🧪', label: 'Exams' },
  { href: '/dashboard/costs', icon: '💳', label: 'Costs' },
]

export default function DashboardShell({ children, user, plan }: {
  children: React.ReactNode
  user: { id?: string; name?: string | null; email?: string | null }
  plan: string
}) {
  const router = useRouter()
  const pathname = usePathname()

  const initials = (user.name || user.email || 'U').charAt(0).toUpperCase()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{ width: '230px', flexShrink: 0, background: 'var(--bg2)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '20px 0', position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '0 20px 20px', borderBottom: '1px solid var(--border)', marginBottom: '12px', fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green-glow)', animation: 'navGlow 2s ease-in-out infinite' }} />
          AdmitFlow
        </div>

        <div style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1.5px', padding: '16px 20px 6px' }}>Navigation</div>

        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href
            return (
              <div key={item.href} onClick={() => router.push(item.href)}
                style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '9px 20px', color: isActive ? 'var(--text)' : 'var(--muted2)', fontSize: '13.5px', fontWeight: 500, cursor: 'pointer', margin: '1px 8px', borderRadius: '8px', background: isActive ? 'rgba(34,197,94,0.1)' : 'transparent', position: 'relative', transition: 'all 0.15s' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
                {isActive && <div style={{ position: 'absolute', left: '-8px', top: '50%', transform: 'translateY(-50%)', width: '3px', height: '20px', background: 'var(--green)', borderRadius: '0 2px 2px 0' }} />}
                <span style={{ fontSize: '15px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--green-dim)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>{initials}</div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: 'var(--text)', fontSize: '13px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name || user.email?.split('@')[0]}
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '1px', color: plan === 'premium' ? 'var(--green)' : 'var(--amber)', textTransform: 'uppercase', fontWeight: 700 }}>{plan}</div>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/' })}
            style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '7px', color: 'var(--muted2)', fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border2)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted2)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, minHeight: '100vh', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}

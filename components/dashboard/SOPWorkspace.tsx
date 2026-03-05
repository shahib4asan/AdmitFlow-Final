'use client'

import { useState, useCallback } from 'react'

interface Version {
  id: string
  timestamp: string
  wordCount: number
  excerpt: string
}

interface CheckItem {
  id: string
  label: string
  done: boolean
}

const INITIAL_CHECKLIST: CheckItem[] = [
  { id: '1', label: 'Strong introduction hook',        done: false },
  { id: '2', label: 'Academic background described',   done: false },
  { id: '3', label: 'Work/research experience',        done: false },
  { id: '4', label: 'Why this specific university',    done: false },
  { id: '5', label: 'Clear career goals stated',       done: false },
  { id: '6', label: 'Within word limit (600–1000w)',   done: false },
  { id: '7', label: 'Proofread and polished',          done: false },
]

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export default function SOPWorkspace() {
  const [draft, setDraft] = useState('')
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST)
  const [versions, setVersions] = useState<Version[]>([])
  const [activeTab, setActiveTab] = useState<'editor' | 'checklist' | 'versions'>('editor')

  const words = wordCount(draft)
  const wordLimit = 1000
  const wordColor = words > wordLimit ? '#ef4444' : words > 800 ? '#f59e0b' : '#22c55e'

  const saveVersion = useCallback(() => {
    if (!draft.trim()) return
    const v: Version = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      wordCount: words,
      excerpt: draft.slice(0, 80) + (draft.length > 80 ? '…' : ''),
    }
    setVersions(prev => [v, ...prev].slice(0, 10))
  }, [draft, words])

  const toggleCheck = (id: string) =>
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, done: !c.done } : c))

  const checklistScore = Math.round((checklist.filter(c => c.done).length / checklist.length) * 100)

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: 'editor',    label: 'Draft Editor' },
    { key: 'checklist', label: `Checklist ${checklistScore}%` },
    { key: 'versions',  label: `Versions (${versions.length})` },
  ]

  return (
    <div style={{ background: '#111316', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden', maxWidth: '700px' }}>
      <style suppressHydrationWarning>{`
        .sop-tab{padding:10px 18px;fontSize:13px;fontWeight:600;cursor:pointer;border:none;background:transparent;transition:all .15s;borderBottom:2px solid transparent}
        .sop-tab.active{color:#22c55e;borderBottomColor:#22c55e}
        .sop-tab:not(.active){color:#6b7280}
        .sop-tab:hover:not(.active){color:#9ca3af}
        .sop-textarea{width:100%;background:transparent;border:none;outline:none;resize:none;color:#d1d5db;fontSize:14.5px;lineHeight:1.8;fontFamily:'Georgia',serif;padding:0;boxSizing:border-box}
        .sop-textarea::placeholder{color:#374151}
      `}</style>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 8px', background: '#0d0f12' }}>
        {tabs.map(t => (
          <button key={t.key} className={`sop-tab${activeTab === t.key ? ' active' : ''}`} onClick={() => setActiveTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '24px' }}>
        {/* Editor */}
        {activeTab === 'editor' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '17px', fontWeight: 800, color: '#f0f2f5' }}>Statement of Purpose</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: wordColor }}>{words} / {wordLimit} words</span>
                <button onClick={saveVersion} style={{ padding: '6px 14px', borderRadius: '7px', fontSize: '12px', fontWeight: 600, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.22)', color: '#22c55e', cursor: 'pointer' }}>
                  Save version
                </button>
              </div>
            </div>
            {/* Word progress bar */}
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', marginBottom: '16px' }}>
              <div style={{ height: '100%', width: `${Math.min((words / wordLimit) * 100, 100)}%`, background: wordColor, borderRadius: '99px', transition: 'width .3s ease' }} />
            </div>
            <textarea
              className="sop-textarea"
              rows={16}
              placeholder="Start writing your Statement of Purpose here…&#10;&#10;Tip: Begin with a compelling hook that tells your story."
              value={draft}
              onChange={e => setDraft(e.target.value)}
            />
          </>
        )}

        {/* Checklist */}
        {activeTab === 'checklist' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '17px', fontWeight: 800, color: '#f0f2f5' }}>SOP Structure Checklist</div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '22px', fontWeight: 800, color: '#22c55e' }}>{checklistScore}%</div>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', marginBottom: '20px' }}>
              <div style={{ height: '100%', width: `${checklistScore}%`, background: '#22c55e', borderRadius: '99px', transition: 'width .3s' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {checklist.map(item => (
                <div key={item.id} onClick={() => toggleCheck(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'background .15s' }}
                  onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0,
                    background: item.done ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1.5px solid ${item.done ? '#22c55e' : 'rgba(255,255,255,0.12)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#22c55e', fontSize: '12px', transition: 'all .2s'
                  }}>
                    {item.done ? '✓' : ''}
                  </div>
                  <span style={{ fontSize: '14px', color: item.done ? '#6b7280' : '#d1d5db', textDecoration: item.done ? 'line-through' : 'none' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Versions */}
        {activeTab === 'versions' && (
          <>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '17px', fontWeight: 800, color: '#f0f2f5', marginBottom: '16px' }}>Version History</div>
            {versions.length === 0 ? (
              <div style={{ fontSize: '14px', color: '#4b5563', padding: '24px 0', textAlign: 'center' }}>
                No versions saved yet. Use "Save version" in the editor to preserve snapshots.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {versions.map((v, i) => (
                  <div key={v.id} style={{ background: '#0d0f12', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: i === 0 ? '#22c55e' : '#6b7280' }}>
                        {i === 0 ? 'Latest' : `v${versions.length - i}`}
                      </span>
                      <span style={{ fontSize: '12px', color: '#4b5563' }}>{v.wordCount} words · {v.timestamp}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.6 }}>{v.excerpt}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

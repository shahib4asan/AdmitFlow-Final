'use client'
import { useState } from 'react'
import type { University } from '@/types/database'

const STATUS_OPTIONS = ['Not started','In progress','Submitted','Interview','Accepted','Rejected']
const COUNTRIES = ['Canada','USA','UK','Germany','Australia','Singapore','Netherlands','Sweden','Bangladesh','Other']
const FLAGS: Record<string,string> = { Canada:'🇨🇦',Germany:'🇩🇪',Singapore:'🇸🇬',Australia:'🇦🇺',USA:'🇺🇸',UK:'🇬🇧',Netherlands:'🇳🇱',Sweden:'🇸🇪',Bangladesh:'🇧🇩' }
const STATUS_CFG: Record<string,{color:string;bg:string;dot:string}> = {
  'Not started':{ color:'#94a3b8', bg:'rgba(148,163,184,0.15)', dot:'#94a3b8' },
  'In progress': { color:'#fbbf24', bg:'rgba(251,191,36,0.15)',   dot:'#fbbf24' },
  'Submitted':   { color:'#60a5fa', bg:'rgba(96,165,250,0.15)',   dot:'#60a5fa' },
  'Interview':   { color:'#a78bfa', bg:'rgba(167,139,250,0.15)', dot:'#a78bfa' },
  'Accepted':    { color:'#34d399', bg:'rgba(52,211,153,0.15)',   dot:'#34d399' },
  'Rejected':    { color:'#f87171', bg:'rgba(248,113,113,0.15)', dot:'#f87171' },
}
function daysUntil(d: string) { return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000) }
const EMPTY = { name:'', country:'Canada', program:'', deadline:'', fee:'', status:'Not started', portal_link:'' }

export default function UniversitiesClient({ initialUniversities, plan, userId }: { initialUniversities: University[]; plan: string; userId: string }) {
  const [unis, setUnis]       = useState<University[]>(initialUniversities)
  const [modal, setModal]     = useState(false)
  const [editId, setEditId]   = useState<string|null>(null)
  const [form, setForm]       = useState<Record<string,string>>(EMPTY)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')

  const canAdd = plan === 'premium' || unis.length < 3

  function openAdd()  { setForm(EMPTY); setEditId(null); setModal(true); setError('') }
  function openEdit(u: University) {
    setForm({ name:u.name, country:u.country, program:u.program, deadline:u.deadline, fee:String(u.fee), status:u.status, portal_link:u.portal_link??'' })
    setEditId(u.id); setModal(true); setError('')
  }

  async function save() {
    if (!form.name || !form.deadline) { setError('Name and deadline are required.'); return }
    setSaving(true)
    const res = await fetch('/api/universities', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ action: editId ? 'update':'create', id:editId, name:form.name, country:form.country, program:form.program, deadline:form.deadline, fee:Number(form.fee)||0, status:form.status, portal_link:form.portal_link||null }),
    })
    const json = await res.json()
    if (!res.ok) { setError(json.error||'Failed'); setSaving(false); return }
    editId ? setUnis(p=>p.map(u=>u.id===editId?json.data:u)) : setUnis(p=>[...p,json.data])
    setSaving(false); setModal(false)
  }

  async function del(id: string) {
    if (!confirm('Delete this university and all its documents?')) return
    await fetch('/api/universities',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'delete',id}) })
    setUnis(p=>p.filter(u=>u.id!==id))
  }

  const inp = (field:string,type='text',placeholder='') => (
    <input type={type} value={form[field]} placeholder={placeholder} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))}
      style={{ width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'8px', fontSize:'14px', outline:'none', background:'var(--bg3)', color:'var(--text)', fontFamily:'Inter, sans-serif' }} />
  )

  return (
    <div>
      {/* Topbar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', height:'58px', borderBottom:'1px solid var(--border)', background:'rgba(12,13,15,0.8)', backdropFilter:'blur(10px)', position:'sticky', top:0, zIndex:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <span style={{ fontSize:'13px', color:'var(--muted)' }}>AdmitFlow /</span>
          <span style={{ fontSize:'15px', fontWeight:600, color:'var(--text)' }}>Universities</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <span style={{ fontSize:'12px', color:'var(--muted)' }}>{plan==='free'?`${unis.length}/3 free`:`${unis.length} total`}</span>
          <button onClick={openAdd} disabled={!canAdd} style={{ display:'flex', alignItems:'center', gap:'6px', background:canAdd?'var(--green)':'#374151', color:canAdd?'#0c0d0f':'var(--muted)', padding:'7px 16px', borderRadius:'8px', fontSize:'13px', fontWeight:700, cursor:canAdd?'pointer':'not-allowed', border:'none' }}>
            + Add University
          </button>
        </div>
      </div>

      <div style={{ padding:'28px' }}>
        {!canAdd && (
          <div style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:'10px', padding:'14px 18px', marginBottom:'20px', fontSize:'14px', color:'#d97706' }}>
            ⚠️ Free plan limit reached (3 universities). Upgrade to Premium for unlimited tracking.
          </div>
        )}

        {unis.length === 0 ? (
          <div style={{ background:'var(--card)', borderRadius:'var(--radius2)', border:'1px solid var(--border)', padding:'60px', textAlign:'center' }}>
            <div style={{ fontSize:'40px', marginBottom:'12px' }}>🏛</div>
            <div style={{ fontWeight:700, fontSize:'18px', color:'var(--text)', marginBottom:'8px' }}>Add your first university</div>
            <div style={{ color:'var(--muted)', fontSize:'14px', marginBottom:'24px' }}>Start tracking deadlines, documents, and application status.</div>
            <button onClick={openAdd} style={{ background:'var(--green)', color:'#0c0d0f', padding:'10px 24px', borderRadius:'8px', fontWeight:700, fontSize:'14px', cursor:'pointer', border:'none' }}>+ Add University</button>
          </div>
        ) : (
          <div style={{ background:'var(--card)', borderRadius:'var(--radius2)', border:'1px solid var(--border)', overflow:'hidden' }}>
            <div style={{ display:'grid', gridTemplateColumns:'2.2fr 1fr 1.5fr 1fr 90px 80px', padding:'10px 18px', background:'var(--bg3)', borderBottom:'1px solid var(--border)', fontSize:'11px', textTransform:'uppercase', letterSpacing:'1px', color:'var(--muted)', fontWeight:600 }}>
              <span>University</span><span>Country</span><span>Deadline</span><span>Status</span><span>Fee</span><span>Actions</span>
            </div>
            {unis.map(u => {
              const cfg  = STATUS_CFG[u.status]||STATUS_CFG['Not started']
              const days = daysUntil(u.deadline)
              return (
                <div key={u.id} style={{ display:'grid', gridTemplateColumns:'2.2fr 1fr 1.5fr 1fr 90px 80px', padding:'14px 18px', borderBottom:'1px solid var(--border)', alignItems:'center', transition:'background 0.12s' }}
                  onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.02)')}
                  onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                  <div>
                    <div style={{ fontSize:'14px', fontWeight:600, color:'var(--text)' }}>{u.name}</div>
                    <div style={{ fontSize:'12px', color:'var(--muted2)', marginTop:'2px' }}>{u.program}</div>
                    {u.portal_link&&<a href={u.portal_link} target="_blank" rel="noopener noreferrer" style={{ fontSize:'11px', color:'var(--green)', marginTop:'2px', display:'block' }}>Portal ↗</a>}
                  </div>
                  <div style={{ color:'var(--muted2)', fontSize:'14px' }}>{FLAGS[u.country]||'🌍'} {u.country}</div>
                  <div style={{ fontSize:'12.5px', fontFamily:'monospace', color:days<=7&&days>0?'var(--amber)':days<=0?'var(--muted)':'var(--muted2)', fontWeight:days<=7&&days>0?700:400 }}>
                    {days<=0?'Passed':days<=7?`⚠ ${days}d left`:`${days}d`}
                    <div style={{ fontSize:'11px', color:'var(--muted)', fontWeight:400, marginTop:'2px' }}>{new Date(u.deadline).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'2-digit'})}</div>
                  </div>
                  <div>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:'5px', fontSize:'12px', fontWeight:600, padding:'3px 9px', borderRadius:'99px', color:cfg.color, background:cfg.bg }}>
                      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:cfg.dot, flexShrink:0 }} />{u.status}
                    </span>
                  </div>
                  <div style={{ fontSize:'13px', color:'var(--muted2)' }}>{u.fee>0?`$${u.fee}`:'Free'}</div>
                  <div style={{ display:'flex', gap:'6px' }}>
                    <button onClick={()=>openEdit(u)} style={{ background:'var(--bg3)', border:'1px solid var(--border)', padding:'5px 9px', borderRadius:'6px', cursor:'pointer', fontSize:'13px', color:'var(--muted2)' }}>✏</button>
                    <button onClick={()=>del(u.id)}   style={{ background:'var(--bg3)', border:'1px solid rgba(239,68,68,0.2)', padding:'5px 9px', borderRadius:'6px', cursor:'pointer', fontSize:'13px', color:'var(--red)' }}>✕</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {modal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, backdropFilter:'blur(8px)' }}
          onClick={e=>{if(e.target===e.currentTarget)setModal(false)}}>
          <div style={{ background:'var(--card)', borderRadius:'16px', padding:'28px', width:'480px', maxWidth:'95vw', border:'1px solid var(--border2)', boxShadow:'0 40px 120px rgba(0,0,0,0.6)' }}>
            <div style={{ fontFamily:"'Sora', sans-serif", fontSize:'20px', fontWeight:800, color:'#fff', marginBottom:'22px', letterSpacing:'-0.3px' }}>{editId?'Edit University':'Add University'}</div>
            {error&&<div style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:'8px', padding:'10px 12px', fontSize:'13px', color:'#f87171', marginBottom:'14px' }}>{error}</div>}

            <Label>University Name</Label>{inp('name','text','e.g. University of Toronto')}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'14px' }}>
              <div><Label>Country</Label>
                <select value={form.country} onChange={e=>setForm(f=>({...f,country:e.target.value}))} style={{ width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'8px', fontSize:'14px', outline:'none', background:'var(--bg3)', color:'var(--text)' }}>
                  {COUNTRIES.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div><Label>Status</Label>
                <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))} style={{ width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'8px', fontSize:'14px', outline:'none', background:'var(--bg3)', color:'var(--text)' }}>
                  {STATUS_OPTIONS.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <Label>Program</Label>{inp('program','text','e.g. MSc Computer Science')}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'14px' }}>
              <div><Label>Deadline</Label>{inp('deadline','date')}</div>
              <div><Label>Fee (USD)</Label>{inp('fee','number','0')}</div>
            </div>
            <Label>Portal Link</Label>{inp('portal_link','url','https://apply.university.edu')}

            <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end', marginTop:'22px', paddingTop:'18px', borderTop:'1px solid var(--border)' }}>
              <button onClick={()=>setModal(false)} style={{ padding:'9px 18px', borderRadius:'8px', border:'1px solid var(--border2)', background:'transparent', cursor:'pointer', fontSize:'13.5px', fontWeight:500, color:'var(--muted2)' }}>Cancel</button>
              <button onClick={save} disabled={saving} style={{ padding:'9px 22px', borderRadius:'8px', background:saving?'#374151':'var(--green)', color:saving?'var(--muted)':'#0c0d0f', border:'none', cursor:saving?'not-allowed':'pointer', fontSize:'13.5px', fontWeight:700 }}>
                {saving?'Saving...':(editId?'Save Changes':'Add University')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
function Label({children}:{children:React.ReactNode}) {
  return <label style={{ display:'block', fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px', color:'var(--muted)', marginBottom:'5px', marginTop:'14px' }}>{children}</label>
}

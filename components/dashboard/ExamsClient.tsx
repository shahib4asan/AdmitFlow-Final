'use client'
import { useState } from 'react'

export default function ExamsClient({ initialData, userId }: { initialData: any; userId: string }) {
  const [data, setData] = useState(initialData || {})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)

  async function handleSave() {
    setSaving(true)
    const res = await fetch('/api/exams', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ ielts_date:data.ielts_date||null, target_score:Number(data.target_score)||null, achieved_score:Number(data.achieved_score)||null, gre_score:Number(data.gre_score)||null }),
    })
    const json = await res.json()
    if (json.data) setData(json.data)
    setSaving(false); setSaved(true); setTimeout(()=>setSaved(false), 2000)
  }

  const field = (label:string, key:string, type='text', placeholder='') => (
    <div className="exam-field">
      <label style={{ fontSize:'11px', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'1px', fontWeight:600, display:'block', marginBottom:'6px' }}>{label}</label>
      <input type={type} value={data[key]??''} placeholder={placeholder} onChange={e=>setData((d:any)=>({...d,[key]:e.target.value}))}
        style={{ width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'8px', fontSize:'14px', outline:'none', background:'var(--bg3)', color:'var(--text)', fontFamily:'Inter, sans-serif' }} />
    </div>
  )

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', padding:'0 28px', height:'58px', borderBottom:'1px solid var(--border)', background:'rgba(12,13,15,0.8)', backdropFilter:'blur(10px)', position:'sticky', top:0, zIndex:10, gap:'10px' }}>
        <span style={{ fontSize:'13px', color:'var(--muted)' }}>AdmitFlow /</span>
        <span style={{ fontSize:'15px', fontWeight:600, color:'var(--text)' }}>Exams</span>
      </div>
      <div style={{ padding:'28px' }}>
        <div style={{ background:'var(--card)', borderRadius:'var(--radius2)', border:'1px solid var(--border)', padding:'22px', marginBottom:'20px' }}>
          <div style={{ fontSize:'13px', fontWeight:600, color:'var(--muted2)', marginBottom:'20px' }}>IELTS Information</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'16px' }}>
            {field('Test Date','ielts_date','date')}
            {field('Target Score','target_score','number','e.g. 7.0')}
            {field('Achieved Score','achieved_score','number','e.g. 7.5')}
          </div>
          {data.achieved_score && data.target_score && (
            <div style={{ marginTop:'16px', padding:'12px 16px', borderRadius:'8px', background:Number(data.achieved_score)>=Number(data.target_score)?'rgba(34,197,94,0.08)':'rgba(245,158,11,0.08)', border:`1px solid ${Number(data.achieved_score)>=Number(data.target_score)?'rgba(34,197,94,0.2)':'rgba(245,158,11,0.2)'}`, fontSize:'14px', color:Number(data.achieved_score)>=Number(data.target_score)?'#34d399':'#fbbf24' }}>
              {Number(data.achieved_score)>=Number(data.target_score)?`✅ You've met your target score of ${data.target_score}!`:`⚠️ ${(Number(data.target_score)-Number(data.achieved_score)).toFixed(1)} below target. Keep practicing!`}
            </div>
          )}
        </div>

        <div style={{ background:'var(--card)', borderRadius:'var(--radius2)', border:'1px solid var(--border)', padding:'22px', marginBottom:'24px' }}>
          <div style={{ fontSize:'13px', fontWeight:600, color:'var(--muted2)', marginBottom:'20px' }}>GRE Information (Optional)</div>
          <div style={{ maxWidth:'240px' }}>{field('GRE Total Score','gre_score','number','e.g. 320')}</div>
        </div>

        <button onClick={handleSave} disabled={saving}
          style={{ background:saved?'#34d399':saving?'#374151':'var(--green)', color:saved||!saving?'#0c0d0f':'var(--muted)', border:'none', padding:'10px 24px', borderRadius:'8px', fontSize:'14px', fontWeight:700, cursor:saving?'not-allowed':'pointer', transition:'background 0.2s' }}>
          {saved?'✓ Saved!':saving?'Saving...':'Save Changes'}
        </button>
      </div>
    </div>
  )
}

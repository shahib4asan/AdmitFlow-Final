'use client'
import { useState } from 'react'

const USD_TO_BDT = 110

export default function CostsClient({ initialData, userId, totalAppFees, plan }: { initialData:any; userId:string; totalAppFees:number; plan:string }) {
  const [data, setData] = useState(initialData||{ielts_cost:0,courier_cost:0,visa_fee:0})
  const [saving, setSaving] = useState(false)
  const [saved,  setSaved]  = useState(false)

  const appBDT     = totalAppFees * USD_TO_BDT
  const ielts      = Number(data.ielts_cost)||0
  const courier    = Number(data.courier_cost)||0
  const visa       = Number(data.visa_fee)||0
  const total      = appBDT + ielts + courier + visa

  async function handleSave() {
    if (plan==='free') { alert('Cost tracker requires Premium plan.'); return }
    setSaving(true)
    const res = await fetch('/api/costs',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ielts_cost:ielts,courier_cost:courier,visa_fee:visa}) })
    const json = await res.json()
    if (json.data) setData(json.data)
    setSaving(false); setSaved(true); setTimeout(()=>setSaved(false),2000)
  }

  const items = [
    { key:'appFees',      label:'Application Fees', icon:'🏛', value:appBDT,  fixed:true,  note:`$${totalAppFees} × ${USD_TO_BDT}` },
    { key:'ielts_cost',   label:'IELTS Fee',         icon:'🎯', value:ielts,   fixed:false },
    { key:'courier_cost', label:'Courier / Postage', icon:'📦', value:courier, fixed:false },
    { key:'visa_fee',     label:'Visa Fee',           icon:'🛂', value:visa,    fixed:false },
  ]

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', padding:'0 28px', height:'58px', borderBottom:'1px solid var(--border)', background:'rgba(12,13,15,0.8)', backdropFilter:'blur(10px)', position:'sticky', top:0, zIndex:10, gap:'10px' }}>
        <span style={{ fontSize:'13px', color:'var(--muted)' }}>AdmitFlow /</span>
        <span style={{ fontSize:'15px', fontWeight:600, color:'var(--text)' }}>Costs</span>
      </div>
      <div style={{ padding:'28px' }}>
        {plan==='free'&&(
          <div style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:'10px', padding:'14px 18px', marginBottom:'20px', fontSize:'14px', color:'#d97706' }}>
            🔒 Cost tracker is a Premium feature. Upgrade to save your cost breakdown.
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'14px', marginBottom:'18px' }}>
          {items.map(item=>(
            <div key={item.key} style={{ background:'var(--card)', borderRadius:'var(--radius)', border:'1px solid var(--border)', padding:'18px 20px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}>
                <span style={{ fontSize:'18px' }}>{item.icon}</span>
                <span style={{ fontSize:'11px', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px', color:'var(--muted)' }}>{item.label}</span>
              </div>
              {item.fixed ? (
                <div>
                  <div style={{ fontFamily:"'Sora',sans-serif", fontSize:'28px', fontWeight:800, letterSpacing:'-1px', color:'var(--text)' }}>৳{item.value.toLocaleString()}</div>
                  <div style={{ fontSize:'11px', color:'var(--muted)', marginTop:'4px' }}>{(item as any).note}</div>
                </div>
              ) : (
                <input type="number" value={item.value||''} placeholder="0" onChange={e=>setData((d:any)=>({...d,[item.key]:e.target.value}))}
                  style={{ width:'100%', padding:'9px 12px', border:'1px solid var(--border2)', borderRadius:'8px', fontSize:'18px', fontFamily:"'Sora',sans-serif", letterSpacing:'-0.5px', outline:'none', background:'var(--bg3)', color:'var(--text)' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'var(--bg3)', borderRadius:'9px', padding:'18px 22px', border:'1px solid var(--border2)', marginBottom:'20px' }}>
          <div>
            <div style={{ fontSize:'13px', fontWeight:600, color:'var(--muted2)', marginBottom:'4px' }}>Total Estimated Cost</div>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:'32px', fontWeight:800, color:'var(--green)', letterSpacing:'-1px' }}>৳{total.toLocaleString()}</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:'11px', color:'var(--muted)', marginBottom:'4px' }}>Approx. USD</div>
            <div style={{ fontWeight:700, fontSize:'18px', color:'var(--muted2)' }}>${Math.round(total/USD_TO_BDT).toLocaleString()}</div>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving||plan==='free'}
          style={{ background:saved?'#34d399':(saving||plan==='free')?'#374151':'var(--green)', color:(saved||(!saving&&plan!=='free'))?'#0c0d0f':'var(--muted)', border:'none', padding:'10px 24px', borderRadius:'8px', fontSize:'14px', fontWeight:700, cursor:(saving||plan==='free')?'not-allowed':'pointer' }}>
          {plan==='free'?'🔒 Premium Required':saved?'✓ Saved!':saving?'Saving...':'Save Costs'}
        </button>
      </div>
    </div>
  )
}

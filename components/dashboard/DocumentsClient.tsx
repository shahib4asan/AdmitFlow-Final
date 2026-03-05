'use client'
import { useState } from 'react'

const DOC_TYPES = [
  {key:'sop',        label:'Statement of Purpose', icon:'📝'},
  {key:'cv',         label:'CV / Resume',           icon:'📋'},
  {key:'ielts',      label:'IELTS Score',           icon:'🎯'},
  {key:'transcript', label:'Transcript',            icon:'🎓'},
  {key:'passport',   label:'Passport Copy',         icon:'🛂'},
  {key:'lor1',       label:'LOR 1',                 icon:'✉️'},
  {key:'lor2',       label:'LOR 2',                 icon:'✉️'},
]

export default function DocumentsClient({ universities, plan }: { universities:any[]; plan:string }) {
  const [selectedId, setSelectedId] = useState(universities[0]?.id??null)
  const [docs, setDocs] = useState<Record<string,any[]>>(
    Object.fromEntries(universities.map(u=>[u.id, u.documents??[]]))
  )
  const [uploading, setUploading] = useState<string|null>(null)

  const selectedUni = universities.find(u=>u.id===selectedId)
  const currentDocs = docs[selectedId]??[]
  function getDoc(type:string) { return currentDocs.find(d=>d.type===type) }
  const missingCount = (uniId:string) => (docs[uniId]??[]).filter(d=>!d.completed).length

  async function toggleComplete(type:string) {
    const doc = getDoc(type)
    if (!doc) return
    const newVal = !doc.completed
    await fetch('/api/documents',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'toggle',id:doc.id,completed:newVal}) })
    setDocs(prev=>({...prev,[selectedId]:prev[selectedId].map(d=>d.id===doc.id?{...d,completed:newVal}:d)}))
  }

  async function handleUpload(type:string, file:File) {
    if (plan==='free') { alert('File uploads require Premium plan.'); return }
    setUploading(type)
    const doc = getDoc(type)
    if (doc) {
      await fetch('/api/documents',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'setFileUrl',id:doc.id,file_url:null}) })
      setDocs(prev=>({...prev,[selectedId]:prev[selectedId].map(d=>d.id===doc.id?{...d,completed:true}:d)}))
    }
    setUploading(null)
  }

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', padding:'0 28px', height:'58px', borderBottom:'1px solid var(--border)', background:'rgba(12,13,15,0.8)', backdropFilter:'blur(10px)', position:'sticky', top:0, zIndex:10, gap:'10px' }}>
        <span style={{ fontSize:'13px', color:'var(--muted)' }}>AdmitFlow /</span>
        <span style={{ fontSize:'15px', fontWeight:600, color:'var(--text)' }}>Documents</span>
      </div>
      <div style={{ padding:'28px' }}>
        {universities.length===0 ? (
          <div style={{ background:'var(--card)', borderRadius:'var(--radius2)', border:'1px solid var(--border)', padding:'48px', textAlign:'center' }}>
            <div style={{ fontSize:'32px', marginBottom:'12px' }}>📄</div>
            <div style={{ fontWeight:600, color:'var(--text)' }}>No universities added yet</div>
            <div style={{ color:'var(--muted)', fontSize:'14px', marginTop:'8px' }}>Add universities first to track their documents.</div>
          </div>
        ) : (
          <>
            {/* Uni tabs */}
            <div style={{ background:'var(--card)', borderRadius:'var(--radius2)', border:'1px solid var(--border)', padding:'22px', marginBottom:'20px' }}>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'20px', paddingBottom:'18px', borderBottom:'1px solid var(--border)' }}>
                {universities.map(u=>{
                  const missing = missingCount(u.id)
                  return (
                    <button key={u.id} onClick={()=>setSelectedId(u.id)}
                      style={{ padding:'6px 14px', borderRadius:'7px', fontSize:'13px', fontWeight:500, cursor:'pointer', border:`1px solid ${selectedId===u.id?'rgba(34,197,94,0.25)':' var(--border)'}`, background:selectedId===u.id?'rgba(34,197,94,0.12)':'var(--bg3)', color:selectedId===u.id?'var(--green)':'var(--muted2)', transition:'all 0.15s', display:'flex', alignItems:'center', gap:'6px' }}>
                      {u.name.split(' ').slice(0,2).join(' ')}
                      {missing>0&&<span style={{ background:'var(--red)', color:'white', borderRadius:'99px', fontSize:'10px', padding:'1px 5px', fontWeight:700 }}>{missing}</span>}
                    </button>
                  )
                })}
              </div>

              {selectedUni && (
                <>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:'15px', color:'var(--text)' }}>{selectedUni.name}</div>
                      <div style={{ fontSize:'13px', color:'var(--muted2)' }}>{selectedUni.program}</div>
                    </div>
                    <div style={{ fontSize:'13px', color:'var(--muted)' }}>{currentDocs.filter(d=>d.completed).length}/{DOC_TYPES.length} complete</div>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'10px' }}>
                    {DOC_TYPES.map(dt=>{
                      const doc  = getDoc(dt.key)
                      const done = doc?.completed??false
                      const hasFile = !!doc?.file_url
                      return (
                        <div key={dt.key} onClick={()=>toggleComplete(dt.key)}
                          style={{ display:'flex', alignItems:'center', gap:'10px', padding:'12px 14px', borderRadius:'9px', border:`1px solid ${done?'rgba(34,197,94,0.2)':'rgba(239,68,68,0.15)'}`, cursor:'pointer', transition:'all 0.15s', background:done?'rgba(34,197,94,0.07)':'rgba(239,68,68,0.05)' }}>
                          <div style={{ width:'18px', height:'18px', borderRadius:'50%', border:`1.5px solid ${done?'var(--green)':'#374151'}`, background:done?'var(--green)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', flexShrink:0, color:'#0c0d0f', fontWeight:700 }}>
                            {done?'✓':''}
                          </div>
                          <div style={{ fontSize:'13px', fontWeight:500, color:done?'var(--text)':'var(--muted2)' }}>{dt.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

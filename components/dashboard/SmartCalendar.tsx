'use client'

import { useState, useMemo } from 'react'

type EventType = 'deadline' | 'exam' | 'visa' | 'scholarship'

interface CalEvent {
  id: string
  date: string     // YYYY-MM-DD
  label: string
  type: EventType
}

const TYPE_META: Record<EventType, { color: string; bg: string; icon: string; label: string }> = {
  deadline:    { color: '#ef4444', bg: 'rgba(239,68,68,0.15)',   icon: '🗓', label: 'Deadline'    },
  exam:        { color: '#818cf8', bg: 'rgba(129,140,248,0.15)', icon: '🧪', label: 'Exam'        },
  visa:        { color: '#22c55e', bg: 'rgba(34,197,94,0.15)',   icon: '🛂', label: 'Visa'        },
  scholarship: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', icon: '🎓', label: 'Scholarship' },
}

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const SAMPLE_EVENTS: CalEvent[] = [
  { id: '1', date: '', label: 'UBC Application Deadline', type: 'deadline' },
  { id: '2', date: '', label: 'IELTS Test',               type: 'exam' },
  { id: '3', date: '', label: 'Chevening Scholarship',    type: 'scholarship' },
  { id: '4', date: '', label: 'US Visa Interview',         type: 'visa' },
].map((e, i) => {
  const d = new Date()
  d.setDate(d.getDate() + [5, 12, 18, 24][i])
  return { ...e, date: d.toISOString().split('T')[0] }
})

export default function SmartCalendar() {
  const today = new Date()
  const [year, setYear]   = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [events, setEvents] = useState<CalEvent[]>(SAMPLE_EVENTS)
  const [selected, setSelected] = useState<string | null>(null)

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  )

  const eventMap = useMemo(() => {
    const map: Record<string, CalEvent[]> = {}
    events.forEach(e => {
      if (!map[e.date]) map[e.date] = []
      map[e.date].push(e)
    })
    return map
  }, [events])

  const dateKey = (d: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const todayStr = today.toISOString().split('T')[0]
  const selectedEvents = selected ? (eventMap[selected] ?? []) : []

  return (
    <div style={{ background: '#111316', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px', maxWidth: '580px' }}>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {(Object.entries(TYPE_META) as [EventType, typeof TYPE_META[EventType]][]).map(([key, meta]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: meta.color }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: meta.color }} />
            {meta.label}
          </div>
        ))}
      </div>

      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button onClick={prevMonth} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>‹</button>
        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '16px', fontWeight: 700, color: '#f0f2f5' }}>{MONTHS[month]} {year}</span>
        <button onClick={nextMonth} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>›</button>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 600, color: '#4b5563', padding: '4px 0', letterSpacing: '0.5px' }}>{d}</div>
        ))}
      </div>

      {/* Calendar cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const key = dateKey(day)
          const dayEvents = eventMap[key] ?? []
          const isToday = key === todayStr
          const isSelected = key === selected
          return (
            <div key={i} onClick={() => setSelected(isSelected ? null : key)} style={{
              minHeight: '44px', borderRadius: '8px', padding: '4px 5px', cursor: 'pointer',
              background: isSelected ? 'rgba(34,197,94,0.1)' : isToday ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: `1px solid ${isSelected ? 'rgba(34,197,94,0.3)' : isToday ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
              transition: 'background .15s'
            }}>
              <div style={{ fontSize: '12px', fontWeight: isToday ? 800 : 500, color: isToday ? '#22c55e' : '#9ca3af', marginBottom: '3px' }}>{day}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {dayEvents.slice(0, 2).map(e => (
                  <div key={e.id} style={{ width: '100%', height: '4px', borderRadius: '99px', background: TYPE_META[e.type].color }} />
                ))}
                {dayEvents.length > 2 && <div style={{ fontSize: '9px', color: '#6b7280' }}>+{dayEvents.length - 2}</div>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected day events */}
      {selected && (
        <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '14px' }}>
          <div style={{ fontSize: '12px', color: '#4b5563', marginBottom: '8px' }}>{selected}</div>
          {selectedEvents.length === 0 ? (
            <div style={{ fontSize: '13px', color: '#374151' }}>No events on this day.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedEvents.map(e => {
                const meta = TYPE_META[e.type]
                return (
                  <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '8px', background: meta.bg, border: `1px solid ${meta.color}30` }}>
                    <span>{meta.icon}</span>
                    <span style={{ fontSize: '13px', color: '#f0f2f5' }}>{e.label}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: meta.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{meta.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

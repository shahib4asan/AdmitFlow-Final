'use client'

import { useState } from 'react'

interface CountryData {
  flag: string
  name: string
  currency: string
  tuition: number       // USD/year approx
  living: number        // USD/year approx
  bankMultiplier: number // how many months of living + tuition shown in bank
  notes: string
}

const COUNTRIES: CountryData[] = [
  {
    flag: '🇺🇸', name: 'United States', currency: 'USD',
    tuition: 25000, living: 15000, bankMultiplier: 1.2,
    notes: 'I-20 requires proof of full 1st year funds'
  },
  {
    flag: '🇨🇦', name: 'Canada', currency: 'CAD',
    tuition: 20000, living: 12000, bankMultiplier: 1.1,
    notes: 'SDS stream requires $10,000 CAD GIC + 1st year tuition'
  },
  {
    flag: '🇦🇺', name: 'Australia', currency: 'AUD',
    tuition: 30000, living: 21041, bankMultiplier: 1.0,
    notes: 'Must show AUD 21,041/year living + full tuition'
  },
  {
    flag: '🇬🇧', name: 'United Kingdom', currency: 'GBP',
    tuition: 18000, living: 9207, bankMultiplier: 1.0,
    notes: 'Show 28 consecutive days of funds in bank before applying'
  },
  {
    flag: '🇩🇪', name: 'Germany', currency: 'EUR',
    tuition: 2000, living: 10332, bankMultiplier: 1.0,
    notes: 'Blocked account of €11,208 required (2024 rate)'
  },
]

// Approximate exchange rates to BDT (static for display purposes)
const BDT_RATES: Record<string, number> = {
  USD: 110,
  CAD: 81,
  AUD: 72,
  GBP: 139,
  EUR: 119,
}

function toBDT(amount: number, currency: string) {
  return Math.round(amount * (BDT_RATES[currency] ?? 1))
}

function formatBDT(amount: number) {
  if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(1)} Cr`
  if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)} L`
  return `৳${amount.toLocaleString()}`
}

export default function FundCalculator() {
  const [selected, setSelected] = useState(0)
  const country = COUNTRIES[selected]

  const tuitionBDT = toBDT(country.tuition, country.currency)
  const livingBDT  = toBDT(country.living, country.currency)
  const bankBDT    = Math.round((tuitionBDT + livingBDT) * country.bankMultiplier)

  const bars = [
    { label: 'Tuition (1st yr)',   value: tuitionBDT, color: '#818cf8' },
    { label: 'Living Cost (1 yr)', value: livingBDT,  color: '#f59e0b' },
    { label: 'Required Bank Bal.', value: bankBDT,    color: '#22c55e' },
  ]
  const maxVal = Math.max(...bars.map(b => b.value))

  return (
    <div style={{ background: '#111316', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px 24px', maxWidth: '520px' }}>
      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Fund Requirement Calculator</div>
      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '20px', fontWeight: 800, color: '#f0f2f5', marginBottom: '20px' }}>
        How much do you need?
      </div>

      {/* Country selector */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {COUNTRIES.map((c, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            padding: '6px 14px', borderRadius: '99px', fontSize: '13px', cursor: 'pointer',
            background: selected === i ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${selected === i ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.08)'}`,
            color: selected === i ? '#22c55e' : '#9ca3af',
            transition: 'all .15s'
          }}>
            {c.flag} {c.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
        {bars.map((b, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: '#9ca3af' }}>{b.label}</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#f0f2f5' }}>{formatBDT(b.value)}</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px' }}>
              <div style={{
                height: '100%', width: `${(b.value / maxVal) * 100}%`,
                background: b.color, borderRadius: '99px', transition: 'width .5s ease'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Big number */}
      <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.14)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Minimum Bank Balance Needed</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '28px', fontWeight: 800, color: '#22c55e', letterSpacing: '-1px' }}>
            {formatBDT(bankBDT)}
          </div>
        </div>
        <div style={{ fontSize: '28px' }}>{country.flag}</div>
      </div>

      <div style={{ marginTop: '12px', fontSize: '12px', color: '#4b5563', lineHeight: 1.6 }}>
        💡 {country.notes}
      </div>

      <div style={{ marginTop: '8px', fontSize: '11px', color: '#374151' }}>
        Rates are approximate. Exchange rate: 1 {country.currency} ≈ ৳{BDT_RATES[country.currency]}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProtectionCalculator() {
  const [height, setHeight] = useState(20) // meters
  const [level, setLevel] = useState('IV')  // Level I, II, III, IV

  // Protection radius table for SDC-60 ESE Arrester (NFC 17-102 / IEC 62305 standardized table for 60µs)
  const RADIUS_TABLE = {
    'I':   { 10: 79, 20: 79, 30: 79, 45: 79, 60: 79 },
    'II':  { 10: 87, 20: 87, 30: 88, 45: 89, 60: 89 },
    'III': { 10: 97, 20: 97, 30: 98, 45: 99, 60: 99 },
    'IV':  { 10: 107, 20: 107, 30: 107, 45: 107, 60: 107 }
  }

  const getRadius = (h, lvl) => {
    const table = RADIUS_TABLE[lvl] || RADIUS_TABLE['IV']
    if (h <= 10) return table[10]
    if (h <= 20) return table[20]
    if (h <= 30) return table[30]
    if (h <= 45) return table[45]
    return table[60]
  }

  const radius = getRadius(height, level)

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0d2d7a 0%, #1a4fcc 100%)',
      borderRadius: 8,
      padding: '36px 32px',
      color: '#fff',
      boxShadow: '0 20px 50px rgba(13,45,122,.25)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background accents */}
      <div style={{ position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '40%', bottom: -60, width: 180, height: 180, borderRadius: '50%', background: 'rgba(240,112,32,.08)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ background: 'var(--orange)', padding: '4px 12px', borderRadius: 20, fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: '#fff' }}>⚡ Interactive Calculator</span>
          <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>IEC 62305 &amp; NFC 17-102 Standard</span>
        </div>

        <h3 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, marginBottom: 8, color: '#fff' }}>
          ESE Protection Radius <span style={{ color: 'var(--yellow)' }}>Calculator</span>
        </h3>
        <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,.8)', maxWidth: 620, lineHeight: 1.6, marginBottom: 28 }}>
          Calculate the exact coverage radius (Rp) for the <strong>SDC-60 ESE Lightning Arrester</strong> based on your building height and protection classification level.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'center' }}>
          {/* Controls */}
          <div>
            {/* Height Slider */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.82rem', fontWeight: 700 }}>
                <span>Structure Height (h)</span>
                <span style={{ color: 'var(--yellow)', fontFamily: 'var(--ffh)', fontSize: '1.05rem' }}>{height} Meters</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="1"
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--orange)',
                  cursor: 'pointer',
                  height: 6,
                  borderRadius: 3
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'rgba(255,255,255,.5)', marginTop: 4 }}>
                <span>5m</span>
                <span>20m</span>
                <span>40m</span>
                <span>60m</span>
              </div>
            </div>

            {/* Protection Level Select */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: 10 }}>
                Protection Level Classification:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[
                  { id: 'I', label: 'Level I', desc: '99% Efficiency' },
                  { id: 'II', label: 'Level II', desc: '97% Efficiency' },
                  { id: 'III', label: 'Level III', desc: '91% Efficiency' },
                  { id: 'IV', label: 'Level IV', desc: '84% Efficiency' }
                ].map(l => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    style={{
                      padding: '10px 6px',
                      borderRadius: 4,
                      border: level === l.id ? '2px solid var(--orange)' : '1px solid rgba(255,255,255,.2)',
                      background: level === l.id ? 'var(--orange)' : 'rgba(255,255,255,.06)',
                      color: '#fff',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all .2s'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.82rem', fontWeight: 800 }}>{l.label}</div>
                    <div style={{ fontSize: '0.62rem', opacity: 0.85, marginTop: 2 }}>{l.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div style={{
            background: 'rgba(0,0,0,.25)',
            border: '1.5px solid rgba(255,255,255,.18)',
            borderRadius: 8,
            padding: '24px 28px',
            textAlign: 'center',
            backdropFilter: 'blur(6px)'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,.65)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 700, marginBottom: 6 }}>
              Protection Radius (Rp)
            </div>
            <div style={{ fontFamily: 'var(--ffh)', fontSize: '3.4rem', fontWeight: 900, color: 'var(--yellow)', lineHeight: 1, marginBottom: 8 }}>
              {radius} <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>Metres</span>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.5, marginBottom: 20 }}>
              At <strong>{height}m height</strong> (Level {level}), 1 unit of SDC-60 covers up to <strong>{(Math.PI * radius * radius / 10000).toFixed(2)} Hectares</strong> ({Math.round(Math.PI * radius * radius)} m²) ground area.
            </p>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary" style={{ fontSize: '0.78rem', padding: '10px 18px', width: '100%', justifyContent: 'center' }}>
                Get Custom System Quote →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

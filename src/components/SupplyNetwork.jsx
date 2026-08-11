import { useState } from 'react'

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jammu & Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]
const LOOP = [...STATES, ...STATES]

export default function SupplyNetwork() {
  const [paused, setPaused] = useState(false)

  return (
    <>
      <style>{`
        @keyframes marqScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marq-track {
          display: flex;
          animation: marqScroll 44s linear infinite;
          width: max-content;
        }
        .marq-track.paused { animation-play-state: paused; }
        .marq-state {
          font-size: 0.75rem; font-weight: 600; color: #fff;
          padding: 0 18px; border-right: 1px solid rgba(255,255,255,.22);
          letter-spacing: .04em; white-space: nowrap; line-height: 40px;
          display: flex; align-items: center; gap: 7px;
          transition: color .2s;
        }
        .marq-state:hover { color: var(--orange); }
        .marq-state .dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,.35); flex-shrink: 0;
          transition: background .2s;
        }
        .marq-state:hover .dot { background: var(--orange); }
        .network-label {
          background: var(--blue-dk); color: #fff;
          font-family: var(--ffh); font-size: 0.68rem; font-weight: 700;
          letter-spacing: .12em; text-transform: uppercase;
          padding: 0 20px; white-space: nowrap; flex-shrink: 0;
          border-right: 2px solid rgba(255,255,255,.18);
          display: flex; align-items: center; gap: 8px;
          height: 100%;
        }
        .pause-btn {
          background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2);
          color: #fff; padding: 0 14px; cursor: pointer; flex-shrink: 0;
          border-left: 2px solid rgba(255,255,255,.18); height: 100%;
          font-size: 0.75rem; transition: all .2s;
        }
        .pause-btn:hover { background: rgba(255,255,255,.22); }
        .network-count {
          background: var(--orange); color: #fff;
          font-family: var(--ffh); font-size: 0.6rem; font-weight: 700;
          padding: 2px 7px; border-radius: 10px; letter-spacing: .04em;
        }
      `}</style>

      <div
        style={{
          background: 'var(--orange)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'stretch',
          height: 40,
          userSelect: 'none',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>

        {/* Label */}
        <div className="network-label">
          <span>📍</span>
          Supply Network
          <span className="network-count">{STATES.length}</span>
        </div>

        {/* Scrolling states */}
        <div style={{ flex: 1, overflow: 'hidden', background: 'rgba(0,0,0,.18)' }}>
          <div className={`marq-track ${paused ? 'paused' : ''}`}>
            {LOOP.map((s, i) => (
              <div key={i} className="marq-state">
                <span className="dot" />
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Pause button */}
        <button className="pause-btn" onClick={() => setPaused(p => !p)} title={paused ? 'Resume' : 'Pause'}>
          {paused ? '▶' : '⏸'}
        </button>
      </div>
    </>
  )
}
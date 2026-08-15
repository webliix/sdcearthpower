import { Link } from 'react-router-dom'

export default function Topbar() {
  return (
    <div style={{ background: 'var(--orange)', padding: '6px 0', position: 'relative', zIndex: 600 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="tel:+919321447203" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: '#fff', fontWeight: 600 }}>
            📞 For Sales: +91 9321447203
          </a>
          <a href="mailto:sdcearthing@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'rgba(255,255,255,.9)' }}>
            ✉️ sdcearthing@gmail.com
          </a>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-appointment'))}
            style={{
              fontSize: '0.72rem',
              color: '#ffffff',
              background: 'rgba(0,0,0,.2)',
              padding: '2px 10px',
              border: '1px solid rgba(255,255,255,.4)',
              borderRadius: 3,
              cursor: 'pointer',
              fontWeight: 700,
              fontFamily: 'var(--ffh)',
              letterSpacing: '.04em',
              transition: 'all .2s',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,.4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,.2)'}
          >
            📅 Book Appointment
          </button>
          {['Media', 'Videos', 'Gallery'].map(l => (
            <Link key={l} to="/gallery" style={{
              fontSize: '0.72rem', color: 'rgba(255,255,255,.85)',
              padding: '2px 8px', border: '1px solid rgba(255,255,255,.3)',
              borderRadius: 2, transition: 'background .2s', textDecoration: 'none'
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {l}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


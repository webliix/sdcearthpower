import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CATEGORIES } from '../data/products.js'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  {
    label: 'Products', to: '/products',
    sub: CATEGORIES.filter(c => c.id !== 'all').map(c => ({
      label: c.label,
      to: `/products?cat=${c.id}`
    }))
  },
  { label: 'Why Us', to: '/why-us' },
  { label: 'Industries', to: '/industries' },
  { label: 'Certifications', to: '/certifications' },
  { label: 'Network', to: '/network' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Submit Feedback', to: '/contact', cta: true },
]

export default function Navbar({ scrollY }) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const scrolled = scrollY > 60
  const loc = useLocation()

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 500,
        background: 'var(--white)',
        borderBottom: '3px solid var(--blue)',
        boxShadow: scrolled ? '0 3px 24px rgba(26,79,204,.15)' : '0 2px 10px rgba(26,79,204,.07)',
        transition: 'box-shadow .3s'
      }}>
        <div className="container" style={{ height: 74, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
{/* LOGO */}
<Link
  to="/"
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    textDecoration: 'none',
    flexShrink: 0
  }}
>
  {/* Logo Image */}
  <div
    style={{
      width: 62,
      height: 62,
      borderRadius: '50%',
      overflow: 'hidden',
      flexShrink: 0,
      background: '#fff',
      border: '2px solid rgba(0,47,108,.12)',
      boxShadow: '0 8px 24px rgba(0,0,0,.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <img
      src="/images/sdc-power-logo.jpeg"
      alt="SDC Earth Power"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
      onError={e => {
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = '⚡';
        e.target.parentNode.style.fontSize = '1.8rem';
        e.target.parentNode.style.color = '#f07020';
      }}
    />
  </div>

  {/* Brand Text */}
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div
      className="brand-name"
      style={{
        fontFamily: 'var(--ffh)',
        fontSize: '1.65rem',
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: '.04em',
        display: 'flex',
        alignItems: 'baseline',
        gap: 6
      }}
    >
      <span style={{ color: '#0b3d91' }}>SDC</span>

      <span
        style={{
          color: '#1d2f5f',
          fontWeight: 700
        }}
      >
        EARTH
      </span>

      <span
        style={{
          color: '#e53935',
          fontWeight: 800
        }}
      >
        POWER
      </span>
    </div>

    <div
      style={{
        fontSize: '0.64rem',
        color: 'var(--dim)',
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        marginTop: 4,
        fontWeight: 600
      }}
    >
      Lightning & Earthing Protection
    </div>
  </div>
</Link>

          {/* DESKTOP MENU */}
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }} className="desk-nav">
            {NAV.map(link => (
              <li key={link.label} style={{ position: 'relative' }}
                onMouseEnter={() => link.sub && setHover(link.label)}
                onMouseLeave={() => setHover(null)}>
                <NavLink to={link.to} style={({ isActive }) => ({
                  display: 'block', fontFamily: 'var(--ffh)', fontSize: '0.82rem', fontWeight: 700,
                  color: link.cta ? 'var(--white)' : (isActive && loc.pathname === link.to ? 'var(--orange)' : 'var(--mid)'),
                  background: link.cta ? 'linear-gradient(135deg,var(--orange),var(--orange-dk))' : 'transparent',
                  padding: link.cta ? '8px 16px' : '0 12px',
                  lineHeight: link.cta ? 'normal' : '74px',
                  borderBottom: link.cta ? 'none' : '3px solid transparent',
                  marginBottom: link.cta ? 0 : '-3px',
                  borderRadius: link.cta ? 3 : 0,
                  transition: 'all .2s', whiteSpace: 'nowrap', textDecoration: 'none',
                  letterSpacing: '.01em'
                })}
                  onMouseEnter={e => { if (!link.cta) { e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.borderBottomColor = 'var(--orange)' } }}
                  onMouseLeave={e => { if (!link.cta) { e.currentTarget.style.color = ''; e.currentTarget.style.borderBottomColor = 'transparent' } }}>
                  {link.label}{link.sub ? ' ▾' : ''}
                </NavLink>

                {/* DROPDOWN */}
                {link.sub && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, zIndex: 700,
                    background: 'var(--white)', border: '1px solid var(--bdr)',
                    borderTop: '3px solid var(--orange)',
                    boxShadow: '0 10px 36px rgba(0,0,0,.12)',
                    minWidth: 230, padding: '6px 0',
                    opacity: hover === link.label ? 1 : 0,
                    visibility: hover === link.label ? 'visible' : 'hidden',
                    transform: hover === link.label ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'all .25s'
                  }}>
                    <Link to="/products" style={{ display: 'block', padding: '10px 18px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--blue)', borderBottom: '1px solid var(--lt)', background: 'var(--blue-pal)' }}>
                      All Products
                    </Link>
                    {link.sub.map(s => (
                      <Link key={s.label} to={s.to} style={{
                        display: 'block', padding: '10px 18px', fontSize: '0.78rem',
                        fontWeight: 600, color: 'var(--mid)', borderBottom: '1px solid var(--lt)',
                        transition: 'all .2s', textDecoration: 'none'
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--orange-pal)'; e.currentTarget.style.color = 'var(--orange)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--mid)' }}>
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* MOBILE HAMBURGER */}
          <button onClick={() => setOpen(!open)} className="ham-btn" style={{
            display: 'none', background: 'var(--blue-pal)',
            border: '1px solid var(--blue-mid)', borderRadius: 5,
            padding: '8px 10px', fontSize: '1.3rem', color: 'var(--blue)'
          }}>{open ? '✕' : '☰'}</button>
        </div>

        {/* MOBILE DRAWER */}
        {open && (
          <>
            <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 799 }} />
            <div style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(300px,85vw)', background: 'var(--white)',
              borderLeft: '3px solid var(--orange)', zIndex: 800, overflowY: 'auto',
              boxShadow: '-8px 0 40px rgba(0,0,0,.15)'
            }}>
              <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--bdr)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--blue-pal)' }}>
                <span style={{ fontFamily: 'var(--ffh)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>
                  SDC <span style={{ color: 'var(--orange)' }}>EARTH POWER</span>
                </span>
                <button onClick={() => setOpen(false)} style={{ background: 'var(--orange-pal)', border: 'none', borderRadius: 4, padding: '6px 10px', color: 'var(--orange)', fontSize: '1rem' }}>✕</button>
              </div>
              {NAV.map(link => (
                <Link key={link.label} to={link.to} onClick={() => setOpen(false)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 20px', fontFamily: 'var(--ffh)', fontWeight: 700,
                  fontSize: '0.95rem', color: 'var(--mid)',
                  borderBottom: '1px solid var(--lt)', transition: 'all .2s', textDecoration: 'none'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-pal)'; e.currentTarget.style.color = 'var(--blue)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--mid)' }}>
                  {link.label} ›
                </Link>
              ))}
              <div style={{ padding: 20 }}>
                <a href="tel:+919321447203" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem' }}>
                  📞 +91 9321447203
                </a>
              </div>
            </div>
          </>
        )}
      </nav>

      <style>{`
        @media(max-width:1150px){.desk-nav{display:none!important}.ham-btn{display:block!important}}
        @media(max-width:480px){
          .brand-name{font-size:1.25rem!important;gap:4px!important}
          nav .container{padding:0 12px!important}
        }
      `}</style>
    </>
  )
}


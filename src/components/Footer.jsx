import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products.js'

const QLINKS = [
  { l: 'Home', to: '/' },
  { l: 'About Us', to: '/about' },
  { l: 'Products', to: '/products' },
  { l: 'Why Choose Us', to: '/why-us' },
  { l: 'Industries We Serve', to: '/industries' },
  { l: 'Certifications', to: '/certifications' },
  { l: 'Supply Network', to: '/network' },
  { l: 'Gallery', to: '/gallery' },
  { l: 'Contact Us', to: '/contact' },
]

const SOCIALS = [
  { ic: 'f', label: 'Facebook', href: '#', color: '#1877f2' },
  { ic: 'in', label: 'LinkedIn', href: '#', color: '#0a66c2' },
  { ic: '▶', label: 'YouTube', href: '#', color: '#ff0000' },
  { ic: 'tw', label: 'Twitter', href: '#', color: '#1da1f2' },
]

export default function Footer() {
  const featProds = PRODUCTS.slice(0, 10)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes('@')) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 5000)
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes checkIn { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }

        .footer-link {
          display: flex; gap: 8px; align-items: flex-start;
          color: rgba(255,255,255,.5); font-size: 0.78rem;
          margin-bottom: 10px; transition: all .22s; text-decoration: none;
          padding: 3px 0;
        }
        .footer-link:hover { color: var(--orange); transform: translateX(3px); }
        .footer-link .arr { color: var(--orange); font-size: 0.68rem; flex-shrink: 0; margin-top: 2px; transition: transform .2s; }
        .footer-link:hover .arr { transform: translateX(3px); }

        .contact-row-ft { display: flex; gap: 11px; align-items: flex-start; margin-bottom: 12px; }
        .contact-icon-ft {
          width: 34px; height: 34px; background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1); border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; flex-shrink: 0; transition: all .25s;
        }
        .contact-row-ft:hover .contact-icon-ft { background: var(--orange); border-color: var(--orange); }
        .contact-row-ft a { color: rgba(255,255,255,.7); text-decoration: none; font-size: 0.79rem; transition: color .2s; line-height: 1.6; }
        .contact-row-ft a:hover { color: var(--orange); }
        .contact-row-ft span { color: rgba(255,255,255,.5); font-size: 0.79rem; line-height: 1.65; }

        .footer-head {
          font-family: var(--ffh); font-size: 0.84rem; font-weight: 700;
          color: #fff; letter-spacing: .09em; text-transform: uppercase;
          padding-bottom: 10px; border-bottom: 2px solid var(--orange);
          margin-bottom: 18px; position: relative;
        }
        .footer-head::before {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 28px; height: 2px; background: var(--yellow);
        }

        .social-btn {
          width: 34px; height: 34px; background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12); border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.74rem; font-weight: 700; color: rgba(255,255,255,.55);
          transition: all .3s cubic-bezier(.34,1.56,.64,1); text-decoration: none;
          cursor: pointer;
        }
        .social-btn:hover { transform: translateY(-4px) scale(1.1); color: #fff; }

        .newsletter-input {
          flex: 1; background: rgba(255,255,255,.07); border: 1.5px solid rgba(255,255,255,.15);
          border-radius: 3px 0 0 3px; padding: 10px 14px;
          font-family: var(--ff); font-size: 0.82rem; color: #fff; outline: none;
          transition: border-color .25s;
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,.35); }
        .newsletter-input:focus { border-color: var(--orange); background: rgba(255,255,255,.1); }
        .newsletter-btn {
          background: var(--orange); color: #fff; border: none;
          padding: 10px 16px; font-family: var(--ffh); font-size: 0.76rem;
          font-weight: 700; cursor: pointer; border-radius: 0 3px 3px 0;
          transition: all .25s; white-space: nowrap;
        }
        .newsletter-btn:hover { background: var(--orange-dk); }

        .cert-chip {
          background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.14);
          color: rgba(255,255,255,.65); font-size: 0.66rem; font-weight: 700;
          padding: 4px 10px; letter-spacing: .07em; transition: all .25s;
          white-space: nowrap;
        }
        .cert-chip:hover { background: rgba(240,112,32,.2); border-color: rgba(240,112,32,.4); color: var(--orange); }

        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.4fr; gap: 40px; }
        .footer-bottom-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }

        @media(max-width:1100px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }
        @media(max-width:640px) { .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; } .footer-bottom-inner { flex-direction: column !important; text-align: center !important; } }
      `}</style>

      <footer style={{ background: 'var(--blue-nav, #0a1628)', borderTop: '3px solid var(--orange)' }}>

        {/* PRE-FOOTER: Newsletter/CTA strip */}
        <div style={{ background: 'rgba(255,255,255,.04)', borderBottom: '1px solid rgba(255,255,255,.08)', padding: '28px 0' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 6 }}>Stay Updated</div>
              <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>Get Technical Updates &amp; Product News</div>
            </div>
            <div>
              {subscribed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#4caf50', animation: 'fadeIn .4s ease', background: 'rgba(76,175,80,.1)', border: '1px solid rgba(76,175,80,.3)', padding: '10px 18px', borderRadius: 3 }}>
                  <span style={{ animation: 'checkIn .4s ease' }}>✓</span>
                  <span style={{ fontFamily: 'var(--ffh)', fontWeight: 700, fontSize: '0.86rem' }}>Subscribed! Thank you.</span>
                </div>
              ) : (
                <div style={{ display: 'flex', maxWidth: 360 }}>
                  <input className="newsletter-input" type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()} />
                  <button className="newsletter-btn" onClick={handleSubscribe}>Subscribe →</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="container" style={{ padding: '56px 24px 44px' }}>
          <div className="footer-grid">

            {/* COL 1: BRAND + CONTACT */}
            <div>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'linear-gradient(135deg,var(--blue),var(--blue-dk))', border: '2.5px solid var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, transition: 'transform .3s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'rotate(8deg) scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0) scale(1)'}>
                  <img src="/images/sdc-power-logo.png" alt="SDC Earth Power" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.style.display = 'none'; e.target.parentNode.textContent = '⚡'; e.target.parentNode.style.cssText += 'color:#fff;font-size:1.4rem;display:flex;align-items:center;justify-content:center' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.35rem', fontWeight: 700, color: '#fff', letterSpacing: '.06em' }}>
                    SDC <span style={{ color: 'var(--orange)' }}>EARTH POWER</span>
                  </div>
                  <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,.38)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: 2 }}>
                    Sunsdust Commercial Pvt. Ltd.
                  </div>
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,.48)', fontSize: '0.78rem', lineHeight: 1.85, marginBottom: 22 }}>
                CPRI-certified manufacturer and supplier of ESE Lightning Arresters, Surge Protection Devices, GI &amp; Copper Bonded Earth Electrodes. IEC 62305 &amp; IS 2309-1989 compliant. Pan India supply.
              </p>

              {/* Cert chips */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
                {['CPRI Tested', 'IEC 62305', 'IS 3043', 'IS 2309', 'IP65'].map(c => (
                  <span key={c} className="cert-chip">{c}</span>
                ))}
              </div>

              <div className="footer-head">Contact Us</div>

              <div>
                {[
                  { icon: '✉️', val: 'sdcearthing@gmail.com', href: 'mailto:sdcearthing@gmail.com', label: 'Email' },
                  { icon: '📞', val: '+91 9321447203', href: 'tel:+919321447203', label: 'Phone / WhatsApp' },
                  { icon: '📍', val: 'Khasra No-267, Badhpura, Dadri,\nGB Nagar, UP – 203207', href: null, label: 'Address' },
                ].map(({ icon, val, href, label }) => (
                  <div key={label} className="contact-row-ft">
                    <div className="contact-icon-ft">{icon}</div>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,.28)', fontSize: '0.6rem', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
                      {href
                        ? <a href={href}>{val}</a>
                        : <span style={{ whiteSpace: 'pre-line' }}>{val}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* GST */}
              <div style={{ marginTop: 14, padding: '8px 14px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderLeft: '3px solid var(--orange)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'rgba(255,255,255,.45)', fontSize: '0.68rem', letterSpacing: '.06em' }}>GSTIN:</span>
                <span style={{ color: 'var(--orange)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '.04em' }}>09ABBCS2487A1ZG</span>
              </div>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} className="social-btn"
                    style={{ '--hover-c': s.color }}
                    onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; e.currentTarget.style.color = 'rgba(255,255,255,.55)' }}>
                    {s.ic}
                  </a>
                ))}
              </div>
            </div>

            {/* COL 2: QUICK LINKS */}
            <div>
              <div className="footer-head">Quick Links</div>
              {QLINKS.map(l => (
                <Link key={l.l} to={l.to} className="footer-link">
                  <span className="arr">»</span> {l.l}
                </Link>
              ))}
            </div>

            {/* COL 3: PRODUCT RANGE */}
            <div>
              <div className="footer-head">Product Range</div>
              {featProds.map(p => (
                <Link key={p.id} to={`/products/${p.slug}`} className="footer-link">
                  <span className="arr">»</span> {p.name}
                </Link>
              ))}
              <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, color: 'var(--orange)', fontSize: '0.76rem', fontWeight: 700, textDecoration: 'none', transition: 'gap .2s' }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}>
                View All Products →
              </Link>
            </div>

            {/* COL 4: MAP */}
            <div>
              <div className="footer-head">Our Location</div>
              <div style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,.12)', marginBottom: 14, position: 'relative' }}>
                {/* Map header */}
                <div style={{ background: 'var(--blue-dk)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid rgba(255,255,255,.1)' }}>
                  <span style={{ fontSize: '0.8rem' }}>📍</span>
                  <span style={{ color: 'rgba(255,255,255,.7)', fontSize: '0.7rem', fontWeight: 600 }}>Badhpura, Dadri, UP</span>
                </div>
                <iframe title="SDC Power Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.83!2d77.5565562!3d28.5711388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xad9de6c3beeee513%3A0x4ec9f5d4661b4eb9!2sSUNSDUST%20COMMERCIAL%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="185" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" />
              </div>

              <a href="https://maps.google.com/?q=Sunsdust+Commercial+Private+Limited" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--orange)', fontSize: '0.78rem', fontWeight: 700, marginBottom: 16, textDecoration: 'none', transition: 'gap .2s' }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '7px'}>
                📍 Get Directions →
              </a>

              <a href="https://sdcearthpower.com" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ marginBottom: 16 }}>
                <span className="arr">»</span> 🌐 sdcearthpower.com
              </a>

              {/* Business hours */}
              <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', padding: '14px 16px', borderLeft: '3px solid var(--orange)' }}>
                <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--orange)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>Business Hours</div>
                <div style={{ color: 'rgba(255,255,255,.6)', fontSize: '0.78rem', lineHeight: 1.7 }}>
                  Mon – Sat: <strong style={{ color: '#fff' }}>9:00 AM – 7:00 PM</strong><br />
                  Sunday: <span style={{ color: 'rgba(255,255,255,.35)' }}>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', padding: '16px 24px' }}>
          <div className="container">
            <div className="footer-bottom-inner">
              <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '0.71rem', margin: 0 }}>
                © {new Date().getFullYear()} Sunsdust Commercial Private Limited. All Rights Reserved. | SDC Earth Power™ | Developed and managed by <a href="https://webliix.in" target='_blank'>Webliix</a>
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['CPRI Tested', 'IEC 62305', 'IS 2309-1989', 'IS 3043'].map((t, i) => (
                  <span key={t} style={{ color: 'rgba(255,255,255,.25)', fontSize: '0.68rem' }}>
                    {i > 0 && <span style={{ marginRight: 6, opacity: 0.4 }}>·</span>}{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
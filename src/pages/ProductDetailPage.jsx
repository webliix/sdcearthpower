import { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getBySlug, getRelated, CATEGORIES } from '../data/products.js'
import { Helmet } from 'react-helmet-async'

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = getBySlug(slug)
  const [tab, setTab] = useState('specs')
  const [formSent, setFormSent] = useState(false)
  const [focused, setFocused] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({ name: '', phone: '', email: '', qty: '', message: '' })
  const [imgZoomed, setImgZoomed] = useState(false)
  useScrollReveal()

  if (!product) return <Navigate to="/products" replace />

  const related = getRelated(product)
  const catLabel = CATEGORIES.find(c => c.id === product.category)?.label || product.category

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.phone.trim()) e.phone = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSend = () => {
    if (!validate()) return
    const sub = encodeURIComponent(`SDC Earth Power Enquiry — ${product.name} — ${form.name}`)
    const body = encodeURIComponent(`Product: ${product.name}\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nQty: ${form.qty}\nMessage: ${form.message}`)
    window.open(`mailto:sdcearthing@gmail.com?subject=${sub}&body=${body}`)
    setFormSent(true)
    setTimeout(() => setFormSent(false), 5000)
  }

  const inputStyle = (name) => ({
    width: '100%',
    background: focused === name ? 'var(--white)' : 'var(--off)',
    border: `1.5px solid ${errors[name] ? '#e53935' : focused === name ? 'var(--orange)' : 'var(--bdr)'}`,
    borderRadius: 3,
    padding: '11px 13px',
    fontFamily: 'var(--ff)',
    fontSize: '0.84rem',
    color: 'var(--dark)',
    outline: 'none',
    marginBottom: errors[name] ? 4 : 10,
    transition: 'all .25s',
    boxShadow: focused === name ? '0 0 0 3px rgba(240,112,32,.1)' : 'none',
  })

  const productUrl = `https://sdcearthpower.com/products/${product.slug}`

  return (
    <>
    <Helmet>
  <title>{product.name} | {catLabel} | SDC Earth Power India</title>
  <meta name="description" content={`${product.name} – ${product.tagline}. ${product.shortDesc} ${product.standards} compliant. CPRI tested. Manufacturer & supplier India. Get a quote: +91 9321447203.`} />
  <meta name="keywords" content={`${product.name}, ${catLabel} manufacturer India, ${product.standards.replace(/·/g,',')}, lightning protection India, SDC Earth Power`} />
  <link rel="canonical" href={productUrl} />
  <meta property="og:title" content={`${product.name} – ${product.tagline} | SDC Earth Power`} />
  <meta property="og:description" content={`${product.shortDesc} ${product.standards}. CPRI tested manufacturer. Pan India supply.`} />
  <meta property="og:url" content={productUrl} />
  <meta property="og:image" content={`https://sdcearthpower.com${product.img}`} />
  <meta property="og:type" content="product" />
  <script type="application/ld+json">{`
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${product.name}",
    "description": "${product.shortDesc}",
    "image": "https://sdcearthpower.com${product.img}",
    "sku": "${product.id}",
    "brand": {
      "@type": "Brand",
      "name": "SDC Earth Power"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Sunsdust Commercial Private Limited",
      "url": "https://sdcearthpower.com"
    },
    "mpn": "${product.id}-IN",
    "offers": {
      "@type": "Offer",
      "url": "${productUrl}",
      "priceCurrency": "INR",
      "price": "Contact for Price",
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Sunsdust Commercial Private Limited"
      }
    },
    "additionalProperty": [
      {"@type":"PropertyValue","name":"Compliance Standards","value":"${product.standards}"},
      {"@type":"PropertyValue","name":"Country of Origin","value":"India"}
    ],
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type":"ListItem","position":1,"name":"Home","item":"https://sdcearthpower.com/"},
        {"@type":"ListItem","position":2,"name":"Products","item":"https://sdcearthpower.com/products"},
        {"@type":"ListItem","position":3,"name":"${catLabel}","item":"https://sdcearthpower.com/products?cat=${product.category}"},
        {"@type":"ListItem","position":4,"name":"${product.name}","item":"${productUrl}"}
      ]
    }
  }
  `}</script>
</Helmet>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        .reveal { opacity:0; transform:translateY(24px); transition:opacity .6s ease, transform .6s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .reveal-left { opacity:0; transform:translateX(-24px); transition:opacity .6s ease, transform .6s ease; }
        .reveal-left.visible { opacity:1; transform:translateX(0); }
        .reveal-right { opacity:0; transform:translateX(24px); transition:opacity .6s ease, transform .6s ease; }
        .reveal-right.visible { opacity:1; transform:translateX(0); }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes checkIn { 0%{transform:scale(0) rotate(-30deg)} 60%{transform:scale(1.2) rotate(5deg)} 100%{transform:scale(1) rotate(0)} }
        @keyframes shimmer { 0%{opacity:.5} 50%{opacity:1} 100%{opacity:.5} }

        .btn-primary { display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--orange);color:#fff;padding:13px 22px;font-family:var(--ffh);font-size:0.84rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s;width:100%; }
        .btn-primary:hover:not(:disabled) { transform:translateY(-2px);box-shadow:0 8px 24px rgba(240,112,32,.4); }
        .btn-primary:disabled { opacity:.7;cursor:not-allowed; }
        .btn-secondary { display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--blue);padding:11px 20px;font-family:var(--ffh);font-size:0.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:2px solid var(--blue);cursor:pointer;transition:all .3s; }
        .btn-secondary:hover { background:var(--blue);color:#fff; }

        .tab-btn { padding:12px 22px;font-family:var(--ffh);font-weight:700;font-size:0.86rem;border:none;cursor:pointer;letter-spacing:.04em;transition:all .25s;border-bottom:3px solid transparent;margin-bottom:-2px;white-space:nowrap; }
        .tab-btn.active { background:var(--blue);color:#fff;border-bottom-color:var(--orange); }
        .tab-btn:not(.active) { background:var(--off);color:var(--mid); }
        .tab-btn:not(.active):hover { background:var(--blue-pal);color:var(--blue); }

        .spec-row { display:flex;justify-content:space-between;padding:11px 18px;border-bottom:1px solid var(--bdr);transition:background .2s; }
        .spec-row:last-child { border-bottom:none; }
        .spec-row:hover { background:var(--blue-pal); }

        .feat-item { display:flex;gap:12px;align-items:flex-start;background:var(--off);border:1px solid var(--bdr);padding:14px 16px;border-left:3px solid var(--orange);transition:all .25s; }
        .feat-item:hover { border-left-color:var(--blue);transform:translateX(3px);box-shadow:0 3px 12px rgba(26,79,204,.07); }

        .app-item { background:var(--blue-pal);border:1px solid var(--blue-mid);padding:13px 16px;display:flex;gap:10px;align-items:center;border-radius:3px;transition:all .25s; }
        .app-item:hover { background:var(--blue);border-color:var(--blue); }
        .app-item:hover span { color:#fff !important; }

        .related-card { text-decoration:none;background:var(--white);border:1px solid var(--bdr);overflow:hidden;transition:all .35s cubic-bezier(.34,1.56,.64,1);display:block;position:relative; }
        .related-card::after { content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--blue),var(--orange));opacity:0;transition:opacity .25s; }
        .related-card:hover { border-color:var(--blue-mid);box-shadow:0 12px 36px rgba(26,79,204,.12);transform:translateY(-5px); }
        .related-card:hover::after { opacity:1; }

        .sidebar-contact-link { display:flex;gap:10px;align-items:center;color:rgba(255,255,255,.8);font-size:0.82rem;margin-bottom:12px;transition:all .25s;text-decoration:none;padding:9px 12px;border-radius:3px; }
        .sidebar-contact-link:hover { color:var(--orange);background:rgba(255,255,255,.06); }

        .success-banner { background:linear-gradient(135deg,#2e7d32,#43a047);color:#fff;padding:14px 18px;border-radius:3px;display:flex;align-items:center;gap:12px;margin-bottom:14px;animation:fadeIn .4s ease; }
        .success-icon { width:32px;height:32px;background:rgba(255,255,255,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;animation:checkIn .5s cubic-bezier(.34,1.56,.64,1);flex-shrink:0; }

        .detail-layout { display:grid;grid-template-columns:1fr 360px;gap:40px;align-items:start;min-width:0;width:100%; }
        .detail-top { display:grid;grid-template-columns:1fr 1fr;gap:24px;min-width:0;width:100%; }
        .feat-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:12px;min-width:0; }
        .related-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:18px; }

        @media(max-width:1100px) { .detail-layout { grid-template-columns:1fr !important; gap:24px !important; } aside { position:static !important; width:100% !important; } }
        @media(max-width:768px) {
          .detail-top { grid-template-columns:1fr !important; gap:20px !important; }
          .feat-grid { grid-template-columns:1fr !important; }
          .hero-poly { display:none !important; }
        }
        @media(max-width:600px) {
          h1 { font-size:1.6rem !important; }
          .tab-btn { padding:10px 12px !important; font-size:0.75rem !important; }
          .container-padded { padding:20px 12px !important; }
          .related-grid { grid-template-columns:1fr !important; }
          .form-panel-pd { padding:18px 14px !important; }
        }
      `}</style>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(125deg,#e8f0fe 0%,#eaf0fd 40%,#d0e4ff 100%)', padding: '44px 0 36px', borderBottom: '3px solid var(--blue)', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-poly" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '32%', background: 'linear-gradient(135deg,var(--blue),var(--blue-dk))', clipPath: 'polygon(70px 0,100% 0,100% 100%,0 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 16, fontSize: '0.74rem', color: 'var(--muted)' }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '/products' },
              { label: catLabel, to: `/products?cat=${product.category}` },
              { label: product.name, current: true },
            ].map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i > 0 && <span style={{ color: 'var(--dim)' }}>›</span>}
                {item.current
                  ? <span style={{ color: 'var(--orange)', fontWeight: 600 }}>{item.label}</span>
                  : <Link to={item.to} style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--orange)'}
                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}>{item.label}</Link>}
              </span>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ background: product.bc || 'var(--orange)', color: '#fff', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '.14em', padding: '5px 14px', textTransform: 'uppercase', borderRadius: 2 }}>{product.badge}</span>
            <span style={{ background: 'var(--blue)', color: '#fff', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '.12em', padding: '5px 14px', textTransform: 'uppercase', borderRadius: 2 }}>{catLabel}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.15 }}>{product.name}</h1>
          <p style={{ color: 'var(--orange)', fontFamily: 'var(--ffh)', fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 }}>{product.tagline}</p>
        </div>
      </div>

      <div className="container container-padded" style={{ padding: '48px 24px', maxWidth: '100%', overflowX: 'hidden' }}>
        <div className="detail-layout">

          {/* LEFT: main content */}
          <div style={{ minWidth: 0, width: '100%' }}>
            {/* Product image + key facts */}
            <div className="detail-top" style={{ marginBottom: 36 }}>
              {/* Image */}
              <div style={{ background: '#ffffff', border: '1px solid var(--bdr)', borderRadius: 4, overflow: 'hidden', position: 'relative', height: 'clamp(260px, 45vw, 380px)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: imgZoomed ? 'zoom-out' : 'zoom-in', boxShadow: '0 4px 16px rgba(0,0,0,.04)' }}
                onClick={() => setImgZoomed(z => !z)}>
                <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px', position: 'absolute', inset: 0, transition: 'transform .4s ease', transform: imgZoomed ? 'scale(1.2)' : 'scale(1)' }}
                  onError={e => e.target.style.display = 'none'} />
                <span style={{ fontSize: '5rem', opacity: 0.05, position: 'relative', zIndex: 1 }}>⚡</span>
                <div style={{ position: 'absolute', bottom: 12, left: 12, zIndex: 2 }}>
                  <span style={{ background: product.bc || 'var(--orange)', color: '#fff', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '.14em', padding: '4px 10px', textTransform: 'uppercase', borderRadius: 2 }}>{product.badge}</span>
                </div>
                <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, background: 'rgba(255,255,255,.9)', border: '1px solid var(--bdr)', borderRadius: 3, padding: '4px 8px', fontSize: '0.65rem', color: 'var(--muted)', fontWeight: 600, boxShadow: '0 2px 6px rgba(0,0,0,.08)' }}>
                  {imgZoomed ? '🔍− Zoom Out' : '🔍+ Click to Zoom'}
                </div>
              </div>

              {/* Key Facts */}
              <div>
                <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14, paddingBottom: 10, borderBottom: '2px solid var(--orange)' }}>Key Facts</div>
                <div style={{ background: 'var(--white)', border: '1px solid var(--bdr)', marginBottom: 14, borderRadius: 3, overflow: 'hidden' }}>
                  {product.specs.slice(0, 6).map(([k, v], i) => (
                    <div key={k} className="spec-row" style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--off)', display: 'flex', justifyContent: 'space-between', padding: '11px 14px', gap: 8, wordBreak: 'break-word' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '0.78rem', flex: '1 1 120px' }}>{k}</span>
                      <span style={{ color: 'var(--dark)', fontSize: '0.78rem', fontWeight: 700, textAlign: 'right', wordBreak: 'break-word', flex: '1 1 auto' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '13px 16px', background: 'var(--blue-pal)', border: '1px solid var(--blue-mid)', borderRadius: 3 }}>
                  <div style={{ color: 'var(--blue)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 6 }}>COMPLIANCE STANDARDS</div>
                  <div style={{ color: 'var(--mid)', fontSize: '0.8rem', fontWeight: 600, lineHeight: 1.6 }}>{product.standards}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 36 }} className="reveal">
              <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid var(--orange)' }}>Product Description</div>
              {(product.desc || '').split('\n\n').filter(Boolean).map((para, i) => (
                <p key={i} style={{ color: 'var(--mid)', fontSize: '0.9rem', lineHeight: 1.9, marginBottom: 16 }}>{para.trim()}</p>
              ))}
            </div>

            {/* TABS */}
            <div className="reveal">
              <div style={{ display: 'flex', borderBottom: '2px solid var(--bdr)', marginBottom: 24, gap: 0, overflowX: 'auto' }}>
                {[['specs', 'Full Specifications'], ['features', 'Key Features'], ['apps', 'Applications']].map(([id, label]) => (
                  <button key={id} onClick={() => setTab(id)} className={`tab-btn ${tab === id ? 'active' : ''}`}>{label}</button>
                ))}
              </div>

              {/* Specs tab */}
              {tab === 'specs' && (
                <div style={{ background: 'var(--white)', border: '1px solid var(--bdr)', borderRadius: 4, overflowX: 'auto', animation: 'fadeIn .3s ease' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
                    <thead>
                      <tr style={{ background: 'var(--blue-dk)' }}>
                        <th style={{ fontFamily: 'var(--ffh)', fontSize: '0.76rem', fontWeight: 700, color: '#fff', letterSpacing: '.1em', textTransform: 'uppercase', padding: '13px 18px', textAlign: 'left', width: '42%' }}>Parameter</th>
                        <th style={{ fontFamily: 'var(--ffh)', fontSize: '0.76rem', fontWeight: 700, color: 'var(--yellow)', letterSpacing: '.1em', textTransform: 'uppercase', padding: '13px 18px', textAlign: 'left' }}>Value / Specification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.specs.map(([k, v], i) => (
                        <tr key={k} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--off)', borderBottom: '1px solid var(--bdr)', transition: 'background .2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-pal)'}
                          onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--white)' : 'var(--off)'}>
                          <td style={{ padding: '11px 18px', fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 600 }}>{k}</td>
                          <td style={{ padding: '11px 18px', fontSize: '0.82rem', color: 'var(--dark)', fontWeight: 700 }}>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Features tab */}
              {tab === 'features' && (
                <div className="feat-grid" style={{ animation: 'fadeIn .3s ease' }}>
                  {(product.features || []).map(f => (
                    <div key={f} className="feat-item">
                      <span style={{ color: 'var(--orange)', flexShrink: 0, fontSize: '1rem', marginTop: 2 }}>✓</span>
                      <span style={{ color: 'var(--dark)', fontSize: '0.84rem', fontWeight: 600, lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Applications tab */}
              {tab === 'apps' && (
                <div style={{ animation: 'fadeIn .3s ease' }}>
                  <p style={{ color: 'var(--mid)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 20 }}>
                    The <strong style={{ color: 'var(--dark)' }}>{product.name}</strong> is trusted by engineers, consultants, and contractors across the following sectors and applications:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 12 }}>
                    {(product.apps || []).map(app => (
                      <div key={app} className="app-item">
                        <span style={{ color: 'var(--blue)', fontSize: '1.1rem', transition: 'color .25s' }}>🏭</span>
                        <span style={{ color: 'var(--dark)', fontSize: '0.84rem', fontWeight: 600, transition: 'color .25s' }}>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT sidebar */}
          <aside style={{ position: 'sticky', top: 90 }}>
            {/* Quick Enquiry Form */}
            <div className="form-panel-pd" style={{ background: 'var(--white)', border: '1px solid var(--bdr)', borderTop: '4px solid var(--orange)', padding: '24px 22px', marginBottom: 18, boxShadow: '0 6px 24px rgba(26,79,204,.07)', width: '100%', boxSizing: 'border-box' }}>
              <h3 style={{ fontFamily: 'var(--ffh)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 5 }}>Request a Quote</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.76rem', marginBottom: 18, lineHeight: 1.6 }}>Tell us your requirements — we respond within 24 hours with pricing.</p>

              {formSent && (
                <div className="success-banner">
                  <div className="success-icon">✓</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.86rem', marginBottom: 2 }}>Enquiry Sent!</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>We'll respond within 24 hours.</div>
                  </div>
                </div>
              )}

              {[
                ['name', 'Your Name *', 'text'],
                ['phone', 'Phone / WhatsApp *', 'tel'],
                ['email', 'Email Address', 'email'],
                ['qty', 'Quantity Required', 'text'],
              ].map(([k, ph, t]) => (
                <div key={k}>
                  <input type={t} placeholder={ph} value={form[k]}
                    onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                    onFocus={() => setFocused(k)} onBlur={() => setFocused('')}
                    style={inputStyle(k)} />
                  {errors[k] && <div style={{ color: '#e53935', fontSize: '0.68rem', marginBottom: 8, marginTop: -2 }}>⚠ {errors[k]}</div>}
                </div>
              ))}

              <textarea placeholder="Additional requirements, site details, soil conditions..."
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={3} onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                style={{ ...inputStyle('message'), resize: 'vertical' }} />

              <button onClick={handleSend} className="btn-primary" disabled={formSent}>
                {formSent ? '✓ Enquiry Sent!' : '📤 Send Enquiry'}
              </button>

              <p style={{ color: 'var(--dim)', fontSize: '0.66rem', textAlign: 'center', marginTop: 12 }}>
                Confidential — used only to respond to your enquiry.
              </p>
            </div>

            {/* Direct contact */}
            <div style={{ background: 'var(--blue-dk)', padding: '18px 20px', marginBottom: 18 }}>
              <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--orange)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 14 }}>Contact Us Directly</div>
              {[
                { i: '📞', v: '+91 7599700620', h: 'https://wa.me/917599700620', label: 'Call / WhatsApp' },
                { i: '✉️', v: 'sdcearthing@gmail.com', h: 'mailto:sdcearthing@gmail.com', label: 'Email' },
              ].map(({ i, v, h, label }) => (
                <a key={v} href={h} className="sidebar-contact-link">
                  <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{i}</div>
                  <div>
                    <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,.4)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{v}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Standards */}
            <div style={{ background: 'var(--off)', border: '1px solid var(--bdr)', padding: '18px 20px', borderLeft: '3px solid var(--orange)' }}>
              <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14 }}>Compliance Standards</div>
              {(product.standards || '').split('·').filter(Boolean).map(s => (
                <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 9 }}>
                  <span style={{ width: 8, height: 8, background: 'var(--orange)', borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--mid)', fontWeight: 600, lineHeight: 1.4 }}>{s.trim()}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <div style={{ marginTop: 64 }} className="reveal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, paddingBottom: 12, borderBottom: '2px solid var(--bdr)', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', position: 'relative', paddingBottom: 0 }}>
                Related Products
                <div style={{ height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))', marginTop: 8, width: 48 }} />
              </div>
              <Link to="/products" style={{ fontSize: '0.82rem', color: 'var(--blue)', fontFamily: 'var(--ff)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'gap .2s' }}
                onMouseEnter={e => e.currentTarget.style.gap = '8px'}
                onMouseLeave={e => e.currentTarget.style.gap = '4px'}>View All Products →</Link>
            </div>
            <div className="related-grid">
              {related.map((rp, i) => (
                <Link key={rp.id} to={`/products/${rp.slug}`} className="related-card" style={{ transitionDelay: `${i * 0.06}s` }}>
                  <div style={{ height: 156, background: 'var(--off)', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--bdr)' }}>
                    <img src={rp.img} alt={rp.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, transition: 'transform .5s' }}
                      onError={e => e.target.style.display = 'none'}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                    <span style={{ position: 'absolute', top: 10, left: 10, background: rp.bc || 'var(--orange)', color: '#fff', fontSize: '0.52rem', fontWeight: 700, padding: '3px 8px', textTransform: 'uppercase', borderRadius: 2 }}>{rp.badge}</span>
                  </div>
                  <div style={{ padding: '16px 18px 20px' }}>
                    <div style={{ color: 'var(--dim)', fontSize: '0.58rem', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 6 }}>
                      {CATEGORIES.find(c => c.id === rp.category)?.label}
                    </div>
                    <h4 style={{ fontFamily: 'var(--ffh)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.3 }}>{rp.name}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '0.73rem', lineHeight: 1.6, marginBottom: 12 }}>{rp.tagline}</p>
                    <span style={{ color: 'var(--orange)', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5 }}>View Specs →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
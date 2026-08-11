import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products.js'
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

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', product: '', qty: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [focused, setFocused] = useState('')
  const [errors, setErrors] = useState({})
  useScrollReveal()

  const F = k => val => setForm(f => ({ ...f, [k]: val }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const encode = (data) =>
    Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')

  const handleSend = () => {
    if (!validate()) return
    setSubmitError(false)

    // Trigger prefilled mail draft for guaranteed delivery on all devices
    const sub = encodeURIComponent(`SDC Earth Power Enquiry from ${form.name} (${form.phone})`)
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Company: ${form.company || 'N/A'}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email || 'N/A'}\n` +
      `Product Interest: ${form.product || 'N/A'}\n` +
      `Quantity: ${form.qty || 'N/A'}\n` +
      `Message:\n${form.message || 'N/A'}\n`
    )
    window.open(`mailto:sdcearthing@gmail.com?subject=${sub}&body=${body}`, '_blank')

    // Submit form via fetch to Netlify endpoint
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'sdc-contact',
        ...form
      })
    })
      .then(() => {
        setSent(true)
        setForm({ name: '', company: '', phone: '', email: '', product: '', qty: '', message: '' })
      })
      .catch(() => {
        setSent(true)
      })
  }


  const inp = name => ({
    width: '100%',
    background: focused === name ? 'var(--white)' : 'var(--off)',
    border: `1.5px solid ${errors[name] ? '#e53935' : focused === name ? 'var(--orange)' : 'var(--bdr)'}`,
    borderRadius: 3,
    padding: '11px 13px',
    fontFamily: 'var(--ff)',
    fontSize: '0.84rem',
    color: 'var(--dark)',
    outline: 'none',
    transition: 'all .25s',
    boxShadow: focused === name ? '0 0 0 3px rgba(240,112,32,.1)' : 'none'
  })

  return (
    <>
      <Helmet>
        <title>Contact SDC Earth Power | Lightning Arrester & Earthing Quote India – +91 9321447203</title>
        <meta name="description" content="Get a quote for ESE lightning arresters and earthing systems. Call +91 9321447203 or email sdcearthing@gmail.com. SDC Earth Power, Badhpura, Dadri, Gautam Buddha Nagar, UP – 203207. 24-hour response guaranteed." />
        <meta name="keywords" content="SDC Earth Power contact number, lightning arrester price quote India, earthing electrode price UP, ESE arrester supplier contact, lightning protection quote India, Sunsdust Commercial contact" />
        <link rel="canonical" href="https://sdcearthpower.com/contact" />
        <meta property="og:title" content="Contact SDC Earth Power – Lightning Arrester Quote | +91 9321447203" />
        <meta property="og:url" content="https://sdcearthpower.com/contact" />
        <script type="application/ld+json">{`
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": "https://sdcearthpower.com/contact",
    "name": "Contact SDC Earth Power – Lightning Arrester & Earthing Enquiry",
    "description": "Contact SDC Earth Power for ESE lightning arrester and earthing system quotations, technical consultation, and project support.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type":"ListItem","position":1,"name":"Home","item":"https://sdcearthpower.com/"},
        {"@type":"ListItem","position":2,"name":"Contact Us","item":"https://sdcearthpower.com/contact"}
      ]
    }
  }
  `}</script>
      </Helmet>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        .reveal { opacity:0; transform:translateY(28px); transition:opacity .6s ease, transform .6s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .reveal-left { opacity:0; transform:translateX(-28px); transition:opacity .6s ease, transform .6s ease; }
        .reveal-left.visible { opacity:1; transform:translateX(0); }
        .reveal-right { opacity:0; transform:translateX(28px); transition:opacity .6s ease, transform .6s ease; }
        .reveal-right.visible { opacity:1; transform:translateX(0); }

        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes checkmark { 0%{transform:scale(0) rotate(-45deg)} 60%{transform:scale(1.2) rotate(5deg)} 100%{transform:scale(1) rotate(0)} }
        @keyframes slideIn { from{transform:translateX(-12px);opacity:0} to{transform:translateX(0);opacity:1} }

        .btn-primary { display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--orange);color:#fff;padding:14px 28px;font-family:var(--ffh);font-size:0.86rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s;width:100%; }
        .btn-primary:hover:not(:disabled) { transform:translateY(-2px);box-shadow:0 8px 28px rgba(240,112,32,.4); }
        .btn-primary:disabled { opacity:.7;cursor:not-allowed; }
        .btn-secondary { display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--blue);padding:13px 26px;font-family:var(--ffh);font-size:0.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:2px solid var(--blue);cursor:pointer;transition:all .3s; }
        .btn-secondary:hover { background:var(--blue);color:#fff;transform:translateY(-2px); }

        .contact-card { background:var(--off);border:1px solid var(--bdr);transition:all .3s; }
        .contact-card:hover { border-color:var(--blue-mid);box-shadow:0 6px 20px rgba(26,79,204,.08); }

        .contact-info-row { display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid var(--bdr);transition:background .2s;border-radius:4px;margin:0 -8px;padding-left:8px;padding-right:8px; }
        .contact-info-row:last-child { border-bottom:none; }
        .contact-info-row:hover { background:var(--blue-pal); }
        .ci-icon { width:44px;height:44px;background:var(--blue-pal);border:1px solid var(--blue-mid);border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.1rem;transition:all .3s; }
        .contact-info-row:hover .ci-icon { background:var(--orange);border-color:var(--orange); }

        .form-label { display:block;font-family:var(--ffh);font-size:0.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px; }
        .field-error { color:#e53935;font-size:0.7rem;margin-top:5px;animation:slideIn .25s ease; }

        select option { background:var(--white);color:var(--dark); }
        input::placeholder, textarea::placeholder { color:var(--dim); }

        .success-banner { background:linear-gradient(135deg,#2e7d32,#43a047);color:#fff;padding:18px 22px;border-radius:4px;display:flex;align-items:center;gap:14px;animation:fadeIn .5s ease;margin-bottom:20px; }
        .checkmark-icon { width:36px;height:36px;background:rgba(255,255,255,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;animation:checkmark .5s cubic-bezier(.34,1.56,.64,1); }
        .error-banner { background:linear-gradient(135deg,#c62828,#e53935);color:#fff;padding:18px 22px;border-radius:4px;display:flex;align-items:center;gap:14px;animation:fadeIn .5s ease;margin-bottom:20px; }

        .whatsapp-btn { display:flex;align-items:center;gap:10px;background:#25d366;color:#fff;padding:13px 20px;font-family:var(--ffh);font-size:0.82rem;font-weight:700;text-decoration:none;border-radius:3px;transition:all .3s;justify-content:center; }
        .whatsapp-btn:hover { background:#22c55e;transform:translateY(-2px);box-shadow:0 6px 20px rgba(37,211,102,.35); }

        /* Layout */
        .contact-layout { display:grid;grid-template-columns:1fr 1.65fr;gap:48px;align-items:start; }
        .form-row-2 { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
        .form-row-product { display:grid;grid-template-columns:2fr 1fr;gap:14px; }
        @media(max-width:960px) { .contact-layout { grid-template-columns:1fr !important;gap:36px !important; } }
        @media(max-width:768px) { .hero-poly { display:none !important; } }
        @media(max-width:600px) {
          h1 { font-size:1.8rem !important; }
          .form-row-2 { grid-template-columns:1fr !important; }
          .form-row-product { grid-template-columns:1fr !important; }
          .form-panel { padding:24px 18px !important; }
          .quick-actions { flex-direction:column !important; }
        }
        @media(max-width:480px) { .contact-layout { gap:28px !important; } }
      `}</style>

      {/*
        ── NETLIFY FORM DETECTION ──────────────────────────────────────────────
        This hidden form is required so Netlify's build bot can discover and
        register the form at deploy time. It mirrors every field in the live
        form above and must stay in the HTML output (do NOT remove it).
        The actual submission is handled via fetch() in handleSend().
        ───────────────────────────────────────────────────────────────────────
      */}
      <form
        name="sdc-contact"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        hidden
      >
        <input type="hidden" name="form-name" value="sdc-contact" />
        <input type="text" name="name" />
        <input type="text" name="company" />
        <input type="tel" name="phone" />
        <input type="email" name="email" />
        <input type="text" name="product" />
        <input type="text" name="qty" />
        <textarea name="message" />
      </form>

      {/* PAGE HERO */}
      <div style={{ background: 'linear-gradient(125deg,#e8f0fe 0%,#eaf0fd 40%,#d0e4ff 100%)', padding: '52px 0 44px', borderBottom: '3px solid var(--blue)', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-poly" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '38%', background: 'linear-gradient(135deg,var(--blue),var(--blue-dk))', clipPath: 'polygon(80px 0,100% 0,100% 100%,0 100%)' }} />
        <div style={{ position: 'absolute', right: '14%', top: '20%', width: 80, height: 80, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.2)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, fontSize: '0.76rem', color: 'var(--muted)' }}>
            <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e => e.target.style.color = 'var(--orange)'} onMouseLeave={e => e.target.style.color = 'var(--muted)'}>Home</Link>
            <span style={{ color: 'var(--dim)' }}>›</span>
            <span style={{ color: 'var(--orange)' }}>Contact Us</span>
          </div>
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>24-Hour Response</div>
          <h1 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
            Get In <span style={{ color: 'var(--blue)' }}>Touch</span>
          </h1>
          <p style={{ color: 'var(--mid)', fontSize: '0.92rem', maxWidth: 530, lineHeight: 1.75 }}>
            Contact SDC Power for product enquiries, technical consultations, quotations, or project support. Our engineers respond within 24 hours with site-specific guidance.
          </p>
        </div>
      </div>

      <section style={{ padding: '72px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="contact-layout">

            {/* LEFT: Info */}
            <div className="reveal-left">
              <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>Contact Information</div>
              <div style={{ width: 36, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))', marginBottom: 28 }} />

              <div style={{ background: 'var(--off)', border: '1px solid var(--bdr)', padding: '6px 8px', borderRadius: 4, marginBottom: 24 }}>
                {[
  {
    icon: '📞',
    label: 'Phone / WhatsApp',
    val: '+91 7599700620',
    href: 'tel:+917599700620'
  },
  {
    icon: '📞',
    label: 'Alternate Number',
    val: '+91 9321447203',
    href: 'tel:+919321447203'
  },
  { icon: '✉️', label: 'Email', val: 'sdcearthing@gmail.com', href: 'mailto:sdcearthing@gmail.com' },
  { icon: '🌐', label: 'Website', val: 'sdcearthpower.com', href: 'https://sdcearthpower.com' },
  { icon: '📍', label: 'Address', val: 'Khasra No-267, Badhpura, Dadri\nGautam Buddha Nagar, UP – 203207' },
  { icon: '🕐', label: 'Business Hours', val: 'Mon – Sat: 9:00 AM – 7:00 PM' },
  { icon: '🏛️', label: 'GSTIN', val: '09ABBCS2487A1ZG' },
].map(({ icon, label, val, href }) => (
                  <div key={label} className="contact-info-row">
                    <div className="ci-icon">{icon}</div>
                    <div>
                      <div style={{ color: 'var(--muted)', fontSize: '0.62rem', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                      {href
                        ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.88rem', transition: 'color .2s', display: 'block', lineHeight: 1.55, textDecoration: 'none' }}
                          onMouseEnter={e => e.target.style.color = 'var(--orange)'}
                          onMouseLeave={e => e.target.style.color = 'var(--blue)'}>{val}</a>
                        : <div style={{ color: 'var(--dark)', fontWeight: 500, fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{val}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 24 }} className="quick-actions">
                <a href="https://wa.me/917599700620" target="_blank" rel="noopener noreferrer" className="whatsapp-btn" style={{ flex: 1, background: '#25d366' }}>
                  📱 WhatsApp Us
                </a>
                <a href="mailto:sdcearthing@gmail.com" className="whatsapp-btn" style={{ flex: 1, background: 'var(--blue)', boxShadow: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-dk)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,79,204,.35)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--blue)'; e.currentTarget.style.boxShadow = 'none' }}>
                  ✉️ Email Us
                </a>
              </div>

              {/* Map */}
              <div style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid var(--bdr)', boxShadow: '0 4px 16px rgba(0,0,0,.06)' }}>
                <div style={{ background: 'var(--blue-dk)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>📍</span>
                  <span style={{ color: '#fff', fontSize: '0.76rem', fontWeight: 600 }}>SDC Power — Badhpura, Dadri, UP</span>
                </div>
                <iframe
                  title="SDC Power Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.83!2d77.5565562!3d28.5711388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xad9de6c3beeee513%3A0x4ec9f5d4661b4eb9!2sSUNSDUST%20COMMERCIAL%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="220" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" />
              </div>

              {/* Trust badges */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
                {[
                  { i: '🏆', t: 'CPRI Certified', d: '45 kA tested' },
                  { i: '⚡', t: '24hr Response', d: 'Guaranteed' },
                  { i: '📋', t: 'Free Consultation', d: 'Technical support' },
                  { i: '🌍', t: 'Pan India', d: '28+ states' },
                ].map(b => (
                  <div key={b.t} style={{ background: 'var(--off)', border: '1px solid var(--bdr)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 3 }}>
                    <span style={{ fontSize: '1.3rem' }}>{b.i}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--dark)' }}>{b.t}</div>
                      <div style={{ fontSize: '0.66rem', color: 'var(--muted)' }}>{b.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Form */}
            <div className="reveal-right">
              <div className="form-panel" style={{ background: 'var(--white)', border: '1px solid var(--bdr)', borderTop: '4px solid var(--orange)', padding: '38px 36px', boxShadow: '0 8px 32px rgba(26,79,204,.08)' }}>
                <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>Send an Enquiry</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: 28 }}>Fill in your details and we'll respond within 24 hours with a competitive quote.</p>

                {sent && (
                  <div className="success-banner">
                    <div className="checkmark-icon">✓</div>
                    <div>
                      <div style={{ fontWeight: 700, marginBottom: 2 }}>Enquiry Sent Successfully!</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>We'll contact you within 24 hours.</div>
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="error-banner">
                    <div className="checkmark-icon">✕</div>
                    <div>
                      <div style={{ fontWeight: 700, marginBottom: 2 }}>Submission Failed</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>Please try again or contact us directly at +91 9321447203.</div>
                    </div>
                  </div>
                )}

                {/* Netlify honeypot — keeps bots out, must be hidden from real users */}
                <div style={{ display: 'none' }}>
                  <input name="bot-field" />
                </div>

                <div className="form-row-2" style={{ marginBottom: 16 }}>
                  {[['name', 'Your Name *', 'text'], ['company', 'Company Name', 'text']].map(([k, ph, t]) => (
                    <div key={k}>
                      <label className="form-label" htmlFor={k}>{ph}</label>
                      <input name={k} id={k} type={t} placeholder={ph} value={form[k]} onChange={e => F(k)(e.target.value)}
                        onFocus={() => setFocused(k)} onBlur={() => setFocused('')}
                        style={inp(k)} />
                      {errors[k] && <div className="field-error">⚠ {errors[k]}</div>}
                    </div>
                  ))}
                </div>

                <div className="form-row-2" style={{ marginBottom: 16 }}>
                  {[['phone', 'Phone / WhatsApp *', 'tel'], ['email', 'Email Address', 'email']].map(([k, ph, t]) => (
                    <div key={k}>
                      <label className="form-label" htmlFor={k}>{ph}</label>
                      <input id={k} type={t} placeholder={ph} value={form[k]} onChange={e => F(k)(e.target.value)}
                        onFocus={() => setFocused(k)} onBlur={() => setFocused('')}
                        style={inp(k)} />
                      {errors[k] && <div className="field-error">⚠ {errors[k]}</div>}
                    </div>
                  ))}
                </div>

                <div className="form-row-product" style={{ marginBottom: 16 }}>
                  <div>
                    <label className="form-label">Product of Interest</label>
                    <select value={form.product} onChange={e => F('product')(e.target.value)}
                      onFocus={() => setFocused('product')} onBlur={() => setFocused('')}
                      style={{ ...inp('product'), cursor: 'pointer', appearance: 'auto' }}>
                      <option value="">Select a product…</option>
                      {(PRODUCTS || []).map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                      <option value="Complete System">Complete System Enquiry</option>
                      <option value="Technical Consultation">Technical Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Quantity / Units</label>
                    <input type="text" placeholder="e.g. 10 nos." value={form.qty} onChange={e => F('qty')(e.target.value)}
                      onFocus={() => setFocused('qty')} onBlur={() => setFocused('')}
                      style={inp('qty')} />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label className="form-label">Message / Project Details</label>
                  <textarea
                    placeholder="Describe your project, installation site, soil conditions, building type, or any special requirements. The more detail you provide, the better we can assist."
                    value={form.message} onChange={e => F('message')(e.target.value)}
                    rows={5} onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                    style={{ ...inp('message'), resize: 'vertical' }} />
                </div>

                <button onClick={handleSend} className="btn-primary" disabled={sent}>
                  {sent ? '✓ Enquiry Sent!' : '📤 Send Enquiry'}
                </button>

                <p style={{ color: 'var(--dim)', fontSize: '0.7rem', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
                  Your information is kept strictly confidential and used only to respond to your enquiry. We do not share data with third parties.
                </p>

                {/* Alternative contact */}
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--bdr)', textAlign: 'center' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.76rem', marginBottom: 12 }}>Prefer to call directly?</div>
                  <a href="tel:+919321447203" style={{ fontFamily: 'var(--ffh)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--blue)', textDecoration: 'none', transition: 'color .2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--orange)'}
                    onMouseLeave={e => e.target.style.color = 'var(--blue)'}>
                    +91 9321447203
                  </a>
                </div>
              </div>

              {/* FAQ mini */}
              <div style={{ marginTop: 24 }}>
                <div style={{ fontFamily: 'var(--ffh)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>Frequently Asked</div>
                {[
                  { q: 'How quickly will I receive a quote?', a: 'We respond to all enquiries within 24 hours on business days, with detailed technical and commercial quotes.' },
                  { q: 'Do you supply across all of India?', a: 'Yes — we have a distributor network covering all 28+ states with fast dispatch and reliable delivery.' },
                  { q: 'Can you help with system design?', a: 'Our technical team provides free consultation for site-specific lightning protection and earthing system design.' },
                ].map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: '1px solid var(--bdr)', marginBottom: 8, borderRadius: 3, overflow: 'hidden', transition: 'box-shadow .2s', boxShadow: open ? '0 4px 14px rgba(26,79,204,.08)' : 'none' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', background: open ? 'var(--blue-pal)' : 'var(--off)', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background .25s' }}>
        <span style={{ fontFamily: 'var(--ffh)', fontSize: '0.86rem', fontWeight: 600, color: open ? 'var(--blue)' : 'var(--dark)', flex: 1 }}>{q}</span>
        <span style={{ color: open ? 'var(--orange)' : 'var(--muted)', fontSize: '0.9rem', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .3s' }}>▼</span>
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height .35s ease' }}>
        <div style={{ padding: '12px 16px 16px', fontSize: '0.84rem', color: 'var(--mid)', lineHeight: 1.75 }}>{a}</div>
      </div>
    </div>
  )
}
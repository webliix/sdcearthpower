import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'


const CERTS = [
  { code: 'IEC 62305', body: 'International Electrotechnical Commission', color: '#1a4fcc', icon: '🛡️', desc: 'The primary international standard for lightning protection systems, covering risk management, physical damage, and electrical/electronic systems. SDC Earth Power ESE arresters comply with all four parts of IEC 62305.', scope: ['Lightning risk assessment methodology', 'External lightning protection systems', 'Internal protection — bonding and surge protection', 'Design, installation, maintenance, and inspection'] },
  { code: 'IS 2309-1989', body: 'Bureau of Indian Standards', color: '#cc1a1a', icon: '📋', desc: 'The Indian Standard for protection of buildings and allied structures against lightning. Mandatory reference for all lightning protection work across India. SDC Earth Power ESE Lightning Arresters are fully compliant with IS 2309-1989.', scope: ['Requirements for conventional lightning protection in India', 'Protection of buildings, structures, and open spaces', 'Earthing and bonding requirements', 'Mandatory for public buildings, hospitals, and industrial structures'] },
  { code: 'IS 3043', body: 'Bureau of Indian Standards', color: '#2e7d32', icon: '🔩', desc: 'Indian Code of Practice for Earthing. Governs the design, installation, inspection, and testing of earthing systems. All SDC Earth Power GI and copper bonded earth electrodes, rods, strips, and plates comply with IS 3043.', scope: ['General principles of earthing system design', 'Requirements for GI and copper electrodes', 'Earthing of electrical installations and equipment', 'Testing and maintenance of earthing systems'] },
  { code: 'CPRI Tested', body: 'Central Power Research Institute, Bangalore', color: '#f07020', icon: '🏆', desc: 'The SDC Earth Power ESE Lightning Arrester SDC-60 has been independently tested and certified by CPRI at 45 kA impulse current, verifying a 107-metre protection radius at Level 4 — the highest classification. Traceable test reports provided.', scope: ['45 kA impulse current testing (10/350µs)', '107-metre protection radius verified', 'Level 4 — highest protection classification', 'Traceable test reports with every order'] },
  { code: 'IEC 61643-11', body: 'International Electrotechnical Commission', color: '#1565c0', icon: '⚡', desc: 'Standard for Surge Protection Devices connected to low-voltage power distribution systems. SDC Earth Power SPDs are compliant with IEC 61643-11 for Type 1, Type 2, and Type 3 surge protection applications.', scope: ['Type 1 SPD — service entrance protection', 'Type 2 SPD — distribution board protection', 'Type 3 SPD — equipment-level protection', 'DIN rail mounting compliance'] },
  { code: 'IP65 Rating', body: 'Ingress Protection Standard (IEC 60529)', color: '#6a1b9a', icon: '💧', desc: 'SDC Earth Power Lightning Strike Counters carry IP65 certification — fully dust-tight and protected against water jets from any direction. Safe for all outdoor environments including coastal and industrial sites.', scope: ['Complete dust-tight protection (IP6x)', 'Protected against water jets from any direction (IPx5)', 'Suitable for all outdoor environments', 'Coastal and industrial installation approved'] },
  { code: 'IEC 61439', body: 'International Electrotechnical Commission', color: '#00695c', icon: '☀️', desc: 'Standard for low-voltage switchgear assemblies. SDC Earth Power ACDB and DCDB for solar power systems comply with IEC 61439 — ensuring enclosures and internal components meet international safety standards.', scope: ['AC and DC distribution box design and testing', 'IP65 polycarbonate enclosure requirements', 'MCB and SPD component compliance', 'Solar photovoltaic system applications'] },
  { code: 'GST Registered', body: 'Government of India', color: '#546e7a', icon: '🏛️', desc: 'SDC Earth Power (Sunsdust Commercial Private Limited) is GST registered. All invoices are GST-compliant. Tax-compliant procurement for government, PSU, private, and institutional projects.', scope: ['GSTIN: 09ABBCS2487A1ZG', 'Uttar Pradesh State Registration', 'Tax-compliant B2B invoicing', 'Eligible for input tax credit (ITC)'] },
]

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

export default function CertificationsPage() {
  const [active, setActive] = useState(null)
  useScrollReveal()

  return (
    <>
    <Helmet>
  <title>Certifications – IEC 62305, CPRI, IS 3043, IS 2309, IP65 | SDC Earth Power India</title>
  <meta name="description" content="SDC Earth Power products certified to IEC 62305, IS 2309-1989, IS 3043, IEC 61643-11, IEC 61439, IP65 (IEC 60529). CPRI tested at 45 kA impulse, Level 4. GST registered: 09ABBCS2487A1ZG. Full compliance documentation supplied." />
  <meta name="keywords" content="CPRI certified lightning arrester India, IEC 62305 compliant manufacturer, IS 3043 earthing standard India, IS 2309-1989 lightning standard, lightning arrester test certificate India, GST compliant electrical manufacturer" />
  <link rel="canonical" href="https://sdcearthpower.com/certifications" />
  <meta property="og:title" content="SDC Earth Power Certifications – IEC 62305, CPRI, IS 3043, IS 2309 Compliant" />
  <meta property="og:url" content="https://sdcearthpower.com/certifications" />
  <script type="application/ld+json">{`
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://sdcearthpower.com/certifications",
    "name": "SDC Power Certifications & Standards",
    "description": "SDC Power product certifications: IEC 62305, IS 2309-1989, IS 3043, CPRI Tested 45 kA, IEC 61643-11, IP65, IEC 61439, GST Registered",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type":"ListItem","position":1,"name":"Home","item":"https://sdcearthpower.com/"},
        {"@type":"ListItem","position":2,"name":"Certifications","item":"https://sdcearthpower.com/certifications"}
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Certifications Held by SDC Power",
      "itemListElement": [
        {"@type":"ListItem","position":1,"name":"IEC 62305 – International Electrotechnical Commission"},
        {"@type":"ListItem","position":2,"name":"IS 2309-1989 – Bureau of Indian Standards"},
        {"@type":"ListItem","position":3,"name":"IS 3043 – Bureau of Indian Standards"},
        {"@type":"ListItem","position":4,"name":"CPRI Tested – Central Power Research Institute Bangalore"},
        {"@type":"ListItem","position":5,"name":"IEC 61643-11 – Surge Protection Devices"},
        {"@type":"ListItem","position":6,"name":"IP65 – Ingress Protection IEC 60529"},
        {"@type":"ListItem","position":7,"name":"IEC 61439 – Solar Distribution Boxes"},
        {"@type":"ListItem","position":8,"name":"GST Registered – GSTIN 09ABBCS2487A1ZG"}
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
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }

        .btn-primary { display:inline-flex;align-items:center;gap:8px;background:var(--orange);color:#fff;padding:13px 26px;font-family:var(--ffh);font-size:0.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s; }
        .btn-primary:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(240,112,32,.4); }
        .btn-secondary { display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--blue);padding:13px 26px;font-family:var(--ffh);font-size:0.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:2px solid var(--blue);cursor:pointer;transition:all .3s; }
        .btn-secondary:hover { background:var(--blue);color:#fff;transform:translateY(-2px); }

        .cert-card {
          background: var(--off); border: 1px solid var(--bdr);
          padding: 28px 24px; transition: all .35s cubic-bezier(.34,1.56,.64,1);
          cursor: pointer; position: relative; overflow: hidden;
        }
        .cert-card::before {
          content:''; position:absolute; inset:0; opacity:0; transition:opacity .3s;
          background: linear-gradient(135deg, rgba(255,255,255,.05), transparent);
        }
        .cert-card:hover { transform: translateY(-8px); }
        .cert-card:hover::before { opacity:1; }
        .cert-card.active-cert { transform: translateY(-8px) scale(1.01); }

        .cert-badge { display:inline-flex;align-items:center;gap:7px;padding:7px 14px;border-radius:3px;cursor:pointer;transition:all .3s; }
        .cert-badge:hover { transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.15); }

        .scope-item { display:flex;gap:9px;align-items:flex-start;margin-bottom:8px;animation:fadeIn .3s ease both; }
        .scope-item:nth-child(1){animation-delay:.05s}
        .scope-item:nth-child(2){animation-delay:.1s}
        .scope-item:nth-child(3){animation-delay:.15s}
        .scope-item:nth-child(4){animation-delay:.2s}

        .cert-icon-wrap { border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:1.5rem; flex-shrink:0; transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
        .cert-card:hover .cert-icon-wrap { transform: rotate(8deg) scale(1.15); }

        .cert-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:22px; }
        @media(max-width:960px) { .cert-grid { grid-template-columns:1fr !important; } }
        @media(max-width:600px) {
          h1 { font-size:2rem !important; }
          .cta-band { flex-direction:column !important; gap:24px !important; }
          .cta-band a { width:100%; justify-content:center; }
        }

        @media(max-width:768px) { .hero-poly { display:none !important; } }
        .breadcrumb-link { color:var(--muted); text-decoration:none; transition:color .2s; }
        .breadcrumb-link:hover { color:var(--orange); }
      `}</style>

      {/* PAGE HERO */}
      <div style={{ background: 'linear-gradient(125deg,#e8f0fe 0%,#eaf0fd 40%,#d0e4ff 100%)', padding: '52px 0 44px', borderBottom: '3px solid var(--blue)', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-poly" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '38%', background: 'linear-gradient(135deg,var(--blue),var(--blue-dk))', clipPath: 'polygon(80px 0,100% 0,100% 100%,0 100%)' }} />
        {/* Decorative circles */}
        <div style={{ position: 'absolute', right: '12%', top: '15%', width: 100, height: 100, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.18)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '22%', bottom: '8%', width: 56, height: 56, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.12)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, fontSize: '0.76rem', color: 'var(--muted)' }}>
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span style={{ color: 'var(--dim)' }}>›</span>
            <span style={{ color: 'var(--orange)' }}>Certifications</span>
          </div>
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>Quality Assured</div>
          <h1 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
            Certifications <span style={{ color: 'var(--blue)' }}>&amp; Standards</span>
          </h1>
          <p style={{ color: 'var(--mid)', fontSize: '0.92rem', maxWidth: 540, lineHeight: 1.75 }}>
            SDC Power products meet the highest national and international quality standards — independently tested and certified by leading bodies including CPRI, BIS, and IEC.
          </p>
        </div>
      </div>

      {/* QUICK BADGES */}
      <section style={{ padding: '40px 0', background: 'var(--blue-dk)', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {CERTS.map(c => (
              <div key={c.code} className="cert-badge"
                style={{ background: `${c.color}22`, border: `1.5px solid ${c.color}55` }}
                onClick={() => setActive(active === c.code ? null : c.code)}>
                <span style={{ fontSize: '1rem' }}>{c.icon}</span>
                <span style={{ fontFamily: 'var(--ffh)', fontSize: '0.82rem', fontWeight: 700, color: '#fff', letterSpacing: '.06em' }}>{c.code}</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,.4)', fontSize: '0.68rem', marginTop: 16, letterSpacing: '.08em' }}>CLICK ANY BADGE TO HIGHLIGHT</p>
        </div>
      </section>

      {/* CERT CARDS */}
      <section style={{ padding: '72px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink)', position: 'relative', paddingBottom: 12, display: 'inline-block' }} className="reveal">
              Our Certifications &amp; Standards
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 48, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))' }} />
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: 16, maxWidth: 560 }} className="reveal">
              Every SDC Power product carries independent certification. We provide complete documentation packages for compliance and project approvals.
            </p>
          </div>

          <div className="cert-grid">
            {CERTS.map((c, i) => (
              <div key={c.code} className={`cert-card reveal ${active === c.code ? 'active-cert' : ''}`}
                style={{
                  borderTop: `4px solid ${c.color}`,
                  boxShadow: active === c.code ? `0 16px 48px ${c.color}28` : 'none',
                  transitionDelay: `${(i % 3) * 0.08}s`
                }}
                onClick={() => setActive(active === c.code ? null : c.code)}>

                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
                  <div className="cert-icon-wrap" style={{ width: 54, height: 54, background: `${c.color}18`, border: `1.5px solid ${c.color}40` }}>
                    {c.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontFamily: 'var(--ffh)', fontSize: '1.18rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>{c.code}</h3>
                    <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.64rem', fontWeight: 700, color: c.color, letterSpacing: '.08em', textTransform: 'uppercase', lineHeight: 1.4 }}>{c.body}</div>
                  </div>
                  <div style={{ color: c.color, fontSize: '0.7rem', fontWeight: 700, flexShrink: 0, opacity: 0.7 }}>
                    {active === c.code ? '▲' : '▼'}
                  </div>
                </div>

                <p style={{ color: 'var(--mid)', fontSize: '0.86rem', lineHeight: 1.85, marginBottom: 16 }}>{c.desc}</p>

                <div style={{
                  borderTop: '1px solid var(--bdr)', paddingTop: 16,
                  maxHeight: active === c.code ? 300 : 0,
                  overflow: 'hidden', transition: 'max-height .4s ease, padding .4s'
                }}>
                  {active === c.code && (
                    <>
                      <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.68rem', fontWeight: 700, color: c.color, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Scope Includes:</div>
                      {c.scope.map((s, si) => (
                        <div key={s} className="scope-item" style={{ animationDelay: `${si * 0.06}s` }}>
                          <span style={{ color: c.color, flexShrink: 0, fontSize: '0.85rem', marginTop: 1 }}>✓</span>
                          <span style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>{s}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {active !== c.code && (
                  <div style={{ borderTop: '1px solid var(--bdr)', paddingTop: 14, marginTop: 0 }}>
                    <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.68rem', fontWeight: 700, color: c.color, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Scope Includes:</div>
                    {c.scope.map(s => (
                      <div key={s} className="scope-item">
                        <span style={{ color: c.color, flexShrink: 0, fontSize: '0.85rem', marginTop: 1 }}>✓</span>
                        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA BAND */}
          <div style={{ marginTop: 56, background: 'var(--blue-dk)', padding: '32px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }} className="cta-band">
            <div>
              <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.6rem', color: 'var(--orange)', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 8 }}>Full Compliance Assurance</div>
              <div style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 700, color: '#fff' }}>Every Product. Every Standard. Every Time.</div>
              <div style={{ color: 'rgba(255,255,255,.5)', fontSize: '0.82rem', marginTop: 6 }}>Complete documentation packages available for all project types — government, PSU, and private.</div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Request Compliance Docs →</Link>
              <Link to="/products" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}>View Products</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why certs matter */}
      <section style={{ padding: '64px 0', background: 'var(--off)', borderTop: '1px solid var(--bdr)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink)', position: 'relative', paddingBottom: 12, marginBottom: 40, display: 'inline-block' }} className="reveal">
            Why Certification Matters
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 48, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {[
              { i: '🏛️', t: 'Government Approvals', d: 'Certified products are required for all government, municipal, and PSU projects. Our CPRI and BIS certifications ensure your tender submissions are accepted without delay.' },
              { i: '⚖️', t: 'Legal Compliance', d: 'IS 2309 and IS 3043 compliance is mandatory for insurance, occupancy certificates, and regulatory approvals across all states in India.' },
              { i: '🛡️', t: 'Performance Guarantee', d: 'Independent third-party testing at CPRI confirms actual performance under real-world lightning conditions — not just design calculations.' },
              { i: '📁', t: 'Complete Documentation', d: 'We supply full test reports, compliance certificates, and installation guides with every order — simplifying your project\'s documentation trail.' },
            ].map((item, i) => (
              <div key={item.t} style={{ background: 'var(--white)', border: '1px solid var(--bdr)', borderLeft: '3px solid var(--orange)', padding: '20px 18px', transition: 'all .3s' }} className="reveal"
                stylle={{ background: 'var(--white)', border: '1px solid var(--bdr)', borderLeft: '3px solid var(--orange)', padding: '20px 18px', transition: 'all .3s', transitionDelay: `${i * 0.08}s`, opacity: 0, transform: 'translateY(24px)' }}
                onMouseEnter={e => { e.currentTarget.style.borderLeftColor = 'var(--blue)'; e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,79,204,.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderLeftColor = 'var(--orange)'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>{item.i}</div>
                <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 8 }}>{item.t}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7 }}>{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
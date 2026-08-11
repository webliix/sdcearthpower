import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const REASONS = [
  { icon: '🏆', color: '#f07020', title: 'CPRI Tested & Certified', sub: 'Central Power Research Institute', desc: 'All SDC Power ESE lightning arresters are independently tested at CPRI (Central Power Research Institute, Bangalore) at 45 kA impulse current, verifying a 107-metre protection radius at Level 4 — the highest classification. Every product comes with a traceable test report.' },
  { icon: '📋', color: '#cc1a1a', title: 'IEC 62305 & IS 2309-1989', sub: 'International & Indian Standards', desc: 'Full compliance with both the international IEC 62305 standard and Bureau of Indian Standards IS 2309-1989. Our range also complies with IS 3043 (earthing), IEC 61439 (distribution boxes), and IEC 61643-11 (surge protection). Every global quality benchmark is met.' },
  { icon: '⚡', color: '#1a4fcc', title: '250 kA Maximum Capacity', sub: 'Industry-Leading Performance', desc: 'Our flagship SDC-60 handles up to 250 kA lightning current with 60µs Early Streamer Emission triggering — among the highest rated products in its class. SS304 stainless steel construction performs in coastal, industrial, and extreme environments for 10+ years without maintenance.' },
  { icon: '🌍', color: '#2e7d32', title: '28+ States Across India', sub: 'Pan India Distribution Network', desc: 'With active installations across residential, commercial, industrial and government sectors in 28+ states, SDC Power is trusted nationwide. Our distributor network ensures products reach your site fast — whether it is a power plant in Rajasthan or a hospital in Kerala.' },
  { icon: '✅', color: '#1565c0', title: 'Complete System Solutions', sub: 'One Supplier for Everything', desc: 'From ESE lightning arresters, conventional rods, earth electrodes, to lightning strike counters, surge protection devices, earthing strips, busbars, and solar distribution boxes — we supply every component of a complete protection system from one trusted supplier.' },
  { icon: '🕐', color: '#6a1b9a', title: '15+ Years of Expertise', sub: 'Deep Technical Knowledge', desc: 'Over 15 years of manufacturing excellence and 500+ projects completed. Our technical team brings deep expertise in lightning protection system design, installation standards, soil resistivity analysis, and compliance documentation — available to support every project.' },
]

const COMPARE_ROWS = [
  ['CPRI Testing', '✅ Yes — 45 kA impulse', '❌ Often not certified'],
  ['IEC 62305 Compliance', '✅ Full compliance', '⚠️ Sometimes partial'],
  ['Protection Radius', '✅ 107m at Level 4', '⚠️ Varies (often less)'],
  ['SS304 Body Material', '✅ Standard on SDC-60', '❌ Usually mild steel'],
  ['Copper Thickness (rods)', '✅ 250µm minimum', '⚠️ Often 80–150µm'],
  ['Technical Support', '✅ Expert consultation', '❌ Limited'],
  ['CPRI Test Reports', '✅ Traceable reports provided', '❌ Rarely provided'],
  ['Pan India Supply', '✅ 28+ states', '⚠️ Limited regions'],
]

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef()
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const num = parseInt(target)
        if (isNaN(num)) { setCount(target); return }
        const step = Math.ceil(num / (1600 / 16))
        let cur = 0
        const t = setInterval(() => { cur = Math.min(cur + step, num); setCount(cur); if (cur >= num) clearInterval(t) }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{count}{suffix}</span>
}

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

export default function WhyUsPage() {
  const [hoveredRow, setHoveredRow] = useState(null)
  useScrollReveal()

  return (
    <>
      <Helmet>
        <title>Why Choose SDC Power | CPRI Tested 45 kA, IEC 62305, 250 kA Lightning Arrester India</title>
        <meta name="description" content="6 reasons engineers across India choose SDC Power: CPRI tested at 45 kA impulse, 107m Level 4 radius, 250 kA rated, IEC 62305 & IS 2309 compliant, complete system supply, pan India network, 15+ years expertise." />
        <meta name="keywords" content="best lightning arrester manufacturer India, CPRI tested 45kA arrester, IEC 62305 certified India, 107m protection radius ESE, 250 kA lightning arrester, lightning protection system comparison India" />
        <link rel="canonical" href="https://sdcearthpower.com/why-us" />
        <meta property="og:title" content="Why Choose SDC Power | CPRI Tested Lightning Arrester Manufacturer India" />
        <meta property="og:url" content="https://sdcearthpower.com/why-us" />
        <script type="application/ld+json">{`
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is SDC Power ESE lightning arrester CPRI tested?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SDC Power ESE Lightning Arrester SDC-60 is independently tested at CPRI (Central Power Research Institute), Bangalore at 45 kA impulse current, verifying a 107-metre protection radius at Level 4 – the highest classification. Traceable test reports are provided with every order."
        }
      },
      {
        "@type": "Question",
        "name": "What is the protection radius of the SDC Power ESE arrester?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The SDC Power SDC-60 ESE Lightning Arrester provides a protection radius of 107 metres at Level 4 (the highest protection classification per IEC 62305), as independently verified by CPRI Bangalore."
        }
      },
      {
        "@type": "Question",
        "name": "Which standards do SDC Power products comply with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SDC Power products comply with IEC 62305 (lightning protection), IS 2309-1989 (Indian standard for lightning protection), IS 3043 (earthing code of practice), IEC 61643-11 (surge protection devices), IEC 61439 (distribution boxes), and carry IP65 rating for outdoor use."
        }
      },
      {
        "@type": "Question",
        "name": "Does SDC Power supply across all states in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SDC Power has an active distribution network covering 28+ states across India, with fast dispatch from Dadri, Gautam Buddha Nagar, Uttar Pradesh."
        }
      }
    ]
  }
  `}</script>
      </Helmet>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        .reveal { opacity:0; transform:translateY(28px); transition:opacity .65s ease, transform .65s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .reveal-left { opacity:0; transform:translateX(-28px); transition:opacity .65s ease, transform .65s ease; }
        .reveal-left.visible { opacity:1; transform:translateX(0); }
        .reveal-right { opacity:0; transform:translateX(28px); transition:opacity .65s ease, transform .65s ease; }
        .reveal-right.visible { opacity:1; transform:translateX(0); }
        @keyframes fadeIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

        .btn-primary { display:inline-flex;align-items:center;gap:8px;background:var(--orange);color:#fff;padding:13px 26px;font-family:var(--ffh);font-size:0.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s;position:relative;overflow:hidden; }
        .btn-primary:hover { transform:translateY(-2px);box-shadow:0 8px 28px rgba(240,112,32,.4); }
        .btn-secondary { display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--blue);padding:13px 26px;font-family:var(--ffh);font-size:0.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:2px solid var(--blue);cursor:pointer;transition:all .3s; }
        .btn-secondary:hover { background:var(--blue);color:#fff;transform:translateY(-2px); }

        .reason-card { background:var(--off);border:1px solid var(--bdr);padding:28px 24px;transition:all .35s cubic-bezier(.34,1.56,.64,1); }
        .reason-card:hover { box-shadow:0 16px 48px rgba(26,79,204,.12);transform:translateY(-6px); }

        .icon-wrap { width:54px;height:54px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0;transition:transform .35s cubic-bezier(.34,1.56,.64,1); }
        .reason-card:hover .icon-wrap { transform:rotate(8deg) scale(1.15); }

        .compare-row { background:var(--white);border-bottom:1px solid var(--bdr);transition:background .2s; }
        .compare-row:nth-child(odd) { background:var(--off); }
        .compare-row:hover { background:var(--blue-pal) !important; }
        .compare-row td { padding:13px 20px;font-size:0.84rem; }

        .breadcrumb-link { color:var(--muted);text-decoration:none;transition:color .2s; }
        .breadcrumb-link:hover { color:var(--orange); }

        .reasons-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:22px;margin-bottom:56px; }
        .stats-band { display:grid;grid-template-columns:repeat(4,1fr); }
        @media(max-width:900px) { .stats-band { grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:600px) {
        @media(max-width:768px) { .hero-poly { display:none !important; } }
        @media(max-width:480px) {
          h1 { font-size:1.8rem !important; }
          .reasons-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* PAGE HERO */}
      <div style={{ background: 'linear-gradient(125deg,#e8f0fe 0%,#eaf0fd 40%,#d0e4ff 100%)', padding: '52px 0 44px', borderBottom: '3px solid var(--blue)', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-poly" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '38%', background: 'linear-gradient(135deg,var(--blue),var(--blue-dk))', clipPath: 'polygon(80px 0,100% 0,100% 100%,0 100%)' }} />
        <div style={{ position: 'absolute', right: '12%', top: '20%', width: 90, height: 90, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.2)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '22%', bottom: '10%', width: 50, height: 50, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.12)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, fontSize: '0.76rem', color: 'var(--muted)' }}>
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span style={{ color: 'var(--dim)' }}>›</span>
            <span style={{ color: 'var(--orange)' }}>Why Choose Us</span>
          </div>
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>6 Compelling Reasons</div>
          <h1 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
            Why Choose <span style={{ color: 'var(--blue)' }}>SDC Power</span>
          </h1>
          <p style={{ color: 'var(--mid)', fontSize: '0.92rem', maxWidth: 520, lineHeight: 1.75 }}>
            Six compelling reasons why engineers, consultants, and contractors across India specify SDC Power products for critical infrastructure protection.
          </p>
        </div>
      </div>

      {/* ANIMATED STATS BAND */}
      <section style={{ background: 'linear-gradient(135deg,var(--blue-dk),var(--blue))', padding: '44px 0' }}>
        <div className="container">
          <div className="stats-band">
            {[['500', '+', 'Projects Delivered'], ['15', '+', 'Years Experience'], ['107', 'm', 'Protection Radius'], ['45', 'kA', 'Impulse Rating']].map(([n, suf, l]) => (
              <div key={l} style={{ textAlign: 'center', padding: '24px 16px', borderRight: '1px solid rgba(255,255,255,.1)', transition: 'background .3s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(2rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--yellow)', lineHeight: 1 }}>
                  <Counter target={n} suffix={suf} />
                </div>
                <div style={{ color: 'rgba(255,255,255,.55)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '.1em', marginTop: 8, textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REASONS SECTION */}
      <section style={{ padding: '72px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink)', position: 'relative', paddingBottom: 12, display: 'inline-block' }} className="reveal">
              6 Reasons to Choose SDC Power
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 48, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))' }} />
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: 16, maxWidth: 560 }} className="reveal">
              Every project decision matters. Here's why leading engineers, consultants, and EPC contractors across India trust SDC Power.
            </p>
          </div>

          <div className="reasons-grid">
            {REASONS.map((r, i) => (
              <div key={r.title} className="reason-card reveal" style={{ borderTop: `3px solid ${r.color}`, transitionDelay: `${(i % 3) * 0.08}s` }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 18 }}>
                  <div className="icon-wrap" style={{ background: `${r.color}18`, border: `1.5px solid ${r.color}40` }}>
                    {r.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.6rem', fontWeight: 700, color: r.color, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 5 }}>
                      {String(i + 1).padStart(2, '0')} — {r.sub}
                    </div>
                    <h3 style={{ fontFamily: 'var(--ffh)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.25 }}>{r.title}</h3>
                  </div>
                </div>
                <p style={{ color: 'var(--mid)', fontSize: '0.87rem', lineHeight: 1.85 }}>{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink)', position: 'relative', paddingBottom: 12, marginBottom: 32, display: 'inline-block' }} className="reveal">
              SDC Earth Power vs Conventional Products
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 48, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))' }} />
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 28 }} className="reveal">
              An objective comparison of what sets SDC Earth Power apart from standard market alternatives.
            </p>
            <div style={{ overflowX: 'auto', border: '1px solid var(--bdr)', borderRadius: 4, boxShadow: '0 4px 20px rgba(26,79,204,.07)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
                <thead>
                  <tr style={{ background: 'var(--blue-dk)' }}>
                    {['Feature', 'SDC Earth Power Products', 'Standard Market'].map((h, i) => (
                      <th key={h} style={{ fontFamily: 'var(--ffh)', fontSize: '0.78rem', fontWeight: 700, color: i === 1 ? 'var(--yellow)' : 'rgba(255,255,255,.8)', letterSpacing: '.1em', textTransform: 'uppercase', padding: '14px 20px', textAlign: i === 0 ? 'left' : 'center', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map(([f, s, c], i) => (
                    <tr key={f} className="compare-row"
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{ background: hoveredRow === i ? 'var(--blue-pal)' : i % 2 === 0 ? 'var(--white)' : 'var(--off)', transition: 'background .2s' }}>
                      <td style={{ padding: '13px 20px', fontSize: '0.84rem', color: 'var(--dark)', fontWeight: 600 }}>{f}</td>
                      <td style={{ padding: '13px 20px', fontSize: '0.84rem', color: '#2e7d32', textAlign: 'center', fontWeight: 600, background: 'rgba(46,125,50,.04)' }}>{s}</td>
                      <td style={{ padding: '13px 20px', fontSize: '0.84rem', color: 'var(--muted)', textAlign: 'center' }}>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Testimonial / trust strip */}
          <div style={{ background: 'var(--off)', border: '1px solid var(--bdr)', borderLeft: '4px solid var(--orange)', padding: '28px 32px', marginBottom: 48 }} className="reveal">
            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '3rem', color: 'var(--orange)', opacity: 0.25, lineHeight: 1, fontFamily: 'Georgia, serif', flexShrink: 0 }}>"</div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <p style={{ color: 'var(--mid)', fontSize: '1rem', lineHeight: 1.9, fontStyle: 'italic', marginBottom: 14 }}>
                  SDC Power ESE arresters have been specified and installed across multiple NTPC project sites. The CPRI certification and traceable test reports simplify our compliance submissions significantly.
                </p>
                <div style={{ fontFamily: 'var(--ffh)', fontWeight: 700, color: 'var(--dark)', fontSize: '0.88rem' }}>Senior Electrical Engineer</div>
                <div style={{ color: 'var(--orange)', fontSize: '0.74rem', fontWeight: 600, marginTop: 3 }}>NTPC Limited — Power Division</div>
              </div>
            </div>
          </div>

          {/* CTA Bottom */}
          <div style={{ background: 'linear-gradient(135deg,var(--blue-dk),var(--blue))', padding: '44px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }} className="reveal">
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,.04) 0%, transparent 50%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 12 }}>Ready to Get Started?</div>
              <h2 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
                Convinced? Let's <span style={{ color: 'var(--yellow)' }}>Get Started</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,.6)', marginBottom: 28, fontSize: '0.92rem', maxWidth: 420, margin: '0 auto 28px' }}>
                Contact our team for a free consultation and competitive quote within 24 hours.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }} className="cta-bottom">
                <Link to="/contact" className="btn-primary">Request a Quote →</Link>
                <Link to="/certifications" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,.4)', color: '#fff' }}>View Certifications</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const MILESTONES = [
  { year: '2010', title: 'Company Founded', desc: 'Sunsdust Commercial Private Limited established in Dadri, Uttar Pradesh with a vision to provide world-class lightning protection solutions for India\'s critical infrastructure.' },
  { year: '2012', title: 'First CPRI Certification', desc: 'ESE Lightning Arrester SDC-60 independently tested and certified by CPRI (Central Power Research Institute), Bangalore — verifying 45 kA impulse at Level 4, 107m radius.' },
  { year: '2015', title: 'Pan India Distribution', desc: 'Expanded supply network to cover 20+ states across India, establishing partnerships with major electrical distributors and MEP contractors.' },
  { year: '2018', title: 'ISO & IEC Compliance', desc: 'Full IEC 62305 compliance achieved across entire product range. IS 3043 and IS 2309-1989 certification for all earthing products — enabling approvals on government and PSU projects.' },
  { year: '2020', title: '500+ Projects Milestone', desc: 'Completed over 500 successful installations across power plants, telecom towers, data centres and hospitals. Zero product failures recorded in the field.' },
  { year: '2023', title: 'Expanded Product Range', desc: 'Launched complete solar protection range (ACDB/DCDB), pure copper earthing plates, earth enhancing compound, and enhanced ESE arrester lineup with improved aesthetics.' },
  { year: '2025', title: '28+ States Coverage', desc: 'Pan India supply network fully operational across all 28 states with fast dispatch, dedicated technical support team, and complete compliance documentation packages.' },
]

const TEAM = [
  { name: 'Founder & CEO', title: 'SDC Earth Power — Sunsdust', desc: 'With 15+ years in lightning protection and earthing, our leadership brings deep technical expertise and an unwavering commitment to quality that permeates every product manufactured.', icon: '👨‍💼', color: 'var(--blue)' },
  { name: 'Technical Director', title: 'R&D and Certification', desc: 'Oversees all product testing at CPRI, IEC compliance documentation, and continuous improvement of our ESE arrester and earthing product lines for evolving site requirements.', icon: '🔬', color: 'var(--orange)' },
  { name: 'Sales & Distribution', title: 'Pan India Network', desc: 'Manages our nationwide distributor network, ensuring fast delivery, responsive customer support, and technical guidance across all 28+ states for every project size.', icon: '🤝', color: 'var(--blue-dk)' },
]

/* ── Animated Counter ─────────────────────────── */
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
        const dur = 1600, step = Math.ceil(num / (dur / 16))
        let cur = 0
        const t = setInterval(() => {
          cur = Math.min(cur + step, num)
          setCount(cur)
          if (cur >= num) clearInterval(t)
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Scroll Reveal ─────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 0.08}s`; obs.observe(el) })
    return () => obs.disconnect()
  })
}

export default function AboutPage() {
  useScrollReveal()

  

  return (
    <>

<Helmet>
  <title>About SDC Earth Power | CPRI-Certified Lightning Arrester Manufacturer – Dadri, UP India</title>
  <meta name="description" content="Sunsdust Commercial Private Limited (SDC Earth Power) – established 2010, Dadri, Gautam Buddha Nagar, UP. CPRI-certified manufacturer of ESE lightning arresters & copper earthing systems. 500+ projects, 28+ states, 15+ years expertise." />
  <meta name="keywords" content="SDC Earth Power manufacturer Dadri, lightning arrester manufacturer Greater Noida, earthing electrode supplier UP, Sunsdust Commercial Private Limited, CPRI certified manufacturer India, lightning protection company Uttar Pradesh" />
  <link rel="canonical" href="https://sdcearthpower.com/about" />
  <meta property="og:title" content="About SDC Earth Power | CPRI-Certified Lightning Arrester Manufacturer – Dadri UP" />
  <meta property="og:description" content="SDC Earth Power – 15+ years of CPRI-certified lightning protection manufacturing in Dadri, UP. 500+ projects. 28+ states. IEC 62305, IS 3043." />
  <meta property="og:url" content="https://sdcearthpower.com/about" />
  <script type="application/ld+json">{`
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": "https://sdcearthpower.com/about",
    "name": "About SDC Earth Power – Lightning Arrester Manufacturer India",
    "description": "Sunsdust Commercial Private Limited (SDC Earth Power), CPRI-certified manufacturer of ESE lightning arresters and copper earthing systems since 2010. Based in Dadri, Gautam Buddha Nagar, Uttar Pradesh.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type":"ListItem","position":1,"name":"Home","item":"https://sdcearthpower.com/"},
        {"@type":"ListItem","position":2,"name":"About Us","item":"https://sdcearthpower.com/about"}
      ]
    },
    "mainEntity": {
      "@id": "https://sdcearthpower.com/#organization"
    }
  }
  `}</script>
</Helmet>
 
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-left { opacity: 0; transform: translateX(-32px); transition: opacity .65s ease, transform .65s ease; }
        .reveal-left.visible { opacity: 1; transform: translateX(0); }
        .reveal-right { opacity: 0; transform: translateX(32px); transition: opacity .65s ease, transform .65s ease; }
        .reveal-right.visible { opacity: 1; transform: translateX(0); }
        .reveal-scale { opacity: 0; transform: scale(.94); transition: opacity .65s ease, transform .65s ease; }
        .reveal-scale.visible { opacity: 1; transform: scale(1); }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(240,112,32,.4)} 50%{box-shadow:0 0 0 14px rgba(240,112,32,0)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .btn-primary { display:inline-flex;align-items:center;gap:8px;background:var(--orange);color:#fff;padding:13px 26px;font-family:var(--ffh);font-size:0.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s;position:relative;overflow:hidden; }
        .btn-primary:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(240,112,32,.4); }
        .btn-secondary { display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--blue);padding:13px 26px;font-family:var(--ffh);font-size:0.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:2px solid var(--blue);cursor:pointer;transition:all .3s; }
        .btn-secondary:hover { background:var(--blue);color:#fff;transform:translateY(-2px); }
        .highlight-card { background:var(--off);border:1px solid var(--bdr);border-left:3px solid var(--orange);padding:18px 16px;transition:all .3s;cursor:default; }
        .highlight-card:hover { border-left-color:var(--blue);transform:translateX(5px);box-shadow:0 6px 20px rgba(26,79,204,.08); }
        .milestone-item { position:relative;margin-bottom:32px;padding-left:36px;transition:all .3s; }
        .milestone-item:hover .ms-card { box-shadow:0 8px 28px rgba(26,79,204,.12);transform:translateX(4px); }
        .ms-card { background:var(--white);border:1px solid var(--bdr);padding:22px 24px;transition:all .3s; }
        .team-card { background:var(--off);border:1px solid var(--bdr);padding:28px 24px;border-top:3px solid var(--orange);transition:all .35s; }
        .team-card:hover { box-shadow:0 12px 40px rgba(26,79,204,.12);transform:translateY(-6px); }
        .contact-row { display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid var(--bdr); }
        .contact-row:last-child { border-bottom:none; }
        .contact-icon { width:44px;height:44px;background:var(--blue-pal);border:1px solid var(--blue-mid);border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.1rem;transition:all .3s; }
        .contact-row:hover .contact-icon { background:var(--orange);border-color:var(--orange); }

        /* Responsive */
        .about-top { display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center; }
        .about-hero-inner { display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center; }
        .stats-band-inner { display:grid;grid-template-columns:repeat(4,1fr); }
        .highlights-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:56px; }
        .team-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px; }
        @media(max-width:900px) {
          .about-top { grid-template-columns:1fr !important; gap:36px !important; }
          .stats-band-inner { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media(max-width:600px) {
          .stats-band-inner { grid-template-columns:repeat(2,1fr) !important; }
          .about-hero-inner { grid-template-columns:1fr !important; }
          .about-hero-inner > div:last-child { display:none; }
        }
        @media(max-width:768px) {
          .hero-poly { display:none !important; }
        }
        @media(max-width:480px) {
          h1 { font-size:1.8rem !important; }
        }
      `}</style>

      {/* PAGE HERO */}
      <div style={{ background: 'linear-gradient(125deg,#e8f0fe 0%,#eaf0fd 40%,#d0e4ff 100%)', padding: '52px 0 44px', borderBottom: '3px solid var(--blue)', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-poly" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '38%', background: 'linear-gradient(135deg,var(--blue),var(--blue-dk))', clipPath: 'polygon(80px 0,100% 0,100% 100%,0 100%)' }} />
        {/* Decorative elements */}
        <div style={{ position: 'absolute', right: '10%', top: '20%', width: 120, height: 120, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.15)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '18%', bottom: '10%', width: 60, height: 60, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.1)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, fontSize: '0.76rem', color: 'var(--muted)' }}>
            <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e => e.target.style.color = 'var(--orange)'} onMouseLeave={e => e.target.style.color = 'var(--muted)'}>Home</Link>
            <span style={{ color: 'var(--dim)' }}>›</span>
            <span style={{ color: 'var(--orange)' }}>About Us</span>
          </div>
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.64rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>Est. 2010</div>
          <h1 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
            About <span style={{ color: 'var(--blue)' }}>SDC Earth Power</span>
          </h1>
          <p style={{ color: 'var(--mid)', fontSize: '0.92rem', maxWidth: 520, lineHeight: 1.75 }}>
            India's trusted manufacturer of CPRI-certified lightning protection and earthing solutions — serving critical infrastructure since 2010 across 28+ states.
          </p>
        </div>
      </div>

      {/* WELCOME SECTION */}
      <section style={{ padding: '72px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink)', position: 'relative', paddingBottom: 12 }} className="reveal">
              Welcome To SDC Earth Power
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 48, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))' }} />
            </div>
          </div>

          <div className="about-top" style={{ marginBottom: 56 }}>
            {/* Factory image */}
            <div style={{ position: 'relative' }} className="reveal-left">
              <div style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid var(--bdr)', boxShadow: '0 20px 60px rgba(26,79,204,.12)', position: 'relative' }}>
                <img src="/images/about-factory.jpg" alt="SDC Earth Power Facility" style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block', transition: 'transform .5s' }}
                  onError={e => { e.target.style.display = 'none'; e.target.parentNode.style.cssText += 'height:360px;display:flex;align-items:center;justify-content:center;background:var(--blue-pal)'; e.target.parentNode.innerHTML = '<span style="font-size:5rem;animation:floatY 3s ease-in-out infinite">🏭</span>' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                {/* Corner accents */}
                {[['top', 'left'], ['top', 'right'], ['bottom', 'right'], ['bottom', 'left']].map(([v, h], i) => (
                  <div key={i} style={{ position: 'absolute', [v]: 0, [h]: 0, width: i % 2 === 0 ? 32 : 3, height: i % 2 === 0 ? 3 : 32, background: 'var(--orange)' }} />
                ))}
              </div>
              <div style={{ position: 'absolute', bottom: -24, right: -24, background: 'linear-gradient(135deg,var(--orange),var(--orange-dk))', borderRadius: 4, padding: '20px 26px', boxShadow: '0 12px 36px rgba(240,112,32,.35)', animation: 'floatY 3s ease-in-out infinite' }}>
                <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.8rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>15+</div>
                <div style={{ color: 'rgba(255,255,255,.85)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '.1em', marginTop: 5, textTransform: 'uppercase' }}>Years of<br />Excellence</div>
              </div>
            </div>

            {/* Company info */}
            <div className="reveal-right">
              <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>Our Story</div>
              <h2 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 16, lineHeight: 1.2 }}>
                Powering Safety Across <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>India's Infrastructure</em>
              </h2>
              <div style={{ width: 48, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))', marginBottom: 22 }} />
              <p style={{ color: 'var(--mid)', lineHeight: 1.9, marginBottom: 16, fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--dark)' }}>Sunsdust Commercial Private Limited</strong> is a leading manufacturer and supplier of premium lightning protection and earthing solutions under the brand <strong style={{ color: 'var(--orange)' }}>SDC Earth Power</strong>. Based in Badhpura, Dadri, Gautam Buddha Nagar, Uttar Pradesh – 203207, we serve clients across 28+ states in India.
              </p>
              <p style={{ color: 'var(--mid)', lineHeight: 1.9, marginBottom: 28, fontSize: '0.9rem' }}>
                Our product line covers ESE Lightning Arresters (including the flagship SDC-60), Surge Protection Devices, Lightning Strike Counters, GI Earth Electrodes, Copper Bonded Electrodes, and complete earthing systems — all CPRI tested and complying with IEC 62305 &amp; IS 2309-1989.
              </p>

              {/* Company details */}
              <div style={{ background: 'var(--off)', border: '1px solid var(--bdr)', padding: '20px 22px', borderRadius: 3 }}>
                {[
                  ['🏢', 'Company', 'Sunsdust Commercial Private Limited'],
                  ['⚡', 'Brand', 'SDC Earth Power™'],
                  ['📞', 'Phone', '+91 9321447203', 'tel:+919321447203'],
                  ['✉️', 'Email', 'sdcearthing@gmail.com', 'mailto:sdcearthing@gmail.com'],
                  ['🌐', 'Website', 'www.sunsdust.com', 'https://www.sunsdust.com'],
                  ['📍', 'Address', 'Khasra No-267, Badhpura, Dadri, GB Nagar, UP – 203207'],
                  ['🏛️', 'GST No.', '09ABBCS2487A1ZG'],
                ].map(([icon, label, val, href]) => (
                  <div key={label} className="contact-row">
                    <div className="contact-icon">{icon}</div>
                    <div>
                      <div style={{ color: 'var(--muted)', fontSize: '0.62rem', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                      {href
                        ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.86rem', transition: 'color .2s', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = 'var(--orange)'} onMouseLeave={e => e.target.style.color = 'var(--blue)'}>{val}</a>
                        : <div style={{ color: 'var(--dark)', fontWeight: 500, fontSize: '0.86rem', lineHeight: 1.6 }}>{val}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div className="highlights-grid">
            {[
              ['🏆', 'CPRI Tested', 'All ESE arresters independently tested at 45 kA impulse, Level 4 protection — traceable test reports provided with every order.'],
              ['⚡', '250 kA Rated', 'Maximum lightning current capacity with 107-metre Level IV protection radius for the most demanding sites across India.'],
              ['🌍', 'Pan India Supply', 'Distributor network across all 28+ states with fast dispatch, reliable delivery, and responsive after-sales support.'],
              ['🔧', 'Technical Support', 'Expert guidance on system design, installation methodology, and complete compliance documentation for all project types.'],
              ['📋', 'Multi-Certified', 'IEC 62305, IS 3043, IS 2309-1989 — independently tested and certified to all relevant national and international standards.'],
              ['🏭', 'Industrial Grade', 'Built for coastal, high-humidity, and extreme-temperature environments. Maintenance-free for 10+ years of reliable operation.'],
            ].map(([icon, title, desc], i) => (
              <div key={title} className="highlight-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>{icon}</div>
                <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 7 }}>{title}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--muted)', lineHeight: 1.68 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section style={{ background: 'linear-gradient(135deg,var(--blue-dk),var(--blue))', padding: '56px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(255,255,255,.04) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div className="container">
          <div className="stats-band-inner">
            {[
              ['500', '+', 'Projects Delivered'],
              ['15', '+', 'Years Experience'],
              ['28', '+', 'States Covered'],
              ['100', '%', 'CPRI Certified']
            ].map(([n, suf, l]) => (
              <div key={l} style={{ textAlign: 'center', padding: '32px 20px', background: 'rgba(255,255,255,.03)', borderRight: '1px solid rgba(255,255,255,.08)', transition: 'background .3s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.07)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.03)'}>
                <div style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--yellow)', lineHeight: 1 }}>
                  <Counter target={n} suffix={suf} />
                </div>
                <div style={{ color: 'rgba(255,255,255,.6)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '.1em', marginTop: 10, textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section style={{ padding: '72px 0', background: 'var(--off)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink)', position: 'relative', paddingBottom: 12, marginBottom: 48, display: 'inline-block' }} className="reveal">
            Our Journey
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 48, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))' }} />
          </div>

          <div style={{ position: 'relative', paddingLeft: 28 }}>
            <div style={{ position: 'absolute', left: 9, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg,var(--orange),var(--blue),var(--orange))' }} />
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="milestone-item reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div style={{
                  position: 'absolute', left: -22, top: 12, width: 22, height: 22,
                  borderRadius: '50%', background: i % 2 === 0 ? 'var(--orange)' : 'var(--blue)',
                  border: '3px solid var(--white)', boxShadow: '0 2px 10px rgba(0,0,0,.18)',
                  transition: 'transform .3s'
                }} />
                <div className="ms-card" style={{ borderLeft: `3px solid ${i % 2 === 0 ? 'var(--orange)' : 'var(--blue)'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                    <span style={{ fontFamily: 'var(--ffh)', fontSize: '1.4rem', fontWeight: 800, color: i % 2 === 0 ? 'var(--orange)' : 'var(--blue)', minWidth: 52 }}>{m.year}</span>
                    <h3 style={{ fontFamily: 'var(--ffh)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>{m.title}</h3>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.87rem', lineHeight: 1.8 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: '72px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink)', position: 'relative', paddingBottom: 12, marginBottom: 48, display: 'inline-block' }} className="reveal">
            Our Leadership Team
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 48, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))' }} />
          </div>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div key={m.name} className="team-card reveal" style={{ transitionDelay: `${i * 0.12}s`, borderTopColor: m.color }}>
                <div style={{ width: 68, height: 68, borderRadius: '50%', background: `linear-gradient(135deg,${m.color},var(--blue-dk))`, border: `3px solid ${m.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: 18, transition: 'transform .3s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'rotate(10deg) scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}>
                  {m.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--ffh)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>{m.name}</h3>
                <div style={{ color: m.color, fontSize: '0.73rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14 }}>{m.title}</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.8 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(125deg,var(--blue-dk),var(--blue))', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 14 }}>Partner With Us</div>
          <h2 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>Partner with <span style={{ color: 'var(--yellow)' }}>SDC Earth Power</span></h2>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '0.92rem', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
            Get in touch with our technical team for consultation, product demos, or quotations. We respond within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary">Get a Free Quote →</Link>
            <Link to="/products" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,.4)', color: '#fff' }}>Browse Products</Link>
          </div>
        </div>
      </section>
    </>
  )
}
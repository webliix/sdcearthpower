import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../data/products.js'
import { Helmet } from 'react-helmet-async'
import ProtectionCalculator from '../components/ProtectionCalculator.jsx'

/* ── Keyframes & Global styles ─────────────────── */
const GLOBAL_CSS = `
  @keyframes indScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes clientScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(240,112,32,.4)} 50%{box-shadow:0 0 0 14px rgba(240,112,32,0)} }
  @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes shimmer { 0%,100%{opacity:.6} 50%{opacity:1} }

  .btn-primary {
    display:inline-flex;align-items:center;gap:8px;
    background:var(--orange);color:#fff;
    padding:12px 24px;font-family:var(--ffh);
    font-size:0.82rem;font-weight:700;letter-spacing:.06em;
    text-transform:uppercase;text-decoration:none;
    border:none;cursor:pointer;transition:all .3s;position:relative;overflow:hidden;
  }
  .btn-primary::before{content:'';position:absolute;inset:0;background:rgba(255,255,255,.15);transform:translateX(-101%);transition:transform .4s}
  .btn-primary:hover::before{transform:translateX(0)}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(240,112,32,.4)}

  .btn-secondary {
    display:inline-flex;align-items:center;gap:8px;
    background:transparent;color:var(--blue);
    padding:12px 24px;font-family:var(--ffh);
    font-size:0.82rem;font-weight:700;letter-spacing:.06em;
    text-transform:uppercase;text-decoration:none;
    border:2px solid var(--blue);cursor:pointer;transition:all .3s;
  }
  .btn-secondary:hover{background:var(--blue);color:#fff;transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,79,204,.3)}

  .heading-block{margin-bottom:36px}
  .heading-block h3{
    font-family:var(--ffh);font-size:1.9rem;font-weight:800;color:var(--ink);
    position:relative;display:inline-block;padding-bottom:12px;
  }
  .heading-block h3::after{
    content:'';position:absolute;bottom:0;left:0;
    width:48px;height:3px;
    background:linear-gradient(90deg,var(--orange),var(--blue));
    transition:width .4s;
  }
  .heading-block:hover h3::after{width:100%}

  .reveal{opacity:0;transform:translateY(28px);transition:opacity .6s ease,transform .6s ease}
  .reveal.visible{opacity:1;transform:translateY(0)}
  .reveal-left{opacity:0;transform:translateX(-28px);transition:opacity .6s ease,transform .6s ease}
  .reveal-left.visible{opacity:1;transform:translateX(0)}

  .card-hover{transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s!important}
  .card-hover:hover{transform:translateY(-6px)!important;box-shadow:0 20px 48px rgba(26,79,204,.14)!important}

  .sl-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(240,112,32,.12);border:1px solid rgba(240,112,32,.3);padding:6px 16px;font-size:0.68rem;font-weight:700;color:var(--orange);letter-spacing:.14em;text-transform:uppercase;margin-bottom:18px;animation:fadeIn .5s ease}
  .sl-h1{font-family:var(--ffh);font-size:clamp(2rem,4vw,3.4rem);font-weight:800;color:var(--ink);line-height:1.1;margin-bottom:16px;animation:fadeIn .6s ease .1s both}
  .slarr{width:40px;height:40px;background:var(--white);border:1.5px solid var(--bdr2);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.1rem;color:var(--blue);transition:all .25s;border-radius:2px}
  .slarr:hover{background:var(--orange);color:#fff;border-color:var(--orange);transform:scale(1.1)}

  .wfeat{background:var(--off);border:1px solid var(--bdr);border-left:3px solid var(--orange);padding:16px 18px;transition:all .3s}
  .wfeat:hover{border-left-color:var(--blue);transform:translateX(4px);box-shadow:0 4px 16px rgba(26,79,204,.08)}

  .prod-card-hp{text-decoration:none;background:var(--white);border:1px solid var(--bdr);overflow:hidden;transition:all .35s cubic-bezier(.34,1.56,.64,1);position:relative;display:block}
  .prod-card-hp::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--blue),var(--orange));opacity:0;transition:opacity .25s}
  .prod-card-hp:hover{border-color:var(--blue-mid);box-shadow:0 14px 40px rgba(26,79,204,.13);transform:translateY(-6px)}
  .prod-card-hp:hover::after{opacity:1}

  @media(max-width:900px){.slider-grid{grid-template-columns:1fr!important;gap:24px!important}.why-grid{grid-template-columns:repeat(2,1fr)!important}.stats-row{grid-template-columns:repeat(2,1fr)!important}}
  @media(max-width:600px){.sl-h1{font-size:1.8rem!important}.prod-grid-hp{grid-template-columns:1fr!important}.cta-strip-inner{grid-template-columns:1fr!important}}
  @media(max-width:768px){.hero-poly{display:none!important}.welcome-grid{grid-template-columns:1fr!important}}
  @media(max-width:480px){.why-grid{grid-template-columns:1fr!important}}
`

/* ── Scroll Reveal ──────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

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
        const step = Math.ceil(num / (1800 / 16))
        let cur = 0
        const t = setInterval(() => { cur = Math.min(cur + step, num); setCount(cur); if (cur >= num) clearInterval(t) }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ── Hero Slider ────────────────────────────────── */
const SLIDES = [
  { tag: 'CPRI Certified · IEC 62305', h1: 'Total Lightning &', h1b: 'Earthing Protection', sub: 'Industrial-grade ESE arresters and copper earthing systems for power plants, telecom towers, data centres & hospitals across India.', btn1: 'Explore Products', btn1to: '/products', btn2: 'Get a Quote', btn2to: '/contact', kpis: [{ n: '250kA', l: 'Max Rating' }, { n: '107m', l: 'Protection' }, { n: '500+', l: 'Projects' }], feats: ['CPRI Tested · 45 kA Impulse Certified', 'IEC 62305 · IS 2309 · IS 3043 Compliant', 'Pan India Distribution Network'], bg: 'linear-gradient(125deg,#e8f0fe 0%,#eaf0fd 40%,#d0e4ff 100%)', accent: 'linear-gradient(135deg,#1a4fcc,#0d2d7a)' },
  { tag: 'IS 3043 · IEC 62305', h1: 'Copper Earthing', h1b: 'Electrodes & Rods', sub: 'Pure copper and copper bonded earth electrodes, rods, strips and busbars — complete grounding systems for critical infrastructure.', btn1: 'View Electrodes', btn1to: '/products?cat=earthing-electrodes', btn2: 'Technical Support', btn2to: '/contact', kpis: [{ n: '99.9%', l: 'Cu Purity' }, { n: '250µm', l: 'Coating' }, { n: '30yr', l: 'Life' }], feats: ['50mm dia · 1m to 6m lengths', 'Light / Medium / Heavy duty grades', 'Electrolytic copper bonded process'], bg: 'linear-gradient(125deg,#fff5ee 0%,#fde8d4 40%,#fcd8b8 100%)', accent: 'linear-gradient(135deg,#f07020,#c55e10)' },
  { tag: 'Solar Protection · IEC 61439', h1: 'Solar ACDB/DCDB', h1b: 'Distribution Boxes', sub: 'IP65 rated AC and DC distribution boxes with built-in MCB, SPD and surge protection for complete solar power system safety.', btn1: 'View Solar Range', btn1to: '/products?cat=distribution-boxes', btn2: 'Get a Quote', btn2to: '/contact', kpis: [{ n: '600V', l: 'DC Max' }, { n: '32A', l: 'Current' }, { n: 'IP65', l: 'Rating' }], feats: ['MCB + SPD protection built in', 'Polycarbonate IP65 weatherproof', 'IEC 61439 compliant · Copper busbar'], bg: 'linear-gradient(125deg,#eef2f9 0%,#e4edf8 50%,#d4e0f8 100%)', accent: 'linear-gradient(135deg,#0d2d7a,#0f1e60)' },
]

function HeroSlider() {
  const [cur, setCur] = useState(0)
  const [locked, setLocked] = useState(false)
  const goTo = (idx) => { if (locked) return; setLocked(true); setCur(idx); setTimeout(() => setLocked(false), 900) }
  useEffect(() => { const t = setInterval(() => goTo((cur + 1) % SLIDES.length), 5500); return () => clearInterval(t) }, [cur])
  const s = SLIDES[cur]

  return (
    
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: 530 }}>
      {SLIDES.map((sl, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === cur ? 1 : 0, transition: 'opacity .9s ease', background: sl.bg, display: 'flex', alignItems: 'center', pointerEvents: i === cur ? 'auto' : 'none' }}>
          <div className="hero-poly" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '43%', overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', inset: 0, background: sl.accent }} />
            <div style={{ position: 'absolute', left: -90, top: 0, bottom: 0, width: 180, background: sl.accent, transform: 'skewX(-7deg)' }} />
            {[...Array(5)].map((_, j) => <div key={j} style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,.18)', top: `${18 + j * 16}%`, right: `${12 + (j % 3) * 10}%` }} />)}
          </div>
        </div>
      ))}

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 48, paddingBottom: 48 }}>
        <div className="slider-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="sl-tag">⚡ {s.tag}</div>
            <h1 className="sl-h1">{s.h1}<br /><b style={{ color: 'var(--blue-dk)', display: 'inline-block' }}>{s.h1b}</b></h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.85, marginBottom: 28, maxWidth: 440, animation: 'fadeIn .6s ease .2s both' }}>{s.sub}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeIn .6s ease .3s both' }}>
              <Link to={s.btn1to} className="btn-primary">{s.btn1} →</Link>
              <Link to={s.btn2to} className="btn-secondary">{s.btn2}</Link>
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 3 }}>
            <div style={{ background: 'rgba(255,255,255,.94)', border: '1px solid rgba(255,255,255,.8)', boxShadow: '0 20px 60px rgba(26,79,204,.18)', padding: 28, borderRadius: 4, backdropFilter: 'blur(8px)', animation: 'fadeIn .7s ease .2s both' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
                {s.kpis.map(k => (
                  <div key={k.l} style={{ textAlign: 'center', padding: '16px 8px', background: 'var(--off)', border: '1px solid var(--bdr)', transition: 'transform .3s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                    <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--blue)', lineHeight: 1 }}>{k.n}</div>
                    <div style={{ fontSize: '0.62rem', color: 'var(--muted)', marginTop: 4, letterSpacing: '.08em', textTransform: 'uppercase' }}>{k.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--bdr)', paddingTop: 16 }}>
                {s.feats.map(f => (
                  <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--bdr)' }}>
                    <span style={{ color: 'var(--orange)', fontSize: '0.85rem', flexShrink: 0 }}>✅</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--dark)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ position: 'absolute', bottom: 24, right: 28, display: 'flex', gap: 8, zIndex: 10 }}>
        <button className="slarr" onClick={() => goTo((cur - 1 + SLIDES.length) % SLIDES.length)}>←</button>
        <button className="slarr" onClick={() => goTo((cur + 1) % SLIDES.length)}>→</button>
      </div>
      <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ width: i === cur ? 28 : 9, height: 9, borderRadius: i === cur ? 4 : '50%', background: i === cur ? 'var(--orange)' : 'var(--bdr2)', border: 'none', cursor: 'pointer', transition: 'all .3s cubic-bezier(.34,1.56,.64,1)', padding: 0 }} />
        ))}
      </div>
    </section>
  )
}

/* ── Welcome ─────────────────────────────────── */
function Welcome() {
  return (
    <section style={{ padding: '72px 0', background: 'var(--white)' }}>
      <div className="container">
        <div className="heading-block reveal"><h3>Welcome To SDC Earth Power</h3></div>
        <div className="welcome-grid" style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: 40, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }} className="reveal-left">
            <div style={{ width: 168, height: 168, borderRadius: '50%', border: '4px solid var(--orange)', overflow: 'hidden', background: 'var(--blue-pal)', boxShadow: '0 12px 36px rgba(26,79,204,.2)', animation: 'pulse 3s ease-in-out infinite' }}>
              <img src="/images/sdc-power-logo.png" alt="SDC Earth Power" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '⚡'; e.target.parentNode.style.cssText += 'display:flex;align-items:center;justify-content:center;font-size:4rem' }} />
            </div>
            <div style={{ background: 'var(--orange)', color: '#fff', textAlign: 'center', padding: '8px 16px', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', borderRadius: 2, width: '100%' }}>CPRI<br />Certified</div>
            <div style={{ background: 'var(--blue)', color: '#fff', textAlign: 'center', padding: '8px 16px', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', borderRadius: 2, width: '100%' }}>IEC 62305<br />IS 3043</div>
          </div>

          <div className="reveal">
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32, listStyle: 'none', padding: 0 }}>
              {[
                <><strong style={{ color: 'var(--blue-dk)' }}>Sunsdust Commercial Private Limited</strong> (SDC Earth Power), headquartered at Badhpura, Dadri, Gautam Buddha Nagar, Uttar Pradesh – 203207, is a leading CPRI-certified manufacturer and supplier of lightning protection and earthing solutions, serving clients across <strong>28+ states in India</strong>. GSTIN: 09ABBCS2487A1ZG.</>,
                <>The company manufactures <strong>ESE Lightning Arresters</strong> (CPRI tested, IEC 62305), Surge Protection Devices, Lightning Strike Counters, GI &amp; Copper Bonded Earth Electrodes, Pure Copper Earth Rods, Earthing Strips &amp; Busbars, Earthing Plates, and AC/DC Distribution Boxes for solar systems.</>,
                <>SDC Earth Power has a robust manufacturing facility capable of handling large-volume orders with zero delivery delays. Every product is independently tested and certified to IEC 62305, IS 3043, IS 2309-1989 — ensuring complete confidence for specifiers, contractors, and end clients.</>
              ].map((t, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--mid)', lineHeight: 1.85 }}>
                  <span style={{ color: 'var(--orange)', flexShrink: 0, marginTop: 4, fontSize: '0.85rem' }}>▸</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
              {[{ i: '🏆', t: 'CPRI Certified', d: '45 kA impulse tested at Level 4 — 107m protection radius.' }, { i: '⚡', t: '250 kA Rated', d: 'Maximum lightning current with broad protection coverage.' }, { i: '🔩', t: 'Full System Supply', d: 'Arrester to earth plate — complete protection from one supplier.' }, { i: '🌍', t: 'Pan India Delivery', d: 'Supply network across all 28+ states with fast dispatch.' }].map(f => (
                <div key={f.t} className="wfeat">
                  <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{f.i}</div>
                  <div style={{ fontSize: '0.83rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 5 }}>{f.t}</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--muted)', lineHeight: 1.6 }}>{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Protection Radius Calculator Block */}
        <div style={{ marginTop: 56 }} className="reveal">
          <ProtectionCalculator />
        </div>
      </div>
    </section>
  )
}

/* ── Industries Scroll ─────────────────────────── */
const INDS = [
  { n: 'Power Plants', img: '/images/industries/power.jpg', i: '🏭' },
  { n: 'Telecom Towers', img: '/images/industries/telecom.jpg', i: '📡' },
  { n: 'Commercial Buildings', img: '/images/industries/commercial.jpg', i: '🏢' },
  { n: 'Data Centres', img: '/images/industries/datacenter.jpg', i: '💻' },
  { n: 'Residential', img: '/images/industries/residential.jpg', i: '🏠' },
  { n: 'Water & Utilities', img: '/images/industries/water.jpg', i: '💧' },
  { n: 'Government & Defence', img: '/images/industries/government.jpg', i: '✈️' },
  { n: 'Industrial Plants', img: '/images/industries/industrial.jpg', i: '⚙️' },
  { n: 'Hospitals', img: '/images/industries/datacenter.jpg', i: '🏥' },
  { n: 'Solar Farms', img: '/images/industries/power.jpg', i: '☀️' },
]
const IND_LOOP = [...INDS, ...INDS]

function Industries() {
  return (
    <section style={{ paddingBottom: 64, background: 'var(--off)' }}>
      <div className="container" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="heading-block reveal"><h3>Industries We Serve</h3></div>
      </div>
      <div style={{
        overflow: 'hidden',
        background: 'var(--blue-dk)',
        borderTop: '1px solid rgba(255,255,255,.06)',
        position: 'relative',
        maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
      }}>
        <div className="marquee-track" style={{ display: 'flex', animation: 'indScroll 32s linear infinite', width: 'max-content' }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}>
          {IND_LOOP.map((ind, i) => (
            <div key={i} style={{ width: 220, height: 150, position: 'relative', borderRight: '1px solid rgba(255,255,255,.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden', cursor: 'pointer', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.querySelector('.ind-ov').style.background = 'rgba(26,79,204,.75)'; e.currentTarget.querySelector('.ind-icon').style.transform = 'scale(1.3) translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.querySelector('.ind-ov').style.background = 'rgba(8,15,36,.54)'; e.currentTarget.querySelector('.ind-icon').style.transform = 'scale(1) translateY(0)' }}>
              <img src={ind.img} alt={ind.n} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.opacity = 0} />
              <div className="ind-ov" style={{ position: 'absolute', inset: 0, background: 'rgba(8,15,36,.54)', transition: 'background .35s' }} />
              <div style={{ position: 'relative', zIndex: 2, padding: '0 0 16px', textAlign: 'center' }}>
                <div className="ind-icon" style={{ fontSize: '1.7rem', marginBottom: 6, transition: 'transform .35s cubic-bezier(.34,1.56,.64,1)', display: 'block' }}>{ind.i}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', letterSpacing: '.05em' }}>{ind.n}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Product Showcase ──────────────────────────── */
function ProductShowcase() {
  const [cat, setCat] = useState('all')
  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat)

  return (
    <section style={{ padding: '72px 0', background: 'var(--white)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 8 }}>
          <div className="heading-block reveal" style={{ marginBottom: 0 }}><h3>Our Product Range</h3></div>
          <Link to="/products" style={{ color: 'var(--orange)', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '.06em', textTransform: 'uppercase' }} className="reveal">View All →</Link>
        </div>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', margin: '24px 0 36px', border: '1px solid var(--bdr)', overflowX: 'auto' }}>
          {(CATEGORIES || []).map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.12em', textTransform: 'uppercase', padding: '12px 18px', background: cat === c.id ? 'var(--orange)' : 'transparent', border: 'none', borderRight: '1px solid var(--bdr)', color: cat === c.id ? '#fff' : 'var(--muted)', cursor: 'pointer', transition: 'all .25s', whiteSpace: 'nowrap', flexShrink: 0 }}
              onMouseEnter={e => { if (cat !== c.id) { e.currentTarget.style.background = 'var(--blue-pal)'; e.currentTarget.style.color = 'var(--blue)' } }}
              onMouseLeave={e => { if (cat !== c.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)' } }}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="prod-grid-hp" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {filtered.slice(0, 6).map(p => (
            <Link key={p.id} to={`/products/${p.slug}`} className="prod-card-hp card-hover">
              <div style={{ height: 190, background: 'var(--off)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid var(--bdr)', overflow: 'hidden' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, transition: 'transform .5s' }} onError={e => e.target.style.display = 'none'}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                <span style={{ fontSize: '3rem', opacity: 0.08, position: 'relative', zIndex: 1 }}>⚡</span>
                {p.badge && <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2, background: p.bc || 'var(--orange)', color: '#fff', fontSize: '0.56rem', fontWeight: 700, letterSpacing: '.12em', padding: '3px 9px', textTransform: 'uppercase', borderRadius: 2 }}>{p.badge}</div>}
              </div>
              <div style={{ padding: '18px 20px 22px' }}>
                <div style={{ color: 'var(--dim)', fontSize: '0.6rem', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 7 }}>{(CATEGORIES || []).find(c => c.id === p.category)?.label}</div>
                <h3 style={{ fontFamily: 'var(--ffh)', fontWeight: 700, fontSize: '1.08rem', color: 'var(--ink)', marginBottom: 7, lineHeight: 1.28 }}>{p.name}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.77rem', lineHeight: 1.65, marginBottom: 14 }}>{p.tagline}</p>
                <span style={{ color: 'var(--orange)', fontSize: '0.8rem', fontWeight: 700 }}>View Full Specs →</span>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/products" className="btn-primary">View All Products →</Link>
        </div>
      </div>
      <style>{`.prod-grid-hp{display:grid;grid-template-columns:repeat(3,1fr);gap:20px} @media(max-width:900px){.prod-grid-hp{grid-template-columns:repeat(2,1fr)!important}} @media(max-width:560px){.prod-grid-hp{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

/* ── Why Band ───────────────────────────────────── */
function WhyBand() {
  return (
    <section style={{ padding: '72px 0', background: 'linear-gradient(135deg,var(--blue-dk) 0%,var(--blue) 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(240,112,32,.08) 0%, transparent 40%)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>Why Choose SDC Earth Power</div>
          <h2 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 800, color: '#fff' }}>Built on Trust &amp; Technology</h2>
          <div style={{ width: 56, height: 3, background: 'linear-gradient(90deg,var(--orange),transparent)', margin: '16px auto 0' }} />
        </div>
        <div className="why-grid" style={{ marginBottom: 52 }}>
          {[{ i: '🏆', t: 'CPRI Certified', d: 'All ESE arresters independently tested at 45 kA impulse, Level 4 — 107m protection radius verified by CPRI Bangalore.' }, { i: '⚡', t: '250 kA Rated', d: 'Flagship SDC-60 handles 250 kA with 60µs impulse — among the highest rated ESE arresters in India.' }, { i: '🌍', t: '28+ States', d: 'Installations across residential, commercial, industrial, and government sectors nationwide with dedicated support.' }, { i: '✅', t: 'Complete Systems', d: 'ESE arresters to earthing strips — every component sourced from one trusted, certified supplier.' }].map((r, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', padding: '32px 24px', textAlign: 'center', transition: 'all .35s', borderTop: '3px solid transparent' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(240,112,32,.12)'; e.currentTarget.style.borderTopColor = 'var(--orange)'; e.currentTarget.style.transform = 'translateY(-6px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ fontSize: '2.4rem', marginBottom: 16 }}>{r.i}</div>
              <h3 style={{ fontFamily: 'var(--ffh)', fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>{r.t}</h3>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.8 }}>{r.d}</p>
            </div>
          ))}
        </div>
        <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {[['500', '+', 'Projects Delivered'], ['15', '+', 'Years Experience'], ['28', '+', 'States Covered'], ['100', '%', 'CPRI Certified']].map(([n, suf, l]) => (
            <div key={l} style={{ textAlign: 'center', padding: '28px 16px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
              <div style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(2rem,4vw,2.6rem)', fontWeight: 800, color: 'var(--yellow)', lineHeight: 1 }}>
                <Counter target={n} suffix={suf} />
              </div>
              <div style={{ color: 'rgba(255,255,255,.55)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '.1em', marginTop: 8, textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <Link to="/why-us" className="btn-primary">Learn More About Us</Link>
        </div>
      </div>
      <style>{`.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px} @media(max-width:900px){.why-grid{grid-template-columns:repeat(2,1fr)!important}.stats-row{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </section>
  )
}

/* ── Clients ─────────────────────────────────── */
const CLIENTS = ['Power Grid Corporation', 'BSNL Telecom', 'NTPC Limited', 'Tata Projects', 'L&T Construction', 'Adani Group', 'ONGC India', 'AIIMS Hospital', 'Airports Authority', 'Indian Railways', 'NHPC Hydro', 'Reliance Jio', 'Bharti Airtel', 'SAIL Steel', 'BHEL', 'GAIL India', 'Coal India', 'HPCL']
const CL = [...CLIENTS, ...CLIENTS]

function Clients() {
  return (
    <section style={{ padding: '64px 0', background: 'var(--off)' }}>
      <div className="container" style={{ marginBottom: 32 }}>
        <div className="heading-block reveal"><h3>Our Satisfied Clients</h3></div>
      </div>
      <div style={{
        overflow: 'hidden',
        background: 'var(--white)',
        borderTop: '1px solid var(--bdr)',
        borderBottom: '1px solid var(--bdr)',
        position: 'relative',
        maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)'
      }}>
        <div className="marquee-track" style={{ display: 'flex', animation: 'clientScroll 34s linear infinite', width: 'max-content' }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}>
          {CL.map((c, i) => (
            <div key={i} style={{ width: 180, height: 80, borderRight: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 14px', background: 'var(--white)', transition: 'all .25s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-pal)'; e.currentTarget.style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.transform = 'scale(1)' }}>
              <span style={{ fontSize: '0.73rem', fontWeight: 700, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.4 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CTA Strip ───────────────────────────────── */
function CTAStrip() {
  return (
    <section style={{ background: 'var(--off)', padding: '56px 0', borderTop: '1px solid var(--bdr)' }}>
      <div className="container">
        <div className="cta-strip-inner" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>Get In Touch</div>
            <h2 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1.5rem,3vw,2.1rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>
              Ready to Protect Your <span style={{ color: 'var(--orange)' }}>Infrastructure?</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>Get a free technical consultation and competitive quote within 24 hours.</p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link to="/contact" className="btn-primary">Get Free Quote →</Link>
            <Link to="/products" className="btn-secondary">Browse Products</Link>
          </div>
        </div>
      </div>
      <style>{`.cta-strip-inner{display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center} @media(max-width:768px){.cta-strip-inner{grid-template-columns:1fr!important} .cta-strip-inner>div:last-child{justify-content:flex-start!important}}`}</style>
    </section>
  )
}

export default function HomePage() {
  useScrollReveal()
  return (
    <>
    <Helmet>
  <title>ESE Lightning Arrester & Earthing Electrode Manufacturer India | SDC Power</title>
  <meta name="description" content="SDC Power – CPRI-certified ESE lightning arrester (250 kA, 107m Level 4 radius) and copper bonded earth electrode manufacturer in India. IEC 62305 & IS 3043. Pan India supply from Dadri, UP. Call +91 9321447203." />
  <meta name="keywords" content="ESE lightning arrester India, CPRI certified lightning arrester, copper bonded earth electrode, earthing electrode manufacturer India, lightning protection system India, IEC 62305 lightning protection, IS 3043 earthing, lightning arrester manufacturer UP, ESE arrester 250 kA" />
  <link rel="canonical" href="https://sdcearthpower.com/" />
  <meta property="og:title" content="ESE Lightning Arrester & Earthing Electrode Manufacturer India | SDC Power" />
  <meta property="og:description" content="CPRI-certified ESE lightning arrester (250 kA · 107m Level 4) and copper earthing systems. IEC 62305 · IS 3043. Pan India supply. Free quote." />
  <meta property="og:url" content="https://sdcearthpower.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://sdcearthpower.com/images/og/homepage.jpg" />
  <script type="application/ld+json">{`
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "SDC Power Lightning Protection Products",
    "description": "CPRI-certified ESE lightning arresters and earthing systems",
    "itemListElement": [
      {"@type":"ListItem","position":1,"name":"ESE Lightning Arrester SDC-60","url":"https://sdcearthpower.com/products/ese-lightning-arrester-sdc-60"},
      {"@type":"ListItem","position":2,"name":"Copper Bonded Earth Electrode","url":"https://sdcearthpower.com/products/copper-bonded-earth-electrode"},
      {"@type":"ListItem","position":3,"name":"GI Earth Electrode 50mm","url":"https://sdcearthpower.com/products/gi-earth-electrode"},
      {"@type":"ListItem","position":4,"name":"Lightning Strike Counter IP65","url":"https://sdcearthpower.com/products/lightning-strike-counter"},
      {"@type":"ListItem","position":5,"name":"Surge Protection Device","url":"https://sdcearthpower.com/products/surge-protection-device"},
      {"@type":"ListItem","position":6,"name":"Solar ACDB Distribution Box","url":"https://sdcearthpower.com/products/ac-distribution-box"}
    ]
  }
  `}</script>
</Helmet>
      <style>{GLOBAL_CSS}</style>
      <HeroSlider />
      <Welcome />
      <Industries />
      <ProductShowcase />
      <WhyBand />
      <Clients />
      <CTAStrip />
    </>
  )
}
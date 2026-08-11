import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'


const INDUSTRIES = [
  { icon: '🏭', title: 'Power Plants & Utilities', img: '/images/industries/power.jpg', color: '#1a4fcc', desc: 'Lightning protection and earthing for thermal, hydro, solar, and wind power plants. Our ESE arresters protect control rooms, switchyards, transmission towers, and substation equipment. Comprehensive earthing systems ensure personnel safety and equipment continuity at all times.', products: ['ESE Lightning Arrester SDC-60', 'GI Earth Electrode (50mm)', 'Copper Bonded Earth Rod', 'Lightning Strike Counter', 'Surge Protection Device'], stats: ['500+ MW Protected', '45 kA Rated', 'IEC 62305'] },
  { icon: '📡', title: 'Telecom Towers & Infrastructure', img: '/images/industries/telecom.jpg', color: '#f07020', desc: 'Mobile towers, broadcasting masts, and telecom base stations are prime targets for lightning strikes. SDC Earth Power ESE arresters and IP65 lightning strike counters protect tower equipment and data infrastructure, while copper bonded earthing systems ensure low earth resistance in any soil.', products: ['ESE Lightning Arrester SDC-60', 'Lightning Strike Counter (IP65)', 'Copper Bonded Earth Rod', 'Surge Protection Device', 'Earth Enhancing Compound'], stats: ['200+ Towers Protected', 'IP65 Rated', 'CPRI Certified'] },
  { icon: '🏢', title: 'Commercial Buildings & High-Rise', img: '/images/industries/commercial.jpg', color: '#0d2d7a', desc: 'Offices, malls, hotels, and high-rise commercial structures require comprehensive lightning protection compliant with IS 2309 and IEC 62305. SDC Earth Power provides complete protection — from ESE arresters on rooftops to earthing systems and surge protection devices at distribution boards.', products: ['ESE Lightning Arrester – Standard', 'GI Earth Rod', 'Earthing Pit Cover (CI/GI)', 'Surge Protection Device', 'GI Earthing Strip'], stats: ['107m Protection Radius', 'IS 2309 Compliant', 'Complete System'] },
  { icon: '💻', title: 'Data Centres & IT Infrastructure', img: '/images/industries/datacenter.jpg', color: '#1565c0', desc: 'Mission-critical IT infrastructure demands the highest lightning and surge protection. SDC Earth Power supplies pure copper earthing electrodes, copper busbars, and Type 1/2/3 SPDs for comprehensive protection of server rooms, UPS systems, and network equipment.', products: ['ESE Lightning Arrester SDC-60', 'Pure Copper Earth Electrode', 'Pure Copper Busbar', 'Surge Protection Device (Type 1/2/3)', 'Lightning Strike Counter'], stats: ['99.9% Uptime Assured', 'Type 1/2/3 SPDs', 'IS 3043 Earthing'] },
  { icon: '🏥', title: 'Hospitals & Healthcare Facilities', img: '/images/industries/government.jpg', color: '#2e7d32', desc: 'Healthcare facilities cannot afford electrical failures. SDC Earth Power provides CPRI-certified lightning protection, earthing for sensitive medical equipment, and surge protection for life-critical electrical installations. IS 3043 compliant earthing ensures patient and staff safety.', products: ['ESE Lightning Arrester SDC-60', 'Pure Copper Earth Electrode', 'Pure Copper Earthing Strip', 'Surge Protection Device', 'Earth Enhancing Compound'], stats: ['Life-Critical Protection', 'IS 3043 Earthing', 'Regulatory Compliant'] },
  { icon: '🏠', title: 'Residential Buildings & Villas', img: '/images/industries/residential.jpg', color: '#6a1b9a', desc: 'Residential complexes, villas, and apartments are protected with cost-effective conventional and ESE lightning arresters. SDC Earth Power conventional copper bonded arresters and GI earthing rods provide reliable IS 2309-compliant protection for all residential building types.', products: ['Copper Bonded Conventional Arrester', 'GI Earth Rod', 'Earthing Pit Cover (CI/GI)', 'GI Earthing Strip', 'GI Earthing Plate'], stats: ['IS 2309 Approved', 'Easy Installation', 'Cost Effective'] },
  { icon: '💧', title: 'Water Treatment & Utilities', img: '/images/industries/water.jpg', color: '#00695c', desc: 'Water treatment plants, pumping stations, and sewage facilities require robust earthing and lightning protection for electrical control systems and pump motors. SDC Earth Power GI and copper bonded electrodes provide long-life earthing in challenging soil conditions.', products: ['GI Earth Electrode (50mm)', 'Copper Bonded Earth Electrode', 'ESE Lightning Arrester – Standard', 'Earth Enhancing Compound', 'GI Earthing Strip'], stats: ['Long-Life Electrodes', 'All Soil Types', 'IEC Compliant'] },
  { icon: '⚙️', title: 'Industrial Plants & Manufacturing', img: '/images/industries/industrial.jpg', color: '#e65100', desc: 'Petrochemical plants, steel mills, cement factories, and food processing facilities require heavy-duty earthing and lightning protection. SDC Earth Power heavy-duty electrodes, ESE arresters, and complete earthing grids protect personnel, equipment, and continuous operations.', products: ['ESE Lightning Arrester SDC-60', 'GI Earth Electrode (Heavy Duty)', 'Copper Bonded Earth Rod', 'Pure Copper Earthing Strip', 'Surge Protection Device'], stats: ['Heavy Duty Grade', '250 kA Rated', 'Hazardous Area Safe'] },
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

export default function IndustriesPage() {
  const [activeIndustry, setActiveIndustry] = useState(null)
  useScrollReveal()

  return (
    <>
    <Helmet>
  <title>Lightning Protection for Power Plants, Telecom, Data Centres & Hospitals India | SDC Earth Power</title>
  <meta name="description" content="SDC Earth Power lightning protection systems for 8 industry sectors: power plants, telecom towers, data centres, hospitals, commercial high-rise, industrial plants, water utilities, residential buildings. CPRI certified, IEC 62305 compliant." />
  <meta name="keywords" content="lightning protection power plant India, telecom tower earthing system, data centre grounding system, hospital lightning protection IS 3043, ESE arrester industrial plant, commercial building lightning arrester, solar farm earthing system" />
  <link rel="canonical" href="https://sdcearthpower.com/industries" />
  <meta property="og:title" content="Lightning Protection for Power Plants, Telecom, Hospitals | SDC Earth Power India" />
  <meta property="og:url" content="https://sdcearthpower.com/industries" />
</Helmet>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        .reveal { opacity:0; transform:translateY(28px); transition:opacity .65s ease, transform .65s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .reveal-left { opacity:0; transform:translateX(-32px); transition:opacity .65s ease, transform .65s ease; }
        .reveal-left.visible { opacity:1; transform:translateX(0); }
        .reveal-right { opacity:0; transform:translateX(32px); transition:opacity .65s ease, transform .65s ease; }
        .reveal-right.visible { opacity:1; transform:translateX(0); }

        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideRight { from{transform:translateX(-16px);opacity:0} to{transform:translateX(0);opacity:1} }

        .btn-primary { display:inline-flex;align-items:center;gap:8px;background:var(--orange);color:#fff;padding:13px 26px;font-family:var(--ffh);font-size:0.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s; }
        .btn-primary:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(240,112,32,.4); }
        .btn-secondary { display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--blue);padding:13px 26px;font-family:var(--ffh);font-size:0.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:2px solid var(--blue);cursor:pointer;transition:all .3s; }
        .btn-secondary:hover { background:var(--blue);color:#fff;transform:translateY(-2px); }

        .prod-tag { background:var(--blue-pal);color:var(--blue);font-size:0.68rem;font-weight:600;padding:4px 11px;border:1px solid var(--blue-mid);transition:all .25s;text-decoration:none;border-radius:2px;cursor:pointer;display:inline-block; }
        .prod-tag:hover { background:var(--blue);color:#fff;border-color:var(--blue); }

        .stat-pill { display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);padding:5px 12px;border-radius:20px; }

        .ind-grid-top { display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:56px; }
        .ind-card-small { padding:20px 16px;border:1px solid var(--bdr);background:var(--off);cursor:pointer;transition:all .3s;text-align:center;border-top:3px solid transparent; }
        .ind-card-small:hover, .ind-card-small.active { border-top-color:var(--orange);background:var(--white);box-shadow:0 6px 20px rgba(26,79,204,.1);transform:translateY(-4px); }

        .ind-row-detail { display:grid;gap:0;background:var(--off);border:1px solid var(--bdr);overflow:hidden;transition:box-shadow .35s;margin-bottom:28px; }
        .ind-row-detail:hover { box-shadow:0 10px 36px rgba(26,79,204,.12); }
        .ind-img-wrap { position:relative;overflow:hidden;min-height:260px; }
        .ind-img-wrap img { width:100%;height:100%;object-fit:cover;transition:transform .6s ease; }
        .ind-row-detail:hover .ind-img-wrap img { transform:scale(1.06); }
        .ind-content { padding:32px 28px;display:flex;flex-direction:column;justify-content:center; }

        @media(max-width:960px) {
          .ind-grid-top { grid-template-columns:repeat(2,1fr) !important; }
          .ind-row-inner { grid-template-columns:1fr !important; }
          .ind-img-wrap { min-height:200px !important; }
          .ind-content { padding:24px 20px !important; }
        }
        @media(max-width:600px) {
          h1 { font-size:2rem !important; }
          .ind-grid-top { grid-template-columns:repeat(2,1fr) !important; }
          .ind-content { padding:20px 16px !important; }
        }
        @media(max-width:768px) { .hero-poly { display:none !important; } }
        @media(max-width:400px) {
          .ind-grid-top { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>

      {/* PAGE HERO */}
      <div style={{ background: 'linear-gradient(125deg,#e8f0fe 0%,#eaf0fd 40%,#d0e4ff 100%)', padding: '52px 0 44px', borderBottom: '3px solid var(--blue)', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-poly" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '38%', background: 'linear-gradient(135deg,var(--blue),var(--blue-dk))', clipPath: 'polygon(80px 0,100% 0,100% 100%,0 100%)' }} />
        <div style={{ position: 'absolute', right: '12%', top: '20%', width: 90, height: 90, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.2)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, fontSize: '0.76rem', color: 'var(--muted)' }}>
            <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e => e.target.style.color = 'var(--orange)'} onMouseLeave={e => e.target.style.color = 'var(--muted)'}>Home</Link>
            <span style={{ color: 'var(--dim)' }}>›</span>
            <span style={{ color: 'var(--orange)' }}>Industries</span>
          </div>
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>8 Sectors Served</div>
          <h1 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
            Industries <span style={{ color: 'var(--blue)' }}>We Serve</span>
          </h1>
          <p style={{ color: 'var(--mid)', fontSize: '0.92rem', maxWidth: 540, lineHeight: 1.75 }}>
            SDC Power lightning protection and earthing solutions safeguard critical infrastructure across 8 major industry sectors — from power plants to hospitals, telecom to data centres, across 28+ states in India.
          </p>
        </div>
      </div>

      {/* QUICK GRID */}
      <section style={{ padding: '56px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink)', position: 'relative', paddingBottom: 12, marginBottom: 12, display: 'inline-block' }} className="reveal">
            All Industries
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 48, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))' }} />
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 36, marginTop: 16 }} className="reveal">Click any sector to see detailed information and recommended products.</p>

          <div className="ind-grid-top">
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.title} className={`ind-card-small reveal ${activeIndustry === i ? 'active' : ''}`}
                style={{ borderTopColor: activeIndustry === i ? ind.color : 'transparent', transitionDelay: `${(i % 4) * 0.06}s` }}
                onClick={() => setActiveIndustry(activeIndustry === i ? null : i)}>
                <div style={{ fontSize: '2.2rem', marginBottom: 10, transition: 'transform .3s', transform: activeIndustry === i ? 'scale(1.15)' : 'scale(1)' }}>{ind.icon}</div>
                <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.82rem', fontWeight: 700, color: activeIndustry === i ? ind.color : 'var(--dark)', lineHeight: 1.35, transition: 'color .25s' }}>{ind.title.split('&')[0].trim()}</div>
              </div>
            ))}
          </div>

          {/* Active detail */}
          {activeIndustry !== null && (
            <div style={{ background: 'var(--white)', border: `2px solid ${INDUSTRIES[activeIndustry].color}40`, marginBottom: 36, animation: 'fadeIn .4s ease', borderRadius: 4, overflow: 'hidden', borderLeft: `4px solid ${INDUSTRIES[activeIndustry].color}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0 }} className="ind-row-inner">
                <div className="ind-img-wrap">
                  <img src={INDUSTRIES[activeIndustry].img} alt={INDUSTRIES[activeIndustry].title}
                    onError={e => { e.target.style.display = 'none'; e.target.parentNode.style.cssText += 'display:flex;align-items:center;justify-content:center;background:var(--blue-pal);font-size:5rem'; e.target.parentNode.textContent = INDUSTRIES[activeIndustry].icon }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${INDUSTRIES[activeIndustry].color}90,transparent)`, display: 'flex', alignItems: 'flex-end', padding: '16px 18px' }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {INDUSTRIES[activeIndustry].stats.map(s => (
                        <div key={s} className="stat-pill"><span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#fff' }}>{s}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="ind-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: '2rem' }}>{INDUSTRIES[activeIndustry].icon}</span>
                    <h2 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 800, color: 'var(--ink)' }}>{INDUSTRIES[activeIndustry].title}</h2>
                  </div>
                  <p style={{ color: 'var(--mid)', fontSize: '0.87rem', lineHeight: 1.85, marginBottom: 20 }}>{INDUSTRIES[activeIndustry].desc}</p>
                  <div>
                    <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.68rem', fontWeight: 700, color: INDUSTRIES[activeIndustry].color, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Recommended Products:</div>
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                      {INDUSTRIES[activeIndustry].products.map(p => (
                        <Link key={p} to="/products" className="prod-tag">{p}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DETAILED ROWS */}
      <section style={{ padding: '0 0 72px', background: 'var(--off)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '1.9rem', fontWeight: 800, color: 'var(--ink)', position: 'relative', paddingBottom: 12, marginBottom: 48, display: 'inline-block' }} className="reveal">
            Detailed Industry Solutions
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 48, height: 3, background: 'linear-gradient(90deg,var(--orange),var(--blue))' }} />
          </div>

          {INDUSTRIES.map((ind, i) => (
            <div key={ind.title} className="ind-row-detail reveal" style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
              <div className="ind-row-inner" style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '320px 1fr' : '1fr 320px', gap: 0 }}>
                <div className="ind-img-wrap" style={{ order: i % 2 === 0 ? 0 : 1, minHeight: 260 }}>
                  <img src={ind.img} alt={ind.title}
                    onError={e => { e.target.style.display = 'none'; e.target.parentNode.style.cssText += 'display:flex;align-items:center;justify-content:center;background:var(--blue-pal);font-size:4.5rem'; e.target.parentNode.textContent = ind.icon }} />
                  {/* Overlay with number */}
                  <div style={{ position: 'absolute', top: 14, left: 14, background: ind.color, color: '#fff', fontFamily: 'var(--ffh)', fontSize: '0.64rem', fontWeight: 700, letterSpacing: '.14em', padding: '5px 13px', textTransform: 'uppercase' }}>
                    0{i + 1}
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(${i % 2 === 0 ? '90' : '270'}deg,rgba(8,20,50,.5),transparent)` }} />
                </div>

                <div className="ind-content" style={{ order: i % 2 === 0 ? 1 : 0, background: 'var(--white)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    <span style={{ fontSize: '2rem' }}>{ind.icon}</span>
                    <div>
                      <h2 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1rem, 2vw, 1.35rem)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.25 }}>{ind.title}</h2>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                    {ind.stats.map(s => (
                      <div key={s} style={{ background: `${ind.color}12`, border: `1px solid ${ind.color}35`, padding: '4px 10px', fontSize: '0.66rem', fontWeight: 700, color: ind.color, borderRadius: 2 }}>{s}</div>
                    ))}
                  </div>

                  <p style={{ color: 'var(--mid)', fontSize: '0.87rem', lineHeight: 1.85, marginBottom: 20 }}>{ind.desc}</p>

                  <div>
                    <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.68rem', fontWeight: 700, color: ind.color, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Recommended Products:</div>
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 20 }}>
                      {ind.products.map(p => (
                        <Link key={p} to="/products" className="prod-tag">{p}</Link>
                      ))}
                    </div>
                    <Link to="/contact" style={{ color: ind.color, fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'gap .2s' }}
                      onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                      onMouseLeave={e => e.currentTarget.style.gap = '6px'}>
                      Get a Quote for This Sector →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,var(--blue-dk),var(--blue))', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 14 }}>Ready to Get Protected?</div>
          <h2 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Protect Your <span style={{ color: 'var(--yellow)' }}>Critical Infrastructure</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '0.92rem', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
            Our engineers will design a site-specific protection solution for your sector. Get a free consultation and competitive quote within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary">Get Free Consultation →</Link>
            <Link to="/products" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,.4)', color: '#fff' }}>Browse Products</Link>
          </div>
        </div>
      </section>
    </>
  )
}
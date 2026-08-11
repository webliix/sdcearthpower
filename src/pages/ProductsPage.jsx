import { useState, useMemo, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../data/products.js'
import { Helmet } from 'react-helmet-async'

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [view, setView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const searchRef = useRef()
  const catParam = searchParams.get('cat') || 'all'
  useScrollReveal()



  const filtered = useMemo(() => {
    let list = catParam === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === catParam)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        (p.shortDesc || '').toLowerCase().includes(q) ||
        (p.standards || '').toLowerCase().includes(q)
      )
    }
    if (sort === 'az') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'za') list = [...list].sort((a, b) => b.name.localeCompare(a.name))
    return list
  }, [catParam, search, sort])

  const setCat = (id) => {
    const p = new URLSearchParams(searchParams)
    if (id === 'all') p.delete('cat')
    else p.set('cat', id)
    setSearchParams(p)
    setSidebarOpen(false)
  }

  const activeCat = CATEGORIES.find(c => c.id === catParam) || CATEGORIES[0]

  const CAT_SEO = {
    'all': {
      title: 'Lightning Arresters & Earthing Products | CPRI Certified | SDC Earth Power India',
      desc: 'Complete range: ESE lightning arresters (CPRI tested), copper bonded electrodes, GI earth rods, earthing strips, surge protection devices, solar ACDB/DCDB. IEC 62305 · IS 3043 · IS 2309 compliant. Pan India supply.',
      canonical: 'https://sdcearthpower.com/products'
    },
    'lightning-arresters': {
      title: 'ESE Lightning Arresters – CPRI Certified, 250 kA, 107m Radius | SDC Earth Power',
      desc: 'Buy CPRI-certified ESE lightning arresters: SDC-60 (250 kA, 60µs, SS304), Standard ESE (140mm), Copper Bonded Conventional types. IEC 62305 & IS 2309-1989 compliant. Pan India supply.',
      canonical: 'https://sdcearthpower.com/products?cat=lightning-arresters'
    },
    'earthing-electrodes': {
      title: 'Copper Bonded & GI Earthing Electrodes 50mm | IS 3043 Manufacturer | SDC Earth Power',
      desc: 'Copper bonded earth electrodes (250µm coating), pure copper electrodes, GI earthing electrodes in 50mm dia, 1m–6m lengths. IS 3043 & IEC 62305 compliant. Manufacturer in India.',
      canonical: 'https://sdcearthpower.com/products?cat=earthing-electrodes'
    },
    'earth-rods': {
      title: 'Copper Bonded Earth Rods & GI Earth Rods | IS 3043 Supplier India | SDC Earth Power',
      desc: 'Copper bonded earth rods (14.2mm, 17.2mm, 250µm coating), pure copper rods, GI earth rods in multiple diameters. IS 3043 compliant, 30+ year service life.',
      canonical: 'https://sdcearthpower.com/products?cat=earth-rods'
    },
    'earthing-equipment': {
      title: 'Earthing Strips, Busbars & Bare Copper Wire | IS 3043 Supplier | SDC Earth Power',
      desc: 'GI earthing strips 50×6mm, copper bonded strips, pure copper strips, GI/copper busbars, bare copper wire OFC 12 SWG, earth enhancing compound. IS 3043 & IEC 62305.',
      canonical: 'https://sdcearthpower.com/products?cat=earthing-equipment'
    },
    'earthing-plates': {
      title: 'Earthing Plates – GI, Copper Bonded, Pure Copper 600×600mm | SDC Earth Power',
      desc: 'GI earthing plates 600×600×6mm, copper bonded plates (250µm), pure copper plates (99.9%). IS 3043 compliant. Plate earthing systems for industrial and residential use.',
      canonical: 'https://sdcearthpower.com/products?cat=earthing-plates'
    },
    'distribution-boxes': {
      title: 'Solar ACDB DCDB Distribution Box IP65 | IEC 61439 | SDC Earth Power India',
      desc: 'IP65 solar AC and DC distribution boxes (ACDB/DCDB) with MCB, SPD, copper busbar. Single phase 32A 3kW, 600V DC. IEC 61439 compliant for solar PV systems.',
      canonical: 'https://sdcearthpower.com/products?cat=distribution-boxes'
    },
    'accessories': {
      title: 'Lightning Strike Counter IP65 & Surge Protection Devices | SDC Power',
      desc: 'IP65 lightning strike counter (1 kA–100 kA, 9.99M events, IS 2309-1989) and surge protection devices Type 1/2/3 (IEC 61643-11). DIN rail mount SPD for distribution boards.',
      canonical: 'https://sdcearthpower.com/products?cat=accessories'
    }
  }
   
  const seo = CAT_SEO[catParam] || CAT_SEO['all']
   

  return (
    <>

<Helmet>
    <title>{seo.title}</title>
    <meta name="description" content={seo.desc} />
    <link rel="canonical" href={seo.canonical} />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.desc} />
    <meta property="og:url" content={seo.canonical} />
  </Helmet>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        .reveal { opacity:0; transform:translateY(22px); transition:opacity .55s ease, transform .55s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }
        @keyframes fadeIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }

        .btn-primary { display:inline-flex;align-items:center;justify-content:center;gap:8px;background:var(--orange);color:#fff;padding:12px 22px;font-family:var(--ffh);font-size:0.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:all .3s; }
        .btn-primary:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(240,112,32,.4); }
        .btn-secondary { display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--blue);padding:11px 20px;font-family:var(--ffh);font-size:0.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:2px solid var(--blue);cursor:pointer;transition:all .3s; }
        .btn-secondary:hover { background:var(--blue);color:#fff; }

        /* Product grid card */
        .prod-card { text-decoration:none;background:var(--white);border:1px solid var(--bdr);overflow:hidden;transition:all .35s cubic-bezier(.34,1.56,.64,1);position:relative;display:block; }
        .prod-card::after { content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--blue),var(--orange));opacity:0;transition:opacity .25s; }
        .prod-card:hover { border-color:var(--blue-mid);box-shadow:0 14px 40px rgba(26,79,204,.13);transform:translateY(-6px); }
        .prod-card:hover::after { opacity:1; }
        .prod-card-img { width:100%;height:100%;object-fit:cover;position:absolute;inset:0;transition:transform .5s ease; }
        .prod-card:hover .prod-card-img { transform:scale(1.07); }

        /* List card */
        .list-card { text-decoration:none;background:var(--white);border:1px solid var(--bdr);overflow:hidden;display:flex;gap:0;transition:all .25s;border-left:3px solid transparent; }
        .list-card:hover { border-color:var(--blue-mid);border-left-color:var(--orange);box-shadow:0 6px 24px rgba(26,79,204,.1); }
        .list-card:hover .list-card-img { transform:scale(1.06); }
        .list-card-img { width:100%;height:100%;object-fit:cover;transition:transform .5s; }

        /* Sidebar category buttons */
        .cat-btn { display:flex;align-items:center;justify-content:space-between;width:100%;padding:10px 14px;margin-bottom:3px;border:1px solid var(--bdr);border-left:3px solid var(--bdr);color:var(--mid);font-family:var(--ff);font-size:0.82rem;font-weight:500;cursor:pointer;transition:all .22s;text-align:left;background:var(--off); }
        .cat-btn:hover:not(.active-cat) { background:var(--blue-pal);color:var(--blue);border-left-color:var(--blue); }
        .cat-btn.active-cat { background:var(--blue);border-color:var(--blue);border-left-color:var(--orange);color:#fff;font-weight:700; }

        /* Search input */
        .search-input { width:100%;background:var(--off);border:1.5px solid var(--bdr);border-radius:3px;padding:10px 14px 10px 36px;font-family:var(--ff);font-size:0.84rem;color:var(--dark);outline:none;transition:all .25s; }
        .search-input:focus { border-color:var(--orange);background:var(--white);box-shadow:0 0 0 3px rgba(240,112,32,.1); }

        /* Sort select */
        .sort-select { background:var(--white);border:1.5px solid var(--bdr);padding:7px 12px;font-size:0.78rem;color:var(--mid);font-family:var(--ff);border-radius:3px;cursor:pointer;outline:none;transition:border-color .2s; }
        .sort-select:focus { border-color:var(--orange); }

        /* Mobile sidebar overlay */
        .sidebar-overlay { display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:50; }
        .sidebar-drawer { display:none;position:fixed;left:0;top:0;bottom:0;width:280px;background:var(--white);z-index:51;padding:24px 20px;overflow-y:auto;box-shadow:4px 0 24px rgba(0,0,0,.12);transition:transform .3s; }

        /* Layouts */
        .products-layout { display:grid;grid-template-columns:240px 1fr;gap:32px;align-items:start; }
        .pg-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:18px; }
        .mobile-filter-bar { display:none; }

        @media(max-width:1024px) {
          .products-layout { grid-template-columns:220px 1fr !important; gap:24px !important; }
          .pg-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media(max-width:860px) {
          .products-layout { grid-template-columns:1fr !important; }
          aside.desktop-sidebar { display:none !important; }
          .sidebar-overlay { display:block; }
          .sidebar-drawer { display:block; }
          .mobile-filter-bar { display:flex !important; }
          .pg-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media(max-width:768px) { .hero-poly { display:none !important; } }
        @media(max-width:560px) {
          h1 { font-size:1.8rem !important; }
          .pg-grid { grid-template-columns:1fr !important; }
          .toolbar-inner { flex-direction:column !important; align-items:stretch !important; gap:10px !important; }
          .toolbar-right { justify-content:space-between !important; }
        }
        @media(max-width:400px) {
          .pg-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} style={{ display: 'block' }}>
          <div className="sidebar-drawer" onClick={e => e.stopPropagation()} style={{ display: 'block', transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--ffh)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>Filter Products</div>
              <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: 'var(--muted)', padding: 4 }}>✕</button>
            </div>
            <SidebarContent catParam={catParam} setCat={setCat} search={search} setSearch={setSearch} />
          </div>
        </div>
      )}

      {/* PAGE HERO */}
      <div style={{ background: 'linear-gradient(125deg,#e8f0fe 0%,#eaf0fd 40%,#d0e4ff 100%)', padding: '52px 0 44px', borderBottom: '3px solid var(--blue)', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-poly" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '38%', background: 'linear-gradient(135deg,var(--blue),var(--blue-dk))', clipPath: 'polygon(80px 0,100% 0,100% 100%,0 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 14, fontSize: '0.74rem', color: 'var(--muted)' }}>
            <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--orange)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}>Home</Link>
            <span style={{ color: 'var(--dim)' }}>›</span>
            <span style={{ color: 'var(--orange)' }}>Products</span>
            {catParam !== 'all' && (
              <>
                <span style={{ color: 'var(--dim)' }}>›</span>
                <span style={{ color: 'var(--mid)' }}>{activeCat?.label}</span>
              </>
            )}
          </div>
          <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 10 }}>CPRI Certified Range</div>
          <h1 style={{ fontFamily: 'var(--ffh)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>
            {catParam === 'all'
              ? <><span style={{ color: 'var(--blue)' }}>Complete Product</span> Range</>
              : <><span style={{ color: 'var(--blue)' }}>{activeCat?.label}</span></>}
          </h1>
          <p style={{ color: 'var(--mid)', fontSize: '0.92rem', maxWidth: 540, lineHeight: 1.75 }}>
            {catParam === 'all'
              ? 'CPRI-tested ESE lightning arresters, copper earthing systems, surge protection devices and complete grounding solutions — all from one trusted supplier.'
              : `Browse all ${activeCat?.label} products from SDC Power — CPRI certified and IS/IEC compliant.`}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>

        {/* Mobile filter bar */}
        <div className="mobile-filter-bar" style={{ display: 'none', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <button onClick={() => setSidebarOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--blue)', color: '#fff', border: 'none', padding: '10px 16px', fontFamily: 'var(--ffh)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', borderRadius: 3, flex: '0 0 auto' }}>
            ☰ Filter & Categories
          </button>
          {catParam !== 'all' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--orange)', color: '#fff', padding: '8px 14px', fontSize: '0.74rem', fontWeight: 700, borderRadius: 3 }}>
              {activeCat?.label}
              <button onClick={() => setCat('all')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}>✕</button>
            </div>
          )}
        </div>

        <div className="products-layout">

          {/* DESKTOP SIDEBAR */}
          <aside className="desktop-sidebar" style={{ position: 'sticky', top: 90 }}>
            <SidebarContent catParam={catParam} setCat={setCat} search={search} setSearch={setSearch} />
          </aside>

          {/* MAIN CONTENT */}
          <div>
            {/* Toolbar */}
            <div style={{ marginBottom: 24, padding: '12px 16px', background: 'var(--off)', border: '1px solid var(--bdr)', borderRadius: 3 }}>
              <div className="toolbar-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--mid)', fontWeight: 600 }}>
                  Showing <strong style={{ color: 'var(--blue)' }}>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
                  {catParam !== 'all' && <> in <em style={{ color: 'var(--orange)', fontStyle: 'normal', fontWeight: 700 }}>{activeCat?.label}</em></>}
                  {search && <> matching <em style={{ color: 'var(--ink)', fontStyle: 'normal' }}>"{search}"</em></>}
                </span>
                <div className="toolbar-right" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
                    <option value="default">Default Order</option>
                    <option value="az">Name A–Z</option>
                    <option value="za">Name Z–A</option>
                  </select>
                  <div style={{ display: 'flex', border: '1.5px solid var(--bdr)', borderRadius: 3, overflow: 'hidden' }}>
                    {[['grid', '⊞', 'Grid'], ['list', '≡', 'List']].map(([v, ic, label]) => (
                      <button key={v} onClick={() => setView(v)} title={label}
                        style={{ padding: '7px 13px', background: view === v ? 'var(--blue)' : 'var(--white)', color: view === v ? '#fff' : 'var(--muted)', border: 'none', cursor: 'pointer', fontSize: '1rem', transition: 'all .2s' }}>
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* No results */}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '72px 24px', background: 'var(--off)', border: '1px solid var(--bdr)', borderRadius: 4, animation: 'fadeIn .4s ease' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: 18 }}>🔍</div>
                <h3 style={{ fontFamily: 'var(--ffh)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 10 }}>No products found</h3>
                <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: '0.9rem' }}>
                  Try a different search term or browse all categories.
                </p>
                <button onClick={() => { setSearch(''); setCat('all') }} className="btn-primary">Clear Filters</button>
              </div>
            )}

            {/* GRID VIEW */}
            {view === 'grid' && filtered.length > 0 && (
              <div className="pg-grid">
                {filtered.map((p, i) => (
                  <Link key={p.id} to={`/products/${p.slug}`} className="prod-card reveal" style={{ transitionDelay: `${(i % 6) * 0.05}s` }}>
                    <div style={{ height: 184, background: 'var(--off)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderBottom: '1px solid var(--bdr)', overflow: 'hidden' }}>
                      <img src={p.img} alt={p.name} className="prod-card-img" onError={e => e.target.style.display = 'none'} />
                      <span style={{ fontSize: '2.8rem', opacity: 0.08, position: 'relative', zIndex: 1 }}>⚡</span>
                      {p.badge && (
                        <span style={{ position: 'absolute', top: 10, left: 10, zIndex: 2, background: p.bc || 'var(--orange)', color: '#fff', fontSize: '0.54rem', fontWeight: 700, letterSpacing: '.12em', padding: '3px 9px', textTransform: 'uppercase', borderRadius: 2 }}>{p.badge}</span>
                      )}
                    </div>
                    <div style={{ padding: '16px 18px 20px' }}>
                      <div style={{ color: 'var(--dim)', fontSize: '0.58rem', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 7 }}>
                        {CATEGORIES.find(c => c.id === p.category)?.label}
                      </div>
                      <h3 style={{ fontFamily: 'var(--ffh)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: 7, lineHeight: 1.28 }}>{p.name}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: '0.74rem', lineHeight: 1.6, marginBottom: 14 }}>{p.tagline}</p>
                      <span style={{ color: 'var(--orange)', fontSize: '0.78rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'gap .2s' }}>View Specs →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* LIST VIEW */}
            {view === 'list' && filtered.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filtered.map((p, i) => (
                  <Link key={p.id} to={`/products/${p.slug}`} className="list-card reveal" style={{ transitionDelay: `${i * 0.04}s` }}>
                    <div style={{ width: 150, flexShrink: 0, position: 'relative', overflow: 'hidden', borderRight: '1px solid var(--bdr)', background: 'var(--off)', minHeight: 120 }}>
                      <img src={p.img} alt={p.name} className="list-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} onError={e => e.target.style.display = 'none'} />
                      <span style={{ position: 'absolute', top: 8, left: 8, background: p.bc || 'var(--orange)', color: '#fff', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '.1em', padding: '2px 7px', textTransform: 'uppercase', borderRadius: 2 }}>{p.badge}</span>
                    </div>
                    <div style={{ padding: '16px 20px', flex: 1, minWidth: 0 }}>
                      <div style={{ color: 'var(--dim)', fontSize: '0.58rem', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 5 }}>{CATEGORIES.find(c => c.id === p.category)?.label}</div>
                      <h3 style={{ fontFamily: 'var(--ffh)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: 5, lineHeight: 1.25 }}>{p.name}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: '0.78rem', lineHeight: 1.6, marginBottom: 10 }}>{p.tagline}</p>
                      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                        {(p.standards || '').split('·').slice(0, 3).map(s => s.trim()).filter(Boolean).map(s => (
                          <span key={s} style={{ background: 'var(--blue-pal)', color: 'var(--blue)', fontSize: '0.6rem', fontWeight: 600, padding: '2px 8px', borderRadius: 3 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', flexShrink: 0 }}>
                      <span style={{ color: 'var(--orange)', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>View Specs →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

/* Shared sidebar content for both desktop and mobile drawer */
function SidebarContent({ catParam, setCat, search, setSearch }) {
  return (
    <>
      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>Search Products</div>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', fontSize: '0.9rem', color: 'var(--muted)', pointerEvents: 'none' }}>🔍</span>
          <input type="text" placeholder="Search by name, spec..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input" />
        </div>
        {search && (
          <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.72rem', marginTop: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
            ✕ Clear search
          </button>
        )}
      </div>

      {/* Categories */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid var(--orange)' }}>
          Product Categories
        </div>
        {CATEGORIES.map(c => {
          const count = c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === c.id).length
          const active = catParam === c.id
          return (
            <button key={c.id} onClick={() => setCat(c.id)} className={`cat-btn ${active ? 'active-cat' : ''}`}>
              <span style={{ lineHeight: 1.35 }}>{c.label}</span>
              <span style={{
                background: active ? 'rgba(255,255,255,.22)' : 'var(--blue-pal)',
                color: active ? '#fff' : 'var(--blue)',
                fontSize: '0.66rem', fontWeight: 700, padding: '2px 9px', borderRadius: 10, flexShrink: 0
              }}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Standards badge */}
      <div style={{ background: 'var(--blue-dk)', padding: '18px 16px', borderLeft: '4px solid var(--orange)', borderRadius: 2 }}>
        <div style={{ fontFamily: 'var(--ffh)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--orange)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>All Products Are</div>
        {[
          ['✓', 'CPRI Tested'],
          ['✓', 'IEC 62305 Compliant'],
          ['✓', 'IS 3043 / IS 2309'],
          ['✓', 'IP65 Rated (Counters)'],
          ['✓', 'IEC 61439 (ACDB/DCDB)'],
        ].map(([icon, s]) => (
          <div key={s} style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: 'var(--orange)', fontSize: '0.72rem', flexShrink: 0 }}>{icon}</span>
            <span style={{ color: 'rgba(255,255,255,.75)', fontSize: '0.77rem', lineHeight: 1.4 }}>{s}</span>
          </div>
        ))}
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.1)' }}>
          <Link to="/certifications" style={{ color: 'var(--orange)', fontSize: '0.74rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, transition: 'gap .2s' }}
            onMouseEnter={e => e.currentTarget.style.gap = '8px'}
            onMouseLeave={e => e.currentTarget.style.gap = '5px'}>
            View All Certifications →
          </Link>
        </div>
      </div>
    </>
  )
}
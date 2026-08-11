import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../data/products.js'
export default function GalleryPage() {
  const [filter, setFilter] = useState('all')
  const shown = filter==='all' ? PRODUCTS : PRODUCTS.filter(p=>p.category===filter)
  return (
    <>
      <style>{`
        @media(max-width:768px){.hero-poly{display:none!important}}
        @media(max-width:480px){h1{font-size:1.8rem!important}}
      `}</style>
      <div style={{background:'linear-gradient(125deg,#e8f0fe 0%,#eaf0fd 40%,#d0e4ff 100%)',padding:'44px 0 36px',borderBottom:'3px solid var(--blue)',position:'relative',overflow:'hidden'}}>
        <div className="hero-poly" style={{position:'absolute',right:0,top:0,bottom:0,width:'35%',background:'linear-gradient(135deg,var(--blue),var(--blue-dk))',clipPath:'polygon(60px 0,100% 0,100% 100%,0 100%)'}}/>
        <div className="container" style={{position:'relative',zIndex:1}}>
          <div className="breadcrumb" style={{marginBottom:12}}><Link to="/">Home</Link><span className="breadcrumb-sep">›</span><span style={{color:'var(--orange)'}}>Gallery</span></div>
          <h1 style={{fontFamily:'var(--ffh)',fontSize:'2.6rem',fontWeight:700,color:'var(--ink)',marginBottom:8}}>Product <span style={{color:'var(--blue)'}}>Gallery</span></h1>
          <p style={{color:'var(--mid)',fontSize:'0.92rem',maxWidth:520}}>Browse our complete product photography — all {PRODUCTS.length} products across all categories.</p>
        </div>
      </div>
      <section style={{padding:'48px 0',background:'var(--white)'}}>
        <div className="container">
          <div style={{display:'flex',gap:0,flexWrap:'wrap',marginBottom:32,border:'1px solid var(--bdr)'}}>
            {CATEGORIES.map(c=><button key={c.id} onClick={()=>setFilter(c.id)} style={{fontFamily:'var(--ffm)',fontSize:'0.62rem',letterSpacing:'.1em',textTransform:'uppercase',padding:'10px 16px',background:filter===c.id?'var(--orange)':'transparent',border:'none',borderRight:'1px solid var(--bdr)',color:filter===c.id?'#fff':'var(--muted)',cursor:'pointer',transition:'all .2s',whiteSpace:'nowrap'}} onMouseEnter={e=>{if(filter!==c.id){e.currentTarget.style.background='var(--blue)';e.currentTarget.style.color='#fff'}}} onMouseLeave={e=>{if(filter!==c.id){e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--muted)'}}}>{c.label}</button>)}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:14}}>
            {shown.map(p=>(
              <Link key={p.id} to={`/products/${p.slug}`} style={{textDecoration:'none',background:'var(--off)',border:'1px solid var(--bdr)',overflow:'hidden',transition:'all .3s',display:'block'}} onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 8px 28px rgba(26,79,204,.12)';e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.borderColor='var(--blue-mid)'}} onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.borderColor='var(--bdr)'}}>
                <div style={{height:150,position:'relative',overflow:'hidden',background:'var(--lt)'}}>
                  <img src={p.img} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .5s'}} onError={e=>e.target.style.display='none'} onMouseEnter={e=>e.target.style.transform='scale(1.06)'} onMouseLeave={e=>e.target.style.transform='scale(1)'}/>
                  <span style={{position:'absolute',top:7,left:7,background:p.bc,color:'#fff',fontSize:'0.52rem',fontWeight:700,padding:'2px 7px',textTransform:'uppercase',borderRadius:2}}>{p.badge}</span>
                </div>
                <div style={{padding:'10px 12px'}}>
                  <div style={{fontSize:'0.74rem',fontWeight:700,color:'var(--dark)',lineHeight:1.3,marginBottom:4}}>{p.name}</div>
                  <div style={{fontSize:'0.66rem',color:'var(--orange)',fontWeight:600}}>View Specs →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

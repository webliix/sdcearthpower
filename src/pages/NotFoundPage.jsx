import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFoundPage() {
  return (
    <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'80px 32px',background:'var(--off)'}}>
      <div style={{textAlign:'center',maxWidth:480}}>
        <div style={{fontSize:'5rem',marginBottom:20}}>⚡</div>
        <h1 style={{fontFamily:'var(--ffh)',fontSize:'4rem',fontWeight:700,color:'var(--blue)',marginBottom:8}}>404</h1>
        <h2 style={{fontFamily:'var(--ffh)',fontSize:'1.6rem',fontWeight:700,color:'var(--ink)',marginBottom:16}}>Page Not Found</h2>
        <p style={{color:'var(--muted)',fontSize:'0.92rem',lineHeight:1.8,marginBottom:32}}>The page you are looking for does not exist. Let us get you back to SDC Power products and services.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/" className="btn-primary">Go to Home →</Link>
          <Link to="/products" className="btn-secondary">Browse Products</Link>
        </div>
      </div>
    </div>
  )
}

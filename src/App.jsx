import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import WhyUsPage from './pages/WhyUsPage.jsx'
import IndustriesPage from './pages/IndustriesPage.jsx'
import CertificationsPage from './pages/CertificationsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import NetworkPage from './pages/NetworkPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
 
// ── Central SEO config per route ─────────────────────────────
// Import and use the useSEO hook in each page file (see individual snippets below)
// OR manage centrally here and pass via context
 
export const SEO_CONFIG = {
  '/': {
    title: 'ESE Lightning Arrester & Earthing Electrode Manufacturer India | SDC Power',
    description: 'SDC Power – CPRI-certified ESE lightning arrester (250 kA, 107m radius) and copper bonded earth electrode manufacturer in India. IEC 62305 & IS 3043 compliant. Pan India supply. Get a free quote.',
    keywords: 'ESE lightning arrester India, CPRI certified lightning arrester, copper bonded earth electrode, earthing electrode manufacturer India, lightning protection system India, IEC 62305 lightning protection, IS 3043 earthing, lightning arrester manufacturer UP',
    canonical: 'https://sdcearthpower.com/',
    ogImage: 'https://sdcearthpower.com/images/og/homepage.jpg',
  },
  '/products': {
    title: 'Lightning Protection & Earthing Products | ESE Arresters, Copper Electrodes | SDC Power',
    description: 'Complete range of CPRI-certified lightning protection and earthing products – ESE lightning arresters, copper bonded electrodes, GI earth rods, surge protection devices, solar ACDB/DCDB. IS 3043, IEC 62305 compliant.',
    keywords: 'ESE lightning arrester price India, copper bonded earth electrode 50mm, GI earthing electrode manufacturer, surge protection device India, lightning strike counter IP65, solar ACDB DCDB, earthing plate manufacturer',
    canonical: 'https://sdcearthpower.com/products',
    ogImage: 'https://sdcearthpower.com/images/og/products.jpg',
  },
  '/about': {
    title: 'About SDC Power | CPRI-Certified Lightning Arrester Manufacturer – Dadri, UP',
    description: 'Sunsdust Commercial Private Limited (SDC Power) – CPRI-certified manufacturer of lightning arresters and earthing systems since 2010. Located in Dadri, Gautam Buddha Nagar, UP. Serving 28+ states across India.',
    keywords: 'SDC Power manufacturer, lightning arrester manufacturer Dadri, earthing electrode supplier Greater Noida, Sunsdust Commercial Private Limited, lightning protection company UP, CPRI certified manufacturer India',
    canonical: 'https://sdcearthpower.com/about',
  },
  '/why-us': {
    title: 'Why Choose SDC Power | CPRI Tested, IEC 62305, 250 kA Lightning Arrester',
    description: 'Six reasons why engineers across India choose SDC Power: CPRI tested at 45 kA, IEC 62305 compliant, 107m Level 4 protection radius, 250 kA rated, pan India supply, 15+ years expertise. Compare SDC vs standard market.',
    keywords: 'CPRI tested lightning arrester 45kA, IEC 62305 certified arrester India, 250 kA ESE arrester, 107m protection radius arrester, best lightning arrester manufacturer India',
    canonical: 'https://sdcearthpower.com/why-us',
  },
  '/industries': {
    title: 'Lightning Protection for Power Plants, Telecom, Data Centres & Hospitals | SDC Power',
    description: 'SDC Power lightning protection and earthing solutions for power plants, telecom towers, data centres, hospitals, commercial buildings, and industrial plants across India. CPRI-certified, IEC 62305 compliant.',
    keywords: 'lightning protection power plant India, telecom tower earthing system, data centre grounding India, hospital lightning protection IS 3043, industrial lightning arrester, commercial building ESE arrester',
    canonical: 'https://sdcearthpower.com/industries',
  },
  '/certifications': {
    title: 'Certifications & Standards | IEC 62305, CPRI, IS 3043, IS 2309 | SDC Power',
    description: 'SDC Power products certified to IEC 62305, IS 2309-1989, IS 3043, IEC 61643-11, IP65 and IEC 61439. CPRI tested at 45 kA impulse, Level 4. Traceable test reports provided with every order.',
    keywords: 'CPRI certified lightning arrester India, IEC 62305 lightning protection standard, IS 3043 earthing standard India, IS 2309-1989 lightning protection India, lightning arrester test certificate',
    canonical: 'https://sdcearthpower.com/certifications',
  },
  '/contact': {
    title: 'Contact SDC Power | Lightning Arrester & Earthing Quote – +91-7599700620',
    description: 'Contact SDC Power for ESE lightning arrester and earthing system quotes. Call +91-7599700620 or email sdcearthing@gmail.com. Located at Badhpura, Dadri, UP – 203207. 24-hour response guaranteed.',
    keywords: 'SDC Power contact, lightning arrester quote India, earthing electrode price quote, ESE arrester supplier contact Noida, lightning protection system supplier UP',
    canonical: 'https://sdcearthpower.com/contact',
  },
  '/network': {
    title: 'Pan India Lightning Arrester Supply Network | 28+ States | SDC Power',
    description: 'SDC Power supplies ESE lightning arresters and earthing products across 28+ states in India including UP, Delhi NCR, Maharashtra, Gujarat, Karnataka, Tamil Nadu and more. Fast dispatch, pan India delivery.',
    keywords: 'lightning arrester supplier pan India, earthing electrode supply network, ESE arrester Delhi NCR, copper electrode supplier Mumbai, lightning protection supplier Karnataka',
    canonical: 'https://sdcearthpower.com/network',
  },
}
 
// ── useSEO hook — add to index.html head management ──────────
// Install: npm install react-helmet-async
// Wrap <App> in index.jsx with <HelmetProvider>
 
// HOW TO USE IN EACH PAGE:
// import { Helmet } from 'react-helmet-async'
// <Helmet>
//   <title>{title}</title>
//   <meta name="description" content={description} />
//   ... etc
// </Helmet>
 
function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
 
export default function App() {
  return (
    <>
      <ScrollTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}
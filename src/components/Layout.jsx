import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Topbar from './Topbar.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import SupplyNetwork from './SupplyNetwork.jsx'
import AppointmentModal from './AppointmentModal.jsx'

export default function Layout() {
  const [scrollY, setScrollY] = useState(0)
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })

    const handleCustomOpen = () => setIsAppointmentOpen(true)
    window.addEventListener('open-appointment', handleCustomOpen)

    // First-time visit auto popup per session
    const seen = sessionStorage.getItem('sdc_appointment_seen')
    if (!seen) {
      const timer = setTimeout(() => {
        setIsAppointmentOpen(true)
      }, 900)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('scroll', fn)
        window.removeEventListener('open-appointment', handleCustomOpen)
      }
    }

    return () => {
      window.removeEventListener('scroll', fn)
      window.removeEventListener('open-appointment', handleCustomOpen)
    }
  }, [])

  const handleCloseAppointment = () => {
    setIsAppointmentOpen(false)
    sessionStorage.setItem('sdc_appointment_seen', 'true')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Topbar />
      <Navbar scrollY={scrollY} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <SupplyNetwork />
      <Footer />

      {/* APPOINTMENT MODAL */}
      <AppointmentModal isOpen={isAppointmentOpen} onClose={handleCloseAppointment} />

      {/* FLOATING QUICK ACTIONS FOR ALL DEVICES */}
      <style>{`
        @keyframes pulseWa {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,.6), 0 6px 24px rgba(37,211,102,.4); }
          50% { box-shadow: 0 0 0 14px rgba(37,211,102,0), 0 8px 28px rgba(37,211,102,.5); }
        }
        .floating-action-btn { position: relative; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 2px solid #fff; text-decoration: none; transition: transform .3s cubic-bezier(.34,1.56,.64,1); cursor: pointer; }
        .floating-action-btn:hover { transform: scale(1.14); }
        .floating-tooltip { position: absolute; right: 60px; background: #080f24; color: #fff; font-family: var(--ffh); font-size: 0.72rem; font-weight: 700; padding: 5px 12px; border-radius: 4px; white-space: nowrap; pointer-events: none; opacity: 0; transform: translateX(8px); transition: all .25s; letter-spacing: .04em; boxShadow: 0 4px 14px rgba(0,0,0,.2); }
        .floating-action-btn:hover .floating-tooltip { opacity: 1; transform: translateX(0); }
      `}</style>
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: 'flex-end'
      }}>
        {/* Book Appointment Action */}
        <button
          onClick={() => setIsAppointmentOpen(true)}
          aria-label="Book Appointment"
          className="floating-action-btn"
          style={{
            width: 46,
            height: 46,
            background: 'linear-gradient(135deg, var(--orange), var(--orange-dk))',
            color: '#fff',
            boxShadow: '0 4px 18px rgba(240,112,32,.4)',
            fontSize: '1.2rem',
            border: '2px solid #fff'
          }}
        >
          <span className="floating-tooltip">📅 Book Appointment</span>
          📅
        </button>

        {/* Call Quick Action */}
        <a
          href="tel:+919321447203"
          aria-label="Call SDC Earth Power"
          className="floating-action-btn"
          style={{
            width: 46,
            height: 46,
            background: 'linear-gradient(135deg, var(--blue), var(--blue-dk))',
            color: '#fff',
            boxShadow: '0 4px 18px rgba(26,79,204,.4)',
            fontSize: '1.2rem'
          }}
        >
          <span className="floating-tooltip">📞 Call Sales Now</span>
          📞
        </a>

        {/* WhatsApp Quick Action */}
        <a
          href="https://wa.me/917599700620?text=Hi%20SDC%20Earth%20Power,%20I%20am%20interested%20in%20your%20lightning%20protection%20and%20earthing%20products."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="floating-action-btn"
          style={{
            width: 54,
            height: 54,
            background: '#25d366',
            color: '#fff',
            fontSize: '1.7rem',
            animation: 'pulseWa 3s infinite'
          }}
        >
          <span className="floating-tooltip">💬 Chat on WhatsApp</span>
          💬
        </a>
      </div>
    </div>
  )
}



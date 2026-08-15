import { useState } from 'react'

export default function AppointmentModal({ isOpen, onClose }) {
  // Get current local date and time strings for min constraints
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const today = `${year}-${month}-${day}`

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const currentTime = `${hours}:${minutes}`

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    date: today,
    time: currentTime,
    requirement: 'ESE Lightning Protection System',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [focused, setFocused] = useState('')

  const REQUIREMENTS = [
    'ESE Lightning Protection System',
    'Earthing Electrodes & Rods (GI / Copper Bonded)',
    'Solar ACDB / DCDB Distribution Box',
    'Surge Protection Devices (SPD)',
    'Site Technical Consultation & Inspection',
    'Bulk B2B / Wholesale Procurement',
    'Other Custom Requirement'
  ]

  // Validate form for current to future date and time
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full Name is required'
    if (!form.mobile.trim() || form.mobile.trim().length < 10) e.mobile = 'Enter a valid 10-digit mobile number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    
    if (!form.date) {
      e.date = 'Select a date'
    } else if (form.date < today) {
      e.date = 'Select today or a future date'
    }

    if (form.date === today && form.time && form.time < currentTime) {
      e.time = 'Select current or future time slot'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSendWhatsApp = (e) => {
    e.preventDefault()
    if (!validate()) return

    const whatsappNum = '919231447203'
    const structuredText =
      `🏢 *SDC EARTH POWER — APPOINTMENT REQUEST*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Customer Name:* ${form.name.trim()}\n` +
      `📞 *Mobile Number:* ${form.mobile.trim()}\n` +
      `✉️ *Email Address:* ${form.email.trim() || 'Not Provided'}\n` +
      `📦 *Requirement:* ${form.requirement}\n` +
      `📅 *Preferred Date:* ${form.date}\n` +
      `⏰ *Preferred Time:* ${form.time || 'Flexible'}\n\n` +
      `📝 *Project Details / Notes:*\n${form.message.trim() || 'None'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `_Dispatched via SDC Earth Power Web Portal (sdcearthpower.com)_`

    const encodedMsg = encodeURIComponent(structuredText)
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodedMsg}`

    window.open(whatsappUrl, '_blank')
    onClose()
  }

  if (!isOpen) return null

  const inputStyle = (field) => ({
    width: '100%',
    background: focused === field ? '#ffffff' : '#f8fafc',
    border: `1.5px solid ${errors[field] ? '#dc2626' : focused === field ? 'var(--orange)' : 'var(--bdr)'}`,
    borderRadius: 6,
    padding: '11px 14px',
    fontFamily: 'var(--ff)',
    fontSize: '0.86rem',
    color: 'var(--dark)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all .25s ease',
    boxShadow: focused === field ? '0 0 0 3.5px rgba(240,112,32,.12)' : 'none'
  })

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      background: 'rgba(8, 15, 36, 0.72)',
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn .3s ease'
    }}>
      {/* Backdrop Click */}
      <div style={{ position: 'absolute', inset: 0 }} onClick={onClose} />

      {/* Modal Container */}
      <div style={{
        position: 'relative',
        zIndex: 10001,
        width: '100%',
        maxWidth: 540,
        background: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 25px 70px rgba(0,0,0,.35)',
        border: '1px solid rgba(255,255,255,.3)',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header with Brand Logo */}
        <div style={{
          background: 'linear-gradient(135deg, var(--blue-dk), var(--blue))',
          padding: '20px 24px',
          color: '#ffffff',
          position: 'relative',
          borderBottom: '3px solid var(--orange)'
        }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              right: 16,
              top: 16,
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.15)',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all .2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.transform = 'rotate(90deg)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.15)'; e.currentTarget.style.transform = 'rotate(0)' }}
          >
            ✕
          </button>

          {/* Logo & Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: '#ffffff',
              border: '2.5px solid var(--orange)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(0,0,0,.2)'
            }}>
              <img
                src="/images/sdc-power-logo.png"
                alt="SDC Earth Power"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none'; e.target.parentNode.textContent = '⚡'; e.target.parentNode.style.cssText += 'color:var(--blue);font-size:1.5rem;font-weight:900;display:flex;align-items:center;justify-content:center' }}
              />
            </div>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(240,112,32,.25)', padding: '3px 10px', borderRadius: 20, fontSize: '0.64rem', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 4 }}>
                ⚡ SDC EARTH POWER — OFFICIAL
              </div>
              <h2 style={{ fontFamily: 'var(--ffh)', fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '.02em' }}>
                Book Consultation &amp; Appointment
              </h2>
              <p style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,.85)', margin: '2px 0 0', lineHeight: 1.4 }}>
                Fast 24-hour response &amp; expert site consultation.
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div style={{ padding: '22px 26px', overflowY: 'auto', flex: 1 }}>
          <form onSubmit={handleSendWhatsApp}>
            {/* Full Name */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma / ABC Infrastructure"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused('')}
                style={inputStyle('name')}
              />
              {errors.name && <div style={{ color: '#dc2626', fontSize: '0.68rem', marginTop: 3, fontWeight: 600 }}>⚠ {errors.name}</div>}
            </div>

            {/* Mobile & Email Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, marginBottom: 14 }}>
              {/* Mobile */}
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9231447203"
                  value={form.mobile}
                  onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
                  onFocus={() => setFocused('mobile')}
                  onBlur={() => setFocused('')}
                  style={inputStyle('mobile')}
                />
                {errors.mobile && <div style={{ color: '#dc2626', fontSize: '0.68rem', marginTop: 3, fontWeight: 600 }}>⚠ {errors.mobile}</div>}
              </div>

              {/* Email Address */}
              <div>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. name@company.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  style={inputStyle('email')}
                />
                {errors.email && <div style={{ color: '#dc2626', fontSize: '0.68rem', marginTop: 3, fontWeight: 600 }}>⚠ {errors.email}</div>}
              </div>
            </div>

            {/* Date Selection Section */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                Preferred Date *
              </label>
              
              {/* Quick Date Pills */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                {[
                  { label: '📅 Today', val: today },
                  { label: '🌅 Tomorrow', val: (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0] })() },
                  { label: '☀️ In 2 Days', val: (() => { const d = new Date(); d.setDate(d.getDate() + 2); return d.toISOString().split('T')[0] })() }
                ].map(p => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, date: p.val }))}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      border: form.date === p.val ? '1.5px solid var(--orange)' : '1px solid var(--bdr)',
                      background: form.date === p.val ? 'var(--orange-pal)' : 'var(--off)',
                      color: form.date === p.val ? 'var(--orange)' : 'var(--mid)',
                      fontFamily: 'var(--ffh)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all .2s'
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <input
                type="date"
                min={today}
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                onFocus={() => setFocused('date')}
                onBlur={() => setFocused('')}
                style={inputStyle('date')}
              />
              {errors.date && <div style={{ color: '#dc2626', fontSize: '0.68rem', marginTop: 3, fontWeight: 600 }}>⚠ {errors.date}</div>}
            </div>

            {/* Time Selection Section */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                Preferred Time Slot
              </label>

              {/* Quick Time Slot Pills */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                {[
                  { label: '🌅 10:00 AM', val: '10:00' },
                  { label: '☀️ 12:30 PM', val: '12:30' },
                  { label: '🌇 03:00 PM', val: '15:00' },
                  { label: '🌆 05:30 PM', val: '17:30' }
                ].map(t => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, time: t.val }))}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      border: form.time === t.val ? '1.5px solid var(--blue)' : '1px solid var(--bdr)',
                      background: form.time === t.val ? 'var(--blue-pal)' : 'var(--off)',
                      color: form.time === t.val ? 'var(--blue)' : 'var(--mid)',
                      fontFamily: 'var(--ffh)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all .2s'
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <input
                type="time"
                min={form.date === today ? currentTime : undefined}
                value={form.time}
                onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                onFocus={() => setFocused('time')}
                onBlur={() => setFocused('')}
                style={inputStyle('time')}
              />
              {errors.time && <div style={{ color: '#dc2626', fontSize: '0.68rem', marginTop: 3, fontWeight: 600 }}>⚠ {errors.time}</div>}
            </div>

            {/* Requirement Select */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>
                Requirement / Product Category
              </label>
              <select
                value={form.requirement}
                onChange={e => setForm(f => ({ ...f, requirement: e.target.value }))}
                onFocus={() => setFocused('requirement')}
                onBlur={() => setFocused('')}
                style={{ ...inputStyle('requirement'), cursor: 'pointer', appearance: 'auto' }}
              >
                {REQUIREMENTS.map(req => (
                  <option key={req} value={req}>{req}</option>
                ))}
              </select>
            </div>

            {/* Message / Site Details */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 5 }}>
                Project Details / Site Message (Optional)
              </label>
              <textarea
                placeholder="Describe your site location, project height, soil conditions, or specific inquiry..."
                rows={3}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                style={{ ...inputStyle('message'), resize: 'vertical' }}
              />
            </div>

            {/* High-End Enterprise Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 8,
                padding: '15px 24px',
                fontFamily: 'var(--ffh)',
                fontSize: '0.94rem',
                fontWeight: 800,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                boxShadow: '0 10px 28px rgba(16,185,129,.38)',
                transition: 'all .3s cubic-bezier(.34,1.56,.64,1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)'; e.currentTarget.style.boxShadow = '0 14px 34px rgba(16,185,129,.48)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(16,185,129,.38)' }}
            >
              <span style={{ fontSize: '1.25rem' }}>💬</span>
              <span>Confirm &amp; Send Appointment Request</span>
              <span style={{ fontSize: '1.1rem', transition: 'transform .3s' }}>→</span>
            </button>
          </form>

          {/* Corporate Footer Note */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16, fontSize: '0.72rem', color: 'var(--muted)' }}>
            <span>🔒</span> 100% Confidential &amp; Secure — Used only to confirm your appointment.
          </div>
        </div>
      </div>
    </div>
  )
}

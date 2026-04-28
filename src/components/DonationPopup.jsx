import React, { useEffect } from 'react'

const DonationPopup = ({ show, onClose, donationUrl = "https://www.zeffy.com/en-CA/donation-form/newlife-project" }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      if (window.lenis) window.lenis.stop()
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (window.lenis) window.lenis.start()
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (window.lenis) window.lenis.start()
    }
  }, [show])

  if (!show) return null
  return (
    <div
      className="donation-overlay"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
        <button className="donation-close" onClick={onClose}>&times;</button>
        <iframe
          src={donationUrl}
          title="Donate to NewLife"
          allow="payment"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  )
}

export default DonationPopup

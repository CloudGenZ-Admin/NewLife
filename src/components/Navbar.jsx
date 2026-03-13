import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <span>Have Questions or Want to Get Involved?</span>
        <a href="#contact" className="banner-cta">Contact Us Today!</a>
      </div>
      
      {/* Main Navigation */}
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="brand">
            <img src="https://newlifeprojectinc.org/cdn/shop/files/newlife-logo_025x-1_140x@2x.png?v=1613631269" alt="NewLife Projects Inc." className="logo" />
            <span className="brand-text">NewLife Projects Inc.</span>
          </a>
          <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="#home" onClick={handleLinkClick}>Home</a>
            <a href="#about" onClick={handleLinkClick}>About</a>
            <a href="#programs" onClick={handleLinkClick}>Programs</a>
            <a href="#get-involved" onClick={handleLinkClick}>Get Involved</a>
            <a href="#contact" onClick={handleLinkClick}>Contact</a>
            <a href="#shop" onClick={handleLinkClick}>Shop</a>
            <a href="#blogs" onClick={handleLinkClick}>Blogs</a>
            <a href="https://zeffy.com/en-CA/donation-form/your-donation-link" target="_blank" rel="noopener noreferrer" className="nav-donate" onClick={handleLinkClick}>DONATE</a>
          </div>
          <button 
            className="burger" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            &#9776;
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
import { useState, useEffect, useRef } from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const navRef = useRef(null)
  
  // useRef prevents unnecessary re-renders on every scroll tick
  const lastScrollY = useRef(0) 

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
      
      // Prevent navbar from hiding if the mobile menu is open
      if (!isMobileMenuOpen) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false) // Scrolling down
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true) // Scrolling up
        }
      }
      
      // Only updates state if the boolean value actually needs to change
      setIsScrolled(currentScrollY > 50)
      
      // Update the ref value silently
      lastScrollY.current = currentScrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // Optional: Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Main Navigation */}
      <nav ref={navRef} className={`nav ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}>
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
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
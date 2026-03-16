import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)
  const navRef = useRef(null)
  const dropdownRef = useRef(null)
  
  // Fancy Mobile Menu Animation Context
  const menuTl = useRef(null)
  const mobileMenuRef = useRef(null)
  
  const lastScrollY = useRef(window.scrollY) 

  useEffect(() => {
    // Setup mobile menu animation timeline
    menuTl.current = gsap.timeline({ paused: true })
      .to('.mobile-overlay', {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.inOut'
      })
      .fromTo('.mobile-nav-links a', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
        '-=0.2'
      )
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      menuTl.current.play()
      document.body.style.overflow = 'hidden'
    } else {
      menuTl.current.reverse()
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (!isMobileMenuOpen) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false)
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true)
        }
      }
      
      setIsScrolled(currentScrollY > 50)
      lastScrollY.current = currentScrollY
    }
    
    // Check initial state
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
    setIsAboutDropdownOpen(false)
  }

  const toggleAboutDropdown = (e) => {
    e.preventDefault()
    setIsAboutDropdownOpen(!isAboutDropdownOpen)
  }

  return (
    <>
      {/* Main Navigation */}
      <nav ref={navRef} className={`nav ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="nav-inner">
          <Link to="/" className="brand" onClick={handleLinkClick}>
            <img src="https://newlifeprojectinc.org/cdn/shop/files/newlife-logo_025x-1_140x@2x.png?v=1613631269" alt="NewLife Projects Inc." className="logo" />
            <span className="brand-text">NewLife Projects Inc.</span>
          </Link>
          
          {/* Desktop Links */}
          <div className="nav-links desktop-only">
            <Link to="/" onClick={handleLinkClick}>Home</Link>
            
            <div className="nav-dropdown" ref={dropdownRef}>
              <a href="#about" className="nav-dropdown-trigger" onClick={toggleAboutDropdown}>
                About <span className="dropdown-arrow">{isAboutDropdownOpen ? '▲' : '▼'}</span>
              </a>
              <div className={`dropdown-menu ${isAboutDropdownOpen ? 'open' : ''}`}>
                <Link to="/about" onClick={handleLinkClick}>Learn about us</Link>
                <Link to="/our-africa" onClick={handleLinkClick}>Our Africa</Link>
              </div>
            </div>
            
            <Link to="/programs" onClick={handleLinkClick}>Programs</Link>
            <Link to="/get-involved" onClick={handleLinkClick}>Get Involved</Link>
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
            <a href="#shop" onClick={handleLinkClick}>Shop</a>
            <a href="#blogs" onClick={handleLinkClick}>Blogs</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="nav-donate" onClick={handleLinkClick}>DONATE</a>
          </div>

          <button 
            className={`burger-modern ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
        </div>
      </nav>

      {/* Fancy Mobile Fullscreen Overlay */}
      <div className="mobile-overlay" ref={mobileMenuRef}>
        <div className="mobile-nav-links">
          <Link to="/" onClick={handleLinkClick}>Home</Link>
          <Link to="/about" onClick={handleLinkClick}>About Us</Link>
          <Link to="/our-africa" onClick={handleLinkClick}>Our Africa</Link>
          <Link to="/programs" onClick={handleLinkClick}>Programs</Link>
          <Link to="/get-involved" onClick={handleLinkClick}>Get Involved</Link>
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          <a href="#shop" onClick={handleLinkClick}>Shop</a>
          <a href="#blogs" onClick={handleLinkClick}>Blogs</a>
          <a href="https://zeffy.com/en-CA/donation-form/your-donation-link" target="_blank" rel="noopener noreferrer" className="mobile-donate" onClick={handleLinkClick}>Make a Donation</a>
        </div>
        <div className="mobile-socials">
          <a href="#">FB</a>
          <a href="#">IG</a>
          <a href="#">YT</a>
        </div>
      </div>
    </>
  )
}

export default Navbar
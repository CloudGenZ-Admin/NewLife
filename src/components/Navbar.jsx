import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)
  const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false)
  const navRef = useRef(null)
  const aboutDropdownRef = useRef(null)
  const programsDropdownRef = useRef(null)

  // Fancy Mobile Menu Animation Context
  const menuTl = useRef(null)
  const mobileMenuRef = useRef(null)

  const lastScrollY = useRef(window.scrollY)

  useEffect(() => {
    // Slide-in panel animation from right
    menuTl.current = gsap.timeline({ paused: true })
      .to('.mobile-overlay', {
        autoAlpha: 1,
        x: 0,
        duration: 0.42,
        ease: 'power3.out'
      })
      .fromTo('.mobile-nav-links > a, .mobile-dropdown-parent, .mobile-donate, .mobile-socials',
        { x: 16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.32, stagger: 0.04, ease: 'power3.out' },
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
      setIsAboutDropdownOpen(false)
      setIsProgramsDropdownOpen(false)
    }
  }, [isMobileMenuOpen])

  // GSAP for Desktop Dropdowns
  useEffect(() => {
    if (window.innerWidth <= 992) return;

    if (isAboutDropdownOpen) {
      gsap.fromTo('.dropdown-about .dropdown-menu a',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [isAboutDropdownOpen]);

  useEffect(() => {
    if (window.innerWidth <= 992) return;

    if (isProgramsDropdownOpen) {
      gsap.fromTo('.mega-grid-menu a',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }, [isProgramsDropdownOpen]);

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
    setIsProgramsDropdownOpen(false)
  }

  const toggleAboutDropdown = (e) => {
    if (window.innerWidth > 992) return;
    e.preventDefault()
    setIsAboutDropdownOpen(!isAboutDropdownOpen)
    if (isProgramsDropdownOpen) setIsProgramsDropdownOpen(false)
  }

  const toggleProgramsDropdown = (e) => {
    if (window.innerWidth > 992) return;
    e.preventDefault()
    setIsProgramsDropdownOpen(!isProgramsDropdownOpen)
    if (isAboutDropdownOpen) setIsAboutDropdownOpen(false)
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

            {/* Desktop About Dropdown */}
            <div
              className="nav-dropdown dropdown-about"
              ref={aboutDropdownRef}
              onMouseEnter={() => window.innerWidth > 992 && setIsAboutDropdownOpen(true)}
              onMouseLeave={() => window.innerWidth > 992 && setIsAboutDropdownOpen(false)}
            >
              <Link to="#" className="nav-dropdown-trigger">
                About <span className="dropdown-arrow-css"></span>
              </Link>
              <div className={`dropdown-menu dropdown-about-menu ${isAboutDropdownOpen ? 'open' : ''}`}>
                <Link to="/about" onClick={handleLinkClick}>Our Story</Link>
                <Link to="/our-africa" onClick={handleLinkClick}>Our Africa</Link>
              </div>
            </div>

            {/* Desktop Programs Dropdown */}
            <div
              className="nav-dropdown mega-dropdown"
              ref={programsDropdownRef}
              onMouseEnter={() => window.innerWidth > 992 && setIsProgramsDropdownOpen(true)}
              onMouseLeave={() => window.innerWidth > 992 && setIsProgramsDropdownOpen(false)}
            >
              <Link to="#" className="nav-dropdown-trigger">
                Programs <span className="dropdown-arrow-css"></span>
              </Link>
              <div className={`dropdown-menu mega-grid-menu ${isProgramsDropdownOpen ? 'open' : ''}`}>
                <Link to="/programs/empowerment" onClick={handleLinkClick}>Empowerment</Link>
                <Link to="/programs/language" onClick={handleLinkClick}>Language Training</Link>
                <Link to="/programs/sewing" onClick={handleLinkClick}>Sewing Skills</Link>
                <Link to="/programs/internship" onClick={handleLinkClick}>Internship</Link>
                <Link to="/programs/relief" onClick={handleLinkClick}>Relief Program</Link>
              </div>
            </div>

            <span className="nav-static-link" onClick={() => { window.location.href = '/get-involved'; }}>Get Involved</span>
            <span className="nav-static-link" onClick={() => { window.location.href = '/contact'; }}>Contact</span>
            {/* <a href="https://shop.newlifeprojectinc.org" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Shop</a>
            <a href="https://blog.newlifeprojectinc.org" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Blogs</a> */}
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

          <div className={`mobile-dropdown-parent ${isAboutDropdownOpen ? 'expanded' : ''}`}>
            <a href="#" onClick={toggleAboutDropdown}>About <span className="arrow">{isAboutDropdownOpen ? '−' : '+'}</span></a>
            <div className="mobile-dropdown-children">
              <div className="mobile-dropdown-inner">
                <Link to="/about" onClick={handleLinkClick}>Our Story</Link>
                <Link to="/our-africa" onClick={handleLinkClick}>Our Africa</Link>
              </div>
            </div>
          </div>

          <div className={`mobile-dropdown-parent ${isProgramsDropdownOpen ? 'expanded' : ''}`}>
            <a href="#" onClick={toggleProgramsDropdown}>Programs <span className="arrow">{isProgramsDropdownOpen ? '−' : '+'}</span></a>
            <div className="mobile-dropdown-children">
              <div className="mobile-dropdown-inner">
                <Link to="/programs/empowerment" onClick={handleLinkClick}>Empowerment</Link>
                <Link to="/programs/language" onClick={handleLinkClick}>Language</Link>
                <Link to="/programs/sewing" onClick={handleLinkClick}>Sewing</Link>
                <Link to="/programs/internship" onClick={handleLinkClick}>Internship</Link>
                <Link to="/programs/relief" onClick={handleLinkClick}>Relief</Link>
              </div>
            </div>
          </div>

          <Link to="/get-involved" onClick={handleLinkClick}>Get Involved</Link>
          <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          {/* <a href="https://shop.newlifeprojectinc.org" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>Shop</a> */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="mobile-donate" onClick={handleLinkClick}>Make a Donation</a>
        </div>
        <div className="mobile-socials">
          <a href="https://www.facebook.com/people/NewLife-Designs/100046505364411/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z" /></svg>
          </a>
          <a href="https://www.instagram.com/newlifeprojectinc/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.youtube.com/channel/UCpjnMhG8gsM6jkNxX-S43Eg" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
          </a>
          <a href="https://ca.pinterest.com/newlifeprojectinc/" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.93 0 4.135-2.607 7.461-6.223 7.461-1.215 0-2.358-.63-2.75-1.373l-.752 2.86c-.272 1.039-1.012 2.345-1.508 3.162 1.125.348 2.311.537 3.54.537 6.621 0 11.988-5.367 11.988-11.987C24.005 5.367 18.638 0 12.017 0z" /></svg>
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar

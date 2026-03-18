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

            <Link to="/get-involved" onClick={handleLinkClick}>Get Involved</Link>
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
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
          <a href="https://facebook.com" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z" /></svg>
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.395.215-3.415.613-1.07.416-1.928.981-2.78 1.833-.852.852-1.417 1.71-1.833 2.78-.398 1.02-.556 2.138-.613 3.415-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.215 2.395.613 3.415.416 1.07.981 1.928 1.833 2.78.852.852 1.71 1.417 2.78 1.833 1.02.398 2.138.556 3.415.613 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.395-.215 3.415-.613 1.07-.416 1.928-.981 2.78-1.833.852-.852 1.417-1.71 1.833-2.78.398-1.02.556-2.138.613-3.415.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.215-2.395-.613-3.415-.416-1.07-.981-1.928-1.833-2.78-.852-.852-1.71-1.417-2.78-1.833-1.02-.398-2.138-.556-3.415-.613-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </a>
          <a href="https://youtube.com" aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar

import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer-studio">
      <div className="container">
        <div className="footer-top-row">
          <div className="footer-brand-studio">
            <img src="/newlife-logo_025x-1_140x@2x.avif" alt="NewLife Projects Inc." className="studio-logo" />
            <p className="brand-statement">
              The NewLife Project is a Not-for-profit Organization working to transform the lives of women through education, empowerment forums & entrepreneurship programs. Our goal is to inspire, educate, and empower women and children through various support systems.
            </p>
          </div>

          <div className="footer-nav-grid">
            <div className="nav-col">
              <h5 className="nav-title">Organization</h5>
              <ul className="nav-links">
                <li><Link to="/about">Our Story</Link></li>
                <li><Link to="/our-africa">Our Africa</Link></li>
                <li><Link to="/programs/empowerment">Empowerment</Link></li>
                <li><Link to="/programs/language">Language Training</Link></li>
                <li><Link to="/programs/sewing">Sewing Skills</Link></li>
                <li><Link to="/programs/internship">Internships</Link></li>
                <li><Link to="/programs/relief">Relief Program</Link></li>
                <li><Link to="/get-involved">Get Involved</Link></li>
              </ul>
            </div>

            <div className="nav-col">
              <h5 className="nav-title">Community</h5>
              <ul className="nav-links">
                <li><Link to="/shipping-policy">Shipping</Link></li>
                <li><Link to="/terms-of-service">Terms</Link></li>
                <li><Link to="/privacy-policy">Privacy</Link></li>
                <li><Link to="/refund-policy">Refunds</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="nav-col">
              <h5 className="nav-title">Follow Us</h5>
              <div className="footer-social-icons">
                <a href="https://www.facebook.com/people/NewLife-Project-Inc/100064480878851/" className="footer-social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.simpleicons.org/facebook/ffffff" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/newlifeprojectinc/" className="footer-social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="Instagram" />
                </a>
                <a href="https://www.youtube.com/channel/UCpjnMhG8gsM6jkNxX-S43Eg" className="footer-social-icon" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.simpleicons.org/youtube/ffffff" alt="YouTube" />
                </a>
                <a href="https://ca.pinterest.com/newlifeprojectinc/" className="footer-social-icon" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.simpleicons.org/pinterest/ffffff" alt="Pinterest" />
                </a>
                <a href="https://www.linkedin.com/company/new-life-project-inc/" className="footer-social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg" alt="LinkedIn" style={{ width: '30px', height: '30px', filter: 'brightness(0) invert(1)' }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-studio">
          <div className="bottom-left">
            <p className="copyright">© 2026 NewLife Project Inc. All rights reserved.</p>
          </div>
          <div className="bottom-right">
            <p className="studio-credit">Site by <span>Cloudgenz</span></p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

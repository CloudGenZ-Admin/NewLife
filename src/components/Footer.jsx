import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer-studio">
      <div className="container">
        <div className="footer-top-row">
          <div className="footer-brand-studio">
            <img src="https://newlifeprojectinc.org/cdn/shop/files/newlife-logo_025x-1_140x@2x.png?v=1613631269" alt="NewLife Projects Inc." className="studio-logo" />
            <p className="brand-statement">
              Empowering at-risk communities through dedicated education, relief, and sustainable vocational training since 1994.
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
              <h5 className="nav-title">Connect</h5>
              <ul className="social-links-studio">
                <li><a href="https://facebook.com">Facebook</a></li>
                <li><a href="https://instagram.com">Instagram</a></li>
                <li><a href="https://youtube.com">YouTube</a></li>
                <li><a href="https://pinterest.ca">Pinterest</a></li>
              </ul>
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

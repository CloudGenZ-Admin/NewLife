import React from 'react'
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
                <li><a href="/pages/about-us-1">Our Story</a></li>
                <li><a href="/pages/women-s-world">Women's Forum</a></li>
                <li><a href="/pages/gallery">Visual Gallery</a></li>
                <li><a href="/blogs/news">Latest News</a></li>
              </ul>
            </div>
            
            <div className="nav-col">
              <h5 className="nav-title">Community</h5>
              <ul className="nav-links">
                <li><a href="/pages/shipping-policy">Shipping</a></li>
                <li><a href="/pages/terms-of-service">Terms</a></li>
                <li><a href="/pages/privacy-policy">Privacy</a></li>
                <li><a href="/pages/contact-us">Contact</a></li>
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
            <p className="studio-credit">Site by <span>456 GLOBAL</span></p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
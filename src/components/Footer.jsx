import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <img src="https://newlifeprojectinc.org/cdn/shop/files/newlife-logo_025x-1_140x@2x.png?v=1613631269" alt="NewLife Projects Inc." className="footer-logo" />
              <p>
                The NewLife Project is a Not-for-profit Organization working to transform 
                the lives of women and through education and entrepreneurship programs, 
                relief efforts, and empowerment seminars. Our goal is to inspire, educate 
                and empower women and children through various support systems.
              </p>
              <p className="address">
                Head Office Address: 2000 Thurston Drive, Unit 5, Ottawa Ontario K1G 4K7
              </p>
              <div className="contact-info">
                <div className="phone-info">
                  <span>Got Question? Call us 24/7</span>
                  <a href="tel:+16136997205">+1 (613) 699-7205</a>
                </div>
                <div className="payment-info">
                  <span>Payment Method</span>
                  <span>PayPal</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="/pages/about-us-1">About Us</a></li>
                <li><a href="/pages/women-s-world">Womens Forum</a></li>
                <li><a href="/pages/gallery">Gallery</a></li>
                <li><a href="/blogs/news">News</a></li>
                <li><a href="/pages/newlife-timeline">NewLife Timeline</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Customer Service</h4>
              <ul>
                <li><a href="/pages/shipping-policy">Shipping Policy</a></li>
                <li><a href="/pages/terms-of-service">Terms of service</a></li>
                <li><a href="/pages/privacy-policy">Privacy policy</a></li>
                <li><a href="/pages/refund-policy">Refund policy</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>My Account</h4>
              <ul>
                <li><a href="https://shop.newlifeprojectinc.org/account/login">Track my order</a></li>
                <li><a href="https://shop.newlifeprojectinc.org/account/login">Login</a></li>
                <li><a href="/pages/contact-us">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>
              Copyright © 2024 NewLife Project Inc. All Rights Reserved. 
              Designed by <a href="https://www.456global.com">456 GLOBAL</a>
            </p>
            <ul className="footer-bottom-links">
              <li><a href="/search">Search</a></li>
              <li><a href="/policies/terms-of-service">Terms of Service</a></li>
              <li><a href="/policies/refund-policy">Refund policy</a></li>
            </ul>
          </div>
          
          <div className="footer-social">
            <span>Social Media</span>
            <div className="social-links">
              <a href="https://www.facebook.com/NewLife-Designs-2283550075254245" aria-label="Facebook">📘</a>
              <a href="http://instagram.com/newlifeprojectinc/" aria-label="Instagram">📷</a>
              <a href="https://www.youtube.com/channel/UCpjnMhG8gsM6jkNxX-S43Eg" aria-label="YouTube">📺</a>
              <a href="https://www.pinterest.ca/newlifeprojectinc" aria-label="Pinterest">📌</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
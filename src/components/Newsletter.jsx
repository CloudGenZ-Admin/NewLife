import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Newsletter.css'

gsap.registerPlugin(ScrollTrigger)

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
    alert("Thank you for subscribing!")
  }

  return (
    <section className="newsletter-premium" ref={sectionRef}>
      <div className="newsletter-grain"></div>
      <div className="container">
        <div className="newsletter-layout" ref={contentRef}>
          <div className="newsletter-info">
            <span className="newsletter-overtitle">Become a Partner</span>
            <h2 className="newsletter-main-title">Stay Inspired with Our <em>Monthly Stories.</em></h2>
            <p className="newsletter-lead">
              Join our community and get the latest updates, impact stories, 
              and exclusive community content delivered to your inbox.
            </p>
          </div>
          
          <div className="newsletter-action">
            <form className="premium-form" onSubmit={handleSubmit}>
              <div className="premium-input-group">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="premium-input"
                />
                <button type="submit" className="premium-submit-btn">
                  <span>Sign Up Now</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <p className="form-privacy">
                <span className="lock-icon">🔒</span> Your privacy is our priority. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
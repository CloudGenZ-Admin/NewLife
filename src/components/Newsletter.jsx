import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Newsletter.css'

gsap.registerPlugin(ScrollTrigger)

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from('.newsletter-glass-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        y: 80,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <section className="newsletter-section" ref={sectionRef}>
      <div className="newsletter-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="container">
        <div className="newsletter-glass-card">
          <div className="newsletter-icon">✉️</div>
          <h3>Stay Connected</h3>
          <p>Join our community and get the latest updates, stories, and exclusive content delivered to your inbox.</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="subscribe-btn">
                Subscribe
              </button>
            </div>
          </form>
          <div className="newsletter-trust">
            <span>🔒 We respect your privacy</span>
            <span>📧 No spam, ever</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
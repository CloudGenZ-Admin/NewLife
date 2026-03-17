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
      gsap.from('.newsletter-header > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out'
      })

      gsap.from('.newsletter-form-centered', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.4,
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
    <section className="newsletter-centered" ref={sectionRef}>
      <div className="container">
        <div className="newsletter-vertical-stack" ref={contentRef}>
          <div className="newsletter-header">
            <span className="newsletter-mini-label">Direct Impact</span>
            <h2 className="newsletter-display-title">Become a <em>Partner.</em></h2>
          </div>
          
          <form className="newsletter-form-centered" onSubmit={handleSubmit}>
            <div className="input-field-wrapper">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="minimal-arrow-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
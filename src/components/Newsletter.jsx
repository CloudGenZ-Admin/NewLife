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
      gsap.from('.newsletter-left > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        x: -24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out'
      })
      gsap.from('.newsletter-right > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        x: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out'
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
    alert('Thank you for subscribing!')
  }

  return (
    <section className="newsletter-centered" ref={sectionRef}>
      <div className="newsletter-split">

        {/* Left — messaging */}
        <div className="newsletter-left">
          <span className="newsletter-mini-label">Stay Connected</span>
          <h2 className="newsletter-display-title">
            Get the latest <em>NewLife</em> updates in your inbox.
          </h2>
          <p className="newsletter-subtext">
            Stories of impact, upcoming events, and program updates — delivered monthly.
          </p>
          <div className="newsletter-trust">
            <span className="trust-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              No spam, ever
            </span>
            <span className="trust-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Unsubscribe anytime
            </span>
            <span className="trust-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Monthly digest
            </span>
          </div>
        </div>

        {/* Right — Zeffy signup */}
        <div className="newsletter-right">
          <div className="newsletter-iframe-wrapper">
            <iframe
              title="Signup form powered by Zeffy"
              src="https://www.zeffy.com/en-CA/embed/newsletter-form/sign-up-for-our-newsletter-3095"
              allowTransparency="true"
              className="newsletter-iframe"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Newsletter

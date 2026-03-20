import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Mission.css'

gsap.registerPlugin(ScrollTrigger)

const Mission = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image panel entrance
      gsap.from('.mission-visual-side', {
        x: -40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })

      // Content entrance
      gsap.from('.mission-eyebrow, .mission-heading, .mission-body, .mission-features, .mission-stats-row, .capsule-cta', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.mission-story-side',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      })

      // Subtle image scale
      gsap.fromTo('.cinematic-image',
        { scale: 1.05 },
        {
          scale: 1,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    'Vocational Training & Skills Development',
    'Women\'s Forums & Health Clinics',
    'Language Training & Youth Programs',
    'Cultural Pride & Community Building'
  ]

  return (
    <section className="mission-cinematic" ref={sectionRef} id="about">

      {/* Section Header */}
      <div className="mission-section-header">
        <span className="mission-section-label">Our Mission</span>
        <h2 className="mission-section-title">Empowering Lives Since 1994</h2>
        <p className="mission-section-sub">
          A faith-driven organization transforming communities through education, health, and vocational training.
        </p>
        <div className="mission-section-divider"></div>
      </div>

      <div className="mission-grid-layout">

        {/* LEFT: Image */}
        <div className="mission-visual-side">
          <div className="pinned-image-wrapper">
            <img
              src="https://newlifeprojectinc.org/cdn/shop/files/Untitled_design.jpg?v=1705364217"
              alt="Mission Journey"
              className="cinematic-image"
            />
            <div className="cinematic-overlay"></div>
            <div className="image-badge">
              <span className="image-badge-number">Since '94</span>
              <span className="image-badge-text">Transforming lives</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="mission-story-side">
          <div className="mission-story-content">

            <span className="mission-eyebrow">Our Story</span>
            <h2 className="mission-heading">NewLife Project Inc.</h2>

            <p className="mission-body">
              NewLife Project is a Non-Profit Organization which was founded by Brenda Williams in Freetown, Sierra Leone to reach out to underprivileged women. The project was born from an evangelical campaign in 1994 with a dedication to bringing new life to at-risk women and children. NewLife Project has touched the lives of over a thousand lives including women, men, and children in different communities in Cote d’Ivoire, Sierra Leone, and Ghana through our Vocational Training Programs, Women’s Forum, Rehabilitation Centre, organized Health Clinics, and Relief Programs. In 2014, we established a centre in Canada to help women and youth in our community.
            </p>

            {/* Feature checklist */}
            <ul className="mission-features">
              {features.map((feature, i) => (
                <li key={i}>
                  <span className="mission-feature-icon">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="mission-stats-row">
              <div className="mission-stat-item">
                <span className="mission-stat-num">1,000+</span>
                <span className="mission-stat-lbl">Lives Touched</span>
              </div>
              <div className="mission-stat-item">
                <span className="mission-stat-num">4</span>
                <span className="mission-stat-lbl">Countries</span>
              </div>
              <div className="mission-stat-item">
                <span className="mission-stat-num">30+</span>
                <span className="mission-stat-lbl">Years</span>
              </div>
              <div className="mission-stat-item">
                <span className="mission-stat-num">10+</span>
                <span className="mission-stat-lbl">Programs</span>
              </div>
            </div>

            <a href="/about" className="capsule-cta">
              OUR JOURNEY
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Mission

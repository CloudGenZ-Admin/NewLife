import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Mission.css'

gsap.registerPlugin(ScrollTrigger)

const Mission = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    // Set elements visible
    gsap.set([textRef.current.children, imageRef.current], { opacity: 1 })

    // Text reveal animation - no opacity change
    gsap.from(textRef.current.children, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 60,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    })

    // Image parallax and reveal - no opacity change
    gsap.from(imageRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      scale: 0.85,
      duration: 1.2,
      ease: 'power3.out'
    })

    // Continuous parallax on scroll
    gsap.to(imageRef.current, {
      y: -40,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  }, [])

  return (
    <section className="mission-section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="mission-content">
          <div className="mission-text" ref={textRef}>
            <h3>NewLife Project Inc.</h3>
            <span className="section-subtitle">Our Story</span>
            <p>
              NewLife Project is a Non-Profit Organization which was founded by Brenda Williams 
              in Freetown, Sierra Leone to reach out to underprivileged women. The project was 
              born from an evangelical campaign in 1994 with a dedication to bringing new life 
              to at-risk women and children.
            </p>
            <p>
              NewLife Project has touched the lives of over a thousand lives including women, 
              men, and children in different communities in Cote d'Ivoire, Sierra Leone, and 
              Ghana through our Vocational Training Programs, Women's Forum, Rehabilitation 
              Centre, organized Health Clinics, and Relief Programs. In 2014, we established 
              a centre in Canada to help women and youth in our community.
            </p>
            <a href="#timeline" className="cta-button">
              OUR JOURNEY
              <span className="arrow">→</span>
            </a>
          </div>
          <div className="mission-image" ref={imageRef}>
            <div className="image-wrapper">
              <img 
                src="https://newlifeprojectinc.org/cdn/shop/files/Untitled_design.jpg?v=1705364217" 
                alt="NewLife Project Mission" 
              />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission
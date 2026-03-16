import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import '../styles/Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const visualRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

      // Text Reveal
      tl.fromTo('.hero-label', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo('.hero-headline .line-inner', 
        { y: '110%', rotate: 2 }, 
        { y: '0%', rotate: 0, stagger: 0.15 }, 
        '-=0.8'
      )
      .fromTo('.hero-desc', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, 
        '-=1'
      )
      .fromTo('.hero-actions', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, 
        '-=0.9'
      )
      
      // Visual Stack Reveal
      .fromTo('.stack-item',
        { 
          opacity: 0, 
          scale: 0.8, 
          y: 40,
          clipPath: 'inset(100% 0% 0% 0%)'
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          stagger: 0.2,
          duration: 1.8,
          ease: 'power3.inOut'
        },
        '-=1.5'
      )
      
      // Floating animation for extra premium feel
      gsap.to('.stack-item', {
        y: (i) => (i % 2 === 0 ? '-10px' : '10px'),
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-editorial" ref={heroRef} id="home">
      <div className="hero-grid">
        {/* Left Column: Typography */}
        <div className="hero-content" ref={textRef}>
          <div className="hero-content-inner">
            <span className="hero-label">Since 1994</span>
            
            <h1 className="hero-headline">
              <div className="line-mask"><span className="line-inner">Empowering</span></div>
              <div className="line-mask"><span className="line-inner italic-accent">Communities,</span></div>
              <div className="line-mask"><span className="line-inner">Changing Lives.</span></div>
            </h1>
            
            <p className="hero-desc">
              Dedicated to bringing new life to at-risk women and children across Sierra Leone, 
              Côte d'Ivoire, Ghana, and Canada through education, health, and vocational training.
            </p>
            
            <div className="hero-actions">
              <a href="#programs" className="cta-editorial primary">
                Our Programs
                <span className="cta-arrow">→</span>
              </a>
              <a href="https://zeffy.com/en-CA/donation-form/your-donation-link" target="_blank" rel="noopener noreferrer" className="cta-editorial secondary">
                Make a Donation
              </a>
            </div>
            
            {/* Removed Stats Section */}
          </div>
        </div>

        {/* Right Column: Premium Image Stack */}
        <div className="hero-visual" ref={visualRef}>
          <div className="hero-stack-container">
            {/* Main Center Image */}
            <div className="stack-item item-main">
              <img src="https://newlifeprojectinc.org/cdn/shop/files/french_2.jpg?v=1705199991" alt="Community Support" />
            </div>
            {/* Top Right Floating */}
            <div className="stack-item item-top-right">
              <img src="https://newlifeprojectinc.org/cdn/shop/files/2_94ee0891-8aef-40f6-83d8-1c15e2424f5d.jpg?v=1705363525" alt="Impact Story" />
            </div>
            {/* Bottom Left Overlapping */}
            <div className="stack-item item-bottom-left">
              <img src="https://newlifeprojectinc.org/cdn/shop/files/french_3_7dde1af4-b8f9-4ac5-9508-1b3f58b324e4.jpg?v=1705364012" alt="Growth & Education" />
            </div>
            {/* Accent Small Image */}
            <div className="stack-item item-accent">
              <img src="https://newlifeprojectinc.org/cdn/shop/files/1_f092f01c-826a-4e49-b768-6f3410bdf2c0.jpg?v=1705363525" alt="Sanctuary" />
            </div>
            
            {/* Decorative Elements */}
            <div className="stack-decoration shape-circle"></div>
            <div className="stack-decoration shape-dots"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Hero.css'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const carouselRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } })

      // Text Reveal Animation
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

      // Background Carousel Animation
      const slides = gsap.utils.toArray('.carousel-slide')
      
      if (slides.length > 0) {
        // Initial setup - hide all slides except first
        gsap.set(slides, { opacity: 0 })
        gsap.set(slides[0], { opacity: 1 })

        // Create infinite carousel
        const carousel = gsap.timeline({ repeat: -1, delay: 1 })
        
        slides.forEach((slide, index) => {
          const nextIndex = (index + 1) % slides.length
          
          carousel
            .to(slide, { 
              opacity: 0, 
              duration: 1, 
              ease: 'power2.inOut' 
            }, index * 6)
            .to(slides[nextIndex], { 
              opacity: 1, 
              duration: 1, 
              ease: 'power2.inOut' 
            }, index * 6 + 1.5)
        })

        // Subtle parallax effect on scroll
        gsap.to('.carousel-slide', {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      }

    }, heroRef)

    return () => ctx.revert()
  }, [])

  const images = [
    {
      src: "https://newlifeprojectinc.org/cdn/shop/files/2_94ee0891-8aef-40f6-83d8-1c15e2424f5d.jpg?v=1705363525",
      alt: "Impact Story"
    },
    {
      src: "https://newlifeprojectinc.org/cdn/shop/files/french_3_7dde1af4-b8f9-4ac5-9508-1b3f58b324e4.jpg?v=1705364012",
      alt: "Growth & Education"
    },
    {
      src: "https://newlifeprojectinc.org/cdn/shop/files/1_f092f01c-826a-4e49-b768-6f3410bdf2c0.jpg?v=1705363525",
      alt: "Sanctuary"
    }
  ]

  return (
    <section className="hero-editorial" ref={heroRef} id="home">
      {/* Background Carousel */}
      <div className="hero-carousel" ref={carouselRef}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img 
              src={image.src} 
              alt={image.alt}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div className="carousel-overlay"></div>
      </div>

      {/* Content Container */}
      <div className="hero-content-container">
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
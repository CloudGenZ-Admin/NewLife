import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Hero.css'
import DonationPopup from './DonationPopup'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: "/First_img_Home.jpg", alt: "Impact Story" },
  { src: "/hero_2.webp", alt: "Growth & Education" },
  { src: "/hero_3.webp", alt: "Sanctuary" },
  { src: "/Bag_img.jpg", alt: "Bag" },
  { src: "/Left_and_right.jpg", alt: "Community", vertical: true },
]

const Hero = () => {
  const heroRef = useRef(null)
  const [showDonation, setShowDonation] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.fromTo('.hero-tag',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
        .fromTo('.hero-headline .line-inner',
          { y: '105%', rotate: 1.5 },
          { y: '0%', rotate: 0, stagger: 0.12, duration: 1 },
          '-=0.5'
        )
        .fromTo('.hero-desc',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.7'
        )
        .fromTo('.hero-actions',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.8'
        )
        .fromTo('.hero-scroll-hint',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.4'
        )

      // Carousel animation
      const slides = gsap.utils.toArray('.carousel-slide')
      if (slides.length > 0) {
        gsap.set(slides, { opacity: 0 })
        gsap.set(slides[0], { opacity: 1 })

        const carousel = gsap.timeline({ repeat: -1 })
        slides.forEach((slide, index) => {
          const nextIndex = (index + 1) % slides.length
          carousel.to({}, { duration: 3.5 })
          carousel.to(slides[nextIndex], {
            opacity: 1,
            duration: 1.2,
            ease: 'power1.inOut',
            onStart: () => gsap.set(slides[nextIndex], { zIndex: 1 })
          })
          carousel.set(slide, { opacity: 0, zIndex: 0 })
          carousel.set(slides[nextIndex], { zIndex: 1 })
        })
      }

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-modern" ref={heroRef} id="home">

      {/* Carousel Background */}
      <div className="hero-carousel">
        {images.map((img, i) => (
          <div className={`carousel-slide ${img.vertical ? 'carousel-slide-vertical' : ''}`} key={i}>
            {img.vertical ? (
              <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <img src={img.src} alt={img.alt} style={{ width: 'auto', height: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
            ) : (
              <img src={img.src} alt={img.alt} />
            )}
          </div>
        ))}
        <div className="hero-overlay" />
      </div>

      {/* Mobile Gradient Background */}
      <div className="hero-mobile-gradient" />

      {/* Content */}
      <div className="hero-content">
        <span className="hero-tag">Since 1994 · Faith-Driven · Community-Led</span>

        <h1 className="hero-headline">
          <div className="line-mask"><span className="line-inner">Empowering</span></div>
          <div className="line-mask"><span className="line-inner green-accent">Communities,</span></div>
          <div className="line-mask"><span className="line-inner">Changing Lives.</span></div>
        </h1>

        <p className="hero-desc">
          Dedicated to bringing new life to at-risk women and children across Sierra Leone,
          Côte d'Ivoire, Ghana, and Canada through education, health, and vocational training.
        </p>

        <div className="hero-actions">
          <a href="/programs" className="hero-btn primary">
            Our Programs
            <span className="btn-arrow">→</span>
          </a>
          <a href="#" className="hero-btn outline" onClick={(e) => { e.preventDefault(); setShowDonation(true); }}>
            Make a Donation
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-hint">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <DonationPopup show={showDonation} onClose={() => setShowDonation(false)} />
    </section>
  )
}

export default Hero

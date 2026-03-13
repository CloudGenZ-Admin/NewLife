import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Hero.css'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  
  const slides = [
    'https://newlifeprojectinc.org/cdn/shop/files/french_3_7dde1af4-b8f9-4ac5-9508-1b3f58b324e4.jpg?v=1705364012',
    'https://newlifeprojectinc.org/cdn/shop/files/1_f092f01c-826a-4e49-b768-6f3410bdf2c0.jpg?v=1705363525',
    'https://newlifeprojectinc.org/cdn/shop/files/2_94ee0891-8aef-40f6-83d8-1c15e2424f5d_x580.jpg?v=1705363525'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Hero entrance animations - set initial opacity to 1 to prevent breaking
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    // Set all elements visible first
    gsap.set(['.hero-tag', '.hero h1', '.hero-desc', '.hero-btns', '.hero-trust span', '.hero-photo', '.stat-cards .stat-c'], { opacity: 1 })
    
    tl.from('.hero-tag', {
      y: 30,
      duration: 0.8
    })
    .from('.hero h1', {
      y: 50,
      duration: 1,
      stagger: 0.1
    }, '-=0.4')
    .from('.hero-desc', {
      y: 30,
      duration: 0.8
    }, '-=0.6')
    .from('.hero-btns', {
      y: 30,
      duration: 0.8
    }, '-=0.4')
    .from('.hero-trust span', {
      x: -20,
      duration: 0.6,
      stagger: 0.1
    }, '-=0.4')
    .from('.hero-photo', {
      scale: 0.9,
      duration: 1.2
    }, '-=1')
    .from('.stat-cards .stat-c', {
      y: 30,
      duration: 0.6,
      stagger: 0.15
    }, '-=0.6')

    // Parallax effect on scroll
    gsap.to(leftRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })

    gsap.to(rightRef.current, {
      y: -80,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })
  }, [])

  return (
    <header className="hero" id="home" ref={heroRef}>
      <div className="hero-left" ref={leftRef}>
        <div className="hero-tag">Non-Profit · Ottawa, Canada</div>
        <h1>Empowering<br /><span className="accent">Women.</span><br />Transforming<br />Communities.</h1>
        <p className="hero-desc">From Sierra Leone to Ottawa — NewLife Project builds economic independence, cultural pride, and community resilience for immigrant women and youth.</p>
        <div className="hero-btns">
          <a href="#programs" className="cta-green">Explore Programs</a>
          <a href="#donate" className="cta-ghost">Make a Donation →</a>
        </div>
        <div className="hero-trust">
          <span>✓ Registered Non-Profit</span>
          <span>✓ Tax Receipts Issued</span>
          <span>✓ 10+ Years of Service</span>
        </div>
      </div>
      <div className="hero-right" ref={rightRef}>
        <div className="hero-photo">
          {slides.map((slide, index) => (
            <img 
              key={index}
              src={slide} 
              alt={`NewLife Project ${index + 1}`}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
          <div className="photo-caption">Building Up Women of Virtue</div>
        </div>
        <div className="stat-cards">
          <div className="stat-c"><span className="s-num">1,000+</span><span className="s-lbl">Lives Touched</span></div>
          <div className="stat-c gold"><span className="s-num">3</span><span className="s-lbl">African Nations</span></div>
          <div className="stat-c"><span className="s-num">30+</span><span className="s-lbl">Years of Mission</span></div>
        </div>
      </div>
    </header>
  )
}

export default Hero
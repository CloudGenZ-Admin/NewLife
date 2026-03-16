import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import FounderStory from '../components/about/FounderStory'
import OurStory from '../components/about/OurStory'
import Timeline from '../components/about/Timeline'
import Partnerships from '../components/about/Partnerships'
import AboutGallery from '../components/about/AboutGallery'
import '../styles/About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    // Advanced stagger entrance for Hero
    const ctx = gsap.context(() => {
      const heroTitle = new SplitType('.about-hero-title', { types: 'chars' })
      const heroSubtitle = new SplitType('.about-hero-subtitle', { types: 'words' })

      gsap.from(heroTitle.chars, {
        opacity: 0,
        y: 120,
        rotateX: -100,
        stagger: 0.02,
        duration: 1.4,
        ease: 'power4.out',
        delay: 0.3
      })

      gsap.from(heroSubtitle.words, {
        opacity: 0,
        y: 40,
        stagger: 0.04,
        duration: 1,
        ease: 'power2.out',
        delay: 1.2
      })

      gsap.from('.hero-scroll-indicator', {
        opacity: 0,
        y: -20,
        duration: 1,
        delay: 2,
        ease: 'power2.out'
      })
    })

    // Smooth scroll to section if hash exists
    const hash = window.location.hash
    if (hash && window.lenis) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          window.lenis.scrollTo(element, { offset: -100 })
        }
      }, 300)
    }

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="about-page">
      
      <section className="about-hero" ref={heroRef}>
        <div className="container">
          <div className="hero-content">
            <h1 className="about-hero-title">Our <br /> Story</h1>
            <p className="about-hero-subtitle">
              Redefining lives through faith, education, and unwavering <em>commitment</em> for over two decades.
            </p>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <span className="scroll-line"></span>
          <span className="scroll-text">Explore Our Story</span>
        </div>
      </section>

      <div id="founder">
        <FounderStory />
      </div>

      <div id="mission">
        <OurStory />
      </div>

      <div id="timeline">
        <Timeline />
      </div>

      <div id="partnerships">
        <Partnerships />
      </div>


      <AboutGallery />
    </div>
  )
}

export default About

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
import '../styles/ArchitectHero.css'

gsap.registerPlugin(ScrollTrigger)


const About = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Snappier defaults for faster first-paint feel
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.0 } });

      // 1. Grid Construction (Snappier)
      tl.to('.grid-line', {
        height: '100%',
        stagger: 0.02,
        duration: 0.6,
        ease: 'expo.inOut'
      })
      .to('.architect-decoration', {
        opacity: 0.1,
        scale: 1,
        duration: 1.2
      }, '-=0.6')

      // 2. Content Entry (Reduced delays)
      tl.to('.architect-detail, .architect-hero-title', {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out'
      }, 0.15)

      tl.to('.architect-meta, .footer-info-item', {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.4')

    }, heroRef);

    return () => ctx.revert();
  }, [])

  return (
    <div className="about-page">
      <section className="architect-hero arch-theme-light" ref={heroRef}>
        {/* Grid Visualization */}
        <div className="architect-grid">
          {[...Array(12)].map((_, i) => (
            <div key={`v-${i}`} className="grid-line v"></div>
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={`h-${i}`} className="grid-line h"></div>
          ))}
        </div>

        <div className="architect-decoration"></div>

        <div className="architect-wrapper">
          <div className="architect-title-group">
            <span className="architect-detail">Est. 2004 — Mission Driven</span>
            <h1 className="architect-hero-title">Redefining Lives <br/><em>Faith & Commitment.</em></h1>
          </div>

          <div className="architect-meta">
            <p>Over two decades of empowering women and youth through education, skills training, and unwavering support.</p>
          </div>
        </div>

        <div className="architect-footer-info">
          <div className="footer-info-item">
            <h4>Vision</h4>
            <p>Empowerment through education</p>
          </div>
          <div className="footer-info-item">
            <h4>Location</h4>
            <p>Global Impact Strategy</p>
          </div>
          <div className="footer-info-item">
            <h4>Legacy</h4>
            <p>Built on Hope & Action</p>
          </div>
          <div className="footer-info-item">
            <h4>Focus</h4>
            <p>Women & Youth Growth</p>
          </div>
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

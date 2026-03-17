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
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      // 1. Grid Construction (Faster)
      tl.to('.grid-line', {
        height: '100%',
        stagger: 0.03, // Reduced from 0.05
        duration: 0.8,
        ease: 'expo.inOut'
      })
      .to('.architect-decoration', {
        opacity: 0.1,
        scale: 1,
        duration: 1.5
      }, '-=0.4')

      // 2. Titles start much earlier
      tl.to('.architect-hero-title', {
        y: 0,
        stagger: 0.15,
        duration: 1.1,
        ease: 'power3.out'
      }, 0.2) // Start relative to absolute 0.2s mark

      // 3. Technical Detail & Meta (Snap in sooner)
      tl.to('.architect-detail', {
        opacity: 0.5,
        x: 0,
        rotate: -90,
        duration: 0.8
      }, '-=0.6')
      .to('.architect-meta', {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, '-=0.6')
      .to('.architect-scroll-link', {
        opacity: 1,
        duration: 0.8
      }, '-=0.4')

    }, heroRef);

    return () => ctx.revert();
  }, [])

  return (
    <div className="about-page">
      <section className="architect-hero" ref={heroRef}>
        {/* Grid Visualization */}
        <div className="architect-grid">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="grid-line"></div>
          ))}
        </div>

        <div className="architect-decoration"></div>
        <div className="architect-detail">EST. 2004 — MISSION DRIVEN</div>

        <div className="architect-wrapper">
          <div className="architect-title-group">
            <div className="architect-title-line line-1">
              <h1 className="architect-hero-title">Redefining</h1>
            </div>
            <div className="architect-title-line line-2">
              <h1 className="architect-hero-title">Lives Through</h1>
            </div>
            <div className="architect-title-line line-3">
              <h1 className="architect-hero-title"><em>Faith & Commitment</em>.</h1>
            </div>
          </div>
        </div>

        <div className="architect-meta">
          <p>Over two decades of empowering women and youth through education, skills training, and unwavering support.</p>
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

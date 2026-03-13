import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import Lenis from 'lenis'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FounderStory from '../components/about/FounderStory'
import OurStory from '../components/about/OurStory'
import Timeline from '../components/about/Timeline'
import Partnerships from '../components/about/Partnerships'
import '../styles/About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Cool text animations for hero
    const heroTitle = new SplitType('.about-hero-title', { types: 'chars' })
    const heroSubtitle = new SplitType('.about-hero-subtitle', { types: 'words' })

    // Animate title characters with stagger and rotation
    gsap.from(heroTitle.chars, {
      opacity: 0,
      y: 100,
      rotateX: -90,
      stagger: 0.03,
      duration: 1,
      ease: 'back.out(1.7)',
      delay: 0.2
    })

    // Animate subtitle words sliding in from bottom
    gsap.from(heroSubtitle.words, {
      opacity: 0,
      y: 50,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.8
    })

    // Smooth scroll to section if hash exists
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          lenis.scrollTo(element, { offset: -100 })
        }
      }, 100)
    }

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">About Us</h1>
          <p className="about-hero-subtitle">
            For over two decades, we've been transforming lives through education, mentorship, and empowerment. 
            This is our story.
          </p>
        </div>
      </div>
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
      <Footer />
    </div>
  )
}

export default About

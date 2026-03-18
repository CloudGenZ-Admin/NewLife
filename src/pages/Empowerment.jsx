import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/Empowerment.css'; // Refined Brand Editorial version

gsap.registerPlugin(ScrollTrigger);

const Empowerment = () => {
  const pageRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Infinite Marquee Animation
      gsap.to('.emp-marquee', {
        xPercent: -50,
        repeat: -1,
        duration: 15, // slower, more elegant
        ease: 'linear'
      });

      // Editorial Header SplitType
      const titleSplit = new SplitType('.emp-hero-text h2', { types: 'words, chars' });
      
      gsap.from(titleSplit.chars, {
        y: 80, opacity: 0, rotateX: -90,
        stagger: 0.03, duration: 1.2, ease: 'back.out(1.7)', delay: 0.2
      });

      gsap.from('.emp-badge, .emp-hero-text p', {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.8
      });

      // Image Scale
      gsap.from('.emp-hero-img img', {
        scale: 1.15, duration: 2.5, ease: 'power2.out'
      });

      // Impact Blocks Stagger
      gsap.from('.emp-block', {
        scrollTrigger: { trigger: '.emp-impact-grid', start: 'top 80%' },
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
      });

      // Documentary Gallery Reveal (no crop)
      gsap.from('.emp-doc-item img', {
        scrollTrigger: { trigger: '.emp-doc-gallery', start: 'top 70%' },
        scale: 0.9, opacity: 0, duration: 1.5, stagger: 0.2, ease: 'back.out(1.2)'
      });

      // Components List Lines
      const listSplit = new SplitType('.emp-comp-item p', { types: 'lines' });
      gsap.from('.emp-comp-item h4', {
        scrollTrigger: { trigger: '.emp-components', start: 'top 70%' },
        x: -50, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
      });
      gsap.from(listSplit.lines, {
        scrollTrigger: { trigger: '.emp-components', start: 'top 70%' },
        y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: 'power2.out', delay: 0.2
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="emp-page" ref={pageRef}>
      
      {/* 1. ELEGANT MARQUEE TITLE */}
      <div className="emp-marquee-wrap">
        <div className="emp-marquee" ref={marqueeRef}>
          <h1>Youths & Women Empowerment ✦ Youth & Women Empowerment ✦ Youth & Women Empowerment ✦</h1>
          <h1>Youths & Women Empowerment ✦ Youth & Women Empowerment ✦ Youth & Women Empowerment ✦</h1>
        </div>
      </div>

      {/* 2. EDITORIAL HERO GRID */}
      <header className="emp-swiss-hero">
        <div className="emp-hero-text">
          <span className="emp-badge">Pillar 04</span>
          <h2>The Mission</h2>
          <p>Our program is designed to support young people aged 15–21 in developing the confidence, skills, and opportunities needed to succeed. We believe investing in youth is essential to building resilient communities.</p>
        </div>
        <div className="emp-hero-img">
          <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Youth-meeting_600x600.png?v=1704735792" alt="Youth Empowerment" />
        </div>
      </header>

      {/* 3. IMPACT COLOR BLOCKS */}
      <section className="emp-impact-grid">
        <div className="emp-block green">
          <h3>Engagement</h3>
          <p>Increase school engagement and graduation readiness through active mentorship and support systems.</p>
        </div>
        <div className="emp-block light">
          <h3>Employability</h3>
          <p>Strengthen employability skills and career awareness to prepare our youth for a competitive global market.</p>
        </div>
        <div className="emp-block soft">
          <h3>Resilience</h3>
          <p>Build resilience and leadership capacity, empowering women and youths to lead with purpose.</p>
        </div>
      </section>

      {/* 4. DOCUMENTARY GALLERY (Zero Cropping) */}
      <section className="emp-doc-gallery">
        <div className="emp-doc-item">
          <span className="emp-doc-label">Mentorship</span>
          <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Mentorship_youth_empowerment_program_480x480.jpg?v=1731610890" alt="Mentorship" />
        </div>
        <div className="emp-doc-item">
          <span className="emp-doc-label">Workshop</span>
          <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/20190313_103854_600x600.jpg?v=1704992306" alt="Workshop" />
        </div>
      </section>

      {/* 5. COMPONENTS LIST */}
      <section className="emp-components">
        <h2 className="emp-comp-title">Program Components</h2>
        <div className="emp-comp-list">
          
          <div className="emp-comp-item">
            <h4>Workshops</h4>
            <p>Interactive sessions on communication, budgeting, goal setting, and academic tutoring.</p>
          </div>
          
          <div className="emp-comp-item">
            <h4>Mentorship</h4>
            <p>One-on-one guidance from professionals to build personal development and confidence.</p>
          </div>
          
          <div className="emp-comp-item">
            <h4>Projects</h4>
            <p>Active contributors through volunteer initiatives that bridge social and economic gaps.</p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Empowerment;

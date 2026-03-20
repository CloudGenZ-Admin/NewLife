import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/LanguageTraining.css'; 

gsap.registerPlugin(ScrollTrigger);

const LanguageTraining = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Premium SplitTypography
      const titleSplit = new SplitType('.lt-hero h1', { types: 'words, chars' });
      const sectionTitles = new SplitType('.lt-section-title', { types: 'lines, words' });

      // Hero Animations
      gsap.from('.lt-hero-bg img', {
        scale: 1.15, duration: 2.5, ease: 'power3.out'
      });
      
      gsap.from(titleSplit.chars, {
        y: 100, opacity: 0, rotateX: -90, 
        stagger: 0.02, duration: 1.2, ease: 'back.out(1.7)', delay: 0.3
      });

      gsap.from('.lt-hero-content p, .lt-pill', {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.8
      });

      // Timeline Sequence
      sectionTitles.words.forEach((word) => {
        gsap.from(word, {
          scrollTrigger: { trigger: word, start: 'top 85%' },
          y: 50, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.05
        });
      });
      gsap.from('.lt-step', {
        scrollTrigger: { trigger: '.lt-timeline-grid', start: 'top 70%' },
        y: 50, opacity: 0, duration: 1, stagger: 0.3, ease: 'power3.out'
      });

      // Impact Section Parallax
      gsap.to('.lt-impact-flyer', {
        scrollTrigger: { trigger: '.lt-impact-section', start: 'top bottom', end: 'bottom top', scrub: 1 },
        y: -50, ease: 'none'
      });
      gsap.from('.lt-impact-text > *', {
        scrollTrigger: { trigger: '.lt-impact-section', start: 'top 70%' },
        x: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power2.out'
      });

      // Gallery Bento Stagger
      gsap.from('.lt-bento-item', {
        scrollTrigger: { trigger: '.lt-gallery', start: 'top 70%' },
        scale: 0.8, opacity: 0, duration: 1, stagger: 0.1, ease: 'back.out(1.2)'
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="lt-wrapper" ref={pageRef}>
      
      {/* 1. FLOATING HERO */}
      <header className="lt-hero">
        <div className="lt-hero-bg">
          <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/french_class_pic.jpg?v=1768777914" alt="Hero Class" />
        </div>
        
        <div className="lt-hero-content">
          <h1>ESL & FSL <br />Language Training</h1>
          <p>Breaking barriers through bilingual excellence and personalized communication strategies tailored for your professional and personal life.</p>
        </div>
      </header>


      {/* 2. TIMELINE SCROLL */}
      <section className="lt-timeline-section">
        <h2 className="lt-section-title">Interactive Learning</h2>
        
        <div className="lt-timeline-grid">
          <div className="lt-step">
            <div className="lt-step-number">1</div>
            <h3>Private Tutoring</h3>
            <p>One-on-one sessions focused on your specific goals, pace, and professional needs. Build confidence directly with expert instructors.</p>
          </div>
          
          <div className="lt-step">
            <div className="lt-step-number">2</div>
            <h3>Group Classes</h3>
            <p>A collaborative and social environment for interactive practice. Engage in peer learning to improve conversational fluency naturally.</p>
          </div>
          
          <div className="lt-step">
            <div className="lt-step-number">3</div>
            <h3>Exams Prep</h3>
            <p>Focused support for government (SLE) and professional language certifications to secure your career advancement.</p>
          </div>
        </div>
      </section>


      {/* 3. IMPACT / FLYER SECTION */}
      <section className="lt-impact-section">
        <div className="lt-impact-flyer">
          {/* Framed perfectly without cropping via CSS */}
          <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/FRENCH_CLASSES_FLYER_600x600.jpg?v=1704740389" alt="Language Classes Fall Flyer" />
        </div>
        
        <div className="lt-impact-text">
          <h2>Growth Through Communication</h2>
          
          <ul className="lt-check-list">
            <li>Improve spoken and written proficiency in English and French.</li>
            <li>Increase career advancement opportunities in various sectors.</li>
            <li>Support workplace requirements for professionals and federal employees.</li>
          </ul>

          <div className="lt-notice-box">
            <p>Specialized training for <strong>Federal Government employees</strong> to support critical career progression and exam prep (Levels A, B, and C).</p>
          </div>
        </div>
      </section>


      {/* 4. TRUE MASONRY GALLERY (No Cropping Allowed) */}
      <section className="lt-gallery">
        <h2 className="lt-section-title">Immersive Environment</h2>
        
        <div className="lt-masonry">
          <div className="lt-masonry-item">
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/1_909d8fe7-bbe8-4dca-9b32-9e3758008ecf.png?v=1754162878" alt="Group Training" />
          </div>
          <div className="lt-masonry-item">
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/review_480x480.png?v=1665509596" alt="Review" style={{ backgroundColor: '#fff' }} />
          </div>
          <div className="lt-masonry-item">
             <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/french_class_pic.jpg?v=1768777914" alt="Class" />
          </div>
          <div className="lt-masonry-item">
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_7239.jpg?v=1759331909" alt="Personalized" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default LanguageTraining;

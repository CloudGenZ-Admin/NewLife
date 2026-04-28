import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/LanguageTraining.css'; 
import ProgramRegistrationPopup from '../components/ProgramRegistrationPopup';

gsap.registerPlugin(ScrollTrigger);

const LanguageTraining = () => {
  const pageRef = useRef(null);
  const [showReg, setShowReg] = useState(false);

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
          <img src="/french_class_pic_2.webp" alt="Hero Class" />
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
          <img src="/FRENCH_CLASSES_FLYER_600x600.png" alt="Language Classes Fall Flyer" />
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
            <img src="/1_909d8fe7-bbe8-4dca-9b32-9e3758008ecf.webp" alt="Group Training" />
          </div>
          <div className="lt-masonry-item">
            <img src="/review_480x480.webp" alt="Review" style={{ backgroundColor: '#fff' }} />
          </div>
          <div className="lt-masonry-item">
            <img src="/language_new_img.jpg" alt="Language Class" />
          </div>
          <div className="lt-masonry-item">
            <img src="/language_new_img3.png" alt="Language Class 3" />
          </div>
          <div className="lt-masonry-item">
            <img src="/language_new_img4.png" alt="Language Class 4" />
          </div>
          <div className="lt-masonry-item">
            <img src="/Sponser_language_1.png" alt="Language Sponsor" />
          </div>
          <div className="lt-masonry-item">
            <img src="/language_new_img2.jpg.png" alt="Language Class 2" />
          </div>
          <div className="lt-masonry-item">
             <img src="/french_class_pic_2.webp" alt="Class" />
          </div>
          <div className="lt-masonry-item">
            <img src="/IMG_7239.webp" alt="Personalized" />
          </div>
        </div>
      </section>

      {/* REGISTRATION CALL TO ACTION */}
      <section className="lt-reg-cta" style={{ textAlign: 'center', padding: '100px 20px', background: 'white', borderTop: '1px solid #eee' }}>
        <div className="container">
          <span className="preg-label" style={{ display: 'block', marginBottom: '15px' }}>Take the next step</span>
          <h2 style={{ fontFamily: 'var(--ff)', fontSize: '3.5rem', marginBottom: '30px' }}>Ready to <em>Join?</em></h2>
          <button 
            className="preg-submit-btn" 
            style={{ padding: '20px 60px', fontSize: '1.1rem' }}
            onClick={() => setShowReg(true)}
          >
            Register for this Program
          </button>
        </div>
      </section>

      <ProgramRegistrationPopup 
        show={showReg} 
        onClose={() => setShowReg(false)} 
        programName="Language Training"
        formAction="https://docs.google.com/forms/d/e/1FAIpQLSdpShd78cJ_Vx3LB_b8d2Bx7-IW6dfP21IhsMMHs6tweFRJPw/formResponse"
        entryProgram="entry.574291237"
        entryName="entry.743630460"
        entryEmail="entry.2010389936"
        entryContact="entry.1005238941"
      />
    </div>
  );
};

export default LanguageTraining;

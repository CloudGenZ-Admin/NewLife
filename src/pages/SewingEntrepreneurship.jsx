import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/SewingEntrepreneurship.css'; // The new bespoke CSS
import ProgramRegistrationPopup from '../components/ProgramRegistrationPopup';

gsap.registerPlugin(ScrollTrigger);

const SewingEntrepreneurship = () => {
  const pageRef = useRef(null);
  const [showReg, setShowReg] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Premium SplitTypography
      const titleSplit = new SplitType('.sew-hero-text h1', { types: 'words, chars' });

      // Hero Animations
      gsap.from('.sew-hero-img-wrap', {
        scale: 0.9, opacity: 0, duration: 2, ease: 'power3.out'
      });
      gsap.from('.sew-hero-img-wrap img', {
        scale: 1.2, duration: 2, ease: 'power3.out'
      });
      
      gsap.from(titleSplit.chars, {
        y: 100, opacity: 0, rotateX: -90, 
        stagger: 0.03, duration: 1.2, ease: 'back.out(1.7)', delay: 0.2
      });

      gsap.from('.sew-pill, .sew-hero-text p', {
        y: 30, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.8
      });

      // Pathway Reveal
      gsap.from('.sew-pathways-title h2, .sew-pathways-title p', {
        scrollTrigger: { trigger: '.sew-pathways', start: 'top 70%' },
        y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
      });

      gsap.utils.toArray('.sew-goal-card').forEach(card => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 80%' },
          x: 50, opacity: 0, duration: 1, ease: 'power3.out'
        });
      });

      // Polaroid Parallax Scatter Effect - Replaced with Masonry Gallery
      gsap.from('.sew-masonry-item', {
        scrollTrigger: { trigger: '.sew-gallery', start: 'top 70%' },
        scale: 0.8, opacity: 0, duration: 1, stagger: 0.1, ease: 'back.out(1.2)'
      });

      // Skills grid
      gsap.from('.sew-skills-title', {
        scrollTrigger: { trigger: '.sew-skills', start: 'top 85%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out'
      });

      gsap.from('.sew-skill-item', {
        scrollTrigger: { trigger: '.sew-skills-grid', start: 'top 90%' },
        y: 50, opacity: 0, scale: 0.95, duration: 1, stagger: 0.2, ease: 'power2.out'
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="sewing-page" ref={pageRef}>
      
      {/* 1. LOOKBOOK HERO */}
      <header className="sew-hero">
        <div className="sew-hero-grid">
          <div className="sew-hero-text">
            <h1>Sewing & <em>Entrepreneurship</em></h1>
            <p>Crafting independence and economic empowerment through vocational excellence. Transforming talents into tools for sustainable growth.</p>
          </div>
          <div className="sew-hero-img-wrap">
            <img src="/PXL_20260304_175021346.MP.webp" alt="Sewing Workshop" />
          </div>
        </div>
      </header>

      {/* 2. CREATIVE PATHWAYS (Text overlay scrolling) */}
      <section className="sew-pathways">
        <div className="sew-pathways-wrap">
          <div className="sew-pathways-title">
            <h2>Creative<br/>Pathways</h2>
            <p>Empowering women and youth through creative skill-building and vocational training.</p>
          </div>
          
          <div className="sew-pathways-content">
            <div className="sew-goal-card">
              <h3>Mother & Daughter</h3>
              <p>Intergenerational bonding through shared creativity, traditional techniques, and modern knowledge sharing. We bridge the gap between historic craftsmanship and modern execution.</p>
            </div>
            <div className="sew-goal-card">
              <h3>Business Skills</h3>
              <p>Beyond the stitch: learning how to market, price, and sell unique handmade creations efficiently. Our graduates don't just know how to sew, they know how to build a brand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MASONRY GALLERY - Same as Language Training */}
      <section className="sew-gallery">
        <h2 className="sew-section-title">Our Creative <em>Stitches</em></h2>
        
        <div className="sew-masonry">
          <div className="sew-masonry-item">
            <img src="/Copy_of_Copy_of_Copy_of_Copy_of_Copy_of_Dark_Navy_and_Gold_Modern_Sponsorship_Proposal_-_1_4a3f9bda-40c9-4c37-82d5-e28e37d16c85.webp" alt="Proposal" />
          </div>
          <div className="sew-masonry-item">
            <img src="/Sewing_classes_flyer_2026.png" alt="Classes" />
          </div>
          <div className="sew-masonry-item">
            <img src="/sewing_class_pic3.webp" alt="Sewing Class 3" />
          </div>
          <div className="sew-masonry-item">
            <img src="/sewing7.png" alt="Sewing 7" />
          </div>
          <div className="sew-masonry-item">
            <img src="/15EAE92F-5CF3-474C-A014-E80D86821D9A_480x480.webp" alt="Detail" />
          </div>
          <div className="sew-masonry-item">
            <img src="/alteration.png" alt="Alteration Work" />
          </div>
          <div className="sew-masonry-item">
            <img src="/sewing_class4.jpg" alt="Sewing Class 4" />
          </div>
          <div className="sew-masonry-item">
            <img src="/Copy_of_Copy_of_Pink_and_White_Modern_Product_Review_Influencer_Instagram_Story_Instagram_Post_45_.zip_-_1.webp" alt="Review" />
          </div>
          <div className="sew-masonry-item">
            <img src="/IMG_8019.webp" alt="Workshop" />
          </div>
          <div className="sew-masonry-item">
            <img src="/sewing_class_pic5.webp.jpg" alt="Sewing Class 5" />
          </div>
            <div className="sew-masonry-item">
            <img src="/sewing_class2.webp" alt="Sewing Class" />
          </div>
        </div>
      </section>

      {/* 4. ELEGANT BOTTOM SKILLS GRID */}
      <section className="sew-skills">
        <h2 className="sew-skills-title">Skills for Life</h2>
        <div className="sew-skills-grid">
          <div className="sew-skill-item">
            <h3>Garment Construction</h3>
            <p>From basic stitching and pattern making to complex tailoring and fashion design.</p>
          </div>
          <div className="sew-skill-item">
            <h3>Market Readiness</h3>
            <p>Equipping participants with the skills to navigate local and international market trends.</p>
          </div>
          <div className="sew-skill-item">
            <h3>Design Innovation</h3>
            <p>Encouraging unique styles and creative expression that stand out in the artisanal community.</p>
          </div>
        </div>
      </section>

      {/* REGISTRATION CALL TO ACTION */}
      <section className="sew-reg-cta" style={{ textAlign: 'center', padding: '100px 20px', background: 'white', borderTop: '1px solid #eee' }}>
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
        programName="Sewing & Skills"
        formAction="https://docs.google.com/forms/d/e/1FAIpQLSfeIx4ftvUiY0TtApb3nZDLmA0wz58Pf44JTvIyzjFSvBqpJQ/formResponse"
        entryProgram="entry.574291237"
        entryName="entry.743630460"
        entryEmail="entry.2010389936"
        entryContact="entry.1005238941"
      />
    </div>
  );
};

export default SewingEntrepreneurship;

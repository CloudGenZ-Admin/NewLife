import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/SewingEntrepreneurship.css'; // The new bespoke CSS

gsap.registerPlugin(ScrollTrigger);

const SewingEntrepreneurship = () => {
  const pageRef = useRef(null);

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

      // Polaroid Parallax Scatter Effect
      const polaroids = gsap.utils.toArray('.polaroid');
      polaroids.forEach((p, i) => {
        // Give them random initial rotations and y-offsets for a scattered look
        const randomRotate = (Math.random() - 0.5) * 15; // -7.5 to 7.5 deg
        const speed = 1 + (Math.random() * 2); // random parallax speed
        
        gsap.set(p, { rotation: randomRotate });

        gsap.from(p, {
          scrollTrigger: { trigger: '.sew-lookbook-gallery', start: 'top bottom', end: 'bottom top', scrub: speed },
          y: 200 * speed,
          ease: 'none'
        });
      });

      // Skills grid
      gsap.from('.sew-skill-item', {
        scrollTrigger: { trigger: '.sew-skills', start: 'top 80%' },
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'back.out(1.4)'
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
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/PXL_20260304_175021346.MP.jpg?v=1772708442" alt="Sewing Workshop" />
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

      {/* 3. SCATTERED POLAROID GALLERY */}
      <section className="sew-lookbook-gallery">
        <h2 className="sew-lookbook-title">Our Creative <em>Stitches</em></h2>
        
        <div className="sew-polaroid-grid">
          {/* Proposal Flyer - Tall */}
          <div className="polaroid tall">
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Copy_of_Copy_of_Copy_of_Copy_of_Copy_of_Dark_Navy_and_Gold_Modern_Sponsorship_Proposal_-_1_4a3f9bda-40c9-4c37-82d5-e28e37d16c85.png?v=1770631298" alt="Proposal" />
          </div>
          
          {/* Classes Flyer - Tall */}
          <div className="polaroid tall" style={{ marginTop: '10vh' }}>
             <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Sewing_classes_flyer_2026.png?v=1768777111" alt="Classes" />
          </div>

          {/* Workshop Detail - Square */}
          <div className="polaroid square" style={{ marginTop: '-5vh' }}>
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/15EAE92F-5CF3-474C-A014-E80D86821D9A_480x480.jpg?v=1723462270" alt="Detail" />
          </div>

          {/* Review Flyer - Tall */}
          <div className="polaroid tall" style={{ marginTop: '5vh' }}>
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Copy_of_Copy_of_Pink_and_White_Modern_Product_Review_Influencer_Instagram_Story_Instagram_Post_45_.zip_-_1.png?v=1759331418" alt="Review" />
          </div>

          {/* Workshop Wide - Wide */}
          <div className="polaroid wide" style={{ marginTop: '2vh' }}>
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_8019.jpg?v=1770140798" alt="Workshop" />
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

    </div>
  );
};

export default SewingEntrepreneurship;

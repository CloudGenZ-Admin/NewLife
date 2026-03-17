import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/IndividualProgram.css';

gsap.registerPlugin(ScrollTrigger);

const SewingEntrepreneurship = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.program-hero-clean > *', {
        y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
      });
      // Bento Gallery Animation
      gsap.from('.bento-item', {
        scale: 0.9, opacity: 0, duration: 1, stagger: 0.1, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '.program-gallery-bento', start: 'top 80%' }
      });

      gsap.utils.toArray('.program-section').forEach((section) => {
        gsap.from(section, {
          scrollTrigger: { trigger: section, start: 'top 80%' },
          y: 60, opacity: 0, duration: 1, ease: 'power3.out'
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="individual-program-page" ref={pageRef}>
      <header className="program-hero-clean">
        <div className="container">
          <span className="program-label">Pillar 03</span>
          <h1>Sewing & <br /> <em>Entrepreneurship</em></h1>
          <p>Crafting independence and economic empowerment through vocational excellence.</p>
        </div>
      </header>

      <section className="program-main-section">
        <div className="container">
          <div className="program-split">
            <div className="program-text">
              <h2 className="section-title">Creative Pathways</h2>
              <p>Empowering women and youth through creative skill-building and vocational training. Transforming talents into tools for financial independence and sustainable growth.</p>

              <div className="program-goals">
                <div className="goal-item">
                  <h3>Mother & Daughter</h3>
                  <p>Intergenerational bonding through shared creativity, traditional techniques, and modern knowledge sharing.</p>
                </div>
                <div className="goal-item">
                  <h3>Business Skills</h3>
                  <p>Beyond the stitch: learning how to market, price, and sell unique handmade creations efficiently.</p>
                </div>
              </div>
            </div>

            <div className="program-visual-standalone">
              <img className="main-program-img" src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/PXL_20260304_175021346.MP.jpg?v=1772708442" alt="Sewing Workshop" />
            </div>
          </div>
        </div>
      </section>

      <section className="program-gallery-section">
        <div className="container">
          <h2 className="section-title centered">Our Creative <em>Stitches</em></h2>
          <div className="program-gallery-bento">
            <div className="bento-item large full-image-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Sewing_classes_flyer_2026.png?v=1768777111" alt="Classes" />
            </div>
            <div className="bento-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/15EAE92F-5CF3-474C-A014-E80D86821D9A_480x480.jpg?v=1723462270" alt="Detail" />
            </div>
            <div className="bento-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_8019.jpg?v=1770140798" alt="Workshop" />
            </div>
            <div className="bento-item large full-image-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Copy_of_Copy_of_Copy_of_Copy_of_Copy_of_Dark_Navy_and_Gold_Modern_Sponsorship_Proposal_-_1_4a3f9bda-40c9-4c37-82d5-e28e37d16c85.png?v=1770631298" alt="Proposal" />
            </div>
            <div className="bento-item large full-image-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Copy_of_Copy_of_Pink_and_White_Modern_Product_Review_Influencer_Instagram_Story_Instagram_Post_45_.zip_-_1.png?v=1759331418" alt="Review" />
            </div>
          </div>
        </div>
      </section>

      <section className="program-section green-light-bg">
        <div className="container">
          <h2 className="section-title centered">Skills for Life</h2>
          <div className="components-grid">
            <div className="component-card">
              <h3>Garment Construction</h3>
              <p>From basic stitching and pattern making to complex tailoring and fashion design.</p>
            </div>
            <div className="component-card">
              <h3>Market Readiness</h3>
              <p>Equipping participants with the skills to navigate local and international market trends.</p>
            </div>
            <div className="component-card">
              <h3>Design Innovation</h3>
              <p>Encouraging unique styles and creative expression that stand out in the artisanal community.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SewingEntrepreneurship;

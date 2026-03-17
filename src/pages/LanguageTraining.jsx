import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/IndividualProgram.css';

gsap.registerPlugin(ScrollTrigger);

const LanguageTraining = () => {
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
          <span className="program-label">Pillar 02</span>
          <h1>ESL & FSL <br /> <em>Language Training</em></h1>
          <p>Breaking barriers through bilingual excellence and personalized communication strategies.</p>
        </div>
      </header>

      <section className="program-main-section">
        <div className="container">
          <div className="program-split">
            <div className="program-text">
              <h2 className="section-title">Growth Through Communication</h2>
              <p>Personalized and accessible instruction designed for all ages. We offer both private and group training tailored for newcomers, youth, and working professionals.</p>

              <ul className="impact-bullets">
                <li>Improve spoken and written proficiency in English and French.</li>
                <li>Increase career advancement opportunities in various sectors.</li>
                <li>Support workplace requirements for professionals and federal employees.</li>
              </ul>

              <div className="highlight-box">
                <p>Specialized training for <strong>Federal Government employees</strong> to support career progression and exam prep (Levels A, B, and C).</p>
              </div>
            </div>

            <div className="program-visual-standalone">
              <img className="main-program-img" src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/FRENCH_CLASSES_FLYER_600x600.jpg?v=1704740389" alt="Language Training" />
            </div>
          </div>
        </div>
      </section>

      <section className="program-gallery-section">
        <div className="container">
          <h2 className="section-title centered">Our Learning <em>Environment</em></h2>
          <div className="program-gallery-bento">
            <div className="bento-item full-image">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/french_class_pic.jpg?v=1768777914" alt="Class Session" />
            </div>
            <div className="bento-item large full-image-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/review_480x480.png?v=1665509596" alt="Student Review" />
            </div>
            <div className="bento-item large full-image-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/1_909d8fe7-bbe8-4dca-9b32-9e3758008ecf.png?v=1754162878" alt="Group Training" />
            </div>
            <div className="bento-item large full-image-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_7239.jpg?v=1759331909" alt="Personalized Learning" />
            </div>
          </div>
        </div>
      </section>

      <section className="program-section green-light-bg">
        <div className="container">
          <h2 className="section-title centered">Interactive Learning</h2>
          <div className="components-grid">
            <div className="component-card">
              <h3>Private Tutoring</h3>
              <p>One-on-one sessions focused on your specific goals, pace, and professional needs.</p>
            </div>
            <div className="component-card">
              <h3>Group Classes</h3>
              <p>Collaborative and social environment for interactive practice and peer learning.</p>
            </div>
            <div className="component-card">
              <h3>Exams Prep</h3>
              <p>Focused support for government (SLE) and professional language certifications.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LanguageTraining;

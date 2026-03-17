import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/IndividualProgram.css';

gsap.registerPlugin(ScrollTrigger);

const InternshipEngagement = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.program-hero-clean > *', {
        y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
      });

      // Bento Gallery Animation
      gsap.from('.bento-item', {
        scale: 0.9, opacity: 0, duration: 1, stagger: 0.1, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '.program-gallery-bento', start: 'top 80%' }
      });

      // Section Reveals
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
          <span className="program-label">Pillar 04</span>
          <h1>Internship & <br /> <em>Experiential Learning</em></h1>
          <p>Connecting academic excellence with real-world community impact through professional partnerships.</p>
        </div>
      </header>

      <section className="program-main-section">
        <div className="container">
          <div className="program-split">
            <div className="program-text">
              <h2 className="section-title">Bridging the Gap</h2>
              <p>Since 2012, NewLife Project Inc. has partnered with universities and colleges to provide students with meaningful experiential learning. We offer placements that challenge and grow future leaders.</p>

              <div className="partners-list">
                <h3>Academic Partners</h3>
                <div className="partner-tags">
                  <span>Laurentian University</span>
                  <span>Carleton University</span>
                  <span>Adler University</span>
                  <span>Centennial College</span>
                </div>
              </div>

              <div className="impact-box">
                <p><strong>2022-2024:</strong> Official partner for the Queen Elizabeth Scholarship Advanced Scholars West Africa.</p>
              </div>
            </div>

            <div className="program-visual-standalone">
              <img className="main-program-img" src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/7D5DE7BE-ABDA-46B0-ACA3-AE88943EBAFE_480x480.jpg?v=1723462433" alt="Internship Placements" />
            </div>
          </div>
        </div>
      </section>

      <section className="program-gallery-section">
        <div className="container">
          <h2 className="section-title centered">Learning In <em>Action</em></h2>
          <div className="program-gallery-bento">
            <div className="bento-item large">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/29B4A0BF-F8C2-4D12-8875-EB84F3ACFF32_600x600.jpg?v=1705500087" alt="Student Presentation" />
            </div>
            <div className="bento-item large">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/39412436-622C-4CCD-937A-29D3BB3C4A94_600x600.jpg?v=1700303348" alt="Team Work" />
            </div>
            <div className="bento-item large">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/linda_a4fdcddc-c7db-4e19-beb7-93eb9d839562_480x480.jpg?v=1704921810" alt="Engagement Session" />
            </div>
            <div className="bento-item large">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/ques_student_480x480.jpg?v=1731609237" alt="Scholar Project" />
            </div>
          </div>
        </div>
      </section>

      <section className="program-section green-light-bg">
        <div className="container">
          <h2 className="section-title centered">Engagement Levels</h2>
          <div className="components-grid">
            <div className="component-card">
              <h3>Academic Placement</h3>
              <p>Formal COOP and internship programs for university credit.</p>
            </div>
            <div className="component-card">
              <h3>Volunteer Skills</h3>
              <p>Short-term projects focused on specific organizational needs.</p>
            </div>
            <div className="component-card">
              <h3>Advanced Scholar</h3>
              <p>Collaborative research and development for West African initiatives.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternshipEngagement;

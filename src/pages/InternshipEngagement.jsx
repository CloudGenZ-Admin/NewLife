import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/Internship.css'; // The new bespoke CSS

gsap.registerPlugin(ScrollTrigger);

const InternshipEngagement = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const titleSplit = new SplitType('.int-hero-card h1', { types: 'lines, words' });
      
      gsap.from(titleSplit.words, {
        y: 40, opacity: 0, 
        stagger: 0.05, duration: 1, ease: 'power3.out', delay: 0.2
      });

      gsap.from('.int-pill, .int-hero-card p', {
        y: 20, opacity: 0, duration: 1, stagger: 0.1, ease: 'power2.out', delay: 0.6
      });

      gsap.from('.int-hero-img-card', {
        scale: 0.95, opacity: 0, duration: 1.5, ease: 'power3.out', delay: 0.4
      });

      // Bento Box Stagger
      gsap.from('.int-bento-box', {
        scrollTrigger: { trigger: '.int-bento-layout', start: 'top 80%' },
        y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: 'back.out(1.2)'
      });

      // Levels List
      gsap.from('.int-level-card', {
        scrollTrigger: { trigger: '.int-levels', start: 'top 80%' },
        y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: 'power2.out'
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="intern-page" ref={pageRef}>
      
      {/* 1. HERO Bento Split */}
      <header className="int-hero">
        <div className="int-hero-grid">
          
          <div className="int-hero-card">
            <h1>Internship & <br/>Experiential Learning</h1>
            <p>Connecting academic excellence with real-world community impact through professional, structured partnerships.</p>
          </div>

          <div className="int-hero-img-card">
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/7D5DE7BE-ABDA-46B0-ACA3-AE88943EBAFE_480x480.jpg?v=1723462433" alt="Internship Placements" />
          </div>

        </div>
      </header>

      {/* 2. CORPORATE BENTO GRID */}
      <section className="int-partner-section">
        <h2 className="int-section-title">Bridging The Gap</h2>
        
        <div className="int-bento-layout">
          
          {/* Big Text Box */}
          <div className="int-bento-box bento-text span-2 span-row-2">
            <h3>Academic Partners</h3>
            <p>Since 2012, NewLife Project Inc. has partnered with top-tier universities and colleges to provide students with meaningful experiential learning placements that challenge and grow future leaders.</p>
            
            <div className="int-tags-container">
              <span className="int-tag">Laurentian University</span>
              <span className="int-tag">Carleton University</span>
              <span className="int-tag">Adler University</span>
              <span className="int-tag">Centennial College</span>
            </div>
          </div>

          {/* Photo 1 */}
          <div className="int-bento-box bento-img">
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/29B4A0BF-F8C2-4D12-8875-EB84F3ACFF32_600x600.jpg?v=1705500087" alt="Student Presentation" />
            <span className="bento-tag">Student Presentation</span>
          </div>

          {/* Photo 2 (Tall) */}
          <div className="int-bento-box bento-img span-row-2">
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/39412436-622C-4CCD-937A-29D3BB3C4A94_600x600.jpg?v=1700303348" alt="Team Work" />
            <span className="bento-tag">Team Collaboration</span>
          </div>

          {/* Highlight Box */}
          <div className="int-bento-box bento-text bento-highlight">
            <h3>Queen Elizabeth Scholar</h3>
            <p>Official partner for the Queen Elizabeth Scholarship Advanced Scholars West Africa (2022-2024).</p>
          </div>

          {/* Photo 3 */}
          <div className="int-bento-box bento-img">
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/linda_a4fdcddc-c7db-4e19-beb7-93eb9d839562_480x480.jpg?v=1704921810" alt="Engagement Session" />
            <span className="bento-tag">Field Work</span>
          </div>

          {/* Photo 4 (Wide bottom) */}
          <div className="int-bento-box bento-img span-2">
            <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/ques_student_480x480.jpg?v=1731609237" alt="Scholar Project" />
            <span className="bento-tag">QES Scholar Project</span>
          </div>

        </div>
      </section>

      {/* 3. PROFESSIONAL LEVELS GRID */}
      <section className="int-levels">
         <h2 className="int-section-title">Engagement Structure</h2>
         
         <div className="int-levels-grid">
           <div className="int-level-card">
              <h3>01. Academic Placement</h3>
              <p>Formal COOP and intensive internship programs designed for university credit and strict academic requirements.</p>
           </div>
           
           <div className="int-level-card">
              <h3>02. Volunteer Skills</h3>
              <p>Short-term, high-impact projects focused on fulfilling specific, immediate organizational needs and event support.</p>
           </div>

           <div className="int-level-card">
              <h3>03. Advanced Scholar</h3>
              <p>Highly collaborative research and development programs focused specifically on West African community initiatives.</p>
           </div>
         </div>
      </section>

    </div>
  );
};

export default InternshipEngagement;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/Relief.css'; // The new Typography Manifesto CSS

gsap.registerPlugin(ScrollTrigger);

const ReliefProgram = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Massive Hero Typography Animation
      const heroTitleSplit = new SplitType('.tp-hero h1', { types: 'words, chars' });
      const heroIntroSplit = new SplitType('.tp-hero p.lead', { types: 'lines, words' });

      gsap.from(heroTitleSplit.chars, {
        opacity: 0, y: 100, rotateX: -90,
        stagger: 0.02, duration: 1.2, ease: 'back.out(1.5)', delay: 0.2
      });

      gsap.from(heroIntroSplit.lines, {
        opacity: 0, y: 30, stagger: 0.1, duration: 1.2, ease: 'power3.out', delay: 0.8
      });

      gsap.from('.tp-hero-intro', {
        opacity: 0, y: 30, duration: 1.2, ease: 'power3.out', delay: 1.2
      });

      // Section Sticky Fade
      gsap.utils.toArray('.tp-section').forEach(section => {
        gsap.from(section.querySelector('.tp-section-sticky'), {
          scrollTrigger: { trigger: section, start: 'top 70%' },
          y: 50, opacity: 0, duration: 1.2, ease: 'power3.out'
        });

        // Stagger list items
        const listItems = section.querySelectorAll('.tp-list li');
        if(listItems.length > 0) {
          gsap.from(listItems, {
            scrollTrigger: { trigger: section, start: 'top 60%' },
            y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power2.out'
          });
        }
      });

      // Footer Reveal
      gsap.from('.tp-footer h2, .tp-footer p', {
        scrollTrigger: { trigger: '.tp-footer', start: 'top 80%' },
        y: 60, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out'
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relief-page" ref={pageRef}>
      
      {/* 1. TYPOGRAPHY HERO */}
      <header className="tp-hero">
        <h1>Diaspora <br/><em>Impact Program</em></h1>
        
        <p className="lead">
          For many people living abroad, giving back to their country of origin is deeply personal. It is about honouring family roots, supporting future generations, and helping communities grow stronger.
        </p>

        <p className="tp-hero-intro">
          Through the Diaspora Impact Program, you have the opportunity to support specific initiatives creating real change for women, youth, and families. For the past four years, NewLife Project Inc. has been meeting the needs of at-risk communities in <span className="tp-highlight">Sierra Leone, Côte d’Ivoire, and Ghana</span>. 
          <br/><br/>
          We have organized clothing, backpack, and household good drives within the Ottawa community and directed generous donations directly to students who need them.
        </p>
      </header>


      {/* 2. THE SCROLLING MANIFESTO */}
      <section className="tp-sections-wrap">
        
        {/* Section 1: Learning Centre */}
        <div className="tp-section">
          <div className="tp-section-sticky">
            <h2>Building <em>Project</em></h2>
            <p>Our education center serves as an opportunity to give back to the community that inspired the vision for Newlife. Designed for all-weather conditions.</p>
          </div>
          <div className="tp-section-content">
            <ul className="tp-list">
              <li>Safe classrooms where girls can learn without fear.</li>
              <li>Access to books, technology, and educational resources.</li>
              <li>A computer lab that prepares youth for modern careers.</li>
              <li>Opportunities for girls to stay in school and build brighter futures.</li>
            </ul>
          </div>
        </div>

        {/* Section 2: Education Relief */}
        <div className="tp-section">
          <div className="tp-section-sticky">
            <h2>Education <em>Relief</em></h2>
            <p>Direct school support empowering the next generation.</p>
          </div>
          <div className="tp-section-content">
            <ul className="tp-list">
              <li>Backpacks filled with school supplies for students in need.</li>
              <li>Financial sponsorships ensuring continuous enrollment.</li>
              <li>Learning materials that guarantee academic success.</li>
              <li>Encouragement for families to prioritize continued education.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Women's Rehab */}
        <div className="tp-section">
          <div className="tp-section-sticky">
            <h2>Rehabilitation <em>& Support</em></h2>
            <p>Empowerment initiatives to restore dignity and independence.</p>
          </div>
          <div className="tp-section-content">
            <ul className="tp-list">
              <li>Vocational training for women rebuilding their lives.</li>
              <li>Crucial skills that support income generation.</li>
              <li>Rehabilitative programs that rebuild confidence.</li>
              <li>Pathways toward small business and employment.</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Cultural Engagement */}
        <div className="tp-section">
          <div className="tp-section-sticky">
            <h2>Cultural <em>Engagement</em></h2>
            <p>Grassroots community fundraising to sustain our global impact.</p>
          </div>
          <div className="tp-section-content">
            <ul className="tp-list">
              <li>Cultural events that bring diaspora communities together.</li>
              <li>Community campaigns that raise vital resources.</li>
              <li>Platforms that celebrate heritage through impact.</li>
              <li>Ongoing initiatives connecting supporters to change.</li>
            </ul>
          </div>
        </div>

      </section>


      {/* 3. THE CLOSING STATEMENT */}
      <footer className="tp-footer">
        <h2>Be Part of the Change</h2>
        <p>When you support the NewLife Project, you are not only making a contribution — you are investing in education, empowerment, and opportunity. Join us in creating pathways to hope, dignity, and lasting transformation.</p>
      </footer>

    </div>
  );
};

export default ReliefProgram;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from 'lenis';
import '../styles/Programs.css';

gsap.registerPlugin(ScrollTrigger);

const Programs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenis = lenis;

    const ctx = gsap.context(() => {
      // Hero Animation
      const heroTitle = new SplitType('.programs-hero h1', { types: 'lines,chars' });
      if (heroTitle.chars) {
        gsap.from(heroTitle.chars, {
          y: 100, opacity: 0, stagger: 0.02,
          duration: 1.5, ease: 'power4.out', delay: 0.5
        });
      }

      // Section Reveals
      gsap.utils.toArray('.program-module').forEach((section) => {
        const title = section.querySelector('.module-title');
        const content = section.querySelector('.module-content');
        const visuals = section.querySelectorAll('.module-visual, .program-gallery');

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        });

        if (title) tl.from(title, { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
        if (content) tl.from(content, { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6');
        visuals.forEach(v => tl.from(v, { y: 40, opacity: 0, duration: 1.2, ease: 'power2.out' }, '-=0.8'));
      });

      // Gallery image stagger reveals
      gsap.utils.toArray('.program-gallery').forEach(gallery => {
        const imgs = gallery.querySelectorAll('.gallery-item');
        gsap.from(imgs, {
          y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: gallery, start: 'top 85%' }
        });
      });

    }, containerRef);

    return () => { 
      lenis.destroy(); 
      window.lenis = null;
      ctx.revert(); 
    };
  }, []);

  return (
    <div className="programs-page" ref={containerRef}>
      <header className="programs-hero">
        <div className="container">
          <span className="label">Our Initiatives</span>
          <h1>NewLife Project <br /> <em>Programs</em></h1>
          <p className="intro-text">
            We are dedicated to building stronger, more resilient communities through targeted empowerment,
            educational equity, and creative vocational training. Discover the impact of our five core pillars.
          </p>
        </div>
      </header>

      {/* 01: YOUTHS & WOMEN EMPOWERMENT */}
      <section className="program-module module-empowerment" id="empowerment">
        <div className="container">
          <div className="module-header">
            <div className="module-info">
              <span className="module-num">01</span>
              <h2 className="module-title">Youths & Women <br /> Empowerment</h2>
              <div className="module-content">
                <p className="program-description">
                  Designed to support young people aged 15–21 in developing the confidence, skills, and opportunities needed to succeed.
                  We believe investing in youth is essential to building resilient communities.
                </p>
                <div className="objectives-grid">
                  <div className="obj-item"><span className="dot"></span><p>Increase school engagement and graduation readiness</p></div>
                  <div className="obj-item"><span className="dot"></span><p>Strengthen employability skills and career awareness</p></div>
                  <div className="obj-item"><span className="dot"></span><p>Build resilience and leadership capacity</p></div>
                </div>
              </div>
            </div>
            <div className="module-visual">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Youth-meeting_600x600.png?v=1704735792" alt="Youth Meeting" />
            </div>
          </div>

          <div className="program-gallery gallery-3">
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Mentorship_youth_empowerment_program_480x480.jpg?v=1731610890" alt="Mentorship Program" />
            </div>
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/20190313_103854_600x600.jpg?v=1704992306" alt="Youth Workshop" />
            </div>
          </div>

          <div className="extra-info-container">
            <h3 className="sub-header">Program Components</h3>
            <div className="info-grid">
              <div className="info-card"><h4>Educational Workshops</h4><p>Communication, budgeting, goal setting, and academic tutoring.</p></div>
              <div className="info-card"><h4>Mentorship</h4><p>Paired with professionals for personal development and confidence building.</p></div>
              <div className="info-card"><h4>Community Engagement</h4><p>Active contributors through volunteer initiatives and projects.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 02: ESL & FSL LANGUAGE TRAINING */}
      <section className="program-module module-language" id="language">
        <div className="container">
          <div className="module-header reversed">
            <div className="module-visual">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/FRENCH_CLASSES_FLYER_600x600.jpg?v=1704740389" alt="French Classes Flyer" />
            </div>
            <div className="module-info">
              <span className="module-num">02</span>
              <h2 className="module-title">ESL & FSL <br /> Language Training</h2>
              <div className="module-content">
                <p className="program-description">
                  Personalized and accessible instruction designed for all ages. We offer both private and group
                  training tailored for newcomers, youth, and working professionals.
                </p>
                <ul className="impact-list">
                  <li>Improve spoken and written proficiency</li>
                  <li>Increase career advancement opportunities</li>
                  <li>Support workplace requirements for professionals</li>
                </ul>
                <div className="government-callout">
                  <p>Specialized training for <strong>Federal Government employees</strong> to support career progression and exam prep.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="program-gallery gallery-4">
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/french_class_pic.jpg?v=1768777914" alt="French Class" />
            </div>
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/review_480x480.png?v=1665509596" alt="Student Review" />
            </div>
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/1_909d8fe7-bbe8-4dca-9b32-9e3758008ecf.png?v=1754162878" alt="Language Program" />
            </div>
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_7239.jpg?v=1759331909" alt="Language Training Session" />
            </div>
          </div>
        </div>
      </section>

      {/* 03: SEWING & ENTREPRENEURSHIP */}
      <section className="program-module module-sewing" id="sewing">
        <div className="container">
          <div className="module-header">
            <div className="module-info">
              <span className="module-num">03</span>
              <h2 className="module-title">Sewing & <br /> Entrepreneurship</h2>
              <div className="module-content">
                <p className="program-description">
                  Empowering women and youth through creative skill-building and vocational training.
                  Transforming talents into tools for financial independence.
                </p>
                <div className="creativity-card">
                  <h5>Intergenerational Bonding</h5>
                  <p>Our special Mother & Daughter sessions create meaningful opportunities for knowledge sharing and shared creativity.</p>
                </div>
              </div>
            </div>
            <div className="module-visual">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/PXL_20260304_175021346.MP.jpg?v=1772708442" alt="Sewing Session" />
            </div>
          </div>

          <div className="program-gallery gallery-5">
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Sewing_classes_flyer_2026.png?v=1768777111" alt="Sewing Flyer" />
            </div>
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/15EAE92F-5CF3-474C-A014-E80D86821D9A_480x480.jpg?v=1723462270" alt="Sewing Detail" />
            </div>
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_8019.jpg?v=1770140798" alt="Workshop" />
            </div>
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Copy_of_Copy_of_Copy_of_Copy_of_Copy_of_Dark_Navy_and_Gold_Modern_Sponsorship_Proposal_-_1_4a3f9bda-40c9-4c37-82d5-e28e37d16c85.png?v=1770631298" alt="Sponsorship" />
            </div>
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Copy_of_Copy_of_Pink_and_White_Modern_Product_Review_Influencer_Instagram_Story_Instagram_Post_45_.zip_-_1.png?v=1759331418" alt="Community Review" />
            </div>
          </div>
        </div>
      </section>

      {/* 04: INTERNSHIP & EXPERIENTIAL LEARNING */}
      <section className="program-module module-internship" id="internship">
        <div className="container">
          <div className="module-header reversed">
            <div className="module-visual">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/7D5DE7BE-ABDA-46B0-ACA3-AE88943EBAFE_480x480.jpg?v=1723462433" alt="Internship" />
            </div>
            <div className="module-info">
              <span className="module-num">04</span>
              <h2 className="module-title">Internship & <br /> Experiential Learning</h2>
              <div className="module-content">
                <p className="program-description">Bridging the gap between classroom and career. We provide meaningful opportunities for COOP and volunteer programs.</p>
                <div className="partner-list-inline">
                  <span className="partner-tag">Laurentian University</span>
                  <span className="partner-tag">Carleton University</span>
                  <span className="partner-tag">Adler University</span>
                  <span className="partner-tag">Centennial College</span>
                  <span className="partner-tag">Queen Elizabeth Scholarship</span>
                </div>
                <div className="impact-stat">
                  <strong>2022-2024</strong>
                  <span>Partner for Queen Elizabeth Scholarship Advanced Scholars West Africa</span>
                </div>
              </div>
            </div>
          </div>

          <div className="program-gallery gallery-3">
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/29B4A0BF-F8C2-4D12-8875-EB84F3ACFF32_600x600.jpg?v=1705500087" alt="Student Experience" />
            </div>
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/linda_a4fdcddc-c7db-4e19-beb7-93eb9d839562_480x480.jpg?v=1704921810" alt="Scholar" />
            </div>
            <div className="gallery-item">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/ques_student_480x480.jpg?v=1731609237" alt="QES Student" />
            </div>
          </div>
        </div>
      </section>

      {/* 05: DIASPORA IMPACT */}
      <section className="program-module module-diaspora" id="diaspora">
        <div className="container">
          <div className="diaspora-hero">
            <div className="diaspora-bg">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Violet_and_Green_Lavender_Photo_Collage_Instagram_Post.png?v=1746253578" alt="Diaspora Impact" />
            </div>
            <div className="diaspora-overlay">
              <span className="module-num">05</span>
              <h2>Diaspora Impact Program</h2>
              <p>Honouring family roots and supporting future generations in Sierra Leone, Côte d'Ivoire, and Ghana.</p>
              <div className="impact-grid">
                <div className="impact-box"><h4>Education Relief</h4><p>Backpacks and sponsorship for students.</p></div>
                <div className="impact-box"><h4>Learning Centres</h4><p>Safe classrooms and books for girls.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="programs-cta">
        <div className="container">
          <h2>Be Part of the <br /> <em>Sustainable Change</em></h2>
          <p>Join the NewLife Project in creating pathways to hope, dignity, and lasting transformation.</p>
          <a href="#contact" className="btn-primary">Get Involved</a>
        </div>
      </section>
    </div>
  );
};

export default Programs;

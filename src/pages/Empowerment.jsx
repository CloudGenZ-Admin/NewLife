import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/IndividualProgram.css';

gsap.registerPlugin(ScrollTrigger);

const Empowerment = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.program-hero-clean > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
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
          <span className="program-label">Empowerment</span>
          <h1>Youths & Women <br /> <em>Empowerment</em></h1>
          <p>Developing confidence, skills, and leadership for the next generation through community-driven initiatives.</p>
        </div>
      </header>

      <section className="program-main-section">
        <div className="container">
          <div className="program-split">
            <div className="program-text">
              <h2 className="section-title">The Mission</h2>
              <p>Our program is designed to support young people aged 15–21 in developing the confidence, skills, and opportunities needed to succeed. We believe investing in youth is essential to building resilient communities.</p>

              <div className="program-goals">
                <div className="goal-item">
                  <h3>Engagement</h3>
                  <p>Increase school engagement and graduation readiness through active mentorship and support systems.</p>
                </div>
                <div className="goal-item">
                  <h3>Employability</h3>
                  <p>Strengthen employability skills and career awareness to prepare our youth for a competitive global market.</p>
                </div>
                <div className="goal-item">
                  <h3>Resilience</h3>
                  <p>Build resilience and leadership capacity, empowering women and youths to lead with purpose.</p>
                </div>
              </div>
            </div>

            <div className="program-visual-standalone">
              <img className="main-program-img" src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Youth-meeting_600x600.png?v=1704735792" alt="Youth Empowerment" />
            </div>
          </div>
        </div>
      </section>

      <section className="program-gallery-section">
        <div className="container">
          <h2 className="section-title centered">Our Impact <em>In Pictures</em></h2>
          <div className="program-gallery-bento">
            <div className="bento-item large">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Mentorship_youth_empowerment_program_480x480.jpg?v=1731610890" alt="Mentorship" />
            </div>
            <div className="bento-item large">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/20190313_103854_600x600.jpg?v=1704992306" alt="Workshop" />
            </div>
          </div>
        </div>
      </section>

      <section className="program-section green-light-bg">
        <div className="container">
          <h2 className="section-title centered">Program Components</h2>
          <div className="components-grid">
            <div className="component-card">
              <h3>Educational Workshops</h3>
              <p>Interactive sessions on communication, budgeting, goal setting, and academic tutoring.</p>
            </div>
            <div className="component-card">
              <h3>Mentorship</h3>
              <p>One-on-one guidance from professionals to build personal development and confidence.</p>
            </div>
            <div className="component-card">
              <h3>Community Projects</h3>
              <p>Active contributors through volunteer initiatives that bridge social and economic gaps.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Empowerment;

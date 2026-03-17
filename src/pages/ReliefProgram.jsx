import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/IndividualProgram.css';

gsap.registerPlugin(ScrollTrigger);

const ReliefProgram = () => {
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
          <span className="program-label">Pillar 05</span>
          <h1>Relief Program & <br /> <em>Diaspora Impact</em></h1>
          <p>Honouring roots through global transformation and community support.</p>
        </div>
      </header>

      <section className="program-main-section">
        <div className="container">
          <div className="program-split">
            <div className="program-text">
              <h2 className="section-title">A Global Legacy</h2>
              <p>Honouring family roots and supporting future generations in Sierra Leone, Côte d'Ivoire, and Ghana. We bridge the diaspora with local needs to create lasting change.</p>

              <div className="program-goals">
                <div className="goal-item">
                  <h3>Educational Relief</h3>
                  <p>Backpacks, books, and essential school supplies for students in need across West Africa.</p>
                </div>
                <div className="goal-item">
                  <h3>Learning Centres</h3>
                  <p>Building and supporting safe classrooms specifically for girls' education and literacy.</p>
                </div>
              </div>
            </div>

            <div className="program-visual-standalone">
              <img className="main-program-img" src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Violet_and_Green_Lavender_Photo_Collage_Instagram_Post.png?v=1746253578" alt="Relief Distribution" />
            </div>
          </div>
        </div>
      </section>

      <section className="program-gallery-section">
        <div className="container">
          <h2 className="section-title centered">Global <em>Solidarity</em></h2>
          <div className="program-gallery-bento gallery-2">
            <div className="bento-item full-image">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/IMG_6657.jpg?v=1755714448" alt="Aid Distribution" />
            </div>
            <div className="bento-item large">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/04103EC8-69BD-4266-ADC4-2F9F12E42ACF.jpg?v=1713204114" alt="Community Smile" />
            </div>
          </div>
        </div>
      </section>

      <section className="program-section green-light-bg">
        <div className="container">
          <h2 className="section-title centered">Our Global Reach</h2>
          <div className="components-grid">
            <div className="component-card">
              <h3>Sierra Leone</h3>
              <p>Focused on rural education and classroom infrastructure for primary students.</p>
            </div>
            <div className="component-card">
              <h3>Côte d'Ivoire</h3>
              <p>Community health, basic supplies, and mentorship for local youth groups.</p>
            </div>
            <div className="component-card">
              <h3>Ghana</h3>
              <p>Entrepreneurship support for local women's cooperatives and vocational kits.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReliefProgram;

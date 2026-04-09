import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/WomensWorld.css';
import '../styles/ArchitectHero.css';

gsap.registerPlugin(ScrollTrigger);

const FORUM_IMAGES = {
  hero: '/forum_5.webp',
  poster1: '/Pink_Modern_Women_Retreat_Instagram_Post_20260309_163819_0000.webp',
  poster2: '/Yellow_and_Brown_Geometric_Online_Webinar_Flyer.webp',
  forum1: '/forum_1.webp',
  forum2: '/forum_2.webp',
  forum3: '/forum_3.webp',
  forum7:  '/forum_7.webp',
  forum9: '/forum_9.webp',
  forumOld: '/women_world3.jpg',
  img7514: '/IMG_7514_2.webp',
  img7508: '/IMG_7508_c515294e-db1c-4752-9f9e-a7199d18cc54.webp',
  womenWorld: '/women_world.jpg',
  womenWorld2: '/women_world2.jpg',
};

const WomensWorld = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.0 } });

      tl.to('.grid-line', {
        height: '100%',
        stagger: 0.02,
        duration: 0.6,
        ease: 'expo.inOut'
      });

      tl.to('.architect-detail, .architect-hero-title', {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out'
      }, 0.15);

      tl.to('.architect-meta, .footer-info-item', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.4');

      // Section reveals
      gsap.utils.toArray('.ww-section').forEach((section) => {
        gsap.fromTo(section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            }
          }
        );
      });

      // Gallery stagger
      gsap.fromTo('.ww-gallery-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.ww-gallery-grid',
            start: 'top 85%',
          }
        }
      );

      // Pricing cards stagger
      gsap.fromTo('.ww-tier-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.ww-tiers-grid',
            start: 'top 85%',
          }
        }
      );

    }, heroRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="womens-world-page" ref={heroRef}>

      {/* ═══ HERO ═══ */}
      <header className="architect-hero ww-hero-theme">
        <div className="architect-grid">
          {[...Array(12)].map((_, i) => (
            <div key={`v-${i}`} className="grid-line v"></div>
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={`h-${i}`} className="grid-line h"></div>
          ))}
        </div>

        <div className="architect-wrapper">
          <div className="architect-title-group">
            <span className="architect-detail">WOMEN'S WORLD</span>
            <h1 className="architect-hero-title">Global Women <br /> <em>Leadership Forum</em></h1>
          </div>

          <div className="architect-meta">
            <p className="meta-p-1">A dynamic network of accomplished and emerging women leaders committed to advancing leadership, mentorship, and social impact across communities and industries worldwide.</p>
            <p className="meta-p-2" style={{ marginTop: '1rem' }}>Through conferences, leadership programs, global exchanges, and recognition initiatives — the Forum strengthens women's influence everywhere.</p>
          </div>
        </div>

        <div className="architect-footer-info">
          <div className="footer-info-item">
            <h4>Network</h4>
            <p>Global Leaders</p>
          </div>
          <div className="footer-info-item">
            <h4>Programs</h4>
            <p>Fellows & Mentorship</p>
          </div>
          <div className="footer-info-item">
            <h4>Events</h4>
            <p>Annual Conferences</p>
          </div>
          <div className="footer-info-item">
            <h4>Impact</h4>
            <p>Community Change</p>
          </div>
        </div>
      </header>

      {/* ═══ OVERVIEW ═══ */}
      <section className="ww-section ww-overview">
        <div className="ww-container">
          <div className="ww-overview-grid">
            <div className="ww-overview-text">
              <span className="ww-label">Overview</span>
              <h2 className="ww-heading">NewLife Global Women <em>Leadership Forum</em></h2>
              <p>The NewLife Global Women Leadership Forum is a dynamic network of accomplished and emerging women leaders committed to advancing leadership, mentorship, and social impact across communities and industries worldwide.</p>
              <p>The Forum creates uniquely curated leadership experiences, professional networking opportunities, and mentorship pathways designed to support women at different stages of their leadership journeys.</p>
              <p>Through conferences, leadership programs, global exchanges, and recognition initiatives, the Forum strengthens women's influence in business, community development, research, entrepreneurship, and public leadership.</p>
            </div>
            <div className="ww-overview-images">
              <div className="ww-overview-img-main" style={{ gridColumn: 'span 2' }}>
                <img src={FORUM_IMAGES.hero} alt="Women Leadership Forum" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PURPOSE ═══ */}
      <section className="ww-section ww-purpose">
        <div className="ww-container">
          <div className="ww-split">
            <div className="ww-split-left" style={{ paddingRight: '20px' }}>
              <span className="ww-label">Our Purpose</span>
              <h2 className="ww-heading">Why the <em>Forum</em> Exists</h2>
              <p style={{ fontFamily: 'var(--fb)', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--ww-muted)', marginBottom: '2rem' }}>The Forum creates uniquely curated leadership experiences, professional networking opportunities, and mentorship pathways designed to support women at different stages of their leadership journeys.</p>
              <div className="ww-features-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="ww-feature">Expand access to leadership networks</div>
                <div className="ww-feature">Provide high-quality leadership development experiences</div>
                <div className="ww-feature">Connect women with mentors and global opportunities</div>
                <div className="ww-feature">Elevate women's voices and contributions</div>
                <div className="ww-feature">Support the next generation of women leaders</div>
              </div>
            </div>
            <div className="ww-split-right">
              <div className="ww-purpose-img" style={{ borderRadius: 'var(--ww-radius)', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
                <img src={FORUM_IMAGES.forum1} alt="Forum Purpose" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BARRIERS ═══ */}
      <section className="ww-section ww-barriers">
        <div className="ww-container">
          <div className="ww-barriers-grid">
            <div className="ww-barrier-visual">
              <img src={FORUM_IMAGES.img7514} alt="Forum attendees" />
            </div>
            <div className="ww-barrier-content">
              <span className="ww-label">The Challenge</span>
              <h2 className="ww-heading">Barriers the Forum <em>Addresses</em></h2>
              <p>Women leaders often face structural obstacles that limit their growth and influence. The NewLife Forum actively works to remove these barriers through intentional programming and global collaboration.</p>
              <div className="ww-features-grid" style={{ gridTemplateColumns: '1fr', gap: '12px' }}>
                <div className="ww-feature">Limited access to influential professional networks</div>
                <div className="ww-feature">Lack of structured leadership development opportunities</div>
                <div className="ww-feature">Insufficient mentorship and sponsorship pathways</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KEY INITIATIVES ═══ */}
      <section className="ww-section ww-initiatives">
        <div className="ww-container">
          <div className="ww-section-header">
            <span className="ww-label">Key Initiatives</span>
            <h2 className="ww-heading">Programs That <em>Transform</em></h2>
          </div>

          {/* Leadership Fellows */}
          <div className="ww-initiative-block">
            <div className="ww-initiative-visual">
              <img src={FORUM_IMAGES.poster1} alt="Leadership Fellows" />
            </div>
            <div className="ww-initiative-text">
              <h3>Leadership Fellows Program</h3>
              <p>A structured leadership acceleration experience designed for women who are 2–5 years away from senior leadership roles.</p>
              <div className="ww-features-grid">
                <div className="ww-feature">Leadership immersion workshops</div>
                <div className="ww-feature">Masterclasses with global experts</div>
                <div className="ww-feature">One-on-one mentorship matching</div>
                <div className="ww-feature">Leadership development curriculum</div>
                <div className="ww-feature">Strategic career positioning support</div>
                <div className="ww-feature">Legacy Impact Project</div>
              </div>
            </div>
          </div>

          {/* Global Networking */}
          <div className="ww-initiative-block ww-reversed">
            <div className="ww-initiative-text">
              <h3>Global Networking Experiences</h3>
              <p>The Forum hosts curated gatherings that connect women leaders across sectors and regions.</p>
              <div className="ww-features-grid">
                <div className="ww-feature">Annual leadership conferences</div>
                <div className="ww-feature">Regional leadership circles</div>
                <div className="ww-feature">Executive roundtables</div>
                <div className="ww-feature">Innovation showcases</div>
              </div>
            </div>
            <div className="ww-initiative-visual">
              <img src={FORUM_IMAGES.poster2} alt="Global Networking" />
            </div>
          </div>

          {/* Mentorship */}
          <div className="ww-initiative-block">
            <div className="ww-initiative-visual">
              <img src={FORUM_IMAGES.forum2} alt="Mentorship" />
            </div>
            <div className="ww-initiative-text">
              <h3>Mentorship & Sponsorship Pathways</h3>
              <p>Members gain access to structured mentorship and career support that accelerates their leadership trajectory.</p>
              <div className="ww-features-grid">
                <div className="ww-feature">Senior leader mentors</div>
                <div className="ww-feature">Peer leadership cohorts</div>
                <div className="ww-feature">Career navigation guidance</div>
                <div className="ww-feature">International exposure opportunities</div>
              </div>
            </div>
          </div>

          {/* Recognition */}
          <div className="ww-initiative-block ww-reversed">
            <div className="ww-initiative-text">
              <h3>Recognition & Leadership Showcases</h3>
              <p>The Forum celebrates women who are driving meaningful change through recognition programs.</p>
              <div className="ww-features-grid">
                <div className="ww-feature">Inspirational Leaders Awards</div>
                <div className="ww-feature">Women Who Make a Difference</div>
                <div className="ww-feature">Social Innovation Showcases</div>
              </div>
            </div>
            <div className="ww-initiative-visual">
              <img src={FORUM_IMAGES.forum3} alt="Recognition" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ IMPACT VISION ═══ */}
      <section className="ww-section ww-impact">
        <div className="ww-container">
          <div className="ww-impact-card">
            <div className="ww-impact-content">
              <span className="ww-label ww-label-light">Impact Vision</span>
              <h2 className="ww-heading ww-heading-light">Building a Powerful <em>Ecosystem</em></h2>
              <div className="ww-impact-goals">
                <div className="ww-impact-goal">
                  <span className="ww-goal-icon">◆</span>
                  <p>Build a powerful ecosystem of women leaders</p>
                </div>
                <div className="ww-impact-goal">
                  <span className="ww-goal-icon">◆</span>
                  <p>Increase representation of women in decision-making roles</p>
                </div>
                <div className="ww-impact-goal">
                  <span className="ww-goal-icon">◆</span>
                  <p>Support social and economic innovation</p>
                </div>
                <div className="ww-impact-goal">
                  <span className="ww-goal-icon">◆</span>
                  <p>Strengthen global collaboration and knowledge exchange</p>
                </div>
              </div>
            </div>
            <div className="ww-impact-visual">
              <img src={FORUM_IMAGES.img7508} alt="Impact Vision" />
            </div>
          </div>
        </div>
      </section>



      {/* ═══ GALLERY ═══ */}
      <section className="ww-section ww-gallery">
        <div className="ww-container">
          <div className="ww-section-header">
            <span className="ww-label">Gallery</span>
            <h2 className="ww-heading">Moments of <em>Impact</em></h2>
          </div>
          <div className="ww-gallery-grid">
            <div className="ww-gallery-item ww-gallery-tall">
              <img src={FORUM_IMAGES.forum1} alt="Forum moment 1" />
            </div>
            <div className="ww-gallery-item">
              <img src={FORUM_IMAGES.forum7} alt="Forum moment 2" />
            </div>
            <div className="ww-gallery-item">
              <img src={FORUM_IMAGES.forum9} alt="Forum moment 3" />
            </div>
            <div className="ww-gallery-item ww-gallery-wide">
              <img src={FORUM_IMAGES.forumOld} alt="Forum moment 4" />
            </div>
            <div className="ww-gallery-item">
              <img src={FORUM_IMAGES.forum2} alt="Forum moment 5" />
            </div>
            <div className="ww-gallery-item ww-gallery-tall-wide">
              <img src={FORUM_IMAGES.womenWorld} alt="Forum moment 6" />
            </div>
            <div className="ww-gallery-item">
              <img src={FORUM_IMAGES.womenWorld2} alt="Forum moment 7" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MEMBERSHIP TICKETING ═══ */}
      <section className="ww-section ww-membership">
        <div className="ww-container">
          <div className="ww-section-header">
            <span className="ww-label">Membership</span>
            <h2 className="ww-heading">Join the <em>Forum</em></h2>
          </div>
          <div className="ww-membership-iframe-wrapper">
            <iframe
              title="Membership ticketing powered by Zeffy"
              src="https://www.zeffy.com/en-CA/ticketing/womens-world-memberships"
              allowTransparency="true"
              className="ww-membership-iframe"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomensWorld;

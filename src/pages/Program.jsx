import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import '../styles/Program.css';
import '../styles/ArchitectHero.css';

gsap.registerPlugin(ScrollTrigger);

const programsData = [
  {
    id: 'empowerment',
    title: 'Youth & Women <em>Empowerment</em>',
    badge: 'CORE PILLAR',
    description: 'Providing youth and women with the tools, mentorship, and confidence to lead and succeed in their communities.',
    image: 'https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Youth-meeting_600x600.png?v=1704735792',
    link: '/programs/empowerment',
    features: ['Active Mentorship', 'Leadership Growth', 'Career Readiness']
  },
  {
    id: 'language',
    title: 'Language <em>Training</em>',
    badge: 'COMMUNICATION',
    description: 'Mastering English and French through personalized ESL/FSL programs designed for professional and social integration.',
    image: 'https://cdn.shopify.com/s/files/1/0506/2515/1173/files/french_class_pic.jpg?v=1768777914',
    link: '/programs/language',
    features: ['Private Tutoring', 'Group Fluency', 'Exam Preparation']
  },
  {
    id: 'sewing',
    title: 'Sewing & <em>Skills</em>',
    badge: 'VOCATIONAL',
    description: 'Transforming artistry into entrepreneurship through vocational training in garment construction and business management.',
    image: 'https://cdn.shopify.com/s/files/1/0506/2515/1173/files/PXL_20260304_175021346.MP.jpg?v=1772708442',
    link: '/programs/sewing',
    features: ['Fabric Design', 'Market Strategy', 'Business Growth']
  },
  {
    id: 'internship',
    title: 'Internship <em>Engagement</em>',
    badge: 'EXPERIENTIAL',
    description: 'Bridging academia and community impact through structured internships and professional development modules.',
    image: 'https://cdn.shopify.com/s/files/1/0506/2515/1173/files/7D5DE7BE-ABDA-46B0-ACA3-AE88943EBAFE_480x480.jpg?v=1723462433',
    link: '/programs/internship',
    features: ['Academic Placement', 'Professional COOP', 'Scholar Projects']
  },
  {
    id: 'relief',
    title: 'Relief & <em>Diaspora</em>',
    badge: 'IMPACT',
    description: 'Connecting the global diaspora to local needs in West Africa through educational relief and community support.',
    image: 'https://newlifeprojectinc.org/cdn/shop/files/Untitled_design.jpg?v=1705364217',
    link: '/programs/relief',
    features: ['School Infrastructure', 'Education Relief', 'Community Care']
  }
];

const Program = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      // 1. Grid Lines Animation
      gsap.set('.grid-line.v', { height: 0, left: (i) => `${(i + 1) * 8.33}%`, opacity: 0 });
      gsap.set('.grid-line.h', { width: 0, top: (i) => `${(i + 1) * 16.66}%`, opacity: 0 });

      tl.to('.grid-line.v', {
        height: '100%',
        opacity: 0.15,
        stagger: 0.02,
        duration: 0.8,
        ease: 'expo.inOut'
      })
      .to('.grid-line.h', {
        width: '100%',
        opacity: 0.15,
        stagger: 0.05,
        duration: 0.8,
        ease: 'expo.inOut'
      }, '-=0.6')
      .to('.architect-decoration', {
        opacity: 0.1,
        scale: 1,
        duration: 1.5
      }, '-=0.6');

      // 2. Content Stagger
      tl.to('.architect-detail, .architect-hero-title', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      }, 0.2);

      tl.to('.architect-meta, .footer-info-item', {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.3');

      // 3. Optimized Cards Scroll Animation
      gsap.from('.program-card-premium', {
        scrollTrigger: {
          trigger: '.programs-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
      
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="programs-page" ref={pageRef}>
      <header className="architect-hero programs-hero-theme">
        <div className="architect-grid" style={{ opacity: 1 }}>
          {[...Array(12)].map((_, i) => (
            <div key={`v-${i}`} className="grid-line v"></div>
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={`h-${i}`} className="grid-line h"></div>
          ))}
        </div>

        <div className="architect-decoration prog-decor"></div>

        <div className="architect-wrapper">
          <div className="architect-title-group">
            <span className="architect-detail">BUILDING FUTURES</span>
            <h1 className="architect-hero-title">A Holistic Approach <br /> <em>to Global Growth.</em></h1>
          </div>

          <div className="architect-meta">
            <p>Our five structural pillars—Empowerment, Education, Skills, Exposure, and Relief—work in harmony to provide a comprehensive support system for at-risk women and youth across the globe.</p>
          </div>
        </div>

        <div className="architect-footer-info">
          <div className="footer-info-item">
            <h4>Pillar 01</h4>
            <p>Empowerment</p>
          </div>
          <div className="footer-info-item">
            <h4>Pillar 02</h4>
            <p>Education</p>
          </div>
          <div className="footer-info-item">
            <h4>Pillar 03</h4>
            <p>Skills Training</p>
          </div>
          <div className="footer-info-item">
            <h4>Pillar 04</h4>
            <p>Global Relief</p>
          </div>
        </div>
      </header>

      <main className="programs-container-listing">
        <div className="programs-grid">
          {programsData.map((program, idx) => (
            <div key={program.id} className={`program-card-premium card-p-${idx + 1}`}>
              <div className="card-header-row">
                <img src={program.image} alt={program.title} className="card-img-circle" />
                <span className="card-badge-tag">{program.badge}</span>
              </div>
              
              <h2 className="card-title-text" dangerouslySetInnerHTML={{ __html: program.title }} />
              <p className="card-summary">{program.description}</p>
              
              <div className="card-features-area">
                <span className="area-label">Key Initiatives:</span>
                <ul className="features-stack">
                  {program.features.map((f, i) => (
                    <li key={i} className="feature-pill">
                      <div className="check-container">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="feature-title-bold">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={program.link} className="card-main-action">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Program;

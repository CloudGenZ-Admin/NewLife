import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/OurAfrica.css';

gsap.registerPlugin(ScrollTrigger);

const OurAfrica = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text for cinematic reveals
      const titleLines = new SplitType('.africa-hero-title', { types: 'lines' });
      const revealTexts = new SplitType('.africa-reveal-text', { types: 'lines' });

      // Title reveal
      gsap.from(titleLines.lines, {
        opacity: 0,
        y: 100,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5
      });

      // Chapter reveals
      const chapters = gsap.utils.toArray('.africa-chapter');
      chapters.forEach((chapter) => {
        const lines = chapter.querySelectorAll('.africa-reveal-text .line');
        const visual = chapter.querySelector('.africa-chapter-visual');

        gsap.from(lines, {
          scrollTrigger: {
            trigger: chapter,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          stagger: 0.05,
          duration: 1,
          ease: 'power3.out'
        });

        gsap.from(visual, {
          scrollTrigger: {
            trigger: chapter,
            start: 'top 80%',
          },
          scale: 1.1,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out'
        });
      });

      // Parallax for floating images
      gsap.utils.toArray('.africa-floating-img').forEach((img) => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: -100,
          ease: 'none'
        });
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, []);

  return (
    <div className="our-africa-page">
      <section className="our-africa-section" ref={sectionRef} id="our-africa">
        {/* HERO INTRO */}
        <div className="africa-hero-section">
          <div className="africa-container">
            <div className="africa-hero-content">
              <span className="africa-label">Our Africa Initiative</span>
              <h2 className="africa-hero-title">A Journey of <br /> <em>Sustainable Change</em>.</h2>
              <p className="africa-hero-intro africa-reveal-text">
                Welcome to Newlife Project's dedicated mission in Africa. We are committed to creating lasting change, 
                uplifting communities, and improving lives through education, relief, and unwavering support.
              </p>
            </div>
            <div className="africa-hero-visual">
              <img 
                src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Our_Africa.jpg?v=1705192915" 
                alt="Our Africa Banner" 
                className="africa-main-banner"
              />
              <div className="africa-floating-card africa-floating-img">
                <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Violet_and_Green_Lavender_Photo_Collage_Instagram_Post_9a6a3bad-b7da-4420-8e60-0c8122edb6d1.png?v=1746253803" alt="Community Smile" />
              </div>
            </div>
          </div>
        </div>

        {/* CHAPTER 1: RELIEF PROGRAM */}
        <div className="africa-chapter africa-chapter-left">
          <div className="africa-container split-layout">
            <div className="africa-chapter-text">
              <span className="chapter-num">01</span>
              <h3 className="chapter-title">The Relief Program</h3>
              <div className="africa-reveal-text">
                <p>
                  For the past four years, NewLife Project Inc. has been meeting the needs of at-risk women and youth in 
                  <strong> Sierra Leone, Côte d’Ivoire, and Ghana</strong> through its Relief Program.
                </p>
                <p>
                  We organize clothing, backpack, and household good drives within the Ottawa community, directing generous 
                  donations to students in need. These resources provide vital school supplies and financial sponsorship for 
                  education in Freetown and Grand Lahou.
                </p>
                <div className="impact-quote">
                  "We extend our financial assistance to Women’s Rehabilitation Centers, helping them regain their social and economical footing."
                </div>
              </div>
            </div>
            <div className="africa-chapter-visual">
              <div className="visual-grid">
                <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/sierra_leone_pic_480x480.jpg?v=1705444911" alt="Relief Work" className="main-grid-img" />
                <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/newlife_sleoe_480x480.jpg?v=1705288572" alt="Relief Work Detail" className="secondary-grid-img africa-floating-img" />
              </div>
            </div>
          </div>
        </div>

        {/* CHAPTER 2: LEARNING CENTRE */}
        <div className="africa-chapter africa-chapter-right">
          <div className="africa-container split-layout reversed">
            <div className="africa-chapter-visual">
              <div className="visual-stack">
                <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/thumbnail_480x480.jpg?v=1705289712" alt="Educational Growth" className="stack-img-1" />
                <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/20201119_091448_1866b413-3b46-4e01-abff-ff5c553b145c_480x480.jpg?v=1705290060" alt="Students in Brookfields" className="stack-img-2 africa-floating-img" />
              </div>
            </div>
            <div className="africa-chapter-text">
              <span className="chapter-num">02</span>
              <h3 className="chapter-title">Brookfields Learning Centre</h3>
              <div className="africa-reveal-text">
                <p>
                  One of NewLife's ultimate goals is to empower girls through quality education. We have launched a transformative 
                  project to establish a sustainable educational infrastructure in the <strong>Brookfields community, Sierra Leone</strong>.
                </p>
                <p>
                  This education center will provide a secure environment featuring classrooms, a library, a computer lab, and 
                  administrative offices—designed to be suitable for all-weather conditions.
                </p>
                <div className="highlight-tag">Giving Back to the Community that inspired NewLife</div>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL CALLOUT */}
        <div className="africa-outro">
          <div className="africa-container">
            <div className="outro-card">
              <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Violet_and_Green_Lavender_Photo_Collage_Instagram_Post.png?v=1746253578" alt="Future Vision" className="outro-bg" />
              <div className="outro-content">
                <h3>Expanding the Vision</h3>
                <p>This year, we continue to support children in Sierra Leone with backpacks and essential school supplies, ensuring no child is left behind in their educational journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurAfrica;

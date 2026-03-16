import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Mission.css'

gsap.registerPlugin(ScrollTrigger)

const Mission = () => {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 993px)", () => {
      // Pin the visual side
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
      });

      // Animate the visuals as we scroll through text blocks
      const stories = gsap.utils.toArray('.story-block');
      stories.forEach((story, i) => {
        if (i === 0) return; // Skip first

        gsap.from(story, {
          y: 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: story,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });
      });
      
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    });

    // Mobile specific animations
    mm.add("(max-width: 992px)", () => {
      gsap.from('.story-block', {
        y: 50,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        scrollTrigger: {
          trigger: '.mission-story',
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="mission-cinematic" ref={sectionRef} id="about">
      <div className="mission-grid-layout" ref={containerRef}>
        
        {/* LEFT SIDE: Pinned Visuals */}
        <div className="mission-visual-side" ref={pinRef}>
          <div className="pinned-image-wrapper">
            <img 
              src="https://newlifeprojectinc.org/cdn/shop/files/Untitled_design.jpg?v=1705364217" 
              alt="Mission Journey" 
              className="cinematic-image"
            />
            {/* Visual Accents */}
            <div className="cinematic-overlay"></div>
            <div className="floating-badge">Est. 1994</div>
          </div>
        </div>

        {/* RIGHT SIDE: Scrolling Narrative */}
        <div className="mission-story-side">
          <div className="mission-story-content">
            
            <div className="story-block first">
              <span className="narrative-label">Founder's Vision</span>
              <h2 className="narrative-title">A New Life <br/><em>Born from Faith.</em></h2>
              <p className="narrative-text">
                NewLife Project Inc. was born from an evangelical campaign in 1994, 
                founded by Brenda Williams in Freetown, Sierra Leone. Our mission 
                started with a simple yet powerful goal: to reach out to 
                underprivileged women and change the trajectory of their lives.
              </p>
            </div>

            <div className="story-block">
              <span className="narrative-label">Global Impact</span>
              <h2 className="narrative-title">1,000+ Lives <br/>Transformed.</h2>
              <p className="narrative-text">
                Today, we have touched over a thousand lives across Sierra Leone, 
                Cote d'Ivoire, and Ghana. Through Vocational Training, Women's Forums, 
                and Health Clinics, we empower individuals to build their own 
                futures with dignity and skill.
              </p>
            </div>

            <div className="story-block last">
              <span className="narrative-label">Our Local Reach</span>
              <h2 className="narrative-title">Home in <br/>Canada.</h2>
              <p className="narrative-text">
                Since 2014, our Canadian centre has focused on the unique 
                challenges facing local immigrant women and youth. We provide 
                a sanctuary for growth, cultural pride, and community 
                building in the heart of our community.
              </p>
              
              <div className="narrative-footer">
                <a href="#programs" className="capsule-cta">
                  Explore Programs
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Mission
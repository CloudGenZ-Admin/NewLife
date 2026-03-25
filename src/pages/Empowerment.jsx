import React, { useEffect, useRef,useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Empowerment.css';
import ProgramRegistrationPopup from '../components/ProgramRegistrationPopup';

gsap.registerPlugin(ScrollTrigger);

const Empowerment = () => {
    const pageRef = useRef(null);
    const [showReg, setShowReg] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Snappy staggered entry
            gsap.from('.emp-hero-tag, .emp-hero-heading, .emp-hero-body, .emp-hero-cta', {
                y: 20, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out', delay: 0.3
            });
            gsap.from('.emp-hero-img-block', {
                x: 40, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.2
            });
            gsap.from('.emp-stat', {
                y: 15, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out', delay: 0.5
            });

            // Bento Reveals
            gsap.from('.bento-card', {
                scrollTrigger: { trigger: '.emp-bento', start: 'top 85%' },
                y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out'
            });

            // Section reveals
            gsap.utils.toArray('.emp-fade').forEach(el => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
                    y: 25, opacity: 0, duration: 0.8, ease: 'power3.out'
                });
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="emp-page" ref={pageRef}>

            {/* HERO: COMPACT SPLIT */}
            <section className="emp-hero">
                {/* Left: Content */}
                <div className="emp-hero-content">
                    <h1 className="emp-hero-heading">Youth & Women <em>Empowerment</em> Program</h1>
                    <p className="emp-hero-body">Supporting young people aged 15–21 in developing the confidence, skills, and opportunities needed to succeed. We invest in youth to build resilient communities.</p>
                    <div className="emp-hero-stats">
                        <div className="emp-stat"><strong>500+</strong><span>Participants</span></div>
                        <div className="emp-stat"><strong>15–21</strong><span>Age Group</span></div>
                        <div className="emp-stat"><strong>20+</strong><span>Years Running</span></div>
                    </div>
                </div>

                {/* Right: Image Panel */}
                <div className="emp-hero-img-block">
                    <div className="emp-img-pill">
                        <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Youth-meeting_600x600.png?v=1704735792" alt="Youth Empowerment" />
                    </div>
                    <div className="emp-img-tag">Est. 2004</div>
                </div>
            </section>

            {/* BENTO GRID: 3 PROGRAM PILLARS */}
            <section className="emp-bento emp-fade">
                <div className="bento-card bento-green">
                    <h3>School Engagement</h3>
                    <p>Increase graduation readiness through active mentorship, tutoring, and structured academic support for at-risk youth.</p>
                    <div className="bento-pill">Engagement</div>
                </div>
                <div className="bento-card bento-light">
                    <h3>Career Employability</h3>
                    <p>Strengthen career awareness and employability skills to prepare our youth for a competitive and evolving global market.</p>
                    <div className="bento-pill">Employment</div>
                </div>
                <div className="bento-card bento-cream">
                    <h3>Leadership Resilience</h3>
                    <p>Build resilience and leadership capacity, empowering women and youth to lead their communities with purpose and vision.</p>
                    <div className="bento-pill">Resilience</div>
                </div>
            </section>

            {/* PHOTO EDITORIAL SPLIT */}
            <section className="emp-editorial emp-fade">
                <div className="editorial-gallery">
                    <div className="gallery-main">
                        <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/Mentorship_youth_empowerment_program_480x480.jpg?v=1731610890" alt="Mentorship" />
                        <span className="gallery-label">Active Mentorship</span>
                    </div>
                    <div className="gallery-sub">
                        <img src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/20190313_103854_600x600.jpg?v=1704992306" alt="Workshop" />
                        <span className="gallery-label">Vocational Workshop</span>
                    </div>
                </div>

                <div className="editorial-text">
                    <span className="editorial-eyebrow">Community Impact</span>
                    <h2>Cultivating <em>Real</em> Change in Communities</h2>
                    <p>Through a blend of structured workshops, peer mentorship, and community projects, we bridge the gap between potential and opportunity. Every session, every connection builds a stronger future.</p>
                    <div className="editorial-facts">
                        <div className="fact-row">
                            <div className="fact-dot green"></div>
                            <p>One-on-one mentorship with industry professionals</p>
                        </div>
                        <div className="fact-row">
                            <div className="fact-dot green"></div>
                            <p>Budget planning & goal-setting workshops</p>
                        </div>
                        <div className="fact-row">
                            <div className="fact-dot green"></div>
                            <p>Community volunteer initiatives</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROGRAM COMPONENTS: DENSE LIST */}
            <section className="emp-components emp-fade">
                <div className="comp-header">
                    <h2>Program <em>Components</em></h2>
                    <p>Three structured pillars delivered across hands-on sessions throughout the year.</p>
                </div>
                <div className="comp-grid">
                    <div className="comp-item">
                        <div className="comp-info">
                            <h4>Educational Workshops</h4>
                            <p>Interactive sessions on communication, budgeting, goal setting, and academic tutoring designed to raise school performance.</p>
                        </div>
                    </div>
                    <div className="comp-item">
                        <div className="comp-info">
                            <h4>Active Mentorship</h4>
                            <p>One-on-one guidance from qualified professionals to build personal confidence and long-term career vision.</p>
                        </div>
                    </div>
                    <div className="comp-item">
                        <div className="comp-info">
                            <h4>Community Projects</h4>
                            <p>Active contribution through volunteer initiatives that bridge social and economic gaps in the community.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* REGISTRATION CALL TO ACTION */}
            <section className="emp-reg-cta" style={{ textAlign: 'center', padding: '100px 20px', background: 'white', borderTop: '1px solid #eee' }}>
                <div className="container">
                    <span className="preg-label" style={{ display: 'block', marginBottom: '15px' }}>Take the next step</span>
                    <h2 style={{ fontFamily: 'var(--ff)', fontSize: '3.5rem', marginBottom: '30px' }}>Ready to <em>Join?</em></h2>
                    <button 
                        className="preg-submit-btn" 
                        style={{ padding: '20px 60px', fontSize: '1.1rem' }}
                        onClick={() => setShowReg(true)}
                    >
                        Register for this Program
                    </button>
                </div>
            </section>

            <ProgramRegistrationPopup 
                show={showReg} 
                onClose={() => setShowReg(false)} 
                programName="Youth & Women Empowerment"
                formAction="https://docs.google.com/forms/d/e/1FAIpQLSdiA3Cav8ifqBpZObmBDalpXJoj06YP06Sgt9dfuSdjgldwng/formResponse"
                entryProgram="entry.574291237"
                entryName="entry.743630460"
                entryEmail="entry.2010389936"
                entryContact="entry.1005238941"
            />
        </div>
    );
};

export default Empowerment;

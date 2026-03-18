import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/GetInvolved.css';
import '../styles/ArchitectHero.css'; // Reuse the architectural core

gsap.registerPlugin(ScrollTrigger);

const GetInvolved = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.0 } });

            // 1. Grid Construction (Snappier)
            tl.to('.grid-line', {
                height: '100%',
                stagger: 0.02,
                duration: 0.7,
                ease: 'expo.inOut'
            })
            .to('.architect-decoration', {
                opacity: 0.15,
                scale: 1,
                duration: 1.2
            }, '-=0.5');

            // 2. Content Entry (Reduced delays)
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
                stagger: 0.05,
                duration: 0.4,
                ease: 'power2.out'
            }, '-=0.4');

            // 3. Body Section Reveals
            const sections = gsap.utils.toArray('.gi-arch-section');
            sections.forEach(section => {
                gsap.from(section, {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="get-involved-page">
            {/* HERO: ARCHITECTURAL MIRROR */}
            <section className="architect-hero gi-hero-theme" ref={heroRef}>
                <div className="architect-grid">
                    {[...Array(12)].map((_, i) => (
                        <div key={`v-${i}`} className="grid-line v"></div>
                    ))}
                    {[...Array(6)].map((_, i) => (
                        <div key={`h-${i}`} className="grid-line h"></div>
                    ))}
                </div>

                <div className="architect-decoration gi-decor"></div>

                <div className="architect-wrapper">
                    <div className="architect-title-group">
                        <span className="architect-detail">GET INVOLVED</span>
                        <h1 className="architect-hero-title">Explore Ways to <br/><em>Get Involved.</em></h1>
                    </div>

                    <div className="architect-meta">
                        <p>At NewLife Project, every act of support helps create opportunities for women and youth to grow, learn, and thrive. Whether you give your time, share your resources, or partner with us, you become part of a community committed to lasting change.</p>
                    </div>
                </div>

                <div className="architect-footer-info">
                    <div className="footer-info-item">
                        <h4>Volunteer</h4>
                        <p>On-the-ground action</p>
                    </div>
                    <div className="footer-info-item">
                        <h4>Giving</h4>
                        <p>Fueling the mission</p>
                    </div>
                    <div className="footer-info-item">
                        <h4>Partner</h4>
                        <p>Corporate collaboration</p>
                    </div>
                    <div className="footer-info-item">
                        <h4>Events</h4>
                        <p>Community gatherings</p>
                    </div>
                </div>
            </section>

            {/* WAYS TO GIVE: ARCHITECTURAL BLOCKS */}
            <section className="gi-arch-section gi-giving" id="giving">
                <div className="container">
                    <div className="gi-section-header">
                        <div className="gi-line"></div>
                        <h2 className="gi-title">Ways to <em>Give</em></h2>
                    </div>

                    <div className="gi-grid">
                        <div className="gi-card">
                            <span className="gi-num">01</span>
                            <h3>Donate</h3>
                            <p>Your contribution helps provide education support, skills training, mentorship, and empowerment programs for women and youth.</p>
                            <a href="https://ext.zeffy.com/en-CA/donation-form/47eb2245-0955-46fd-916c-e093fa5c156f" className="gi-btn-arch" target="_blank" rel="noopener noreferrer">Donate Now</a>
                        </div>
                        <div className="gi-card">
                            <span className="gi-num">02</span>
                            <h3>Become a Corporate Partner</h3>
                            <p>Organizations can support NewLife by sponsoring programs, events, or leadership initiatives that create measurable community impact. Corporate partners receive visibility opportunities and play an important role in expanding access.</p>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSf9dSsOqSvfjECakLFVDB84Fa6NtkzVMoy5OlorjRMrDsXj5g/viewform?usp=dialog" className="gi-link" target="_blank" rel="noopener noreferrer">Learn About Corporate Partnerships &rarr;</a>
                        </div>
                        <div className="gi-card">
                            <span className="gi-num">03</span>
                            <h3>Legacy Giving</h3>
                            <p>Support the long-term sustainability of NewLife Project by including the organization in your future giving plans. Legacy giving helps ensure that future generations continue to benefit from education and empowerment opportunities.</p>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdWqBbJbbuDxyA_85ZoXuGJfcZplVPIzH5LqwKADUK2TigRsw/viewform?usp=dialog" className="gi-link" target="_blank" rel="noopener noreferrer">Learn More About Legacy Giving &rarr;</a>
                        </div>
                        <div className="gi-card">
                            <span className="gi-num">04</span>
                            <h3>Host a Fundraiser</h3>
                            <p>Community members can organize fundraising activities such as cultural events, workplace campaigns, or personal celebrations to support NewLife programs. Hosting a fundraiser is a meaningful way to bring people together.</p>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdrL2wrcj_i2U4S4SK54lwaVrzlyM0yXuHOffqtnXcgO_ZqIQ/viewform?usp=dialog" className="gi-btn-arch" target="_blank" rel="noopener noreferrer">Start a Fundraiser</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* VOLUNTEER & EVENTS: SPLIT EDITORIAL */}
            <section className="gi-arch-section gi-hub">
                <div className="container">
                    <div className="gi-hub-layout">
                        <div className="gi-hub-content">
                            <h2 className="gi-title">Ways to <em>Volunteer</em></h2>
                            <p>Volunteers play an essential role in supporting program delivery, events, and community outreach. Whether you are a student, professional, or community member, your time and skills can help strengthen our impact.</p>
                        </div>
                        <div className="gi-hub-actions">
                            <div className="gi-hub-item">
                                <h4>Volunteer Opportunities</h4>
                                <p>Apply to support our on-site program delivery and outreach activities.</p>
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeFfaklz51yrV-IZ5d4re6tRvXOHR3bavl91THiWoN-H-OoLQ/viewform?usp=dialog" className="gi-btn-arch" target="_blank" rel="noopener noreferrer">Explore Volunteer Opportunities</a>
                            </div>
                            <div className="gi-hub-item">
                                <h4>Event Calendar</h4>
                                <p>Join us at cultural celebrations, workshops, leadership forums, and fundraising events throughout the year. Attending events is a great way to connect.</p>
                                <a href="#calendar" className="gi-btn-arch">View Event Calendar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONNECT: CALENDAR & NEWSLETTER */}
            <section className="gi-arch-section gi-connect" id="calendar">
                <div className="container">
                    <div className="gi-connect-grid">
                        <div className="gi-newsletter-box">
                            <h3>Newsletter</h3>
                            <p>Stay connected with NewLife Project by reading our latest updates, impact stories, and program highlights.</p>
                            <div className="gi-newsletter-links">
                                <a href="#" className="gi-link">Read Current Newsletter &rarr;</a>
                                <a href="#" className="gi-link">View Newsletter Archive &rarr;</a>
                            </div>
                            
                            <h4 style={{ marginTop: '3rem', fontFamily: 'var(--ff)', fontSize: '2rem' }}>Subscribe</h4>
                            <p>Join our mailing list to receive upcoming event announcements, volunteer opportunities, and ways to support our work.</p>
                            <form className="gi-form" onSubmit={(e) => e.preventDefault()}>
                                <input type="email" placeholder="email@address.com" required />
                                <button type="submit">Join</button>
                            </form>
                        </div>
                        <div className="gi-calendar-box">
                            <div className="gi-frame">
                                <iframe 
                                    src="https://calendar.google.com/calendar/embed?src=en.canadian%23holiday%40group.v.calendar.google.com&ctz=America%2FToronto" 
                                    style={{ border: 0 }} 
                                    width="100%" 
                                    height="400" 
                                    frameBorder="0" 
                                    scrolling="no"
                                    title="Community Calendar"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GetInvolved;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/GetInvolved.css';

gsap.registerPlugin(ScrollTrigger);

const GetInvolved = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Hero Animation - Using unique selection to prevent double-animation
            const heroTitle = new SplitType('.get-involved-hero h1', { types: 'lines,chars' });
            if (heroTitle.chars) {
                gsap.from(heroTitle.chars, {
                    y: 100,
                    opacity: 0,
                    stagger: 0.02,
                    duration: 1.5,
                    ease: 'power4.out',
                    delay: 0.5
                });
            }

            // Fixed: removed .reveal-up from intro-text in JSX and here to prevent double-animation
            gsap.from('.get-involved-hero .intro-text', {
                y: 30,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.8
            });

            // 2. Generic Reveals
            const reveals = gsap.utils.toArray('.reveal-up');
            reveals.forEach((el) => {
                gsap.from(el, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // 3. Special handling for split-view modules
            const splitItems = gsap.utils.toArray('.split-item');
            splitItems.forEach((item) => {
                gsap.from(item, {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            setTimeout(() => ScrollTrigger.refresh(), 500);

        }, containerRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="get-involved-page" ref={containerRef}>
            <header className="get-involved-hero">
                <div className="hero-visual-accent"></div>
                <div className="container">
                    <span className="label">Get Involved</span>
                    {/* Fixed: removed reveal-up from h1/p that are handled by specific hero animations */}
                    <h1>Explore Ways to <br /> <em>Get Involved</em></h1>
                    <p className="intro-text">
                        At NewLife Project, every act of support helps create opportunities for women and youth to grow, learn, and thrive.
                        Whether you give your time, share your resources, or partner with us, you become part of a community committed to lasting change.
                    </p>
                </div>
            </header>

            {/* WAYS TO GIVE */}
            <section className="involved-module module-ways-to-give">
                <div className="module-bg-accent"></div>
                <div className="container">
                    <div className="module-header-editorial">
                        <h2 className="module-title reveal-up">Ways to Give</h2>
                    </div>

                    <div className="involved-grid">
                        <div className="involved-card theme-green reveal-up">
                            <div className="card-glass-overlay"></div>
                            <div className="card-content">
                                <span className="card-category">Direct Impact</span>
                                <h3>Donate</h3>
                                <p>Your contribution helps provide education support, skills training, mentorship, and empowerment programs for women and youth.</p>
                                <a
                                    href="#"
                                    className="card-btn-premium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Donate Now <span>&rarr;</span>
                                </a>
                            </div>
                        </div>

                        <div className="involved-card theme-glass reveal-up">
                            <div className="card-content">
                                <span className="card-category">Growth</span>
                                <h3>Become a Corporate Partner</h3>
                                <p>Organizations can support NewLife by sponsoring programs, events, or leadership initiatives that create measurable community impact.</p>
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSf9dSsOqSvfjECakLFVDB84Fa6NtkzVMoy5OlorjRMrDsXj5g/viewform?usp=dialog" className="card-btn-minimal" target="_blank" rel="noopener noreferrer">Learn About Corporate Partnerships &rarr;</a>
                            </div>
                        </div>

                        <div className="involved-card theme-glass reveal-up">
                            <div className="card-content">
                                <span className="card-category">Sustainability</span>
                                <h3>Legacy Giving</h3>
                                <p>Support the long-term sustainability of NewLife Project by including the organization in your future giving plans.</p>
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdWqBbJbbuDxyA_85ZoXuGJfcZplVPIzH5LqwKADUK2TigRsw/viewform?usp=dialog" className="card-btn-minimal" target="_blank" rel="noopener noreferrer">Learn More About Legacy Giving &rarr;</a>
                            </div>
                        </div>

                        <div className="involved-card theme-glass reveal-up">
                            <div className="card-content">
                                <span className="card-category">Community</span>
                                <h3>Host a Fundraiser</h3>
                                <p>Community members can organize fundraising activities such as cultural events or workplace campaigns to support NewLife programs.</p>
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdrL2wrcj_i2U4S4SK54lwaVrzlyM0yXuHOffqtnXcgO_ZqIQ/viewform?usp=dialog" className="card-btn-minimal" target="_blank" rel="noopener noreferrer">Start a Fundraiser &rarr;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WAYS TO VOLUNTEER & EVENTS */}
            <section className="involved-module module-volunteer-events">
                <div className="container">
                    <div className="split-view">
                        <div className="split-item module-volunteer">
                            <h2 className="module-title">Ways to Volunteer</h2>
                            <div className="module-content">
                                <p>Volunteers play an essential role in supporting program delivery, events, and community outreach. Your time and skills can help strengthen our impact.</p>
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeFfaklz51yrV-IZ5d4re6tRvXOHR3bavl91THiWoN-H-OoLQ/viewform?usp=dialog" className="action-link" target="_blank" rel="noopener noreferrer">Explore Volunteer Opportunities</a>
                            </div>
                        </div>

                        <div className="split-item module-events">
                            <h2 className="module-title">Events</h2>
                            <div className="module-content">
                                <p>Join us at cultural celebrations, workshops, leadership forums, and fundraising events throughout the year.</p>
                                <a href="#calendar-section" className="action-link">View Event Calendar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEWSLETTER HUB */}
            <section className="involved-module module-newsletter">
                <div className="container">
                    <div className="newsletter-card reveal-up">
                        <div className="card-header">
                            <h2 className="module-title">Newsletter</h2>
                            <p>Stay connected with NewLife Project by reading our latest updates, impact stories, and program highlights.</p>
                        </div>
                        <div className="newsletter-actions">
                            <div className="newsletter-grid">
                                <div className="archive-box">
                                    <a href="#">Read Current Newsletter</a>
                                    <a href="#">View Newsletter Archive</a>
                                </div>
                                <div className="subscribe-box">
                                    <h3>Subscribe</h3>
                                    <p>Join our mailing list to receive upcoming event announcements and volunteer opportunities.</p>
                                    <form className="mini-subscribe">
                                        <input type="email" placeholder="Your email address" />
                                        <button type="submit">Join &rarr;</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALENDAR SECTION */}
            <section id="calendar-section" className="involved-module module-calendar reveal-up">
                <div className="container">
                    <div className="module-header-editorial text-center" style={{ textAlign: 'center' }}>
                        <h2 className="module-title">Event Calendar</h2>
                        <p>Join our upcoming community events, workshops, and gatherings.</p>
                    </div>
                    <div className="calendar-wrapper-premium">
                        <iframe 
                            src="https://calendar.google.com/calendar/embed?src=en.canadian%23holiday%40group.v.calendar.google.com&ctz=America%2FToronto" 
                            style={{ border: 0 }} 
                            width="100%" 
                            height="600" 
                            frameBorder="0" 
                            scrolling="no"
                            title="NewLife Community Calendar"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GetInvolved;

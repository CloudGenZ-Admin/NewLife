import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            const heroTitle = new SplitType('.contact-hero h1', { types: 'lines,chars' });
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

            // Reveal animations for sections
            const revealElements = gsap.utils.toArray('.reveal-up');
            revealElements.forEach((el) => {
                gsap.from(el, {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // Contact cards stagger
            gsap.from('.contact-method-card', {
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact-methods-grid',
                    start: 'top 80%'
                }
            });

        }, containerRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="contact-page" ref={containerRef}>
            <header className="contact-hero">
                <div className="container">
                    <span className="label">Contact</span>
                    {/* Fixed: reduced animation interference */}
                    <h1>We Would Love to <br /> <em>Hear From You</em></h1>
                    <p className="intro-text">
                        At NewLife Project, meaningful change happens through connection. 
                        Whether you are looking to learn more about our programs, explore partnership opportunities, 
                        volunteer your time, or support our initiatives, our team is here to help.
                    </p>
                </div>
            </header>

            <section className="contact-main-section">
                <div className="container">
                    <div className="contact-layout-grid">
                        {/* LEFT SIDE: CONTACT CARDS */}
                        <div className="contact-methods-stack reveal-up">
                            <div className="contact-method-card">
                                <span className="card-num">01</span>
                                <h3>Visit Us</h3>
                                <p><strong>NewLife Project Inc.</strong><br />Head Office<br />Ottawa, Ontario, Canada</p>
                                <span className="note">(Full address to be added)</span>
                            </div>

                            <div className="contact-method-card highlighting">
                                <span className="card-num">02</span>
                                <h3>Email Us</h3>
                                <div className="email-links">
                                    <div className="email-item">
                                        <span>General Inquiries</span>
                                        <a href="mailto:info@newlifeproject.org">info@newlifeproject.org</a>
                                    </div>
                                    <div className="email-item">
                                        <span>Program Inquiries</span>
                                        <a href="mailto:programs@newlifeproject.org">programs@newlifeproject.org</a>
                                    </div>
                                    <div className="email-item">
                                        <span>Partnership & Sponsorship</span>
                                        <a href="mailto:partnerships@newlifeproject.org">partnerships@newlifeproject.org</a>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-method-card">
                                <span className="card-num">03</span>
                                <h3>Call Us</h3>
                                <p>Phone: (Add phone number)</p>
                                <div className="hours">
                                    <strong>Office Hours:</strong>
                                    <p>Monday – Friday<br />9:00 AM – 5:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: FORM */}
                        <div className="contact-form-container reveal-up">
                            <div className="form-info">
                                <h2 className="module-title">Send Us a <br /> <em>Message</em></h2>
                                <p>We welcome individuals, organizations, educators, community leaders, and supporters who share our vision.</p>
                            </div>

                            <form className="premium-contact-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <input type="text" id="name" placeholder="Full Name" required />
                                </div>
                                <div className="form-group">
                                    <input type="email" id="email" placeholder="Email Address" required />
                                </div>
                                <div className="form-group">
                                    <input type="tel" id="phone" placeholder="Phone Number (optional)" />
                                </div>
                                <div className="form-group">
                                    <select id="inquiry" required>
                                        <option value="" disabled selected>Inquiry Type</option>
                                        <option value="general">General Question</option>
                                        <option value="program">Program Participation</option>
                                        <option value="volunteer">Volunteer</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="donation">Donation Support</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
                                </div>
                                <button type="submit" className="submit-btn-premium">
                                    Send Message <span>&rarr;</span>
                                </button>
                            </form>

                            <div className="stay-connected-alt">
                                <h3>Stay Connected</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/Contact.css';
import '../styles/ArchitectHero.css'; // Consistent architecture

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.0 } });

            // 1. Grid Construction (Fast)
            tl.to('.grid-line', {
                height: '100%',
                stagger: 0.02,
                duration: 0.6,
                ease: 'expo.inOut'
            })
            .to('.architect-decoration', {
                opacity: 0.15,
                scale: 1,
                duration: 1.2
            }, '-=0.6');

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

            // Section Reveal
            gsap.from('.contact-main-section', {
                y: 50,
                opacity: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: '.contact-main-section',
                    start: 'top 85%'
                }
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="contact-page">
            <header className="architect-hero contact-hero-theme" ref={heroRef}>
                <div className="architect-grid">
                    {[...Array(12)].map((_, i) => (
                        <div key={`v-${i}`} className="grid-line v"></div>
                    ))}
                    {[...Array(6)].map((_, i) => (
                        <div key={`h-${i}`} className="grid-line h"></div>
                    ))}
                </div>

                <div className="architect-decoration cont-decor"></div>

                <div className="architect-wrapper">
                    <div className="architect-title-group">
                        <span className="architect-detail">Join the Movement — Empowering Futures</span>
                        <h1 className="architect-hero-title">We Would Love to <br /> <em>Hear From You.</em></h1>
                    </div>

                    <div className="architect-meta">
                        <p>At NewLife Project, meaningful change happens through connection. Whether you are looking to learn more about our programs, explore partnership opportunities, volunteer your time, or support our initiatives, our team is here to help.</p>
                        <p style={{ marginTop: '1rem', opacity: 0.6 }}>We welcome individuals, organizations, educators, community leaders, and supporters who share our vision of empowering women and youth.</p>
                    </div>
                </div>

                <div className="architect-footer-info">
                    <div className="footer-info-item">
                        <h4>Inquiry</h4>
                        <p>Rapid response team</p>
                    </div>
                    <div className="footer-info-item">
                        <h4>Global</h4>
                        <p>Ottawa Head Office</p>
                    </div>
                    <div className="footer-info-item">
                        <h4>Partnership</h4>
                        <p>Impact node discovery</p>
                    </div>
                    <div className="footer-info-item">
                        <h4>Social</h4>
                        <p>Connect across nodes</p>
                    </div>
                </div>
            </header>

            <section className="contact-main-section">
                <div className="container">
                    <div className="contact-layout-grid">
                        {/* LEFT SIDE: CONTACT CARDS */}
                        <div className="contact-methods-stack">
                            <div className="contact-method-card">
                                <h3>Visit Us</h3>
                                <p><strong>NewLife Project Inc.</strong><br />Head Office<br />Ottawa, Ontario, Canada</p>
                                <span className="note">(Full address to be added)</span>
                            </div>

                            <div className="contact-method-card highlighting">
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
                                <h3>Call Us</h3>
                                <div className="email-links">
                                    <div className="email-item">
                                        <span>Phone</span>
                                        <a href="tel:#">(Add phone number)</a>
                                    </div>
                                    <div className="email-item">
                                        <span>Office Hours</span>
                                        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--cont-primary)', marginTop: '0.2rem' }}>
                                            Monday – Friday <br/> 9:00 AM – 5:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: FORM */}
                        <div className="contact-form-container">
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

                            <div className="contact-stay-connected">
                                <h4 style={{ fontFamily: 'var(--ff)', fontSize: '2rem', marginBottom: '1rem', fontWeight: 300 }}>Stay Connected</h4>
                                <p style={{ opacity: 0.6, marginBottom: '2rem' }}>Follow NewLife Project on social media to stay updated on program activities, upcoming events, and impact stories.</p>
                                <div className="social-nodes-container" style={{ display: 'flex', gap: '1.5rem' }}>
                                    <a href="#" className="social-node-link" aria-label="Facebook">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </a>
                                    <a href="#" className="social-node-link" aria-label="Instagram">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </a>
                                    <a href="#" className="social-node-link" aria-label="LinkedIn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                    </a>
                                    <a href="#" className="social-node-link" aria-label="X">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

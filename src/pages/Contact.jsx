import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import '../styles/Contact.css';
import '../styles/ArchitectHero.css'; // Consistent architecture

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const heroRef = useRef(null);
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiry: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', inquiry: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

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
                        <span className="architect-detail">CONTACT</span>
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
                                            Monday – Friday <br /> 9:00 AM – 5:00 PM
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

                            <form className="premium-contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Full Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email Address"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="Phone Number (optional)"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        id="inquiry"
                                        required
                                        value={formData.inquiry}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Inquiry Type</option>
                                        <option value="general">General Question</option>
                                        <option value="program">Program Participation</option>
                                        <option value="volunteer">Volunteer</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="donation">Donation Support</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <textarea
                                        id="message"
                                        rows="5"
                                        placeholder="Your Message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                {status === 'success' && (
                                    <div className="form-status-message success">
                                        Thank you! Your message has been sent successfully.
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="form-status-message error">
                                        Oops! There was a problem sending your message.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="submit-btn-premium"
                                    disabled={status === 'submitting'}
                                >
                                    {status === 'submitting' ? 'Sending...' : 'Send Message'} <span>&rarr;</span>
                                </button>
                            </form>

                            <div className="contact-stay-connected">
                                <h4 style={{ fontFamily: 'var(--ff)', fontSize: '2rem', marginBottom: '1rem', fontWeight: 300 }}>Stay Connected</h4>
                                <p style={{ opacity: 0.6, marginBottom: '2rem' }}>Follow NewLife Project on social media to stay updated on program activities, upcoming events, and impact stories.</p>
                                <div className="social-nodes-container" style={{ display: 'flex', gap: '1.5rem' }}>
                                    <a href="https://www.facebook.com/people/NewLife-Designs/100046505364411/" className="social-node-link" aria-label="Facebook">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </a>
                                    <a href="https://www.instagram.com/newlifeprojectinc/" className="social-node-link" aria-label="Instagram">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </a>
                                    <a href="https://www.youtube.com/channel/UCpjnMhG8gsM6jkNxX-S43Eg" className="social-node-link" aria-label="YouTube">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                    </a>
                                    <a href="https://ca.pinterest.com/newlifeprojectinc/" className="social-node-link" aria-label="Pinterest">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.967 7.398 6.93 0 4.135-2.607 7.461-6.223 7.461-1.215 0-2.358-.63-2.75-1.373l-.752 2.86c-.272 1.039-1.012 2.345-1.508 3.162 1.125.348 2.311.537 3.54.537 6.621 0 11.988-5.367 11.988-11.987C24.005 5.367 18.638 0 12.017 0z" /></svg>
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

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Create FormData object
        const form = e.target;
        const formDataToSend = new FormData(form);

        // Submit to FormSubmit.co
        fetch('https://formsubmit.co/dev.cloudgenz.growth91@gmail.com', {
            method: 'POST',
            body: formDataToSend,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', inquiry: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        });
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
                        <p className="architect-meta-sub">We welcome individuals, organizations, educators, community leaders, and supporters who share our vision of empowering women and youth.</p>
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
                                <p><strong>NewLife Project Inc.</strong><br />5-2000 Thurston Drive<br />Ottawa, ON K1G 4K7</p>
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
                                        <span>Phone 1</span>
                                        <a href="tel:+16136997205">+1 (613) 699-7205</a>
                                    </div>
                                    <div className="email-item">
                                        <span>Office Hours</span>
                                        <p className="office-hours-text">
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
                                {/* Hidden fields for FormSubmit configuration */}
                                <input type="hidden" name="_subject" value="New Contact Form Submission - NewLife Project" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="table" />
                                
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
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
                                        name="email"
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
                                        name="phone"
                                        placeholder="Phone Number (optional)"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        id="inquiry"
                                        name="inquiry"
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
                                        name="message"
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
                                <h4>Subscribe Now</h4>
                                <p>Sign up for our newsletter to stay updated on program activities, upcoming events, and impact stories.</p>
                                <div className="contact-newsletter-wrapper">
                                    <iframe
                                        title="Signup form powered by Zeffy"
                                        src="https://www.zeffy.com/en-CA/embed/newsletter-form/sign-up-for-our-newsletter-3095"
                                        allowTransparency="true"
                                        className="contact-newsletter-iframe"
                                    />
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

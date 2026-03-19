import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/GalleryPage.css'

gsap.registerPlugin(ScrollTrigger)

const VocationalTraining = () => {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-page-header > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      })

      const sections = gsap.utils.toArray('.gallery-section-block')
      sections.forEach((section) => {
        gsap.from(section.querySelectorAll('.gallery-image-wrapper, .gallery-text-content > *'), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="gallery-page" ref={pageRef}>
      <header className="gallery-page-header">
        <h1 className="gallery-page-title">Education & Vocational Training</h1>
        <p className="gallery-page-subtitle">
          Inspiring, educating, and empowering women and girls to build self-esteem 
          and achieve economic independence through creative skills.
        </p>
      </header>

      <div className="gallery-page-container">
        {/* Section 1: Sewing */}
        <div className="gallery-section-block">
          <div className="gallery-image-wrapper">
            <img 
              src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/6856C4D3-E26C-4686-B29E-9404F7CA1554_480x480.jpg?v=1703235693" 
              alt="Sewing Class" 
            />
          </div>
          <div className="gallery-text-content">
            <h3>Sewing (Fashion & Design)</h3>
            <p><strong>Empowering women and girls, one session at a time!</strong></p>
            <p>
              Our goal is to inspire, educate and empower women and girls. We build up self esteem and restore 
              confidence through creative activities. We provide entrepreneurial programs and vocational training 
              (sewing & design classes) to equip beneficiaries with the necessary skills to help them launch 
              their own small business.
            </p>
            <p>
              Our Mother and daughter sewing session creates an opportunity for intergenerational transfer 
              of vocational skills and wisdom. It is a time to bond and have fun.
            </p>
            
            <div className="gallery-highlight-box">
              <h4>Registration & Pricing</h4>
              <div className="reg-info-grid">
                <div className="price-card">
                  <h4>Group Session</h4>
                  <div className="amount">$50</div>
                  <p>(2 hours)</p>
                </div>
                <div className="price-card">
                  <h4>Private Session</h4>
                  <div className="amount">$65</div>
                  <p>(2 hours)</p>
                </div>
                <div className="price-card">
                  <h4>Mother & Daughter</h4>
                  <div className="amount">$75</div>
                  <p>(2 hours)</p>
                </div>
              </div>
              <p><em>* We provide all sample fabric for the sessions.</em></p>
            </div>
            
            <a href="mailto:info@newlifeprojectinc.org" className="gallery-cta-btn">
              Register Now →
            </a>
          </div>
        </div>

        {/* Section 2: French Tutoring */}
        <div className="gallery-section-block reverse">
          <div className="gallery-image-wrapper">
            <img 
              src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/4D8FC592-8681-40A3-9773-46B4F1E992CB_480x480.jpg?v=1703235716" 
              alt="French Tutoring" 
            />
          </div>
          <div className="gallery-text-content">
            <h3>French Tutoring Classes</h3>
            <p>
              NewLife French/English Tutoring offers private tutoring/training sessions with dedicated tutors 
              who have exceptional teaching skills and customized lessons, tailored to your needs. 
            </p>
            <p>
              We offer personalized French/English tutoring with an option of group classes or one on one 
              tutoring in the office and online. Seize this opportunity to sign up for our tutoring program! 
            </p>
            
            <div className="gallery-highlight-box">
              <h4>KIDS Pricing</h4>
              <div className="reg-info-grid">
                <div className="price-card">
                  <h4>Group Session</h4>
                  <div className="amount">$25</div>
                  <p>(per hour)</p>
                </div>
                <div className="price-card">
                  <h4>Private Session</h4>
                  <div className="amount">$30</div>
                  <p>(per hour)</p>
                </div>
              </div>
              <h4 style={{marginTop: '20px'}}>ADULT Pricing</h4>
              <div className="reg-info-grid">
                <div className="price-card">
                  <h4>Group Session</h4>
                  <div className="amount">$35</div>
                  <p>(per hour)</p>
                </div>
                <div className="price-card">
                  <h4>Private Session</h4>
                  <div className="amount">$40</div>
                  <p>(per hour)</p>
                </div>
              </div>
            </div>
            
            <a href="tel:6136997205" className="gallery-cta-btn">
              Call to Register →
            </a>
          </div>
        </div>

        {/* Section 3: Afro-Canadian Craft */}
        <div className="gallery-section-block">
          <div className="gallery-image-wrapper">
            <img 
              src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/B866CACB-B28A-4248-B3D6-2D4E1F5E1367_480x480.jpg?v=1703235962" 
              alt="Craft Class" 
            />
          </div>
          <div className="gallery-text-content">
            <h3>Afro-Canadian Craft Classes</h3>
            <p>
              Geared towards developing skills, self esteem and confidence in kids and teens. The goal is 
              educating the young generation about the Black culture and its values through crafts.
            </p>
            <p>
              We combine African and Canadian art using fine African prints such as Kente fabric from Ghana, 
              Dashiki to educate our participants about the richness of Black culture. 
            </p>
            
            <div className="gallery-highlight-box">
              <h4>Craft Session Pricing</h4>
              <div className="reg-info-grid">
                <div className="price-card">
                  <h4>Group Session</h4>
                  <div className="amount">$20</div>
                  <p>(per hour)</p>
                </div>
                <div className="price-card">
                  <h4>Private Session</h4>
                  <div className="amount">$25</div>
                  <p>(per hour)</p>
                </div>
              </div>
            </div>
            
            <a href="mailto:info@newlifeprojectinc.org" className="gallery-cta-btn">
              Join a Session →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VocationalTraining

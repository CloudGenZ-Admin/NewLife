import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/GalleryPage.css'

gsap.registerPlugin(ScrollTrigger)

const FundraiserExhibitions = () => {
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
        <h1 className="gallery-page-title">Fundraiser Exhibitions</h1>
        <p className="gallery-page-subtitle">
          Connecting to our community, networking, and building lasting relationships through impactful events.
        </p>
      </header>

      <div className="gallery-page-container">
        {/* Section 1 */}
        <div className="gallery-section-block">
          <div className="gallery-image-wrapper">
            <img 
              src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/050F3096-27F4-4B82-BEE7-15F257172D55_600x600.jpg?v=1703233871" 
              alt="Taste of Africa Event" 
            />
          </div>
          <div className="gallery-text-content">
            <h3>Our Journey & Events</h3>
            <p>
              Our fundraiser (Taste of Africa/Tent Sale) events raise funds to sustain our Sewing and French tutoring Projects. 
              We participate in various exhibitions around the city such as Black Business Expo by It's Time Company.
            </p>
            <p>
              This has been a great way of connecting to our community, networking and building lasting relationships.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="gallery-section-block reverse">
          <div className="gallery-image-wrapper">
            <img 
              src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/6ba45069-0f04-4aad-bbf2-f3be88846eee_600x600.jpg?v=1704754643" 
              alt="Sewing Workshop" 
            />
          </div>
          <div className="gallery-text-content">
            <h3>Empowering Through Skills</h3>
            <p>
              NewLife offers sewing & design classes to equip beneficiaries with vital skills to launch their own small business. 
              Our Mother-and-daughter sewing session creates an opportunity for the intergenerational transfer of vocational skills and wisdom.
            </p>
            <p>
              Over 120 women and youth have learned how to sew and developed their skills through these programs. 
              These fundraising efforts have helped with sewing supplies for the sessions.
            </p>
          </div>
        </div>

        {/* Highlight Section */}
        <div className="gallery-highlight-box">
          <h3>Community Support & Relief</h3>
          <p>
            The Project has also been raising funds for the shipment of gently used clothing and accessories to 
            economically disadvantaged men, women and children through Barbecue and bazaar events, yard sales, 
            and marketing of custom-made products and crafts during various exhibition programs.
          </p>
          <p>
            Over the years our proceeds have benefited women and children in Sierra Leone, Cote d'Ivoire and Ghana 
            to help with shipment of gently used clothing, accessories and school supplies to support education.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FundraiserExhibitions

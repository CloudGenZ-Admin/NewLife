import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Gallery.css'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoCycle, setIsAutoCycle] = useState(true)
  const [animatedOptions, setAnimatedOptions] = useState([])
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  const galleryItems = [
    {
      id: 1,
      category: "Fundraising",
      title: "Fundraiser Exhibitions",
      subtitle: "Taste of Africa & Community Events",
      image: "https://newlifeprojectinc.org/cdn/shop/files/fundraiser_1.png?v=1666309940",
      link: "/fundraiser-exhibitions"
    },
    {
      id: 2,
      category: "Entrepreneurship",
      title: "NewLife Designs",
      subtitle: "Redesigning soon - Visit our shop",
      image: "https://newlifeprojectinc.org/cdn/shop/files/fundraiser_1a705eb4-c772-43e8-a300-e90b7d125dad.png?v=1666154809",
      link: "https://shop.newlifeprojectinc.org/collections"
    },
    {
      id: 3,
      category: "Education",
      title: "Education & Vocational Training",
      subtitle: "Sewing, French & Craft Classes",
      image: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/6856C4D3-E26C-4686-B29E-9404F7CA1554_480x480.jpg?v=1703235693",
      link: "/vocational-training"
    },
    {
      id: 4,
      category: "Relief",
      title: "Relief Program",
      subtitle: "Local & International Support",
      image: "https://cdn.shopify.com/s/files/1/0506/2515/1173/files/relief_program_1.jpg?v=1705192603",
      link: "/programs/relief"
    }
  ]

  const handleOptionClick = (index) => {
    setActiveIndex(index)
    setIsAutoCycle(false)
  }

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    // Staggered entrance
    const timers = []
    galleryItems.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i])
      }, 140 * i)
      timers.push(timer)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  // Auto-cycle on mobile
  useEffect(() => {
    let interval
    if (isAutoCycle && windowWidth <= 768) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % galleryItems.length)
      }, 4000)
    }
    return () => clearInterval(interval)
  }, [isAutoCycle, windowWidth, galleryItems.length])

  return (
    <section className="gallery-section" id="gallery">

      {/* Section Header */}
      <div className="gallery-header">
        <div className="gallery-header-text">
          <span className="gallery-eyebrow">What We Do</span>
          <h2 className="gallery-title">Our Programs &amp; <em>Initiatives</em></h2>
        </div>
      </div>

      {/* Accordion Panels */}
      <div className="gallery-interactive">
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            className={`gallery-option ${activeIndex === index ? 'active' : ''} ${animatedOptions.includes(index) ? 'animated' : ''}`}
            style={{ backgroundImage: `url('${item.image}')` }}
            onMouseEnter={() => windowWidth > 768 && handleOptionClick(index)}
            onClick={() => handleOptionClick(index)}
          >
            <div className="option-shadow"></div>

            {/* Vertical label shown when collapsed */}
            <span className="option-tab-label">{item.title}</span>

            {/* Expanded content */}
            <div className="option-label">
              <span className="option-category">{item.category}</span>
              <div className="option-info">
                <div className="option-title">{item.title}</div>
                {item.subtitle && <div className="option-subtitle">{item.subtitle}</div>}
                <a
                  href={item.link}
                  className="option-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  Explore →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Gallery

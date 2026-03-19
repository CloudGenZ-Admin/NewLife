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
      subtitle: "Raising funds for shipment",
      image: "https://newlifeprojectinc.org/cdn/shop/files/fundraiser_1.png?v=1666309940",
      link: "/pages/fundraiser-exhibitions"
    },
    {
      id: 2,
      category: "Entrepreneurship",
      title: "NewLife Designs",
      subtitle: "Entrepreneurship & Marketing",
      image: "https://newlifeprojectinc.org/cdn/shop/files/fundraiser_1a705eb4-c772-43e8-a300-e90b7d125dad.png?v=1666154809",
      link: "https://shop.newlifeprojectinc.org/collections"
    },
    {
      id: 3,
      category: "Education",
      title: "Vocational Training",
      subtitle: "Skill-building for the future",
      image: "https://newlifeprojectinc.org/cdn/shop/files/2_9e088462-4d09-47e8-bac0-b576b8f135b8.jpg?v=1705279646",
      link: "/pages/classes"
    },
    {
      id: 4,
      category: "Relief",
      title: "Relief Program",
      subtitle: "Help equip women and children",
      image: "https://newlifeprojectinc.org/cdn/shop/files/fundraiser_1a705eb4-c772-43e8-a300-e90b7d125dad.png?v=1666154809",
      link: "/pages/international-relief"
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

import React, { useState, useEffect } from 'react'
import '../styles/Gallery.css'

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedOptions, setAnimatedOptions] = useState([])

  const galleryItems = [
    {
      id: 1,
      title: "Fundraiser Exhibitions",
      subtitle: "Raising funds for shipment",
      image: "https://newlifeprojectinc.org/cdn/shop/files/fundraiser_1.png?v=1666309940",
      link: "/pages/fundraiser-exhibitions"
    },
    {
      id: 2,
      title: "NewLife Designs",
      subtitle: "Entrepreneurship & Marketing",
      image: "https://newlifeprojectinc.org/cdn/shop/files/fundraiser_1a705eb4-c772-43e8-a300-e90b7d125dad.png?v=1666154809",
      link: "https://shop.newlifeprojectinc.org/collections"
    },
    {
      id: 3,
      title: "Education and Vocational Training",
      subtitle: "",
      image: "https://newlifeprojectinc.org/cdn/shop/files/2_9e088462-4d09-47e8-bac0-b576b8f135b8.jpg?v=1705279646",
      link: "/pages/classes"
    },
    {
      id: 4,
      title: "Relief Program",
      subtitle: "Help equip women and children",
      image: "https://newlifeprojectinc.org/cdn/shop/files/fundraiser_1a705eb4-c772-43e8-a300-e90b7d125dad.png?v=1666154809",
      link: "/pages/international-relief"
    }
  ]

  const handleOptionClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  useEffect(() => {
    const timers = []
    galleryItems.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i])
      }, 180 * i)
      timers.push(timer)
    })
    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="gallery-interactive">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-option ${activeIndex === index ? 'active' : ''} ${animatedOptions.includes(index) ? 'animated' : ''}`}
              style={{
                backgroundImage: `url('${item.image}')`,
              }}
              onClick={() => handleOptionClick(index)}
            >
              <div className="option-shadow"></div>
              <div className="option-label">
                <div className="option-info">
                  <div className="option-title">{item.title}</div>
                  {item.subtitle && <div className="option-subtitle">{item.subtitle}</div>}
                  <a href={item.link} className="option-link" onClick={(e) => e.stopPropagation()}>
                    READ MORE →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
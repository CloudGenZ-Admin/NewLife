import React, { useState, useEffect, useRef } from 'react'
import '../../styles/Timeline.css'

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const timelineRef = useRef(null)

  const timelineData = [
    {
      year: 'Early 2000s',
      title: 'Foundations in Community Outreach',
      description: 'NewLife began as a grassroots initiative supporting at-risk young women through education and vocational training programs.'
    },
    {
      year: '2003–2009',
      title: 'Expansion and Rehabilitation Programs',
      description: 'Programs expanded across Sierra Leone and Côte d\'Ivoire, including certification partnerships, health outreach campaigns, and rehabilitation support for trafficked women.'
    },
    {
      year: '2014',
      title: 'Establishment in Canada',
      description: 'NewLife obtained nonprofit status in Canada and began delivering language training, cultural exhibitions, and community empowerment initiatives.'
    },
    {
      year: '2017–2020',
      title: 'Community Growth and Crisis Response',
      description: 'The organization expanded youth partnerships, delivered entrepreneurship programs, and adapted services during the COVID-19 pandemic through online learning and mask production initiatives.'
    },
    {
      year: '2021–2023',
      title: 'Strengthening Skills and Leadership',
      description: 'With federal funding support, NewLife trained over 120 women and youth in vocational skills and expanded mentorship and internship programs.'
    },
    {
      year: '2024',
      title: 'Celebrating 10 Years in Canada',
      description: 'NewLife marked a decade of impact in Canada and continues to build global partnerships and innovative empowerment programs.'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setActiveIndex(index)
          }
        })
      },
      { threshold: 0.5 }
    )

    const items = timelineRef.current?.querySelectorAll('.timeline-item')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="timeline-section">
      <div className="container">
        <div className="timeline-header">
          <h2>Historical Timeline</h2>
          <p>Our journey of empowerment and transformation</p>
        </div>

        <div className="timeline-wrapper" ref={timelineRef}>
          <div className="timeline-line"></div>

          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`timeline-item ${activeIndex >= index ? 'active' : ''}`}
              data-index={index}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline

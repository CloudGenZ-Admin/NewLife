import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/LatestNews.css'

gsap.registerPlugin(ScrollTrigger)

const LatestNews = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const newsItems = [
    {
      id: 1,
      date: "Mar 09, 2026",
      title: "Women With Purpose Event",
      description: "Join us for an inspiring evening celebrating women leaders in our community.",
      link: "/blogs/news/women-with-purpose-event",
      color: "#4CAF50"
    },
    {
      id: 2,
      date: "Mar 02, 2026", 
      title: "Menopause & Me: Thriving through the transition",
      description: "A supportive workshop focused on health, wellness, and community.",
      link: "/blogs/news/menopause-me-thriving-through-the-transition",
      color: "#66BB6A"
    },
    {
      id: 3,
      date: "Feb 26, 2026",
      title: "Lunch & Learn",
      description: "Monthly gathering featuring guest speakers and networking opportunities.",
      link: "/blogs/news/lunch-learn",
      color: "#81C784"
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.news-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 50,
        duration: 1,
        ease: 'power3.out'
      })

      // Staggered card animations
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            y: 60,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="latest-news-section" ref={sectionRef}>
      <div className="container">
        <div className="news-header">
          <span className="news-label">Latest Updates</span>
          <h3>What's Happening at NewLife</h3>
          <p>Stay informed about our latest events, programs, and community initiatives</p>
        </div>
        <div className="news-grid">
          {newsItems.map((item, index) => (
            <article 
              key={item.id} 
              className="news-card-modern"
              ref={el => cardsRef.current[index] = el}
            >
              <div className="news-card-header" style={{ background: item.color }}>
                <span className="news-date-badge">{item.date}</span>
              </div>
              <div className="news-card-body">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <a href={item.link} className="news-link">
                  Read More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestNews
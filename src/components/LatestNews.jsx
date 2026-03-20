import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/LatestNews.css'

gsap.registerPlugin(ScrollTrigger)

const LatestNews = () => {
  const sectionRef = useRef(null)

  const newsItems = [
    {
      id: 1,
      date: "Mar 09, 2026",
      category: "EVENTS",
      title: "Women With Purpose Event",
      description: "Join us for an inspiring evening celebrating women leaders and visionaries in our community.",
      image: "https://newlifeprojectinc.org/cdn/shop/files/fundraiser_1.png?v=1666309940",
      link: "/blogs/news/women-with-purpose-event"
    },
    {
      id: 2,
      date: "Mar 02, 2026",
      category: "WELLNESS",
      title: "Menopause & Me: Thriving through Transition",
      description: "A supportive workshop focused on holistic health, wellness, and community connection.",
      image: "https://newlifeprojectinc.org/cdn/shop/files/fundraiser_1a705eb4-c772-43e8-a300-e90b7d125dad.png?v=1666154809",
      link: "/blogs/news/menopause-me-thriving-through-the-transition"
    },
    {
      id: 3,
      date: "Feb 26, 2026",
      category: "COMMUNITY",
      title: "Lunch & Learn Sessions",
      description: "Monthly gathering featuring guest speakers, shared wisdom, and networking opportunities.",
      image: "https://newlifeprojectinc.org/cdn/shop/files/2_9e088462-4d09-47e8-bac0-b576b8f135b8.jpg?v=1705279646",
      link: "/blogs/news/lunch-learn"
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.news-header-content', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      })

      gsap.from('.news-card-editorial', {
        scrollTrigger: { trigger: '.news-grid-editorial', start: 'top 78%' },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="latest-news-editorial" ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className="news-header-content">
          <div className="news-header-left">
            <span className="editorial-label">Community Updates</span>
            <h2 className="editorial-title">What's Happening at NewLife</h2>
          </div>
          <div className="news-header-cta">
            <a href="/blogs/news" className="news-view-all">
              All Stories
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* 3-col equal grid */}
        <div className="news-grid-editorial">
          {newsItems.map((item) => (
            <article key={item.id} className="news-card-editorial">
              <div className="card-visual">
                <div className="card-image-wrapper">
                  <img src={item.image} alt={item.title} className="card-bg-img" />
                  <div className="card-overlay"></div>
                </div>
                <div className="card-top-info">
                  <span className="card-category">{item.category}</span>
                  <span className="card-date">{item.date}</span>
                </div>
              </div>
              <div className="card-details">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-summary">{item.description}</p>
                <a href={item.link} className="card-cta-link">
                  Read Story
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

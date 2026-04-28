import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fetchBlogPosts } from '../api/blog'
import '../styles/LatestNews.css'

gsap.registerPlugin(ScrollTrigger)

const LatestNews = () => {
  const sectionRef = useRef(null)
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const response = await fetchBlogPosts({ perPage: 3 })
        // Handle both array response and object with posts property
        const posts = Array.isArray(response) ? response : response?.posts || []
        setNewsItems(posts)
      } catch (err) {
        console.error('Failed to load blog posts:', err)
        setNewsItems([])
      } finally {
        setLoading(false)
      }
    }
    loadBlogPosts()
  }, [])

  useEffect(() => {
    if (loading || newsItems.length === 0) return

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
  }, [loading, newsItems])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
  }

  const getFeaturedImage = (post) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
           'https://via.placeholder.com/800x500?text=Blog+Post'
  }

  const getCategory = (post) => {
    const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'NEWS'
    // Decode HTML entities (e.g., &amp; -> &)
    const div = document.createElement('div')
    div.innerHTML = categoryName
    return (div.textContent || div.innerText || categoryName).toUpperCase()
  }

  const getExcerpt = (post) => {
    const div = document.createElement('div')
    div.innerHTML = post.excerpt.rendered
    const text = div.textContent || div.innerText || ''
    return text.substring(0, 120) + '...'
  }

  if (loading) {
    return (
      <section className="latest-news-editorial" ref={sectionRef}>
        <div className="container">
          <div className="news-header-content">
            <div className="news-header-left">
              <span className="editorial-label">Community Updates</span>
              <h2 className="editorial-title">What's Happening at NewLife</h2>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
          </div>
        </div>
      </section>
    )
  }

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
            <a href="/blog" className="news-view-all">
              All Stories
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* 3-col equal grid */}
        <div className="news-grid-editorial">
          {newsItems.length > 0 ? (
            newsItems.map((post) => (
              <article key={post.id} className="news-card-editorial">
                <div className="card-visual">
                  <div className="card-image-wrapper">
                    <img src={getFeaturedImage(post)} alt={post.title.rendered} className="card-bg-img" />
                    <div className="card-overlay"></div>
                  </div>
                  <div className="card-top-info">
                    <span className="card-category">{getCategory(post)}</span>
                    <span className="card-date">{formatDate(post.date)}</span>
                  </div>
                </div>
                <div className="card-details">
                  <h3 className="card-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <p className="card-summary">{getExcerpt(post)}</p>
                  <a href={`/blog/${post.id}`} className="card-cta-link">
                    Read Story
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'var(--text-gray)' }}>No blog posts available at the moment.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default LatestNews

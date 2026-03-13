import React from 'react'

const LatestNews = () => {
  const newsItems = [
    {
      id: 1,
      date: "Mar 09, 2026",
      title: "Women With Purpose Event",
      link: "/blogs/news/women-with-purpose-event"
    },
    {
      id: 2,
      date: "Mar 02, 2026", 
      title: "Menopause & Me: Thriving through the transition",
      link: "/blogs/news/menopause-me-thriving-through-the-transition"
    },
    {
      id: 3,
      date: "Feb 26, 2026",
      title: "Lunch & Learn",
      link: "/blogs/news/lunch-learn"
    }
  ]

  return (
    <section className="latest-news-section">
      <div className="container">
        <div className="section-header">
          <h3>Latest From NewLife</h3>
          <p>Get latest news from us!</p>
        </div>
        <div className="news-grid">
          {newsItems.map((item) => (
            <article key={item.id} className="news-card">
              <div className="news-image">
                <div className="news-placeholder">
                  <div className="news-icon">📰</div>
                </div>
              </div>
              <div className="news-content">
                <span className="news-date">{item.date}</span>
                <h4>{item.title}</h4>
                <a href={item.link} className="view-more">VIEW THIS STORE</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestNews
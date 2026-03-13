import React from 'react'
import '../../styles/OurStory.css'

const OurStory = () => {
  return (
    <section className="our-story">
      <div className="container">
        <div className="story-header">
          <h2>Our Story & Mission</h2>
          <p className="story-intro">
            NewLife Project was founded to create practical pathways toward dignity, confidence, and economic 
            independence for women and youth facing social and economic barriers.
          </p>
        </div>

        <div className="story-grid">
          <div className="story-card mission-card">
            <div className="card-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To support women and youth in building skills, confidence, and opportunities that enable them 
              to thrive personally, professionally, and socially.
            </p>
          </div>

          <div className="story-card vision-card">
            <div className="card-icon">🌍</div>
            <h3>Our Vision</h3>
            <p>
              A world where women and young people have equitable access to education, leadership opportunities, 
              and economic participation.
            </p>
          </div>
        </div>

        <div className="values-section">
          <h3>Our Values</h3>
          <div className="values-grid">
            <div className="value-item">
              <span className="value-icon">💪</span>
              <span className="value-text">Empowerment</span>
            </div>
            <div className="value-item">
              <span className="value-icon">🤝</span>
              <span className="value-text">Inclusivity</span>
            </div>
            <div className="value-item">
              <span className="value-icon">✨</span>
              <span className="value-text">Integrity</span>
            </div>
            <div className="value-item">
              <span className="value-icon">📚</span>
              <span className="value-text">Continuous Learning</span>
            </div>
            <div className="value-item">
              <span className="value-icon">🌱</span>
              <span className="value-text">Community Transformation</span>
            </div>
          </div>
        </div>

        <div className="impact-section">
          <h3>Our Impact</h3>
          <p className="impact-intro">
            Over the years, NewLife Project has supported hundreds of individuals across continents through 
            education, vocational training, mentorship, and leadership initiatives.
          </p>
          
          <div className="impact-list">
            <div className="impact-item">
              <span className="impact-bullet">→</span>
              <p>Vocational training programs for women and youth in West Africa</p>
            </div>
            <div className="impact-item">
              <span className="impact-bullet">→</span>
              <p>Rehabilitation and livelihood support for trafficked women</p>
            </div>
            <div className="impact-item">
              <span className="impact-bullet">→</span>
              <p>Language training and employability programs in Canada</p>
            </div>
            <div className="impact-item">
              <span className="impact-bullet">→</span>
              <p>Youth mentorship and leadership development initiatives</p>
            </div>
            <div className="impact-item">
              <span className="impact-bullet">→</span>
              <p>Internship placements for university students and international scholars</p>
            </div>
            <div className="impact-item">
              <span className="impact-bullet">→</span>
              <p>Community relief efforts during public health crises and natural disasters</p>
            </div>
          </div>

          <p className="impact-result">
            Through these programs, participants have secured employment, launched small businesses, continued 
            their education, and strengthened their role as leaders within their communities.
          </p>
        </div>
      </div>
    </section>
  )
}

export default OurStory

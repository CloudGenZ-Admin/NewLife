import React from 'react'

const Mission = () => {
  return (
    <section className="mission-section" id="about">
      <div className="container">
        <div className="mission-content">
          <div className="mission-text">
            <h3>NewLife Project Inc.</h3>
            <span className="section-subtitle">Our Story</span>
            <p>
              NewLife Project is a Non-Profit Organization which was founded by Brenda Williams 
              in Freetown, Sierra Leone to reach out to underprivileged women. The project was 
              born from an evangelical campaign in 1994 with a dedication to bringing new life 
              to at-risk women and children.
            </p>
            <p>
              NewLife Project has touched the lives of over a thousand lives including women, 
              men, and children in different communities in Cote d'Ivoire, Sierra Leone, and 
              Ghana through our Vocational Training Programs, Women's Forum, Rehabilitation 
              Centre, organized Health Clinics, and Relief Programs. In 2014, we established 
              a centre in Canada to help women and youth in our community.
            </p>
            <a href="#timeline" className="cta-button">
              OUR JOURNEY
              <span className="arrow">→</span>
            </a>
          </div>
          <div className="mission-image">
            <img 
              src="https://newlifeprojectinc.org/cdn/shop/files/Untitled_design.jpg?v=1705364217" 
              alt="NewLife Project Mission" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mission
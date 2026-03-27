import '../../styles/Partnerships.css'

const Partnerships = () => {

  return (
    <section className="partnerships-section">
      <div className="container">
        <div className="partnerships-header">
          <h2>Partnerships</h2>
          <p className="partnerships-intro">
            NewLife Project collaborates with universities, government individuals & institutions, 
            community organizations, and corporate partners to expand opportunities for program participants.
          </p>
        </div>

        <div className="partnerships-content">
          <div className="partnership-card">
            <div className="partnership-icon">🎓</div>
            <h3>Experiential Learning</h3>
            <p>Placements for students and researchers</p>
          </div>

          <div className="partnership-card">
            <div className="partnership-icon">👥</div>
            <h3>Leadership Development</h3>
            <p>Initiatives for community leaders</p>
          </div>

          <div className="partnership-card">
            <div className="partnership-icon">💼</div>
            <h3>Vocational Training</h3>
            <p>Funding for skills development</p>
          </div>

          <div className="partnership-card">
            <div className="partnership-icon">🌐</div>
            <h3>Community Outreach</h3>
            <p>Cultural engagement programs</p>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="partner-logos">
          <h3 className="partner-logos-title">Our Trusted Partners</h3>
          <div className="partner-logos-grid">
            <div className="partner-logo">
              <img
                src="./partner_1.webp"
                alt="Partner Logo"
              />
            </div>
            <div className="partner-logo">
              <img
                src="./partner_2.webp"
                alt="Partner Logo"
              />
            </div>
            <div className="partner-logo">
              <img
                src="./partner_3.webp"
                alt="Employment and Social Development Canada"
              />
            </div>
          </div>
        </div>

        <div className="partnerships-footer">
          <p>
            Through collaboration, NewLife strengthens its ability to deliver meaningful impact and create
            sustainable pathways for empowerment.
          </p>
          <a href="/contact" className="partnership-cta">Become a Partner</a>
        </div>
      </div>
    </section>
  )
}

export default Partnerships

import '../../styles/Partnerships.css'

const Partnerships = () => {

  return (
    <section className="partnerships-section">
      <div className="container">
        <div className="partnerships-header">
          <h2>Partnerships</h2>
          <p className="partnerships-intro">
            NewLife Project collaborates with universities, government individual & institutions, community organizations,
            and corporate partners to expand opportunities for program participants.
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
                src="https://cdn.shopify.com/s/files/1/0506/2515/1173/files/shaver.jpg?v=1705189748"
                alt="Partner Logo"
              />
            </div>
            <div className="partner-logo">
              <img
                src="https://cdn.shopify.com/s/files/1/0506/2515/1173/t/4/assets/unnamed-1-1648509740521.png?v=1648509741"
                alt="Partner Logo"
              />
            </div>
            <div className="partner-logo">
              <img
                src="https://cdn.shopify.com/s/files/1/0506/2515/1173/t/4/assets/employmentandsocialdevelopmentcanada_540x-1648509640669.png?v=1648509641"
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
          <a href="#contact" className="partnership-cta">Become a Partner</a>
        </div>
      </div>
    </section>
  )
}

export default Partnerships

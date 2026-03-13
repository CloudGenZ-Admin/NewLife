import React, { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3>Sign up for the latest NewLife news</h3>
            <p>and receive %10 coupon code for first order</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="subscribe-btn">
                Subscribe
                <span className="arrow">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
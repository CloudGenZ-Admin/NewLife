import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Mission from '../components/Mission'
import Gallery from '../components/Gallery'
import Newsletter from '../components/Newsletter'
import LatestNews from '../components/LatestNews'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Mission />
      <Gallery />
      <Newsletter />
      <LatestNews />
      <Footer />
    </div>
  )
}

export default Home
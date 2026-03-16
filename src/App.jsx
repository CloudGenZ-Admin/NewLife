import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import Home from './pages/Home'
import About from './pages/About'
import OurAfrica from './pages/OurAfrica'
import Programs from './pages/Programs'
import GetInvolved from './pages/GetInvolved'
import Contact from './pages/Contact'
import ShippingPolicy from './pages/ShippingPolicy'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-africa" element={<OurAfrica />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
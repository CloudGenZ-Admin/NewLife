import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import Home from './pages/Home'
import About from './pages/About'
import OurAfrica from './pages/OurAfrica'
import GetInvolved from './pages/GetInvolved'
import Contact from './pages/Contact'
import ShippingPolicy from './pages/ShippingPolicy'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import Empowerment from './pages/Empowerment'
import LanguageTraining from './pages/LanguageTraining'
import SewingEntrepreneurship from './pages/SewingEntrepreneurship'
import InternshipEngagement from './pages/InternshipEngagement'
import ReliefProgram from './pages/ReliefProgram'
import FundraiserExhibitions from './pages/FundraiserExhibitions'
import VocationalTraining from './pages/VocationalTraining'
import Shop from './pages/shop/Shop'
import ProductDetails from './pages/shop/ProductDetails'
import Cart from './pages/shop/Cart'
import Checkout from './pages/shop/Checkout'
import Auth from './pages/shop/Auth'
import Account from './pages/shop/Account'
import Wishlist from './pages/shop/Wishlist'
import OrderDetails from './pages/shop/OrderDetails'
import React, { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

function App() {
  useEffect(() => {
    // Single global Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    window.lenis = lenis

    return () => {
      lenis.destroy()
      window.lenis = null
    }
  }, [])

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/our-africa" element={<OurAfrica />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/programs/empowerment" element={<Empowerment />} />
                <Route path="/programs/language" element={<LanguageTraining />} />
                <Route path="/programs/sewing" element={<SewingEntrepreneurship />} />
                <Route path="/programs/internship" element={<InternshipEngagement />} />
                <Route path="/programs/relief" element={<ReliefProgram />} />
                <Route path="/fundraiser-exhibitions" element={<FundraiserExhibitions />} />
                <Route path="/vocational-training" element={<VocationalTraining />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/product/:id" element={<ProductDetails />} />
                <Route path="/shop/cart" element={<Cart />} />
                <Route path="/shop/checkout" element={<Checkout />} />
                <Route path="/shop/auth" element={<Auth />} />
                <Route path="/shop/account" element={<Account />} />
                <Route path="/shop/wishlist" element={<Wishlist />} />
                <Route path="/order/:id" element={<OrderDetails />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
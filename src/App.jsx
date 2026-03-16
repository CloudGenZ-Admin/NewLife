import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import Home from './pages/Home'
import About from './pages/About'
import OurAfrica from './pages/OurAfrica'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-africa" element={<OurAfrica />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { Portfolio } from './pages/Portfolio'

export default function App() {
  const location = useLocation()
  return <AnimatePresence mode="wait"><Routes location={location} key={location.pathname}><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/portfolio" element={<Portfolio />} /><Route path="/contact" element={<Contact />} /></Routes></AnimatePresence>
}

import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppContact from './components/WhatsAppContact.jsx'
import PageBackground from './components/PageBackground.jsx'
import Index from './pages/Index.jsx'
import Filiales from './pages/Filiales.jsx'
import Contact from './pages/Contact.jsx'
import APropos from './pages/A-propos.jsx'
import Tarifs from './pages/Tarifs.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'

function RouteHashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return undefined
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      target?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

function AppContent() {
  return (
    <BrowserRouter>
      <RouteHashScroll />
      <PageBackground />
      <Navbar />
      <main className="tn-page-content">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/filiales" element={<Filiales />} />
          <Route path="/filiales/:slug" element={<Filiales />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/agences" element={<Navigate to="/contact#cp-locations" replace />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Index />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppContact />
    </BrowserRouter>
  )
}

export default function App() {
  return <LanguageProvider><AppContent /></LanguageProvider>
}

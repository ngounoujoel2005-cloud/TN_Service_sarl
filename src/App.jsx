import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppContact from './components/WhatsAppContact.jsx'
import PageBackground from './components/PageBackground.jsx'
import Index from './pages/Index.jsx'
import Filiales from './pages/Filiales.jsx'
import Contact from './pages/Contact.jsx'
import APropos from './pages/A-propos.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <PageBackground />
      <Navbar />
      <main className="tn-page-content">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/filiales" element={<Filiales />} />
          <Route path="/filiales/:slug" element={<Filiales />} />
          <Route path="/tarifs" element={<section className="tn-simple-page"><h1>Tarifs</h1><p>Découvrez les tarifs de nos services TN SERVICES.</p></section>} />
          <Route path="/agences" element={<section className="tn-simple-page"><h1>Nos agences</h1><p>Retrouvez nos campus et agences à Douala.</p></section>} />
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

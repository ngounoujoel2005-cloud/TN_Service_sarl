import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Globe2, Info, Layers3, MapPin, Menu, Moon, Send, X } from 'lucide-react'
import itcLogo from '../assets/training-center-logo.jpeg'
import travelLogo from '../assets/travel-tours-logo.jpeg'
import gestionLogo from '../assets/gestion-fiscalite-logo.jpeg'
import driveproLogo from '../assets/drivepro-logo.jpeg'
import lorenaLogo from '../assets/lorena-logo.png'
import tnServicesLogo from '../assets/tn-services-logo.jpeg'
import './Navbar.css'

const links = [
  { to: '/a-propos', label: 'À propos', icon: Info },
  { to: '/contact', label: 'Contact/Localisation', icon: MapPin },
]
const branches = [
  { slug: 'itc', label: 'International Training Center', image: itcLogo },
  { slug: 'travel', label: 'TN Travel & Tours', image: travelLogo },
  { slug: 'gestion', label: 'TN Gestion & Fiscalité', image: gestionLogo },
  { slug: 'drivepro', label: 'DrivePro Academy', image: driveproLogo },
  { slug: 'lorena', label: 'Lorena E-Commerce', image: lorenaLogo },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [branchesOpen, setBranchesOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const branchMenuRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!branchMenuRef.current?.contains(event.target)) setBranchesOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setBranchesOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <header className={`tn-header${darkMode ? ' tn-header--dark' : ''}`}>
      <div className="tn-navbar">
        <Link className="tn-navbar__brand" to="/" aria-label="TN Services, accueil" onClick={() => { setMenuOpen(false); setBranchesOpen(false) }}>
          <span className="tn-navbar__seal"><img src={tnServicesLogo} alt="" /></span>
          <span className="tn-navbar__wordmark">TN <b>SERVICES</b></span>
        </Link>
        <button className="tn-navbar__menu-toggle" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`tn-navbar__links${menuOpen ? ' is-open' : ''}`} aria-label="Navigation principale">
          <NavLink to="/" end className={({ isActive }) => `tn-navbar__link${isActive ? ' is-active' : ''}`} onClick={() => { setMenuOpen(false); setBranchesOpen(false) }}>
            <span className="tn-navbar__home-icon" aria-hidden="true">⌂</span><span>Accueil</span>
          </NavLink>
          <div ref={branchMenuRef} className={`tn-navbar__branch-menu${branchesOpen ? ' is-open' : ''}${pathname.startsWith('/filiales') ? ' is-active' : ''}`}>
            <button className="tn-navbar__link tn-navbar__branch-trigger" type="button" aria-expanded={branchesOpen} onClick={() => setBranchesOpen(!branchesOpen)}>
              <Layers3 size={17} strokeWidth={2.2} /><span>Filiales</span><ChevronDown className="tn-navbar__chevron" size={15} />
            </button>
            <div className="tn-navbar__dropdown">
              {branches.map((branch) => <Link className={`tn-navbar__dropdown-link tn-navbar__dropdown-link--${branch.slug}`} key={branch.slug} to={`/filiales/${branch.slug}`} onClick={() => { setBranchesOpen(false); setMenuOpen(false) }}>
                <img src={branch.image} alt="" /><span>{branch.label}</span>
              </Link>)}
              <Link className="tn-navbar__all-branches" to="/filiales" onClick={() => { setBranchesOpen(false); setMenuOpen(false) }}>Toutes les filiales</Link>
            </div>
          </div>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `tn-navbar__link${isActive ? ' is-active' : ''}`} onClick={() => { setMenuOpen(false); setBranchesOpen(false) }}>
              <Icon size={17} strokeWidth={2.2} /><span>{label}</span>
            </NavLink>
          ))}
          <div className="tn-navbar__tools">
            <button className="tn-navbar__round" type="button" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? 'Activer le thème clair' : 'Activer le thème sombre'} aria-pressed={darkMode}><Moon size={18} /></button>
            <button className="tn-navbar__language" type="button" aria-label="Langue : français"><Globe2 size={17} /><b>FR</b><span>/ EN</span></button>
            <Link className="tn-navbar__signup" to="/contact" onClick={() => { setMenuOpen(false); setBranchesOpen(false) }}><Send size={17} /> Pré-inscription</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

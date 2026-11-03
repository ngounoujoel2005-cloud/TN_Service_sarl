import { Heart, Mail, MapPin, Phone, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'
import tnLogo from '../assets/tn-services-logo.jpeg'
import lorenaLogo from '../assets/lorena-logo.png'
import gestionLogo from '../assets/gestion-fiscalite-logo.jpeg'
import itcLogo from '../assets/training-center-logo.jpeg'
import travelLogo from '../assets/travel-tours-logo.jpeg'
import driveproLogo from '../assets/drivepro-logo.jpeg'

const entities = [
  { image: tnLogo, name: 'TN Services', detail: 'Maison Mère', slug: '' },
  { image: itcLogo, name: 'Training Center', detail: 'Informatique & Langues', slug: 'itc' },
  { image: travelLogo, name: 'Travel & Tours', detail: 'Visas & Billetterie', slug: 'travel' },
  { image: gestionLogo, name: 'Gestion & Fiscalité', detail: 'Conseil & Caisses POS', slug: 'gestion' },
  { image: driveproLogo, name: 'DrivePro Academy', detail: 'Auto-École A, B, C, D, E', slug: 'drivepro' },
  { image: lorenaLogo, name: 'Lorena', detail: 'www.lorena.cm', slug: 'lorena' },
]


const quickLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/filiales', label: 'Toutes les filiales' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/agences', label: 'Agences' },
  { to: '/contact', label: 'Contact & localisation' },
  { to: '/#services', label: 'Nos services' },
  { to: '/#siege', label: 'Notre siège' },
  { to: '/#bureaux', label: 'Horaires & bureaux' },
  { to: '/#partenaires', label: 'Nos partenaires' },
]

function EntityGroup({ duplicate = false }) {
  return (
    <div className="tnf-entities__group" aria-hidden={duplicate || undefined}>
      {entities.map((entity) => <Link className={`tnf-entity${entity.slug ? ` is-${entity.slug}` : ' is-tn'}`} to={entity.slug ? `/filiales/${entity.slug}` : '/'} key={entity.name} tabIndex={duplicate ? -1 : undefined}>
        <span className="tnf-entity__mark"><img src={entity.image} alt="" /></span>
        <strong>{entity.name}</strong><small>{entity.detail}</small>
      </Link>)}
    </div>
  )
}

function SocialLink({ children, label }) {
  return <a className={`tnf-social__link tnf-social__link--${label.toLowerCase()}`} href="#reseaux" aria-label={label}><span>{children}</span>{label}<ArrowUpRight size={15} /></a>
}

export default function Footer() {
  return (
    <footer className="tnf" aria-label="Pied de page TN SERVICES">
      <section className="tnf-entities" aria-label="Entités et marques du groupe">
        <div className="tnf-entities__heading"><h2>LES ENTITÉS &amp; MARQUES OFFICIELLES DU GROUPE TN SERVICES :</h2><span>DOUALA, CAMEROUN</span></div>
        <div className="tnf-entities__viewport"><div className="tnf-entities__track"><EntityGroup /><EntityGroup duplicate /></div></div>
      </section>

      <div className="tnf__inner">
        <section className="tnf-social" id="reseaux">
          <div className="tnf-social__message"><span className="tnf-social__heart"><Heart size={24} fill="currentColor" /></span><div><h2>REJOIGNEZ LA COMMUNAUTÉ TN SERVICES SUR LES RÉSEAUX SOCIAUX</h2><p>Retrouvez nos vidéos TikTok, offres d'emploi, bourses de voyage, promos Lorena et conseils gestion.</p></div></div>
          <div className="tnf-social__links"><SocialLink label="TikTok">♪</SocialLink><SocialLink label="Facebook">f</SocialLink><SocialLink label="Instagram">◎</SocialLink><SocialLink label="LinkedIn">in</SocialLink></div>
        </section>

        <div className="tnf__grid">
          <div className="tnf__col">
            <Link to="/" className="tnf__logo" aria-label="TN SERVICES, accueil"><span className="tnf__seal"><img src={tnLogo} alt="" /></span><span>TN <b>SERVICES</b></span></Link>
            <p className="tnf__slogan">« Chacun y trouve son compte »</p>
            <p className="tnf__about">TN SERVICES SARL · Écosystème d’entreprises agréé MINEFOP &amp; Ministère des Transports : formation certifiante en informatique &amp; langues, voyages et services.</p>
          </div>
          <nav className="tnf__col" aria-label="Liens rapides"><h2 className="tnf__title">LIENS RAPIDES</h2><ul className="tnf__quicklinks">{quickLinks.map(({ to, label }) => <li key={to}>{to.includes('#') ? <a href={to}>{label}<ArrowUpRight size={13} /></a> : <Link to={to}>{label}<ArrowUpRight size={13} /></Link>}</li>)}</ul></nav>
          <div className="tnf__col"><h2 className="tnf__title">CAMPUS DE DOUALA</h2><div className="tnf__place"><MapPin className="is-green" size={18} /><p><strong>Direction Nkolbong :</strong><span>Face Station Total Nkolbong,<br />Carrefour Tradex</span></p></div><div className="tnf__place"><MapPin className="is-blue" size={18} /><p><strong>Agence &amp; Piste Yassa :</strong><span>Axe Lourd Douala-Yaoundé (à 200m Stade Japoma)</span></p></div></div>
          <div className="tnf__col"><h2 className="tnf__title">CONTACTS &amp; AGRÉMENTS</h2><div className="tnf__contact"><Phone size={17} /><a href="tel:+237698062575">698 06 25 75</a><span>/</span><a href="tel:+237653994010">653 99 40 10</a></div><div className="tnf__contact"><Mail size={17} /><a className="tnf__email" href="mailto:contact@tngroup.cm">contact@tngroup.cm</a></div><div className="tnf__contact tnf__approval"><ShieldCheck size={17} /><strong>Agréé MINEFOP &amp; Ministère des Transports</strong></div><p className="tnf__hours">Lundi - Samedi : 08h00 - 18h30</p></div>
        </div>
        <div className="tnf__bottom"><span>© {new Date().getFullYear()} TN SERVICES SARL. Tous droits réservés.</span><span>design by <strong> ngounou joel | </strong> 682-693-232 / 658-630-460 </span><span>Douala, Littoral, Cameroun · <em>Chacun y trouve son compte</em></span></div>
      </div>
    </footer>
  )
}

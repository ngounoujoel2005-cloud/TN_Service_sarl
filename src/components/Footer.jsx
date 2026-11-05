import { Heart, Mail, MapPin, Phone, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Footer.css'
import tnLogo from '../assets/tn-services-logo.jpeg'
import lorenaLogo from '../assets/lorena-logo.png'
import gestionLogo from '../assets/gestion-fiscalite-logo.jpeg'
import itcLogo from '../assets/training-center-logo.jpeg'
import travelLogo from '../assets/travel-tours-logo.jpeg'
import driveproLogo from '../assets/drivepro-logo.jpeg'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const entities = [
  { image: tnLogo, name: 'TN Services', detail: 'Maison Mère', slug: '' },
  { image: itcLogo, name: 'Training Center', detail: 'Informatique & Langues', slug: 'itc' },
  { image: travelLogo, name: 'Travel & Tours', detail: 'Visas & Billetterie', slug: 'travel' },
  { image: gestionLogo, name: 'Gestion & Fiscalité', detail: 'Conseil & Caisses POS', slug: 'gestion' },
  { image: driveproLogo, name: 'DrivePro Academy', detail: 'Auto-École A, B, C, D, E', slug: 'drivepro' },
  { image: lorenaLogo, name: 'Lorena', detail: 'www.lorena.cm', slug: 'lorena' },
]

const entityDetailsEn = ['Parent company', 'IT & Languages', 'Visas & Flights', 'Advisory & POS', 'Driving School', 'www.lorena.cm']


const quickLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/filiales', label: 'Toutes les filiales' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/tarifs', label: 'Tarifs et offres' },
  { to: '/contact#cp-locations', label: 'Agences et localisation' },
  { to: '/contact', label: 'Contact & localisation' },
  { to: '/contact#contact-form', label: 'Pré-inscription' },
  { to: '/#services', label: 'Nos services' },
  { to: '/#siege', label: 'Notre siège' },
  { to: '/#bureaux', label: 'Horaires & bureaux' },
  { to: '/a-propos#partenaires', label: 'Nos partenaires' },
]

const quickLinkKeys = {
  '/': 'footer.home',
  '/filiales': 'footer.allBranches',
  '/a-propos': 'footer.about',
  '/tarifs': 'footer.prices',
  '/contact#cp-locations': 'footer.agencies',
  '/contact': 'footer.contact',
  '/contact#contact-form': 'footer.preRegistration',
  '/#services': 'footer.services',
  '/#siege': 'footer.headquarters',
  '/#bureaux': 'footer.hours',
  '/a-propos#partenaires': 'footer.partners',
}

function EntityGroup({ duplicate = false, language = 'fr' }) {
  return (
    <div className="tnf-entities__group" aria-hidden={duplicate || undefined}>
      {entities.map((entity, index) => <Link className={`tnf-entity${entity.slug ? ` is-${entity.slug}` : ' is-tn'}`} to={entity.slug ? `/filiales/${entity.slug}` : '/'} key={entity.name} tabIndex={duplicate ? -1 : undefined}>
        <span className="tnf-entity__mark"><img src={entity.image} alt="" /></span>
        <strong>{entity.name}</strong><small>{language === 'en' ? entityDetailsEn[index] : entity.detail}</small>
      </Link>)}
    </div>
  )
}

function SocialLink({ children, label }) {
  return <a className={`tnf-social__link tnf-social__link--${label.toLowerCase()}`} href="#reseaux" aria-label={label}><span>{children}</span>{label}<ArrowUpRight size={15} /></a>
}

export default function Footer() {
  const { language, t } = useLanguage()
  return (
    <footer className="tnf" aria-label={t('footer.aria', 'Pied de page TN SERVICES')}>
      <section className="tnf-entities" aria-label={t('footer.entities', 'Entites et marques du groupe')}>
        <div className="tnf-entities__heading"><h2>{t('footer.entities', 'LES ENTITES ET MARQUES OFFICIELLES DU GROUPE TN SERVICES :')}</h2><span>{t('footer.city', 'DOUALA, CAMEROUN')}</span></div>
        <div className="tnf-entities__viewport"><div className="tnf-entities__track"><EntityGroup language={language} /><EntityGroup duplicate language={language} /></div></div>
      </section>

      <div className="tnf__inner">
        <section className="tnf-social" id="reseaux">
          <div className="tnf-social__message"><span className="tnf-social__heart"><Heart size={24} fill="currentColor" /></span><div><h2>{t('footer.socialTitle', 'REJOIGNEZ LA COMMUNAUTE TN SERVICES SUR LES RESEAUX SOCIAUX')}</h2><p>{t('footer.socialDescription', 'Retrouvez nos videos TikTok, offres d emploi, bourses de voyage, promos Lorena et conseils gestion.')}</p></div></div>
          <div className="tnf-social__links"><SocialLink label="TikTok">♪</SocialLink><SocialLink label="Facebook">f</SocialLink><SocialLink label="Instagram">◎</SocialLink><SocialLink label="LinkedIn">in</SocialLink></div>
        </section>

        <div className="tnf__grid">
          <div className="tnf__col">
            <Link to="/" className="tnf__logo" aria-label="TN SERVICES, accueil"><span className="tnf__seal"><img src={tnLogo} alt="" /></span><span>TN <b>SERVICES</b></span></Link>
            <p className="tnf__slogan">{t('footer.companySlogan', 'Chacun y trouve son compte')}</p>
            <p className="tnf__about">{t('footer.companyDescription', 'TN SERVICES SARL - Ecosysteme d entreprises agree MINEFOP et Ministere des Transports : formation certifiante en informatique et langues, voyages et services.')}</p>
          </div>
          <nav className="tnf__col" aria-label={t('footer.quickLinks', 'Liens rapides')}><h2 className="tnf__title">{t('footer.quickLinks', 'LIENS RAPIDES')}</h2><ul className="tnf__quicklinks">{quickLinks.map(({ to, label }) => <li key={to}><Link to={to}>{t(quickLinkKeys[to], label)}<ArrowUpRight size={13} /></Link></li>)}</ul></nav>
          <div className="tnf__col"><h2 className="tnf__title">{t('footer.campus', 'CAMPUS DE DOUALA')}</h2><div className="tnf__place"><MapPin className="is-green" size={18} /><p><strong>{t('footer.direction', 'Direction Nkolbong :')}</strong><span>{t('footer.directionAddress', 'Face au Complexe Le Ciel, Nkolbong')}</span></p></div><div className="tnf__place"><MapPin className="is-blue" size={18} /><p><strong>{t('footer.agency', 'Agence et piste Yassa :')}</strong><span>{t('footer.agencyAddress', 'Rond-point de Yassa, cote marche, Douala')}</span></p></div></div>
          <div className="tnf__col"><h2 className="tnf__title">{t('footer.contacts', 'CONTACTS ET AGREMENTS')}</h2><div className="tnf__contact"><Phone size={17} /><a href="tel:+237698062575">698 06 25 75</a><span>/</span><a href="tel:+237653994010">653 99 40 10</a></div><div className="tnf__contact"><Mail size={17} /><a className="tnf__email" href="mailto:contact@tngroup.cm">contact@tngroup.cm</a></div><div className="tnf__contact tnf__approval"><ShieldCheck size={17} /><strong>{t('footer.approval', 'Agree MINEFOP et Ministere des Transports')}</strong></div><p className="tnf__hours">{t('footer.openingHours', 'Lundi - Samedi : 08h00 - 18h30')}</p></div>
        </div>
        <div className="tnf__bottom"><span>&copy; {new Date().getFullYear()} TN SERVICES SARL. {t('footer.rights', 'Tous droits reserves.')}</span><span>design by <strong> ngounou joel | </strong> 682-693-232 / 658-630-460 </span><span>{t('footer.location', 'Douala, Littoral, Cameroun')} - <em>{t('footer.companySlogan', 'Chacun y trouve son compte')}</em></span></div>
      </div>
    </footer>
  )
}

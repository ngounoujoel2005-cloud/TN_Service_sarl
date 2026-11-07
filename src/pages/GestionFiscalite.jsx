import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  CalendarClock,
  Clock3,
  FileCheck2,
  FileText,
  ReceiptText,
  ShieldCheck,
  UserRoundCheck,
} from 'lucide-react'
import gestionLogo from '../assets/gestion-fiscalite-logo.jpeg'
import companySetupPhoto from '../assets/filiales/creation-entreprise.jpg'
import fiscalSupportPhoto from '../assets/filiales/gestion-fiscale.jpg'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import BranchMissionShowcase from '../components/BranchMissionShowcase.jsx'
import './InternationalTrainingCenter.css'

const missions = [
  {
    Icon: Building2,
    title: 'Création d’entreprise et immatriculation',
    text: 'Accompagnement dans la création et l’immatriculation de votre entreprise, de la préparation du dossier aux formalités administratives.',
    titleEn: 'Business creation and registration',
    textEn: 'Support with setting up and registering your business, from preparing the file through the administrative steps.',
    tag: 'Création · Immatriculation',
    tagEn: 'Company setup · Registration',
  },
  {
    Icon: UserRoundCheck,
    title: 'Accompagnement entrepreneurial',
    text: 'Conseils pratiques et suivi pour structurer votre activité, organiser sa gestion et avancer à chaque étape de votre projet.',
    titleEn: 'Entrepreneurial guidance',
    textEn: 'Practical advice and support to structure your business, organize its management, and move your project forward.',
    tag: 'Conseil aux entreprises',
    tagEn: 'Business support',
  },
  {
    Icon: FileCheck2,
    title: 'Accompagnement CNPS et déclarations TSF',
    text: 'Aide à la constitution et au suivi des dossiers CNPS, ainsi qu’à la préparation et au dépôt des déclarations TSF.',
    titleEn: 'CNPS support and TSF declarations',
    textEn: 'Help preparing and following CNPS files, as well as preparing and submitting TSF declarations.',
    tag: 'CNPS · TSF',
    tagEn: 'CNPS · TSF',
  },
  {
    Icon: ReceiptText,
    title: 'Caisses et solutions POS',
    text: 'Informatisation et gestion des caisses et systèmes POS pour faciliter le suivi des ventes et les opérations de votre commerce.',
    titleEn: 'Cash registers and POS solutions',
    textEn: 'Computerized setup and management of cash registers and POS systems to help track sales and run your shop.',
    tag: 'Informatisation · Gestion',
    tagEn: 'Digital setup · Management',
  },
]

export default function GestionFiscalite() {
  const { language, t } = useLanguage()
  const isEnglish = language === 'en'
  const name = t('branch.gestion.name', 'TN Gestion & Fiscalité')

  useEffect(() => {
    const page = document.querySelector('.tn-gestion-page')
    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const elements = Array.from(page.querySelectorAll('[data-reveal]'))
    const textSelector = 'h1,h2,h3,p,span,strong,small,a,.tn-itc-hero__actions,.tn-itc-card__tag,.tn-itc-hours__item,.tn-itc-discount__proof'
    const textByContainer = new Map()
    const textTimers = new Map()
    elements.forEach((element) => {
      const textItems = Array.from(element.querySelectorAll(textSelector)).filter((item) => item.closest('[data-reveal]') === element)
      textItems.forEach((item, index) => {
        item.dataset.revealText = 'true'
        item.dataset.textVisible = 'false'
        item.style.setProperty('--reveal-text-delay', `${Math.min(index * 65, 325)}ms`)
      })
      textByContainer.set(element, textItems)
    })

    let previousY = window.scrollY
    let scrollDirection = 1
    const trackScroll = () => {
      const currentY = window.scrollY
      if (currentY !== previousY) scrollDirection = currentY > previousY ? 1 : -1
      previousY = currentY
    }
    window.addEventListener('scroll', trackScroll, { passive: true })
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target
        if (entry.isIntersecting) {
          element.dataset.revealed = 'true'
          delete element.dataset.exiting
          textByContainer.get(element)?.forEach((item) => { item.dataset.textVisible = 'false' })
          window.clearTimeout(textTimers.get(element))
          textTimers.set(element, window.setTimeout(() => {
            textByContainer.get(element)?.forEach((item) => { item.dataset.textVisible = 'true' })
            textTimers.delete(element)
          }, 760))
        } else if (scrollDirection < 0 && entry.boundingClientRect.top >= window.innerHeight) {
          element.dataset.exiting = 'true'
          element.dataset.revealed = 'false'
          window.clearTimeout(textTimers.get(element))
          textTimers.delete(element)
          textByContainer.get(element)?.forEach((item) => { item.dataset.textVisible = 'false' })
        } else if (scrollDirection > 0 && entry.boundingClientRect.bottom <= 0) {
          element.dataset.revealed = 'false'
          delete element.dataset.exiting
          window.clearTimeout(textTimers.get(element))
          textTimers.delete(element)
          textByContainer.get(element)?.forEach((item) => { item.dataset.textVisible = 'false' })
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })

    elements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', trackScroll)
      textTimers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  return (
    <div className="tn-itc-page tn-gestion-page">
      <section className="tn-itc-hero" data-reveal data-reveal-direction="top">
        <div className="tn-itc-hero__copy">
          <p className="tn-itc-kicker"><Calculator size={17} />{isEnglish ? 'TN SERVICES GROUP · BUSINESS & TAX SUPPORT' : 'GROUPE TN SERVICES · GESTION & FISCALITÉ'}</p>
          <div className="tn-itc-hero__brand"><span><img src={gestionLogo} alt={`Logo ${name}`} /></span><span>{isEnglish ? 'Douala · Cameroon' : 'Douala · Cameroun'}</span></div>
          <h1>{name}</h1>
          <p className="tn-itc-hero__motto">{isEnglish ? 'Manage better, pay fairly.' : 'Gérez mieux, payez juste.'}</p>
          <p className="tn-itc-hero__intro">{isEnglish
            ? 'Your partner for setting up and registering a business, entrepreneurial guidance, CNPS support, TSF declarations, and computerized cash register and POS management.'
            : 'Votre partenaire pour la création et l’immatriculation d’entreprise, l’accompagnement entrepreneurial, les dossiers CNPS, les déclarations TSF, ainsi que l’informatisation et la gestion des caisses et systèmes POS.'}</p>
          <div className="tn-itc-hero__actions">
            <Link to="/contact" className="tn-itc-primary">{isEnglish ? 'Talk to an adviser' : 'Parler à un conseiller'}<ArrowRight size={18} /></Link>
            <a href="#gestion-missions" className="tn-itc-secondary">{isEnglish ? 'Explore our services' : 'Découvrir nos prestations'}</a>
          </div>
        </div>
        <figure className="tn-itc-hero__photo">
          <img src={companySetupPhoto} alt={isEnglish ? 'A team planning a new business together' : 'Une équipe qui prépare la création d’une entreprise'} />
          <figcaption><FileCheck2 size={19} /><span><strong>{isEnglish ? 'Clear books. Confident decisions.' : 'Des comptes clairs, des décisions éclairées.'}</strong><small>{isEnglish ? 'Practical support for your business' : 'Un accompagnement concret pour votre activité'}</small></span></figcaption>
        </figure>
      </section>

      <BranchMissionShowcase
        id="gestion-missions"
        eyebrow={isEnglish ? 'OUR EXPERTISE' : 'NOTRE SAVOIR-FAIRE'}
        heading={isEnglish ? 'Our missions and services' : 'Nos missions et attributions'}
        missions={missions}
        logo={gestionLogo}
        isEnglish={isEnglish}
      />

      <section className="tn-itc-learning" data-reveal data-reveal-direction="right">
        <div className="tn-itc-learning__visual">
          <img src={fiscalSupportPhoto} alt={isEnglish ? 'A financial adviser meeting with business clients' : 'Un conseiller qui accompagne des clients en gestion'} />
          <div className="tn-itc-learning__visual-caption"><span><Building2 size={18} /></span><div><strong>{isEnglish ? 'Your business, well supported' : 'Votre entreprise bien accompagnée'}</strong><small>{isEnglish ? 'From the first steps to ongoing advice' : 'De la création au suivi de votre activité'}</small></div></div>
        </div>
        <div className="tn-itc-learning__copy">
          <p className="tn-itc-overline">{isEnglish ? 'BUSINESS SETUP · FROM START TO FINISH' : 'CRÉATION D’ENTREPRISE · DE A À Z'}</p>
          <h2>{isEnglish ? 'Set up your company in 72 hours.' : 'Créez votre entreprise en 72 heures.'}</h2>
          <p>{isEnglish
            ? 'We coordinate the administrative steps, from preparing your articles of association to registration and obtaining your tax identification number (NIU) and commercial register documents.'
            : 'Nous coordonnons les démarches administratives, de la rédaction des statuts à l’immatriculation, jusqu’à l’obtention du numéro d’identifiant fiscal (NIU) et des documents du registre du commerce.'}</p>
          <div className="tn-itc-hours">
            <div className="tn-itc-hours__item"><span><Clock3 size={18} /></span><div><strong>{isEnglish ? 'Guaranteed 72-hour turnaround' : 'Délai garanti de 72 heures'}</strong><small>{isEnglish ? 'A fast, simplified process from start to finish' : 'Une procédure accélérée et simplifiée de A à Z'}</small></div></div>
            <div className="tn-itc-hours__item"><span><FileText size={18} /></span><div><strong>{isEnglish ? 'Full administrative support' : 'Prise en charge intégrale'}</strong><small>{isEnglish ? 'From drafting to official documents' : 'Des statuts aux documents officiels'}</small></div></div>
            <div className="tn-itc-hours__item"><span><BadgeCheck size={18} /></span><div><strong>{isEnglish ? 'Registration and records' : 'Immatriculation et documents'}</strong><small>{isEnglish ? 'NIU and commercial register' : 'NIU et registre du commerce'}</small></div></div>
          </div>
          <div className="tn-itc-schedule-note"><CalendarClock size={18} /><span>{isEnglish ? 'The full setup process is designed to be completed within three business days.' : 'La procédure complète vise une finalisation en trois jours ouvrés.'}</span></div>
        </div>
      </section>

      <section className="tn-itc-discount" data-reveal data-reveal-direction="left">
        <div className="tn-itc-discount__offer">
          <span className="tn-itc-discount__icon"><Building2 size={29} /></span>
          <p className="tn-itc-overline">{isEnglish ? 'EXPRESS COMPANY SETUP' : 'CRÉATION D’ENTREPRISE EXPRESS'}</p>
          <div className="tn-itc-discount__amount"><strong>72</strong><span>h</span></div>
          <h2>{isEnglish ? 'to set up your company' : 'pour créer votre entreprise'}</h2>
          <p>{isEnglish ? 'Registration and full legal setup in three business days, from drafting to your official records.' : 'Immatriculation et finalisation du statut légal en trois jours ouvrés, de la rédaction aux documents officiels.'}</p>
        </div>
        <div className="tn-itc-discount__details">
          <span className="tn-itc-section-heading__icon"><UserRoundCheck size={21} /></span>
          <p className="tn-itc-overline">{isEnglish ? 'PERSONALIZED, OPTIONAL SUPPORT' : 'SUIVI CLIENTÈLE PERSONNALISÉ ET OPTIONNEL'}</p>
          <h2>{isEnglish ? 'Choose an adviser and plan that fit your business.' : 'Choisissez un suivi adapté à votre entreprise.'}</h2>
          <p>{isEnglish
            ? 'A dedicated tax adviser can answer day-to-day questions, prepare periodic reviews, and alert you to deadlines. Choose an optional monthly or annual accounting and tax plan based on your business volume and priorities, without unnecessary commitments.'
            : 'Un conseiller fiscal dédié répond à vos questions du quotidien, réalise des bilans périodiques et vous alerte sur vos échéances. Choisissez un abonnement mensuel ou annuel de suivi comptable et fiscal selon le volume de votre activité et vos priorités, sans engagement inutile.'}</p>
          <div className="tn-itc-discount__proof"><CalendarClock size={20} /><span>{isEnglish ? 'Monthly or annual plan, tailored to your needs' : 'Formule mensuelle ou annuelle, adaptée à vos besoins'}</span></div>
          <Link to="/contact" className="tn-itc-contact-link">{isEnglish ? 'Discuss a support plan' : 'Choisir une formule de suivi'}<ArrowRight size={17} /></Link>
        </div>
      </section>

      <nav className="tn-itc-bottom-nav" aria-label={isEnglish ? 'Accounting and tax subsidiary navigation' : 'Navigation de la filiale'}>
        <Link to="/filiales"><ArrowLeft size={17} />{t('page.allBranchesBack', 'Voir toutes les filiales')}</Link>
        <Link to="/contact">{isEnglish ? 'Contact our team' : 'Contacter notre équipe'}<ArrowRight size={17} /></Link>
      </nav>
    </div>
  )
}

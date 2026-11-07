import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Globe2,
  HandCoins,
  LockKeyhole,
  Plane,
  ShieldCheck,
} from 'lucide-react'
import travelLogo from '../assets/travel-tours-logo.jpeg'
import travelPhoto from '../assets/filiales/voyage-international.jpg'
import travelFeaturePhoto from '../assets/filiales/voyage-nouvelle-image.jpg'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import BranchMissionShowcase from '../components/BranchMissionShowcase.jsx'
import './InternationalTrainingCenter.css'

const missions = [
  {
    Icon: Globe2,
    title: 'Canada : visas pour vos projets',
    text: 'Accompagnement pour les visas de travail, d’études, de résidence et de tourisme au Canada.',
    titleEn: 'Canada: visas for your plans',
    textEn: 'Guidance with work, study, residence, and visitor visa applications for Canada.',
    tag: 'Canada',
    tagEn: 'Canada',
  },
  {
    Icon: FileCheck2,
    title: 'Espace Schengen',
    text: 'Accompagnement pour les visas de travail, d’études et de tourisme dans l’espace Schengen.',
    titleEn: 'Schengen area',
    textEn: 'Guidance with work, study, and visitor visa applications for the Schengen area.',
    tag: 'Europe',
    tagEn: 'Europe',
  },
  {
    Icon: BriefcaseBusiness,
    title: 'Dubaï : travail et tourisme',
    text: 'Information et accompagnement pour préparer vos démarches de visa de travail ou de tourisme à Dubaï.',
    titleEn: 'Dubai: work and tourism',
    textEn: 'Information and guidance to prepare work or visitor visa applications for Dubai.',
    tag: 'Dubaï',
    tagEn: 'Dubai',
  },
  {
    Icon: Plane,
    title: 'Chine : études et tourisme',
    text: 'Accompagnement pour les demandes de visa d’études et de tourisme pour la Chine.',
    titleEn: 'China: study and tourism',
    textEn: 'Guidance with study and visitor visa applications for China.',
    tag: 'Chine',
    tagEn: 'China',
  },
]

export default function TravelTours() {
  const { language, t } = useLanguage()
  const isEnglish = language === 'en'
  const name = t('branch.travel.name', 'TN Travel & Tours')

  useEffect(() => {
    const page = document.querySelector('.tn-travel-page')
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
    <div className="tn-itc-page tn-travel-page">
      <section className="tn-itc-hero" data-reveal data-reveal-direction="top">
        <div className="tn-itc-hero__copy">
          <p className="tn-itc-kicker"><Plane size={17} />{isEnglish ? 'TN SERVICES GROUP · INTERNATIONAL MOBILITY' : 'GROUPE TN SERVICES · MOBILITÉ INTERNATIONALE'}</p>
          <div className="tn-itc-hero__brand"><span><img src={travelLogo} alt={`Logo ${name}`} /></span><span>{isEnglish ? 'Douala · Cameroon' : 'Douala · Cameroun'}</span></div>
          <h1>{name}</h1>
          <p className="tn-itc-hero__motto">{isEnglish ? 'Speak the world. Work anywhere.' : 'Parlez au monde, travaillez partout.'}</p>
          <p className="tn-itc-hero__intro">{isEnglish
            ? 'TN Travel & Tours supports your international travel plans with destination-specific visa guidance for Canada, the Schengen area, Dubai, and China, as well as ticketing and travel planning.'
            : 'TN Travel & Tours vous accompagne dans vos projets de mobilité avec des démarches de visa adaptées à chaque destination : Canada, espace Schengen, Dubaï et Chine, ainsi que la billetterie et la préparation de voyage.'}</p>
          <div className="tn-itc-hero__actions">
            <Link to="/contact" className="tn-itc-primary">{isEnglish ? 'Discuss your travel plans' : 'Parler de votre projet de voyage'}<ArrowRight size={18} /></Link>
            <a href="#travel-missions" className="tn-itc-secondary">{isEnglish ? 'Explore our services' : 'Découvrir nos services'}</a>
          </div>
        </div>
        <figure className="tn-itc-hero__photo">
          <img src={travelFeaturePhoto} alt={isEnglish ? 'Airplane at sunset with passports and travel documents' : 'Avion au coucher du soleil avec passeports et documents de voyage'} />
          <figcaption><Globe2 size={19} /><span><strong>{isEnglish ? 'Your next destination' : 'Votre prochaine destination'}</strong><small>{isEnglish ? 'Travel with a clear plan' : 'Voyagez avec un projet bien préparé'}</small></span></figcaption>
        </figure>
      </section>

      <BranchMissionShowcase
        id="travel-missions"
        eyebrow={isEnglish ? 'OUR EXPERTISE' : 'NOTRE SAVOIR-FAIRE'}
        heading={isEnglish ? 'Visa services by destination' : 'Nos visas selon votre destination'}
        missions={missions}
        logo={travelLogo}
        isEnglish={isEnglish}
      />

      <section className="tn-itc-learning" data-reveal data-reveal-direction="right">
        <div className="tn-itc-learning__visual">
          <img src={travelPhoto} alt={isEnglish ? 'Travel planning and international mobility' : 'Préparation d’un voyage et mobilité internationale'} />
          <div className="tn-itc-learning__visual-caption"><span><ShieldCheck size={18} /></span><div><strong>{isEnglish ? 'Guidance at every step' : 'Un accompagnement à chaque étape'}</strong><small>{isEnglish ? 'Clear information and follow-up' : 'Des informations claires et un suivi'}</small></div></div>
        </div>
        <div className="tn-itc-learning__copy">
          <p className="tn-itc-overline">{isEnglish ? 'RELIABLE SUPPORT' : 'UN ACCOMPAGNEMENT FIABLE'}</p>
          <h2>{isEnglish ? 'Speed and security at every stage.' : 'Rapidité et sécurité à chaque étape.'}</h2>
          <p>{isEnglish
            ? 'We organize the steps of your application and keep you informed as your plans move forward, with care for your documents and personal information.'
            : 'Nous optimisons chaque étape pour limiter les retards administratifs superflus, vous informons en temps réel et veillons à la sécurité de vos données personnelles et financières.'}</p>
          <div className="tn-itc-hours">
            <div className="tn-itc-hours__item"><span><Clock3 size={18} /></span><div><strong>{isEnglish ? 'Prompt processing' : 'Traitement dans les meilleurs délais'}</strong><small>{isEnglish ? 'Optimized steps to avoid unnecessary delays' : 'Des étapes optimisées pour éviter les retards superflus'}</small></div></div>
            <div className="tn-itc-hours__item"><span><LockKeyhole size={18} /></span><div><strong>{isEnglish ? 'Privacy and security' : 'Sécurité et confidentialité'}</strong><small>{isEnglish ? 'Protection of personal and financial information' : 'Protection des données personnelles et financières'}</small></div></div>
            <div className="tn-itc-hours__item"><span><CheckCircle2 size={18} /></span><div><strong>{isEnglish ? 'Real-time follow-up' : 'Suivi en temps réel'}</strong><small>{isEnglish ? 'Transparent updates on your application progress' : 'Une information transparente sur l’avancement du dossier'}</small></div></div>
          </div>
          <div className="tn-itc-schedule-note"><CalendarClock size={18} /><span>{isEnglish ? 'Our advisers explain the steps and documents needed for your selected service.' : 'Nos conseillers vous expliquent les étapes et les documents utiles selon votre démarche.'}</span></div>
        </div>
      </section>

      <section className="tn-itc-discount" data-reveal data-reveal-direction="left">
        <div className="tn-itc-discount__offer">
          <span className="tn-itc-discount__icon"><HandCoins size={29} /></span>
          <p className="tn-itc-overline">{isEnglish ? 'A FLEXIBLE PAYMENT OPTION' : 'UNE OPTION DE PAIEMENT FLEXIBLE'}</p>
          <div className="tn-itc-discount__amount tn-travel-payment"><strong>{isEnglish ? 'After' : 'Après'}</strong></div>
          <h2>{isEnglish ? 'visa approval' : 'obtention du visa'}</h2>
          <p>{isEnglish ? 'A major portion of the service fees may be deferred or tied to the effective approval of your visa, depending on the agreed terms.' : 'Une partie majeure des frais de service peut être conditionnée ou reportée à l’obtention effective du visa, selon les conditions convenues.'}</p>
        </div>
        <div className="tn-itc-discount__details">
          <span className="tn-itc-section-heading__icon"><BadgeCheck size={21} /></span>
          <p className="tn-itc-overline">{isEnglish ? 'FOR YOUR PEACE OF MIND' : 'POUR VOUS ENGAGER SEREINEMENT'}</p>
          <h2>{isEnglish ? 'A “zero risk” option for hesitant clients.' : 'Une option « Zéro Risque » pour les clients hésitants.'}</h2>
          <p>{isEnglish
            ? 'This option is designed to build confidence and show our full commitment: a significant part of the service fees is postponed or made conditional on your visa being granted. Ask our team to explain the terms that apply to your project.'
            : 'Cette approche témoigne de notre engagement à vos côtés et vous offre davantage de sérénité : une partie majeure des frais de service est reportée ou conditionnée à l’obtention effective de votre visa. Notre équipe vous précise les modalités applicables à votre projet.'}</p>
          <div className="tn-itc-discount__proof"><ShieldCheck size={20} /><span>{isEnglish ? 'Transparent payment terms discussed with your adviser' : 'Des modalités de paiement expliquées avec votre conseiller'}</span></div>
          <Link to="/contact" className="tn-itc-contact-link">{isEnglish ? 'Ask about this payment option' : 'Se renseigner sur cette option de paiement'}<ArrowRight size={17} /></Link>
        </div>
      </section>

      <nav className="tn-itc-bottom-nav" aria-label={isEnglish ? 'Travel agency navigation' : 'Navigation de la filiale'}>
        <Link to="/filiales"><ArrowLeft size={17} />{t('page.allBranchesBack', 'Voir toutes les filiales')}</Link>
        <Link to="/contact">{isEnglish ? 'Contact our team' : 'Contacter notre équipe'}<ArrowRight size={17} /></Link>
      </nav>
    </div>
  )
}

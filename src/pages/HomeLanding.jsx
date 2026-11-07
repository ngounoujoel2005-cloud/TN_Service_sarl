import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BadgeCheck, Building2, Calculator, CarFront, ChevronLeft, ChevronRight, Clock3, GraduationCap, MapPin, Pause, Plane, Play, ShoppingBag, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import tnLogo from '../assets/tn-services-logo.jpeg'
import itcLogo from '../assets/training-center-logo.jpeg'
import travelLogo from '../assets/travel-tours-logo.jpeg'
import gestionLogo from '../assets/gestion-fiscalite-logo.jpeg'
import driveproLogo from '../assets/drivepro-logo.jpeg'
import lorenaLogo from '../assets/lorena-logo.png'
import headquartersImage from '../assets/home-headquarters-reference.png'
import officeTeamImage from '../assets/hero-office-team.png'
import accueilGestionImage from '../assets/filiales/accueil-gestion-fiscalite.jpg'
import accueilLorenaImage from '../assets/filiales/accueil-lorena-commerce.jpg'
import accueilLanguagesImage from '../assets/filiales/accueil-langues.jpg'
import accueilTravelImage from '../assets/filiales/accueil-travel.jpg'
import accueilDriveProImage from '../assets/filiales/accueil-drivepro.jpg'
import afgLogo from '../assets/partner-afg.png'
import canalLogo from '../assets/partner-canal.jpg'
import cgamLogo from '../assets/partner-cgam.jpeg'
import cnpsLogo from '../assets/partner-cnps.jpg'
import ecobankLogo from '../assets/partner-ecobank.jpg'
import kremlinLogo from '../assets/partner-kremlin.jpg'
import allInOneLogo from '../assets/partner-all-in-one.jpeg'
import starTimesLogo from '../assets/partner-startimes-alt.png'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './HomeLanding.css'

const subsidiaries = [
  {
    slug: 'itc', name: 'International Training Center', short: 'Formation & langues', slogan: 'Parlez au monde. Travaillez partout.',
    description: 'Cours d’allemand, italien, anglais, chinois et français, préparation au TCF et formations professionnelles adaptées à vos objectifs.',
    services: ['Allemand · Italien · Anglais', 'Chinois · Français · TCF', 'Cours de vacances enfants'], logo: itcLogo, visual: accueilLanguagesImage, position: 'center center', accent: '#32a852', tint: 'rgba(50,168,82,.15)', icon: GraduationCap,
  },
  {
    slug: 'travel', name: 'TN Travel & Tours', short: 'Immigration & visas', slogan: 'Explorez le monde avec confiance.',
    description: 'Visas de travail, d’études, de résidence ou de tourisme selon la destination, avec billetterie et accompagnement au voyage.',
    services: ['Canada · Schengen', 'Dubaï · Chine', 'Visas & billetterie'], logo: travelLogo, visual: accueilTravelImage, position: 'center center', accent: '#1599ec', tint: 'rgba(21,153,236,.15)', icon: Plane,
  },
  {
    slug: 'gestion', name: 'TN Gestion & Fiscalité', short: 'Gestion & fiscalité', slogan: 'Gérez mieux, payez juste.',
    description: 'Création et immatriculation, accompagnement entrepreneurial, dossiers CNPS, déclarations TSF et gestion de caisses.',
    services: ['Création · Immatriculation', 'CNPS · TSF', 'Caisses & POS'], logo: gestionLogo, visual: accueilGestionImage, position: 'center center', accent: '#268a4b', tint: 'rgba(38,138,75,.15)', icon: Calculator,
  },
  {
    slug: 'drivepro', name: 'DrivePro Academy', short: 'Auto-école agréée', slogan: 'La route vers votre autonomie.',
    description: 'Cours d’auto-école, accompagnement à la production et au renouvellement du permis, et séances de recyclage.',
    services: ['Cours de conduite', 'Permis · Renouvellement', 'Recyclage'], logo: driveproLogo, visual: accueilDriveProImage, position: 'center center', accent: '#ed9418', tint: 'rgba(237,148,24,.16)', icon: CarFront,
  },
  {
    slug: 'lorena', name: 'Lorena E-Commerce', short: 'Boutique en ligne', slogan: 'La technologie à portée de clic.',
    description: 'Une boutique en ligne pour la maison, le travail et le quotidien, avec livraison à domicile à Douala et Yaoundé et expédition partout au Cameroun.',
    services: ['Catalogue multi-catégories', 'Livraison Douala · Yaoundé', 'Expédition au Cameroun'], logo: lorenaLogo, visual: accueilLorenaImage, position: 'center center', accent: '#9b27d4', tint: 'rgba(155,39,212,.14)', icon: ShoppingBag,
  },
]

const partners = [
  { name: 'AFG Capital', image: afgLogo },
  { name: 'CANAL+', image: canalLogo },
  { name: 'CGA NMEC Consulting', image: cgamLogo },
  { name: 'CNPS', image: cnpsLogo },
  { name: 'Ecobank', image: ecobankLogo },
  { name: 'Kremelin Medical', image: kremlinLogo },
  { name: 'All in One Business and Services', image: allInOneLogo },
  { name: 'StarTimes', image: starTimesLogo },
]

const subsidiaryEnglish = {
  itc: { short: 'Training & Languages', slogan: 'Speak the world. Work anywhere.', services: ['German · Italian · English', 'Chinese · French · TCF', 'Holiday courses for children'] },
  travel: { short: 'Immigration & Visas', slogan: 'Explore the world with confidence.', services: ['Canada · Schengen', 'Dubai · China', 'Visas & ticketing'] },
  gestion: { short: 'Business support', slogan: 'Manage better. Pay fairly.', services: ['Setup · Registration', 'CNPS · TSF', 'Cash registers & POS'] },
  drivepro: { short: 'Driving school', slogan: 'The road to independence.', services: ['Driving lessons', 'Licence renewal', 'Refresher courses'] },
  lorena: { short: 'Online Store', slogan: 'Technology at your fingertips.', services: ['Home & everyday items', 'Douala · Yaoundé delivery', 'Cameroon-wide shipping'] },
}

const introSlides = [
  {
    key: 'group', accent: '#35a653', image: officeTeamImage, imagePosition: 'center',
    eyebrowFr: 'TN SERVICES SARL · DOUALA', eyebrowEn: 'TN SERVICES SARL · DOUALA',
    titleFr: 'Un écosystème d’excellence :', highlightFr: 'formation, mobilité, gestion et e-commerce', suffixFr: ' à Douala.',
    titleEn: 'A complete ecosystem:', highlightEn: 'training, travel, management and e-commerce', suffixEn: ' in Douala.',
    descriptionFr: 'Cinq filiales complémentaires accompagnent les étudiants, les professionnels et les entreprises dans leurs projets.',
    descriptionEn: 'Five complementary subsidiaries support students, professionals, and businesses with their plans.',
    altFr: 'Une équipe de professionnels noirs qui travaille ensemble dans un bureau', altEn: 'A team of Black professionals working together in an office',
    captionFr: 'Une équipe à vos côtés', captionEn: 'A team by your side',
    primaryFr: 'Pré-inscription en ligne', primaryEn: 'Online pre-registration', primaryTo: '/contact#contact-form',
    secondaryFr: 'Nos promotions pour les jeunes', secondaryEn: 'Offers for young people', secondaryTo: '/tarifs',
  },
  {
    key: 'gestion', accent: '#268a4b', image: accueilGestionImage, imagePosition: 'center 54%',
    eyebrowFr: 'TN GESTION & FISCALITÉ', eyebrowEn: 'TN ACCOUNTING & TAX SUPPORT',
    titleFr: 'Faites avancer votre entreprise avec', highlightFr: 'les bonnes formalités', suffixFr: '.',
    titleEn: 'Move your business forward with', highlightEn: 'the right support', suffixEn: '.',
    descriptionFr: 'Création et immatriculation, accompagnement entrepreneurial, dossiers CNPS, déclarations TSF et gestion de caisses et systèmes POS.',
    descriptionEn: 'Business creation and registration, entrepreneurial guidance, CNPS files, TSF declarations, and cash register and POS management.',
    altFr: 'Une personne qui prépare ses comptes et suit ses chiffres dans un bureau', altEn: 'A person preparing accounts and reviewing figures in an office',
    captionFr: 'Gérez mieux, payez juste.', captionEn: 'Manage better, pay fairly.',
    primaryFr: 'Parler à un conseiller', primaryEn: 'Talk to an adviser', primaryTo: '/contact',
    secondaryFr: 'Découvrir la filiale', secondaryEn: 'Discover the subsidiary', secondaryTo: '/filiales/gestion',
  },
  {
    key: 'itc', accent: '#32a852', image: accueilLanguagesImage, imagePosition: 'center 55%',
    eyebrowFr: 'INTERNATIONAL TRAINING CENTER', eyebrowEn: 'INTERNATIONAL TRAINING CENTER',
    titleFr: 'Apprenez une langue et développez', highlightFr: 'des compétences utiles', suffixFr: '.',
    titleEn: 'Learn a language and build', highlightEn: 'skills for your future', suffixEn: '.',
    descriptionFr: 'Langues : 25 000 à 50 000 F ; TCF : 50 000 F par mois ; formations professionnelles : 30 000 à 50 000 F. Les étudiants éligibles bénéficient aussi de 10 % de réduction.',
    descriptionEn: 'Languages: CFA 25,000–50,000; TCF: CFA 50,000 per month; professional courses: CFA 30,000–50,000. Eligible students also receive a 10% discount.',
    altFr: 'Des livres de langues posés sur un ordinateur pour illustrer les cours', altEn: 'Language books on a computer illustrating the courses',
    captionFr: 'Parlez au monde, travaillez partout.', captionEn: 'Speak the world. Work anywhere.',
    primaryFr: 'Parler à un conseiller', primaryEn: 'Talk to an adviser', primaryTo: '/contact',
    secondaryFr: 'Voir les formations', secondaryEn: 'Explore the courses', secondaryTo: '/filiales/itc',
  },
  {
    key: 'travel', accent: '#1599ec', image: accueilTravelImage, imagePosition: 'center 55%',
    eyebrowFr: 'TN TRAVEL & TOURS · VISAS ET VOYAGES', eyebrowEn: 'TN TRAVEL & TOURS · VISAS AND TRAVEL',
    titleFr: 'Préparez votre projet de voyage vers', highlightFr: 'le Canada, Schengen, Dubaï ou la Chine', suffixFr: '.',
    titleEn: 'Plan your travel project to', highlightEn: 'Canada, Schengen, Dubai, or China', suffixEn: '.',
    descriptionFr: 'Visas de travail, d’études, de résidence et de tourisme au Canada ; visas de travail, d’études et de tourisme pour Schengen ; travail et tourisme à Dubaï ; études et tourisme en Chine.',
    descriptionEn: 'Work, study, residence, and visitor visas for Canada; work, study, and visitor visas for Schengen; work and visitor visas for Dubai; study and visitor visas for China.',
    altFr: 'Une voyageuse et ses bagages dans un aéroport avec des destinations internationales', altEn: 'A traveller and luggage at an airport with international destinations',
    captionFr: 'Explorez le monde avec confiance.', captionEn: 'Explore the world with confidence.',
    primaryFr: 'Parler à un conseiller', primaryEn: 'Talk to an adviser', primaryTo: '/contact',
    secondaryFr: 'Découvrir la filiale', secondaryEn: 'Discover the subsidiary', secondaryTo: '/filiales/travel',
  },
  {
    key: 'drivepro', accent: '#ed9418', image: accueilDriveProImage, imagePosition: 'center',
    eyebrowFr: 'DRIVEPRO ACADEMY · AUTO-ÉCOLE', eyebrowEn: 'DRIVEPRO ACADEMY · DRIVING SCHOOL',
    titleFr: 'Prenez la route avec', highlightFr: 'plus de maîtrise et de confiance', suffixFr: '.',
    titleEn: 'Get on the road with', highlightEn: 'confidence and control', suffixEn: '.',
    descriptionFr: 'Cours d’auto-école, accompagnement pour la production et le renouvellement du permis, et recyclage pour les conducteurs déjà titulaires.',
    descriptionEn: 'Driving lessons, support with licence issuance and renewal, and refresher training for drivers who already hold a licence.',
    altFr: 'Une illustration des panneaux et règles de circulation pour les cours d’auto-école', altEn: 'An illustration of traffic signs and road rules for driving lessons',
    captionFr: 'Conduire aujourd’hui, réussir demain.', captionEn: 'Drive today, succeed tomorrow.',
    primaryFr: 'Parler à un conseiller', primaryEn: 'Talk to an adviser', primaryTo: '/contact',
    secondaryFr: 'Découvrir la filiale', secondaryEn: 'Discover the subsidiary', secondaryTo: '/filiales/drivepro',
  },
]

function HomeIntroCarousel({ language, t }) {
  const isEnglish = language === 'en'
  const [activeIndex, setActiveIndex] = useState(0)
  const [transition, setTransition] = useState(null)
  const [paused, setPaused] = useState(false)
  const activeRef = useRef(0)
  const directionRef = useRef(1)
  const resetTimerRef = useRef(null)

  const goToSlide = (nextIndex, direction) => {
    const currentIndex = activeRef.current
    if (nextIndex === currentIndex) return
    activeRef.current = nextIndex
    window.clearTimeout(resetTimerRef.current)
    setTransition({ from: currentIndex, to: nextIndex, direction, phase: 'preparing' })
    setActiveIndex(nextIndex)
    window.requestAnimationFrame(() => {
      setTransition((current) => current?.to === nextIndex ? { ...current, phase: 'moving' } : current)
    })
    resetTimerRef.current = window.setTimeout(() => {
      setTransition((current) => current?.to === nextIndex ? null : current)
    }, 1050)
  }

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => {
      const currentIndex = activeRef.current
      if (currentIndex === introSlides.length - 1) directionRef.current = -1
      else if (currentIndex === 0) directionRef.current = 1
      const direction = directionRef.current
      goToSlide(currentIndex + direction, direction)
    }, 6800)
    return () => window.clearInterval(timer)
  }, [paused])

  useEffect(() => () => window.clearTimeout(resetTimerRef.current), [])

  const showPrevious = () => {
    const next = (activeRef.current - 1 + introSlides.length) % introSlides.length
    directionRef.current = -1
    goToSlide(next, -1)
  }
  const showNext = () => {
    const next = (activeRef.current + 1) % introSlides.length
    directionRef.current = 1
    goToSlide(next, 1)
  }

  return (
    <section className="tn-home-intro" role="region" aria-label={t('home.carouselLabel', 'Présentation du groupe et de ses filiales')} aria-roledescription={t('home.carouselRole', 'carrousel')}>
      {introSlides.map((slide, index) => {
        const isOutgoing = transition?.from === index
        const isIncoming = transition?.to === index
        const slideState = !transition && activeIndex === index
          ? 'is-active'
          : isOutgoing
            ? `is-leaving-${transition.direction > 0 ? 'forward' : 'backward'}`
            : isIncoming
              ? `is-incoming-${transition.direction > 0 ? 'forward' : 'backward'}${transition.phase === 'moving' ? ' is-moving' : ''}`
              : ''

        if (!slideState) return null
        const title = isEnglish ? slide.titleEn : slide.titleFr
        const highlight = isEnglish ? slide.highlightEn : slide.highlightFr
        const suffix = isEnglish ? slide.suffixEn : slide.suffixFr

        return (
          <article className={`tn-home-intro__slide ${slideState}`} key={slide.key} style={{ '--intro-accent': slide.accent, '--intro-image-position': slide.imagePosition }} aria-hidden={index !== activeIndex} aria-label={`${index + 1} / ${introSlides.length}`}>
            <div className="tn-home-intro__copy">
              <div className="tn-home-kicker"><Sparkles size={16} /><span>{isEnglish ? slide.eyebrowEn : slide.eyebrowFr}</span><i /><em>{t('home.motto', 'Chacun y trouve son compte')}</em></div>
              <h1>{title} <span>{highlight}</span>{suffix}</h1>
              <p>{isEnglish ? slide.descriptionEn : slide.descriptionFr}</p>
              <div className="tn-home-intro__actions">
                <Link className="tn-home-primary" to={slide.primaryTo}>{isEnglish ? slide.primaryEn : slide.primaryFr}<ArrowRight size={18} /></Link>
                <Link className="tn-home-secondary" to={slide.secondaryTo}>{isEnglish ? slide.secondaryEn : slide.secondaryFr}<ArrowRight size={17} /></Link>
              </div>
            </div>
            <figure className="tn-home-intro__photo">
              <img src={slide.image} alt={isEnglish ? slide.altEn : slide.altFr} />
              <figcaption>{isEnglish ? slide.captionEn : slide.captionFr}</figcaption>
            </figure>
          </article>
        )
      })}
      <div className="tn-home-intro__controls" aria-label={t('home.carouselControls', 'Commandes du carrousel')}>
        <button type="button" onClick={showPrevious} aria-label={t('home.previousSlide', 'Présentation précédente')}><ChevronLeft size={18} /></button>
        <span aria-live="polite">{activeIndex + 1} / {introSlides.length}</span>
        <button type="button" onClick={showNext} aria-label={t('home.nextSlide', 'Présentation suivante')}><ChevronRight size={18} /></button>
        <button type="button" onClick={() => setPaused((current) => !current)} aria-label={paused ? t('home.resumeSlides', 'Reprendre le défilement') : t('home.pauseSlides', 'Mettre en pause le défilement')}>
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
      </div>
    </section>
  )
}

function SubsidiaryCard({ branch, index, language, t }) {
  const Icon = branch.icon
  const copy = language === 'en' ? subsidiaryEnglish[branch.slug] : branch
  const branchName = t('branch.' + branch.slug + '.name', branch.name)
  const branchDescription = t('branch.' + branch.slug + '.description', branch.description)
  const fallbackPromo = branch.slug === 'itc' ? 'Cours vacances enfants · 15 000 F' : branch.slug === 'travel' ? 'Visas Canada · Schengen · Dubaï · Chine' : branch.slug === 'gestion' ? 'Entreprise · CNPS · TSF' : branch.slug === 'drivepro' ? 'Cours · Permis · Recyclage' : 'Livraison Douala · Yaoundé'

  return (
    <article className={'tn-branch-card tn-branch-card--' + branch.slug} data-reveal data-reveal-direction={index % 2 === 0 ? 'left' : 'right'} style={{ '--branch-accent': branch.accent, '--branch-tint': branch.tint, '--branch-visual': 'url(' + branch.visual + ')', '--branch-position': branch.position }}>
      <div className="tn-branch-card__visual">
        <span className="tn-branch-card__label"><Icon size={15} />{copy.short}</span>
        <span className="tn-branch-card__photo-tag">{t('home.promo.' + branch.slug, fallbackPromo)}</span>
      </div>
      <div className="tn-branch-card__body">
        <div className="tn-branch-card__heading">
          <span className="tn-branch-card__logo"><img src={branch.logo} alt={'Logo ' + branchName} /></span>
          <div><h3>{branchName}</h3><p>{copy.slogan}</p></div>
        </div>
        <p className="tn-branch-card__description">{branchDescription}</p>
        <div className="tn-branch-card__tags">{copy.services.map((service) => <span key={service}>{service}</span>)}</div>
        <a className="tn-branch-card__link" href={'/filiales/' + branch.slug}>{branch.slug === 'lorena' ? t('home.discoverStore', 'Accéder à la boutique Lorena') : t('home.discoverBranch', 'Découvrir la filiale')}<ArrowRight size={18} /></a>
      </div>
    </article>
  )
}

function PartnerGroup({ duplicate = false }) {
  return (
    <div className="tn-partners__group" aria-hidden={duplicate || undefined}>
      {partners.map((partner) => <article className="tn-partner-card" key={partner.name}><div><img src={partner.image} alt={duplicate ? '' : `Logo ${partner.name}`} loading="lazy" /></div><span>{partner.name}</span></article>)}
    </div>
  )
}

export default function HomeLanding() {
  const { language, t } = useLanguage()
  useEffect(() => {
    const elements = document.querySelectorAll('.tn-homepage [data-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const textSelector = 'h1,h2,h3,p,span,strong,small,a,.tn-branch-card__tags,.tn-branch-card__link,.tn-home-intro__actions'
    const textByContainer = new Map()
    const textTimers = new Map()
    elements.forEach((element) => {
      const textItems = Array.from(element.querySelectorAll(textSelector)).filter((item) => item.closest('[data-reveal]') === element)
      textItems.forEach((item, index) => {
        item.dataset.revealText = 'true'
        item.dataset.textVisible = 'false'
        item.style.setProperty('--reveal-text-delay', `${Math.min(index * 55, 275)}ms`)
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
          }, 850))
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
    <div className="tn-homepage">
      <HomeIntroCarousel language={language} t={t} />

      <section className="tn-home-proof" data-reveal data-reveal-direction="left" aria-label={t('home.proofLabel', 'Agrement et localisations')}>
        <span><BadgeCheck size={18} /> {t('home.approval', 'Agreer MINEFOP et Ministere des Transports')}</span><i />
        <span><MapPin size={18} /> {t('home.locations', 'Nkolbong, face au Complexe Le Ciel - Yassa, rond-point cote marche')}</span>
      </section>

      <section className="tn-headquarters" id="siege" data-reveal data-reveal-direction="right" style={{ '--headquarters-image': `url(${headquartersImage})` }} aria-label={t('home.headquarters', 'Siege social TN Services a Douala')}>
        <span className="tn-headquarters__city">{t('home.city', 'DOUALA - CAMEROUN')}</span>
        <div className="tn-headquarters__caption"><span className="tn-headquarters__logo"><img src={tnLogo} alt="" /></span><div><strong>TN SERVICES SARL</strong><b>{t('home.headquarters', 'Siege social et campus Douala')}</b><p>{t('home.locations', 'Nkolbong, face au Complexe Le Ciel - Yassa, rond-point cote marche')}</p></div></div>
      </section>

      <section className="tn-subsidiaries" data-reveal data-reveal-direction="left" id="services">
        <div className="tn-section-heading"><div><span>{t('home.ecosystem', 'NOTRE ECOSYSTEME')}</span><h2>{t('home.sectionTitle', 'Cinq expertises, une meme ambition.')}</h2></div><p>{t('home.sectionDescription', 'Des equipes et des services complementaires vous accompagnent a chaque etape.')}</p></div>
        <div className="tn-subsidiaries__grid">{subsidiaries.map((branch, index) => <SubsidiaryCard key={branch.slug} branch={branch} index={index} language={language} t={t} />)}</div>
      </section>

      <section className="tn-office-hours" id="bureaux" data-reveal data-reveal-direction="right">
        <div className="tn-office-hours__intro"><span className="tn-section-icon"><Clock3 size={22} /></span><div><span>{t('home.welcome', 'NOUS VOUS ACCUEILLONS')}</span><h2>{t('home.officeTitle', 'Nos horaires et bureaux')}</h2><p>{t('home.officeDescription', 'Nos equipes vous accueillent et vous accompagnent a Douala.')}</p></div></div>
        <div className="tn-office-hours__cards">
          <article className="tn-office-card" data-reveal data-reveal-direction="left"><div className="tn-office-card__icon"><Clock3 size={20} /></div><div><span>{t('home.opening', 'HORAIRES D OUVERTURE')}</span><h3>{t('home.weekdays', 'Lundi - Samedi')}</h3><p>{t('home.time', '08h00 - 18h30')}</p><small>{t('home.closed', 'Ferme le dimanche et les jours feries.')}</small></div></article>
          <article className="tn-office-card" data-reveal data-reveal-direction="bottom"><div className="tn-office-card__icon is-green"><Building2 size={20} /></div><div><span>{t('home.directionLabel', 'DIRECTION - NKOLBONG')}</span><h3>{t('home.headquartersTitle', 'Siege social et campus')}</h3><p>{t('home.headquartersAddress', 'Face au Complexe Le Ciel, Nkolbong, Douala.')}</p></div></article>
          <article className="tn-office-card" data-reveal data-reveal-direction="right"><div className="tn-office-card__icon is-blue"><MapPin size={20} /></div><div><span>{t('home.yassaLabel', 'AGENCE - YASSA')}</span><h3>{t('home.yassaTitle', 'Agence et piste auto-ecole')}</h3><p>{t('home.yassaAddress', 'Au rond-point de Yassa, cote du marche, Douala.')}</p></div></article>
        </div>
      </section>

      <section className="tn-partners" id="partenaires" data-reveal data-reveal-direction="left">
        <div className="tn-section-heading"><div><span>{t('home.trusted', 'ILS NOUS FONT CONFIANCE')}</span><h2>{t('home.partnersTitle', 'Nos partenaires')}</h2></div><p>{t('home.partnersDescription', 'Des partenaires institutionnels et prives qui soutiennent nos activites.')}</p></div>
        <div className="tn-partners__viewport" role="region" aria-label={t('home.partnersAria', 'Partenaires TN Services')} aria-roledescription={t('home.marquee', 'bande defilante')}><div className="tn-partners__track"><PartnerGroup /><PartnerGroup duplicate /></div></div>
      </section>
    </div>
  )
}

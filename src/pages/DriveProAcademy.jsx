import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  CalendarClock,
  CalendarDays,
  CarFront,
  FileCheck2,
  GraduationCap,
  Moon,
  RefreshCw,
  ShieldCheck,
  Sun,
  UserRoundCheck,
} from 'lucide-react'
import driveProLogo from '../assets/drivepro-logo.jpeg'
import roadSafetyPhoto from '../assets/filiales/auto-ecole.jpg'
import instructorPhoto from '../assets/filiales/drivepro-moniteur.jpg'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import BranchMissionShowcase from '../components/BranchMissionShowcase.jsx'
import './InternationalTrainingCenter.css'

const missions = [
  {
    Icon: CarFront,
    title: 'Cours d’auto-école et préparation au permis',
    text: 'Cours de code et leçons pratiques pour les permis des catégories A, B, C, D et E, avec préparation aux examens.',
    titleEn: 'Driving lessons and licence preparation',
    textEn: 'Theory and practical driving lessons for licence categories A, B, C, D, and E, with exam preparation.',
    tag: 'Code · Conduite',
    tagEn: 'Theory · Driving',
  },
  {
    Icon: FileCheck2,
    title: 'Accompagnement pour la production du permis',
    text: 'Aide pour préparer et suivre le dossier administratif lié à la production et à l’obtention du permis de conduire.',
    titleEn: 'Support with driving licence issuance',
    textEn: 'Help preparing and following the administrative file for the issuance and acquisition of a driving licence.',
    tag: 'Dossier · Permis',
    tagEn: 'Application · Licence',
  },
  {
    Icon: UserRoundCheck,
    title: 'Recyclage et perfectionnement',
    text: 'Des séances de remise à niveau pour les conducteurs déjà titulaires d’un permis qui souhaitent gagner en maîtrise et en confiance.',
    titleEn: 'Refresher lessons and advanced practice',
    textEn: 'Refresher sessions for licensed drivers who want to strengthen their driving skills and confidence.',
    tag: 'Plus de maîtrise',
    tagEn: 'Build your confidence',
  },
  {
    Icon: RefreshCw,
    title: 'Renouvellement du permis',
    text: 'Accompagnement dans les démarches et la préparation des pièces nécessaires au renouvellement du permis de conduire.',
    titleEn: 'Driving licence renewal',
    textEn: 'Guidance with the process and documents needed to renew a driving licence.',
    tag: 'Démarches de renouvellement',
    tagEn: 'Renewal process',
  },
]

export default function DriveProAcademy() {
  const { language, t } = useLanguage()
  const isEnglish = language === 'en'
  const name = t('branch.drivepro.name', 'DrivePro Academy')

  useEffect(() => {
    const page = document.querySelector('.tn-drivepro-page')
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
    <div className="tn-itc-page tn-drivepro-page">
      <section className="tn-itc-hero" data-reveal data-reveal-direction="top">
        <div className="tn-itc-hero__copy">
          <p className="tn-itc-kicker"><CarFront size={17} />{isEnglish ? 'TN SERVICES GROUP · APPROVED DRIVING SCHOOL' : 'GROUPE TN SERVICES · AUTO-ÉCOLE AGRÉÉE'}</p>
          <div className="tn-itc-hero__brand"><span><img src={driveProLogo} alt={`Logo ${name}`} /></span><span>{isEnglish ? 'Yassa · Douala' : 'Yassa · Douala'}</span></div>
          <h1>{name}</h1>
          <p className="tn-itc-hero__motto">{isEnglish ? 'Drive today, succeed tomorrow.' : 'Conduire aujourd’hui, réussir demain.'}</p>
          <p className="tn-itc-hero__intro">{isEnglish
            ? 'DrivePro Academy offers driving lessons, support with driving licence issuance and renewal, and refresher training for licensed drivers seeking greater confidence and control.'
            : 'DrivePro Academy propose des cours d’auto-école, un accompagnement pour la production et le renouvellement du permis, ainsi que des séances de recyclage pour les conducteurs qui veulent gagner en maîtrise.'}</p>
          <div className="tn-itc-hero__actions">
            <Link to="/contact" className="tn-itc-primary">{isEnglish ? 'Plan your training' : 'Organiser ma formation'}<ArrowRight size={18} /></Link>
            <a href="#drivepro-missions" className="tn-itc-secondary">{isEnglish ? 'Explore our training' : 'Découvrir nos formations'}</a>
          </div>
        </div>
        <figure className="tn-itc-hero__photo">
          <img src={instructorPhoto} alt={isEnglish ? 'Driving instructor with a learner vehicle' : 'Un moniteur de conduite avec un véhicule d’apprentissage'} />
          <figcaption><ShieldCheck size={19} /><span><strong>{isEnglish ? 'Skills for safer roads' : 'Des compétences pour une route plus sûre'}</strong><small>{isEnglish ? 'Learn with confidence' : 'Apprenez en toute confiance'}</small></span></figcaption>
        </figure>
      </section>

      <BranchMissionShowcase
        id="drivepro-missions"
        eyebrow={isEnglish ? 'LEARN TO DRIVE WITH CONFIDENCE' : 'APPRENEZ À CONDUIRE EN CONFIANCE'}
        heading={isEnglish ? 'Our missions and training' : 'Nos missions et attributions'}
        missions={missions}
        logo={driveProLogo}
        isEnglish={isEnglish}
      />

      <section className="tn-itc-learning" data-reveal data-reveal-direction="right">
        <div className="tn-itc-learning__visual">
          <img src={roadSafetyPhoto} alt={isEnglish ? 'Road signs and signals used in driving instruction' : 'Panneaux et feux de circulation étudiés pendant les cours de conduite'} />
          <div className="tn-itc-learning__visual-caption"><span><CarFront size={18} /></span><div><strong>{isEnglish ? 'Practice at your pace' : 'Pratiquez à votre rythme'}</strong><small>{isEnglish ? 'Theory and driving sessions' : 'Cours de code et heures de conduite'}</small></div></div>
        </div>
        <div className="tn-itc-learning__copy">
          <p className="tn-itc-overline">{isEnglish ? 'FLEXIBLE, PERSONALIZED SCHEDULES' : 'UN EMPLOI DU TEMPS FLEXIBLE ET SUR MESURE'}</p>
          <h2>{isEnglish ? 'Training planned around your availability.' : 'Des séances planifiées selon vos disponibilités.'}</h2>
          <p>{isEnglish
            ? 'We plan theory sessions and driving lessons around your work, school, and personal commitments, for a calm and steady learning experience.'
            : 'Les séances théoriques et les heures de conduite sont planifiées selon vos contraintes professionnelles, scolaires et personnelles pour apprendre sereinement.'}</p>
          <div className="tn-itc-hours">
            <div className="tn-itc-hours__item"><span><Sun size={18} /></span><div><strong>{isEnglish ? 'Daytime' : 'En journée'}</strong><small>{isEnglish ? 'Theory and driving sessions' : 'Cours théoriques et pratiques'}</small></div></div>
            <div className="tn-itc-hours__item"><span><Moon size={18} /></span><div><strong>{isEnglish ? 'Evening' : 'En soirée'}</strong><small>{isEnglish ? 'For busy weekdays' : 'Pour les journées chargées'}</small></div></div>
            <div className="tn-itc-hours__item"><span><CalendarDays size={18} /></span><div><strong>{isEnglish ? 'Weekends' : 'Le week-end'}</strong><small>{isEnglish ? 'Sessions that fit your schedule' : 'Des séances adaptées à votre emploi du temps'}</small></div></div>
          </div>
          <div className="tn-itc-schedule-note"><CalendarClock size={18} /><span>{isEnglish ? 'Choose the times that work for you and plan your lessons with the team.' : 'Choisissez les créneaux qui vous conviennent et planifiez vos séances avec l’équipe.'}</span></div>
        </div>
      </section>

      <section className="tn-itc-discount" data-reveal data-reveal-direction="left">
        <div className="tn-itc-discount__offer">
          <span className="tn-itc-discount__icon"><BadgePercent size={29} /></span>
          <p className="tn-itc-overline">{isEnglish ? 'A STUDENT PRICE ADVANTAGE' : 'UN TARIF PRÉFÉRENTIEL ÉTUDIANT'}</p>
          <div className="tn-itc-discount__amount"><strong>15</strong><span>%</span></div>
          <h2>{isEnglish ? 'student discount' : 'de réduction étudiante'}</h2>
          <p>{isEnglish ? 'A 15% discount applies to the full driving course fees for eligible students.' : 'Une remise de 15 % s’applique à la totalité des frais de formation au permis pour les étudiants éligibles.'}</p>
        </div>
        <div className="tn-itc-discount__details">
          <span className="tn-itc-section-heading__icon"><GraduationCap size={21} /></span>
          <p className="tn-itc-overline">{isEnglish ? 'STUDENT ELIGIBILITY' : 'CONDITION D’ÉLIGIBILITÉ'}</p>
          <h2>{isEnglish ? 'Bring proof of current enrollment.' : 'Présentez un justificatif de scolarité en cours.'}</h2>
          <p>{isEnglish
            ? 'To receive the 15% discount on driving lessons, students must present a valid school certificate or current enrollment receipt for the ongoing academic year.'
            : 'Pour bénéficier de la réduction de 15 % sur la formation au permis, l’étudiant doit présenter un certificat de scolarité valide ou un reçu d’inscription en cours de validité pour l’année académique actuelle.'}</p>
          <div className="tn-itc-discount__proof"><FileCheck2 size={20} /><span>{isEnglish ? 'Valid school certificate or current enrollment receipt' : 'Certificat de scolarité ou reçu d’inscription en cours de validité'}</span></div>
          <Link to="/contact" className="tn-itc-contact-link">{isEnglish ? 'Ask about student pricing' : 'Se renseigner sur le tarif étudiant'}<ArrowRight size={17} /></Link>
        </div>
      </section>

      <nav className="tn-itc-bottom-nav" aria-label={isEnglish ? 'Driving school navigation' : 'Navigation de la filiale'}>
        <Link to="/filiales"><ArrowLeft size={17} />{t('page.allBranchesBack', 'Voir toutes les filiales')}</Link>
        <Link to="/contact">{isEnglish ? 'Contact our team' : 'Contacter notre équipe'}<ArrowRight size={17} /></Link>
      </nav>
    </div>
  )
}

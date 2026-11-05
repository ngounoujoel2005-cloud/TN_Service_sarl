import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BadgePercent,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarClock,
  CalendarDays,
  Compass,
  FileCheck2,
  GraduationCap,
  Languages,
  Laptop,
  Moon,
  Sun,
} from 'lucide-react'
import trainingLogo from '../assets/training-center-logo.jpeg'
import maintenancePhoto from '../assets/filiales/maintenance-informatique.jpg'
import classroomPhoto from '../assets/filiales/cours-informatique.jpg'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import BranchMissionShowcase from '../components/BranchMissionShowcase.jsx'
import './InternationalTrainingCenter.css'

const missions = [
  {
    Icon: Languages,
    title: 'Formation et certification linguistique',
    text: 'Des parcours de langues vivantes et professionnelles, conçus pour tous les niveaux et tournés vers les études et le monde du travail.',
    titleEn: 'Language training and certification',
    textEn: 'Modern and professional language courses for every level, supporting international study and career opportunities.',
    tag: 'Langues vivantes',
    tagEn: 'Languages',
  },
  {
    Icon: Laptop,
    title: 'Maintenance et ingénierie informatique',
    text: 'Apprenez la maintenance matérielle et logicielle, la configuration des réseaux et le diagnostic des pannes informatiques.',
    titleEn: 'IT maintenance and engineering',
    textEn: 'Learn hardware and software maintenance, network setup, and practical computer troubleshooting.',
    tag: 'Informatique',
    tagEn: 'Information technology',
  },
  {
    Icon: BriefcaseBusiness,
    title: 'Diversification des compétitions et formations métiers',
    text: 'Un choix de formations qualifiantes et certifiantes, adapté aux compétences recherchées sur le marché du travail.',
    titleEn: 'Vocational and professional training',
    textEn: 'A range of qualifying and certified courses shaped around skills in demand in today’s job market.',
    tag: 'Compétences pro',
    tagEn: 'Career skills',
  },
  {
    Icon: Compass,
    title: 'Accompagnement et orientation',
    text: 'Un suivi personnalisé aide chaque apprenant à relier ses compétences à ses objectifs professionnels ou académiques.',
    titleEn: 'Guidance and personal support',
    textEn: 'Personal guidance helps each learner connect their skills with their academic and career goals.',
    tag: 'Suivi personnalisé',
    tagEn: 'Personal guidance',
  },
]

export default function InternationalTrainingCenter({ branch }) {
  const { language, t } = useLanguage()
  const isEnglish = language === 'en'
  const name = t('branch.itc.name', branch.name)

  useEffect(() => {
    const page = document.querySelector('.tn-itc-page')
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
    <div className="tn-itc-page">
      <section className="tn-itc-hero" data-reveal data-reveal-direction="top">
        <div className="tn-itc-hero__copy">
          <p className="tn-itc-kicker"><GraduationCap size={17} />{isEnglish ? 'TN SERVICES GROUP · TRAINING & LANGUAGES' : 'GROUPE TN SERVICES · FORMATION & LANGUES'}</p>
          <div className="tn-itc-hero__brand"><span><img src={trainingLogo} alt={`Logo ${name}`} /></span><span>{isEnglish ? 'Douala · Cameroon' : 'Douala · Cameroun'}</span></div>
          <h1>{name}</h1>
          <p className="tn-itc-hero__motto">{isEnglish ? 'Speak the world. Work anywhere.' : 'Parlez au monde, travaillez partout.'}</p>
          <p className="tn-itc-hero__intro">{isEnglish
            ? 'Build practical skills for your next step. Our flexible courses bring together languages, information technology, and professional development, with guidance throughout your learning journey.'
            : 'Institut polyvalent et dynamique, l’International Training Center développe des compétences concrètes pour les études et l’emploi. Nos formations réunissent les langues, l’informatique et les métiers, avec un accompagnement personnalisé à chaque étape.'}</p>
          <div className="tn-itc-hero__actions">
            <Link to="/contact" className="tn-itc-primary">{isEnglish ? 'Talk to an adviser' : 'Parler à un conseiller'}<ArrowRight size={18} /></Link>
            <a href="#missions" className="tn-itc-secondary">{isEnglish ? 'Explore our programs' : 'Découvrir nos formations'}</a>
          </div>
        </div>
        <figure className="tn-itc-hero__photo">
          <img src={classroomPhoto} alt={isEnglish ? 'Students learning in a computer classroom' : 'Des apprenants en cours dans une salle informatique'} />
          <figcaption><BookOpenCheck size={19} /><span><strong>{isEnglish ? 'Learn. Practice. Progress.' : 'Apprendre. Pratiquer. Progresser.'}</strong><small>{isEnglish ? 'Skills for study and work' : 'Des compétences pour les études et le travail'}</small></span></figcaption>
        </figure>
      </section>

      <BranchMissionShowcase
        id="missions"
        eyebrow={isEnglish ? 'WHAT WE DO' : 'NOTRE SAVOIR-FAIRE'}
        heading={isEnglish ? 'Our missions and expertise' : 'Nos missions et attributions'}
        missions={missions}
        logo={trainingLogo}
        isEnglish={isEnglish}
      />

      <section className="tn-itc-learning" data-reveal data-reveal-direction="right">
        <div className="tn-itc-learning__visual">
          <img src={maintenancePhoto} alt={isEnglish ? 'A technician repairing a computer motherboard' : 'Un technicien qui répare un ordinateur'} />
          <div className="tn-itc-learning__visual-caption"><span><Laptop size={18} /></span><div><strong>{isEnglish ? 'Learn by doing' : 'Apprendre en pratiquant'}</strong><small>{isEnglish ? 'Practical, guided courses' : 'Des cours pratiques et encadrés'}</small></div></div>
        </div>
        <div className="tn-itc-learning__copy">
          <p className="tn-itc-overline">{isEnglish ? 'A FORMAT THAT FITS YOU' : 'UN RYTHME QUI VOUS RESSEMBLE'}</p>
          <h2>{isEnglish ? 'Flexible courses, built around your schedule.' : 'Des cours flexibles, adaptés à votre emploi du temps.'}</h2>
          <p>{isEnglish
            ? 'Whether you are a student, a working professional, or learning for yourself, we plan sessions around your availability and your goals.'
            : 'Que vous soyez étudiant, professionnel en activité ou en apprentissage personnel, les séances sont organisées selon vos disponibilités et vos objectifs.'}</p>
          <div className="tn-itc-hours">
            <div className="tn-itc-hours__item"><span><Sun size={18} /></span><div><strong>{isEnglish ? 'Daytime' : 'En journée'}</strong><small>{isEnglish ? 'Study at your own pace' : 'Avancez à votre rythme'}</small></div></div>
            <div className="tn-itc-hours__item"><span><Moon size={18} /></span><div><strong>{isEnglish ? 'Evening' : 'En soirée'}</strong><small>{isEnglish ? 'A practical option after work' : 'Une formule après les cours ou le travail'}</small></div></div>
            <div className="tn-itc-hours__item"><span><CalendarDays size={18} /></span><div><strong>{isEnglish ? 'Weekends' : 'Le week-end'}</strong><small>{isEnglish ? 'Sessions to suit your availability' : 'Des séances selon vos disponibilités'}</small></div></div>
          </div>
          <div className="tn-itc-schedule-note"><CalendarClock size={18} /><span>{isEnglish ? 'Schedule and course format are agreed with each learner.' : 'Les horaires et le format des cours sont définis avec chaque apprenant.'}</span></div>
        </div>
      </section>

      <section className="tn-itc-discount" data-reveal data-reveal-direction="left">
        <div className="tn-itc-discount__offer">
          <span className="tn-itc-discount__icon"><BadgePercent size={29} /></span>
          <p className="tn-itc-overline">{isEnglish ? 'A BOOST FOR STUDENTS' : 'UN COUP DE POUCE AUX ÉTUDIANTS'}</p>
          <div className="tn-itc-discount__amount"><strong>10</strong><span>%</span></div>
          <h2>{isEnglish ? 'student discount' : 'de réduction étudiante'}</h2>
          <p>{isEnglish ? 'We support access to learning and encourage academic achievement.' : 'Nous encourageons l’accès au savoir et la réussite académique.'}</p>
        </div>
        <div className="tn-itc-discount__details">
          <span className="tn-itc-section-heading__icon"><GraduationCap size={21} /></span>
          <p className="tn-itc-overline">{isEnglish ? 'ELIGIBILITY' : 'CONDITIONS D’ÉLIGIBILITÉ'}</p>
          <h2>{isEnglish ? 'Show proof of current enrollment.' : 'Présentez un justificatif de scolarité valide.'}</h2>
          <p>{isEnglish
            ? 'The 10% discount applies to registered students who provide a valid school certificate or proof of enrollment for the current academic year.'
            : 'La remise de 10 % sur les frais de formation est accordée aux étudiants inscrits qui présentent un certificat de scolarité valide ou un reçu d’inscription en cours de validité pour l’année académique actuelle.'}</p>
          <div className="tn-itc-discount__proof"><FileCheck2 size={20} /><span>{isEnglish ? 'Valid school certificate or current enrollment receipt' : 'Certificat de scolarité ou reçu d’inscription en cours de validité'}</span></div>
          <Link to="/contact" className="tn-itc-contact-link">{isEnglish ? 'Ask about student pricing' : 'Se renseigner sur le tarif étudiant'}<ArrowRight size={17} /></Link>
        </div>
      </section>

      <nav className="tn-itc-bottom-nav" aria-label={isEnglish ? 'Training center navigation' : 'Navigation de la filiale'}>
        <Link to="/filiales"><ArrowLeft size={17} />{t('page.allBranchesBack', 'Voir toutes les filiales')}</Link>
        <Link to="/contact">{isEnglish ? 'Contact our team' : 'Contacter notre équipe'}<ArrowRight size={17} /></Link>
      </nav>
    </div>
  )
}

import { ArrowRight, BadgePercent, GraduationCap, Plane } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './Tarifs.css'

const offers = [
  {
    icon: GraduationCap,
    title: 'International Training Center',
    offer: '10 %',
    text: 'Réduction étudiante sur les frais de formation.',
    condition: 'Sur présentation d’un certificat de scolarité valide ou d’un reçu d’inscription pour l’année en cours.',
    to: '/filiales/itc',
  },
  {
    icon: BadgePercent,
    title: 'DrivePro Academy',
    offer: '15 %',
    text: 'Réduction étudiante sur la formation au permis.',
    condition: 'Sur présentation d’un certificat de scolarité valide ou d’un reçu d’inscription pour l’année en cours.',
    to: '/filiales/drivepro',
  },
  {
    icon: Plane,
    title: 'TN Travel & Tours',
    offer: 'Paiement flexible',
    text: 'Une partie importante des frais de service peut être reportée ou liée à l’obtention du visa.',
    condition: 'Les modalités sont précisées par un conseiller selon le dossier et les conditions convenues.',
    to: '/filiales/travel',
  },
]

export default function Tarifs() {
  const { language } = useLanguage()
  const isEnglish = language === 'en'

  return (
    <section className="tn-simple-page tn-pricing-page">
      <p className="tn-simple-page__eyebrow">{isEnglish ? 'OFFERS & PRICING' : 'OFFRES & TARIFS'}</p>
      <h1>{isEnglish ? 'Offers for your plans' : 'Des offres adaptées à vos projets'}</h1>
      <p>{isEnglish
        ? 'Some student offers and flexible service terms are available. Contact the relevant team for pricing on other services.'
        : 'Des avantages étudiants et des modalités de paiement flexibles sont proposés. Pour les autres services, contactez la filiale concernée afin de connaître le tarif adapté à votre besoin.'}</p>
      <div className="tn-simple-page__cards">
        {offers.map(({ icon: Icon, title, offer, text, condition, to }) => (
          <article key={title}>
            <span className="tn-pricing-page__icon"><Icon size={22} aria-hidden="true" /></span>
            <h2>{title}</h2>
            <strong className="tn-pricing-page__offer">{isEnglish && title === 'TN Travel & Tours' ? 'Flexible payment' : offer}</strong>
            <p>{isEnglish ? (
              title === 'International Training Center' ? 'Student discount on training fees.'
                : title === 'DrivePro Academy' ? 'Student discount on driving lessons.'
                  : 'A substantial part of service fees may be deferred or tied to visa approval.'
            ) : text}</p>
            <small>{isEnglish ? (
              title === 'TN Travel & Tours' ? 'Terms are explained by an adviser based on your file and the agreed conditions.'
                : 'Show a valid school certificate or enrollment receipt for the current academic year.'
            ) : condition}</small>
            <Link to={to}>{isEnglish ? 'View the subsidiary' : 'Voir la filiale'}<ArrowRight size={16} /></Link>
          </article>
        ))}
      </div>
      <Link className="tn-pricing-page__contact" to="/contact#contact-form">
        {isEnglish ? 'Ask for pricing information' : 'Demander des informations tarifaires'}<ArrowRight size={17} />
      </Link>
    </section>
  )
}

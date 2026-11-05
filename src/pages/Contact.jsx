import { useState } from 'react'
import { ArrowRight, Clock3, Mail, MapPin, Phone, Sparkles, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './Contact.css'

const tornEdge = (() => {
  let seed = 7
  const random = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
  const points = []
  for (let x = 0; x <= 1200; x += 12) points.push(`${x},${(10 + random() * 14).toFixed(1)}`)
  return `M0,40 L0,${points[0].split(',')[1]} L${points.join(' L')} L1200,40 Z`
})()

const officesMap = 'https://www.google.com/maps?q=Nkolbong+Douala+Cameroun&output=embed'

function ContactIcon({ name, size = 22 }) {
  const common = { size, strokeWidth: 1.8, 'aria-hidden': true }
  if (name === 'phone') return <Phone {...common} />
  if (name === 'email') return <Mail {...common} />
  return <MapPin {...common} />
}

export default function Contact() {
  const { language } = useLanguage()
  const isEnglish = language === 'en'
  const [form, setForm] = useState({ email: '', name: '', message: '' })
  const [status, setStatus] = useState('')

  const copy = isEnglish ? {
    eyebrow: 'TN SERVICES SARL · DOUALA, CAMEROON',
    title: 'Let’s talk about your plans.',
    intro: 'Our team is here to guide you. Contact us by phone, email, or visit one of our Douala offices.',
    cardsLabel: 'Contact details',
    phoneText: 'Our advisors can help you find the right service and answer your questions.',
    emailText: 'Tell us what you need and our team will get back to you during opening hours.',
    officeTitle: 'Visit our offices',
    officeText: 'Two locations in Douala to welcome and support you.',
    learn: 'Get in touch',
    hoursTitle: 'Our opening hours',
    hoursText: 'Visit us or call during our regular business hours.',
    weekdays: 'Monday – Saturday',
    weekdaysHours: '8:00 am – 6:30 pm',
    sunday: 'Sunday and public holidays',
    closed: 'Closed',
    locationTitle: 'Find our offices',
    formPill: 'WE’RE HERE TO HELP',
    formTitle: 'Send us a message',
    formText: 'Share a few details and your email app will open with your message ready to send.',
    email: 'Email address',
    name: 'Your name',
    message: 'How can we help?',
    emailPlaceholder: 'you@example.com',
    namePlaceholder: 'Your full name',
    messagePlaceholder: 'Tell us what you are looking for…',
    submit: 'Prepare email',
    mailStatus: 'Your email app should open with your message. If it does not, write to contact@tngroup.cm.',
    mapTitle: 'Map showing the TN Services offices in Douala',
    firstOffice: 'Nkolbong headquarters · Opposite Complexe Le Ciel',
    secondOffice: 'Yassa office · At the roundabout, by the market',
  } : {
    eyebrow: 'TN SERVICES SARL · DOUALA, CAMEROUN',
    title: 'Parlons de vos projets.',
    intro: 'Notre équipe vous accompagne et vous oriente. Contactez-nous par téléphone, par e-mail ou rendez-vous dans l’un de nos bureaux à Douala.',
    cardsLabel: 'Nos coordonnées',
    phoneText: 'Nos conseillers vous aident à trouver le service adapté et répondent à vos questions.',
    emailText: 'Présentez-nous votre besoin et notre équipe vous répondra pendant les heures d’ouverture.',
    officeTitle: 'Rendez-vous dans nos bureaux',
    officeText: 'Deux adresses à Douala pour vous accueillir et vous accompagner.',
    learn: 'Nous contacter',
    hoursTitle: 'Nos heures d’ouverture',
    hoursText: 'Retrouvez-nous ou appelez-nous pendant nos heures habituelles.',
    weekdays: 'Lundi – samedi',
    weekdaysHours: '08 h 00 – 18 h 30',
    sunday: 'Dimanche et jours fériés',
    closed: 'Fermé',
    locationTitle: 'Retrouvez nos bureaux',
    formPill: 'NOUS SOMMES À VOTRE ÉCOUTE',
    formTitle: 'Envoyez-nous un message',
    formText: 'Renseignez ces quelques informations : votre messagerie s’ouvrira avec le message prêt à envoyer.',
    email: 'Adresse e-mail',
    name: 'Votre nom',
    message: 'Comment pouvons-nous vous aider ?',
    emailPlaceholder: 'vous@exemple.com',
    namePlaceholder: 'Votre nom complet',
    messagePlaceholder: 'Décrivez-nous votre besoin…',
    submit: 'Préparer l’e-mail',
    mailStatus: 'Votre messagerie devrait s’ouvrir avec votre message. Si ce n’est pas le cas, écrivez à contact@tngroup.cm.',
    mapTitle: 'Carte des bureaux TN Services à Douala',
    firstOffice: 'Direction Nkolbong · Face au Complexe Le Ciel',
    secondOffice: 'Agence de Yassa · Au rond-point, à côté du marché',
  }

  const cards = [
    { icon: 'phone', title: '698 06 25 75', text: copy.phoneText, href: 'tel:+237698062575', action: copy.learn, variant: 'cream' },
    { icon: 'email', title: 'contact@tngroup.cm', text: copy.emailText, href: 'mailto:contact@tngroup.cm', action: copy.learn, variant: 'dark' },
    { icon: 'pin', title: copy.officeTitle, text: copy.officeText, href: '#cp-locations', action: copy.learn, variant: 'cream' },
  ]

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setStatus('')
  }

  const submitForm = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`${isEnglish ? 'Website contact' : 'Contact depuis le site'} — ${form.name}`)
    const body = encodeURIComponent(`${isEnglish ? 'Name' : 'Nom'}: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:contact@tngroup.cm?subject=${subject}&body=${body}`
    setStatus(copy.mailStatus)
  }

  return (
    <section className="cp" aria-labelledby="cp-title">
      <div className="cp-hero">
        <div className="cp-hero__in">
          <span className="cp-pill cp-pill--light"><Sparkles size={15} aria-hidden="true" /> {copy.eyebrow}</span>
          <h1 id="cp-title">{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
        <svg className="cp-hero__edge" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
          <path d={tornEdge} />
        </svg>
      </div>

      <div className="cp-wrap">
        <section className="cp-cards" aria-label={copy.cardsLabel}>
          {cards.map((card) => (
            <article key={card.icon} className={`cp-card cp-card--${card.variant}`}>
              <span className="cp-card__icon"><ContactIcon name={card.icon} /></span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              {card.icon === 'phone' && (
                <p className="cp-card__phones">
                  <a href="tel:+237698062575">698 06 25 75</a><span aria-hidden="true"> · </span><a href="tel:+237653994010">653 99 40 10</a>
                </p>
              )}
              <a href={card.href} className="cp-more">
                <span>{card.action}</span>
                <svg className="cp-more__arrow" viewBox="0 0 14 14" aria-hidden="true">
                  <circle cx="7" cy="7" r="6.5" fill="currentColor" />
                  <path d="M3.5 7h6M7 4.5 9.5 7 7 9.5" fill="none" stroke="var(--cp-arrow-stroke, #fff)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </article>
          ))}
        </section>

        <section className="cp-split">
          <div className="cp-info" id="cp-locations">
            <h2 className="cp-h2">{copy.hoursTitle}</h2>
            <p className="cp-info__intro">{copy.hoursText}</p>
            <ul className="cp-hours">
              <li><Clock3 size={17} aria-hidden="true" /><span>{copy.weekdays}</span><strong>{copy.weekdaysHours}</strong></li>
              <li><X size={17} aria-hidden="true" /><span>{copy.sunday}</span><strong>{copy.closed}</strong></li>
            </ul>

            <h2 className="cp-h2 cp-h2--loc">{copy.locationTitle}</h2>
            <div className="cp-offices">
              <p><MapPin size={17} aria-hidden="true" />{copy.firstOffice}</p>
              <p><MapPin size={17} aria-hidden="true" />{copy.secondOffice}</p>
            </div>
            <div className="cp-map">
              <iframe title={copy.mapTitle} src={officesMap} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
          </div>

          <div className="cp-form-col">
            <span className="cp-pill cp-pill--dark">{copy.formPill}</span>
            <h2 className="cp-title">{copy.formTitle}</h2>
            <p className="cp-form__intro">{copy.formText}</p>
            <form className="cp-form" id="contact-form" onSubmit={submitForm}>
              <label htmlFor="cp-email">{copy.email}</label>
              <input id="cp-email" name="email" type="email" autoComplete="email" placeholder={copy.emailPlaceholder} value={form.email} onChange={updateForm} required />

              <label htmlFor="cp-name">{copy.name}</label>
              <input id="cp-name" name="name" type="text" autoComplete="name" placeholder={copy.namePlaceholder} value={form.name} onChange={updateForm} required />

              <label htmlFor="cp-message">{copy.message}</label>
              <textarea id="cp-message" name="message" placeholder={copy.messagePlaceholder} rows={5} value={form.message} onChange={updateForm} required />

              <button type="submit">{copy.submit}<ArrowRight size={16} aria-hidden="true" /></button>
              <p className="cp-ok" role="status" aria-live="polite">{status}</p>
            </form>
          </div>
        </section>
      </div>
    </section>
  )
}

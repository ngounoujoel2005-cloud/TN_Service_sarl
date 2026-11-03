import { useEffect } from 'react'
import { ArrowRight, BadgeCheck, Building2, Calculator, CarFront, Clock3, GraduationCap, MapPin, Plane, ShoppingBag, Sparkles } from 'lucide-react'
import tnLogo from '../assets/tn-services-logo.jpeg'
import itcLogo from '../assets/training-center-logo.jpeg'
import travelLogo from '../assets/travel-tours-logo.jpeg'
import gestionLogo from '../assets/gestion-fiscalite-logo.jpeg'
import driveproLogo from '../assets/drivepro-logo.jpeg'
import lorenaLogo from '../assets/lorena-logo.png'
import headquartersImage from '../assets/home-headquarters-reference.png'
import officeTeamImage from '../assets/hero-office-team.png'
import trainingShowcase from '../assets/home-branches-training-reference.png'
import servicesShowcase from '../assets/home-branches-services-reference.png'
import lorenaShowcase from '../assets/home-lorena-reference.png'
import afgLogo from '../assets/partner-afg.png'
import canalLogo from '../assets/partner-canal.jpg'
import cgamLogo from '../assets/partner-cgam.jpeg'
import cnpsLogo from '../assets/partner-cnps.jpg'
import ecobankLogo from '../assets/partner-ecobank.jpg'
import kremlinLogo from '../assets/partner-kremlin.jpg'
import allInOneLogo from '../assets/partner-all-in-one.jpeg'
import rccmLogo from '../assets/partner-rccm.png'
import rccmMarkLogo from '../assets/partner-rccm-mark.jpg'
import starTimesLogo from '../assets/partner-startimes-alt.png'
import superCargoLogo from '../assets/partner-super-cargo.png'
import './HomeLanding.css'

const subsidiaries = [
  {
    slug: 'itc', name: 'International Training Center', short: 'Formation & langues', slogan: 'Parlez au monde. Travaillez partout.',
    description: 'Formations certifiantes en informatique, bureautique, développement web, infographie, maintenance et langues vivantes.',
    services: ['Informatique Pro', 'Allemand', 'Anglais', 'Chinois'], logo: itcLogo, visual: trainingShowcase, position: 'left top', accent: '#32a852', tint: 'rgba(50,168,82,.15)', icon: GraduationCap,
  },
  {
    slug: 'travel', name: 'TN Travel & Tours', short: 'Immigration & visas', slogan: 'Explorez le monde avec confiance.',
    description: 'Accompagnement pour vos procédures d’immigration, demandes de visas et billetterie aérienne au meilleur tarif.',
    services: ['Visas études / travail', 'Billetterie aérienne', 'Logistique diaspora'], logo: travelLogo, visual: trainingShowcase, position: 'right top', accent: '#1599ec', tint: 'rgba(21,153,236,.15)', icon: Plane,
  },
  {
    slug: 'gestion', name: 'TN Gestion & Fiscalité', short: 'Comptabilité & POS', slogan: 'Gérez mieux, payez juste.',
    description: 'Assistance comptable et fiscale, création d’entreprises et informatisation de commerces avec des solutions de caisse POS.',
    services: ['Création de société', 'DSF & déclarations', 'Caisses POS'], logo: gestionLogo, visual: servicesShowcase, position: 'left top', accent: '#268a4b', tint: 'rgba(38,138,75,.15)', icon: Calculator,
  },
  {
    slug: 'drivepro', name: 'DrivePro Academy', short: 'Auto-école agréée', slogan: 'La route vers votre autonomie.',
    description: 'Formation pratique et théorique, préparation aux permis toutes catégories et conduite sur piste privée à Yassa.',
    services: ['Permis A, B, C, D, E', 'Conduite accompagnée', 'Piste privée'], logo: driveproLogo, visual: servicesShowcase, position: 'right top', accent: '#ed9418', tint: 'rgba(237,148,24,.16)', icon: CarFront,
  },
  {
    slug: 'lorena', name: 'Lorena E-Commerce', short: 'Boutique en ligne', slogan: 'La technologie à portée de clic.',
    description: 'Vente en ligne de matériel informatique : ordinateurs professionnels, systèmes de caisse POS, imprimantes, tiroirs-caisses et accessoires.',
    services: ['PC portables HP / Dell', 'Caisses POS tactiles', 'Accessoires & onduleurs'], logo: lorenaLogo, visual: lorenaShowcase, position: 'left center', accent: '#9b27d4', tint: 'rgba(155,39,212,.14)', icon: ShoppingBag,
  },
]

const partners = [
  { name: 'AFG Capital', image: afgLogo },
  { name: 'CANAL+', image: canalLogo },
  { name: 'CGAM Consulting', image: cgamLogo },
  { name: 'CNPS', image: cnpsLogo },
  { name: 'Ecobank', image: ecobankLogo },
  { name: 'Kremlin Medical & Surgical Centre', image: kremlinLogo },
  { name: 'All in One Business and Services', image: allInOneLogo },
  { name: 'RCCM Construction & Consulting', image: rccmLogo },
  { name: 'RCCM', image: rccmMarkLogo },
  { name: 'StarTimes', image: starTimesLogo },
  { name: 'Super Cargo Service', image: superCargoLogo },
]

function SubsidiaryCard({ branch, index }) {
  const Icon = branch.icon
  return (
    <article className={`tn-branch-card tn-branch-card--${branch.slug}`} data-reveal data-reveal-direction={index % 2 === 0 ? 'left' : 'right'} style={{ '--branch-accent': branch.accent, '--branch-tint': branch.tint, '--branch-visual': `url(${branch.visual})`, '--branch-position': branch.position }}>
      <div className="tn-branch-card__visual">
        <span className="tn-branch-card__label"><Icon size={15} />{branch.short}</span>
        {branch.slug === 'itc' && <span className="tn-branch-card__photo-tag">Dès 15 000 F / mois</span>}
        {branch.slug === 'travel' && <span className="tn-branch-card__photo-tag">Canada · Schengen · Dubaï</span>}
        {branch.slug === 'gestion' && <span className="tn-branch-card__photo-tag">Création en 72h</span>}
        {branch.slug === 'drivepro' && <span className="tn-branch-card__photo-tag">Permis A, B, C, D, E</span>}
        {branch.slug === 'lorena' && <span className="tn-branch-card__photo-tag">Livraison 24h à Douala</span>}
      </div>
      <div className="tn-branch-card__body">
        <div className="tn-branch-card__heading">
          <span className="tn-branch-card__logo"><img src={branch.logo} alt={`Logo ${branch.name}`} /></span>
          <div><h3>{branch.name}</h3><p>{branch.slogan}</p></div>
        </div>
        <p className="tn-branch-card__description">{branch.description}</p>
        <div className="tn-branch-card__tags">{branch.services.map((service) => <span key={service}>{service}</span>)}</div>
        <a className="tn-branch-card__link" href={`/filiales/${branch.slug}`}>Découvrir {branch.slug === 'lorena' ? 'la boutique' : 'la filiale'}<ArrowRight size={18} /></a>
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
      <section className="tn-home-intro" data-reveal data-reveal-direction="top">
        <div className="tn-home-intro__copy">
          <div className="tn-home-kicker"><Sparkles size={16} /><span>TN SERVICES SARL · DOUALA</span><i /> <em>« Chacun y trouve son compte »</em></div>
          <h1>L’Écosystème d’Excellence : <span>Formation, Mobilité, Gestion &amp; E-Commerce</span> à Douala.</h1>
          <p>Notre objectif : proposer aux étudiants, professionnels et entreprises un accompagnement complet et accessible. TN SERVICES SARL structure cinq filiales complémentaires autour de la formation certifiante, des voyages, de la gestion et fiscalité, de l’auto-école et du commerce technologique en ligne.</p>
          <div className="tn-home-intro__actions"><a className="tn-home-primary" href="/contact">Pré-inscription en ligne <ArrowRight size={18} /></a><a className="tn-home-secondary" href="/contact">Nos promotions pour les jeunes <Sparkles size={17} /></a></div>
        </div>
        <div className="tn-home-intro__photo"><img src={officeTeamImage} alt="Une équipe de professionnels noirs qui travaille ensemble dans un bureau" /></div>
      </section>

      <section className="tn-home-proof" data-reveal data-reveal-direction="left" aria-label="Agrément et localisations">
        <span><BadgeCheck size={18} /> Agréé MINEFOP &amp; Ministère des Transports</span><i />
        <span><MapPin size={18} /> Nkolbong, face Complexe Le Ciel · Yassa, rond-point côté du marché</span>
      </section>

      <section className="tn-headquarters" id="siege" data-reveal data-reveal-direction="right" style={{ '--headquarters-image': `url(${headquartersImage})` }} aria-label="Siège social TN Services à Douala">
        <span className="tn-headquarters__city">DOUALA · CAMEROUN</span>
        <div className="tn-headquarters__caption"><span className="tn-headquarters__logo"><img src={tnLogo} alt="" /></span><div><strong>TN SERVICES SARL</strong><b>Siège social &amp; Campus Douala</b><p>Nkolbong, face Complexe Le Ciel · Yassa, rond-point côté du marché</p></div></div>
      </section>

      <section className="tn-subsidiaries" data-reveal data-reveal-direction="left" id="services">
        <div className="tn-section-heading"><div><span>NOTRE ÉCOSYSTÈME</span><h2>Cinq expertises, une même ambition.</h2></div><p>Des équipes et des services complémentaires pour vous accompagner à chaque étape.</p></div>
        <div className="tn-subsidiaries__grid">{subsidiaries.map((branch, index) => <SubsidiaryCard key={branch.slug} branch={branch} index={index} />)}</div>
      </section>

      <section className="tn-office-hours" id="bureaux" data-reveal data-reveal-direction="right">
        <div className="tn-office-hours__intro"><span className="tn-section-icon"><Clock3 size={22} /></span><div><span>NOUS VOUS ACCUEILLONS</span><h2>Nos horaires &amp; bureaux</h2><p>Nos équipes vous reçoivent et vous accompagnent à Douala.</p></div></div>
        <div className="tn-office-hours__cards">
          <article className="tn-office-card" data-reveal data-reveal-direction="left"><div className="tn-office-card__icon"><Clock3 size={20} /></div><div><span>HORAIRES D’OUVERTURE</span><h3>Lundi – Samedi</h3><p>08h00 – 18h30</p><small>Fermé le dimanche et les jours fériés.</small></div></article>
          <article className="tn-office-card" data-reveal data-reveal-direction="bottom"><div className="tn-office-card__icon is-green"><Building2 size={20} /></div><div><span>DIRECTION · NKOLBONG</span><h3>Siège social &amp; campus</h3><p>Face au Complexe Le Ciel,<br />Nkolbong, Douala.</p></div></article>
          <article className="tn-office-card" data-reveal data-reveal-direction="right"><div className="tn-office-card__icon is-blue"><MapPin size={20} /></div><div><span>AGENCE · YASSA</span><h3>Agence &amp; piste auto-école</h3><p>Au rond-point de Yassa,<br />côté du marché, Douala.</p></div></article>
        </div>
      </section>

      <section className="tn-partners" id="partenaires" data-reveal data-reveal-direction="left">
        <div className="tn-section-heading"><div><span>ILS NOUS FONT CONFIANCE</span><h2>Nos partenaires</h2></div><p>Des partenaires institutionnels et privés qui accompagnent nos activités.</p></div>
        <div className="tn-partners__viewport" role="region" aria-label="Partenaires TN Services" aria-roledescription="bande défilante"><div className="tn-partners__track"><PartnerGroup /><PartnerGroup duplicate /></div></div>
      </section>
    </div>
  )
}

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BadgePercent,
  CreditCard,
  Headset,
  House,
  PackageCheck,
  RotateCcw,
  ShoppingBag,
  Tags,
  Truck,
} from 'lucide-react'
import lorenaLogo from '../assets/lorena-logo.png'
import storePhoto from '../assets/filiales/lorena-vitrine.jpg'
import productsPhoto from '../assets/filiales/lorena-produits.jpg'
import onlineStorePhoto from '../assets/filiales/lorena-boutique-en-ligne.png'
import mobileShoppingPhoto from '../assets/filiales/lorena-achat-mobile.png'
import deliveryPhoto from '../assets/filiales/lorena-livraison.png'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import BranchMissionShowcase from '../components/BranchMissionShowcase.jsx'
import './InternationalTrainingCenter.css'
import './LorenaStore.css'

const missions = [
  {
    Icon: ShoppingBag,
    title: 'Vente multi-catégories',
    text: 'Parcourez un catalogue varié pour vos besoins du quotidien : électronique, mode, maison et décoration, beauté, accessoires et bien plus.',
    titleEn: 'A wide range of categories',
    textEn: 'Browse a varied catalog for everyday needs: electronics, fashion, home and decor, beauty, accessories, and more.',
    tag: 'Le choix',
    tagEn: 'Selection',
  },
  {
    Icon: Tags,
    title: 'Des prix compétitifs',
    text: 'Les articles sont sélectionnés avec soin pour proposer un bon rapport qualité-prix et des tarifs avantageux.',
    titleEn: 'Competitive prices',
    textEn: 'Products are selected with care to offer value for money and attractive prices.',
    tag: 'Le meilleur prix',
    tagEn: 'Great value',
  },
  {
    Icon: Truck,
    title: 'Livraison rapide et sécurisée',
    text: 'Vos commandes sont expédiées à domicile ou à l’adresse de votre choix avec un traitement rapide et soigné.',
    titleEn: 'Fast, secure delivery',
    textEn: 'Orders are sent to your home or an address of your choice, with prompt and careful handling.',
    tag: 'La sérénité',
    tagEn: 'Peace of mind',
  },
  {
    Icon: RotateCcw,
    title: 'Retours et échanges simplifiés',
    text: 'Une procédure de retour ou d’échange est prévue pour les articles non conformes ou présentant un défaut, avec un traitement attentif de vos demandes.',
    titleEn: 'Simple returns and exchanges',
    textEn: 'A return or exchange process is available for items that are faulty or not as described, with attentive handling of your request.',
    tag: 'À votre écoute',
    tagEn: 'Here to help',
  },
]

export default function LorenaStore() {
  const { language, t } = useLanguage()
  const isEnglish = language === 'en'
  const brandName = t('branch.lorena.name', 'Lorena E-Commerce')

  useEffect(() => {
    const page = document.querySelector('.tn-lorena-page')
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
    <div className="tn-itc-page tn-lorena-page">
      <section className="tn-itc-hero" data-reveal data-reveal-direction="top">
        <div className="tn-itc-hero__copy">
          <p className="tn-itc-kicker"><ShoppingBag size={17} />{isEnglish ? 'TN SERVICES GROUP · ONLINE STORE' : 'GROUPE TN SERVICES · BOUTIQUE EN LIGNE'}</p>
          <div className="tn-itc-hero__brand"><span><img src={lorenaLogo} alt={`Logo ${brandName}`} /></span><span>{isEnglish ? 'Shopping made simple' : 'Le shopping en toute simplicité'}</span></div>
          <h1>LORENA</h1>
          <p className="tn-itc-hero__motto">{isEnglish ? 'Choice, quality, and peace of mind at the best price.' : 'Le choix, la qualité et la sérénité au meilleur prix.'}</p>
          <p className="tn-itc-hero__intro">{isEnglish
            ? 'Lorena is an online store designed to make shopping easy, reliable, and accessible. Explore products for home, work, and everyday life, with convenient ordering and delivery.'
            : 'LORENA est une plateforme de vente en ligne conçue pour vous offrir une expérience d’achat fluide, fiable et accessible. Retrouvez des produits pour la maison, le travail et le quotidien, avec une commande et une livraison pratiques.'}</p>
          <div className="tn-itc-hero__actions">
            <a href="https://www.lorena.cm" className="tn-itc-primary" target="_blank" rel="noreferrer">{isEnglish ? 'Visit the Lorena store' : 'Visiter la boutique Lorena'}<ArrowRight size={18} /></a>
            <a href="#lorena-missions" className="tn-itc-secondary">{isEnglish ? 'Explore our services' : 'Découvrir nos services'}</a>
          </div>
        </div>
        <figure className="tn-itc-hero__photo">
          <img src={storePhoto} alt={isEnglish ? 'Lorena online shop and product selection' : 'La boutique Lorena et sa sélection de produits'} />
          <figcaption><PackageCheck size={19} /><span><strong>{isEnglish ? 'Shop with confidence' : 'Achetez en toute sérénité'}</strong><small>{isEnglish ? 'From browsing to delivery' : 'Du choix à la livraison'}</small></span></figcaption>
        </figure>
      </section>

      <BranchMissionShowcase
        id="lorena-missions"
        eyebrow={isEnglish ? 'THE LORENA EXPERIENCE' : 'L’EXPÉRIENCE LORENA'}
        heading={isEnglish ? 'Our missions and services' : 'Nos missions et attributions'}
        missions={missions}
        logo={lorenaLogo}
        isEnglish={isEnglish}
      />

      <section className="tn-itc-learning" data-reveal data-reveal-direction="right">
        <div className="tn-itc-learning__visual">
          <img src={productsPhoto} alt={isEnglish ? 'A selection of products available from Lorena' : 'Une sélection de produits disponibles chez Lorena'} />
          <div className="tn-itc-learning__visual-caption"><span><Headset size={18} /></span><div><strong>{isEnglish ? 'Here for you after your order' : 'À vos côtés après la commande'}</strong><small>{isEnglish ? 'Friendly, dedicated support' : 'Une équipe à votre écoute'}</small></div></div>
        </div>
        <div className="tn-itc-learning__copy">
          <p className="tn-itc-overline">{isEnglish ? 'A SIMPLE, TRANSPARENT PURCHASE' : 'UN ACHAT SIMPLE ET TRANSPARENT'}</p>
          <h2>{isEnglish ? 'Choose, order, and receive your items with ease.' : 'Choisissez, commandez et recevez vos articles simplement.'}</h2>
          <p>{isEnglish
            ? 'Browse the catalog through an intuitive interface, place your order, and select a payment method that works for you. Delivery is handled promptly and carefully.'
            : 'Parcourez le catalogue avec une interface intuitive, passez commande et choisissez le mode de paiement qui vous convient. Vos colis sont traités rapidement et livrés dans les meilleures conditions de sécurité.'}</p>
          <div className="tn-itc-hours">
            <div className="tn-itc-hours__item"><span><ShoppingBag size={18} /></span><div><strong>{isEnglish ? 'Browse the catalog' : 'Parcourez le catalogue'}</strong><small>{isEnglish ? 'Find items across categories' : 'Trouvez vos articles par catégorie'}</small></div></div>
            <div className="tn-itc-hours__item"><span><CreditCard size={18} /></span><div><strong>{isEnglish ? 'Place your order' : 'Passez votre commande'}</strong><small>{isEnglish ? 'Choose your preferred payment method' : 'Choisissez le mode de paiement adapté'}</small></div></div>
            <div className="tn-itc-hours__item"><span><House size={18} /></span><div><strong>{isEnglish ? 'Receive your delivery' : 'Recevez votre livraison'}</strong><small>{isEnglish ? 'At home or your chosen address' : 'À domicile ou à l’adresse de votre choix'}</small></div></div>
          </div>
          <div className="tn-itc-schedule-note"><Truck size={18} /><span>{isEnglish ? 'Orders are processed promptly and delivered with care.' : 'Les commandes sont traitées rapidement et livrées avec soin.'}</span></div>
        </div>
      </section>

      <section className="tn-lorena-gallery" data-reveal data-reveal-direction="bottom">
        <div className="tn-lorena-gallery__heading">
          <p className="tn-itc-overline">{isEnglish ? 'THE LORENA ONLINE EXPERIENCE' : 'L’EXPÉRIENCE LORENA EN LIGNE'}</p>
          <h2>{isEnglish ? 'From product discovery to delivery.' : 'Du choix des produits à la livraison.'}</h2>
          <p>{isEnglish ? 'Explore the store, discover products, and follow a simple path from your phone to your door.' : 'Découvrez la boutique, explorez les produits et profitez d’un parcours simple, du téléphone jusqu’à la livraison.'}</p>
        </div>
        <div className="tn-lorena-gallery__grid">
          <article className="tn-lorena-gallery__card" data-reveal data-reveal-direction="left">
            <div className="tn-lorena-gallery__visual"><img src={onlineStorePhoto} alt={isEnglish ? 'Online product catalog displayed on a web store' : 'Un catalogue de produits présenté dans une boutique en ligne'} /></div>
            <div className="tn-lorena-gallery__copy"><span><ShoppingBag size={17} /></span><div><h3>{isEnglish ? 'An easy-to-browse store' : 'Une boutique facile à parcourir'}</h3><p>{isEnglish ? 'A clear online catalog makes it easier to discover what you need.' : 'Un catalogue en ligne clair pour trouver facilement ce dont vous avez besoin.'}</p></div></div>
          </article>
          <article className="tn-lorena-gallery__card" data-reveal data-reveal-direction="bottom">
            <div className="tn-lorena-gallery__visual"><img src={mobileShoppingPhoto} alt={isEnglish ? 'Shopping products through a mobile storefront' : 'Des produits consultés depuis une boutique sur téléphone'} /></div>
            <div className="tn-lorena-gallery__copy"><span><CreditCard size={17} /></span><div><h3>{isEnglish ? 'Convenient online shopping' : 'Des achats pratiques en ligne'}</h3><p>{isEnglish ? 'Browse product ranges and place an order from your phone.' : 'Consultez les articles et passez commande directement depuis votre téléphone.'}</p></div></div>
          </article>
          <article className="tn-lorena-gallery__card" data-reveal data-reveal-direction="right">
            <div className="tn-lorena-gallery__visual"><img src={deliveryPhoto} alt={isEnglish ? 'A delivery center prepared for dispatching orders' : 'Un centre de livraison prêt à expédier les commandes'} /></div>
            <div className="tn-lorena-gallery__copy"><span><Truck size={17} /></span><div><h3>{isEnglish ? 'Delivery with care' : 'Une livraison soignée'}</h3><p>{isEnglish ? 'Orders are prepared and sent to your home or chosen address.' : 'Les commandes sont préparées puis envoyées à domicile ou à l’adresse de votre choix.'}</p></div></div>
          </article>
        </div>
      </section>

      <section className="tn-itc-discount" data-reveal data-reveal-direction="left">
        <div className="tn-itc-discount__offer">
          <span className="tn-itc-discount__icon"><BadgeCheck size={29} /></span>
          <p className="tn-itc-overline">{isEnglish ? 'YOUR SATISFACTION MATTERS' : 'VOTRE SATISFACTION COMPTE'}</p>
          <div className="tn-itc-discount__amount"><strong>100</strong><span>%</span></div>
          <h2>{isEnglish ? 'customer satisfaction' : 'satisfaction client'}</h2>
          <p>{isEnglish ? 'We remain available after delivery to answer questions and help resolve order issues.' : 'Notre équipe reste disponible après la livraison pour répondre à vos questions et vous aider en cas de problème avec votre commande.'}</p>
        </div>
        <div className="tn-itc-discount__details">
          <span className="tn-itc-section-heading__icon"><Headset size={21} /></span>
          <p className="tn-itc-overline">{isEnglish ? 'DEDICATED AFTER-SALES SUPPORT' : 'UN SERVICE APRÈS-VENTE DÉDIÉ'}</p>
          <h2>{isEnglish ? 'Help with your products, returns, and exchanges.' : 'Une équipe pour vos produits, retours et échanges.'}</h2>
          <p>{isEnglish
            ? 'Our support team can answer your questions, help you use your items, and handle a complaint. Requests for an exchange or refund are given priority for faulty or non-conforming products.'
            : 'Notre équipe répond à vos questions, vous aide à utiliser vos articles et prend en charge vos réclamations. Les demandes d’échange ou de remboursement sont traitées en priorité pour les produits défectueux ou non conformes.'}</p>
          <div className="tn-itc-discount__proof"><RotateCcw size={20} /><span>{isEnglish ? 'A simplified process for eligible returns and exchanges' : 'Une procédure simplifiée pour les retours et échanges concernés'}</span></div>
          <Link to="/contact" className="tn-itc-contact-link">{isEnglish ? 'Contact Lorena support' : 'Contacter le service Lorena'}<ArrowRight size={17} /></Link>
        </div>
      </section>

      <nav className="tn-itc-bottom-nav" aria-label={isEnglish ? 'Lorena store navigation' : 'Navigation de la filiale'}>
        <Link to="/filiales"><ArrowLeft size={17} />{t('page.allBranchesBack', 'Voir toutes les filiales')}</Link>
        <a href="https://www.lorena.cm" target="_blank" rel="noreferrer">{isEnglish ? 'Open Lorena online' : 'Accéder à Lorena en ligne'}<ArrowRight size={17} /></a>
      </nav>
    </div>
  )
}

import { createContext, useContext, useEffect, useState } from 'react'

const english = {
  'nav.aria': 'Main navigation', 'nav.home': 'Home', 'nav.branches': 'Subsidiaries', 'nav.allBranches': 'All subsidiaries', 'nav.about': 'About us', 'nav.contact': 'Contact / Location', 'nav.lightTheme': 'Switch to light theme', 'nav.darkTheme': 'Switch to dark theme', 'nav.language': 'Switch to French', 'nav.signup': 'Pre-registration',
  'footer.aria': 'TN SERVICES footer', 'footer.entities': 'OFFICIAL TN SERVICES GROUP ENTITIES & BRANDS:', 'footer.city': 'DOUALA, CAMEROON', 'footer.socialTitle': 'JOIN THE TN SERVICES COMMUNITY ON SOCIAL MEDIA', 'footer.socialDescription': 'Find our TikTok videos, job offers, travel scholarships, Lorena deals and management tips.', 'footer.companySlogan': 'Everyone finds what they need', 'footer.companyDescription': 'TN SERVICES SARL  A business group approved by MINEFOP and the Ministry of Transport, providing certified IT and language training, travel and support services.', 'footer.quickLinks': 'QUICK LINKS', 'footer.home': 'Home', 'footer.allBranches': 'All subsidiaries', 'footer.about': 'About us', 'footer.prices': 'Pricing', 'footer.agencies': 'Locations', 'footer.contact': 'Contact & location', 'footer.services': 'Our services', 'footer.headquarters': 'Our headquarters', 'footer.hours': 'Hours & offices', 'footer.partners': 'Our partners', 'footer.campus': 'DOUALA OFFICES', 'footer.direction': 'Nkolbong headquarters:', 'footer.directionAddress': 'Opposite Complexe Le Ciel, Nkolbong', 'footer.agency': 'Yassa office:', 'footer.agencyAddress': 'Yassa roundabout, by the market, Douala', 'footer.contacts': 'CONTACT & APPROVALS', 'footer.approval': 'Approved by MINEFOP & Ministry of Transport', 'footer.openingHours': 'Monday - Saturday: 8:00 am - 6:30 pm', 'footer.rights': 'All rights reserved.', 'footer.location': 'Douala, Littoral, Cameroon',
  'whatsapp.dialog': 'Choose a WhatsApp number', 'whatsapp.title': 'Contact TN SERVICES', 'whatsapp.description': 'Choose a WhatsApp number to contact:', 'whatsapp.main': 'Main service', 'whatsapp.agency': 'Office & services',
  'home.kicker': 'TN SERVICES SARL - DOUALA', 'home.motto': 'Everyone finds what they need', 'home.title': 'A complete ecosystem: Training, Travel, Management & E-Commerce in Douala.', 'home.intro': 'Our goal is to offer students, professionals and businesses comprehensive, accessible support. TN SERVICES SARL brings together five complementary subsidiaries in professional training, travel, accounting and tax, driving education, and online technology retail.', 'home.preregister': 'Online pre-registration', 'home.promotions': 'Offers for young people', 'home.proofLabel': 'Accreditation and office locations', 'home.approval': 'Approved by MINEFOP & the Ministry of Transport', 'home.locations': 'Nkolbong, opposite Complexe Le Ciel - Yassa, roundabout by the market', 'home.city': 'DOUALA  CAMEROON', 'home.headquarters': 'Head office & Douala campus', 'home.ecosystem': 'OUR ECOSYSTEM', 'home.sectionTitle': 'Five areas of expertise, one shared ambition.', 'home.sectionDescription': 'Our teams and complementary services support you at every step.', 'home.discoverBranch': 'Discover', 'home.branch': 'subsidiary', 'home.shop': 'the store', 'home.from': 'Course fees vary by program', 'home.creation': 'Business setup and registration', 'home.delivery': 'Home delivery in Douala and Yaoundé; shipment elsewhere in Cameroon', 'home.welcome': 'WE ARE HERE FOR YOU', 'home.officeTitle': 'Opening hours & offices', 'home.officeDescription': 'Our teams welcome and assist you in Douala.', 'home.opening': 'OPENING HOURS', 'home.weekdays': 'Monday - Saturday', 'home.closed': 'Closed on Sundays and public holidays.', 'home.directionLabel': 'NKOLBONG - HEAD OFFICE', 'home.headquartersTitle': 'Head office & campus', 'home.headquartersAddress': 'Opposite Complexe Le Ciel, Nkolbong, Douala.', 'home.yassaLabel': 'YASSA - OFFICE', 'home.yassaTitle': 'Office & driving school track', 'home.yassaAddress': 'At Yassa roundabout, by the market, Douala.', 'home.trusted': 'TRUSTED BY', 'home.partnersTitle': 'Our partners', 'home.partnersDescription': 'Institutional and private partners supporting our work.', 'home.partnersAria': 'TN Services partners', 'home.marquee': 'scrolling banner',
  'page.branchesEyebrow': 'THE TN SERVICES GROUP', 'page.branchesTitle': 'Our subsidiaries', 'page.branchesDescription': 'A group of complementary services to support you every day.', 'page.branchEyebrow': 'TN SERVICES GROUP SUBSIDIARY', 'page.allBranchesBack': 'View all subsidiaries', 'page.aboutEyebrow': 'ABOUT US', 'page.aboutIntro': 'A Cameroonian business group serving individuals and organizations through training, travel and professional support.', 'page.mission': 'Our mission', 'page.missionDescription': 'Make useful, high-quality services accessible, with local support.', 'page.commitment': 'Our commitment', 'page.commitmentDescription': 'Attentive teams and solutions adapted to everyones needs.', 'page.contactEyebrow': 'WE ARE HERE TO HELP', 'page.contactTitle': 'Contact TN SERVICES', 'page.contactIntro': 'Our team welcomes you in Douala Monday to Saturday, from 8:00 am to 6:30 pm.', 'page.phone': 'By phone', 'page.email': 'By email', 'page.douala': 'In Douala', 'page.contactAddress': 'Nkolbong headquarters, opposite Complexe Le Ciel; Yassa office by the market.', 'page.pricesTitle': 'Pricing', 'page.pricesDescription': 'Discover pricing for TN SERVICES solutions. Contact us for a quote tailored to your needs.', 'page.locationsTitle': 'Our locations', 'page.locationsDescription': 'Find our offices in Douala: Nkolbong, opposite Complexe Le Ciel, and Yassa roundabout by the market.',
  'branch.itc.name': 'International Training Center', 'branch.itc.description': 'German, Italian, English, Chinese, and French courses cost CFA 25,000–50,000; TCF preparation is CFA 50,000 per month. Professional courses cost CFA 30,000–50,000, and children’s holiday courses CFA 15,000.', 'branch.travel.name': 'TN Travel & Tours', 'branch.travel.description': 'Destination-specific visas for Canada, Schengen, Dubai, and China, along with ticketing and travel support.', 'branch.gestion.name': 'TN Accounting & Taxation', 'branch.gestion.description': 'Business creation and registration, entrepreneurial support, CNPS files, TSF declarations, and cash register/POS management.', 'branch.drivepro.name': 'DrivePro Academy', 'branch.drivepro.description': 'Driving lessons, support with licence issuance and renewal, and refresher training.', 'branch.lorena.name': 'Lorena E-Commerce', 'branch.lorena.description': 'Online shopping with home delivery in Douala and Yaoundé, and shipping to other destinations in Cameroon.',
}

Object.assign(english, {
  'home.discoverBranch': 'Discover this subsidiary',
  'home.discoverStore': 'Visit the Lorena online store',
  'home.promo.itc': 'Children’s holiday courses · CFA 15,000',
  'home.promo.travel': 'Visas: Canada · Schengen · Dubai · China',
  'home.promo.gestion': 'Business · CNPS · TSF',
  'home.promo.drivepro': 'Lessons · Licence · Refresher',
  'home.promo.lorena': 'Delivery: Douala · Yaoundé',
  'home.time': '8:00 am - 6:30 pm',
  'home.teamAlt': 'A team of Black professionals working together in an office',
  'whatsapp.button': 'Contact us',
  'nav.closeMenu': 'Close menu',
  'nav.openMenu': 'Open menu',
  'home.carouselLabel': 'Group and subsidiary presentation',
  'home.carouselRole': 'carousel',
  'home.carouselControls': 'Carousel controls',
  'home.previousSlide': 'Previous presentation',
  'home.nextSlide': 'Next presentation',
  'home.resumeSlides': 'Resume carousel',
  'home.pauseSlides': 'Pause carousel',
})

Object.assign(english, {
  'footer.prices': 'Pricing & offers',
  'footer.agencies': 'Offices & locations',
  'footer.preRegistration': 'Pre-registration',
})

const LanguageContext = createContext({ language: 'fr', toggleLanguage: () => {}, t: (_key, fallback) => fallback })

function getInitialLanguage() {
  try {
    return window.localStorage.getItem('tn-services-language') === 'en' ? 'en' : 'fr'
  } catch {
    return 'fr'
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)
  const toggleLanguage = () => setLanguage((current) => current === 'fr' ? 'en' : 'fr')
  const t = (key, fallback) => language === 'en' ? (english[key] ?? fallback) : fallback

  useEffect(() => {
    document.documentElement.lang = language
    try {
      window.localStorage.setItem('tn-services-language', language)
    } catch {
      // The language switch still works for this session when storage is unavailable.
    }
  }, [language])

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

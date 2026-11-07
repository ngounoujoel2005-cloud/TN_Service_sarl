import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from '../i18n/LanguageContext.jsx'
import teamPhoto from '../assets/hero-office-team.png'
import afgLogo from '../assets/partner-afg.png'
import canalLogo from '../assets/partner-canal.jpg'
import cgamLogo from '../assets/partner-cgam.jpeg'
import cnpsLogo from '../assets/partner-cnps.jpg'
import ecobankLogo from '../assets/partner-ecobank.jpg'
import kremlinLogo from '../assets/partner-kremlin.jpg'
import allInOneLogo from '../assets/partner-all-in-one.jpeg'
import starTimesLogo from '../assets/partner-startimes-alt.png'
import './A-propos.css'

/* ------------------------------------------------------------------
   Page « À propos » — TN SERVICES (sans header ni footer)
   - Aucun package externe : icônes SVG, animations CSS et hooks intégrés
   - Tous les textes modifiables sont regroupés juste en dessous
   - Les liens se règlent avec la prop `links` (ancres # = défilement fluide)
   - Photo de la section « Qui sommes-nous » : prop `aboutImage="/images/equipe.jpg"`
------------------------------------------------------------------- */

const STATS = [
  { icon: "layers", to: 5, suffix: "", fr: "Filiales complémentaires", en: "Complementary subsidiaries" },
  { icon: "pin", to: 2, suffix: "", fr: "Bureaux à Douala", en: "Offices in Douala" },
  { icon: "clock", to: 6, suffix: "/7", fr: "Jours d’ouverture", en: "Days open" },
  { icon: "shield", to: 2, suffix: "", fr: "Agréments officiels", en: "Official approvals" },
];

const SERVICES = [
  {
    key: "itc", icon: "cap", tagFr: "Formation", tagEn: "Training", title: "International Training Center",
    textFr: "Des cours d’allemand, d’italien, d’anglais, de chinois et de français, ainsi que des formations professionnelles et une préparation au TCF.",
    textEn: "German, Italian, English, Chinese, and French courses, alongside professional training and TCF preparation.",
    pointsFr: ["Langues : 25 000 à 50 000 F", "TCF : 50 000 F par mois", "Cours professionnels et vacances"],
    pointsEn: ["Languages: CFA 25,000–50,000", "TCF: CFA 50,000 per month", "Professional and holiday courses"],
  },
  {
    key: "travel", icon: "plane", tagFr: "Voyage & mobilité", tagEn: "Travel & mobility", title: "TN Travel & Tours",
    textFr: "Accompagnement pour les visas du Canada, de l’espace Schengen, de Dubaï et de la Chine, ainsi que pour la billetterie et la préparation du voyage.",
    textEn: "Visa guidance for Canada, the Schengen area, Dubai, and China, along with ticketing and travel planning.",
    pointsFr: ["Visas selon la destination", "Billetterie et réservations", "Conseils personnalisés"],
    pointsEn: ["Destination-specific visas", "Tickets and reservations", "Personalized guidance"],
  },
  {
    key: "gestion", icon: "calc", tagFr: "Gestion & fiscalité", tagEn: "Accounting & tax", title: "TN Gestion & Fiscalité",
    textFr: "Un accompagnement entrepreneurial pour la création et l’immatriculation, les dossiers CNPS, les déclarations TSF et la gestion des caisses/POS.",
    textEn: "Entrepreneurial support with business creation and registration, CNPS files, TSF declarations, and cash register/POS management.",
    pointsFr: ["Création et immatriculation", "CNPS et déclarations TSF", "Caisses et systèmes POS"],
    pointsEn: ["Business setup and registration", "CNPS and TSF declarations", "Cash registers and POS systems"],
  },
  {
    key: "drivepro", icon: "car", tagFr: "Auto-école", tagEn: "Driving school", title: "DrivePro Academy",
    textFr: "Des cours d’auto-école, un accompagnement pour la production et le renouvellement du permis, et des séances de recyclage.",
    textEn: "Driving lessons, support with licence issuance and renewal, and refresher sessions.",
    pointsFr: ["Cours de conduite", "Production et renouvellement du permis", "Recyclage et perfectionnement"],
    pointsEn: ["Driving lessons", "Licence issuance and renewal", "Refresher and advanced lessons"],
  },
  {
    key: "lorena", icon: "bag", tagFr: "E-commerce", tagEn: "E-commerce", title: "Lorena E-Commerce",
    textFr: "Une boutique en ligne avec livraison à domicile à Douala et Yaoundé, et expédition dans les autres villes du Cameroun.",
    textEn: "An online store with home delivery in Douala and Yaoundé, and shipping to other destinations in Cameroon.",
    pointsFr: ["Produits multi-catégories", "Livraison Douala et Yaoundé", "Expédition au Cameroun"],
    pointsEn: ["Products across categories", "Douala and Yaoundé delivery", "Shipping across Cameroon"],
  },
];

const STEPS = [
  { titleFr: "Une ambition commune", titleEn: "One shared ambition", textFr: "Réunir des services utiles pour accompagner les habitants, les étudiants et les entreprises de Douala.", textEn: "Bring useful services together for people, students, and businesses in Douala." },
  { titleFr: "La formation au cœur du projet", titleEn: "Training at the heart of the group", textFr: "International Training Center aide chacun à acquérir des compétences professionnelles et linguistiques.", textEn: "International Training Center helps people build professional and language skills." },
  { titleFr: "Des expertises qui se complètent", titleEn: "Expertise that works together", textFr: "Voyage, gestion, conduite et commerce en ligne complètent notre offre selon les besoins de chaque client.", textEn: "Travel, accounting, driving, and online retail services respond to different customer needs." },
  { titleFr: "Deux bureaux à Douala", titleEn: "Two offices in Douala", textFr: "Notre équipe vous accueille à Nkolbong, face au Complexe Le Ciel, et à Yassa, au rond-point à côté du marché.", textEn: "Our team welcomes you in Nkolbong, opposite Complexe Le Ciel, and in Yassa, at the roundabout by the market." },
];

const VALUES = [
  { icon: "shield", titleFr: "Sérieux", titleEn: "Trust", textFr: "Des services structurés, avec les agréments du MINEFOP et du Ministère des Transports.", textEn: "Structured services backed by approvals from MINEFOP and the Ministry of Transport." },
  { icon: "pin", titleFr: "Proximité", titleEn: "Local support", textFr: "Deux bureaux à Douala et une équipe disponible du lundi au samedi.", textEn: "Two offices in Douala and a team available Monday through Saturday." },
  { icon: "heart", titleFr: "Écoute", titleEn: "Listening", textFr: "Nous partons de vos besoins pour vous orienter vers les services adaptés.", textEn: "We start with your needs and guide you toward the services that fit." },
  { icon: "calc", titleFr: "Clarté", titleEn: "Clarity", textFr: "Des informations et des conseils pour vous aider à avancer en connaissance de cause.", textEn: "Clear information and guidance to help you make informed decisions." },
];

const PARTNERS = [
  { name: 'AFG Capital', image: afgLogo },
  { name: 'CANAL+', image: canalLogo },
  { name: 'CGA NMEC Consulting', image: cgamLogo },
  { name: 'CNPS', image: cnpsLogo },
  { name: 'Ecobank', image: ecobankLogo },
  { name: 'Kremelin Medical', image: kremlinLogo },
  { name: 'All in One Business and Services', image: allInOneLogo },
  { name: 'StarTimes', image: starTimesLogo },
];

const MARQUEE = {
  fr: ["Formation", "Voyages", "Gestion & fiscalité", "Auto-école", "E-commerce", "Douala", "Chacun y trouve son compte"],
  en: ["Training", "Travel", "Accounting & tax", "Driving school", "E-commerce", "Douala", "Everyone finds what they need"],
};

const COPY = {
  fr: {
    about: "À propos de TN SERVICES", heroLead: "TN SERVICES SARL réunit cinq filiales complémentaires à Douala : formation, voyage, gestion et fiscalité, conduite et commerce en ligne. Une même équipe vous conseille et vous accompagne selon votre projet.",
    services: "Découvrir nos services", journey: "Notre parcours", trust1: "Agréé MINEFOP", trust2: "Ministère des Transports", hours: "Lun – Sam · 08h00 – 18h30", scroll: "Faire défiler vers la suite",
    aboutEyebrow: "Qui sommes-nous", aboutTitle: "Un groupe, cinq filiales,", aboutEmphasis: "un engagement partagé", aboutText1: "TN SERVICES SARL est un groupe camerounais basé à Douala. Nous accompagnons les particuliers, les étudiants et les professionnels dans leurs projets de formation, de mobilité, de gestion, de conduite et d’achat en ligne.", aboutText2: "Notre promesse tient dans notre devise :", motto: "« Chacun y trouve son compte ».", aboutText3: "Nos équipes vous accueillent, vous conseillent et vous orientent vers la filiale qui correspond à votre besoin.", checks: ["Formation professionnelle et langues", "Voyages, visas et billetterie", "Gestion, fiscalité et caisse POS", "Auto-école et boutique en ligne"], viewServices: "Voir toutes nos filiales",
    statsLabel: "TN SERVICES en chiffres", servicesEyebrow: "Nos filiales", servicesTitle: "Cinq expertises pour", servicesEmphasis: "vous accompagner", servicesLead: "Des équipes et des services complémentaires pour vous accompagner à chaque étape.", more: "En savoir plus", calcTitle: "Un projet en tête ? Parlons-en.", calcText: "Découvrez nos services et contactez-nous pour obtenir des informations adaptées à votre besoin.", calcButton: "Nous contacter",
    journeyEyebrow: "Notre parcours", journeyTitle: "Des services réunis autour", journeyEmphasis: "de vos projets", journeyLead: "TN SERVICES évolue avec les besoins des personnes et des entreprises que nous accompagnons.", valuesEyebrow: "Ce qui nous guide", valuesTitle: "Nos", valuesEmphasis: "valeurs", finalPill: "On vous accueille à Douala", finalTitle: "Et si on avançait", finalEmphasis: "ensemble ?", finalText: "Passez nous voir à Nkolbong ou à Yassa, ou appelez-nous du lundi au samedi, de 08h00 à 18h30.", contact: "Nous contacter", finalLinks1: "Nos filiales", finalLinks2: "Notre parcours", finalLinks3: "Où nous trouver", calculator: "Voir nos services",
  },
  en: {
    about: "About TN SERVICES", heroLead: "TN SERVICES SARL brings together five complementary subsidiaries in Douala: training, travel, accounting and tax, driving, and online retail. One team guides and supports you with your plans.",
    services: "Explore our services", journey: "Our story", trust1: "MINEFOP approved", trust2: "Ministry of Transport", hours: "Mon – Sat · 8:00 am – 6:30 pm", scroll: "Scroll to continue",
    aboutEyebrow: "Who we are", aboutTitle: "One group, five subsidiaries,", aboutEmphasis: "one shared commitment", aboutText1: "TN SERVICES SARL is a Cameroonian group based in Douala. We support individuals, students, and professionals with training, mobility, business management, driving, and online shopping.", aboutText2: "Our promise is captured in our motto:", motto: "“Everyone finds what they need.”", aboutText3: "Our teams welcome you, offer guidance, and direct you to the subsidiary that best fits your needs.", checks: ["Professional training and languages", "Travel, visas, and ticketing", "Accounting, tax, and POS", "Driving school and online store"], viewServices: "View all subsidiaries",
    statsLabel: "TN SERVICES at a glance", servicesEyebrow: "Our subsidiaries", servicesTitle: "Five areas of expertise to", servicesEmphasis: "support your plans", servicesLead: "Complementary teams and services to support you at every step.", more: "Learn more", calcTitle: "Have a project in mind? Let’s talk.", calcText: "Explore our services and contact us for information tailored to your needs.", calcButton: "Contact us",
    journeyEyebrow: "Our story", journeyTitle: "Services brought together", journeyEmphasis: "around your goals", journeyLead: "TN SERVICES grows with the needs of the people and businesses we serve.", valuesEyebrow: "What guides us", valuesTitle: "Our", valuesEmphasis: "values", finalPill: "We welcome you in Douala", finalTitle: "Shall we move forward", finalEmphasis: "together?", finalText: "Visit us in Nkolbong or Yassa, or call Monday to Saturday, from 8:00 am to 6:30 pm.", contact: "Contact us", finalLinks1: "Our subsidiaries", finalLinks2: "Our story", finalLinks3: "Find us", calculator: "Explore our services",
  },
};

const DEFAULT_LINKS = {
  services: "#services", journey: "#parcours", contact: "/contact", calculator: "/filiales",
  itc: "/filiales/itc", travel: "/filiales/travel", gestion: "/filiales/gestion", drivepro: "/filiales/drivepro", lorena: "/filiales/lorena",
};
const PHONES = [{ label: "698 06 25 75", tel: "+237698062575" }, { label: "653 99 40 10", tel: "+237653994010" }];

/* ----------------------------- Utilitaires ----------------------------- */
const reduced = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const go = (e, href) => {
  if (href && href.startsWith("#")) {
    const t = document.querySelector(href);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" }); }
  }
};

/* Apparition au défilement */
function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current; if (!root) return;
    const els = root.querySelectorAll("[data-rv]");
    if (reduced() || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
    root.classList.add("ab--js");
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [rootRef]);
}

const Rv = ({ as: Tag = "div", d = 0, dir = "", className = "", children, ...rest }) => (
  <Tag data-rv className={`ab-rv ${dir ? `ab-rv--${dir}` : ""} ${className}`} style={{ "--d": `${d * 90}ms` }} {...rest}>{children}</Tag>
);

/* Compteur animé */
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (reduced() || !("IntersectionObserver" in window)) { setV(to); return; }
    let raf, t0;
    const run = () => {
      const step = (t) => {
        if (!t0) t0 = t;
        const p = Math.min((t - t0) / 1500, 1);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ----------------------------- Icônes ----------------------------- */
const Icon = ({ name, size = 24 }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  switch (name) {
    case "cap": return <svg {...p}><path d="M2 9l10-5 10 5-10 5-10-5Z" /><path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" /><path d="M22 9v6" /></svg>;
    case "plane": return <svg {...p}><path d="M3 13l18-9-5 17-4.5-6.5L3 13Z" /><path d="M11.5 14.5 21 4" /></svg>;
    case "car": return <svg {...p}><path d="M4 16v-4l2-5h12l2 5v4" /><path d="M3 16h18v2.5a.5.5 0 0 1-.5.5H18a1 1 0 0 1-1-1v-1M3 16v2.5a.5.5 0 0 0 .5.5H6a1 1 0 0 0 1-1v-1" /><path d="M5.5 12h13" /><circle cx="8" cy="14.5" r=".6" fill="currentColor" /><circle cx="16" cy="14.5" r=".6" fill="currentColor" /></svg>;
    case "layers": return <svg {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>;
    case "pin": return <svg {...p}><path d="M12 21s-7-5.8-7-11a7 7 0 0 1 14 0c0 5.2-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "clock": return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>;
    case "shield": return <svg {...p}><path d="M12 3 5 6v5.5c0 4.4 2.9 8.2 7 9.5 4.1-1.3 7-5.1 7-9.5V6l-7-3Z" /><path d="m9 12 2.2 2.2L15.2 10" /></svg>;
    case "heart": return <svg {...p}><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" /></svg>;
    case "calc": return <svg {...p}><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M8.5 7h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 15h.01M12 15h.01M15.5 15h.01" /></svg>;
    case "bag": return <svg {...p}><path d="M5 8h14l1 12H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2M9.5 12v.01M14.5 12v.01" /></svg>;
    case "check": return <svg {...p} strokeWidth="2.4"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
    case "arrow": return <svg {...p} strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "phone": return <svg {...p}><path d="M6 3.5h3l1.6 4-2 1.3a10.5 10.5 0 0 0 5.6 5.6l1.3-2 4 1.6v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4 5.7 2 2 0 0 1 6 3.5Z" /></svg>;
    default: return null;
  }
};

/* ----------------------------- Composant ----------------------------- */
export default function APropos({ links, aboutImage: suppliedAboutImage }) {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const copy = COPY[isEnglish ? "en" : "fr"];
  const aboutImage = suppliedAboutImage || teamPhoto;
  const L = { ...DEFAULT_LINKS, ...(links || {}) };
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const tlRef = useRef(null);
  useReveal(rootRef);

  /* Léger effet de profondeur sur le bandeau (souris) */
  useEffect(() => {
    const hero = heroRef.current; if (!hero || reduced()) return;
    const move = (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      hero.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    hero.addEventListener("pointermove", move);
    return () => hero.removeEventListener("pointermove", move);
  }, []);

  /* Ligne du parcours qui se remplit au défilement */
  useEffect(() => {
    const tl = tlRef.current; if (!tl) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight, r = tl.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (vh * 0.62 - r.top) / r.height));
      tl.style.setProperty("--p", p.toFixed(4));
      tl.querySelectorAll(".ab-step").forEach((s) => s.classList.toggle("is-active", s.getBoundingClientRect().top < vh * 0.62));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const glow = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div className="ab" ref={rootRef}>


      {/* ============ BANDEAU ============ */}
      <section className="ab-hero" ref={heroRef} aria-labelledby="ab-h1">
        <div className="ab-hero__bg" aria-hidden="true">
          <i className="ab-blob ab-blob--1" /><i className="ab-blob ab-blob--2" /><i className="ab-blob ab-blob--3" />
          <i className="ab-dots" />
        </div>

        <div className="ab-wrap ab-hero__grid">
          <div className="ab-hero__txt">
            <span className="ab-pill ab-pill--glass"><i className="ab-ping" /> {copy.about}</span>
            <h1 id="ab-h1" aria-label={isEnglish ? "Everyone finds what they need" : "Chacun y trouve son compte"}>
              <span aria-hidden="true">
                {(isEnglish ? ["Everyone", "finds", "what"] : ["Chacun", "y", "trouve"]).map((w, i) => <span key={w} className="ab-word" style={{ "--i": i }}>{w}&nbsp;</span>)}
                <span className="ab-word ab-hl" style={{ "--i": 3 }}>
                  {isEnglish ? "they need" : "son compte"}
                  <svg viewBox="0 0 300 18" preserveAspectRatio="none"><path d="M3 12C60 3 120 3 180 8s90 2 117-3" /></svg>
                </span>
              </span>
            </h1>
            <p className="ab-lead">{copy.heroLead}</p>
            <div className="ab-cta">
              <a className="ab-btn ab-btn--green" href={L.services} onClick={(e) => go(e, L.services)}>{copy.services} <Icon name="arrow" size={18} /></a>
              <a className="ab-btn ab-btn--ghost" href={L.journey} onClick={(e) => go(e, L.journey)}>{copy.journey}</a>
            </div>
            <ul className="ab-trust">
              <li><Icon name="shield" size={18} /> {copy.trust1}</li>
              <li><Icon name="shield" size={18} /> {copy.trust2}</li>
              <li><Icon name="clock" size={18} /> {copy.hours}</li>
            </ul>
          </div>

          <div className="ab-orbit" aria-hidden="true">
            <i className="ab-ring ab-ring--1" /><i className="ab-ring ab-ring--2" /><i className="ab-ring ab-ring--3" />
            <div className="ab-core"><b>TN</b><small>SERVICES</small></div>
            <div className="ab-orb" style={{ "--a": "0deg", "--t": "26s", "--in": "0%" }}><span className="ab-orb__ico ab-orb__ico--g"><Icon name="cap" size={26} /></span></div>
            <div className="ab-orb" style={{ "--a": "72deg", "--t": "26s", "--in": "0%" }}><span className="ab-orb__ico ab-orb__ico--b"><Icon name="plane" size={26} /></span></div>
            <div className="ab-orb" style={{ "--a": "144deg", "--t": "26s", "--in": "0%" }}><span className="ab-orb__ico ab-orb__ico--w"><Icon name="calc" size={26} /></span></div>
            <div className="ab-orb" style={{ "--a": "216deg", "--t": "26s", "--in": "0%" }}><span className="ab-orb__ico ab-orb__ico--g"><Icon name="car" size={26} /></span></div>
            <div className="ab-orb" style={{ "--a": "288deg", "--t": "26s", "--in": "0%" }}><span className="ab-orb__ico ab-orb__ico--b"><Icon name="bag" size={26} /></span></div>
            <div className="ab-orb ab-orb--in" style={{ "--a": "60deg", "--t": "18s", "--in": "17%" }}><span className="ab-orb__dot" /></div>
            <div className="ab-orb ab-orb--in" style={{ "--a": "200deg", "--t": "18s", "--in": "17%" }}><span className="ab-orb__dot ab-orb__dot--b" /></div>
          </div>
        </div>

        <a className="ab-scroll" href="#qui" onClick={(e) => go(e, "#qui")} aria-label={copy.scroll}><i /></a>
        <svg className="ab-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 50c120 35 240 40 360 22S600 5 760 12s280 50 420 48 190-22 260-38V90H0Z" />
        </svg>
      </section>

      {/* ============ QUI SOMMES-NOUS ============ */}
      <section className="ab-sec ab-about" id="qui">
        <div className="ab-wrap ab-about__grid">
          <Rv dir="l" className="ab-visual">
            <div className="ab-frame" style={aboutImage ? { backgroundImage: `url(${aboutImage})` } : undefined}>
              {!aboutImage && <div className="ab-frame__art" aria-hidden="true"><b>TN</b><span /></div>}
            </div>
            <div className="ab-float ab-float--a"><b>5</b><span>{isEnglish ? <>subsidiaries<br />under one group</> : <>filiales<br />réunies sous un même toit</>}</span></div>
            <div className="ab-float ab-float--b"><Icon name="shield" size={22} /><span>{isEnglish ? <>Approved by MINEFOP &amp;<br />Ministry of Transport</> : <>Agréé MINEFOP &amp;<br />Ministère des Transports</>}</span></div>
            <svg className="ab-badge" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="ab-circ" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" /></defs>
              <circle cx="100" cy="100" r="98" className="ab-badge__bg" />
              <text><textPath href="#ab-circ">{isEnglish ? "TN SERVICES • EVERYONE FINDS WHAT THEY NEED • " : "TN SERVICES • CHACUN Y TROUVE SON COMPTE • "}</textPath></text>
              <path d="M80 102l15 16 27-32" className="ab-badge__mark" />
            </svg>
          </Rv>

          <div className="ab-about__txt">
            <Rv><span className="ab-eyebrow">{copy.aboutEyebrow}</span></Rv>
            <Rv d={1}><h2 className="ab-h2">{copy.aboutTitle} <em>{copy.aboutEmphasis}</em></h2></Rv>
            <Rv d={2}><p>{copy.aboutText1}</p></Rv>
            <Rv d={3}><p>{copy.aboutText2} <strong>{copy.motto}</strong> {copy.aboutText3}</p></Rv>
            <ul className="ab-checks">
              {copy.checks.map((t, i) => (
                <Rv as="li" d={4 + i} key={t}><span><Icon name="check" size={14} /></span>{t}</Rv>
              ))}
            </ul>
            <Rv d={8}><a className="ab-link" href={L.services} onClick={(e) => go(e, L.services)}>{copy.viewServices} <Icon name="arrow" size={18} /></a></Rv>
          </div>
        </div>
      </section>

      {/* ============ CHIFFRES ============ */}
      <section className="ab-stats" aria-label={copy.statsLabel}>
        <i className="ab-stats__b ab-stats__b--1" aria-hidden="true" /><i className="ab-stats__b ab-stats__b--2" aria-hidden="true" />
        <div className="ab-wrap ab-stats__grid">
          {STATS.map((s, i) => (
            <Rv key={s.fr} d={i} dir="z" className="ab-stat">
              <span className="ab-stat__ico"><Icon name={s.icon} size={26} /></span>
              <strong><Counter to={s.to} suffix={s.suffix} /></strong>
              <small>{isEnglish ? s.en : s.fr}</small>
            </Rv>
          ))}
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="ab-sec ab-services" id="services">
        <div className="ab-wrap">
          <header className="ab-head">
            <Rv><span className="ab-eyebrow">{copy.servicesEyebrow}</span></Rv>
            <Rv d={1}><h2 className="ab-h2">{copy.servicesTitle} <em>{copy.servicesEmphasis}</em></h2></Rv>
            <Rv d={2}><p>{copy.servicesLead}</p></Rv>
          </header>

          <div className="ab-cards">
            {SERVICES.map((s, i) => (
              <Rv key={s.key} d={i + 1} className="ab-cardwrap">
                <article className={`ab-card ab-card--${i}`} onPointerMove={glow}>
                  <span className="ab-card__tag">{isEnglish ? s.tagEn : s.tagFr}</span>
                  <span className="ab-card__ico"><Icon name={s.icon} size={30} /></span>
                  <h3>{s.title}</h3>
                  <p>{isEnglish ? s.textEn : s.textFr}</p>
                  <ul>{(isEnglish ? s.pointsEn : s.pointsFr).map((p) => <li key={p}><Icon name="check" size={14} />{p}</li>)}</ul>
                  <a className="ab-more" href={L[s.key]}>{copy.more} <Icon name="arrow" size={16} /></a>
                </article>
              </Rv>
            ))}
          </div>

          <Rv d={2} className="ab-calc">
            <span className="ab-calc__ico"><Icon name="calc" size={30} /></span>
            <div><h3>{copy.calcTitle}</h3><p>{copy.calcText}</p></div>
            <a className="ab-btn ab-btn--dark" href={L.calculator}>{copy.calcButton} <Icon name="arrow" size={18} /></a>
          </Rv>
        </div>
      </section>

      {/* ============ BANDEAU DÉFILANT ============ */}
      <div className="ab-marquee" aria-hidden="true">
        <div className="ab-marquee__track">
          {[0, 1].map((k) => (
            <div className="ab-marquee__set" key={k}>{MARQUEE[isEnglish ? "en" : "fr"].map((m) => <span key={m + k}>{m}<i>✦</i></span>)}</div>
          ))}
        </div>
      </div>

      {/* ============ PARCOURS ============ */}
      <section className="ab-sec ab-journey" id="parcours">
        <div className="ab-wrap">
          <header className="ab-head">
            <Rv><span className="ab-eyebrow">{copy.journeyEyebrow}</span></Rv>
            <Rv d={1}><h2 className="ab-h2">{copy.journeyTitle} <em>{copy.journeyEmphasis}</em></h2></Rv>
            <Rv d={2}><p>{copy.journeyLead}</p></Rv>
          </header>

          <ol className="ab-tl" ref={tlRef}>
            <i className="ab-tl__line" aria-hidden="true"><b /></i>
            {STEPS.map((s, i) => (
              <li className={`ab-step ${i % 2 ? "ab-step--r" : ""}`} key={s.titleFr}>
                <span className="ab-step__dot" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <Rv dir={i % 2 ? "r" : "l"} className="ab-step__card">
                  <h3>{isEnglish ? s.titleEn : s.titleFr}</h3>
                  <p>{isEnglish ? s.textEn : s.textFr}</p>
                </Rv>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ VALEURS ============ */}
      <section className="ab-sec ab-values">
        <div className="ab-wrap">
          <header className="ab-head">
            <Rv><span className="ab-eyebrow">{copy.valuesEyebrow}</span></Rv>
            <Rv d={1}><h2 className="ab-h2">{copy.valuesTitle} <em>{copy.valuesEmphasis}</em></h2></Rv>
          </header>
          <div className="ab-vgrid">
            {VALUES.map((v, i) => (
              <Rv key={v.titleFr} d={i} className="ab-val">
                <span className="ab-val__n">0{i + 1}</span>
                <span className="ab-val__ico"><Icon name={v.icon} size={26} /></span>
                <h3>{isEnglish ? v.titleEn : v.titleFr}</h3>
                <p>{isEnglish ? v.textEn : v.textFr}</p>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PARTENAIRES ============ */}
      <section className="ab-sec ab-partners" id="partenaires">
        <div className="ab-wrap">
          <header className="ab-head">
            <Rv><span className="ab-eyebrow">{isEnglish ? 'OUR NETWORK' : 'NOTRE RÉSEAU'}</span></Rv>
            <Rv d={1}><h2 className="ab-h2">{isEnglish ? 'Partners who support' : 'Des partenaires qui soutiennent'} <em>{isEnglish ? 'our work' : 'nos actions'}</em></h2></Rv>
            <Rv d={2}><p>{isEnglish
              ? 'Institutional and private partners contribute to the services and support we provide to people, students, and businesses.'
              : 'Des partenaires institutionnels et privés contribuent à la qualité de nos services et à l’accompagnement des particuliers, des étudiants et des entreprises.'}</p></Rv>
          </header>
          <div className="ab-partners__grid">
            {PARTNERS.map((partner, i) => (
              <Rv key={partner.name} d={i % 5} className="ab-partner-wrap">
                <article className="ab-partner">
                  <span className="ab-partner__visual"><img src={partner.image} alt={`Logo ${partner.name}`} loading="lazy" /></span>
                  <h3>{partner.name}</h3>
                </article>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INVITATION FINALE ============ */}
      <section className="ab-final">
        <div className="ab-wrap">
          <Rv dir="z" className="ab-final__card">
            <i className="ab-final__s ab-final__s--1" aria-hidden="true" /><i className="ab-final__s ab-final__s--2" aria-hidden="true" />
            <span className="ab-pill ab-pill--glass">{copy.finalPill}</span>
            <h2>{copy.finalTitle} <em>{copy.finalEmphasis}</em></h2>
            <p>{copy.finalText}</p>
            <div className="ab-cta ab-cta--c">
              <a className="ab-btn ab-btn--green" href={L.contact}>{copy.contact} <Icon name="arrow" size={18} /></a>
              <a className="ab-btn ab-btn--ghost" href={L.calculator}>{copy.calculator}</a>
            </div>
            <div className="ab-final__phones">
              <Icon name="phone" size={18} />
              {PHONES.map((p, i) => <React.Fragment key={p.tel}>{i > 0 && <span>/</span>}<a href={`tel:${p.tel}`}>{p.label}</a></React.Fragment>)}
            </div>
            <div className="ab-chips">
              <a href={L.services} onClick={(e) => go(e, L.services)}>{copy.finalLinks1}</a>
              <a href={L.journey} onClick={(e) => go(e, L.journey)}>{copy.finalLinks2}</a>
              <a href={L.contact}>{copy.finalLinks3}</a>
            </div>
          </Rv>
        </div>
      </section>
    </div>
  );
}




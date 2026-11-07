import { useEffect, useState } from 'react'
import HomeLanding from './HomeLanding.jsx'
import './Index.css'

const letters = [
  ['S', 1090, 88], ['E', 1188, 80], ['R', 1282, 92], ['V', 1370, 100],
  ['I', 1478, 26], ['C', 1512, 90], ['E', 1620, 80], ['S', 1708, 88],
]

function LogoArtwork() {
  return (
    <svg viewBox="340 250 1640 1100" aria-hidden="true">
      <defs>
        <linearGradient id="tn-blue" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#05249f" /><stop offset=".5" stopColor="#0f4fb0" /><stop offset="1" stopColor="#05249f" />
        </linearGradient>
        <linearGradient id="tn-blue-swoosh" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#05249f" /><stop offset="1" stopColor="#0f4fb0" />
        </linearGradient>
        <linearGradient id="tn-shine-gradient" x1="0" x2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" /><stop offset=".5" stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id="tn-wipe"><rect className="tn-wipe-rect" x="800" y="1100" height="220" /></clipPath>
        <clipPath id="tn-logo-clip"><rect x="340" y="250" width="1640" height="1100" /></clipPath>
      </defs>
      <g className="tn-logo">
        <path className="tn-orbit" style={{ '--d': 2.2 }} d="M1160 280 A520 520 0 0 1 1680 800" />
        <path className="tn-orbit" style={{ '--d': 2.6 }} d="M1160 1320 A520 520 0 0 1 640 800" />
        <g className="tn-flip" style={{ '--d': 1.9 }}>
          <ellipse className="tn-stroke" pathLength="1" style={{ '--d': 1.9, '--dur': 1, '--f': 4 }} cx="868" cy="536" rx="178" ry="218" fill="url(#tn-blue)" />
        </g>
        <path className="tn-stroke" pathLength="1" style={{ '--d': 2.1, '--dur': 1.1, '--f': 4.1 }} fill="url(#tn-blue-swoosh)" d="M690 545C500 600 378 740 378 900C378 1130 560 1300 955 1305C650 1260 440 1100 442 900C445 740 540 630 690 570Z" />
        <path className="tn-stroke" pathLength="1" style={{ '--d': 2.3, '--dur': 1.1, '--f': 4.2 }} fill="#9aff00" d="M1445 626C1300 540 1150 500 1030 500C700 500 445 700 447 900C450 1130 700 1305 1100 1302C750 1290 525 1120 525 930C525 720 780 545 1090 547C1220 547 1340 575 1445 626Z" />
        <g className="tn-flip" style={{ '--d': 0.3 }}>
          <path className="tn-ghost" style={{ '--d': 0.3 }} d="M655 708H903V762H813V1035H743V762H655Z" />
          <path className="tn-stroke" pathLength="1" style={{ '--d': 0.3, '--dur': 0.9, '--f': 3.6 }} fill="url(#tn-blue)" d="M655 708H903V762H813V1035H743V762H655Z" />
        </g>
        <g className="tn-flip" style={{ '--d': 1.1 }}>
          <path className="tn-ghost" style={{ '--d': 1.1 }} d="M829 810H887L1012 998V810H1069V1095H1007L885 908V1095H829Z" />
          <path className="tn-stroke" pathLength="1" style={{ '--d': 1.1, '--dur': 0.9, '--f': 3.8 }} fill="url(#tn-blue)" d="M829 810H887L1012 998V810H1069V1095H1007L885 908V1095H829Z" />
        </g>
        <g className="tn-word" fontFamily="Arial Black, Impact, Arial, sans-serif" fontWeight="900" fontSize="205">
          {letters.map(([letter, x, width], index) => {
            const delay = 2.6 + index * 0.1
            const fillDelay = 4.2 + index * 0.06
            return <g key={`${letter}-${x}`}>
              <text className="tn-shadow-letter" style={{ '--f': fillDelay }} x={x + 7} y="1067" textLength={width} lengthAdjust="spacingAndGlyphs">{letter}</text>
              <text className="tn-letter" style={{ '--d': delay, '--f': fillDelay }} x={x} y="1060" textLength={width} lengthAdjust="spacingAndGlyphs" fill="#9aff00">{letter}</text>
            </g>
          })}
        </g>
        <g clipPath="url(#tn-wipe)">
          <text className="tn-tagline" x="815" y="1235" textLength="1100" lengthAdjust="spacingAndGlyphs">Chacun y trouve son compte</text>
        </g>
        <g clipPath="url(#tn-logo-clip)">
          <rect className="tn-shine" x="340" y="250" width="160" height="1100" fill="url(#tn-shine-gradient)" transform="skewX(-18)" />
        </g>
      </g>
    </svg>
  )
}

function IntroLoader() {
  const [phase, setPhase] = useState('running')

  useEffect(() => {
    let active = true
    const startedAt = Date.now()
    let hideTimer
    let checkTimer
    let loaded = document.readyState === 'complete'
    const onLoad = () => { loaded = true }
    if (!loaded) window.addEventListener('load', onLoad)

    const checkReady = () => {
      if (!active) return
      if (loaded && Date.now() - startedAt >= 4800) {
        setPhase('ready')
        hideTimer = window.setTimeout(() => {
          if (active) setPhase('done')
        }, 350)
      } else {
        checkTimer = window.setTimeout(checkReady, 80)
      }
    }
    checkReady()
    return () => {
      active = false
      window.removeEventListener('load', onLoad)
      window.clearTimeout(checkTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    document.body.classList.add('tn-scroll-lock')
    return () => document.body.classList.remove('tn-scroll-lock')
  }, [])

  useEffect(() => {
    if (phase === 'done') document.body.classList.remove('tn-scroll-lock')
  }, [phase])

  if (phase === 'hidden') return null
  return (
    <div className={`tn-loader${phase === 'ready' ? ' ready' : ''}${phase === 'done' ? ' done' : ''}`} role="status" aria-label="Chargement de TN SERVICES">
      <LogoArtwork />
      <div className="tn-progress"><i /></div>
    </div>
  )
}

export default function Index() {
  return (
    <>
      <IntroLoader />
      <HomeLanding />
      <div className="tn-home">
        <section className="tn-hero" id="accueil">
          <h1>Chacun y trouve <em>son compte</em></h1>
          <p>Bienvenue sur TN SERVICES. Découvrez nos services et trouvez la solution qui vous convient.</p>
          <a className="tn-button" href="#services">Découvrir nos services</a>
        </section>
      </div>
    </>
  )
}
// bon je vais te faire une liste des modification que tu vas apporter au site web tu vas les faire de maniere progressif sur le site pour qu'il soit bien fait et bien structurer 
// 1- pour tn travael & tours : il offres des visa travail,etude, residence et tourisme pour l canada ,et travail,etude tourisme pour schengen, et travail,tourisme pour dubaii, etude tourisme pour la chine 
// 2- pour tninternational training center : ont offre des cours d'allemende , italie,anglais,chinoi,francais les cours vont de 25.000 a 50.000; les cours pour le TCF coute 50.000 le mois ,pour les cours de sequetaria, maintenance informatique reseau et securiter ,utilisation de l'IA coute de 30.000 a 50.000 et les cours de vacanses pour les enfants coute 15.000 (la reduction pour les etudiant est toujours la avec les condition dit)
// 3- pour TN gestion et filcaliter : creation d'entrprise,encompagnement entreprenarial, immatriculation , accompagnement cnps, tsf declaration ,caisse et POS(informatisation et gestion)
// 4- pour tn drive academy : production de permis , cours d'auto ecole, reciclage de formation(a un permis mais veut plus de metrise), renouvellement de permis 
// 5- pour lorena : ajoute que les livraisons se font a domicile a douala et yaounde uniquement et aussi patout dans le cameroun par espedition 
// pour les partenais suprime celui de super car et RSSM contruction , modifi le nom de kremlin juste par "kremelin medical ", pour CGA le bon nom et nom complet est "CGA NMEC consulting"
// 5- les modification site dans se point doivent etre effectuer uniquement sur la pages d'accuille : 
// - sur la filiale sur gestion et fiscaliter retire "POS" sur cette image
// - sur le premier div de  la pages d'accuille qui affiche en premier en dessous de la nav bar , je veut que cette div sens retire l'animation et l'effet qui est decu que tu la fasse defiler de la droite vers la gauche puis la gauche vers la droite et afficher les information en premier lieu de celle qui est deja la puis la deuxieme celle de la premier div de la filiale gestion et ficaliter, la troixieme celle de la filiale training center la quatrierme celle de l'imigration, la cinquime celle de auto ecole , je precise bien que les animation de trasition des div la ne se font pas sur les image donc pas seulement les image mais toute la duv directement avec se qu'elle contient donc tu genre l'iamge et le test en gardans les effets et les couleur donc juste les faire defiler
// 6- sur toute mes pages tout les logos des partenaire ne sont pas bien alligner et il deborde legerement de leur element donc il faut tout ses logo soit bien centre visible et situer dans leur cadre sens deborder 
// 7-je veut aussi que le logo de toutes les filiale soit un peut plus grand pour une meille visibiler de leurs logo donc image 
// 8- les images que je vien de telverser tu vas les utilise comme images sur la presentation des filiale uniquement sur la pages d'accuille , donc tu rappel les images sur la presentation de filiale sur la pages d'accuille par celle aue je vein de televerse
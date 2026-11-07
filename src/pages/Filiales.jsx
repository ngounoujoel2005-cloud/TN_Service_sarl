import { Link, useParams } from 'react-router-dom'
import itcLogo from '../assets/training-center-logo.jpeg'
import travelLogo from '../assets/travel-tours-logo.jpeg'
import gestionLogo from '../assets/gestion-fiscalite-logo.jpeg'
import driveproLogo from '../assets/drivepro-logo.jpeg'
import lorenaLogo from '../assets/lorena-logo.png'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import InternationalTrainingCenter from './InternationalTrainingCenter.jsx'
import TravelTours from './TravelTours.jsx'
import GestionFiscalite from './GestionFiscalite.jsx'
import DriveProAcademy from './DriveProAcademy.jsx'
import LorenaStore from './LorenaStore.jsx'

const filiales = [
  { slug: 'itc', name: 'International Training Center', description: 'Langues : 25 000 à 50 000 F ; TCF : 50 000 F par mois ; formations professionnelles et cours de vacances pour enfants.', image: itcLogo },
  { slug: 'travel', name: 'TN Travel & Tours', description: 'Visas pour le Canada, Schengen, Dubaï et la Chine, plus billetterie et accompagnement au voyage.', image: travelLogo },
  { slug: 'gestion', name: 'TN Gestion & Fiscalité', description: 'Création et immatriculation, accompagnement entrepreneurial, CNPS, TSF, caisses et systèmes POS.', image: gestionLogo },
  { slug: 'drivepro', name: 'DrivePro Academy', description: 'Cours d’auto-école, accompagnement pour le permis, renouvellement et recyclage.', image: driveproLogo },
  { slug: 'lorena', name: 'Lorena E-Commerce', description: 'Boutique en ligne avec livraison à domicile à Douala et Yaoundé et expédition dans le reste du Cameroun.', image: lorenaLogo },
]

export default function Filiales() {
  const { slug } = useParams()
  const { t } = useLanguage()
  const selected = filiales.find((branch) => branch.slug === slug)

  if (selected?.slug === 'itc') return <InternationalTrainingCenter branch={selected} />
  if (selected?.slug === 'travel') return <TravelTours />
  if (selected?.slug === 'gestion') return <GestionFiscalite />
  if (selected?.slug === 'drivepro') return <DriveProAcademy />
  if (selected?.slug === 'lorena') return <LorenaStore />

  if (selected) {
    const name = t('branch.' + selected.slug + '.name', selected.name)
    const description = t('branch.' + selected.slug + '.description', selected.description)
    return (
      <section className="tn-simple-page tn-branch-detail">
        <p className="tn-simple-page__eyebrow">{t('page.branchEyebrow', 'FILIALE DU GROUPE TN SERVICES')}</p>
        <img className={selected.slug === 'lorena' ? 'is-lorena' : ''} src={selected.image} alt={'Logo ' + name} />
        <h1>{name}</h1>
        <p>{description}</p>
        <Link to="/filiales">{t('page.allBranchesBack', 'Voir toutes les filiales')}</Link>
      </section>
    )
  }

  return (
    <section className="tn-simple-page">
      <p className="tn-simple-page__eyebrow">{t('page.branchesEyebrow', 'LE GROUPE TN SERVICES')}</p>
      <h1>{t('page.branchesTitle', 'Nos filiales')}</h1>
      <p>{t('page.branchesDescription', 'Un groupe de services complémentaires pour vous accompagner au quotidien.')}</p>
      <div className="tn-simple-page__cards">
        {filiales.map((branch) => {
          const name = t('branch.' + branch.slug + '.name', branch.name)
          const description = t('branch.' + branch.slug + '.description', branch.description)
          return <Link className={'tn-branch-card' + (branch.slug === 'lorena' ? ' is-lorena' : '')} to={'/filiales/' + branch.slug} key={branch.slug}>
            <img src={branch.image} alt={'Logo ' + name} />
            <h2>{name}</h2>
            <p>{description}</p>
          </Link>
        })}
      </div>
    </section>
  )
}

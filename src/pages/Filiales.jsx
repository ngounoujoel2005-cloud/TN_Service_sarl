import { Link, useParams } from 'react-router-dom'
import itcLogo from '../assets/training-center-logo.jpeg'
import travelLogo from '../assets/travel-tours-logo.jpeg'
import gestionLogo from '../assets/gestion-fiscalite-logo.jpeg'
import driveproLogo from '../assets/drivepro-logo.jpeg'
import lorenaLogo from '../assets/lorena-logo.png'

const filiales = [
  { slug: 'itc', name: 'International Training Center', description: 'Formations certifiantes en informatique et en langues.', image: itcLogo },
  { slug: 'travel', name: 'TN Travel & Tours', description: 'Accompagnement pour vos visas et billets d’avion.', image: travelLogo },
  { slug: 'gestion', name: 'TN Gestion & Fiscalité', description: 'Conseil en gestion et solutions de caisse POS.', image: gestionLogo },
  { slug: 'drivepro', name: 'DrivePro Academy', description: 'Formation à la conduite et préparation aux permis.', image: driveproLogo },
  { slug: 'lorena', name: 'Lorena E-Commerce', description: 'Une sélection de produits et services en ligne.', image: lorenaLogo },
]

export default function Filiales() {
  const { slug } = useParams()
  const selected = filiales.find((branch) => branch.slug === slug)
  if (selected) return <section className="tn-simple-page tn-branch-detail"><p className="tn-simple-page__eyebrow">FILIALE DU GROUPE TN SERVICES</p><img className={selected.slug === 'lorena' ? 'is-lorena' : ''} src={selected.image} alt={`Logo ${selected.name}`} /><h1>{selected.name}</h1><p>{selected.description}</p><Link to="/filiales">← Voir toutes les filiales</Link></section>
  return <section className="tn-simple-page"><p className="tn-simple-page__eyebrow">LE GROUPE TN SERVICES</p><h1>Nos filiales</h1><p>Un groupe de services complémentaires pour vous accompagner au quotidien.</p><div className="tn-simple-page__cards">{filiales.map((branch) => <Link className={`tn-branch-card${branch.slug === 'lorena' ? ' is-lorena' : ''}`} to={`/filiales/${branch.slug}`} key={branch.slug}><img src={branch.image} alt={`Logo ${branch.name}`} /><h2>{branch.name}</h2><p>{branch.description}</p></Link>)}</div></section>
}

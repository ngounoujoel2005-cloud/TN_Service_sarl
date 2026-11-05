import { Sparkles } from 'lucide-react'
import './BranchMissionShowcase.css'

/** Shared, responsive mission panel for the five TN Services branches. */
export default function BranchMissionShowcase({ id, eyebrow, heading, missions, logo, isEnglish }) {
  const FirstMissionIcon = missions[0]?.Icon
  const SecondMissionIcon = missions[1]?.Icon
  const ThirdMissionIcon = missions[2]?.Icon

  return (
    <section className="tn-itc-missions tn-mission-showcase" id={id} data-reveal data-reveal-direction="left">
      <div className="tn-itc-section-heading">
        <span className="tn-itc-section-heading__icon"><Sparkles size={21} /></span>
        <div><p>{eyebrow}</p><h2>{heading}</h2></div>
      </div>

      <div className="tn-mission-showcase__layout">
        {missions.map(({ Icon, title, text, titleEn, textEn, tag, tagEn }, index) => (
          <article
            className={`tn-mission-showcase__item tn-mission-showcase__item--${index + 1}`}
            data-reveal
            data-reveal-direction={index % 2 === 0 ? 'bottom' : 'right'}
            key={title}
          >
            <span className="tn-mission-showcase__number">{String(index + 1).padStart(2, '0')}</span>
            <span className="tn-mission-showcase__icon"><Icon size={20} strokeWidth={1.8} /></span>
            <div className="tn-mission-showcase__copy">
              <span className="tn-mission-showcase__tag">{isEnglish ? tagEn : tag}</span>
              <h3>{isEnglish ? titleEn : title}</h3>
              <p>{isEnglish ? textEn : text}</p>
            </div>
          </article>
        ))}

        <div className="tn-mission-showcase__visual" aria-hidden="true">
          <span className="tn-mission-showcase__orbit tn-mission-showcase__orbit--outer" />
          <span className="tn-mission-showcase__orbit tn-mission-showcase__orbit--inner" />
          <span className="tn-mission-showcase__orb-glow" />
          <span className="tn-mission-showcase__satellite tn-mission-showcase__satellite--one">
            {FirstMissionIcon && <FirstMissionIcon size={17} strokeWidth={1.7} />}
          </span>
          <span className="tn-mission-showcase__satellite tn-mission-showcase__satellite--two">
            {SecondMissionIcon && <SecondMissionIcon size={16} strokeWidth={1.7} />}
          </span>
          <span className="tn-mission-showcase__satellite tn-mission-showcase__satellite--three">
            {ThirdMissionIcon && <ThirdMissionIcon size={15} strokeWidth={1.7} />}
          </span>
          <div className="tn-mission-showcase__orb">
            <span className="tn-mission-showcase__orb-shine" />
            <span className="tn-mission-showcase__orb-core">
              {logo && <img src={logo} alt="" />}
            </span>
          </div>
          <span className="tn-mission-showcase__visual-label">{isEnglish ? 'OUR PURPOSE' : 'NOTRE MISSION'}</span>
        </div>
      </div>
    </section>
  )
}

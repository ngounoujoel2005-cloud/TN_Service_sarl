import backgroundImage from '../assets/page-background.jpg'
import { useEffect, useRef } from 'react'
import './PageBackground.css'

export default function PageBackground() {
  const backgroundRef = useRef(null)

  useEffect(() => {
    const background = backgroundRef.current
    if (!background || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const onPointerMove = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 18
        const y = (event.clientY / window.innerHeight - 0.5) * 14
        background.style.setProperty('--parallax-x', `${x.toFixed(1)}px`)
        background.style.setProperty('--parallax-y', `${y.toFixed(1)}px`)
      })
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <div className="tn-page-background" ref={backgroundRef} aria-hidden="true">
      <div className="tn-page-background__image"><div className="tn-page-background__photo" style={{ backgroundImage: `url(${backgroundImage})` }} /></div>
      <div className="tn-page-background__glow" />
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './WhatsAppContact.css'

const contacts = [
  { name: 'Service principal', number: '+237 698 06 25 75', href: 'https://wa.me/237698062575?text=Bonjour%20TN%20Services%2C%20je%20souhaite%20avoir%20des%20informations.' },
  { name: 'Agence & services', number: '+237 653 99 40 10', href: 'https://wa.me/237653994010?text=Bonjour%20TN%20Services%2C%20je%20souhaite%20avoir%20des%20informations.' },
]

function WhatsAppIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.2A12.1 12.1 0 0 0 5.6 21.5L4 28l6.7-1.6A12.2 12.2 0 1 0 16 3.2Zm0 22.1c-1.8 0-3.6-.5-5.1-1.5l-.4-.2-3.9.9 1-3.8-.3-.4A9.8 9.8 0 1 1 16 25.3Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.3.3-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.3 3.6 5.7 5 .8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" /></svg>
}

export default function WhatsAppContact() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const widgetRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!widgetRef.current?.contains(event.target)) setOpen(false)
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className="tn-whatsapp" ref={widgetRef}>
      {open && <div className="tn-whatsapp__panel" role="dialog" aria-label={t('whatsapp.dialog', 'Choisir un numero WhatsApp')}>
        <strong>{t('whatsapp.title', 'Contactez TN SERVICES')}</strong>
        <p>{t('whatsapp.description', 'Choisissez le numero WhatsApp a contacter :')}</p>
        {contacts.map((contact, index) => <a key={contact.number} href={contact.href} target="_blank" rel="noreferrer">
          <span><b>{t(index === 0 ? 'whatsapp.main' : 'whatsapp.agency', contact.name)}</b><small>{contact.number}</small></span><WhatsAppIcon />
        </a>)}
      </div>}
      <button className="tn-whatsapp__button" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <WhatsAppIcon /><span>{t('whatsapp.button', 'Contactez-nous')}</span>
      </button>
    </div>
  )
}

import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { WHATSAPP_MESSAGES, whatsappLink } from '../data/site'
import { IconWhatsApp } from './Icons'
import { EASE } from './motion'

// Discreet WhatsApp entry point. Appears after the first scroll so it never covers hero CTAs,
// and lifts above the mobile sticky add-to-bag bar on product pages.
export default function WhatsAppFloat() {
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 300))

  const message = pathname.startsWith('/corporate-gifting') ? WHATSAPP_MESSAGES.gifting : WHATSAPP_MESSAGES.general
  const onProduct = pathname.startsWith('/product/')

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Kridhya on WhatsApp"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={`fixed right-4 z-40 flex h-12 w-12 items-center justify-center rounded-[4px] border border-gold/40 bg-wine-900 text-gold-light shadow-[0_10px_30px_-10px_rgba(26,5,11,0.6)] transition-colors hover:bg-wine-800 sm:right-6 ${
            onProduct ? 'bottom-[calc(84px+env(safe-area-inset-bottom))] lg:bottom-6' : 'bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6'
          }`}
        >
          <IconWhatsApp size={22} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}

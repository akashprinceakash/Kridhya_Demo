import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { BookOpen, Gift, House, LayoutGrid, PenLine, ShoppingBag, Sparkles } from 'lucide-react'
import LiquidNavbar from '@/components/ui/liquid-glass-navbar'
import Logo from './Logo'
import { NAV, WHATSAPP_MESSAGES, whatsappLink } from '../data/site'
import { useCart } from '../context/CartContext'
import { IconBag, IconClose, IconMenu, IconSearch, IconWhatsApp } from './Icons'
import { EASE } from './motion'


// Pages whose first section is dark — header text is beige there, burgundy on light pages.
const DARK_TOP = ['/', '/corporate-gifting', '/our-story', '/about', '/collections']

const ico = { size: 17, strokeWidth: 1.6, 'aria-hidden': true }
const PILL_ITEMS = [
  { label: 'Home', icon: <House {...ico} />, fx: 'pop' },
  { label: 'Shop', icon: <ShoppingBag {...ico} />, fx: 'wave' },
  { label: 'Collections', icon: <LayoutGrid {...ico} />, fx: 'spin' },
  { label: 'Corporate Gifting', icon: <Gift {...ico} />, fx: 'pop' },
  { label: 'Our Story', icon: <BookOpen {...ico} />, fx: 'spin' },
  { label: 'About', icon: <Sparkles {...ico} />, fx: 'pop' },
  { label: 'Journal', icon: <PenLine {...ico} />, fx: 'wave' },
]
const PILL_ROUTES = ['/', '/shop', '/collections', '/corporate-gifting', '/our-story', '/about', '/blog']

// Map nested routes (product, category archive, blog post) onto their section's tab.
function activeIndex(path) {
  if (path.startsWith('/product') || path.startsWith('/shop')) return 1
  if (path.startsWith('/collections')) return 2
  if (path.startsWith('/blog')) return 6
  const i = PILL_ROUTES.indexOf(path)
  return i < 0 ? 0 : i
}

function useMedia(q) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setMatch(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [q])
  return match
}

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const wide = useMedia('(min-width: 1280px)')
  // The WebGL pill only mounts where it is shown (tablet and up) — phones use the slide-out menu.
  const showPill = useMedia('(min-width: 768px)')
  const { count, setOpen } = useCart()
  const [menu, setMenu] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > 320 && y > prev)
  })

  useEffect(() => setMenu(false), [pathname])
  // Expose header visibility so sticky page bars (e.g. shop filters) can tuck in beneath it.
  useEffect(() => {
    document.documentElement.dataset.header = hidden && !menu ? 'hidden' : 'shown'
  }, [hidden, menu])
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])

  // Always transparent, sitting slightly below the edge; the glass navbar pill carries its own backdrop.
  const darkTop = DARK_TOP.includes(pathname)
  const tone = darkTop ? 'text-ivory' : 'text-wine-900'

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menu ? '-130%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
        className="fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-50 sm:top-4"
      >
        <div className="container-site">
          <div className={`relative flex h-[62px] items-center justify-between gap-4 px-3 sm:px-5 ${tone}`}>
            <Link to="/" aria-label="Kridhya by Devanshi — home" className="shrink-0">
              <Logo />
            </Link>

            {/* liquid-glass pill: icons only on tablet / small laptop, labelled from xl */}
            {showPill && (
            <div className="absolute left-1/2 -translate-x-1/2">
              <LiquidNavbar
                items={PILL_ITEMS}
                active={activeIndex(pathname)}
                onChange={(i) => navigate(PILL_ROUTES[i])}
                tone={darkTop ? 'dark' : 'light'}
                compact={!wide}
              />
            </div>
            )}

          <div className="-mr-2 flex items-center">
            <Link to="/shop" className="hidden h-10 w-10 items-center justify-center hover:text-gold sm:inline-flex" aria-label="Search the shop">
              <IconSearch size={18} />
            </Link>
            <button type="button" onClick={() => setOpen(true)} className="relative inline-flex h-10 w-10 items-center justify-center hover:text-gold" aria-label={`Open shopping bag, ${count} items`}>
              <IconBag size={18} />
              {count > 0 && (
                <span className="absolute right-0.5 top-1 flex h-4 min-w-4 items-center justify-center bg-gold px-1 text-[9px] font-semibold text-wine-950">{count}</span>
              )}
            </button>
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center md:hidden" aria-label="Open menu" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(true)}>
              <IconMenu size={22} />
            </button>
          </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-wine-950/60 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenu(false)} />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-[61] flex w-[86%] max-w-sm flex-col bg-wine-950 text-ivory md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex h-16 items-center justify-between px-5">
                <span className="eyebrow text-gold">Menu</span>
                <button type="button" className="-mr-2 inline-flex h-10 w-10 items-center justify-center" aria-label="Close menu" onClick={() => setMenu(false)}>
                  <IconClose size={22} />
                </button>
              </div>
              <nav aria-label="Mobile" className="flex-1 px-5 pt-4">
                <ul>
                  {NAV.map((n, i) => (
                    <motion.li key={n.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE }}>
                      <NavLink to={n.to} className={({ isActive }) => `block border-b border-ivory/10 py-3.5 font-display text-2xl ${isActive ? 'text-gold' : ''}`}>
                        {n.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <a href={whatsappLink(WHATSAPP_MESSAGES.general)} target="_blank" rel="noreferrer" className="btn btn-gold w-full">
                  <IconWhatsApp size={16} /> Chat with us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Brand-wide configuration. Items marked PENDING need client confirmation before launch.

// PENDING: replace with the verified business WhatsApp number (country code, digits only).
export const WHATSAPP_NUMBER = '919886921568'

export const WHATSAPP_MESSAGES = {
  general: 'Hello Kridhya by Devanshi, I would love some help choosing a piece. Could you assist me?',
  gifting:
    'Hello Kridhya by Devanshi, I’m interested in corporate gifting or bulk jewellery orders. Could you please share the available options and details?',
  product: (name) => `Hello Kridhya by Devanshi, I’m interested in the ${name}. Could you share more details?`,
}

export const whatsappLink = (message = WHATSAPP_MESSAGES.general) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const NAV = [
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/collections' },
  { label: 'Corporate Gifting', to: '/corporate-gifting' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'About', to: '/about' },
  { label: 'Journal', to: '/blog' },
]

export const formatPrice = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

// Image slot registry — the single place to swap photography.
// When VK delivers final images: drop the new file into /public/images/<folder>/,
// update `src` + `alt` here and set `placeholder: false`. Layouts reserve aspect ratios,
// so no component needs to change.

const e = (name) => `/images/editorial/${name}.webp`
const g = (name) => `/images/generated/${name}.webp`

export const IMG = {
  // Full-bleed hero carousel — 16:9 banners at 3840 / 1920 / 1080 widths (served via srcset).
  // TEMPORARY stock (Unsplash licence, see /public/images/hero/CREDITS.md) until VK's approved banners arrive.
  // To swap: export each banner at 3840×2160, save as hero-<name>-{3840,1920,1080}.webp, update `name` + `alt`.
  // `position` is the focal point kept in frame on narrow/portrait screens.
  heroSlides: [
    { name: 'layering', alt: 'Woman in an ivory shirt wearing layered fine gold necklaces and stacked rings', position: '50% 40%', mobilePosition: '45% 50%', placeholder: true },
    { name: 'bracelets', alt: 'Outstretched wrists wearing delicate gold chain bracelets against black drapery', position: '60% 45%', mobilePosition: '64% 50%', placeholder: true },
    { name: 'everyday-gold', alt: 'Layered gold necklaces and sculptural rings worn against warm skin tones', position: '50% 45%', mobilePosition: '50% 40%', placeholder: true },
    { name: 'gifting', alt: 'Polished gold herringbone necklace worn with a black blazer', position: '62% 40%', mobilePosition: '66% 40%', placeholder: true },
  ],
  heroBanner: { src: e('hero-banner'), alt: 'Lotus pendant displayed on stone amid burgundy florals', placeholder: true },
  storyStill: { src: e('story-still-life'), alt: 'Lotus ring and pendant arranged on stone with dried roses', placeholder: true },
  modelPortrait: { src: e('model-portrait'), alt: 'Woman wearing lotus drop earrings in warm light', placeholder: true },
  designSketch: { src: e('design-sketch'), alt: 'Hand sketching a lotus jewellery design in pencil', placeholder: true },
  artisanDetail: { src: e('artisan-detail'), alt: 'Close detail of a lotus pendant being finished by hand', placeholder: true },
  necklaceCloseup: { src: e('necklace-closeup'), alt: 'Delicate lotus necklace worn with a burgundy saree', placeholder: true },
  collectionStill: { src: e('collection-still-life'), alt: 'Lotus jewellery set displayed on a stone plinth', placeholder: true },
  womanWearing: { src: e('woman-wearing'), alt: 'Woman in a burgundy saree wearing fine jewellery', placeholder: true },
  ringStill: { src: e('ring-still-life'), alt: 'Lotus cocktail ring on textured stone', placeholder: true },
  giftBox: { src: e('gift-box'), alt: 'Lotus ring presented in a burgundy velvet gift box', placeholder: true },
  heartRose: { src: e('heart-necklace-rose-satin'), alt: 'Rose gold infinity heart necklace on satin', placeholder: true },
  heartSilver: { src: e('heart-necklace-silver-satin'), alt: 'Silver infinity heart necklace on satin', placeholder: true },
  doubleGold: { src: e('double-strand-gold-satin'), alt: 'Gold double strand infinity necklace on satin', placeholder: true },
  doubleRose: { src: e('double-strand-rose-satin'), alt: 'Rose gold double strand infinity necklace on satin', placeholder: true },
  lariatSilver: { src: e('lariat-silver-satin'), alt: 'Silver lariat necklace with heart drop', placeholder: true },

  // Generated art (procedural satin backdrops) — decorative, safe to keep after the swap
  satinWine: { src: g('satin-burgundy'), alt: '' },
  satinBeige: { src: g('satin-beige'), alt: '' },
  satinWineGold: { src: g('satin-wine-gold'), alt: '' },
}

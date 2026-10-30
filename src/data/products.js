// MOCKUP CATALOGUE
// Names follow the product image files supplied. Prices are SAMPLE values for layout only —
// replace with the approved WooCommerce prices before launch (priceStatus: 'sample' flags them).
// Every image is a temporary placeholder until VK's final photography arrives.

const p = (file) => `/images/products/${file}.webp`
const e = (file) => `/images/editorial/${file}.webp`

export const CATEGORIES = [
  { slug: 'necklaces', name: 'Necklaces', blurb: 'Pendants, lariats and layered strands that sit softly at the collarbone.', cover: e('heart-necklace-gold-satin') },
  { slug: 'earrings', name: 'Earrings', blurb: 'Studs for every day, drops for every occasion.', cover: p('ashta-studa-14d0b223') },
  { slug: 'bracelets', name: 'Bracelets & Cuffs', blurb: 'Open cuffs and fine bracelets that move with you.', cover: p('ananta-gulabi-914b1b68') },
  { slug: 'rings', name: 'Rings', blurb: 'Stackable bands and statement silhouettes.', cover: p('layered-eternity-336df71a') },
  { slug: 'brooches', name: 'Brooches', blurb: 'A finishing flourish for sarees, blazers and shawls.', cover: p('infinity-brooch-99dfbe5a') },
]

const base = (o) => ({ priceStatus: 'sample', placeholder: true, finishes: ['Gold'], ...o })

export const PRODUCTS = [
  base({
    slug: 'infinity-heart-necklace', name: 'Infinity Heart Necklace', category: 'necklaces', price: 3450,
    finishes: ['Gold', 'Rose Gold', 'Silver'], badge: 'Bestseller',
    images: [p('infinity-heart-necklace-a83d0c09'), e('heart-necklace-gold-satin'), p('infinity-heart-necklace-29cfc86d'), p('infinity-heart-necklace-e5353036')],
    short: 'A pavé heart entwined with an infinity loop on a fine adjustable chain.',
  }),
  base({
    slug: 'double-strand-infinity-necklace', name: 'Double Strand Infinity Necklace', category: 'necklaces', price: 3950,
    finishes: ['Gold', 'Rose Gold', 'Silver'], badge: 'New',
    images: [e('double-strand-gold-satin'), p('double-strand-infinity-necklace-a87280cc'), e('double-strand-rose-satin'), p('double-strand-infinity-necklace-31169cda')],
    short: 'Two delicate strands — a solitaire drop above, an infinity drop below.',
  }),
  base({
    slug: 'eternal-love-infinity-necklace', name: 'Eternal Love Lariat', category: 'necklaces', price: 3250,
    finishes: ['Gold', 'Rose Gold', 'Silver'],
    images: [e('lariat-gold-satin'), p('eternal-love-infinity-necklace-77f49dad'), e('lariat-rose-satin'), e('lariat-silver-satin')],
    short: 'A Y-lariat finished with an infinity knot and a tiny heart drop.',
  }),
  base({
    slug: 'the-lemniscate', name: 'The Lemniscate', category: 'necklaces', price: 2850,
    images: [p('the-lemniscate-5dd8e835'), p('the-lemniscate-8c35dd3d')],
    short: 'An open infinity link suspending a blush pear-cut drop.',
  }),
  base({
    slug: 'padmaraga', name: 'Padmaraga Pendant', category: 'necklaces', price: 3650,
    finishes: ['Rose Gold', 'Gold', 'Silver'], badge: 'New',
    images: [p('padmaraga-dbd399bc'), p('padmaraga-ed357230'), p('padmaraga-21637905')],
    short: 'A sparkling crown setting above a peach-toned pear drop.',
  }),
  base({
    slug: 'ashta', name: 'Ashta Pendant', category: 'necklaces', price: 2450,
    images: [p('ashta-4ef671e9'), p('ashta-a0153cdb')],
    short: 'A sculpted figure-eight pendant on a whisper-fine chain.',
  }),
  base({
    slug: 'granthi', name: 'Granthi Pendant', category: 'necklaces', price: 2250,
    finishes: ['Silver'],
    images: [p('granthi-78bcb8aa')],
    short: 'A softly knotted loop — simple, symbolic, everyday.',
  }),
  base({
    slug: 'sandhya', name: 'Sandhya Pendant', category: 'necklaces', price: 2650,
    images: [p('sandhya-055169bf')],
    short: 'An infinity bar with a petite blush drop, like dusk light.',
  }),
  base({
    slug: 'ashta-studs', name: 'Ashta Studs', category: 'earrings', price: 2950,
    finishes: ['Gold', 'Silver'], badge: 'Bestseller',
    images: [p('ashta-studa-14d0b223'), p('ashta-studa-ff8ef6aa'), p('ashta-studa-0510a271')],
    short: 'Figure-eight studs cradling a faceted peach pear stone.',
  }),
  base({
    slug: 'bindu', name: 'Bindu Studs', category: 'earrings', price: 1850,
    finishes: ['Rose Gold', 'Silver', 'Gold'],
    images: [p('bindu-246a05b3'), p('bindu-4ca2503a'), p('bindu-7017036c')],
    short: 'Infinity studs with a single centre sparkle.',
  }),
  base({
    slug: 'sandhya-studs', name: 'Sandhya Studs', category: 'earrings', price: 1950,
    finishes: ['Rose Gold'],
    images: [p('sandhya-studs-2a48f163')],
    short: 'Rose-toned infinity studs with a blush drop.',
  }),
  base({
    slug: 'dipa', name: 'Dipa Drops', category: 'earrings', price: 2750,
    images: [p('dipa-ef310d0b')],
    short: 'Elongated flame-shaped drops with a glowing peach stone.',
  }),
  base({
    slug: 'granthi-drops', name: 'Granthi Drops', category: 'earrings', price: 2550,
    images: [p('granthi-drops-6461b56d')],
    short: 'Twin knotted loops finished with pink pear drops.',
  }),
  base({
    slug: 'gulal', name: 'Gulal Drops', category: 'earrings', price: 3150,
    finishes: ['Silver'], badge: 'Statement',
    images: [p('gulal-9fea571a')],
    short: 'Hoop-hung drops with a rich magenta bezel-set stone.',
  }),
  base({
    slug: 'ananta-gulabi', name: 'Ananta Gulabi Cuff', category: 'bracelets', price: 4250,
    finishes: ['Rose Gold', 'Gold'], badge: 'Bestseller',
    images: [p('ananta-gulabi-914b1b68'), p('ananta-gulabi-088b7222'), p('ananta-gulabi-25d3bc55')],
    short: 'An open infinity cuff traced with rose-pink stones.',
  }),
  base({
    slug: 'ananta-nilam', name: 'Ananta Nilam Cuff', category: 'bracelets', price: 4250,
    finishes: ['Silver'],
    images: [p('ananta-nilam-23dc2088'), p('ananta-nilam-c41abf25')],
    short: 'The Ananta silhouette in silver with deep blue stones.',
  }),
  base({
    slug: 'blue-eye-infinity-bracelet', name: 'Blue Eye Infinity Bracelet', category: 'bracelets', price: 2950,
    images: [p('blue-eye-infinity-bracelet-63910e4b')],
    short: 'A protective evil-eye charm set into a sparkling infinity cuff.',
  }),
  base({
    slug: 'double-loop-bracelet', name: 'Double Loop Bracelet', category: 'bracelets', price: 2650,
    images: [p('double-loop-ad-bracelet-3d7e9793')],
    short: 'Interlocking pavé loops on a fine chain.',
  }),
  base({
    slug: 'bindu-cuff', name: 'Bindu Crossover Ring', category: 'rings', price: 2350,
    finishes: ['Rose Gold'], badge: 'New',
    images: [p('bindu-cuff-f7658393')],
    short: 'A crossover band meeting at a sparkling infinity centre.',
  }),
  base({
    slug: 'layered-eternity', name: 'Layered Eternity Ring', category: 'rings', price: 3850,
    finishes: ['Silver', 'Rose Gold'],
    images: [p('layered-eternity-336df71a')],
    short: 'Stacked eternity bands in two tones, worn as one.',
  }),
  base({
    slug: 'infinity-brooch', name: 'Infinity Brooch', category: 'brooches', price: 2450,
    finishes: ['Rose Gold', 'Silver'],
    images: [p('infinity-brooch-99dfbe5a'), p('infinity-brooch-faff9bb7')],
    short: 'A sculptural infinity with a channel of sparkle.',
  }),
  base({
    slug: 'lemniscate-brooch', name: 'Lemniscate Brooch', category: 'brooches', price: 2150,
    finishes: ['Silver', 'Gold'],
    images: [p('lemniscate-brooch-0b7273f4'), p('lemniscate-brooch-a1509eda')],
    short: 'A clean, polished infinity pin with a pavé crossing.',
  }),
]

export const getProduct = (slug) => PRODUCTS.find((x) => x.slug === slug)
export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug)
export const byCategory = (slug) => PRODUCTS.filter((x) => x.category === slug)

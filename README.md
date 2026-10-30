# Kridhya by Devanshi — Website Mockup

A responsive, end-to-end mockup of the site revamp described in `Kridhya_By_Devanshi_Developer_Brief_Final.docx`.

**Stack:** React 18 · Vite 5 · Tailwind CSS 3 · Motion / Framer Motion 14 · Lenis smooth scroll · React Router 6

shadcn-style layout: reusable third-party UI lives in `src/components/ui/` (alias `@/components/ui`, see `components.json`). `panoramic-spread-hero.tsx` (adapted from 21st.dev) is TypeScript; Vite compiles `.tsx` alongside the existing `.jsx`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Pages
| Route | Brief section |
|---|---|
| `/` | §2 Hero slideshow (autoplay, pause/play, prev/next, dots, reduced-motion aware) + parallax home |
| `/shop`, `/collections`, `/collections/:slug` | §3 Category browsing, finish filter, search, sort, pagination, visible prices |
| `/product/:slug` | §3 Product page with price, finishes, gallery (swipe on mobile), sticky mobile add-to-bag |
| `/corporate-gifting` | §4 Hero, value proposition, occasions, highlights, process, enquiry form + WhatsApp CTA |
| `/our-story` | §6 Editorial layout (template copy — replace with the existing Our Story text) |
| `/about` | §7 Uses the brief's draft About Us copy (pending client approval) |
| `/blog`, `/blog/:slug` | §8 Journal listing + single-post template with H1/H2/H3, captions, internal links |
| Floating button | §5 WhatsApp button, shown after first scroll, pre-filled message per page |

## Swapping in VK's final images (§11)
Placeholders are all marked: `data-placeholder="true"` in the DOM and `placeholder: true` in data.

1. Drop the new files into `public/images/` (`editorial/`, `products/`).
2. Update paths and alt text in **`src/data/images.js`** (hero, editorial slots) and **`src/data/products.js`** (product galleries).
3. Every frame reserves its own aspect ratio, so layouts don't need to change.

To list every placeholder still on a page, run `document.querySelectorAll('[data-placeholder]')` in the browser console.

## Pending client confirmations
- **WhatsApp number:** `WHATSAPP_NUMBER` in `src/data/site.js` is a dummy value.
- **Prices:** all prices are *sample* values (`priceStatus: 'sample'`). Replace them with approved WooCommerce prices.
- **Category and collection names:** working structure only (Necklaces, Earrings, Bracelets & Cuffs, Rings, Brooches).
- **Product details:** materials and dimensions are marked "to be confirmed".
- **About Us and Our Story copy:** drafts. No brand history or craftsmanship claims have been added.
- **Logo:** `src/components/Logo.jsx` is a vector redraw of the supplied mark. Replace it with the approved master SVG.

## Generated art
`public/images/generated/` holds procedurally generated satin backdrops in burgundy, beige, and wine-gold. Brand ornaments are inline SVG: the lotus mark and a self-drawing infinity line.

import { Link } from 'react-router-dom'
import { CATEGORIES, byCategory } from '../data/products'
import { IconArrow } from '../components/Icons'
import useDocumentMeta from '../hooks/useDocumentMeta'

// Category names are the working structure — confirm final collection names with the client.
export default function Collections() {
  useDocumentMeta('Collections | Kridhya by Devanshi', 'Explore Kridhya jewellery by category — necklaces, earrings, cuffs, rings and brooches.')
  return (
    <>
      {/* hero: banner image behind the heading and category index.
          Wide 4K placeholder (temporary stock, see /images/hero/CREDITS.md) until VK's collection banner arrives. */}
      <section className="grain relative isolate overflow-hidden bg-wine-950 text-ivory">
        <img
          src="/images/hero/hero-everyday-gold-1920.webp"
          srcSet="/images/hero/hero-everyday-gold-1080.webp 1080w, /images/hero/hero-everyday-gold-1920.webp 1920w, /images/hero/hero-everyday-gold-3840.webp 3840w"
          sizes="100vw"
          alt=""
          data-placeholder="true"
          fetchpriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_40%]"
        />
        {/* burgundy grade: keeps the photo visible while the header, heading and index stay readable */}
        <div className="absolute inset-0 -z-10 bg-wine-950/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-wine-950/80 via-wine-950/30 to-wine-950/60" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-wine-950/80 to-transparent" />

        <div className="container-site grid gap-10 pb-10 pt-32 lg:min-h-[72svh] lg:grid-cols-12 lg:items-end lg:pb-12 lg:pt-36">
          <div className="lg:col-span-5">
            <p className="eyebrow font-semibold text-gold">Collections</p>
            <h1 className="h-display mt-4 font-medium">Explore by category</h1>
            <p className="mt-5 max-w-md text-[18px] font-medium leading-relaxed text-ivory/85">
              Every piece, organised the way you shop — choose a category to see the full archive.
            </p>
            <Link to="/shop" className="btn btn-gold mt-8 font-semibold">Shop all jewellery <IconArrow size={14} /></Link>
          </div>
          <nav aria-label="Categories" className="lg:col-span-6 lg:col-start-7">
            <ol className="border-t border-ivory/25">
              {CATEGORIES.map((c, i) => (
                <li key={c.slug} className="border-b border-ivory/25">
                  <Link to={`/collections/${c.slug}`} className="group flex min-h-[64px] items-center gap-5 py-3 hover:text-gold-light">
                    <span className="w-7 font-display text-[16px] italic text-gold">0{i + 1}</span>
                    <span className="flex-1 font-display text-[clamp(calc(1.5rem_+_2px),calc(2.6vw_+_2px),calc(2.1rem_+_2px))] font-medium leading-none">{c.name}</span>
                    <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ivory/75">{byCategory(c.slug).length} pieces</span>
                    <IconArrow size={16} className="text-gold" />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* category tiles */}
      <section className="section bg-ivory">
        <div className="container-site grid grid-cols-2 gap-4 lg:grid-cols-6 lg:gap-5">
          {CATEGORIES.map((c, i) => (
            <div key={c.slug} className={i < 2 ? 'col-span-2 sm:col-span-1 lg:col-span-3' : i === 4 ? 'col-span-2 sm:col-span-1 lg:col-span-2' : 'lg:col-span-2'}>
              <Link to={`/collections/${c.slug}`} className="group block" aria-label={`View ${c.name}`}>
                <div className="overflow-hidden border border-gold/40 bg-cream p-1.5" style={{ aspectRatio: i < 2 ? '4/3' : '1/1' }}>
                  <img src={c.cover} alt={`${c.name} by Kridhya`} loading="lazy" data-placeholder="true" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-[26px] font-semibold">{c.name}</h2>
                    <p className="mt-1 max-w-xs text-[16px] font-medium text-wine-900/70">{c.blurb}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 pt-1.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                    {byCategory(c.slug).length} pieces <IconArrow size={13} />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

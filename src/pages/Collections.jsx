import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageHero } from '../components/ui'
import { ParallaxImage, Stagger, TiltCard, blurChild } from '../components/motion'
import { CATEGORIES, byCategory } from '../data/products'
import { IMG } from '../data/images'
import { IconArrow } from '../components/Icons'
import useDocumentMeta from '../hooks/useDocumentMeta'

// Category names are the working structure — confirm final collection names with the client.
export default function Collections() {
  useDocumentMeta('Collections | Kridhya by Devanshi', 'Explore Kridhya jewellery by category — necklaces, earrings, cuffs, rings and brooches.')
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="Explore by category"
        intro="Every piece, organised the way you shop — choose a category to see the full archive."
        image={IMG.collectionStill.src}
        imageAlt={IMG.collectionStill.alt}
        detail="/images/products/ashta-studa-14d0b223.webp"
        detailAlt="Ashta studs with peach pear stones"
      />
      <section className="section bg-ivory">
        <Stagger className="container-site grid grid-cols-2 gap-4 lg:grid-cols-6 lg:gap-5">
          {CATEGORIES.map((c, i) => (
            <motion.div key={c.slug} variants={blurChild} className={i < 2 ? 'col-span-2 sm:col-span-1 lg:col-span-3' : i === 4 ? 'col-span-2 sm:col-span-1 lg:col-span-2' : 'lg:col-span-2'}>
              <TiltCard max={4}>
                <Link to={`/collections/${c.slug}`} className="group block" aria-label={`View ${c.name}`}>
                  <ParallaxImage src={c.cover} alt={`${c.name} by Kridhya`} placeholder ratio={i < 2 ? '4/3' : '1/1'} strength={8} className="bg-cream" />
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl">{c.name}</h2>
                      <p className="mt-1 max-w-xs text-[13.5px] text-wine-900/60">{c.blurb}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 pt-1.5 text-[11px] uppercase tracking-[0.16em] text-gold-deep">
                      {byCategory(c.slug).length} pieces <IconArrow size={13} className="transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </Stagger>
      </section>
    </>
  )
}

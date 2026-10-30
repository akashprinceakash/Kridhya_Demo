import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import HeroSlideshow from '../components/HeroSlideshow'
import PanoramicSpreadHero from '@/components/ui/panoramic-spread-hero'
import { SectionHeading, TextLink } from '../components/ui'
import CoverflowCarousel from '../components/CoverflowCarousel'
import { ExpandFrame, FadeUp, ParallaxImage, Stagger, TiltCard, VelocityMarquee, blurChild } from '../components/motion'
import { IMG, srcSetFor } from '../data/images'
import { CATEGORIES, PRODUCTS } from '../data/products'
import { POSTS } from '../data/blog'
import { WHATSAPP_MESSAGES, whatsappLink } from '../data/site'
import { IconArrow, IconWhatsApp } from '../components/Icons'
import { LotusMark } from '../components/Logo'
import Mandala from '../components/Mandala'
import Founders from '../components/Founders'
import useDocumentMeta from '../hooks/useDocumentMeta'

export default function Home() {
  useDocumentMeta('Kridhya by Devanshi — Jewellery for the Moments That Matter', 'Thoughtfully designed jewellery for everyday elegance and meaningful gifting.')
  return (
    <>
      <HeroSlideshow />
      <PanoramicSpreadHero>
        <Link to="/shop" className="btn btn-gold">Shop the collection <IconArrow size={14} /></Link>
      </PanoramicSpreadHero>
      <Categories />
      <Band />
      <Bestsellers />
      <ParallaxColumns />
      <Gifting />
      <Founders variant="teaser" />
      <Journal />
    </>
  )
}

/* Categories — compact tiles with pointer tilt and an inner parallax image */
function Categories() {
  return (
    <section className="section bg-ivory">
      <div className="container-site">
        <SectionHeading eyebrow="Shop by category" title="Find your signature" action={<TextLink to="/collections">All collections</TextLink>} />
        <Stagger className="scrollbar-none -mx-5 mt-10 flex snap-x gap-3 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <motion.div key={c.slug} variants={blurChild} className="w-[44vw] shrink-0 snap-start sm:w-auto">
              <TiltCard>
                <Link to={`/collections/${c.slug}`} className="group block">
                  <ParallaxImage src={c.cover} alt={`${c.name} by Kridhya`} placeholder ratio="3/4" strength={8} className="bg-cream" />
                  <div className="mt-3 flex items-center justify-between">
                    <h3 className="font-display text-[22px]">{c.name}</h3>
                    <IconArrow size={14} className="text-gold-deep transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* Thin brand band — drifts, and speeds up / reverses with scroll velocity */
function Band() {
  const words = ['Everyday elegance', 'Meaningful gifting', 'Timeless design', 'Made to be treasured']
  return (
    <VelocityMarquee className="border-y border-gold/15 bg-wine-900 py-4 text-ivory" baseVelocity={-1.5}>
      {words.map((w) => (
        <span key={w} className="flex items-center gap-8 pr-8 font-display text-[22px] italic sm:text-[26px]">
          {w}
          <LotusMark className="h-4 w-4 text-gold" />
        </span>
      ))}
    </VelocityMarquee>
  )
}

function Bestsellers() {
  const tabs = [{ slug: 'all', name: 'All' }, ...CATEGORIES.slice(0, 3)]
  const [tab, setTab] = useState('all')
  const list = useMemo(
    () => (tab === 'all' ? [...PRODUCTS].sort((a, b) => !!b.badge - !!a.badge) : PRODUCTS.filter((p) => p.category === tab)).slice(0, 8),
    [tab],
  )
  return (
    <section className="section overflow-hidden bg-ivory">
      <div className="container-site">
        <SectionHeading eyebrow="Most loved" title="Pieces our clients return to" action={<TextLink to="/shop">Shop all</TextLink>} />
        <div className="scrollbar-none -mx-5 mt-8 flex gap-6 overflow-x-auto border-b border-wine-900/10 px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter bestsellers">
          {tabs.map((t) => (
            <button
              key={t.slug}
              role="tab"
              aria-selected={tab === t.slug}
              onClick={() => setTab(t.slug)}
              className={`-mb-px min-h-[44px] min-w-[44px] shrink-0 border-b text-center text-[13px] uppercase tracking-[0.18em] transition-colors ${tab === t.slug ? 'border-wine-900 text-wine-900' : 'border-transparent text-wine-900/55 hover:text-wine-900'}`}
            >
              {t.name}
            </button>
          ))}
        </div>
        <FadeUp className="mt-10">
          <CoverflowCarousel key={tab} products={list} />
        </FadeUp>
      </div>
    </section>
  )
}

/* Three image columns travelling at different speeds and directions */
function ParallaxColumns() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 })
  const up = useTransform(p, [0, 1], reduce ? [0, 0] : [60, -160])
  const down = useTransform(p, [0, 1], reduce ? [0, 0] : [-140, 80])
  const upSlow = useTransform(p, [0, 1], reduce ? [0, 0] : [30, -90])

  const col = (srcs, y, extra = '') => (
    <motion.div style={{ y }} className={`flex flex-col gap-3 ${extra}`}>
      {srcs.map(([src, alt]) => (
        // framed: thin gold rule around an ivory mount, like a gallery print
        <div key={src} className="border border-gold/60 bg-ivory p-1.5 shadow-[0_18px_40px_-26px_rgba(43,9,18,0.55)] sm:p-2">
          <img src={src} alt={alt} loading="lazy" data-placeholder="true" className="aspect-[4/5] w-full object-cover outline outline-1 outline-offset-0 outline-gold/30" />
        </div>
      ))}
    </motion.div>
  )

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-cream">
      {/* mandala backdrop (original, light, static): a large wheel behind the gallery, a smaller one under the copy */}
      <Mandala className="pointer-events-none absolute -right-48 top-1/2 -z-10 h-[900px] w-[900px] -translate-y-1/2 text-gold/25 sm:-right-40" strokeWidth={0.7} />
      <Mandala className="pointer-events-none absolute -left-40 -top-24 -z-10 h-[460px] w-[460px] text-wine-700/[0.09]" strokeWidth={0.8} />
      <div className="container-site grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-12 lg:py-0">
        <div className="lg:col-span-4">
          <FadeUp as="p" className="eyebrow text-[14.5px] font-semibold text-gold-deep">The Infinity Edit</FadeUp>
          <FadeUp as="h2" delay={0.05} className="mt-3 text-[clamp(calc(2.3rem_+_2px),calc(4.2vw_+_2px),calc(3.6rem_+_2px))] font-medium leading-[1.05]">A line with no beginning and no end</FadeUp>
          <FadeUp as="p" delay={0.1} className="mt-5 max-w-sm text-[19px] font-medium leading-relaxed text-wine-900/75">
            An endless loop, reimagined in gold, rose gold and silver — for bonds, promises and everyday rituals.
          </FadeUp>
          <FadeUp delay={0.15} className="mt-6">
            <Link to="/shop" className="btn btn-wine">Discover the edit <IconArrow size={14} /></Link>
          </FadeUp>
        </div>
        <div className="grid h-[440px] grid-cols-3 gap-3 overflow-hidden sm:h-[580px] sm:gap-4 lg:col-span-7 lg:col-start-6 lg:h-[700px]">
          {col([['/images/products/ananta-gulabi-914b1b68.webp', 'Ananta Gulabi cuff'], ['/images/products/bindu-246a05b3.webp', 'Bindu studs'], ['/images/products/the-lemniscate-5dd8e835.webp', 'The Lemniscate necklace']], up)}
          {col([['/images/editorial/double-strand-gold-satin.webp', 'Double strand necklace'], ['/images/products/infinity-brooch-faff9bb7.webp', 'Infinity brooch'], ['/images/products/sandhya-studs-2a48f163.webp', 'Sandhya studs']], down, '-mt-40')}
          {col([['/images/products/layered-eternity-336df71a.webp', 'Layered eternity ring'], ['/images/editorial/heart-necklace-rose-satin.webp', 'Infinity heart necklace'], ['/images/products/ashta-studa-ff8ef6aa.webp', 'Ashta studs']], upSlow)}
        </div>
      </div>
    </section>
  )
}

/* Gifting — framed window opens to full bleed on scroll */
function Gifting() {
  return (
    <ExpandFrame src={IMG.giftBanner.src} alt={IMG.giftBanner.alt} position={IMG.giftBanner.position} className="bg-wine-950 text-ivory">
      <div className="container-site flex min-h-[64svh] items-center py-12">
        <div className="max-w-md">
          <FadeUp as="p" className="eyebrow text-gold">Corporate gifting &amp; bulk orders</FadeUp>
          <FadeUp as="h2" delay={0.05} className="h-section mt-3">Gifting, made meaningful.</FadeUp>
          <FadeUp as="p" delay={0.1} className="mt-4 text-[17px] leading-relaxed text-ivory/75">
            Celebrate teams, clients and milestones with jewellery chosen to be kept. Tell us about your occasion and we’ll share the options available.
          </FadeUp>
          <FadeUp delay={0.15} className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <Link to="/corporate-gifting" className="btn btn-gold">Explore gifting <IconArrow size={14} /></Link>
            <a href={whatsappLink(WHATSAPP_MESSAGES.gifting)} target="_blank" rel="noreferrer" className="btn btn-outline-light"><IconWhatsApp size={16} /> Enquire</a>
          </FadeUp>
        </div>
      </div>
    </ExpandFrame>
  )
}

function Journal() {
  return (
    <section className="section bg-ivory">
      <div className="container-site">
        <SectionHeading eyebrow="The Journal" title="Notes on style, care & gifting" action={<TextLink to="/blog">Read the journal</TextLink>} />
        <Stagger className="mt-10 grid gap-8 md:grid-cols-3 md:gap-5">
          {POSTS.slice(0, 3).map((p) => (
            <motion.article key={p.slug} variants={blurChild} className="group">
              <Link to={`/blog/${p.slug}`} className="block">
                <div className="aspect-[3/2] overflow-hidden bg-cream">
                  <img src={p.cover} srcSet={srcSetFor(p.cover)} sizes="(min-width: 768px) 33vw, 100vw" alt={p.coverAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105" />
                </div>
                <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-gold-deep">{p.category} · {p.readTime}</p>
                <h3 className="mt-1.5 font-display text-[23px] leading-snug transition-colors group-hover:text-wine-600">{p.title}</h3>
              </Link>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  )
}


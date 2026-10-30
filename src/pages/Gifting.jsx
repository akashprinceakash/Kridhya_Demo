import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ProductCard, SectionHeading } from '../components/ui'
import { EASE, FadeUp, ParallaxImage, StackCard, Stagger, blurChild } from '../components/motion'
import { IMG } from '../data/images'
import { getProduct } from '../data/products'
import { WHATSAPP_MESSAGES, whatsappLink } from '../data/site'
import { IconArrow, IconBox, IconPen, IconSparkle, IconWhatsApp } from '../components/Icons'
import { LotusMark } from '../components/Logo'
import useDocumentMeta from '../hooks/useDocumentMeta'

const OCCASIONS = [
  { title: 'Festive celebrations', body: 'Diwali, New Year and seasonal gifting for teams and partners.', img: IMG.collectionStill },
  { title: 'Employee milestones', body: 'Work anniversaries, promotions and recognition moments.', img: IMG.heartRose },
  { title: 'Client appreciation', body: 'A considered thank-you that stays long after the meeting.', img: IMG.giftBox },
  { title: 'Weddings & events', body: 'Bridesmaid gifts, family favours and celebration keepsakes.', img: IMG.womanWearing },
]
const STEPS = [
  { icon: IconWhatsApp, title: 'Share your brief', body: 'Occasion, quantity, timeline and budget range — on WhatsApp or via the form.' },
  { icon: IconSparkle, title: 'Receive a curation', body: 'We suggest pieces from the collection that suit your recipients.' },
  { icon: IconPen, title: 'Confirm the details', body: 'Finalise designs, quantities and delivery timelines with our team.' },
  { icon: IconBox, title: 'Gift with confidence', body: 'Your order is prepared and dispatched as agreed.' },
]
const HIGHLIGHTS = ['infinity-heart-necklace', 'bindu', 'ananta-gulabi', 'lemniscate-brooch'].map(getProduct)

export default function Gifting() {
  useDocumentMeta('Corporate Gifting & Bulk Orders | Kridhya by Devanshi', 'Jewellery gifts for teams, clients and celebrations. Enquire about corporate gifting and bulk orders with Kridhya by Devanshi.')
  return (
    <>
      <Hero />

      {/* value proposition */}
      <section className="section bg-ivory">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Why jewellery" title="A gift with meaning" />
          </div>
          <Stagger className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {[
              ['Personal', 'Worn close and remembered — a gesture that feels individual, even at scale.'],
              ['Lasting', 'Timeless silhouettes chosen to suit a wide range of tastes and ages.'],
              ['Effortless', 'One point of contact from first enquiry through to dispatch.'],
            ].map(([t, b]) => (
              <motion.div key={t} variants={blurChild} className="border-t border-gold/60 pt-5">
                <h3 className="font-display text-2xl">{t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-wine-900/65">{b}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* occasions — stacking cards */}
      <section className="bg-cream pb-10 pt-16 sm:pt-20">
        <div className="container-site">
          <SectionHeading eyebrow="Gifting occasions" title="For every reason to celebrate" />
          <div className="mt-10">
            {OCCASIONS.map((o, i) => (
              <StackCard key={o.title} index={i} total={OCCASIONS.length}>
                <article className="grid overflow-hidden border border-wine-900/10 bg-ivory shadow-[0_24px_50px_-30px_rgba(43,9,18,0.45)] md:grid-cols-2">
                  <img src={o.img.src} alt={o.img.alt} loading="lazy" data-placeholder="true" className="aspect-[16/10] w-full object-cover md:aspect-auto md:h-[52svh]" />
                  <div className="flex flex-col justify-center p-6 sm:p-10">
                    <p className="font-display text-sm italic text-gold-deep">0{i + 1} / 0{OCCASIONS.length}</p>
                    <h3 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{o.title}</h3>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-wine-900/65">{o.body}</p>
                    <a href={whatsappLink(WHATSAPP_MESSAGES.gifting)} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-[44px] items-center gap-2 self-start text-[11px] uppercase tracking-[0.18em] text-wine-800">
                      <span className="link-underline">Enquire for this occasion</span> <IconArrow size={13} />
                    </a>
                  </div>
                </article>
              </StackCard>
            ))}
          </div>
        </div>
      </section>

      {/* collection highlights */}
      <section className="section bg-ivory">
        <div className="container-site">
          <SectionHeading eyebrow="Collection highlights" title="Pieces that suit everyone" intro="Understated, versatile designs that work across teams and tastes." />
          <Stagger className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4 lg:gap-x-5">
            {HIGHLIGHTS.map((p) => <ProductCard key={p.slug} product={p} />)}
          </Stagger>
        </div>
      </section>

      {/* process */}
      <section className="section grain relative bg-wine-900 text-ivory">
        <div className="container-site">
          <SectionHeading light eyebrow="How it works" title="A simple, personal process" />
          <Stagger className="mt-10 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: I, title, body }, i) => (
              <motion.div key={title} variants={blurChild} className="bg-wine-900 p-6">
                <div className="flex items-center justify-between">
                  <I size={20} className="text-gold" />
                  <span className="font-display text-sm italic text-ivory/40">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ivory/65">{body}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <Enquiry />
    </>
  )
}

function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bg = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '25%'])
  const back = useTransform(scrollYProgress, [0, 1], reduce ? ['0px', '0px'] : ['0px', '60px'])
  const front = useTransform(scrollYProgress, [0, 1], reduce ? ['0px', '0px'] : ['0px', '-90px'])
  return (
    <section ref={ref} className="grain relative isolate overflow-hidden bg-wine-900 text-ivory">
      <motion.img style={{ y: bg }} src={IMG.satinWineGold.src} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-wine-950/70 to-wine-900" />
      <div className="container-site grid items-center gap-10 pb-16 pt-28 md:grid-cols-12 lg:min-h-[86svh] lg:pt-24">
        <div className="md:col-span-6 lg:col-span-5">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }} className="eyebrow text-gold">Corporate gifting &amp; bulk orders</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.1, delay: 0.15, ease: EASE }} className="h-display mt-4">
            Gifts that are <em className="text-gold-light">kept,</em> not forgotten.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease: EASE }} className="mt-5 max-w-md text-[15px] leading-relaxed text-ivory/75">
            Thoughtfully designed jewellery to celebrate your people — for festive seasons, milestones, clients and celebrations.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 1, ease: EASE }} className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <a href={whatsappLink(WHATSAPP_MESSAGES.gifting)} target="_blank" rel="noreferrer" className="btn btn-gold"><IconWhatsApp size={16} /> Enquire on WhatsApp</a>
            <a href="#enquire" className="btn btn-outline-light">Send an enquiry</a>
          </motion.div>
        </div>
        <div className="relative h-[380px] sm:h-[460px] md:col-span-6 lg:col-span-6 lg:col-start-7 lg:h-[540px]">
          <motion.div style={{ y: back }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }} className="absolute right-0 top-0 w-[68%]">
            <img src={IMG.giftBox.src} alt={IMG.giftBox.alt} data-placeholder="true" className="aspect-[4/5] w-full object-cover" />
          </motion.div>
          <motion.div style={{ y: front }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.45 }} className="absolute bottom-0 left-0 w-[46%] border-[6px] border-wine-900">
            <img src={IMG.ringStill.src} alt={IMG.ringStill.alt} data-placeholder="true" className="aspect-square w-full object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Enquiry() {
  const [form, setForm] = useState({ name: '', company: '', email: '', quantity: '', occasion: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.name.trim()) err.name = 'Please share your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Please enter a valid email address.'
    setErrors(err)
    if (!Object.keys(err).length) setSent(true)
  }

  return (
    <section id="enquire" className="section scroll-mt-20 bg-ivory">
      <div className="container-site grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Start an enquiry" title="Let’s plan your gifting" intro="Share a few details and our team will be in touch with the options available." />
          <a href={whatsappLink(WHATSAPP_MESSAGES.gifting)} target="_blank" rel="noreferrer" className="btn btn-wine mt-6"><IconWhatsApp size={16} /> Chat on WhatsApp</a>
          <ParallaxImage src={IMG.collectionStill.src} alt={IMG.collectionStill.alt} placeholder ratio="4/3" className="mt-8 hidden lg:block" />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {sent ? (
            <motion.div role="status" initial={{ opacity: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} className="flex h-full flex-col items-start justify-center border border-gold/50 bg-cream p-8">
              <LotusMark className="h-10 w-10 text-gold-deep" />
              <h3 className="mt-4 font-display text-3xl">Thank you, {form.name.split(' ')[0]}.</h3>
              <p className="mt-2 text-wine-900/65">We’ve received your enquiry and will be in touch soon.</p>
            </motion.div>
          ) : (
            <form noValidate onSubmit={submit} className="grid gap-x-6 gap-y-6 border border-wine-900/10 bg-cream/50 p-6 sm:grid-cols-2 sm:p-8">
              <Field id="name" label="Full name" required value={form.name} onChange={set('name')} error={errors.name} autoComplete="name" />
              <Field id="company" label="Company" value={form.company} onChange={set('company')} autoComplete="organization" />
              <Field id="email" label="Work email" type="email" required value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" />
              <Field id="quantity" label="Approx. quantity" inputMode="numeric" value={form.quantity} onChange={set('quantity')} helper="An estimate is fine." />
              <div className="sm:col-span-2">
                <label htmlFor="occasion" className="eyebrow mb-1.5 block text-wine-900/70">Occasion</label>
                <select id="occasion" value={form.occasion} onChange={set('occasion')} className="h-11 w-full cursor-pointer border-b border-wine-900/25 bg-transparent text-[15px] focus:border-wine-700 focus:outline-none">
                  <option value="">Select an occasion</option>
                  {OCCASIONS.map((o) => <option key={o.title}>{o.title}</option>)}
                  <option>Something else</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="eyebrow mb-1.5 block text-wine-900/70">Tell us more</label>
                <textarea id="message" rows={3} value={form.message} onChange={set('message')} className="w-full resize-none border-b border-wine-900/25 bg-transparent py-2 text-[15px] focus:border-wine-700 focus:outline-none" placeholder="Timelines, budget range, preferences…" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-gold w-full sm:w-auto">Send enquiry <IconArrow size={14} /></button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, error, helper, required, ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-1.5 block text-wine-900/70">
        {label} {required && <span className="text-wine-600" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : helper ? `${id}-help` : undefined}
        className={`h-11 w-full border-b bg-transparent text-[15px] focus:outline-none ${error ? 'border-wine-600' : 'border-wine-900/25 focus:border-wine-700'}`}
        {...rest}
      />
      {error ? <p id={`${id}-err`} className="mt-1.5 text-[13px] text-wine-600">{error}</p> : helper ? <p id={`${id}-help`} className="mt-1.5 text-[13px] text-wine-900/50">{helper}</p> : null}
    </div>
  )
}

import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]
const VIEW = { once: true, margin: '-10% 0px' }

// Soft focus-pull reveal: blur → sharp with a short rise.
export function FadeUp({ as = 'div', children, delay = 0, className, ...rest }) {
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VIEW}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </M>
  )
}

export const blurParent = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
export const blurChild = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
}

export function Stagger({ children, className, as = 'div' }) {
  const M = motion[as]
  return (
    <M variants={blurParent} initial="hidden" whileInView="show" viewport={VIEW} className={className}>
      {children}
    </M>
  )
}

// Scroll-linked vertical offset for any layer (smoothed).
export function useParallax(ref, distance = 60, offset = ['start end', 'end start']) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const raw = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance])
  return useSpring(raw, { stiffness: 140, damping: 30, mass: 0.35 })
}

export function ParallaxLayer({ children, distance = 60, className }) {
  const ref = useRef(null)
  const y = useParallax(ref, distance)
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

// Image drifting inside a fixed frame. Frame reserves its ratio (no CLS).
export function ParallaxImage({ src, alt, className = '', ratio, position = 'center', strength = 10, eager = false, placeholder }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : [`-${strength}%`, `${strength}%`])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        data-placeholder={placeholder ? 'true' : undefined}
        style={{ y, scale: 1 + (strength * 2.2) / 100, objectPosition: position }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
    </div>
  )
}

// A framed window that opens to full bleed as it scrolls into view.
export function ExpandFrame({ src, alt, children, className = '', position = 'center', placeholder }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 15%'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const clip = useTransform(p, [0, 1], reduce ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'] : ['inset(14% 22% 14% 22%)', 'inset(0% 0% 0% 0%)'])
  const scale = useTransform(p, [0, 1], reduce ? [1, 1] : [1.25, 1])
  const { scrollYProgress: through } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(through, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])
  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ clipPath: clip }} className="absolute inset-0 will-change-[clip-path]">
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          data-placeholder={placeholder ? 'true' : undefined}
          style={{ scale, y, objectPosition: position }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-wine-950/85 via-wine-950/50 to-wine-950/10" />
      </motion.div>
      <div className="relative">{children}</div>
    </section>
  )
}

// Subtle 3D tilt that follows the pointer (pointer devices only).
export function TiltCard({ children, className = '', max = 6 }) {
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sy = useSpring(ry, { stiffness: 200, damping: 20 })
  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -max * 2)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div onPointerMove={onMove} onPointerLeave={reset} style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d' }} className="h-full">
        {children}
      </motion.div>
    </div>
  )
}

const wrap = (min, max, v) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min

// Marquee whose speed and direction respond to scroll velocity.
export function VelocityMarquee({ children, baseVelocity = -2, className = '' }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const dir = useRef(1)
  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = dir.current * baseVelocity * (delta / 1000)
    if (factor.get() < 0) dir.current = -1
    else if (factor.get() > 0) dir.current = 1
    move += dir.current * move * factor.get()
    x.set(wrap(-50, 0, x.get() + move))
  })
  const xp = useTransform(x, (v) => `${v}%`)
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <motion.div style={{ x: xp }} className="flex w-max whitespace-nowrap">
        {children}
        {children}
      </motion.div>
    </div>
  )
}

// Cards that pin and stack; each settles slightly smaller as the next arrives.
export function StackCard({ index, total, children, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1 - (total - index) * 0.035])
  const opacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.55])
  return (
    <div ref={ref} className="sticky h-[70svh] sm:h-[78svh]" style={{ top: `calc(84px + ${index * 18}px)` }}>
      <motion.div style={{ scale, opacity }} className={`origin-top ${className}`}>
        {children}
      </motion.div>
    </div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gold" />
}

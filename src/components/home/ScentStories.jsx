import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { scentStories } from '@/data/content'
import { getProduct } from '@/data/products'
import { formatPrice } from '@/utils/format'

/** Pinned section: vertical scroll drives a horizontal filmstrip of scent moments. */
export default function ScentStories() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const x = useTransform(progress, [0, 1], ['2%', '-72%'])
  const bar = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <section ref={ref} className="relative h-[320vh] bg-charcoal text-cream">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-terracotta/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-rose/20 blur-3xl" />

        <div className="wrap relative flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-caramel">Scent stories</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight md:text-6xl">
              Every candle is a <em className="text-gradient-flame">memory</em>
            </h2>
          </div>
          <p className="hidden max-w-xs text-cream/60 md:block">Keep scrolling — from monsoon chai to Diwali nights.</p>
        </div>

        <motion.div style={{ x }} className="relative mt-10 flex gap-6 pl-4 md:pl-8">
          {scentStories.map((s, i) => {
            const product = getProduct(s.productId)
            return (
              <Link key={s.title} to={`/product/${product.id}`} className="group relative h-[58vh] w-[78vw] shrink-0 overflow-hidden rounded-4xl sm:w-[46vw] lg:w-[30vw]">
                <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-(--ease-luxe) group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/30 to-transparent" />
                <span className="absolute left-5 top-5 font-serif text-6xl text-white/25">0{i + 1}</span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-caramel">{s.notes}</p>
                  <h3 className="mt-2 font-serif text-3xl">{s.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-cream/70">{s.line}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="text-sm">{product.name} · <b>{formatPrice(product.price)}</b></span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-charcoal transition-transform duration-500 group-hover:-rotate-45">
                      <ArrowRightOutlined />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </motion.div>

        <div className="wrap mt-10">
          <div className="h-px w-full bg-white/15">
            <motion.div style={{ width: bar }} className="h-px bg-caramel" />
          </div>
        </div>
      </div>
    </section>
  )
}

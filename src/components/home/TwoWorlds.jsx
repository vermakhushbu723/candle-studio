import { ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import CandleVisual from '@/components/common/CandleVisual'
import { useCatalog } from '@/context/CatalogContext'

// Two big entry points into the catalogue
const cards = [
  {
    line: { id: 'pooja-festive', kicker: 'Diwali · Pooja · Ganpati', title: 'Festive & Pooja', description: 'Carved terracotta diyas, lotus water-pond bowls and sweet-shop candles for every festival.' },
    to: '/shop?category=pooja-festive',
    product: 'designer-diya',
    tone: 'from-[#F5E6C4] to-sand',
    perks: ['Diyas', 'Lotus bowls', 'Ladoo & modak'],
  },
  {
    line: { id: 'floral', kicker: 'Love · Gifting · Décor', title: 'Roses & Gifting', description: 'Rose bouquets, rose bubble cubes, gel glasses and cute teddies — made to be gifted.' },
    to: '/shop?category=floral',
    product: 'rose-bubble',
    tone: 'from-sand to-[#F6E1EA]',
    perks: ['Rose bouquets', 'Bubble cubes', 'Gift boxes'],
  },
]

export default function TwoWorlds() {
  const { getProduct } = useCatalog()
  return (
    <section className="py-12 md:py-16">
      <div className="wrap">
        <SectionHeading eyebrow="Shop by occasion" title="A candle for every moment" subtitle="Light up your festivals, or gift a little piece of handmade warmth. Every design is hand-poured in our studio and packed gift-ready." />
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {cards.map(({ line, to, product, tone, perks }, i) => {
            const p = getProduct(product)
            return (
              <motion.div key={line.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}>
                <Link to={to} className={`group relative flex h-full flex-col overflow-hidden rounded-4xl bg-linear-to-br ${tone} p-6 md:flex-row md:items-center md:p-6`}>
                  <div className="relative z-10 md:w-3/5">
                    <p className="eyebrow">{line.kicker}</p>
                    <h3 className="mt-3 font-serif text-3xl md:text-4xl">{line.title}</h3>
                    <p className="mt-3 text-ash">{line.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {perks.map((perk) => (
                        <span key={perk} className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-cocoa">{perk}</span>
                      ))}
                    </div>
                    <span className="mt-7 inline-flex items-center gap-2 font-semibold text-terracotta">
                      Shop the range <ArrowRightOutlined className="transition-transform group-hover:translate-x-2" />
                    </span>
                  </div>
                  <div className="mt-6 aspect-[16/10] w-full md:aspect-square overflow-hidden rounded-3xl transition-transform duration-700 group-hover:rotate-2 group-hover:scale-105 md:mt-0 md:w-2/5">
                    {p && <CandleVisual visual={p.visual} alt={p.name} />}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

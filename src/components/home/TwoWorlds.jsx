import { ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import CandleVisual from '@/components/common/CandleVisual'
import { getProduct, lines } from '@/data/products'

const cards = [
  { line: lines.pearled, product: 'endless-refill', tone: 'from-shell to-mist', perks: ['Spill-proof', 'Reusable', 'Any vessel'] },
  { line: lines.handcrafted, product: 'heart-bowl-candle', tone: 'from-sand to-[#F6E1EA]', perks: ['Hand-poured', 'Indian scents', 'Gift-ready'] },
]

export default function TwoWorlds() {
  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading eyebrow="Two ways to glow" title="Pick your kind of candle" subtitle="Reinvent candles with pearled wax, or gift a little piece of India poured by hand. Same studio, same soy wax, same obsession." />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {cards.map(({ line, product, tone, perks }, i) => {
            const p = getProduct(product)
            return (
              <motion.div key={line.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}>
                <Link to={`/shop?line=${line.id}`} className={`group relative flex h-full flex-col overflow-hidden rounded-4xl bg-linear-to-br ${tone} p-8 md:flex-row md:items-center md:p-10`}>
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
                  <div className="mt-6 aspect-square w-full overflow-hidden rounded-3xl transition-transform duration-700 group-hover:rotate-2 group-hover:scale-105 md:mt-0 md:w-2/5">
                    <CandleVisual visual={p.visual} alt={p.name} />
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

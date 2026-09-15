import { ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import { categories, products } from '@/data/products'

export default function CollectionsGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading eyebrow="Collections" title="Find a candle for every feeling" />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c, i) => {
            const count = products.filter((p) => p.category === c.id).length
            const featured = i === 0
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className={featured ? 'col-span-2 row-span-2' : ''}
              >
                <Link to={`/shop?category=${c.id}`} className={`group relative block h-full overflow-hidden rounded-3xl ${featured ? 'min-h-[22rem] md:min-h-full' : 'aspect-square'}`}>
                  <img src={c.image} alt={c.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-(--ease-luxe) group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-caramel">{c.line === 'pearled' ? 'Pearled' : 'Handcrafted'} · {count}</span>
                    <p className={`mt-1 font-serif leading-tight ${featured ? 'text-3xl' : 'text-lg md:text-xl'}`}>{c.emoji} {c.label}</p>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm opacity-0 transition-all duration-500 group-hover:opacity-100">
                      Explore <ArrowRightOutlined />
                    </span>
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

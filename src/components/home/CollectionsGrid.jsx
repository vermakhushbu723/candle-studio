import { ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import { categories, inCategory, products } from '@/data/products'

const lineLabel = { pearled: 'Pearled', handcrafted: 'Handcrafted', all: 'Collection' }

export default function CollectionsGrid() {
  return (
    <section className="pb-4 pt-20 md:pb-6 md:pt-28">
      <div className="wrap">
        <SectionHeading eyebrow="Collections" title="Find a candle for every feeling" />
        {/* Uniform tiles — no row-spans, so the grid never leaves an empty cell at the end */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c, i) => {
            const count = products.filter((p) => inCategory(p, c.id)).length
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.6 }}
              >
                <Link to={`/shop?category=${c.id}`} className="group relative block aspect-square overflow-hidden rounded-3xl">
                  <img src={c.image} alt={c.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-(--ease-luxe) group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-caramel">
                      {lineLabel[c.line]} · {count}
                    </span>
                    <p className="mt-1 font-serif text-lg leading-tight md:text-xl">{c.label}</p>
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

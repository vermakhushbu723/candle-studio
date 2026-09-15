import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CandleVisual from '@/components/common/CandleVisual'
import { getProduct } from '@/data/products'

export default function GiftingBanner() {
  const items = ['kamal-jyoti-urli', 'festive-diya-set', 'dry-fruit-delight'].map(getProduct)
  return (
    <section className="py-10">
      <div className="wrap">
        <div className="grid items-center gap-10 overflow-hidden rounded-4xl bg-linear-to-br from-[#F5E6C4] via-sand to-shell p-8 md:p-14 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="eyebrow">Corporate & festive gifting</p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl">Hampers that people actually keep.</h2>
            <p className="mt-4 max-w-lg text-ash">Custom candle hampers for Diwali, weddings and teams — branded boxes, handwritten notes and bulk pricing from 25 units.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact?topic=bulk"><Button type="primary" size="large" shape="round">Request a quote</Button></Link>
              <Link to="/shop?category=luxury"><Button size="large" shape="round">Shop festive</Button></Link>
            </div>
          </motion.div>
          <div className="grid grid-cols-3 gap-4">
            {items.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: i === 1 ? -24 : 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }} className="overflow-hidden rounded-3xl shadow-lg">
                <Link to={`/product/${p.id}`}>
                  <CandleVisual visual={p.visual} alt={p.name} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Button, Segmented } from 'antd'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import ProductCard from '@/components/common/ProductCard'
import { bestsellers, products } from '@/data/products'

const tabs = {
  bestsellers: () => bestsellers.slice(0, 8),
  pearled: () => products.filter((p) => p.line === 'pearled'),
  handcrafted: () => products.filter((p) => p.line === 'handcrafted').slice(0, 8),
  gifts: () => products.filter((p) => p.moods.includes('gift')).slice(0, 8),
}

export default function ProductShowcase() {
  const [tab, setTab] = useState('bestsellers')
  const list = tabs[tab]()

  return (
    <section className="border-y border-linen bg-shell py-20 md:py-28">
      <div className="wrap">
        <div className="flex flex-col items-center gap-8">
          <SectionHeading eyebrow="Shop the glow" title="Choose your lighting experience" subtitle="From a pouch you pour into a glass you already own, to a hand-sculpted bouquet that’s almost too pretty to light." />
          <div className="no-scrollbar max-w-full overflow-x-auto">
            <Segmented
              size="large"
              shape="round"
              value={tab}
              onChange={setTab}
              options={[
                { label: 'Hot Selling', value: 'bestsellers' },
                { label: 'Pearled Kits', value: 'pearled' },
                { label: 'Handcrafted', value: 'handcrafted' },
                { label: 'Gifting', value: 'gifts' },
              ]}
            />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="mt-12 text-center">
          <Link to="/shop"><Button size="large" shape="round">View all candles</Button></Link>
        </div>
      </div>
    </section>
  )
}

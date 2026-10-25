import { useState } from 'react'
import { Button, Segmented } from 'antd'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import ProductCard from '@/components/common/ProductCard'
import { useCatalog } from '@/context/CatalogContext'

const tabs = {
  bestsellers: ({ bestsellers }) => bestsellers.slice(0, 8),
  festive: ({ products }) => products.filter((p) => ['pooja-festive', 'food-inspired'].includes(p.category)).slice(0, 8),
  roses: ({ products }) => products.filter((p) => ['floral', 'bubble-candles'].includes(p.category)).slice(0, 8),
  gifts: ({ products }) => products.filter((p) => p.moods.includes('gift')).slice(0, 8),
}

export default function ProductShowcase() {
  const [tab, setTab] = useState('bestsellers')
  const catalog = useCatalog()
  const list = tabs[tab](catalog)

  return (
    <section className="border-y border-linen bg-shell py-12 md:py-16">
      <div className="wrap">
        <div className="flex flex-col items-center gap-5">
          <SectionHeading eyebrow="Shop the glow" title="Choose your lighting experience" subtitle="From ₹35 floating roses to diya gift boxes and rose bouquets that are almost too pretty to light." />
          <div className="no-scrollbar max-w-full overflow-x-auto">
            <Segmented
              size="large"
              shape="round"
              value={tab}
              onChange={setTab}
              options={[
                { label: 'Hot Selling', value: 'bestsellers' },
                { label: 'Festive & Pooja', value: 'festive' },
                { label: 'Roses & Bubbles', value: 'roses' },
                { label: 'Gifting', value: 'gifts' },
              ]}
            />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="mt-7 text-center">
          <Link to="/shop"><Button size="large" shape="round">View all candles</Button></Link>
        </div>
      </div>
    </section>
  )
}

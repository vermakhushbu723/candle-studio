import { Link, useNavigate } from 'react-router-dom'
import { Button, Empty, InputNumber } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import PageHeader from '@/components/common/PageHeader'
import { siteImages } from '@/data/site'
import CandleVisual from '@/components/common/CandleVisual'
import OrderSummary from '@/components/common/OrderSummary'
import { useCart } from '@/context/CartContext'
import { fragrances } from '@/data/products'
import { formatPrice } from '@/utils/format'

export default function Cart() {
  const { lines, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()

  return (
    <>
      <PageHeader image={siteImages.hero} eyebrow="Cart" title="Your cart" crumbs={[{ label: 'Cart' }]} />
      <section className="wrap py-14">
        {lines.length === 0 ? (
          <Empty className="py-20" description="Your cart is empty">
            <Link to="/shop"><Button type="primary" size="large">Start shopping</Button></Link>
          </Empty>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <ul className="divide-y divide-linen rounded-4xl border border-linen bg-white px-6">
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.li key={l.key} layout exit={{ opacity: 0, x: -40 }} className="flex gap-5 py-6">
                    <Link to={`/product/${l.product.id}`} className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl">
                      <CandleVisual visual={l.product.visual} lit={false} />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex justify-between gap-3">
                        <div>
                          <Link to={`/product/${l.product.id}`} className="font-serif text-xl hover:text-terracotta">{l.product.name}</Link>
                          <p className="text-sm text-ash">{l.product.line === 'pearled' ? 'Pearled' : 'Handcrafted'}{l.fragrance && ` · ${fragrances.find((f) => f.id === l.fragrance)?.label}`}</p>
                        </div>
                        <Button type="text" icon={<DeleteOutlined />} onClick={() => removeItem(l.key)} aria-label="Remove" />
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <InputNumber min={1} max={20} value={l.quantity} onChange={(v) => updateQuantity(l.key, v ?? 1)} />
                        <span className="text-lg font-bold">{formatPrice(l.product.price * l.quantity)}</span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <OrderSummary>
                <Button type="primary" size="large" block onClick={() => navigate('/checkout')}>Proceed to checkout</Button>
              </OrderSummary>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

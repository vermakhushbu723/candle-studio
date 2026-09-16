import { Button, Drawer, Empty, InputNumber, Progress } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import CandleVisual from '@/components/common/CandleVisual'
import { useCart } from '@/context/CartContext'
import { fragrances } from '@/data/products'
import { site } from '@/data/site'
import { formatPrice } from '@/utils/format'

export default function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, subtotal, count, remainingForFree, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()
  const close = () => setDrawerOpen(false)
  const progress = Math.min(100, Math.round(((site.freeShippingAbove - remainingForFree) / site.freeShippingAbove) * 100))

  return (
    <Drawer
      open={drawerOpen}
      onClose={close}
      title={<span className="font-serif text-xl">Your Cart ({count})</span>}
      footer={
        lines.length > 0 && (
          <div className="space-y-3 py-2">
            <div className="flex justify-between text-base">
              <span>Subtotal</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-ash">Taxes included. Discounts & shipping calculated at checkout.</p>
            <div className="grid grid-cols-2 gap-2">
              <Button size="large" onClick={() => { close(); navigate('/cart') }}>View cart</Button>
              <Button size="large" type="primary" onClick={() => { close(); navigate('/checkout') }}>Checkout</Button>
            </div>
          </div>
        )
      }
    >
      {lines.length === 0 ? (
        <Empty description="Your cart is feeling a little dim">
          <Link to="/shop" onClick={close}>
            <Button type="primary">Find your glow</Button>
          </Link>
        </Empty>
      ) : (
        <>
          <div className="mb-5 rounded-2xl bg-shell p-4">
            <p className="text-sm">
              {remainingForFree > 0 ? (
                <>You are <b>{formatPrice(remainingForFree)}</b> away from free shipping</>
              ) : (
                <>You’ve unlocked <b>free shipping</b></>
              )}
            </p>
            <Progress percent={progress} showInfo={false} strokeColor="#B76E4A" railColor="#EADBC8" />
          </div>
          <ul className="space-y-4">
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.li
                  key={line.key}
                  layout
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0 }}
                  className="flex gap-4"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                    <CandleVisual visual={line.product.visual} lit={false} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{line.product.name}</p>
                    {line.fragrance && <p className="text-xs text-ash">{fragrances.find((f) => f.id === line.fragrance)?.label}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <InputNumber size="small" min={1} max={20} value={line.quantity} onChange={(v) => updateQuantity(line.key, v ?? 1)} />
                      <span className="font-semibold">{formatPrice(line.product.price * line.quantity)}</span>
                    </div>
                  </div>
                  <Button type="text" size="small" icon={<DeleteOutlined />} onClick={() => removeItem(line.key)} aria-label="Remove" />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </>
      )}
    </Drawer>
  )
}

import { useState } from 'react'
import { Button, Divider, Input, Tag } from 'antd'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/utils/format'

export default function OrderSummary({ children, showItems = false }) {
  const { lines, subtotal, discount, shipping, total, coupon, applyCoupon, setCoupon } = useCart()
  const [code, setCode] = useState('')

  return (
    <div className="rounded-4xl border border-linen bg-white p-6 md:p-8">
      <h3 className="font-serif text-2xl">Order summary</h3>

      {showItems && (
        <ul className="mt-5 space-y-3">
          {lines.map((l) => (
            <li key={l.key} className="flex justify-between gap-3 text-sm">
              <span className="text-ash">{l.product.name} × {l.quantity}</span>
              <span>{formatPrice(l.product.price * l.quantity)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5">
        {coupon ? (
          <Tag closable color="#B76E4A" onClose={() => setCoupon(null)} className="px-3! py-1!">{coupon} applied</Tag>
        ) : (
          <div className="flex gap-2">
            <Input placeholder="Coupon code (try GLOW10)" value={code} onChange={(e) => setCode(e.target.value)} onPressEnter={() => applyCoupon(code)} />
            <Button onClick={() => applyCoupon(code)}>Apply</Button>
          </div>
        )}
      </div>

      <Divider />
      <dl className="space-y-3 text-sm">
        <Row label="Subtotal" value={formatPrice(subtotal)} />
        {discount > 0 && <Row label="Discount" value={`- ${formatPrice(discount)}`} accent />}
        <Row label="Shipping" value={shipping === 0 ? 'Free' : formatPrice(shipping)} />
      </dl>
      <Divider />
      <div className="flex items-center justify-between">
        <span className="font-semibold">Total</span>
        <span className="text-2xl font-bold">{formatPrice(total)}</span>
      </div>
      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}

function Row({ label, value, accent }) {
  return (
    <div className="flex justify-between">
      <dt className="text-ash">{label}</dt>
      <dd className={accent ? 'font-semibold text-emerald-700' : ''}>{value}</dd>
    </div>
  )
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { App } from 'antd'
import { api } from '@/api/client'
import { useCatalog } from '@/context/CatalogContext'
import { remainingForFree, shippingFor } from '@/utils/shipping'
import { readStorage, writeStorage } from '@/utils/format'
import { track } from '@/utils/analytics'

const CartContext = createContext(null)
const STORAGE_KEY = 'cd-cart'

/** Same maths as the API (coupon.controller.ts) so the summary matches the final order. */
const discountFor = (c, subtotal) => {
  if (!c || subtotal < (c.minOrder ?? 0)) return 0
  let d = c.type === 'percent' ? Math.round((subtotal * c.value) / 100) : c.value
  if (c.maxDiscount) d = Math.min(d, c.maxDiscount)
  return Math.min(d, subtotal)
}

export function CartProvider({ children }) {
  const { message } = App.useApp()
  const { getProduct, shipping: shippingSettings } = useCatalog()
  const [items, setItems] = useState(() => readStorage(STORAGE_KEY, []))
  const [couponInfo, setCouponInfo] = useState(null) // { code, type, value, minOrder, maxDiscount }
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => writeStorage(STORAGE_KEY, items), [items])

  const addItem = useCallback(
    (productId, { quantity = 1, fragrance = null, color = null, openDrawer = true } = {}) => {
      // Products with colours always carry one, defaulting to the first
      const product = getProduct(productId)
      const colour = product?.colors?.length ? (product.colors.find((c) => c.name === color) ?? product.colors[0]).name : null
      const key = `${productId}__${fragrance ?? 'default'}${colour ? `__${colour}` : ''}`
      setItems((prev) => {
        const existing = prev.find((i) => i.key === key)
        if (existing) return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i))
        return [...prev, { key, productId, fragrance, color: colour, quantity }]
      })
      message.success(`${product?.name ?? 'Item'}${colour ? ` (${colour})` : ''} added to cart`)
      if (product) track.addToCart(product, quantity, [colour, fragrance].filter(Boolean).join(' / ') || null)
      if (openDrawer) setDrawerOpen(true)
    },
    [message, getProduct],
  )

  const updateQuantity = useCallback((key, quantity) => {
    setItems((prev) => (quantity <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, quantity } : i))))
  }, [])

  const removeItem = useCallback(
    (key) => {
      const gone = items.find((i) => i.key === key)
      if (gone && getProduct(gone.productId)) track.removeFromCart(getProduct(gone.productId), gone.quantity)
      setItems((prev) => prev.filter((i) => i.key !== key))
    },
    [items, getProduct],
  )
  const clearCart = useCallback(() => {
    setItems([])
    setCouponInfo(null)
  }, [])

  const totals = useMemo(() => {
    const lines = items
      .map((i) => {
        const product = getProduct(i.productId)
        // The line's photo follows the chosen colour
        const image = product && i.color ? product.colors?.find((c) => c.name === i.color)?.images?.[0] : null
        return { ...i, product, visual: image ? { ...product.visual, image } : product?.visual }
      })
      .filter((i) => i.product)
    const subtotal = lines.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    const discount = discountFor(couponInfo, subtotal)
    const afterDiscount = subtotal - discount
    const shipping = shippingFor(afterDiscount, shippingSettings)
    const count = lines.reduce((sum, i) => sum + i.quantity, 0)
    return { lines, subtotal, discount, shipping, total: afterDiscount + shipping, count, remainingForFree: remainingForFree(afterDiscount, shippingSettings), shippingSettings }
  }, [items, couponInfo, getProduct, shippingSettings])

  /** Checks the code with the API; returns true when applied. */
  const applyCoupon = useCallback(
    async (code) => {
      const normalized = code.trim().toUpperCase()
      if (!normalized) return false
      try {
        const r = await api('/coupons/validate', { method: 'POST', body: { code: normalized, subtotal: totals.subtotal } })
        setCouponInfo(r.coupon)
        track.applyCoupon(r.coupon.code)
        message.success(r.message)
        return true
      } catch (e) {
        message.error(e.message)
        return false
      }
    },
    [message, totals.subtotal],
  )

  // A coupon only counts while the cart still meets its minimum order
  const coupon = couponInfo && totals.discount > 0 ? couponInfo.code : null
  const setCoupon = useCallback((code) => !code && setCouponInfo(null), [])

  const value = { ...totals, coupon, addItem, updateQuantity, removeItem, clearCart, applyCoupon, setCoupon, drawerOpen, setDrawerOpen }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

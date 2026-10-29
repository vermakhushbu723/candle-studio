import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { App } from 'antd'
import { api } from '@/api/client'
import { useCatalog } from '@/context/CatalogContext'
import { remainingForFree, shippingFor } from '@/utils/shipping'
import { readStorage, writeStorage } from '@/utils/format'
import { track } from '@/utils/analytics'
import { choiceLabel, defaultChoices, packOf, unitPrice, variationImages } from '@/data/products'

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
    (productId, { quantity = 1, pack = null, fragrance = null, color = null, openDrawer = true } = {}) => {
      // Every variation the product offers is always set, defaulting to its first option
      const product = getProduct(productId)
      const d = defaultChoices(product)
      const choice = {
        pack: product?.packs?.length ? packOf(product, pack).label : null,
        color: product?.colors?.length ? (product.colors.find((c) => c.name === color)?.name ?? d.color) : null,
        fragrance: product?.fragranceOptions?.length ? (product.fragranceOptions.includes(fragrance) ? fragrance : d.fragrance) : null,
      }
      const id = product?.id ?? productId
      const key = [id, choice.pack, choice.color, choice.fragrance].map((x) => x ?? '').join('__')
      setItems((prev) => {
        const existing = prev.find((i) => i.key === key)
        if (existing) return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i))
        return [...prev, { key, productId: id, ...choice, quantity }]
      })
      const label = choiceLabel(choice)
      message.success(`${product?.name ?? 'Item'}${label ? ` (${label})` : ''} added to cart`)
      if (product) track.addToCart({ ...product, price: unitPrice(product, choice.pack) }, quantity, label || null)
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
        // The line's photo and price follow the chosen variations
        const image = product ? variationImages(product, i)[0] : null
        return { ...i, product, unitPrice: unitPrice(product, i.pack), choices: choiceLabel(i), visual: image ? { ...product.visual, image } : product?.visual }
      })
      .filter((i) => i.product)
    const subtotal = lines.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
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

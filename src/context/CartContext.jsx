import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { App } from 'antd'
import { getProduct } from '@/data/products'
import { site } from '@/data/site'
import { readStorage, writeStorage } from '@/utils/format'

const CartContext = createContext(null)
const STORAGE_KEY = 'cd-cart'
const COUPONS = { GLOW10: 0.1, PEARL15: 0.15 }
const SHIPPING_FEE = 79

export function CartProvider({ children }) {
  const { message } = App.useApp()
  const [items, setItems] = useState(() => readStorage(STORAGE_KEY, []))
  const [coupon, setCoupon] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => writeStorage(STORAGE_KEY, items), [items])

  const addItem = useCallback(
    (productId, { quantity = 1, fragrance = null, openDrawer = true } = {}) => {
      const key = `${productId}__${fragrance ?? 'default'}`
      setItems((prev) => {
        const existing = prev.find((i) => i.key === key)
        if (existing) return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i))
        return [...prev, { key, productId, fragrance, quantity }]
      })
      message.success(`${getProduct(productId)?.name} added to cart`)
      if (openDrawer) setDrawerOpen(true)
    },
    [message],
  )

  const updateQuantity = useCallback((key, quantity) => {
    setItems((prev) => (quantity <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, quantity } : i))))
  }, [])

  const removeItem = useCallback((key) => setItems((prev) => prev.filter((i) => i.key !== key)), [])
  const clearCart = useCallback(() => {
    setItems([])
    setCoupon(null)
  }, [])

  const applyCoupon = useCallback(
    (code) => {
      const normalized = code.trim().toUpperCase()
      if (!COUPONS[normalized]) {
        message.error('That code is not valid')
        return false
      }
      setCoupon(normalized)
      message.success(`${normalized} applied`)
      return true
    },
    [message],
  )

  const totals = useMemo(() => {
    const lines = items
      .map((i) => ({ ...i, product: getProduct(i.productId) }))
      .filter((i) => i.product)
    const subtotal = lines.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    const discount = coupon ? Math.round(subtotal * COUPONS[coupon]) : 0
    const afterDiscount = subtotal - discount
    const shipping = afterDiscount === 0 || afterDiscount >= site.freeShippingAbove ? 0 : SHIPPING_FEE
    const count = lines.reduce((sum, i) => sum + i.quantity, 0)
    return { lines, subtotal, discount, shipping, total: afterDiscount + shipping, count, remainingForFree: Math.max(0, site.freeShippingAbove - afterDiscount) }
  }, [items, coupon])

  const value = { ...totals, coupon, addItem, updateQuantity, removeItem, clearCart, applyCoupon, setCoupon, drawerOpen, setDrawerOpen }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

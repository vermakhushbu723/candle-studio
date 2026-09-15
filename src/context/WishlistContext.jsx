import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { readStorage, writeStorage } from '@/utils/format'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'cd-wishlist'

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => readStorage(STORAGE_KEY, []))

  useEffect(() => writeStorage(STORAGE_KEY, ids), [ids])

  const toggle = useCallback((id) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])), [])
  const has = useCallback((id) => ids.includes(id), [ids])

  return <WishlistContext.Provider value={{ ids, toggle, has }}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}

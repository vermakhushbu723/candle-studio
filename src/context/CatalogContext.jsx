import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '@/api/client'
import { categories as bundledCategories, collectionMap, mergePackProducts, pickBestsellers, products as bundled } from '@/data/products'
import { DEFAULT_SHIPPING } from '@/utils/shipping'

const CatalogContext = createContext(null)
const FESTIVE = ['diwali-special', 'christmas-special', 'valentine-special', 'new-year-special']

// The bundled catalogue renders instantly (and keeps the site usable if the API is down);
// the live catalogue and collections from the admin replace it as soon as they arrive.
const { products: mergedBundle, aliases: bundledAliases } = mergePackProducts(bundled)
const fallbackProducts = mergedBundle.map((p) => ({
  ...p,
  collections: p.collections ?? Object.entries(collectionMap).filter(([, ids]) => ids.includes(p.id)).map(([id]) => id),
}))
// "lotus-pond-pack-of-2" → "lotus-pond" (also catches packs merged later in the admin)
const aliasFor = (id) => bundledAliases[id] ?? id?.replace(/-(pack-of-\d+|combo)$/, '')
const productCategories = bundledCategories.filter((c) => c.line !== 'all')
const fallbackCollections = bundledCategories
  .filter((c) => c.line === 'all')
  .map((c) => ({ id: c.id, name: c.label, type: FESTIVE.includes(c.id) ? 'festive' : 'curated', description: '', image: c.image, tone: c.tone }))

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(fallbackProducts)
  const [collections, setCollections] = useState(fallbackCollections)
  const [status, setStatus] = useState('loading') // loading | live | offline
  const [shipping, setShipping] = useState(DEFAULT_SHIPPING) // Admin → Settings → Shipping charges

  useEffect(() => {
    Promise.all([api('/products'), api('/collections')])
      .then(([p, c]) => {
        setProducts(p.products)
        setCollections(c.collections)
        setStatus('live')
      })
      .catch(() => setStatus('offline'))
    api('/settings')
      .then((r) => setShipping(r.shipping))
      .catch(() => undefined) // keep the defaults
  }, [])

  const value = useMemo(() => {
    const byId = new Map(products.map((p) => [p.id, p]))
    // Same shape as src/data/products.js `categories`: product categories + admin-managed collections
    const categories = [
      ...productCategories,
      ...collections.map((c) => ({ id: c.id, line: 'all', label: c.name, tone: c.tone, image: c.image, description: c.description, type: c.type, isCollection: true })),
    ]
    return {
      products,
      collections,
      categories,
      status,
      shipping,
      getProduct: (id) => byId.get(id) ?? byId.get(aliasFor(id)),
      getCategory: (id) => categories.find((c) => c.id === id),
      bestsellers: pickBestsellers(products),
      /** True when a product belongs to a category, either directly or through a collection. */
      inCategory: (product, id) => product.category === id || Boolean(product.collections?.includes(id)),
    }
  }, [products, collections, status, shipping])

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export const useCatalog = () => {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used inside CatalogProvider')
  return ctx
}

/** Shop mega-menu columns with the "Collections" / "Festive Specials" lists taken from the admin. */
export function useShopMenu(mega) {
  const { collections } = useCatalog()
  return useMemo(() => {
    const link = (c) => ({ label: c.name, to: `/shop?category=${c.id}` })
    const festive = collections.filter((c) => c.type === 'festive').map(link)
    const curated = collections.filter((c) => c.type !== 'festive').map(link)
    return mega
      .map((col) => (col.heading === 'Collections' ? { ...col, items: curated } : col.heading === 'Festive Specials' ? { ...col, items: festive } : col))
      .filter((col) => col.items.length > 0)
  }, [mega, collections])
}

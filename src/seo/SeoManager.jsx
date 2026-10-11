import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCatalog } from '@/context/CatalogContext'
import { applyHead } from './head'
import { metaFor } from './meta'

/** Keeps <title>, description, canonical, social tags and structured data in sync with the current page. */
export default function SeoManager() {
  const { pathname, search } = useLocation()
  const { products, collections, shipping, status } = useCatalog()

  useEffect(() => {
    // While the live catalogue loads, a new product may be missing from the bundled one — don't flash "not found"
    if (status === 'loading' && pathname.startsWith('/product/')) return
    applyHead(metaFor(pathname, { search, products, collections, shipping }))
  }, [pathname, search, products, collections, shipping, status])

  return null
}

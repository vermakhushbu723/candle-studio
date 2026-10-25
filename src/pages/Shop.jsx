import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Checkbox, Drawer, Empty, Input, Segmented, Select, Slider } from 'antd'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import PageHeader from '@/components/common/PageHeader'
import { siteImages } from '@/data/site'
import ProductCard from '@/components/common/ProductCard'
import { lines } from '@/data/products'
import { useCatalog } from '@/context/CatalogContext'
import { formatPrice } from '@/utils/format'
import { track } from '@/utils/analytics'

const MAX_PRICE = 3000
const sorters = {
  featured: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  popular: (a, b) => b.reviews - a.reviews,
}

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [price, setPrice] = useState([0, MAX_PRICE])
  const [sort, setSort] = useState('featured')
  const { products, categories, inCategory } = useCatalog()

  const line = params.get('line') ?? 'all'
  const category = params.get('category')
  const query = params.get('q') ?? ''

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'all') next.set(key, value)
    else next.delete(key)
    if (key === 'line') next.delete('category')
    setParams(next, { replace: true })
  }

  const effectiveLine = category ? categories.find((c) => c.id === category)?.line : line
  const visibleCategories = categories.filter((c) => effectiveLine === 'all' || !effectiveLine || c.line === 'all' || c.line === effectiveLine)

  const list = useMemo(
    () =>
      products
        .filter((p) => (line === 'all' ? true : p.line === line))
        .filter((p) => (category ? inCategory(p, category) : true))
        .filter((p) => p.price >= price[0] && p.price <= price[1])
        .filter((p) => `${p.name} ${p.tagline}`.toLowerCase().includes(query.toLowerCase()))
        .sort(sorters[sort]),
    [products, inCategory, line, category, price, query, sort],
  )

  // Analytics: which listing the customer is browsing (category / line), once per change
  const listName = category ?? (line !== 'all' ? line : 'All Candles')
  useEffect(() => {
    if (list.length) track.viewItemList(listName, list)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when the listing itself changes
  }, [listName])

  const heading = category ? categories.find((c) => c.id === category)?.label : line !== 'all' ? lines[line]?.title : 'All Candles'

  const filters = (
    <div className="space-y-5">
      <div>
        <p className="eyebrow mb-3">Search</p>
        <Input allowClear prefix={<SearchOutlined />} value={query} onChange={(e) => update('q', e.target.value)} placeholder="Search candles" />
      </div>
      <div>
        <p className="eyebrow mb-3">Collection</p>
        <div className="flex flex-col gap-2.5">
          {visibleCategories.map((c) => (
            <Checkbox key={c.id} checked={category === c.id} onChange={(e) => update('category', e.target.checked ? c.id : null)}>
              {c.label}
            </Checkbox>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-3">Price</p>
        <Slider range min={0} max={MAX_PRICE} step={50} value={price} onChange={setPrice} tooltip={{ formatter: formatPrice }} />
        <div className="flex justify-between text-sm text-ash">
          <span>{formatPrice(price[0])}</span>
          <span>{formatPrice(price[1])}</span>
        </div>
      </div>
      <Button block onClick={() => { setParams({}); setPrice([0, MAX_PRICE]) }}>Clear all filters</Button>
    </div>
  )

  return (
    <>
      <PageHeader image={categories.find((c) => c.id === category)?.image || siteImages.livingRoom} eyebrow={categories.find((c) => c.id === category)?.isCollection ? "Collection" : "Shop"} title={heading} subtitle={categories.find((c) => c.id === category)?.description || lines[effectiveLine]?.description || 'All 48 hand-poured designs — diyas, roses, bubble cubes, tea lights and more.'} crumbs={[{ label: 'Shop' }]} />

      <div className="wrap py-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="no-scrollbar max-w-full overflow-x-auto">
            <Segmented
              shape="round"
              size="large"
              value={category && !categories.find((c) => c.id === category)?.isCollection ? category : 'all'}
              onChange={(v) => update('category', v)}
              options={[{ label: 'All', value: 'all' }, ...categories.filter((c) => !c.isCollection).map((c) => ({ label: c.label, value: c.id }))]}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button className="lg:hidden" icon={<FilterOutlined />} onClick={() => setFiltersOpen(true)}>Filters</Button>
            <span className="hidden text-sm text-ash sm:inline">{list.length} products</span>
            <Select
              value={sort}
              onChange={setSort}
              className="w-44"
              options={[
                { value: 'featured', label: 'Featured' },
                { value: 'popular', label: 'Most popular' },
                { value: 'rating', label: 'Top rated' },
                { value: 'price-asc', label: 'Price: low to high' },
                { value: 'price-desc', label: 'Price: high to low' },
              ]}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">{filters}</aside>
          <div>
            {list.length === 0 ? (
              <Empty className="py-12" description="No candles match those filters" />
            ) : (
              <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters" placement="left">
        {filters}
      </Drawer>
    </>
  )
}

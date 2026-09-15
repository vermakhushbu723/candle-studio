import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb, Button, InputNumber, Rate, Result, Tabs, Tag } from 'antd'
import { CarOutlined, CheckOutlined, HeartFilled, HeartOutlined, SafetyCertificateOutlined, ShareAltOutlined, SyncOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import ProductCard from '@/components/common/ProductCard'
import SectionHeading from '@/components/common/SectionHeading'
import { fragrances, getCategory, getProduct, products } from '@/data/products'
import { reviews } from '@/data/content'
import { siteImages } from '@/data/site'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { discountPercent, formatPrice } from '@/utils/format'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  if (!product) {
    return <Result status="404" title="Candle not found" extra={<Link to="/shop"><Button type="primary">Back to shop</Button></Link>} />
  }
  return <ProductView key={product.id} product={product} />
}

function ProductView({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [fragrance, setFragrance] = useState(product.fragrances ? fragrances[0].id : null)
  const [active, setActive] = useState(0)
  // Pearled kits have one studio shot, so add the brand lifestyle photos to their gallery
  const gallery = product.line === 'pearled' ? [...product.images, siteImages.proofPearled, siteImages.stepPour, siteImages.stepIgnite, siteImages.livingRoom] : product.images

  const category = getCategory(product.category)
  const off = discountPercent(product.price, product.compareAt)
  const related = products.filter((p) => p.id !== product.id && (p.category === product.category || p.line === product.line)).slice(0, 4)
  const productReviews = reviews.slice(0, 3)

  const buyNow = () => {
    addItem(product.id, { quantity, fragrance, openDrawer: false })
    navigate('/checkout')
  }

  return (
    <>
      <section className="wrap py-8 md:py-12">
        <Breadcrumb items={[{ title: <Link to="/">Home</Link> }, { title: <Link to={`/shop?category=${category.id}`}>{category.label}</Link> }, { title: product.name }]} />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-square overflow-hidden rounded-4xl border border-linen bg-shell">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="group h-full w-full cursor-zoom-in overflow-hidden">
                  <img src={gallery[active]} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </motion.div>
              </AnimatePresence>
              {gallery.length > 1 && (
                <span className="absolute bottom-4 right-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold backdrop-blur">{active + 1} / {gallery.length}</span>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.slice(0, 8).map((src, i) => (
                  <button key={src} type="button" onClick={() => setActive(i)} className={`aspect-square overflow-hidden rounded-2xl border-2 transition ${active === i ? 'border-terracotta' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="flex flex-wrap items-center gap-2">
              <Tag color={product.line === 'pearled' ? '#8B5E3C' : '#D98CA3'} className="rounded-full! px-3!">
                {product.line === 'pearled' ? 'Pearled Candle' : 'Handcrafted Candle'}
              </Tag>
              {product.badge && <Tag className="rounded-full! px-3!">{product.badge}</Tag>}
            </div>
            <p className="eyebrow mt-5">{product.subtitle}</p>
            <h1 className="mt-2 font-serif text-4xl leading-tight md:text-5xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-ash">
              <Rate disabled allowHalf defaultValue={product.rating} />
              <span>{product.rating} · {product.reviews} reviews</span>
            </div>
            <p className="mt-5 text-lg text-ash">{product.tagline}</p>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.compareAt && <span className="text-lg text-ash line-through">{formatPrice(product.compareAt)}</span>}
              {off > 0 && <span className="rounded-full bg-sand px-3 py-1 text-sm font-bold text-terracotta">Save {off}%</span>}
            </div>
            <p className="mt-1 text-xs text-ash">Inclusive of all taxes</p>

            {product.fragrances && (
              <div className="mt-8">
                <p className="text-sm font-semibold">Fragrance: <span className="font-normal text-ash">{fragrances.find((f) => f.id === fragrance)?.label}</span></p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {fragrances.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFragrance(f.id)}
                      className={`relative rounded-2xl border p-4 text-left transition ${fragrance === f.id ? 'border-terracotta bg-sand/60' : 'border-linen bg-white hover:border-caramel'}`}
                    >
                      <p className="font-medium">{f.label}</p>
                      <p className="text-xs text-ash">{f.note}</p>
                      {fragrance === f.id && <CheckOutlined className="absolute right-3 top-3 text-terracotta" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <InputNumber size="large" min={1} max={20} value={quantity} onChange={(v) => setQuantity(v ?? 1)} className="w-28" />
              <Button size="large" type="primary" className="flex-1" onClick={() => addItem(product.id, { quantity, fragrance })}>
                Add to cart · {formatPrice(product.price * quantity)}
              </Button>
              <Button size="large" icon={has(product.id) ? <HeartFilled className="text-terracotta" /> : <HeartOutlined />} onClick={() => toggle(product.id)} aria-label="Wishlist" />
              <Button
                size="large"
                icon={<ShareAltOutlined />}
                aria-label="Share"
                onClick={() => navigator.share?.({ title: product.name, url: window.location.href }) ?? navigator.clipboard?.writeText(window.location.href)}
              />
            </div>
            <Button size="large" block className="mt-3 border-charcoal! bg-charcoal! text-cream!" onClick={buyNow}>Buy it now</Button>

            <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs">
              {[
                { icon: CarOutlined, text: 'Free shipping above ₹899' },
                { icon: SafetyCertificateOutlined, text: '100% soy wax' },
                { icon: SyncOutlined, text: '7-day easy returns' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="rounded-2xl bg-shell p-4">
                  <Icon className="text-xl text-terracotta" />
                  <p className="mt-2">{text}</p>
                </div>
              ))}
            </div>

            <Tabs
              className="mt-10"
              items={[
                { key: 'desc', label: 'Description', children: <p className="leading-relaxed text-ash">{product.description} <br /><br /><b className="text-charcoal">Best for:</b> {product.bestFor}</p> },
                {
                  key: 'includes',
                  label: "What's inside",
                  children: (
                    <ul className="space-y-2">
                      {product.includes.map((i) => (
                        <li key={i} className="flex gap-3"><CheckOutlined className="mt-1 text-terracotta" /> {i}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  key: 'use',
                  label: 'How to use',
                  children: (
                    <ol className="space-y-3">
                      {product.howToUse.map((s, i) => (
                        <li key={s} className="flex gap-3">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-terracotta text-xs text-white">{i + 1}</span>
                          <span className="text-ash">{s}</span>
                        </li>
                      ))}
                    </ol>
                  ),
                },
                { key: 'ship', label: 'Shipping', children: <p className="text-ash">Dispatched same day before 2 PM. Metros in 2–3 days, rest of India in 4–6 days. COD available. Free shipping above ₹899.</p> },
              ]}
            />
          </motion.div>
        </div>
      </section>

      <section className="border-y border-linen bg-shell py-16">
        <div className="wrap">
          <SectionHeading align="left" eyebrow="Reviews" title="What buyers are saying" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {productReviews.map((r) => (
              <div key={r.id} className="rounded-3xl bg-white p-6">
                <Rate disabled defaultValue={r.rating} className="text-sm!" />
                <p className="mt-3 font-serif text-lg">“{r.quote}”</p>
                <p className="mt-4 text-sm font-semibold">{r.name} <span className="font-normal text-ash">· {r.location}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-20">
        <SectionHeading align="left" eyebrow="You may also like" title="Pairs beautifully with" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </>
  )
}

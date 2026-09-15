import { useRef } from 'react'
import { Button, Rate, Tooltip } from 'antd'
import { HeartFilled, HeartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import CandleVisual from './CandleVisual'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { discountPercent, formatPrice } from '@/utils/format'
import { fragrances } from '@/data/products'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const off = discountPercent(product.price, product.compareAt)
  const wished = has(product.id)
  const hoverImage = product.images?.[1]

  // 3D tilt + spotlight that follows the pointer
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    px.set(x)
    py.set(y)
    ref.current.style.setProperty('--mx', `${x * 100}%`)
    ref.current.style.setProperty('--my', `${y * 100}%`)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: Math.min(index, 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1000px]"
    >
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-linen bg-white transition-shadow duration-500 [transform-style:preserve-3d] hover:shadow-[0_30px_70px_-25px_rgba(139,94,60,0.45)]"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,214,160,0.28),transparent_45%)]" />

        <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden">
          <div className="h-full w-full transition-transform duration-1000 ease-(--ease-luxe) group-hover:scale-110">
            <CandleVisual visual={product.visual} alt={product.name} />
          </div>
          {hoverImage && (
            <img src={hoverImage} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          )}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badge && <span className="rounded-full bg-charcoal px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-cream">{product.badge}</span>}
            {off > 0 && <span className="w-fit rounded-full bg-terracotta px-2.5 py-1 text-[0.65rem] font-bold text-white">-{off}%</span>}
          </div>
          <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-cocoa backdrop-blur">
            {product.line === 'pearled' ? 'Pearled' : 'Handcrafted'}
          </span>
          <span className="absolute bottom-3 right-3 translate-y-4 rounded-full bg-charcoal/85 px-3 py-1.5 text-xs font-semibold text-cream opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View details →
          </span>
        </Link>

        <Tooltip title={wished ? 'Remove from wishlist' : 'Save to wishlist'}>
          <motion.button
            type="button"
            whileTap={{ scale: 0.8 }}
            onClick={() => toggle(product.id)}
            aria-label="Toggle wishlist"
            className="absolute right-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-terracotta shadow-sm backdrop-blur transition hover:scale-110"
          >
            {wished ? <HeartFilled /> : <HeartOutlined />}
          </motion.button>
        </Tooltip>

        <div className="relative z-10 flex flex-1 flex-col p-5 [transform:translateZ(30px)]">
          <div className="flex items-center gap-2 text-xs text-ash">
            <Rate disabled allowHalf defaultValue={product.rating} className="text-xs!" />
            <span>({product.reviews})</span>
          </div>
          <Link to={`/product/${product.id}`} className="mt-2 font-serif text-lg leading-snug text-charcoal hover:text-terracotta">
            {product.name}
          </Link>
          <p className="mt-1 line-clamp-2 text-sm text-ash">{product.tagline}</p>
          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <div>
              <span className="text-lg font-bold text-charcoal">{formatPrice(product.price)}</span>
              {product.compareAt && <span className="ml-2 text-sm text-ash line-through">{formatPrice(product.compareAt)}</span>}
            </div>
            <Button type="primary" shape="round" icon={<ShoppingOutlined />} onClick={() => addItem(product.id, { fragrance: product.fragrances ? fragrances[0].id : null })}>
              Add
            </Button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

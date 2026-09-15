import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AutoComplete, Badge, Drawer, Input } from 'antd'
import { HeartOutlined, MenuOutlined, SearchOutlined, ShoppingOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import CandleVisual from '@/components/common/CandleVisual'
import { navLinks } from '@/data/site'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice } from '@/utils/format'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { count, setDrawerOpen } = useCart()
  const { ids } = useWishlist()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-linen bg-cream/85 shadow-[0_8px_30px_-20px_rgba(43,43,43,0.3)] backdrop-blur-xl' : 'bg-cream'
      }`}
    >
      <div className="wrap flex h-18 items-center justify-between gap-4">
        <button type="button" className="text-xl lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <MenuOutlined />
        </button>

        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setMegaOpen(false)}>
          {navLinks.map((link) => (
            <div key={link.to} onMouseEnter={() => setMegaOpen(Boolean(link.mega))} className="relative">
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'text-terracotta' : 'text-charcoal hover:text-terracotta'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-terracotta" />}
                  </>
                )}
              </NavLink>
            </div>
          ))}
          <AnimatePresence>{megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}</AnimatePresence>
        </nav>

        <div className="flex items-center gap-1">
          <IconButton label="Search" onClick={() => setSearchOpen(true)}>
            <SearchOutlined />
          </IconButton>
          <Link to="/wishlist" className="hidden sm:block">
            <IconButton label="Wishlist">
              <Badge count={ids.length} size="small" color="#B76E4A">
                <HeartOutlined className="text-lg" />
              </Badge>
            </IconButton>
          </Link>
          <IconButton label="Cart" onClick={() => setDrawerOpen(true)}>
            <Badge count={count} size="small" color="#B76E4A">
              <ShoppingOutlined className="text-lg" />
            </Badge>
          </IconButton>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}

function IconButton({ children, label, onClick }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="grid h-10 w-10 place-items-center rounded-full text-lg transition hover:bg-shell">
      {children}
    </button>
  )
}

function MegaMenu({ onClose }) {
  const featured = products.find((p) => p.id === 'ocean-escape')
  const shop = navLinks.find((l) => l.mega)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-x-0 top-full border-b border-linen bg-cream/95 shadow-xl backdrop-blur-xl"
    >
      <div className="wrap grid grid-cols-[1fr_1fr_1.1fr] gap-10 py-10">
        {shop.mega.map((col) => (
          <div key={col.heading}>
            <p className="eyebrow">{col.heading}</p>
            <ul className="mt-4 space-y-3">
              {col.items.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} onClick={onClose} className="font-serif text-xl text-charcoal transition hover:pl-2 hover:text-terracotta">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link to={`/product/${featured.id}`} onClick={onClose} className="group flex gap-5 rounded-3xl bg-shell p-4">
          <div className="w-36 shrink-0 overflow-hidden rounded-2xl">
            <CandleVisual visual={featured.visual} alt={featured.name} />
          </div>
          <div className="self-center">
            <p className="eyebrow">Most loved</p>
            <p className="mt-2 font-serif text-xl group-hover:text-terracotta">{featured.name}</p>
            <p className="mt-1 text-sm text-ash">{featured.tagline}</p>
            <p className="mt-2 font-semibold">{formatPrice(featured.price)}</p>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}

function MobileMenu({ open, onClose }) {
  return (
    <Drawer open={open} onClose={onClose} placement="left" title={<Logo />} closable styles={{ body: { padding: 0 } }}>
      <nav className="flex flex-col">
        {navLinks.map((link) => (
          <div key={link.to} className="border-b border-linen">
            <NavLink to={link.to} end={link.to === '/'} onClick={onClose} className="block px-6 py-4 font-serif text-xl">
              {link.label}
            </NavLink>
            {link.mega?.map((col) => (
              <div key={col.heading} className="px-6 pb-4">
                <p className="eyebrow">{col.heading}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {col.items.map((item) => (
                    <Link key={item.to} to={item.to} onClick={onClose} className="rounded-full bg-shell px-3 py-1.5 text-sm">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        <Link to="/wishlist" onClick={onClose} className="px-6 py-4 font-serif text-xl">
          Wishlist
        </Link>
      </nav>
    </Drawer>
  )
}

function SearchOverlay({ open, onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const options = products
    .filter((p) => `${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 6)
    .map((p) => ({
      value: p.id,
      label: (
        <div className="flex items-center gap-3 py-1">
          <div className="h-11 w-11 overflow-hidden rounded-xl">
            <CandleVisual visual={p.visual} lit={false} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{p.name}</p>
            <p className="text-xs text-ash">{p.line === 'pearled' ? 'Pearled' : 'Handcrafted'}</p>
          </div>
          <span className="font-semibold">{formatPrice(p.price)}</span>
        </div>
      ),
    }))

  const go = (id) => {
    onClose()
    setQuery('')
    navigate(`/product/${id}`)
  }

  return (
    <Drawer open={open} onClose={onClose} placement="top" size="default" title="Search candles" destroyOnHidden>
      <div className="wrap max-w-3xl!">
        <AutoComplete className="w-full" options={options} onSelect={go} value={query} onChange={setQuery} autoFocus popupMatchSelectWidth>
          <Input
            size="large"
            prefix={<SearchOutlined />}
            placeholder="Try “chai”, “ocean” or “refill”"
            onPressEnter={() => {
              onClose()
              navigate(`/shop?q=${encodeURIComponent(query)}`)
            }}
          />
        </AutoComplete>
      </div>
    </Drawer>
  )
}

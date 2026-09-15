import { Button, Rate } from 'antd'
import { ArrowRightOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import Magnetic from '@/components/common/Magnetic'
import { getProduct } from '@/data/products'
import { siteImages } from '@/data/site'

const ease = [0.22, 1, 0.36, 1]

// Deterministic particle layouts so renders stay stable
const embers = Array.from({ length: 16 }, (_, i) => ({
  left: `${30 + ((i * 29) % 50)}%`,
  size: 2 + (i % 4),
  delay: `${(i * 0.8) % 7}s`,
  duration: `${6 + (i % 5)}s`,
}))
const bokeh = Array.from({ length: 6 }, (_, i) => ({
  left: `${25 + ((i * 41) % 70)}%`,
  top: `${10 + ((i * 23) % 70)}%`,
  size: 50 + ((i * 37) % 90),
  delay: `${-i * 2.3}s`,
}))

export default function Hero() {
  const avatars = ['chai-parle-g-candle', 'bouquet-candle', 'heart-bowl-candle'].map(getProduct)

  const { scrollY } = useScroll()
  const mediaY = useTransform(scrollY, [0, 800], [0, 120])

  // Subtle mouse parallax on the photo
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const imgX = useSpring(useTransform(mx, [-0.5, 0.5], [16, -16]), { stiffness: 60, damping: 20 })
  const imgY = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 60, damping: 20 })

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section className="relative isolate flex flex-col overflow-hidden lg:block lg:min-h-[34rem]" onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0) }}>
      {/* Left: soft mixing colour background (whole section) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="animate-blob absolute -left-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-sand opacity-90 blur-3xl" />
        <div className="animate-blob absolute left-[20%] top-[40%] h-[30rem] w-[30rem] rounded-full bg-caramel/35 blur-3xl [animation-delay:-5s]" />
        <div className="animate-blob absolute -bottom-40 -left-20 h-[28rem] w-[28rem] rounded-full bg-rose/30 blur-3xl [animation-delay:-10s]" />
        <div className="grain absolute inset-0 opacity-70" />
      </div>

      {/* Content (left half) */}
      <div className="wrap relative z-10 grid grid-cols-1 pt-4 md:pt-5 lg:min-h-[34rem] lg:grid-cols-2 lg:items-center lg:py-8">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/70 bg-white/60 px-4 py-2 text-xs font-semibold text-cocoa shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
            </span>
            <SafetyCertificateOutlined className="text-terracotta" /> Two ways to glow · One home
            <span className="animate-shine absolute inset-y-0 w-10 -skew-x-12 bg-white/70" />
          </motion.div>

          <h1 className="mt-4 font-serif text-[clamp(2.2rem,1.3rem+2.6vw,3.75rem)] leading-[1.05] tracking-tight">
            {["The World's", 'Safest &', 'Most Loved'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span className="block" initial={{ y: '110%', rotate: 3 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }}>
                  {i === 2 ? (
                    <>
                      <em className="text-gradient-flame">Most Loved</em> Candles
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-4 max-w-xl text-base leading-relaxed text-ash md:text-lg">
            Spill-proof <b className="text-charcoal">pearled soy wax</b> you pour into any vessel — and <b className="text-charcoal">hand-poured candles</b> that smell like chai breaks, jalebi Sundays and Diwali nights.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7, ease }} className="mt-6 flex flex-wrap gap-3">
            <Magnetic>
              <Link to="/shop?line=pearled">
                <Button type="primary" size="large" shape="round" icon={<ArrowRightOutlined />} iconPlacement="end" className="h-13! px-7! shadow-[0_12px_30px_-10px_rgba(183,110,74,0.8)]!">
                  Shop Pearled Kits
                </Button>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/shop?line=handcrafted">
                <Button size="large" shape="round" className="h-13! bg-white/70! px-7! backdrop-blur">Explore Handcrafted</Button>
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }} className="mt-6 flex items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((p) => (
                <img key={p.id} src={p.images[0]} alt="" className="h-11 w-11 rounded-full border-2 border-cream object-cover" />
              ))}
              <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-cream bg-charcoal text-[0.65rem] font-bold text-cream">2K+</span>
            </div>
            <div>
              <Rate disabled defaultValue={5} className="text-sm!" />
              <p className="text-sm text-ash"><b className="text-charcoal">4.9/5</b> from 2,143 verified homes</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right half: animated background photo, edges fade into the page */}
      <motion.div
        aria-hidden
        style={{ y: mediaY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease }}
        className="hero-media-mask pointer-events-none relative -z-10 mt-2 h-[17rem] w-full overflow-hidden sm:h-[22rem] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[58%]"
      >
        <motion.div style={{ x: imgX, y: imgY }} className="absolute -inset-6">
          <motion.img
            src={siteImages.hero}
            alt=""
            fetchPriority="high"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease }}
            className="animate-kenburns h-full w-full object-cover"
          />
        </motion.div>

        {/* warm grade */}
        <div className="absolute inset-0 bg-linear-to-br from-caramel/10 via-transparent to-terracotta/25 mix-blend-multiply" />

        {/* flickering light around the flame */}
        <div className="animate-candle-light absolute left-[54%] top-[30%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,196,120,0.6),rgba(255,150,80,0.18)_45%,transparent_70%)] mix-blend-screen" />

        {/* light rays */}
        <div className="animate-rays absolute -right-1/4 -top-1/4 h-[150%] w-[90%] origin-top-right bg-[conic-gradient(from_200deg_at_100%_0%,transparent_0deg,rgba(255,230,190,0.18)_12deg,transparent_24deg,rgba(255,230,190,0.12)_36deg,transparent_48deg)]" />

        {/* drifting bokeh */}
        {bokeh.map((b, i) => (
          <span key={i} className="animate-bokeh absolute rounded-full bg-[radial-gradient(circle,rgba(255,214,160,0.45),transparent_70%)] blur-sm" style={{ left: b.left, top: b.top, width: b.size, height: b.size, animationDelay: b.delay }} />
        ))}

        {/* rising embers from the candle */}
        {embers.map((e, i) => (
          <span key={i} className="animate-ember absolute bottom-[35%] rounded-full bg-[#FFC77A] shadow-[0_0_10px_3px_rgba(255,170,90,0.8)]" style={{ left: e.left, width: e.size, height: e.size, animationDelay: e.delay, animationDuration: e.duration }} />
        ))}
      </motion.div>

      {/* seamless fade into next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-b from-transparent to-cream" />
    </section>
  )
}

import { InstagramOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { instagramFeed, site } from '@/data/site'

export default function InstagramWall() {
  const insta = site.socials.find((s) => s.label === 'Instagram')
  return (
    <section className="pt-10">
      <div className="wrap text-center">
        <p className="eyebrow">#GlowWithCandledust</p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">Lit in your homes</h2>
      </div>
      <div className="mt-10 grid grid-cols-3 md:grid-cols-6">
        {instagramFeed.map((src, i) => (
          <motion.a key={src} href={insta.href} target="_blank" rel="noreferrer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative aspect-square overflow-hidden">
            <img src={src} alt="Customer candle photo" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <span className="absolute inset-0 grid place-items-center bg-charcoal/0 text-3xl text-white opacity-0 transition group-hover:bg-charcoal/40 group-hover:opacity-100">
              <InstagramOutlined />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

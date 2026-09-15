import { EnvironmentOutlined, ExperimentOutlined, GiftOutlined, HeartOutlined, SafetyOutlined, SyncOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import { whyPearled } from '@/data/content'
import { siteImages } from '@/data/site'

const extra = [
  { title: 'Built from India', body: 'Jalebi rabri, chai Parle-G, mogra and monsoon — scents from real Indian life, not generic “ocean mist”.' },
  { title: 'Gift-Ready Always', body: 'Every order ships in a keepsake box with a handwritten note option — no extra charge.' },
]
const icons = [SafetyOutlined, SyncOutlined, ExperimentOutlined, EnvironmentOutlined, HeartOutlined, GiftOutlined]

export default function WhyUs() {
  const items = [...whyPearled, ...extra]
  return (
    <section className="py-20 md:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading align="left" eyebrow="Why candledust" title="Six reasons it replaces every candle you own" subtitle="Loose soy pearls behave nothing like a solid block of wax — and hand-poured means every candle has a story. Together, they fix almost everything people quietly dislike about candles." />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="mt-8 aspect-[11/7] overflow-hidden rounded-4xl">
            <img src={siteImages.livingRoom} alt="A warm living room at dusk with a lit pearled candle on the coffee table" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.1, duration: 0.6 }}
                className="group rounded-3xl border border-linen bg-white p-7 transition-colors duration-500 hover:border-terracotta hover:bg-terracotta"
              >
                <Icon className="text-3xl text-terracotta transition-colors group-hover:text-white" />
                <h3 className="mt-5 font-serif text-xl transition-colors group-hover:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash transition-colors group-hover:text-white/85">{item.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

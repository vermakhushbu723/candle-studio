import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ExperimentOutlined, FireOutlined, InstagramOutlined, MailOutlined, PhoneOutlined,
  RetweetOutlined, SafetyCertificateOutlined, WhatsAppOutlined,
} from '@ant-design/icons'
import PageHeader from '@/components/common/PageHeader'
import SectionHeading from '@/components/common/SectionHeading'
import { site, siteImages } from '@/data/site'

const beliefs = [
  { icon: SafetyCertificateOutlined, title: 'Spill-Proof & Safe', body: 'Tip it over and the loose pearls collapse onto the flame, smothering it in under a second. No running wax, no scorched tabletops.' },
  { icon: RetweetOutlined, title: 'Infinite Reusability', body: 'Only the melted pool around the wick is spent. Lift it out, drop in a fresh wick, and the remaining pearls are good as new.' },
  { icon: ExperimentOutlined, title: 'Clean & Non-Toxic', body: 'Zero soot, zero paraffin, zero lead cores. Just 100% plant-based soy wax that burns cool and leaves walls unmarked.' },
  { icon: FireOutlined, title: 'Refill Any Vessel', body: 'Old whisky glasses, brass urlis, coconut shells, ceramic bowls — if it holds pearls, it becomes a designer candle.' },
]

const steps = [
  { index: '01', title: 'Pour', body: 'Fill any heat-safe glass, bowl or vessel with pearl wax — right up to two-thirds full.' },
  { index: '02', title: 'Insert', body: 'Plant a braided cotton wick in the centre, leaving about a quarter inch standing proud.' },
  { index: '03', title: 'Ignite', body: 'Light it and settle in. A soft pool forms around the wick — soot-free, smoke-free warmth.' },
  { index: '04', title: 'Refresh', body: 'Once cool, lift out the hardened pool, drop in a fresh wick, and the candle is brand new.' },
]

const proof = [
  { value: '4.9/5', label: 'Average rating' },
  { value: '2,000+', label: 'Happy homes' },
  { value: '0', label: 'Spill complaints' },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function About() {
  const insta = site.socials.find((s) => s.label === 'Instagram')

  return (
    <>
      <PageHeader
        image={siteImages.urli}
        eyebrow="About us"
        title="A candle that survives real life."
        subtitle={site.mission}
        crumbs={[{ label: 'About Us' }]}
      />

      {/* Why pearled wax exists */}
      <section className="wrap grid items-center gap-12 py-20 lg:grid-cols-2">
        <motion.div {...fade()} className="overflow-hidden rounded-4xl">
          <img src={siteImages.livingRoom} alt="A pearled candle glowing in a living room" className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
        <motion.div {...fade(0.1)}>
          <SectionHeading align="left" eyebrow="Our story" title="Why pearled wax exists" />
          <div className="mt-6 space-y-4 leading-relaxed text-ash">
            <p>
              A regular candle is a single block of wax — tip it, and everything it’s made of comes pouring out with the
              flame still attached. We didn’t think that trade-off was necessary just to get warm, flickering light in a room.
            </p>
            <p>
              Pearled wax replaces that block with thousands of loose soy pearls. Only the small pool immediately around the
              wick is ever molten; the rest stays solid, dry and inert. Knock it over, and the dry pearls avalanche across the
              flame the way sand smothers a spark — no running wax, no scorched wood, no panic.
            </p>
            <p>
              The same structure that makes it safe also makes it reusable: once the melted pool hardens, lifting it out and
              dropping in a fresh wick turns the same jar into a brand-new candle. One pouch, refilled indefinitely, in whatever
              glass, bowl or shell you already own.
            </p>
            <p>
              Alongside the pearls, we hand-pour Indian-inspired candles — chai and Parle-G, jalebi and rabdi, brass urlis for
              Diwali — because {site.subTagline.toLowerCase()}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Beliefs */}
      <section className="border-y border-linen bg-shell py-20">
        <div className="wrap">
          <SectionHeading eyebrow="What we believe" title="Four ideas behind every kit" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} {...fade(i * 0.08)} className="flex h-full flex-col rounded-3xl border border-linen bg-white p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-sand text-lg text-terracotta">
                  <Icon />
                </span>
                <h3 className="mt-5 font-serif text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Four steps */}
      <section className="wrap py-20">
        <SectionHeading eyebrow="In four steps" title="Pour, insert, ignite, refresh" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div key={s.title} {...fade(i * 0.08)}>
              <p className="font-serif text-4xl text-caramel">{s.index}</p>
              <h3 className="mt-2 font-serif text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ash">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Proof numbers */}
      <section className="border-t border-linen bg-shell py-16">
        <div className="wrap">
          <div className="grid gap-8 sm:grid-cols-3">
            {proof.map((p, i) => (
              <motion.div key={p.label} {...fade(i * 0.08)} className="text-center">
                <p className="font-serif text-4xl text-terracotta sm:text-5xl">{p.value}</p>
                <p className="mt-2 text-sm text-ash">{p.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/shop"><Button type="primary" size="large" shape="round">Shop the kits</Button></Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="wrap grid gap-8 py-20 md:grid-cols-[1fr_auto] md:items-center">
        <motion.div {...fade()}>
          <p className="eyebrow">Come say hello</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">A real team behind every parcel.</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ash">
            Questions about a kit, gifting or a refill? Our customer care team is happy to help you choose the right scent and
            make your candle ritual feel like your own.
          </p>
        </motion.div>
        <motion.div {...fade(0.08)} className="rounded-3xl border border-linen bg-white p-6 sm:p-8">
          <p className="font-semibold">Contact candledust</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ash">
            <li><a href={`mailto:${site.supportEmail}`} className="flex items-center gap-2.5 hover:text-terracotta"><MailOutlined /> {site.supportEmail}</a></li>
            <li><a href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 hover:text-terracotta"><PhoneOutlined /> {site.phone}</a></li>
            <li><a href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:text-terracotta"><WhatsAppOutlined /> WhatsApp us</a></li>
            {insta && <li><a href={insta.href} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:text-terracotta"><InstagramOutlined /> {insta.handle}</a></li>}
          </ul>
          <p className="mt-4 text-xs text-ash">{site.hours}</p>
        </motion.div>
      </section>
    </>
  )
}

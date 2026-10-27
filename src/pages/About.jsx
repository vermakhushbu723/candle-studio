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
  { icon: FireOutlined, title: 'Hand-Poured by Us', body: 'Every diya, rose and bubble cube is poured, finished and checked by hand in our studio — in small batches.' },
  { icon: SafetyCertificateOutlined, title: 'Clean-Burning', body: 'Quality wax and cotton wicks for a steady, even burn. Each product comes with simple care instructions.' },
  { icon: ExperimentOutlined, title: 'Festive at Heart', body: 'Diyas, lotus bowls, ladoos and modaks — candles made for the festivals and pooja rituals we grew up with.' },
  { icon: RetweetOutlined, title: 'Gift-Ready Always', body: 'Gift boxes and handwritten notes at no extra cost, plus custom and bulk orders for weddings and teams.' },
]

const steps = [
  { index: '01', title: 'Trim', body: 'Trim the wick to about 5 mm before every burn for a clean, steady flame.' },
  { index: '02', title: 'Place', body: 'Set the candle on a stable, heat-safe surface — away from curtains, drafts, children and pets.' },
  { index: '03', title: 'Light', body: 'Light it and enjoy the glow. Floating candles go gently on water in a bowl or urli.' },
  { index: '04', title: 'Put out', body: 'Burn for up to 3–4 hours at a time, then snuff it out — never leave a lit candle unattended.' },
]

const proof = [
  { value: '4.9/5', label: 'Average rating' },
  { value: '2,000+', label: 'Happy homes' },
  { value: '48', label: 'Handmade designs' },
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

      {/* Our story */}
      <section className="wrap grid grid-cols-1 items-center gap-7 py-12 lg:grid-cols-2">
        <motion.div {...fade()} className="overflow-hidden rounded-4xl">
          <img src={siteImages.livingRoom} alt="A candle glowing in a living room" className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
        <motion.div {...fade(0.1)}>
          <SectionHeading align="left" eyebrow="Our story" title="Made by hand, for every celebration" />
          <div className="mt-6 space-y-4 leading-relaxed text-ash">
            <p>
              Jyotessa began at a kitchen stove, pouring candles as gifts for friends and family. The joy on their faces when a
              diya or a little rose candle was lit is what we still pour into every piece.
            </p>
            <p>
              Today we make 48 designs by hand — terracotta wax diyas and lotus water-pond bowls for pooja and Diwali, ladoo,
              modak and rasgulla candles that look good enough to eat, rose bouquets and rose bubble cubes for the people you
              love, gel glasses, mandala tins, floating candles and tea lights for every corner of your home.
            </p>
            <p>
              Every candle is poured in small batches, finished by hand and packed gift-ready, then delivered across Uttar Pradesh with Cash
              on Delivery — because {site.subTagline.toLowerCase()}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Beliefs */}
      <section className="border-y border-linen bg-shell py-12">
        <div className="wrap">
          <SectionHeading eyebrow="What we believe" title="Four promises behind every candle" />
          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map(({ icon: Icon, title, body }, i) => (
              <motion.div key={title} {...fade(i * 0.08)} className="flex h-full flex-col rounded-3xl border border-linen bg-white p-5">
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
      <section className="wrap py-12">
        <SectionHeading eyebrow="Candle care" title="Trim, place, light, put out" />
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
      <section className="border-t border-linen bg-shell py-10">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {proof.map((p, i) => (
              <motion.div key={p.label} {...fade(i * 0.08)} className="text-center">
                <p className="font-serif text-4xl text-terracotta sm:text-5xl">{p.value}</p>
                <p className="mt-2 text-sm text-ash">{p.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-7 text-center">
            <Link to="/shop"><Button type="primary" size="large" shape="round">Shop the candles</Button></Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="wrap grid grid-cols-1 gap-5 py-12 md:grid-cols-[1fr_auto] md:items-center">
        <motion.div {...fade()}>
          <p className="eyebrow">Come say hello</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">A real team behind every parcel.</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ash">
            Questions about a kit, gifting or a refill? Our customer care team is happy to help you choose the right scent and
            make your candle ritual feel like your own.
          </p>
        </motion.div>
        <motion.div {...fade(0.08)} className="rounded-3xl border border-linen bg-white p-5 sm:p-6">
          <p className="font-semibold">Contact Jyotessa</p>
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

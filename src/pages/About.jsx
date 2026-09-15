import { Button, Timeline } from 'antd'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '@/components/common/PageHeader'
import { siteImages } from '@/data/site'
import SectionHeading from '@/components/common/SectionHeading'
import CandleVisual from '@/components/common/CandleVisual'
import StatsStrip from '@/components/home/StatsStrip'
import { milestones } from '@/data/content'
import { getProduct } from '@/data/products'

const values = [
  { title: 'Indian nostalgia, modern design', body: 'Monsoon evenings, chai breaks and family gatherings — translated into fragrance and form.' },
  { title: 'Safety without compromise', body: 'Pearled wax that puts itself out, cotton wicks, zero paraffin. Candles for homes with kids and pets.' },
  { title: 'Slow, small-batch craft', body: 'Every handcrafted candle is poured and finished by hand in our studio, a few dozen at a time.' },
]

export default function About() {
  return (
    <>
      <PageHeader image={siteImages.urli} eyebrow="Our story" title="Life is too short to light boring candles" subtitle="Two candle ideas, one studio. We make candles that are built from India — and safe enough for every home in it." crumbs={[{ label: 'Our Story' }]} />

      <section className="wrap grid items-center gap-12 py-20 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid grid-cols-2 gap-4">
          {['chai-parle-g-candle', 'ocean-escape', 'lotus-pond-candle', 'mini-pocket-magic'].map((id, i) => (
            <div key={id} className={`overflow-hidden rounded-3xl ${i % 2 ? 'mt-10' : ''}`}>
              <CandleVisual visual={getProduct(id).visual} />
            </div>
          ))}
        </motion.div>
        <div>
          <SectionHeading align="left" eyebrow="Built from India" title="Not inspired by India. Made of it." />
          <div className="mt-6 space-y-4 leading-relaxed text-ash">
            <p>It started with a chai-and-Parle-G candle poured for a friend. People didn’t just like how it smelled — they told us what it reminded them of. Nani’s kitchen. Hostel nights. Rainy evenings on the balcony.</p>
            <p>Then a toddler knocked over a jar candle in a customer’s home. Nobody was hurt, but hot wax went everywhere. That sent us down a year-long rabbit hole of testing loose soy wax pearls — and the pearled candle was born: it puts itself out in half a second.</p>
            <p>Today, both ideas live together under one roof. Handcrafted candles for the feeling. Pearled candles for the freedom. Soy wax and cotton wicks for all of it.</p>
          </div>
        </div>
      </section>

      <section className="relative h-[60vh] min-h-[22rem] overflow-hidden">
        <motion.img
          src={siteImages.livingRoom}
          alt="A warm living room lit by a pearled candle"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal/75 via-charcoal/30 to-transparent" />
        <div className="wrap relative flex h-full items-center">
          <p className="max-w-xl font-serif text-3xl leading-snug text-cream md:text-5xl">“Handcrafted candles for the feeling. Pearled candles for the freedom.”</p>
        </div>
      </section>

      <StatsStrip />

      <section className="wrap py-20">
        <SectionHeading eyebrow="What we believe" title="Three things we never compromise on" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="rounded-3xl border border-linen bg-white p-8">
              <span className="font-serif text-5xl text-caramel">0{i + 1}</span>
              <h3 className="mt-4 font-serif text-2xl">{v.title}</h3>
              <p className="mt-3 text-ash">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-linen bg-shell py-20">
        <div className="wrap max-w-3xl!">
          <SectionHeading eyebrow="Journey" title="How we got here" />
          <Timeline
            mode="alternate"
            className="mt-14"
            items={milestones.map((m) => ({
              color: '#B76E4A',
              label: <span className="font-serif text-2xl text-terracotta">{m.year}</span>,
              children: (
                <div className="pb-6">
                  <p className="font-serif text-xl">{m.title}</p>
                  <p className="text-ash">{m.body}</p>
                </div>
              ),
            }))}
          />
          <div className="mt-8 text-center">
            <Link to="/shop"><Button type="primary" size="large" shape="round">Shop the collection</Button></Link>
          </div>
        </div>
      </section>
    </>
  )
}

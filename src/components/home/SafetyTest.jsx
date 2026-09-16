import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import { comparison } from '@/data/content'
import { siteImages } from '@/data/site'

/** Side-by-side proof: what a knocked-over traditional candle does vs. a pearled one. */
export default function SafetyTest() {
  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading
          eyebrow="The safety test"
          title={<>Traditional Candles <span className="italic text-ash">vs.</span> Pearled</>}
          subtitle="Both candles were knocked off the table. Here is what each one did next."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <DemoCard kind="traditional" />
          <DemoCard kind="pearled" index={1} />
        </div>
      </div>
    </section>
  )
}

function DemoCard({ kind, index = 0 }) {
  const isPearled = kind === 'pearled'
  const data = comparison[kind]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className={`overflow-hidden rounded-4xl border p-6 md:p-8 ${isPearled ? 'border-terracotta/30 bg-white' : 'border-linen bg-shell'}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl">{data.caption}</h3>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${isPearled ? 'bg-terracotta text-white' : 'bg-linen text-cocoa'}`}>
          {isPearled ? 'candledust' : 'Jar / pillar'}
        </span>
      </div>

      <div className="mt-6 aspect-[3/2] overflow-hidden rounded-3xl">
        <img
          src={isPearled ? siteImages.proofPearled : siteImages.proofTraditional}
          alt={`${data.caption} knocked onto a table`}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
      </div>

      <ul className="mt-6 space-y-2.5">
        {data.points.map((point) => (
          <li key={point} className="flex items-center gap-3 text-sm">
            {isPearled ? <CheckCircleFilled className="text-emerald-600" /> : <CloseCircleFilled className="text-red-400" />}
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

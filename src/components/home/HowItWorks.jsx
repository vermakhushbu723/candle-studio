import { motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import { howItWorks } from '@/data/content'

export default function HowItWorks() {
  return (
    <section className="grain border-y border-linen bg-shell py-20 md:py-28">
      <div className="wrap">
        <SectionHeading eyebrow="How it works" title="Four steps, about ninety seconds" subtitle="No double boiler, no thermometer, no wax melting on your stove. Pour, wick, light — and when it's spent, refresh and start over." />

        <div className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden className="absolute left-0 right-0 top-[7.5rem] hidden h-px bg-linear-to-r from-transparent via-caramel to-transparent lg:block" />
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-linen bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={step.image} alt={`Step ${i + 1}: ${step.title}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 ease-(--ease-luxe) group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/45 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-terracotta font-serif text-lg text-white shadow-lg ring-4 ring-white/70">
                  {i + 1}
                </span>
                <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">Step {i + 1}</span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import AnimatedCounter from '@/components/common/AnimatedCounter'
import { stats } from '@/data/site'

export default function StatsStrip() {
  return (
    <section className="border-y border-linen bg-white">
      <div className="wrap grid grid-cols-2 divide-linen md:grid-cols-4 md:divide-x">
        {stats.map((s) => (
          <div key={s.label} className="px-4 py-8 text-center">
            <p className="font-serif text-3xl text-terracotta md:text-4xl">
              <AnimatedCounter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-ash">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

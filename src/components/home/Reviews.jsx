import { Rate } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import SectionHeading from '@/components/common/SectionHeading'
import { reviews } from '@/data/content'

export default function Reviews() {
  const loop = [...reviews, ...reviews]
  return (
    <section className="overflow-hidden border-y border-linen bg-shell py-20 md:py-28">
      <div className="wrap flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading align="left" eyebrow="Social proof" title="2,000+ homes, zero spill complaints" subtitle="Unedited reviews from verified buyers across India." />
        <div className="flex items-center gap-4 rounded-3xl bg-white px-6 py-4">
          <span className="font-serif text-5xl text-terracotta">4.9</span>
          <div>
            <Rate disabled allowHalf defaultValue={4.9} />
            <p className="text-sm text-ash">Based on 2,143 reviews</p>
          </div>
        </div>
      </div>

      <div className="group mt-14 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-5 group-hover:[animation-play-state:paused]">
          {loop.map((r, i) => (
            <figure key={`${r.id}-${i}`} className="w-[20rem] shrink-0 rounded-3xl border border-linen bg-white p-7 md:w-[24rem]">
              <Rate disabled defaultValue={r.rating} className="text-sm!" />
              <blockquote className="mt-4 font-serif text-lg leading-relaxed">“{r.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-terracotta text-sm font-bold text-white">
                  {r.name.split(' ').map((n) => n[0]).join('')}
                </span>
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-semibold">
                    {r.name} <CheckCircleFilled className="text-emerald-600" />
                  </p>
                  <p className="text-xs text-ash">{r.location} · {r.product}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

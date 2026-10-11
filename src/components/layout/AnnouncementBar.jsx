import { announcements } from '@/data/site'
import { useCatalog } from '@/context/CatalogContext'
import { fillShipping } from '@/utils/shipping'

export default function AnnouncementBar() {
  const { shipping } = useCatalog()
  const items = announcements.map((t) => fillShipping(t, shipping))
  const loop = [...items, ...items]
  return (
    <div className="overflow-hidden bg-charcoal py-2 text-xs font-medium tracking-wide text-cream">
      <div className="animate-marquee flex w-max gap-7 whitespace-nowrap">
        {loop.map((text, i) => (
          <span key={i} className="flex items-center gap-7">
            {text}
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-caramel" />
          </span>
        ))}
      </div>
    </div>
  )
}

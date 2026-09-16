import { announcements } from '@/data/site'

export default function AnnouncementBar() {
  const loop = [...announcements, ...announcements]
  return (
    <div className="overflow-hidden bg-charcoal py-2 text-xs font-medium tracking-wide text-cream">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {loop.map((text, i) => (
          <span key={i} className="flex items-center gap-12">
            {text}
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-caramel" />
          </span>
        ))}
      </div>
    </div>
  )
}

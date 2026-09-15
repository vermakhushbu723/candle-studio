import { Link } from 'react-router-dom'
import { FacebookFilled, InstagramOutlined, MailOutlined, PinterestOutlined, WhatsAppOutlined, YoutubeFilled } from '@ant-design/icons'
import Logo from './Logo'
import Newsletter from '@/components/home/Newsletter'
import { site } from '@/data/site'

const socialIcons = { Instagram: InstagramOutlined, Facebook: FacebookFilled, YouTube: YoutubeFilled, Pinterest: PinterestOutlined }

const columns = [
  {
    heading: 'Shop',
    links: [
      { label: 'Pearled Candles', to: '/shop?line=pearled' },
      { label: 'Handcrafted Candles', to: '/shop?line=handcrafted' },
      { label: 'Food Inspired', to: '/shop?category=food-inspired' },
      { label: 'Love in the Air', to: '/shop?category=love-in-the-air' },
      { label: 'Refills', to: '/shop?category=refills' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Track Order', to: '/track-order' },
      { label: 'FAQs', to: '/faq' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Our Story', to: '/about' },
    ],
  },
  {
    heading: 'Policies',
    links: [
      { label: 'Shipping Policy', to: '/policies/shipping' },
      { label: 'Returns & Refunds', to: '/policies/returns' },
      { label: 'Privacy Policy', to: '/policies/privacy' },
      { label: 'Terms of Service', to: '/policies/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-charcoal text-cream">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-terracotta/20 blur-3xl" />
      <div className="wrap relative">
        <Newsletter />
        <div className="grid gap-12 border-t border-white/10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              {site.tagline}. Plus hand-poured, Indian-inspired candles — because {site.subTagline.toLowerCase()}
            </p>
            <div className="mt-6 space-y-2 text-sm text-cream/70">
              <a href={`mailto:${site.supportEmail}`} className="flex items-center gap-2 hover:text-caramel"><MailOutlined /> {site.supportEmail}</a>
              <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-caramel"><WhatsAppOutlined /> {site.whatsapp}</a>
            </div>
            <div className="mt-6 flex gap-2">
              {site.socials.map(({ label, href }) => {
                const Icon = socialIcons[label]
                return (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:-translate-y-1 hover:border-caramel hover:text-caramel">
                    <Icon />
                  </a>
                )
              })}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-caramel">{col.heading}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-cream/70 transition hover:text-cream">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-cream/50 md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Hand-poured in India.</p>
          <p>UPI · Cards · Net Banking · Cash on Delivery</p>
        </div>
      </div>
    </footer>
  )
}

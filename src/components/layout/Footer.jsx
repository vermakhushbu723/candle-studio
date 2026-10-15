import { Link } from 'react-router-dom'
import {
  ClockCircleOutlined, EnvironmentOutlined, FacebookFilled, StarFilled, InstagramOutlined, MailOutlined,
  PhoneOutlined, PinterestOutlined, WhatsAppOutlined, YoutubeFilled,
} from '@ant-design/icons'
import Logo from './Logo'
import { site } from '@/data/site'

const socialIcons = { Instagram: InstagramOutlined, Facebook: FacebookFilled, YouTube: YoutubeFilled, Pinterest: PinterestOutlined }

const columns = [
  {
    heading: 'Shop',
    links: [
      { label: 'Pearled Candles', to: '/shop?line=pearled' },
      { label: 'Handcrafted Candles', to: '/shop?line=handcrafted' },
      { label: 'Diwali Special', to: '/shop?category=diwali-special' },
      { label: 'Valentine Special', to: '/shop?category=valentine-special' },
      { label: 'Cartoons & Kids', to: '/shop?category=cartoons-kids' },
      { label: 'Refills', to: '/shop?category=refills' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Track Order', to: '/track-order' },
      { label: 'Login / Sign up', to: '/login' },
      { label: 'FAQs', to: '/faq' },
      { label: 'Wishlist', to: '/wishlist' },
    ],
  },
  {
    heading: 'Policies',
    links: [
      { label: 'Shipping Policy', to: '/policies/shipping' },
      { label: 'Returns & Refunds', to: '/policies/returns' },
      { label: 'Privacy Policy', to: '/policies/privacy' },
      { label: 'Terms of Service', to: '/policies/terms' },
      { label: 'Disclaimer', to: '/disclaimer' },
    ],
  },
]

export default function Footer() {
  const waHref = `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`
  const telHref = `tel:${site.phone.replace(/\s/g, '')}`

  return (
    <footer className="relative mt-14 overflow-hidden bg-charcoal text-cream">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-terracotta/20 blur-3xl" />
      <div className="wrap relative">
        <div className="grid gap-7 py-9 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              {site.tagline}. Plus hand-poured, Indian-inspired candles — because {site.subTagline.toLowerCase()}
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-cream/70">
              <li>
                <a href={`mailto:${site.supportEmail}`} className="flex items-center gap-2.5 text-cream/70 hover:text-caramel">
                  <MailOutlined className="text-caramel" /> {site.supportEmail}
                </a>
              </li>
              <li>
                <a href={telHref} className="flex items-center gap-2.5 text-cream/70 hover:text-caramel">
                  <PhoneOutlined className="text-caramel" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-cream/70 hover:text-caramel">
                  <WhatsAppOutlined className="text-caramel" /> Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockCircleOutlined className="mt-1 text-caramel" /> {site.hours}
              </li>
              <li>
                <a href={site.googleMapsUrl} target="_blank" rel="noreferrer" className="flex items-start gap-2.5 text-cream/70 hover:text-caramel">
                  <EnvironmentOutlined className="mt-1 text-caramel" /> {site.location.street}, {site.location.city}, {site.location.region} {site.location.postalCode}
                </a>
              </li>
            </ul>

            <a
              href={site.googleReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-caramel/60 px-4 py-2 text-xs font-semibold text-caramel transition hover:bg-caramel hover:text-charcoal"
            >
              <StarFilled /> Review us on Google
            </a>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-caramel">Follow us</p>
            <div className="mt-3 flex gap-2">
              {site.socials.map(({ label, href }) => {
                const Icon = socialIcons[label]
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Jyotessa on ${label}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/80 transition hover:-translate-y-1 hover:border-caramel hover:text-caramel"
                  >
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

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pb-16 pt-6 text-center text-xs text-cream/50 md:flex-row md:pb-6 md:text-left">
          <p>© {new Date().getFullYear()} {site.name}. Handmade in India{site.womenOwned ? ' · Women-owned business' : ''}.</p>
          <p>UPI · Google Pay · Visa · Mastercard · RuPay · Cash on Delivery</p>
        </div>
      </div>
    </footer>
  )
}

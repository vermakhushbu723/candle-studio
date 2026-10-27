import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode'
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  FacebookFilled,
  StarFilled,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  PinterestOutlined,
  WhatsAppOutlined,
  YoutubeFilled,
  CarOutlined,
  CreditCardOutlined,
  SafetyCertificateOutlined,
  GiftOutlined,
} from '@ant-design/icons'
import Logo from './Logo'
import { site } from '@/data/site'
import { useCatalog } from '@/context/CatalogContext'
import { shippingPerk } from '@/utils/shipping'

const socialIcons = {
  Instagram: InstagramOutlined,
  Facebook: FacebookFilled,
  YouTube: YoutubeFilled,
  Pinterest: PinterestOutlined,
}

const columns = [
  {
    heading: 'Shop',
    links: [
      { label: 'Pooja & Diyas', to: '/shop?category=pooja-festive' },
      { label: 'Bouquets & Roses', to: '/shop?category=floral' },
      { label: 'Diwali Special', to: '/shop?category=diwali-special' },
      { label: 'Valentine Special', to: '/shop?category=valentine-special' },
      { label: 'Cartoons & Kids', to: '/shop?category=cartoons-kids' },
      { label: 'Tea Lights', to: '/shop?category=tealights' },
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
        <div className="grid gap-7 py-9 md:grid-cols-2 lg:grid-cols-[1.4fr_3fr] lg:gap-12">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              {site.tagline}. Plus hand-poured, Indian-inspired candles — because {site.subTagline.toLowerCase()}
            </p>

            {/* Contact details with the Follow & Save QR code on the right */}
            <div className="mt-6 flex items-start gap-4">
              <ul className="min-w-0 flex-1 space-y-2.5 text-sm text-cream/70">
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
              <FollowQr />
            </div>

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

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-7 sm:grid-cols-3">
              {columns.map((col) => (
                <div key={col.heading}>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-caramel">{col.heading}</p>
                  <ul className="mt-5 space-y-3 text-sm">
                    {col.links.map((l) => (
                      <li key={l.to}>
                        <Link to={l.to} className="text-cream/70 transition hover:text-cream">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <BrandPromise />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pb-28 pr-16 pt-6 text-center text-xs text-cream/50 md:flex-row md:pb-6 md:pr-0 md:text-left">
          <p>
            © {new Date().getFullYear()} {site.name}. Handmade in India
            {site.womenOwned ? ' · Women-owned business' : ''}.
          </p>
          <p>Hand-poured with love in Noida, India</p>
        </div>
      </div>
    </footer>
  )
}

const FOLLOW_URL = 'https://jyotessa.com/follow?utm_source=qr'

/** "Scan · Follow · Save 10%" — the QR opens the Follow & Save page (social links + personal coupon). */
function FollowQr() {
  const [src, setSrc] = useState('')
  useEffect(() => {
    QRCode.toDataURL(FOLLOW_URL, {
      width: 360,
      margin: 1,
      color: { dark: '#3A1507', light: '#FFFFFF' },
      errorCorrectionLevel: 'M',
    })
      .then(setSrc)
      .catch(() => setSrc(''))
  }, [])

  return (
    <Link
      to="/follow"
      aria-label="Scan or tap: follow Jyotessa and get 10% off"
      className="group flex w-28 shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-caramel/40 bg-white/5 p-2 text-center transition hover:border-caramel sm:w-32"
    >
      <span className="rounded-xl bg-white p-1.5">
        {src ? <img src={src} alt="QR code: follow Jyotessa and get 10% off" width="104" height="104" className="h-24 w-24 sm:h-26 sm:w-26" /> : <span className="block h-24 w-24 sm:h-26 sm:w-26" />}
      </span>
      <span className="whitespace-nowrap text-[9px] font-bold uppercase leading-tight tracking-[0.1em] text-caramel sm:text-[10px] sm:tracking-[0.14em]">Scan · Follow</span>
      <span className="text-xs font-semibold leading-tight text-cream group-hover:text-caramel">Get 10% off</span>
    </Link>
  )
}

/** Fills the space under the link columns: brand promise, why-shop-with-us points and payment methods. */
function BrandPromise() {
  const { shipping } = useCatalog()
  const ship = shippingPerk(shipping)
  const perks = [
    { icon: CarOutlined, title: ship.title, text: ship.text },
    { icon: CreditCardOutlined, title: 'Cash on Delivery', text: 'All UP pincodes' },
    { icon: SafetyCertificateOutlined, title: 'Hand-poured', text: 'Small batches · made in India' },
    { icon: GiftOutlined, title: 'Gift-ready packing', text: 'Handwritten notes' },
  ]
  const payments = ['UPI', 'Google Pay', 'Visa', 'Mastercard', 'RuPay', 'COD']

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-caramel">Light up every moment</p>
          <p className="mt-3 font-serif text-2xl leading-snug text-cream">Hand-poured in small batches, delivered across Uttar Pradesh.</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/65">
            From terracotta diyas to rose bouquets, every Jyotessa candle is hand-poured in small batches and packed gift-ready. Questions about an order or bulk gifting? Our team is a
            WhatsApp message away.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/shop" className="rounded-full bg-caramel px-4 py-2 text-xs font-bold text-charcoal transition hover:bg-cream">
              Shop all candles
            </Link>
            <Link to="/contact?topic=bulk" className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-cream transition hover:border-caramel hover:text-caramel">
              Bulk & corporate gifting
            </Link>
          </div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-caramel/15 text-lg text-caramel">
                <Icon />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-cream">{title}</span>
                <span className="block text-xs text-cream/60">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
        <span className="mr-1 text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">We accept</span>
        {payments.map((p) => (
          <span key={p} className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-cream/80">
            {p}
          </span>
        ))}
      </div>
    </div>
  )
}

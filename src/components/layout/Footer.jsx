import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QRCode from "qrcode";
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
} from "@ant-design/icons";
import Logo from "./Logo";
import { site } from "@/data/site";

const socialIcons = {
  Instagram: InstagramOutlined,
  Facebook: FacebookFilled,
  YouTube: YoutubeFilled,
  Pinterest: PinterestOutlined,
};

const columns = [
  {
    heading: "Shop",
    links: [
      { label: "Pearled Candles", to: "/shop?line=pearled" },
      { label: "Handcrafted Candles", to: "/shop?line=handcrafted" },
      { label: "Diwali Special", to: "/shop?category=diwali-special" },
      { label: "Valentine Special", to: "/shop?category=valentine-special" },
      { label: "Cartoons & Kids", to: "/shop?category=cartoons-kids" },
      { label: "Refills", to: "/shop?category=refills" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      { label: "Track Order", to: "/track-order" },
      { label: "Login / Sign up", to: "/login" },
      { label: "FAQs", to: "/faq" },
      { label: "Wishlist", to: "/wishlist" },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Shipping Policy", to: "/policies/shipping" },
      { label: "Returns & Refunds", to: "/policies/returns" },
      { label: "Privacy Policy", to: "/policies/privacy" },
      { label: "Terms of Service", to: "/policies/terms" },
      { label: "Disclaimer", to: "/disclaimer" },
    ],
  },
];

export default function Footer() {
  const waHref = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <footer className="relative mt-14 overflow-hidden bg-charcoal text-cream">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-terracotta/20 blur-3xl" />
      <div className="wrap relative">
        <div className="grid gap-7 py-9 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              {site.tagline}. Plus hand-poured, Indian-inspired candles —
              because {site.subTagline.toLowerCase()}
            </p>

            {/* Contact details with the Follow & Save QR code on the right */}
            <div className="mt-6 flex items-start gap-4">
              <ul className="min-w-0 flex-1 space-y-2.5 text-sm text-cream/70">
                <li>
                  <a
                    href={`mailto:${site.supportEmail}`}
                    className="flex items-center gap-2.5 text-cream/70 hover:text-caramel"
                  >
                    <MailOutlined className="text-caramel" />{" "}
                    {site.supportEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={telHref}
                    className="flex items-center gap-2.5 text-cream/70 hover:text-caramel"
                  >
                    <PhoneOutlined className="text-caramel" /> {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-cream/70 hover:text-caramel"
                  >
                    <WhatsAppOutlined className="text-caramel" /> Chat on
                    WhatsApp
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <ClockCircleOutlined className="mt-1 text-caramel" />{" "}
                  {site.hours}
                </li>
                <li>
                  <a
                    href={site.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-2.5 text-cream/70 hover:text-caramel"
                  >
                    <EnvironmentOutlined className="mt-1 text-caramel" />{" "}
                    {site.location.street}, {site.location.city},{" "}
                    {site.location.region} {site.location.postalCode}
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

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-caramel">
              Follow us
            </p>
            <div className="mt-3 flex gap-2">
              {site.socials.map(({ label, href }) => {
                const Icon = socialIcons[label];
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
                );
              })}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-caramel">
                {col.heading}
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-cream/70 transition hover:text-cream"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pb-16 pt-6 text-center text-xs text-cream/50 md:flex-row md:pb-6 md:text-left">
          <p>
            © {new Date().getFullYear()} {site.name}. Handmade in India
            {site.womenOwned ? " · Women-owned business" : ""}.
          </p>
          <p>UPI · Google Pay · Visa · Mastercard · RuPay · Cash on Delivery</p>
        </div>
      </div>
    </footer>
  );
}

const FOLLOW_URL = "https://jyotessa.com/follow?utm_source=qr";

/** "Scan · Follow · Save 10%" — the QR opens the Follow & Save page (social links + personal coupon). */
function FollowQr() {
  const [src, setSrc] = useState("");
  useEffect(() => {
    QRCode.toDataURL(FOLLOW_URL, {
      width: 360,
      margin: 1,
      color: { dark: "#3A1507", light: "#FFFFFF" },
      errorCorrectionLevel: "M",
    })
      .then(setSrc)
      .catch(() => setSrc(""));
  }, []);

  return (
    <Link
      to="/follow"
      aria-label="Scan or tap: follow Jyotessa and get 10% off"
      className="group flex w-28 shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-caramel/40 bg-white/5 p-2 text-center transition hover:border-caramel sm:w-32"
    >
      <span className="rounded-xl bg-white p-1.5">
        {src ? (
          <img
            src={src}
            alt="QR code: follow Jyotessa and get 10% off"
            width="104"
            height="104"
            className="h-24 w-24 sm:h-26 sm:w-26"
          />
        ) : (
          <span className="block h-24 w-24 sm:h-26 sm:w-26" />
        )}
      </span>
      <span className="text-[10px] font-bold uppercase leading-tight tracking-[0.14em] text-caramel">
        Scan · Follow
      </span>
      <span className="text-xs font-semibold leading-tight text-cream group-hover:text-caramel">
        Get 10% off
      </span>
    </Link>
  );
}

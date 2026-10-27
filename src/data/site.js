export const site = {
  name: 'Jyotessa',
  tagline: 'Hand-poured candles for every celebration',
  subTagline: 'Life is too short to light boring candles.',
  mission:
    'We hand-pour candles that make everyday moments feel festive — terracotta diyas and lotus bowls for pooja, rose bouquets for the people you love, and sweet-shop treats you can light. Small batches, clean-burning wax and gift-ready packing, shipped across India.',
  supportEmail: 'support@jyotessa.com',
  whatsapp: '+91 93105 08371',
  phone: '+91 93105 08371',
  hours: 'Open 24 hours, 7 days a week',
  foundingDate: '2026-10-01',
  womenOwned: true,
  address: 'Handmade in India · Delivering across Uttar Pradesh',
  // Studio address — must match the Google Business Profile exactly
  location: {
    street: 'Near Barat Ghar, Wajidpur, Sector 63',
    city: 'Noida',
    region: 'Uttar Pradesh',
    postalCode: '201301',
    country: 'IN',
  },
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jyotessa%2C%20Wajidpur%2C%20Sector%2063%2C%20Noida%2C%20Uttar%20Pradesh%20201301',
  googleMapsEmbed: 'https://maps.google.com/maps?q=Jyotessa%2C%20Wajidpur%2C%20Sector%2063%2C%20Noida%2C%20Uttar%20Pradesh%20201301&z=15&output=embed',
  googleReviewUrl: 'https://g.page/r/CQ2T_G0wSr7nECE/review',
  socials: [
    { label: 'Instagram', handle: '@jyotessa', href: 'https://www.instagram.com/jyotessa/' },
    { label: 'Facebook', handle: 'jyotessa', href: 'https://www.facebook.com/jyotessa/' },
  ],
}

// Brand / lifestyle photography (public/images)
export const siteImages = {
  hero: '/images/site/hero-candle.webp',
  livingRoom: '/images/site/lifestyle-living-room.webp',
  proofPearled: '/images/site/proof-pearled.webp',
  proofTraditional: '/images/site/proof-traditional.webp',
  stepPour: '/images/site/step-pour.webp',
  stepIgnite: '/images/site/step-ignite.webp',
  beach: '/images/products/extra-beach-1.jpg',
  urli: '/images/products/extra-urli-1.webp',
  tulip: '/images/products/extra-tulip-1.jpg',
  matcha: '/images/products/extra-matcha-1.jpg',
  modak: '/images/products/extra-modak-1.jpg',
  daisy: '/images/products/extra-daisy-1.jpg',
}

export const instagramFeed = [
  '/images/products/extra-beach-2.jpg',
  '/images/products/extra-modak-2.jpg',
  '/images/products/extra-tulip-2.jpg',
  '/images/products/extra-matcha-2.jpg',
  '/images/products/extra-urli-2.webp',
  '/images/products/extra-daisy-2.jpg',
]

export const announcements = [
  '{shippingShort} · Delivering across {deliveryArea}',
  'Use code GLOW10 for 10% off your first order',
  'Cash on Delivery on every order',
  'Same-day dispatch on orders before 2 PM',
  'Hand-poured in India · 48 handmade designs',
]

export const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'Shop',
    to: '/shop',
    mega: [
      {
        heading: 'Festive & Gifting',
        items: [
          { label: 'Pooja & Diyas', to: '/shop?category=pooja-festive' },
          { label: 'Sweets & Treats', to: '/shop?category=food-inspired' },
          { label: 'Bouquets & Roses', to: '/shop?category=floral' },
          { label: 'Cute & Gifting', to: '/shop?category=cute-gifts' },
        ],
      },
      {
        heading: 'Home & Décor',
        items: [
          { label: 'Bubble Candles', to: '/shop?category=bubble-candles' },
          { label: 'Jars & Glass', to: '/shop?category=jars-glass' },
          { label: 'Floating Candles', to: '/shop?category=floating-candles' },
          { label: 'Tea Lights', to: '/shop?category=tealights' },
        ],
      },
    ],
  },
  { label: 'About Us', to: '/about' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Track Order', to: '/track-order' },
  { label: 'Contact', to: '/contact' },
]

export const stats = [
  { value: 2143, suffix: '+', label: 'Verified reviews' },
  { value: 4.9, suffix: '/5', label: 'Average rating', decimals: 1 },
  { value: 100, suffix: '%', label: 'Hand-poured' },
  { value: 48, suffix: '', label: 'Handmade designs' },
]

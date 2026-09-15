export const site = {
  name: 'candledust',
  tagline: "The World's Safest & Endless Pearled Candle",
  subTagline: 'Life is too short to light boring candles.',
  supportEmail: 'hello@candledust.in',
  whatsapp: '+91 90000 00000',
  phone: '+91 90000 00000',
  freeShippingAbove: 899,
  address: 'Studio 4, Artisan Lane, Jaipur, Rajasthan 302001',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
    { label: 'Pinterest', href: 'https://pinterest.com' },
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
  'Free Pan-India shipping above ₹899',
  'Use code GLOW10 for 10% off your first order',
  'Cash on Delivery across 22,000+ pin codes',
  'Same-day dispatch on orders before 2 PM',
  'Hand-poured in India · 100% soy wax',
]

export const navLinks = [
  { label: 'Home', to: '/' },
  {
    label: 'Shop',
    to: '/shop',
    mega: [
      {
        heading: 'Pearled Candles',
        items: [
          { label: 'All Pearl Kits', to: '/shop?line=pearled' },
          { label: 'Refills', to: '/shop?category=refills' },
          { label: 'Decor Kits', to: '/shop?category=pearl-kits' },
        ],
      },
      {
        heading: 'Handcrafted Candles',
        items: [
          { label: 'Food Inspired', to: '/shop?category=food-inspired' },
          { label: 'Love in the Air', to: '/shop?category=love-in-the-air' },
          { label: 'Floral', to: '/shop?category=floral' },
          { label: 'Luxury & Festive', to: '/shop?category=luxury' },
          { label: 'Wax Fresheners', to: '/shop?category=wax-fresheners' },
        ],
      },
    ],
  },
  { label: 'Our Story', to: '/about' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Track Order', to: '/track-order' },
  { label: 'Contact', to: '/contact' },
]

export const stats = [
  { value: 2143, suffix: '+', label: 'Verified reviews' },
  { value: 4.9, suffix: '★', label: 'Average rating', decimals: 1 },
  { value: 22000, suffix: '+', label: 'Pin codes served' },
  { value: 0.5, suffix: 's', label: 'Auto-extinguish', decimals: 1 },
]

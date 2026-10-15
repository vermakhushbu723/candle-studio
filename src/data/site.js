export const site = {
  name: 'Jyotessa',
  tagline: "The World's Safest & Endless Pearled Candle",
  subTagline: 'Life is too short to light boring candles.',
  mission:
    'We set out to remove the one thing standing between people and a lit candle: the fear of knocking it over. Pearled soy wax burns clean, spills nothing and refills forever — so ambience never has to be a risk.',
  supportEmail: 'support@jyotessa.com',
  whatsapp: '+91 93105 08371',
  phone: '+91 93105 08371',
  hours: 'Open 24 hours, 7 days a week',
  foundingDate: '2026-10-01',
  womenOwned: true,
  address: 'Handmade in India · Shipping Pan-India',
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
  '{shippingShort} · Pan-India',
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
      {
        heading: 'Collections',
        items: [
          { label: 'Cartoons & Kids', to: '/shop?category=cartoons-kids' },
          { label: 'Ocean', to: '/shop?category=ocean' },
          { label: 'Aesthetic', to: '/shop?category=aesthetic' },
          { label: 'Spiritual', to: '/shop?category=spiritual' },
          { label: 'Winter', to: '/shop?category=winter' },
        ],
      },
      {
        heading: 'Festive Specials',
        items: [
          { label: 'Diwali Special', to: '/shop?category=diwali-special' },
          { label: 'Christmas Special', to: '/shop?category=christmas-special' },
          { label: 'Valentine Special', to: '/shop?category=valentine-special' },
          { label: 'New Year Special', to: '/shop?category=new-year-special' },
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
  { value: 22000, suffix: '+', label: 'Pin codes served' },
  { value: 0.5, suffix: 's', label: 'Auto-extinguish', decimals: 1 },
]

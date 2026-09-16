export const site = {
  name: 'candledust',
  tagline: "The World's Safest & Endless Pearled Candle",
  subTagline: 'Life is too short to light boring candles.',
  mission:
    'We set out to remove the one thing standing between people and a lit candle: the fear of knocking it over. Pearled soy wax burns clean, spills nothing and refills forever — so ambience never has to be a risk.',
  supportEmail: 'care@candledust.in',
  whatsapp: '+91 93105 08371',
  phone: '+91 93105 08371',
  hours: 'Monday to Saturday, 10:00 AM – 7:00 PM IST',
  freeShippingAbove: 899,
  address: 'Handmade in India · Shipping Pan-India',
  socials: [
    { label: 'Instagram', handle: '@candledust.official', href: 'https://www.instagram.com/candledust.official/' },
    { label: 'Facebook', handle: 'candledust', href: 'https://www.facebook.com/profile.php?id=61593924424350' },
    { label: 'YouTube', handle: '@Candledust-official', href: 'https://www.youtube.com/@Candledust-official' },
    { label: 'Pinterest', handle: 'candledustofficial', href: 'https://in.pinterest.com/candledustofficial/' },
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

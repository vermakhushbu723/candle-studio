export const reviews = [
  { id: 'r1', name: 'Ananya Menon', location: 'Bengaluru', rating: 5, product: 'Water-Pond Lotus Candle', quote: 'The lotus bowl looked so pretty in my pooja corner that my mother asked for two more. Lovely finishing and very neatly packed.' },
  { id: 'r2', name: 'Rohan Kapadia', location: 'Mumbai', rating: 5, product: 'Designer Wax Diya Set', quote: 'Ordered the 12-diya combo for Diwali gifting. Burnt evenly, no oil mess, and everyone loved the carved rims.' },
  { id: 'r3', name: 'Sneha Iyer', location: 'Chennai', rating: 5, product: 'Motichoor Ladoo & Modak Candle Box', quote: 'They genuinely look like real sweets! Gave them as Ganpati return gifts and the kids were amazed.' },
  { id: 'r4', name: 'Devika Rathore', location: 'Jaipur', rating: 5, product: '3x3 Rose Pattern Bubble Candle', quote: 'Bought the rose cube for our anniversary — it is even prettier in person. Packed beautifully.' },
  { id: 'r5', name: 'Aditya Sharma', location: 'New Delhi', rating: 5, product: 'Slanted Gel & Hearts Glass Candle', quote: 'The gel-and-hearts glass is so aesthetic on my desk. Gifted one to my sister too.' },
  { id: 'r6', name: 'Farah Qureshi', location: 'Hyderabad', rating: 5, product: '3D Sitting Teddy Bear Candle', quote: 'Tiny, detailed and super cute. Perfect little add-on for a birthday hamper.' },
]
export const faqs = [
  {
    group: 'Our Candles',
    items: [
      { q: 'What are your candles made of?', a: 'Our candles are hand-poured in small batches with clean-burning candle wax and cotton wicks. Gel candles use a clear candle gel, and diyas and lotus bowls come in terracotta or brass holders.' },
      { q: 'How long does a candle burn?', a: 'It depends on the size: tea lights burn for about 3–4 hours, small sculpted candles for 4–8 hours and larger tins and glasses for longer. Burn for up to 3–4 hours at a time and trim the wick to 5 mm before each burn.' },
      { q: 'Do the floating candles really float?', a: 'Yes — our mini rose and daisy floating candles are made to float on water. Place them gently in a bowl, urli or pool and light them with a long lighter.' },
      { q: 'Are the sweet-shaped candles safe around kids?', a: 'They look very real, so please keep ladoo, modak and rasgulla candles out of reach of small children and label them clearly when gifting.' },
    ],
  },
  {
    group: 'Gifting & Custom Orders',
    items: [
      { q: 'Do you make custom or bulk hampers?', a: 'Yes — we make custom hampers for weddings, corporate Diwali gifting and return gifts. Reach out on WhatsApp or the contact form with quantity and budget.' },
      { q: 'Is the packaging gift-ready?', a: 'Every order is packed with care, and gift boxes come ready to gift. Add a gift note at checkout and we will handwrite it on a card for free.' },
    ],
  },
  {
    group: 'Orders & Shipping',
    items: [
      { q: 'Where do you deliver, and how fast?', a: 'We currently deliver only in {deliveryArea}. Orders placed before 2 PM IST are dispatched the same working day — Noida & Ghaziabad receive delivery in 1–2 days, the rest of Uttar Pradesh in 2–4 days.' },
      { q: 'Is Cash on Delivery available?', a: 'Yes, Cash on Delivery is available on every order we deliver ({deliveryArea}). {shipping}' },
      { q: 'What if my candle arrives damaged?', a: 'Notify us within 48 hours of delivery with an unboxing video or clear photographs and we will send a free replacement.' },
    ],
  },
]
export const howItWorks = [
  { title: 'Trim', body: 'Trim the wick to about 5 mm before every burn for a clean, steady flame.', image: '/images/products/catalog/designer-diya.jpg' },
  { title: 'Place', body: 'Set the candle on a stable, heat-safe surface — away from curtains, drafts, children and pets.', image: '/images/products/catalog/lotus-pond.jpg' },
  { title: 'Light', body: 'Light it and enjoy the glow. Floating candles go gently on water in a bowl or urli.', image: '/images/products/catalog/heart-gel-glass.jpg' },
  { title: 'Put out', body: 'Burn for up to 3–4 hours at a time, then snuff it out — never leave a lit candle unattended.', image: '/images/products/catalog/rose-bubble.jpg' },
]
export const whyUs = [
  { title: 'Hand-Poured in India', body: 'Every candle is poured and finished by hand in small batches — no two are exactly alike.' },
  { title: 'Made for Festivals', body: 'Diyas, lotus bowls and sweet-shop candles made for Diwali, pooja, Ganpati and every celebration.' },
  { title: 'Clean-Burning', body: 'Quality wax and cotton wicks for a steady, even burn and minimal smoke.' },
  { title: 'Gifts Under ₹500', body: 'From ₹35 tea-light sets to ₹499 gift boxes — thoughtful gifts for every budget.' },
]
export const scentQuiz = [
  {
    id: 'for',
    question: 'Who is it for?',
    options: [
      { value: 'self', label: 'Me, obviously' },
      { value: 'gift', label: 'A gift' },
      { value: 'romance', label: 'My person' },
      { value: 'host', label: 'Hosting guests' },
    ],
  },
  {
    id: 'mood',
    question: 'Pick a mood',
    options: [
      { value: 'calm', label: 'Calm & slow' },
      { value: 'cozy', label: 'Cozy & nostalgic' },
      { value: 'fresh', label: 'Fresh & airy' },
      { value: 'festive', label: 'Festive & bold' },
    ],
  },
  {
    id: 'budget',
    question: 'Your budget?',
    options: [
      { value: 'budget', label: 'Under ₹500' },
      { value: 'mid', label: '₹500 – ₹1,000' },
      { value: 'premium', label: 'Treat yourself' },
    ],
  },
]

export const milestones = [
  { year: '2021', title: 'A kitchen experiment', body: 'The first candles were poured on a stovetop as gifts for friends and family.' },
  { year: '2023', title: 'Festive favourites', body: 'Diyas, lotus bowls and sweet-shop candles became our Diwali and Ganpati best-loved range.' },
  { year: '2025', title: 'Roses & bubbles', body: 'Rose bouquets, bubble cubes and gel glasses joined the collection for gifting and décor.' },
  { year: '2026', title: 'Jyotessa online', body: 'All 48 designs now ship across Uttar Pradesh from our studio in Noida.' },
]
export const scentStories = [
  { title: 'Diwali Night', notes: 'Diyas · Rangoli · Family', line: 'Rows of carved terracotta diyas glowing at the door, with no oil and no mess.', image: '/images/products/catalog/designer-diya.jpg', productId: 'designer-diya-pack-of-12' },
  { title: 'Morning Pooja', notes: 'Brass · Lotus · Calm', line: 'A little lotus pond in a brass bowl, lit beside the mandir at sunrise.', image: '/images/products/catalog/lotus-pond.jpg', productId: 'lotus-pond' },
  { title: 'Ganpati Bappa', notes: 'Modak · Ladoo · Celebration', line: 'Motichoor ladoos and modaks you can light — the sweetest return gift.', image: '/images/products/catalog/ladoo-modak.jpg', productId: 'ladoo-modak' },
  { title: 'First Anniversary', notes: 'Roses · Pink · Romance', line: 'A cube of sculpted roses for the person who remembers every little thing.', image: '/images/products/catalog/rose-bubble.jpg', productId: 'rose-bubble' },
  { title: 'Cosy Corner', notes: 'Gel · Hearts · Glow', line: 'Slanted gel and tiny hearts in a glass, flickering on your bedside table.', image: '/images/products/catalog/heart-gel-glass.jpg', productId: 'heart-gel-glass' },
  { title: 'Teddy Day', notes: 'Cute · Gifting · Smiles', line: 'A little sitting teddy that is almost too cute to light.', image: '/images/products/catalog/teddy-bear.jpg', productId: 'teddy-bear' },
]
export const policies = {
  shipping: {
    title: 'Shipping Policy',
    sections: [
      { heading: 'Dispatch', text: 'Orders placed before 2 PM IST are dispatched the same working day. Tracking details are shared over email and WhatsApp.' },
      { heading: 'Delivery Timelines', text: 'We currently deliver only in {deliveryArea}. Noida & Ghaziabad — 1 to 2 days. Rest of Uttar Pradesh — 2 to 4 days.' },
      { heading: 'Shipping Charges', text: '{shipping} Cash on Delivery is available on every order.' },
    ],
  },
  returns: {
    title: 'Return, Refund & Replacement Policy',
    sections: [
      { heading: 'Return Window', text: 'Return or replacement requests can be raised within 7 days of delivery. Products must be unused and in original packaging.' },
      { heading: 'Damaged Products', text: 'Notify us within 48 hours of delivery and share an unboxing video or clear photographs.' },
      { heading: 'Refunds', text: 'Approved refunds are processed to the original payment method within 5–7 working days after quality check.' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { heading: 'What we collect', text: 'Name, contact details and address required to fulfil your order. We never sell your data.' },
      { heading: 'Payments', text: 'All payments are processed by secure, PCI-compliant partners. We do not store card details.' },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      { heading: 'Product Safety', text: 'Our candles involve a genuine open flame. Never leave a lit candle unattended and burn on a stable, heat-safe surface.' },
      { heading: 'Liability', text: 'Candles involve an open flame. Keep them away from children, pets and anything flammable, and follow the care instructions on each product.' },
    ],
  },
}

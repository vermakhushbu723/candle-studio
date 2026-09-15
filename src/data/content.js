export const reviews = [
  { id: 'r1', name: 'Ananya Menon', location: 'Bengaluru', rating: 5, product: 'The Ocean Escape', quote: 'My cat knocked it off the side table yesterday and it literally just went out without a drop of hot wax anywhere. Total gamechanger!' },
  { id: 'r2', name: 'Rohan Kapadia', location: 'Mumbai', rating: 5, product: 'Boho Botanical', quote: 'Sent four of these as Diwali gifts. The dried lavender in the ribbed jar got me three phone calls. Two of them have already reordered refills.' },
  { id: 'r3', name: 'Sneha Iyer', location: 'Chennai', rating: 5, product: 'The Mini Pocket Magic', quote: 'I have a toddler, so open flames were off the table for two years. Poured this into an old brass urli and I finally have my evenings back.' },
  { id: 'r4', name: 'Devika Rathore', location: 'Jaipur', rating: 5, product: 'Chai & Parle-G Biscuit Candle', quote: 'It smells exactly like 5 PM at my nani’s house. I bought ten more for my office team and everyone wanted to know where it’s from.' },
  { id: 'r5', name: 'Aditya Sharma', location: 'New Delhi', rating: 5, product: 'The Endless Refill & Scent Bar', quote: 'Bought it for the aesthetic, stayed for the refills. Pulling out the old pool and dropping in a new wick takes about ten seconds.' },
  { id: 'r6', name: 'Farah Qureshi', location: 'Hyderabad', rating: 5, product: 'Bouquet Candle', quote: 'The bouquet is so detailed my mother refused to light it for a week. Packaging was gorgeous — felt like a luxury brand.' },
]

export const faqs = [
  {
    group: 'Pearled Candles',
    items: [
      { q: 'How does the auto-extinguish feature work?', a: 'A pearled candle is thousands of loose soy granules with air between them. Only a small pool around the wick is ever molten. Tip the vessel and the dry pearls avalanche over the flame and cut off its oxygen, extinguishing it in roughly half a second.' },
      { q: 'Can I use my own essential oils with the pearls?', a: 'Yes. Stir 8–10 drops of any skin-safe essential or fragrance oil into roughly 100g of pearls, mix for a few seconds, then pour. You can run lavender on a weeknight and amber oud for a dinner party from the very same bag.' },
      { q: 'How long does 300g of Pearl Wax last?', a: 'A standard 200g jar candle gives roughly 35–40 hours. 300g of pearl wax runs for approximately 55–65 burn hours, and only the melted pool is consumed — the surrounding pearls get reused.' },
    ],
  },
  {
    group: 'Handcrafted Candles',
    items: [
      { q: 'Are the food-inspired candles safe to keep around kids?', a: 'They are made with 100% soy wax and cotton wicks, but they look very real! Please keep them out of reach of small children and label them clearly when gifting.' },
      { q: 'Why does my candle tunnel?', a: 'On the first burn, let the wax pool reach the edges (2–3 hours). Soy wax has a memory, so a short first burn creates a tunnel that is hard to fix later.' },
      { q: 'Do you make custom or bulk hampers?', a: 'Yes — we create custom hampers for weddings, corporate Diwali gifting and return gifts. Reach out on WhatsApp or the contact form with quantity and budget.' },
    ],
  },
  {
    group: 'Orders & Shipping',
    items: [
      { q: 'What are the shipping times across India?', a: 'Orders placed before 2 PM IST are dispatched the same working day. Metro cities receive delivery in 2–3 days, the rest of India in 4–6 days, North-East and island territories in 6–8 days.' },
      { q: 'Is Cash on Delivery available?', a: 'Yes, COD is available across 22,000+ pin codes. Shipping is free on every order above ₹899.' },
      { q: 'What if my candle arrives damaged?', a: 'Notify us within 48 hours of delivery with an unboxing video or clear photographs and we will send a free replacement.' },
      { q: 'Is the soy wax safe around dogs and cats?', a: 'The wax is 100% plant-based soy with no paraffin and no lead or zinc wick cores. Use unscented pearls for very sensitive pets and never leave a flame unattended.' },
    ],
  },
]

export const howItWorks = [
  { title: 'Pour', body: 'Fill any heat-safe glass, bowl or vessel with pearl wax — right up to two-thirds full.', image: '/images/site/step-pour.webp' },
  { title: 'Insert', body: 'Plant a braided cotton wick in the centre, leaving about a quarter inch standing proud.', image: '/images/products/kit-tester.webp' },
  { title: 'Ignite', body: 'Light it and settle in. A soft pool forms around the wick — soot-free, smoke-free warmth.', image: '/images/site/step-ignite.webp' },
  { title: 'Refresh', body: 'Once cool, lift out the hardened pool, drop in a fresh wick, and the candle is brand new.', image: '/images/products/kit-refill.webp' },
]

export const whyPearled = [
  { title: 'Spill-Proof & Safe', body: 'Tip it over and the loose pearls collapse onto the flame, smothering it in under a second. No running wax, no scorched tabletops.' },
  { title: 'Infinite Reusability', body: 'Only the melted pool around the wick is spent. Lift it out, drop in a fresh wick, and the remaining pearls are good as new.' },
  { title: 'Refill Any Vessel', body: 'Old whisky glasses, brass urlis, coconut shells, ceramic bowls — if it holds pearls, it becomes a designer candle.' },
  { title: 'Clean & Non-Toxic', body: 'Zero soot, zero paraffin, zero lead cores. Just 100% plant-based soy wax that burns cool and leaves walls unmarked.' },
]

export const comparison = {
  pearled: { caption: 'Pearled Candle', points: ['Self-extinguishes in ~0.5s', 'No hot wax spill', 'Reusable — just replace the wick', 'Any vessel you own'] },
  traditional: { caption: 'Traditional Candle', points: ['Keeps burning on its side', 'Hot wax pours across surfaces', 'Jar is dead once wax is gone', 'Fixed container'] },
}

export const scentQuiz = [
  {
    id: 'for',
    question: 'Who is it for?',
    options: [
      { value: 'self', label: 'Me, obviously', emoji: '🧘' },
      { value: 'gift', label: 'A gift', emoji: '🎁' },
      { value: 'romance', label: 'My person', emoji: '💞' },
      { value: 'host', label: 'Hosting guests', emoji: '🥂' },
    ],
  },
  {
    id: 'mood',
    question: 'Pick a mood',
    options: [
      { value: 'calm', label: 'Calm & slow', emoji: '🌙' },
      { value: 'cozy', label: 'Cozy & nostalgic', emoji: '☕' },
      { value: 'fresh', label: 'Fresh & airy', emoji: '🌊' },
      { value: 'festive', label: 'Festive & bold', emoji: '🪔' },
    ],
  },
  {
    id: 'budget',
    question: 'Your budget?',
    options: [
      { value: 'budget', label: 'Under ₹500', emoji: '🪙' },
      { value: 'mid', label: '₹500 – ₹1,000', emoji: '💳' },
      { value: 'premium', label: 'Treat yourself', emoji: '✨' },
    ],
  },
]

export const milestones = [
  { year: '2021', title: 'A kitchen experiment', body: 'The first chai-and-biscuit candle was poured on a stovetop for a friend’s birthday.' },
  { year: '2022', title: 'Handcrafted studio', body: 'Food-inspired and floral collections launched, hand-poured by a team of six.' },
  { year: '2024', title: 'The pearl idea', body: 'After a toddler knocked over a jar candle, we started testing loose soy pearls. It changed everything.' },
  { year: '2026', title: 'One home for both', body: 'Pearled kits and handcrafted candles now live together under one roof — candledust.' },
]

export const scentStories = [
  { title: 'Monsoon Chai', notes: 'Cardamom · Ginger · Warm milk', line: 'Rain on the window, a kulhad in hand and a Parle-G dipped just long enough.', image: '/images/products/chai-parle-g-candle-2.jpg', productId: 'chai-parle-g-candle' },
  { title: 'Seaside Dinner', notes: 'Ocean breeze · Sea salt · Driftwood', line: 'Shells, floating pearls and a long table that nobody wants to leave.', image: '/images/products/kit-ocean.webp', productId: 'ocean-escape' },
  { title: 'Diwali Night', notes: 'Sandalwood · Marigold · Ghee diya', line: 'Rangoli at the door, a brass urli glowing at the centre of it all.', image: '/images/products/kamal-jyoti-urli-2.webp', productId: 'kamal-jyoti-urli' },
  { title: 'First Anniversary', notes: 'Velvet rose · Soft musk', line: 'A bowl of tiny hearts for the person who remembers every little thing.', image: '/images/products/heart-bowl-candle-2.jpg', productId: 'heart-bowl-candle' },
  { title: 'Sunday Halwai', notes: 'Saffron · Caramel · Rabdi', line: 'The smell of hot jalebis drifting in from the corner sweet shop.', image: '/images/products/jalebi-rabdi-candle-2.jpg', productId: 'jalebi-rabdi-candle' },
  { title: 'Slow Mornings', notes: 'Lavender · Vanilla foam', line: 'No alarms, no hurry — just a latte and a flickering flame.', image: '/images/products/lavender-latte-candle-1.jpg', productId: 'lavender-latte-candle' },
]

export const policies = {
  shipping: {
    title: 'Shipping Policy',
    sections: [
      { heading: 'Dispatch', text: 'Orders placed before 2 PM IST are dispatched the same working day. Tracking details are shared over email and WhatsApp.' },
      { heading: 'Delivery Timelines', text: 'Metro cities — 2 to 3 days. Rest of India — 4 to 6 days. North-East and island territories — 6 to 8 days.' },
      { heading: 'Shipping Charges', text: 'Free shipping on orders above ₹899. A flat ₹79 applies below that. COD is available across 22,000+ pin codes.' },
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
      { heading: 'Liability', text: 'The auto-extinguish behaviour reduces spill risk under normal use — it does not remove the need for usual candle-safety precautions.' },
    ],
  },
}

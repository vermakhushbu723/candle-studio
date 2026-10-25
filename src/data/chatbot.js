/**
 * Rule-based support bot content. Each intent matches keywords in the user's
 * message and replies with text plus optional quick replies / actions.
 * Action types: 'link' (in-site route), 'whatsapp', 'call', 'inquiry' (opens form).
 */

export const greeting = {
  text: 'Hi! I’m Diya, your candle assistant. How can I help you today?',
  quickReplies: ['Track my order', 'Help me choose a candle', 'Bulk / corporate gifting', 'Shipping & COD', 'Returns & damage', 'Talk to a human'],
}

export const intents = [
  {
    id: 'track',
    match: /track|order status|where.*order|my order|dispatch/i,
    text: 'You can track your parcel live with your order ID. Tracking details are also sent on WhatsApp and email once it ships.',
    actions: [{ type: 'link', label: 'Open order tracking', to: '/track-order' }],
  },
  {
    id: 'recommend',
    match: /choose|recommend|suggest|which|best|gift for|confused/i,
    text: 'Happy to help! Here are our most-loved picks from both ranges:',
    products: ['lotus-pond', 'rose-bubble', 'designer-diya'],
    actions: [{ type: 'link', label: 'Take the scent quiz', to: '/#scent-finder' }],
  },
  {
    id: 'bulk',
    match: /bulk|corporate|wedding|hamper|return gift|custom|quantity/i,
    text: 'We make custom hampers for weddings, Diwali and teams — branded boxes and bulk pricing from 25 units. Share a few details and our gifting team will call you back within 24 hours.',
    actions: [{ type: 'inquiry', label: 'Send a bulk inquiry', topic: 'Bulk / corporate gifting' }],
  },
  {
    id: 'shipping',
    match: /ship|deliver|cod|cash on|how long|days|pincode|pin code/i,
    text: 'Orders before 2 PM ship the same day. Metros get delivery in 2–3 days, rest of India in 4–6 days. {shipping} Cash on Delivery works on 22,000+ pin codes.',
  },
  {
    id: 'returns',
    match: /return|refund|damage|broken|replace|exchange/i,
    text: 'Sorry about that! Notify us within 48 hours of delivery with an unboxing video or photos and we’ll send a free replacement. Returns are accepted within 7 days for unused items.',
    actions: [
      { type: 'whatsapp', label: 'Send photos on WhatsApp' },
      { type: 'link', label: 'Read return policy', to: '/policies/returns' },
    ],
  },
  {
    id: 'festive',
    match: /diya|diwali|pooja|puja|lotus|ganpati|ganesh|festival|festive/i,
    text: 'For Diwali and pooja, try our carved terracotta wax diyas (packs of 4, 8 and 12) and the lotus water-pond candle in a brass bowl. Ladoo & modak candles make sweet return gifts too!',
    actions: [{ type: 'link', label: 'Shop Pooja & Diyas', to: '/shop?category=pooja-festive' }],
  },
  {
    id: 'care',
    match: /safe|kids|pets|wick|burn|how long|care|float/i,
    text: 'Trim the wick to 5 mm, burn on a stable heat-safe surface for up to 3–4 hours at a time and never leave a candle unattended. Keep the sweet-shaped candles away from small children — they look very real! Floating candles go gently on water in a bowl or urli.',
    actions: [{ type: 'link', label: 'Read FAQs', to: '/faq' }],
  },
  {
    id: 'offers',
    match: /coupon|discount|offer|code|sale|cheap|price/i,
    text: 'Use code GLOW10 for 10% off your first order. Prices start at just ₹35.',
    actions: [{ type: 'link', label: 'Browse all candles', to: '/shop' }],
  },
  {
    id: 'human',
    match: /human|agent|person|call|talk|speak|support|contact|help/i,
    text: 'Of course! Our team is available 24 hours, 7 days a week. Choose how you’d like to connect:',
    actions: [
      { type: 'whatsapp', label: 'Chat on WhatsApp' },
      { type: 'call', label: 'Call us now' },
      { type: 'inquiry', label: 'Leave a message', topic: 'Support' },
    ],
  },
]

export const fallback = {
  text: 'I’m not sure I got that — but a real person can definitely help. Would you like to connect with our team?',
  actions: [
    { type: 'whatsapp', label: 'Chat on WhatsApp' },
    { type: 'inquiry', label: 'Leave a message', topic: 'Support' },
  ],
}

export const inquiryTopics = ['Support', 'Order issue', 'Bulk / corporate gifting', 'Custom hamper', 'Product question']

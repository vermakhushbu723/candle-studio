/**
 * Google Analytics 4 (gtag.js). Turned on by VITE_GA_MEASUREMENT_ID (G-XXXXXXXXXX) — without it every call is a no-op.
 * Page views are sent on each route change (single-page app), plus the standard GA4 ecommerce events so
 * Analytics → Reports → Monetisation shows product views, add-to-carts, checkouts and revenue.
 */
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
export const analyticsEnabled = Boolean(GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID))

let started = false

export function initAnalytics() {
  if (!analyticsEnabled || started || typeof window === 'undefined') return
  started = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments) // eslint-disable-line prefer-rest-params
  }
  window.gtag('js', new Date())
  // We send page_view ourselves on every route change
  window.gtag('config', GA_ID, { send_page_view: false, currency: 'INR' })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
}

const send = (name, params = {}) => {
  if (!analyticsEnabled) return
  initAnalytics() // events fired by the first page can run before the tracker mounts — start GA on demand
  window.gtag('event', name, params)
}

export const trackPageView = (path) => send('page_view', { page_path: path, page_location: window.location.href, page_title: document.title })

/** Logged-in customers are counted as one user across devices (no personal data is sent — only the internal ID). */
export const setAnalyticsUser = (id) => {
  if (!analyticsEnabled) return
  initAnalytics()
  window.gtag('set', { user_id: id ?? null })
}

const item = (p, quantity = 1, extra = {}) => ({
  item_id: p.id,
  item_name: p.name,
  item_brand: 'Jyotessa',
  item_category: p.line === 'pearled' ? 'Pearled Candles' : 'Handcrafted Candles',
  item_category2: p.category,
  price: p.price,
  quantity,
  ...extra,
})

export const track = {
  viewItem: (p) => send('view_item', { currency: 'INR', value: p.price, items: [item(p)] }),
  viewItemList: (listName, products) =>
    send('view_item_list', { item_list_name: listName, items: products.slice(0, 20).map((p, i) => item(p, 1, { index: i })) }),
  addToCart: (p, quantity, fragrance) => send('add_to_cart', { currency: 'INR', value: p.price * quantity, items: [item(p, quantity, { item_variant: fragrance ?? undefined })] }),
  removeFromCart: (p, quantity) => send('remove_from_cart', { currency: 'INR', value: p.price * quantity, items: [item(p, quantity)] }),
  addToWishlist: (p) => send('add_to_wishlist', { currency: 'INR', value: p.price, items: [item(p)] }),
  viewCart: (lines, total) => send('view_cart', { currency: 'INR', value: total, items: lines.map((l) => item(l.product, l.quantity)) }),
  beginCheckout: (lines, total, coupon) => send('begin_checkout', { currency: 'INR', value: total, coupon: coupon ?? undefined, items: lines.map((l) => item(l.product, l.quantity)) }),
  addShippingInfo: (lines, total) => send('add_shipping_info', { currency: 'INR', value: total, items: lines.map((l) => item(l.product, l.quantity)) }),
  addPaymentInfo: (lines, total, method) => send('add_payment_info', { currency: 'INR', value: total, payment_type: method, items: lines.map((l) => item(l.product, l.quantity)) }),
  /** Sent once per order (a page refresh on the thank-you screen won't count it twice). */
  purchase: (order) => {
    try {
      const key = `ga-purchase-${order.id}`
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      /* storage blocked — still send */
    }
    send('purchase', {
      transaction_id: order.id,
      currency: 'INR',
      value: order.total,
      shipping: order.shipping,
      coupon: order.couponCode ?? undefined,
      payment_type: order.paymentMethod,
      items: order.items.map((i) => ({ item_id: i.productId, item_name: i.name, item_brand: 'Jyotessa', price: i.price, quantity: i.quantity, item_variant: i.fragrance ?? undefined })),
    })
  },
  login: (method) => send('login', { method }),
  signUp: (method) => send('sign_up', { method }),
  search: (term) => term && send('search', { search_term: term }),
  applyCoupon: (code) => send('select_promotion', { promotion_id: code, promotion_name: code }),
  lead: (topic) => send('generate_lead', { lead_source: topic, currency: 'INR', value: 0 }),
  followOfferClaimed: () => send('follow_offer_claimed'),
  contact: (channel) => send('contact', { method: channel }),
}

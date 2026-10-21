/**
 * SEO for every storefront URL — one source of truth used by:
 *   • the browser (src/seo/SeoManager.jsx) — updates <head> on every navigation
 *   • the build (scripts/prerender.mjs) — writes a real HTML file per page for crawlers & link previews
 * Plain ESM with relative imports only, so Node can run it without Vite.
 */
import { faqs, policies } from '../data/content.js'
import { categories as productCategories, lines } from '../data/products.js'
import { site } from '../data/site.js'

export const SITE_URL = 'https://jyotessa.com'
export const BRAND = 'Jyotessa'
const OG_IMAGE = '/og-image.jpg'
const LOGO = '/logo.png'

const abs = (path) => (!path ? undefined : path.startsWith('http') ? path : SITE_URL + path)
const clip = (s = '', n = 158) => {
  const t = String(s).replace(/\s+/g, ' ').trim()
  return t.length <= n ? t : t.slice(0, t.lastIndexOf(' ', n - 1)).replace(/[,.;:—-]+$/, '') + '…'
}
const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`

const shippingLine = (s) =>
  !s || s.shippingFee === 0
    ? 'Free shipping on every order.'
    : s.freeShippingEnabled
      ? `Free shipping above ${inr(s.freeShippingAbove)}.`
      : `Flat ${inr(s.shippingFee)} shipping.`
const fillShipping = (text, s) => String(text).replaceAll('{shipping}', shippingLine(s)).replaceAll('{shippingShort}', shippingLine(s).replace(/\.$/, ''))

const organization = () => ({
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: BRAND,
  url: SITE_URL,
  logo: abs(LOGO),
  email: site.supportEmail,
  telephone: site.phone.replace(/\s/g, ''),
  foundingDate: site.foundingDate,
  sameAs: site.socials.map((s) => s.href),
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', telephone: site.phone.replace(/\s/g, ''), email: site.supportEmail, areaServed: 'IN', availableLanguage: ['en', 'hi'] }],
})

/** The studio as a local business — matches the Google Business Profile (name, address, phone, hours). */
const localBusiness = () => ({
  '@type': 'Store',
  '@id': `${SITE_URL}/#store`,
  name: BRAND,
  url: SITE_URL,
  image: abs(OG_IMAGE),
  logo: abs(LOGO),
  telephone: site.phone.replace(/\s/g, ''),
  email: site.supportEmail,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.location.street,
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    postalCode: site.location.postalCode,
    addressCountry: site.location.country,
  },
  hasMap: site.googleMapsUrl,
  areaServed: { '@type': 'Country', name: 'India' },
  foundingDate: site.foundingDate,
  paymentAccepted: 'Cash, Credit Card, Debit Card, Google Pay, UPI',
  currenciesAccepted: 'INR',
  // Open 24 hours, 7 days — same as the Google Business Profile
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }],
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
})

const breadcrumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
})

const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) })

/** Category/collection lookup: product categories (static) + collections (from the admin). */
function findCategory(id, collections = []) {
  const c = productCategories.find((x) => x.id === id && x.line !== 'all')
  if (c) return { id, name: c.label, description: '', image: c.image }
  const col = collections.find((x) => (x.id ?? x.slug) === id)
  return col ? { id, name: col.name, description: col.description, image: col.image } : null
}

const productUrl = (p) => `/product/${p.id ?? p.slug}`

/**
 * @param {string} pathname  e.g. "/product/ocean-escape"
 * @param {object} ctx       { search: URLSearchParams|string, products, collections, shipping }
 * @returns {{ title, description, canonical, image, type, robots, jsonLd, status }}
 */
export function metaFor(pathname, ctx = {}) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const q = new URLSearchParams(ctx.search ?? '')
  const products = ctx.products ?? []
  const collections = ctx.collections ?? []
  const base = { image: abs(OG_IMAGE), type: 'website', robots: 'index,follow', status: 200 }
  const noindex = (title, description) => ({ ...base, title: `${title} | ${BRAND}`, description, canonical: abs(path), robots: 'noindex,follow' })

  // ——— Home
  if (path === '/') {
    return {
      ...base,
      title: `Handmade Soy Candles & Candle Gift Sets in India | ${BRAND}`,
      description: clip(`Shop hand-poured soy wax candles, spill-proof pearled candle kits and festive gift sets from ${BRAND}. Diwali, Valentine & winter collections. ${shippingLine(ctx.shipping)} Cash on Delivery across India.`),
      canonical: abs('/'),
      jsonLd: graph(
        organization(),
        localBusiness(),
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: BRAND,
          publisher: { '@id': `${SITE_URL}/#organization` },
          inLanguage: 'en-IN',
          potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/shop?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
        },
      ),
    }
  }

  // ——— Shop, categories, collections, search
  if (path === '/shop') {
    const category = q.get('category')
    const line = q.get('line')
    const search = q.get('q')
    if (search) return noindex(`Search results for “${search}”`, `Candles matching “${search}” at ${BRAND}.`)

    const cat = category ? findCategory(category, collections) : null
    const lineInfo = !cat && line ? lines[line] : null
    const list = products.filter((p) => (cat ? p.category === category || p.collections?.includes(category) : lineInfo ? p.line === line : true))
    const name = cat?.name ?? lineInfo?.title ?? 'All Candles'
    const canonicalPath = cat ? `/shop?category=${encodeURIComponent(category)}` : lineInfo ? `/shop?line=${line}` : '/shop'
    const from = list.length ? Math.min(...list.map((p) => p.price)) : null

    const title = cat
      ? `${name} — Buy ${name.replace(/ Collection$/, '')} Candles Online | ${BRAND}`
      : lineInfo
        ? `${name} — ${lineInfo.kicker} | ${BRAND}`
        : `Shop All Candles — Soy Wax, Pearled Kits & Gift Sets | ${BRAND}`
    const description = clip(
      cat?.description
        ? `${cat.description} ${list.length} handmade designs${from ? ` from ${inr(from)}` : ''}. ${shippingLine(ctx.shipping)}`
        : lineInfo
          ? `${lineInfo.description} ${list.length} designs${from ? ` from ${inr(from)}` : ''}.`
          : `Browse ${list.length || 'all'} handmade candles — pearled soy wax kits, food-inspired, floral and festive candles${from ? ` from ${inr(from)}` : ''}. ${shippingLine(ctx.shipping)}`,
    )
    return {
      ...base,
      title,
      description,
      canonical: abs(canonicalPath),
      image: abs(cat?.image) ?? base.image,
      robots: category && !cat && products.length ? 'noindex,follow' : 'index,follow',
      jsonLd: graph(
        breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Shop', path: '/shop' }, ...(cat || lineInfo ? [{ name, path: canonicalPath }] : [])]),
        list.length
          ? {
              '@type': 'CollectionPage',
              name,
              url: abs(canonicalPath),
              mainEntity: { '@type': 'ItemList', numberOfItems: list.length, itemListElement: list.slice(0, 30).map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(productUrl(p)), name: p.name })) },
            }
          : null,
      ),
    }
  }

  // ——— Product
  const productMatch = path.match(/^\/product\/([^/]+)$/)
  if (productMatch) {
    const p = products.find((x) => (x.id ?? x.slug) === decodeURIComponent(productMatch[1]))
    if (!p) return { ...noindex('Candle not found', 'This candle is no longer available. Browse our latest handmade candles.'), status: 404 }
    const cat = findCategory(p.category, collections)
    const images = (p.images?.length ? p.images : [p.visual?.image]).filter(Boolean).map(abs)
    const inStock = p.stock === undefined || p.stock > 0
    return {
      ...base,
      type: 'product',
      title: `${p.name}${p.subtitle ? ` — ${p.subtitle}` : ''} | ${inr(p.price)} | ${BRAND}`,
      description: clip(`${p.tagline ? p.tagline + ' ' : ''}${p.description ?? ''} ${inr(p.price)}. ${shippingLine(ctx.shipping)}`),
      canonical: abs(productUrl(p)),
      image: images[0] ?? base.image,
      price: p.price,
      jsonLd: graph(
        breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Shop', path: '/shop' }, ...(cat ? [{ name: cat.name, path: `/shop?category=${p.category}` }] : []), { name: p.name, path: productUrl(p) }]),
        {
          '@type': 'Product',
          '@id': `${abs(productUrl(p))}#product`,
          name: p.name,
          description: clip(`${p.tagline ?? ''} ${p.description ?? ''}`, 500),
          image: images,
          sku: p.id ?? p.slug,
          brand: { '@type': 'Brand', name: BRAND },
          category: cat?.name,
          material: 'Soy wax',
          offers: {
            '@type': 'Offer',
            url: abs(productUrl(p)),
            priceCurrency: 'INR',
            price: p.price,
            availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: { '@id': `${SITE_URL}/#organization` },
            hasMerchantReturnPolicy: { '@type': 'MerchantReturnPolicy', applicableCountry: 'IN', returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow', merchantReturnDays: 7, returnMethod: 'https://schema.org/ReturnByMail' },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
              shippingRate: { '@type': 'MonetaryAmount', currency: 'INR', value: ctx.shipping && (ctx.shipping.shippingFee === 0 || (ctx.shipping.freeShippingEnabled && p.price >= ctx.shipping.freeShippingAbove)) ? 0 : ctx.shipping?.shippingFee ?? 79 },
              deliveryTime: { '@type': 'ShippingDeliveryTime', handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' }, transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 6, unitCode: 'DAY' } },
            },
          },
        },
      ),
    }
  }

  // ——— Content pages
  const pages = {
    '/about': { title: `About ${BRAND} — Handmade Candles Poured in India`, description: `The story behind ${BRAND}: spill-proof pearled soy wax candles and hand-poured, Indian-inspired decorative candles made in small batches.`, schema: 'AboutPage' },
    '/contact': { title: `Contact ${BRAND} — Order Help, Bulk & Corporate Gifting`, description: `Reach ${BRAND} on WhatsApp ${site.whatsapp}, call or email ${site.supportEmail}. Order support, bulk and corporate gifting, custom hampers — we reply within a day.`, schema: 'ContactPage' },
    '/faq': { title: `FAQs — Shipping, COD, Returns & Candle Care | ${BRAND}`, description: clip(`Answers about pearled candles, burn time, shipping, Cash on Delivery, returns and candle care. ${shippingLine(ctx.shipping)}`) },
    '/track-order': { title: `Track Your Order | ${BRAND}`, description: `Track your ${BRAND} order with your order ID and phone number or email — see when it is packed, shipped and out for delivery.` },
    '/follow': { title: `Follow Us & Get 10% Off | ${BRAND}`, description: `Scan, follow ${BRAND} on Instagram, Facebook and Google and get a personal 10% off coupon on your next candle order. One coupon per customer and per phone.` },
    '/disclaimer': { title: `Disclaimer | ${BRAND}`, description: `Product, safety and website disclaimers for ${BRAND} candles.` },
  }
  if (path === '/about-us') return { ...metaFor('/about', ctx), canonical: abs('/about') }
  if (path === '/policies/disclaimer') return { ...metaFor('/disclaimer', ctx), canonical: abs('/disclaimer') }

  if (pages[path]) {
    const pg = pages[path]
    let extra = null
    if (path === '/faq') {
      extra = { '@type': 'FAQPage', mainEntity: faqs.flatMap((g) => g.items).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: fillShipping(f.a, ctx.shipping) } })) }
    } else if (pg.schema) {
      extra = { '@type': pg.schema, name: pg.title, url: abs(path), about: { '@id': `${SITE_URL}/#organization` } }
    }
    return {
      ...base,
      title: pg.title,
      description: clip(pg.description),
      canonical: abs(path),
      jsonLd: graph(path === '/contact' ? organization() : null, path === '/contact' ? localBusiness() : null, breadcrumbs([{ name: 'Home', path: '/' }, { name: pg.title.split(' — ')[0].split(' | ')[0], path }]), extra),
    }
  }

  const policy = path.match(/^\/policies\/([^/]+)$/)
  if (policy && policies[policy[1]]) {
    const pol = policies[policy[1]]
    const text = pol.sections?.map((s) => fillShipping(s.text, ctx.shipping)).join(' ')
    return {
      ...base,
      title: `${pol.title} | ${BRAND}`,
      description: clip(text || `${pol.title} for ${BRAND}.`),
      canonical: abs(path),
      jsonLd: graph(breadcrumbs([{ name: 'Home', path: '/' }, { name: pol.title, path }])),
    }
  }

  // ——— Private / utility pages — reachable, but kept out of search results
  if (path === '/cart') return noindex('Your Cart', `Review the candles in your ${BRAND} cart.`)
  if (path === '/checkout') return noindex('Checkout', `Secure checkout for your ${BRAND} order.`)
  if (path === '/wishlist') return noindex('Your Wishlist', `Candles you saved at ${BRAND}.`)
  if (path === '/login') return noindex('Log in or Sign up', `Log in to ${BRAND} with your mobile number or Google to track orders and save candles.`)

  return { ...noindex('Page not found', `This page doesn’t exist. Explore handmade candles at ${BRAND}.`), status: 404 }
}

/** Every indexable URL for sitemap.xml (+ images for products). */
export function sitemapEntries(ctx = {}) {
  const products = ctx.products ?? []
  const collections = ctx.collections ?? []
  const cats = productCategories.filter((c) => c.line !== 'all').map((c) => c.id)
  const now = new Date().toISOString().slice(0, 10)
  const entry = (path, priority, changefreq, extra = {}) => ({ loc: abs(path), priority, changefreq, lastmod: now, ...extra })
  return [
    entry('/', '1.0', 'daily'),
    entry('/shop', '0.9', 'daily'),
    entry('/shop?line=pearled', '0.8', 'weekly'),
    entry('/shop?line=handcrafted', '0.8', 'weekly'),
    ...cats.map((c) => entry(`/shop?category=${c}`, '0.8', 'weekly')),
    ...collections.map((c) => entry(`/shop?category=${encodeURIComponent(c.id ?? c.slug)}`, '0.8', 'weekly')),
    ...products.map((p) =>
      entry(productUrl(p), '0.9', 'weekly', {
        lastmod: (p.updatedAt ?? now).slice(0, 10),
        images: (p.images ?? []).map((src) => ({ loc: abs(src), title: p.name })),
      }),
    ),
    entry('/about', '0.6', 'monthly'),
    entry('/contact', '0.6', 'monthly'),
    entry('/faq', '0.6', 'monthly'),
    entry('/track-order', '0.4', 'monthly'),
    entry('/follow', '0.5', 'monthly'),
    ...Object.keys(policies).map((id) => entry(`/policies/${id}`, '0.3', 'yearly')),
    entry('/disclaimer', '0.3', 'yearly'),
  ]
}

/** Paths that get their own pre-rendered HTML file. */
export function prerenderPaths(ctx = {}) {
  return [
    '/', '/shop', '/about', '/about-us', '/contact', '/faq', '/track-order', '/follow', '/disclaimer', '/policies/disclaimer',
    ...Object.keys(policies).map((id) => `/policies/${id}`),
    '/cart', '/checkout', '/wishlist', '/login',
    ...(ctx.products ?? []).map(productUrl),
  ]
}

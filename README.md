# candledust — Pearled & Handcrafted Candles

One storefront that combines the two candle ranges:

- **Pearled candles** (from candledust.online): reusable, spill-proof soy wax pearl kits
- **Handcrafted candles** (from skiyaaroma.in): hand-poured, Indian-inspired decorative candles

**Stack:** React 19 · Vite · Tailwind CSS v4 · Ant Design 6 · Framer Motion · React Router 7

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Folder structure

```
src/
├── main.jsx               # Entry: router + global styles
├── App.jsx                # Providers (antd theme, cart, wishlist)
├── routes/AppRoutes.jsx   # All routes (lazy-loaded pages)
├── theme/antdTheme.js     # Ant Design tokens (candledust colours)
├── styles/index.css       # Tailwind theme tokens, utilities, keyframes
├── data/                  # All content — edit here, not in components
│   ├── products.js        # Catalogue, categories, fragrances
│   ├── content.js         # Reviews, FAQs, policies, quiz, timeline
│   └── site.js            # Brand info, nav links, announcements, stats
├── context/               # CartContext, WishlistContext (localStorage)
├── utils/format.js        # Price formatting, storage helpers
├── components/
│   ├── layout/            # Navbar (mega menu, search), Footer, CartDrawer…
│   ├── common/            # ProductCard, CandleVisual, PageHeader, Reveal…
│   └── home/              # One file per homepage section
└── pages/                 # Home, Shop, ProductDetail, About, Contact, Faq,
                           # TrackOrder, Cart, Checkout, Wishlist, Policy, NotFound
```

## Common edits

| Task | Where |
| --- | --- |
| Add / change a product | `src/data/products.js` |
| Change colours | `src/styles/index.css` (`@theme`) and `src/theme/antdTheme.js` |
| Email, WhatsApp, address | `src/data/site.js` (currently placeholders) |
| Use real product photos | Pass `image` to `<CandleVisual>`, or add an `image` field to products |
| Connect courier tracking | `lookupOrder` in `src/pages/TrackOrder.jsx` |
| Connect payments | `next()` in `src/pages/Checkout.jsx` |

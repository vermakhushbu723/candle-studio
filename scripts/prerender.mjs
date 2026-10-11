#!/usr/bin/env node
/**
 * SEO pre-render: writes one HTML file per page (own <title>, description, canonical, Open Graph, JSON-LD)
 * plus sitemap.xml and robots.txt, using live products/collections from the API.
 * Search engines and WhatsApp/Facebook link previews read these without running JavaScript;
 * the React app still boots normally on top of each file.
 *
 *   node scripts/prerender.mjs [distDir]            (default: dist)       — runs after `vite build`
 *   API_URL=https://api.jyotessa.com/api node scripts/prerender.mjs /var/www/jyotessa   — refresh on the server (cron)
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { headHtml } from '../src/seo/head.js'
import { SITE_URL, metaFor, prerenderPaths, sitemapEntries } from '../src/seo/meta.js'

const dist = resolve(process.argv[2] ?? 'dist')
const API = process.env.API_URL ?? 'https://api.jyotessa.com/api'

// The untouched app shell is kept as 200.html — nginx serves it for URLs without their own file (e.g. a product added a minute ago)
const shell = join(dist, '200.html')
if (!existsSync(shell)) copyFileSync(join(dist, 'index.html'), shell)
const template = readFileSync(shell, 'utf8')

const get = async (path) => {
  const r = await fetch(API + path)
  if (!r.ok) throw new Error(`${path} → ${r.status}`)
  return r.json()
}
const [{ products }, { collections }, { shipping }] = await Promise.all([get('/products'), get('/collections'), get('/settings')])
const ctx = { products, collections, shipping }

// Strip the shell's generic title/description, then add this page's tags
const render = (meta) =>
  template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/i, '')
    .replace('</head>', `    ${headHtml(meta)}\n  </head>`)

let pages = 0
for (const path of prerenderPaths(ctx)) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, render(metaFor(path, ctx)))
  pages++
}

// sitemap.xml (with product images)
const x = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const urls = sitemapEntries(ctx)
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${x(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${(u.images ?? []).map((i) => `
    <image:image><image:loc>${x(i.loc)}</image:loc><image:title>${x(i.title)}</image:title></image:image>`).join('')}
  </url>`,
  )
  .join('\n')}
</urlset>
`,
)

writeFileSync(
  join(dist, 'robots.txt'),
  `# Jyotessa — ${SITE_URL}
User-agent: *
Allow: /
# Cart, checkout, login, wishlist and search results carry a "noindex" tag instead of a Disallow,
# so crawlers can read that tag and drop them from results.

Sitemap: ${SITE_URL}/sitemap.xml
`,
)

console.log(`SEO: ${pages} pages, sitemap with ${urls.length} URLs, robots.txt → ${dist}`)

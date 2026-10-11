/** Turns metaFor() output into <head> tags — as a string (build/prerender) or live in the document (browser). */
import { BRAND } from './meta.js'

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** [kind, key, value] — kind: name | property | link */
function tagList(m) {
  const tags = [
    ['name', 'description', m.description],
    ['name', 'robots', m.robots],
    ['link', 'canonical', m.canonical],
    ['property', 'og:site_name', BRAND],
    ['property', 'og:locale', 'en_IN'],
    ['property', 'og:type', m.type === 'product' ? 'product' : 'website'],
    ['property', 'og:title', m.title],
    ['property', 'og:description', m.description],
    ['property', 'og:url', m.canonical],
    ['property', 'og:image', m.image],
    ['property', 'og:image:alt', m.title],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', m.title],
    ['name', 'twitter:description', m.description],
    ['name', 'twitter:image', m.image],
  ]
  if (m.type === 'product' && m.price !== undefined) {
    tags.push(['property', 'product:price:amount', String(m.price)], ['property', 'product:price:currency', 'INR'])
  }
  return tags.filter(([, , v]) => v !== undefined && v !== null && v !== '')
}

/** HTML for the build step. */
export function headHtml(m) {
  const lines = [`<title>${esc(m.title)}</title>`]
  for (const [kind, key, value] of tagList(m)) {
    lines.push(kind === 'link' ? `<link rel="${key}" href="${esc(value)}" />` : `<meta ${kind}="${key}" content="${esc(value)}" />`)
  }
  if (m.jsonLd) lines.push(`<script type="application/ld+json" id="seo-jsonld">${JSON.stringify(m.jsonLd).replace(/</g, '\\u003c')}</script>`)
  return lines.join('\n    ')
}

/** Live update in the browser (called on every navigation). */
export function applyHead(m) {
  document.title = m.title
  const managed = new Set()
  for (const [kind, key, value] of tagList(m)) {
    const selector = kind === 'link' ? `link[rel="${key}"]` : `meta[${kind}="${key}"]`
    let el = document.head.querySelector(selector)
    if (!el) {
      el = document.createElement(kind === 'link' ? 'link' : 'meta')
      if (kind === 'link') el.rel = key
      else el.setAttribute(kind, key)
      document.head.appendChild(el)
    }
    el.setAttribute(kind === 'link' ? 'href' : 'content', value)
    managed.add(el)
  }
  // Remove tags from the previous page that this page doesn't use (e.g. product price)
  document.head.querySelectorAll('meta[property^="product:"]').forEach((el) => !managed.has(el) && el.remove())

  let ld = document.getElementById('seo-jsonld')
  if (m.jsonLd) {
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.id = 'seo-jsonld'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(m.jsonLd)
  } else {
    ld?.remove()
  }
}

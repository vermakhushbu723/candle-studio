import { formatPrice } from '@/utils/format'

/** Used until the API answers (and if it is unreachable). Real values come from Admin → Settings → Shipping charges. */
export const DEFAULT_SHIPPING = { shippingFee: 79, freeShippingEnabled: true, freeShippingAbove: 899 }

const mode = (s) => (s.shippingFee === 0 ? 'free' : s.freeShippingEnabled ? 'threshold' : 'flat')

/** Same rule as the API (models/Setting.ts → shippingFor). */
export function shippingFor(amountAfterDiscount, s) {
  if (amountAfterDiscount === 0) return 0
  if (mode(s) === 'free') return 0
  if (mode(s) === 'threshold' && amountAfterDiscount >= s.freeShippingAbove) return 0
  return s.shippingFee
}

/** How much more the customer must add for free shipping (null when there is no threshold). */
export const remainingForFree = (amountAfterDiscount, s) => (mode(s) === 'threshold' ? Math.max(0, s.freeShippingAbove - amountAfterDiscount) : null)

/** Short label, e.g. for the announcement bar or a product perk. */
export function shippingShort(s) {
  return { free: 'Free shipping on every order', threshold: `Free shipping above ${formatPrice(s.freeShippingAbove)}`, flat: `Flat ${formatPrice(s.shippingFee)} shipping` }[mode(s)]
}

/** One full sentence for FAQs, policies and the chatbot. */
export function shippingSentence(s) {
  return {
    free: 'Shipping is free on every order.',
    threshold: `Shipping is free on orders above ${formatPrice(s.freeShippingAbove)}; a flat ${formatPrice(s.shippingFee)} applies below that.`,
    flat: `A flat ${formatPrice(s.shippingFee)} shipping charge applies to every order.`,
  }[mode(s)]
}

/** Trust-bar style title + subtitle. */
export function shippingPerk(s) {
  return {
    free: { title: 'Free shipping', text: 'On every order' },
    threshold: { title: 'Free shipping', text: `On orders above ${formatPrice(s.freeShippingAbove)}` },
    flat: { title: `Flat ${formatPrice(s.shippingFee)} shipping`, text: 'Pan-India delivery' },
  }[mode(s)]
}

/** Replaces {shipping} / {shippingShort} placeholders in copy from src/data. */
export const fillShipping = (text, s) => (typeof text === 'string' ? text.replaceAll('{shipping}', shippingSentence(s)).replaceAll('{shippingShort}', shippingShort(s)) : text)

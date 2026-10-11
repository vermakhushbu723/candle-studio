import { Link } from 'react-router-dom'

/**
 * Jyotessa logo. Header: the J-candle mark + wordmark side by side (readable at nav height).
 * `light` (dark backgrounds, e.g. the footer): the full stacked logo in cream.
 */
export default function Logo({ light = false }) {
  if (light) {
    return (
      <Link to="/" aria-label="Jyotessa home" className="inline-block">
        <img src="/logo-light.png" alt="Jyotessa" width="800" height="800" className="h-40 w-auto" />
      </Link>
    )
  }
  return (
    <Link to="/" className="group flex items-center gap-2" aria-label="Jyotessa home">
      <img src="/logo-mark.png" alt="" width="512" height="512" className="h-14 w-auto transition-transform duration-500 group-hover:scale-105" />
      <span className="font-brand text-2xl font-semibold tracking-[0.14em] text-terracotta">JYOTESSA</span>
    </Link>
  )
}

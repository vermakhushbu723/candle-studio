import { Link } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="group flex items-center gap-2" aria-label="candledust home">
      <svg viewBox="0 0 32 32" className="h-8 w-8">
        <path className="flame" d="M16 3c4 6 6 9 6 13a6 6 0 0 1-12 0c0-4 2-7 6-13z" fill="#B76E4A" />
        <rect x="8" y="19" width="16" height="10" rx="3" fill={light ? '#F6EDE4' : '#EADBC8'} />
      </svg>
      <span className={`font-serif text-2xl tracking-tight ${light ? 'text-cream' : 'text-charcoal'}`}>
        candle<span className="italic text-terracotta">dust</span>
      </span>
    </Link>
  )
}

import { useId } from 'react'

/**
 * Illustrated candle rendered in SVG, so every product has on-brand artwork
 * without external images. Swap for real product photos by passing `image`.
 */
export default function CandleVisual({ visual, image, alt = '', lit = true, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const photo = image ?? visual?.image
  if (photo) return <img src={photo} alt={alt} className={`h-full w-full object-cover ${className}`} loading="lazy" decoding="async" />

  const { shape = 'jar', bg = '#F6EDE4', vessel = '#EADBC8', wax = '#FFF9F5', pearls, decor, topper, unlit, double } = visual
  const showFlame = lit && !unlit

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={alt} className={`h-full w-full ${className}`}>
      <defs>
        <radialGradient id={`bg-${uid}`} cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor={bg} />
        </radialGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="100%" stopColor={vessel} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`flame-${uid}`} x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="55%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#FFF7D6" />
        </linearGradient>
        <radialGradient id={`halo-${uid}`}>
          <stop offset="0%" stopColor="#FFD58A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFD58A" stopOpacity="0" />
        </radialGradient>
        <pattern id={`pearl-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="2.4" fill="#FFFFFF" />
          <circle cx="2.8" cy="2.7" r="0.8" fill="#FFFFFF" opacity="0.9" />
          <circle cx="3.5" cy="3.5" r="2.4" fill="none" stroke={vessel} strokeOpacity="0.25" strokeWidth="0.5" />
        </pattern>
      </defs>

      {bg !== 'transparent' && <rect width="200" height="200" fill={`url(#bg-${uid})`} />}
      <ellipse cx="100" cy="176" rx="62" ry="7" fill="#8B5E3C" opacity="0.12" />

      <Body shape={shape} uid={uid} vessel={vessel} wax={wax} pearls={pearls} double={double} />
      <Decor kind={decor} shape={shape} />
      <Topper kind={topper} vessel={vessel} wax={wax} />

      {showFlame && <Flames shape={shape} uid={uid} />}
    </svg>
  )
}

const flameSpots = {
  jar: [[100, 78]],
  glass: [[100, 70]],
  bowl: [[100, 108]],
  kulhad: [[100, 104]],
  tray: [[70, 118], [100, 110], [130, 118]],
  duo: [[72, 104], [128, 104]],
  pouch: [],
  heart: [[100, 68]],
  pillar: [[100, 52]],
  sachet: [],
}

function Flames({ shape, uid }) {
  return (flameSpots[shape] ?? []).map(([x, y]) => (
    <g key={`${x}-${y}`}>
      <circle className="flame-glow" cx={x} cy={y - 10} r="26" fill={`url(#halo-${uid})`} />
      <line x1={x} y1={y} x2={x} y2={y + 6} stroke="#3B2A20" strokeWidth="1.6" strokeLinecap="round" />
      <path className="flame" d={`M${x} ${y - 24} C ${x + 9} ${y - 12}, ${x + 7} ${y}, ${x} ${y + 1} C ${x - 7} ${y}, ${x - 9} ${y - 12}, ${x} ${y - 24} Z`} fill={`url(#flame-${uid})`} />
    </g>
  ))
}

function Body({ shape, uid, vessel, wax, pearls, double }) {
  const fill = pearls ? `url(#pearl-${uid})` : wax
  switch (shape) {
    case 'pouch':
      return (
        <g>
          {double && <path d="M40 70 h70 l6 100 h-82 z" fill={vessel} opacity="0.55" transform="rotate(-8 75 120)" />}
          <path d="M62 58 h76 l8 116 h-92 z" fill={vessel} />
          <path d="M62 58 h76 l1 12 h-78 z" fill="#000" opacity="0.12" />
          <rect x="74" y="98" width="52" height="40" rx="6" fill="#FFF9F5" />
          <text x="100" y="116" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="9" fill="#8B5E3C">candledust</text>
          <text x="100" y="129" textAnchor="middle" fontSize="6" fill="#6B6B6B" letterSpacing="1">PEARL WAX</text>
          <g transform="translate(142 128)">
            <rect x="0" y="0" width="34" height="46" rx="6" fill={`url(#glass-${uid})`} stroke={vessel} strokeOpacity="0.4" />
            <rect x="3" y="14" width="28" height="29" rx="4" fill={`url(#pearl-${uid})`} />
          </g>
        </g>
      )
    case 'duo':
      return (
        <g>
          {[72, 128].map((x) => (
            <g key={x}>
              <path d={`M${x - 22} 104 h44 l-4 68 h-36 z`} fill={`url(#glass-${uid})`} stroke={vessel} strokeOpacity="0.5" />
              <path d={`M${x - 20} 112 h40 l-3 58 h-34 z`} fill={fill} />
            </g>
          ))}
        </g>
      )
    case 'glass':
      return (
        <g>
          <path d="M58 72 h84 l-8 102 h-68 z" fill={`url(#glass-${uid})`} stroke={vessel} strokeOpacity="0.45" />
          <path d="M61 96 h78 l-6 76 h-66 z" fill={vessel} opacity="0.85" />
          <path d="M60 82 h80 l-1 14 h-78 z" fill={wax} />
          <rect x="64" y="80" width="6" height="86" rx="3" fill="#fff" opacity="0.35" />
        </g>
      )
    case 'bowl':
      return (
        <g>
          <path d="M36 108 h128 c0 38 -28 66 -64 66 s-64 -28 -64 -66 z" fill={vessel} />
          <ellipse cx="100" cy="108" rx="64" ry="12" fill={fill} />
          <ellipse cx="100" cy="108" rx="64" ry="12" fill="none" stroke="#000" strokeOpacity="0.06" strokeWidth="3" />
          <path d="M48 124 c8 26 24 40 44 44" stroke="#fff" strokeOpacity="0.3" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      )
    case 'kulhad':
      return (
        <g>
          <path d="M60 104 h80 l-10 70 h-60 z" fill={vessel} />
          <ellipse cx="100" cy="104" rx="40" ry="9" fill={wax} />
          <path d="M64 120 h72" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" />
        </g>
      )
    case 'tray':
      return (
        <g>
          <path d="M26 150 h148 l-10 24 h-128 z" fill={vessel} />
          <rect x="26" y="142" width="148" height="10" rx="5" fill={vessel} />
          {[70, 100, 130].map((x, i) => (
            <g key={x}>
              <rect x={x - 13} y={i === 1 ? 110 : 118} width="26" height={i === 1 ? 34 : 26} rx="8" fill={wax} />
              <ellipse cx={x} cy={i === 1 ? 111 : 119} rx="13" ry="4" fill="#fff" opacity="0.35" />
            </g>
          ))}
        </g>
      )
    case 'heart':
      return (
        <g>
          <path d="M100 172 C 40 132, 44 76, 78 76 C 92 76, 100 88, 100 96 C 100 88, 108 76, 122 76 C 156 76, 160 132, 100 172 Z" fill={vessel} />
          <path d="M100 160 C 54 128, 58 88, 80 88 C 92 88, 100 98, 100 104 C 100 98, 108 88, 120 88 C 142 88, 146 128, 100 160 Z" fill={wax} opacity="0.75" />
          <rect x="94" y="68" width="12" height="30" rx="5" fill={wax} />
        </g>
      )
    case 'pillar':
      return (
        <g>
          <path d="M84 56 c-4 30 -24 50 -24 80 c0 20 18 38 40 38 s40 -18 40 -38 c0 -30 -20 -50 -24 -80 z" fill={wax} stroke={vessel} strokeWidth="2" />
          <circle cx="100" cy="72" r="10" fill={wax} stroke={vessel} strokeWidth="2" />
          <path d="M80 120 c10 8 30 8 40 0" stroke={vessel} strokeWidth="2" fill="none" />
        </g>
      )
    case 'sachet':
      return (
        <g>
          <path d="M100 30 L80 64 M100 30 L120 64" stroke="#A47551" strokeWidth="2" />
          <rect x="56" y="62" width="88" height="108" rx="14" fill={vessel} />
          <rect x="62" y="68" width="76" height="96" rx="10" fill={wax} />
        </g>
      )
    case 'jar':
    default:
      return (
        <g>
          <rect x="54" y="68" width="92" height="106" rx="16" fill={`url(#glass-${uid})`} stroke={vessel} strokeOpacity="0.55" strokeWidth="2" />
          <rect x="58" y="86" width="84" height="84" rx="12" fill={fill} />
          <rect x="54" y="62" width="92" height="12" rx="6" fill={vessel} opacity="0.55" />
          <rect x="62" y="76" width="7" height="88" rx="3.5" fill="#fff" opacity="0.4" />
        </g>
      )
  }
}

function Decor({ kind, shape }) {
  if (kind === 'shells') {
    return (
      <g>
        <path d="M70 150 q8 -14 16 0 z" fill="#F2C9A8" />
        <path d="M118 146 l4 10 l10 1 l-8 6 l3 10 l-9 -6 l-9 6 l3 -10 l-8 -6 l10 -1 z" fill="#E7A77E" />
        <circle cx="96" cy="160" r="4" fill="#fff" stroke="#DDE7EA" />
      </g>
    )
  }
  if (kind === 'petals') {
    const base = shape === 'sachet' ? 100 : 130
    return (
      <g>
        {[[80, base], [104, base + 14], [118, base - 6], [92, base + 26]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="3.5" fill={i % 2 ? '#B9A3D1' : '#D98CA3'} transform={`rotate(${i * 40} ${x} ${y})`} />
        ))}
      </g>
    )
  }
  return null
}

function Topper({ kind, vessel, wax }) {
  switch (kind) {
    case 'ice':
      return (
        <g opacity="0.9">
          <rect x="74" y="74" width="18" height="16" rx="3" fill="#EAF6FA" transform="rotate(-12 83 82)" />
          <rect x="112" y="76" width="16" height="15" rx="3" fill="#EAF6FA" transform="rotate(14 120 83)" />
        </g>
      )
    case 'biscuit':
      return <rect x="112" y="80" width="22" height="30" rx="2" fill="#E3B872" stroke="#C48A3A" transform="rotate(18 123 95)" />
    case 'discs':
      return (
        <g>
          {[76, 100, 124].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy="106" rx="11" ry="5" fill="#FFF8E6" />
              <circle cx={x - 2} cy="105" r="1.4" fill="#8DB36B" />
            </g>
          ))}
        </g>
      )
    case 'swirls':
      return (
        <g fill="none" stroke="#E98A1F" strokeWidth="3.5" strokeLinecap="round">
          <path d="M64 104 c0 -8 14 -8 14 0 s-10 6 -10 0" />
          <path d="M122 104 c0 -8 14 -8 14 0 s-10 6 -10 0" />
        </g>
      )
    case 'nuts':
      return (
        <g>
          <path d="M48 140 q8 -12 16 -2" stroke="#D9B77E" strokeWidth="6" strokeLinecap="round" fill="none" />
          <ellipse cx="156" cy="138" rx="7" ry="4" fill="#B98A5A" />
        </g>
      )
    case 'hearts':
      return (
        <g fill="#E05774">
          <path d="M74 104 c-4 -4 -10 0 -6 5 l6 5 l6 -5 c4 -5 -2 -9 -6 -5z" />
          <path d="M128 102 c-4 -4 -10 0 -6 5 l6 5 l6 -5 c4 -5 -2 -9 -6 -5z" />
        </g>
      )
    case 'flowers':
      return (
        <g>
          {[[78, 88, '#E9A3B8'], [122, 86, '#F3C6D1'], [100, 94, '#D98CA3']].map(([x, y, c]) => (
            <g key={x}>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx={x} cy={y - 6} rx="4" ry="7" fill={c} transform={`rotate(${a} ${x} ${y})`} />
              ))}
              <circle cx={x} cy={y} r="3" fill="#C9A227" />
            </g>
          ))}
        </g>
      )
    case 'lotus':
      return (
        <g>
          {[-30, -12, 12, 30].map((a) => (
            <ellipse key={a} cx="100" cy="112" rx="6" ry="14" fill="#F6B6C8" transform={`rotate(${a} 100 124)`} />
          ))}
          <ellipse cx="66" cy="112" rx="12" ry="4" fill="#6FA487" />
        </g>
      )
    case 'foam':
      return <path d="M60 82 q10 -10 20 0 q10 -10 20 0 q10 -10 20 0 q10 -10 20 0" fill={wax} stroke={vessel} strokeOpacity="0.3" />
    case 'cactus':
      return (
        <g fill="#7FA36F">
          <rect x="52" y="96" width="8" height="22" rx="4" />
          <rect x="140" y="98" width="8" height="20" rx="4" />
        </g>
      )
    default:
      return null
  }
}

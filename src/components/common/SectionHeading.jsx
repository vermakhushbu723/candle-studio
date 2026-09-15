import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'
  return (
    <Reveal className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-ash md:text-lg">{subtitle}</p>}
    </Reveal>
  )
}

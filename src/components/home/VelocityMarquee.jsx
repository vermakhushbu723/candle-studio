import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/** Giant editorial text that speeds up and reverses with scroll velocity. */
export default function VelocityMarquee({ words, baseVelocity = -2, className = '' }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000)
    if (factor.get() < 0) direction.current = -1
    else if (factor.get() > 0) direction.current = 1
    move += direction.current * move * factor.get()
    baseX.set(baseX.get() + move)
  })

  const row = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {words.map((w, i) => (
        <span key={w} className="flex items-center gap-8">
          <span className={i % 2 ? 'text-outline' : 'text-charcoal'}>{w}</span>
          <span className="text-gradient-flame text-[0.6em]">✦</span>
        </span>
      ))}
    </span>
  )

  return (
    <div className={`overflow-hidden py-6 md:py-10 ${className}`}>
      <motion.div style={{ x }} className="flex whitespace-nowrap font-serif text-5xl italic leading-none tracking-tight md:text-8xl">
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  )
}

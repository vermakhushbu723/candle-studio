import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export default function AnimatedCounter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: setDisplay })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref}>
      {display.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

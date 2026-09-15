import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

/** Pulls its child towards the pointer while hovered. */
export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={reset} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}

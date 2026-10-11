import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const KEY = 'cd-intro-seen'
const seen = () => {
  try {
    // `?intro=0` skips the intro (handy for screenshots and testing)
    if (new URLSearchParams(window.location.search).get('intro') === '0') return true
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/** One-time-per-session intro: a candle lights, the brand writes in, the curtain lifts. */
export default function IntroLoader() {
  const [show, setShow] = useState(() => !seen())

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => {
      setShow(false)
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* ignore */
      }
    }, 2200)
    return () => clearTimeout(t)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] grid place-items-center bg-charcoal text-cream"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="absolute inset-0 rounded-full bg-caramel/40 blur-3xl"
              />
              <motion.img
                src="/logo-light.png"
                alt="Jyotessa"
                initial={{ y: 24, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-64 w-64 md:h-80 md:w-80"
              />
            </div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 1.4, ease: 'easeInOut' }} className="mt-6 h-px w-40 origin-left bg-caramel" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

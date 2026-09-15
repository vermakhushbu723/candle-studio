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

  const letters = 'candledust'.split('')

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
            <div className="relative h-28 w-20">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-6 rounded-full bg-caramel/40 blur-2xl"
              />
              <motion.svg viewBox="0 0 20 30" className="absolute left-1/2 top-1 h-12 w-8 -translate-x-1/2" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} style={{ originY: 1 }}>
                <path className="flame" d="M10 0 C 17 11, 16 24, 10 28 C 4 24, 3 11, 10 0 Z" fill="#F59E0B" />
              </motion.svg>
              <div className="absolute bottom-0 left-1/2 h-14 w-14 -translate-x-1/2 rounded-xl bg-linen" />
            </div>
            <p className="mt-6 flex font-serif text-4xl tracking-tight md:text-5xl">
              {letters.map((l, i) => (
                <motion.span key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 + i * 0.05, duration: 0.5 }} className={i >= 6 ? 'italic text-caramel' : ''}>
                  {l}
                </motion.span>
              ))}
            </p>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 1.4, ease: 'easeInOut' }} className="mt-6 h-px w-40 origin-left bg-caramel" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

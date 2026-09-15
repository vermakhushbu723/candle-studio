import { useState } from 'react'
import { Button } from 'antd'
import { CheckCircleFilled, CloseCircleFilled, ReloadOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import { comparison } from '@/data/content'
import { siteImages } from '@/data/site'

/** Interactive knock-over demo: pearled candle extinguishes, traditional spills. */
export default function SafetyTest() {
  const [knocked, setKnocked] = useState(false)

  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading eyebrow="The safety test" title={<>Traditional Candles <span className="italic text-ash">vs.</span> Pearled</>} subtitle="Tip one over yourself. Knock both candles off the table and watch what each one does next." />

        <div className="mt-8 flex justify-center">
          <Button type="primary" size="large" shape="round" icon={knocked ? <ReloadOutlined /> : <ThunderboltOutlined />} onClick={() => setKnocked((k) => !k)}>
            {knocked ? 'Reset the test' : 'Knock them over'}
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <DemoCard kind="traditional" knocked={knocked} />
          <DemoCard kind="pearled" knocked={knocked} />
        </div>
      </div>
    </section>
  )
}

function DemoCard({ kind, knocked }) {
  const isPearled = kind === 'pearled'
  const data = comparison[kind]
  const flameOn = !knocked || !isPearled

  return (
    <div className={`overflow-hidden rounded-4xl border p-6 md:p-8 ${isPearled ? 'border-terracotta/30 bg-white' : 'border-linen bg-shell'}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl">{data.caption}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${isPearled ? 'bg-terracotta text-white' : 'bg-linen text-cocoa'}`}>
          {isPearled ? 'candledust' : 'Jar / pillar'}
        </span>
      </div>

      <div className="mt-6 aspect-[3/2] overflow-hidden rounded-3xl">
        <img src={isPearled ? siteImages.proofPearled : siteImages.proofTraditional} alt={`${data.caption} knocked onto a wooden table`} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
      </div>

      <div className="relative mt-4 h-56 overflow-hidden rounded-3xl bg-linear-to-b from-cream to-[#EADBC8]">
        <div className="absolute inset-x-0 bottom-0 h-10 bg-[#C9A27E]" />
        <AnimatePresence>
          {knocked && !isPearled && (
            <motion.div key="spill" initial={{ width: 0, opacity: 0 }} animate={{ width: '70%', opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, delay: 0.5 }} className="absolute bottom-8 left-[42%] h-3 rounded-full bg-linear-to-r from-[#F5D9A8] to-[#E8B784]" />
          )}
          {knocked && isPearled &&
            Array.from({ length: 14 }).map((_, i) => (
              <motion.span key={i} initial={{ x: 0, y: 0, opacity: 0 }} animate={{ x: 30 + i * 9, y: 18 - (i % 3) * 3, opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.45 + i * 0.02, duration: 0.5 }} className="absolute bottom-10 left-[52%] h-2 w-2 rounded-full bg-white shadow" />
            ))}
        </AnimatePresence>

        <motion.div className="absolute bottom-10 left-1/2 origin-bottom-right" initial={false} animate={{ rotate: knocked ? 88 : 0, x: '-50%' }} transition={{ type: 'spring', stiffness: 90, damping: 12 }}>
          <svg viewBox="0 0 80 110" className="h-36 w-28">
            <AnimatePresence>
              {flameOn && (
                <motion.g key="flame" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.2, transition: { delay: 0.45, duration: 0.2 } }}>
                  <circle className="flame-glow" cx="40" cy="14" r="16" fill="#FFD58A" opacity="0.5" />
                  <path className="flame" d="M40 0 C 47 10, 46 20, 40 22 C 34 20, 33 10, 40 0 Z" fill="#F59E0B" />
                </motion.g>
              )}
            </AnimatePresence>
            <line x1="40" y1="22" x2="40" y2="30" stroke="#3B2A20" strokeWidth="2" />
            <rect x="12" y="30" width="56" height="78" rx="10" fill={isPearled ? '#FFFFFF' : '#FBF6EC'} stroke="#D4A373" strokeWidth="2" />
            {isPearled && Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={18 + (i % 8) * 6.5} cy={40 + Math.floor(i / 8) * 13} r="2.6" fill="#F6EDE4" />)}
          </svg>
        </motion.div>

        <AnimatePresence>
          {knocked && (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 1 }} className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${isPearled ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {isPearled ? 'Extinguished in 0.5s ✓' : 'Still burning · wax spilled ✕'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <ul className="mt-6 space-y-2.5">
        {data.points.map((point) => (
          <li key={point} className="flex items-center gap-3 text-sm">
            {isPearled ? <CheckCircleFilled className="text-emerald-600" /> : <CloseCircleFilled className="text-red-400" />}
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

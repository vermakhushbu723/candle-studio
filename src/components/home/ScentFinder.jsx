import { useMemo, useState } from 'react'
import { Button, Progress } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import ProductCard from '@/components/common/ProductCard'
import { scentQuiz } from '@/data/content'
import { products } from '@/data/products'

const inBudget = (price, budget) => (budget === 'budget' ? price < 500 : budget === 'mid' ? price >= 500 && price <= 1000 : price > 700)

/** Three-question quiz that recommends candles from both lines. */
export default function ScentFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const done = step >= scentQuiz.length

  const results = useMemo(() => {
    if (!done) return []
    return products
      .map((p) => ({
        p,
        score: (p.moods.includes(answers.for) ? 2 : 0) + (p.moods.includes(answers.mood) ? 2 : 0) + (inBudget(p.price, answers.budget) ? 3 : 0),
      }))
      .sort((a, b) => b.score - a.score || b.p.rating - a.p.rating)
      .slice(0, 3)
      .map((r) => r.p)
  }, [done, answers])

  const choose = (qid, value) => {
    setAnswers((a) => ({ ...a, [qid]: value }))
    setStep((s) => s + 1)
  }
  const reset = () => {
    setAnswers({})
    setStep(0)
  }

  return (
    <section id="scent-finder" className="scroll-mt-24 py-20 md:py-28">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-4xl bg-charcoal p-6 text-cream md:p-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-terracotta/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-rose/25 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-caramel">Scent Finder</p>
              <h2 className="mt-3 font-serif text-3xl md:text-5xl">Not sure which candle? Let us match you.</h2>
              <p className="mt-4 text-cream/70">Three quick questions. We’ll pick from both pearled and handcrafted ranges.</p>
              <Progress className="mt-8" percent={Math.round((Math.min(step, scentQuiz.length) / scentQuiz.length) * 100)} strokeColor="#D4A373" railColor="rgba(255,255,255,0.12)" format={(p) => <span className="text-cream/70">{p}%</span>} />
              {step > 0 && (
                <Button ghost shape="round" icon={<ReloadOutlined />} onClick={reset} className="mt-4">Start over</Button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                  <p className="text-sm text-cream/60">Question {step + 1} of {scentQuiz.length}</p>
                  <h3 className="mt-2 font-serif text-2xl md:text-3xl">{scentQuiz[step].question}</h3>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {scentQuiz[step].options.map((o) => (
                      <motion.button
                        key={o.value}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => choose(scentQuiz[step].id, o.value)}
                        className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 text-left transition hover:border-caramel hover:bg-white/10"
                      >
                        <span className="text-3xl">{o.emoji}</span>
                        <span className="font-medium">{o.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-charcoal">
                  <h3 className="font-serif text-2xl text-cream">Your perfect matches ✨</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {results.map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

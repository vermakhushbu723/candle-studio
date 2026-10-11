import { useCallback, useEffect, useState } from 'react'
import { App, Button } from 'antd'
import { BellFilled, CloseOutlined, GiftOutlined, CarOutlined, FireOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { enablePush, pushStatus } from '@/utils/push'
import { useSession } from '@/utils/session'

// Soft prompt before the browser's own permission dialog (which can only be shown once per site).
const FIRST_DELAY_MS = 15 * 1000 // after the customer has looked around a little
const REPEAT_AFTER_MS = 10 * 60 * 1000 // "Not now" → ask again 10 minutes later
const MAX_PER_DAY = 4 // never nag more than this in a day
const BLOCKED_REPEAT_MS = 24 * 60 * 60 * 1000 // blocked in browser settings → remind once a day
const KEY = 'jy-push-prompt' // { lastShown, day, countToday }

const today = () => new Date().toISOString().slice(0, 10)
const readState = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {}
  } catch {
    return {}
  }
}
const writeState = (s) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* storage unavailable */
  }
}

/** Fired by the navbar bell to open the prompt right away. */
export const OPEN_PUSH_PROMPT = 'jy-open-push-prompt'

/** Hook for the navbar bell: true while a logged-in customer hasn't decided on notifications yet. */
export function usePushPending() {
  const session = useSession()
  const [status, setStatus] = useState(null)
  useEffect(() => {
    let alive = true
    const check = () => pushStatus().then((s) => alive && setStatus(s))
    check()
    const t = setInterval(check, 5000) // permission can change from the browser's own UI
    return () => {
      alive = false
      clearInterval(t)
    }
  }, [session?.token])
  return Boolean(session) && (status === 'default' || status === 'denied') ? status : null
}

export default function PushPrompt() {
  const { message } = App.useApp()
  const session = useSession()
  const [status, setStatus] = useState(null) // default | denied | granted | unsupported
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    pushStatus().then(setStatus)
  }, [session?.token])

  const show = useCallback(() => {
    const s = readState()
    const day = today()
    const countToday = s.day === day ? (s.countToday ?? 0) : 0
    writeState({ lastShown: Date.now(), day, countToday: countToday + 1 })
    setOpen(true)
  }, [])

  // Schedule: first time after 15s, then 10 min after each "Not now" (blocked: once a day), max 4/day
  useEffect(() => {
    if (open || !session || (status !== 'default' && status !== 'denied')) return
    const s = readState()
    const shownToday = s.day === today() ? (s.countToday ?? 0) : 0
    if (shownToday >= MAX_PER_DAY) return
    const gap = status === 'denied' ? BLOCKED_REPEAT_MS : REPEAT_AFTER_MS
    const wait = s.lastShown ? Math.max(FIRST_DELAY_MS, s.lastShown + gap - Date.now()) : FIRST_DELAY_MS
    const t = setTimeout(show, wait)
    return () => clearTimeout(t)
  }, [session, status, open, show])

  // Navbar bell → open now
  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_PUSH_PROMPT, onOpen)
    return () => window.removeEventListener(OPEN_PUSH_PROMPT, onOpen)
  }, [])

  const allow = async () => {
    setBusy(true)
    try {
      await enablePush()
      setStatus('granted')
      setOpen(false)
      message.success('Notifications are on — we’ll keep you posted ✨')
    } catch (e) {
      setStatus(await pushStatus())
      message.error(e.message)
    } finally {
      setBusy(false)
    }
  }

  const notNow = () => {
    writeState({ ...readState(), lastShown: Date.now() }) // restart the 10-minute timer from now
    setOpen(false)
  }

  if (!session) return null
  const blocked = status === 'denied'

  return (
    <AnimatePresence>
      {open && (status === 'default' || blocked) && (
        <motion.div
          key="push-prompt"
          role="dialog"
          aria-label="Turn on notifications"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed inset-x-3 bottom-3 z-[95] mx-auto max-w-sm overflow-hidden rounded-3xl border border-linen bg-cream shadow-[0_30px_80px_-20px_rgba(58,21,7,0.45)] sm:inset-x-auto sm:bottom-6 sm:left-6"
        >
          <div className="relative bg-linear-to-br from-charcoal to-terracotta px-5 pb-4 pt-5 text-cream">
            <button type="button" onClick={notNow} aria-label="Close" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-cream/70 hover:bg-white/10 hover:text-cream">
              <CloseOutlined />
            </button>
            <div className="flex items-center gap-3 pr-8">
              <motion.span
                animate={{ rotate: [0, -16, 14, -10, 8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.6 }}
                className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15 text-2xl text-caramel"
              >
                <BellFilled />
                <span className="absolute right-1 top-1 h-2.5 w-2.5 animate-ping rounded-full bg-caramel" />
              </motion.span>
              <div>
                <p className="font-serif text-xl leading-tight">{blocked ? 'Notifications are blocked' : `Don’t miss a thing, ${session.name?.split(' ')[0] ?? 'there'}!`}</p>
                <p className="text-xs text-cream/75">{blocked ? 'You won’t hear when your order ships' : 'Turn on Jyotessa notifications'}</p>
              </div>
            </div>
          </div>

          <div className="px-5 py-4">
            {blocked ? (
              <ol className="m-0 list-decimal space-y-1 pl-4 text-sm text-ash">
                <li>Tap the 🔒 (or ⓘ) next to <b>jyotessa.com</b> in the address bar</li>
                <li>Open <b>Permissions / Site settings → Notifications</b></li>
                <li>Choose <b>Allow</b>, then refresh this page</li>
              </ol>
            ) : (
              <ul className="m-0 list-none space-y-2 p-0 text-sm text-charcoal">
                <li className="flex items-center gap-2.5"><CarOutlined className="text-terracotta" /> Know the moment your order ships & arrives</li>
                <li className="flex items-center gap-2.5"><FireOutlined className="text-terracotta" /> First look at new & festive collections</li>
                <li className="flex items-center gap-2.5"><GiftOutlined className="text-terracotta" /> Exclusive coupon codes & offers</li>
              </ul>
            )}
            <div className="mt-4 flex gap-2">
              {!blocked && (
                <Button type="primary" size="large" block loading={busy} onClick={allow} icon={<BellFilled />}>
                  Allow notifications
                </Button>
              )}
              <Button size="large" block={blocked} onClick={notNow}>{blocked ? 'Got it' : 'Not now'}</Button>
            </div>
            {!blocked && <p className="mt-2 text-center text-[11px] text-ash">You can turn them off anytime from your account.</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

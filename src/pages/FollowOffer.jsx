import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { App, Button, Result, Skeleton } from 'antd'
import {
  CheckCircleFilled, CopyOutlined, FacebookFilled, GiftOutlined, GoogleOutlined, InstagramOutlined,
  LinkOutlined, LockOutlined, ShoppingOutlined, YoutubeFilled,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import PageHeader from '@/components/common/PageHeader'
import { siteImages } from '@/data/site'
import { api } from '@/api/client'
import { useCart } from '@/context/CartContext'
import { useSession } from '@/utils/session'
import { getDeviceId, getFingerprint } from '@/utils/device'
import { readStorage, writeStorage } from '@/utils/format'
import { track } from '@/utils/analytics'

const VISITED_KEY = 'jy-follow-visited'
const icons = { instagram: InstagramOutlined, facebook: FacebookFilled, google: GoogleOutlined, youtube: YoutubeFilled }
const colors = { instagram: 'bg-linear-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]', facebook: 'bg-[#1877F2]', google: 'bg-white ring-1 ring-linen', youtube: 'bg-[#FF0000]' }
const actionLabel = (l) => (l.key === 'google' ? 'Follow & review on Google' : `Follow on ${l.label}`)
const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

/** Follow & Save — opened from the QR code in the footer. Follow our pages → personal one-time coupon. */
export default function FollowOffer() {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const session = useSession()
  const { applyCoupon } = useCart()
  const [data, setData] = useState(null) // { offer, claimed, coupon }
  const [deviceUsed, setDeviceUsed] = useState(false)
  const [visited, setVisited] = useState(() => readStorage(VISITED_KEY, []))
  const [claiming, setClaiming] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api('/offers/follow').then(setData).catch((e) => setError(e.message))
    api('/offers/follow/device', { method: 'POST', body: { deviceId: getDeviceId() } })
      .then((r) => setDeviceUsed(r.deviceUsed))
      .catch(() => undefined)
  }, [session?.token])

  const links = useMemo(() => data?.offer.links ?? [], [data])
  const allVisited = links.length > 0 && links.every((l) => visited.includes(l.key))
  const percent = data?.offer.percent ?? 10

  const openLink = (l) => {
    window.open(l.url, '_blank', 'noopener,noreferrer')
    const next = [...new Set([...visited, l.key])]
    setVisited(next)
    writeStorage(VISITED_KEY, next)
  }

  const claim = async () => {
    setClaiming(true)
    try {
      const r = await api('/offers/follow/claim', {
        method: 'POST',
        body: { deviceId: getDeviceId(), fingerprint: await getFingerprint(), visited },
      })
      setData((d) => ({ ...d, claimed: true, coupon: r.coupon }))
      track.followOfferClaimed()
      message.success(r.message)
    } catch (e) {
      if (e.status === 401) return navigate('/login?next=/follow')
      message.error(e.message)
      if (e.status === 409) {
        setDeviceUsed(true)
        api('/offers/follow').then(setData).catch(() => undefined)
      }
    } finally {
      setClaiming(false)
    }
  }

  const copy = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      message.success('Coupon code copied')
    } catch {
      message.info(code)
    }
  }

  const useNow = async (code) => {
    await applyCoupon(code)
    navigate('/shop')
  }

  return (
    <>
      <PageHeader
        image={siteImages.livingRoom}
        eyebrow="Follow & Save"
        title={`Follow us, get ${percent}% off`}
        subtitle={`Follow Jyotessa on our social pages and unlock a personal ${percent}% off coupon for your next order.`}
        crumbs={[{ label: 'Follow & Save' }]}
      />

      <section className="wrap max-w-3xl! py-10">
        {error ? (
          <Result status="warning" title="Couldn’t load the offer" subTitle={error} extra={<Button onClick={() => window.location.reload()}>Try again</Button>} />
        ) : !data ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : data.coupon ? (
          <CouponCard coupon={data.coupon} onCopy={copy} onUse={useNow} />
        ) : !data.offer.enabled ? (
          <Result status="info" title="This offer has ended" subTitle="Follow our pages anyway — that’s where we announce new launches and offers first." />
        ) : session && deviceUsed ? (
          <Result
            status="warning"
            title="Already claimed on this phone"
            subTitle="The Follow & Save coupon can be claimed once per device. If this was you on another account, log in with that account to see your code."
            extra={<Link to="/shop"><Button type="primary">Shop candles</Button></Link>}
          />
        ) : (
          <div className="space-y-5">
            {/* Step 1 — log in */}
            <Step n={1} done={Boolean(session)} title="Log in or sign up" text="Your coupon is personal — it’s saved to your account.">
              {!session && (
                <Button type="primary" icon={<LockOutlined />} onClick={() => navigate('/login?next=/follow')}>Log in to continue</Button>
              )}
              {session && <p className="text-sm text-emerald-700">Logged in as {session.name}</p>}
            </Step>

            {/* Step 2 — follow every page */}
            <Step n={2} done={allVisited} title="Follow us on every page" text="Tap each button, follow (and leave a review on Google), then come back here.">
              <div className="grid gap-3 sm:grid-cols-2">
                {links.map((l) => {
                  const Icon = icons[l.key] ?? LinkOutlined
                  const done = visited.includes(l.key)
                  return (
                    <button
                      key={l.key}
                      type="button"
                      onClick={() => openLink(l)}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 text-left transition ${done ? 'border-emerald-300 bg-emerald-50' : 'border-linen bg-white hover:border-terracotta'}`}
                    >
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-xl ${colors[l.key] ?? 'bg-sand'} ${l.key === 'google' ? 'text-[#4285F4]' : 'text-white'}`}>
                        <Icon />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{actionLabel(l)}</span>
                        <span className="block text-xs text-ash">{done ? 'Done — thank you!' : 'Opens in a new tab'}</span>
                      </span>
                      {done && <CheckCircleFilled className="text-xl text-emerald-600" />}
                    </button>
                  )
                })}
              </div>
            </Step>

            {/* Step 3 — claim */}
            <Step n={3} done={false} title={`Claim your ${percent}% coupon`} text="Use it at checkout on any order.">
              <Button
                type="primary"
                size="large"
                icon={<GiftOutlined />}
                disabled={!session || !allVisited}
                loading={claiming}
                onClick={claim}
              >
                Get my {percent}% coupon
              </Button>
              {!allVisited && <p className="mt-2 text-xs text-ash">Follow all {links.length} pages above to unlock the coupon.</p>}
            </Step>

            <Terms offer={data.offer} />
          </div>
        )}
      </section>
    </>
  )
}

function Step({ n, done, title, text, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: n * 0.08 }} className="rounded-3xl border border-linen bg-white p-5">
      <div className="flex items-start gap-4">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-bold ${done ? 'bg-emerald-600 text-white' : 'bg-terracotta text-white'}`}>
          {done ? <CheckCircleFilled /> : n}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-xl">{title}</h2>
          <p className="mt-1 text-sm text-ash">{text}</p>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </motion.div>
  )
}

function CouponCard({ coupon, onCopy, onUse }) {
  const expired = new Date(coupon.expiry) < new Date()
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="overflow-hidden rounded-4xl bg-charcoal p-6 text-center text-cream md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-caramel">Thank you for following Jyotessa</p>
      <h2 className="mt-3 font-serif text-3xl md:text-4xl">Your {coupon.percent}% off coupon</h2>
      <div className="mx-auto mt-6 flex max-w-sm items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-caramel/70 bg-white/5 px-5 py-4">
        <span className="font-mono text-2xl font-bold tracking-[0.2em] text-caramel">{coupon.code}</span>
        <Button ghost icon={<CopyOutlined />} onClick={() => onCopy(coupon.code)}>Copy</Button>
      </div>
      <p className="mt-4 text-sm text-cream/70">
        {coupon.used
          ? 'This coupon has already been used. Thank you for shopping with us!'
          : expired
            ? `This coupon expired on ${formatDate(coupon.expiry)}.`
            : `Valid till ${formatDate(coupon.expiry)} · one-time use · only on your account`}
      </p>
      {!coupon.used && !expired && (
        <Button type="primary" size="large" icon={<ShoppingOutlined />} className="mt-6" onClick={() => onUse(coupon.code)}>
          Apply & shop now
        </Button>
      )}
    </motion.div>
  )
}

function Terms({ offer }) {
  const rules = [
    `${offer.percent}% off your order subtotal${offer.maxDiscount ? ` (up to ₹${offer.maxDiscount.toLocaleString('en-IN')})` : ''}.`,
    'One coupon per customer account and one per phone/device.',
    'The coupon is personal — it works only when you are logged in to the account that claimed it.',
    'Single use: it is used up once an order with it is placed (online payments: once the payment succeeds).',
    `Valid for ${offer.validDays} days after you claim it. Only one coupon can be used per order.`,
    'Unfollowing or misuse (multiple accounts, fake numbers) may cancel the coupon or the order.',
  ]
  return (
    <div className="rounded-3xl bg-shell p-5">
      <p className="eyebrow">Offer conditions</p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ash marker:text-terracotta">
        {rules.map((r) => <li key={r}>{r}</li>)}
      </ul>
    </div>
  )
}

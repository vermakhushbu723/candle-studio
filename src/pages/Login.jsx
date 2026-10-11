import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { App, Button } from 'antd'
import {
  CarOutlined, HeartOutlined, LogoutOutlined, MailOutlined, ShoppingOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { siteImages } from '@/data/site'
import PhoneOtpLogin from '@/components/auth/PhoneOtpLogin'
import NotificationSettings from '@/components/account/NotificationSettings'
import { disablePushForThisDevice, refreshPushToken } from '@/utils/push'
import { api, SESSION_KEY } from '@/api/client'
import { formatPrice, readStorage, writeStorage } from '@/utils/format'

const perks = [
  { icon: CarOutlined, text: 'Track every order in one place' },
  { icon: HeartOutlined, text: 'Save candles to your wishlist' },
  { icon: ShoppingOutlined, text: 'Faster checkout with saved details' },
]

export default function Login() {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  // Sessions saved by the old offline demo have no token, so they don't count
  const [session, setSession] = useState(() => (readStorage(SESSION_KEY, null)?.token ? readStorage(SESSION_KEY, null) : null))
  const [orders, setOrders] = useState(null)

  // Refresh the profile + order history whenever a session exists (also drops expired/blocked sessions)
  useEffect(() => {
    if (!session?.token) return
    Promise.all([api('/auth/me'), api('/orders/mine')])
      .then(([me, mine]) => {
        const next = { ...me.user, token: session.token }
        writeStorage(SESSION_KEY, next)
        setOrders(mine.orders)
      })
      .catch((e) => {
        if (e.status === 401) {
          writeStorage(SESSION_KEY, null)
          setSession(null)
        }
      })
  }, [session?.token])

  const signedIn = ({ token, user }) => {
    const next = { ...user, token }
    writeStorage(SESSION_KEY, next)
    setSession(next)
    refreshPushToken() // link this browser's notifications to the new session
    message.success(`Welcome to Jyotessa, ${user.name.split(' ')[0]}!`)
    if (params.get('next')) navigate(params.get('next'))
  }

  const logout = async () => {
    await disablePushForThisDevice() // stop this browser getting the account's notifications
    writeStorage(SESSION_KEY, null)
    setSession(null)
    setOrders(null)
    message.success('You have been logged out.')
  }

  return (
    <section className="wrap grid gap-6 py-8 md:py-10 lg:grid-cols-2 lg:items-stretch">
      {/* Brand panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative hidden overflow-hidden rounded-4xl lg:block"
      >
        <img src={siteImages.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/40 to-charcoal/10" />
        <div className="relative flex h-full flex-col justify-end p-6 text-cream">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-caramel">Your Jyotessa account</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight">Every glow, in one place.</h2>
          <ul className="mt-6 space-y-3">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-cream/85">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-caramel"><Icon /></span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Form panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="rounded-4xl border border-linen bg-white p-5 sm:p-6"
      >
        {session ? (
          <div>
            <p className="eyebrow">My account</p>
            <h1 className="mt-3 font-serif text-4xl">Hello, {session.name.split(' ')[0]}</h1>
            <p className="mt-2 text-ash">You are signed in as {session.phone ? `+91 ${session.phone}` : session.email}.</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { to: '/track-order', icon: CarOutlined, label: 'Track an order' },
                { to: '/wishlist', icon: HeartOutlined, label: 'My wishlist' },
                { to: '/shop', icon: ShoppingOutlined, label: 'Continue shopping' },
                { to: '/contact', icon: MailOutlined, label: 'Contact support' },
              ].map(({ to, icon: Icon, label }) => (
                <Link key={to} to={to} className="flex items-center gap-3 rounded-2xl border border-linen p-4 transition hover:border-terracotta hover:text-terracotta">
                  <Icon className="text-lg text-terracotta" /> {label}
                </Link>
              ))}
            </div>

            <NotificationSettings />

            {orders?.length > 0 && (
              <div className="mt-5">
                <p className="eyebrow">My orders</p>
                <ul className="mt-3 divide-y divide-linen rounded-2xl border border-linen">
                  {orders.slice(0, 5).map((o) => (
                    <li key={o.id}>
                      <Link to={`/track-order?order=${o.id}&contact=${encodeURIComponent(o.customer.email)}`} className="flex items-center justify-between gap-3 p-4 text-sm transition hover:bg-shell">
                        <span>
                          <span className="font-semibold">#{o.id}</span>
                          <span className="block text-xs text-ash">{new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {o.items.length} item(s)</span>
                        </span>
                        <span className="text-right">
                          <span className="block font-semibold">{formatPrice(o.total)}</span>
                          <span className={`text-xs ${o.status === 'Cancelled' ? 'text-red-600' : 'text-terracotta'}`}>{o.status}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button className="mt-5" size="large" icon={<LogoutOutlined />} onClick={logout}>Log out</Button>
          </div>
        ) : (
          <>
            <h1 className="font-serif text-4xl">Log in or sign up</h1>
            <p className="mt-2 text-ash">Use your mobile number — no password needed. New here? We’ll create your account.</p>
            <PhoneOtpLogin onSignedIn={signedIn} />

            <p className="mt-6 text-center text-sm text-ash">
              Only want to check a parcel? <Link to="/track-order" className="font-semibold text-terracotta">Track your order</Link> without logging in.
            </p>
          </>
        )}
      </motion.div>
    </section>
  )
}

import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { App, Button, Checkbox, Form, Input, Segmented } from 'antd'
import {
  CarOutlined, HeartOutlined, LockOutlined, LogoutOutlined, MailOutlined,
  PhoneOutlined, ShoppingOutlined, UserOutlined,
} from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { site, siteImages } from '@/data/site'
import { readStorage, writeStorage } from '@/utils/format'

// Demo auth stored in localStorage — swap these two calls for your auth API.
const ACCOUNTS_KEY = 'cd-accounts'
const SESSION_KEY = 'cd-session'

const perks = [
  { icon: CarOutlined, text: 'Track every order in one place' },
  { icon: HeartOutlined, text: 'Save candles to your wishlist' },
  { icon: ShoppingOutlined, text: 'Faster checkout with saved details' },
]

export default function Login() {
  const { message } = App.useApp()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [mode, setMode] = useState(params.get('mode') === 'signup' ? 'signup' : 'login')
  const [session, setSession] = useState(() => readStorage(SESSION_KEY, null))
  const [loading, setLoading] = useState(false)

  const finish = (values) => {
    setLoading(true)
    setTimeout(() => {
      const accounts = readStorage(ACCOUNTS_KEY, [])
      const email = values.email.trim().toLowerCase()

      if (mode === 'signup') {
        if (accounts.some((a) => a.email === email)) {
          setLoading(false)
          return message.error('An account with this email already exists. Log in instead.')
        }
        const user = { name: values.name.trim(), email, phone: values.phone }
        writeStorage(ACCOUNTS_KEY, [...accounts, { ...user, password: values.password }])
        writeStorage(SESSION_KEY, user)
        setSession(user)
        message.success(`Welcome to candledust, ${user.name.split(' ')[0]}!`)
      } else {
        const match = accounts.find((a) => a.email === email && a.password === values.password)
        if (!match) {
          setLoading(false)
          return message.error('Email or password is incorrect.')
        }
        const user = { name: match.name, email: match.email, phone: match.phone }
        writeStorage(SESSION_KEY, user)
        setSession(user)
        message.success(`Welcome back, ${user.name.split(' ')[0]}!`)
      }
      setLoading(false)
      const next = params.get('next')
      if (next) navigate(next)
    }, 600)
  }

  const logout = () => {
    writeStorage(SESSION_KEY, null)
    setSession(null)
    message.success('You have been logged out.')
  }

  return (
    <section className="wrap grid gap-10 py-12 md:py-16 lg:grid-cols-2 lg:items-stretch">
      {/* Brand panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative hidden overflow-hidden rounded-4xl lg:block"
      >
        <img src={siteImages.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/40 to-charcoal/10" />
        <div className="relative flex h-full flex-col justify-end p-10 text-cream">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-caramel">Your candledust account</p>
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
        className="rounded-4xl border border-linen bg-white p-6 sm:p-10"
      >
        {session ? (
          <div>
            <p className="eyebrow">My account</p>
            <h1 className="mt-3 font-serif text-4xl">Hello, {session.name.split(' ')[0]}</h1>
            <p className="mt-2 text-ash">You are signed in as {session.email}.</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
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

            <Button className="mt-8" size="large" icon={<LogoutOutlined />} onClick={logout}>Log out</Button>
          </div>
        ) : (
          <>
            <h1 className="font-serif text-4xl">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
            <p className="mt-2 text-ash">
              {mode === 'login' ? 'Log in to track orders and see your wishlist.' : 'It takes less than a minute.'}
            </p>

            <Segmented
              block
              size="large"
              className="mt-6"
              value={mode}
              onChange={setMode}
              options={[{ label: 'Log in', value: 'login' }, { label: 'Sign up', value: 'signup' }]}
            />

            <AnimatePresence mode="wait">
              <motion.div key={mode} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                <Form layout="vertical" requiredMark={false} className="mt-6" onFinish={finish}>
                  {mode === 'signup' && (
                    <>
                      <Form.Item name="name" label="Full name" rules={[{ required: true, message: 'Please enter your name' }]}>
                        <Input size="large" prefix={<UserOutlined className="text-ash" />} autoComplete="name" />
                      </Form.Item>
                      <Form.Item name="phone" label="Mobile number" rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: 'Enter a 10-digit mobile number' }]}>
                        <Input size="large" addonBefore="+91" prefix={<PhoneOutlined className="text-ash" />} autoComplete="tel-national" />
                      </Form.Item>
                    </>
                  )}
                  <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                    <Input size="large" prefix={<MailOutlined className="text-ash" />} autoComplete="email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, min: mode === 'signup' ? 6 : 1, message: mode === 'signup' ? 'Use at least 6 characters' : 'Please enter your password' }]}
                  >
                    <Input.Password size="large" prefix={<LockOutlined className="text-ash" />} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
                  </Form.Item>
                  {mode === 'signup' && (
                    <Form.Item
                      name="confirm"
                      label="Confirm password"
                      dependencies={['password']}
                      rules={[
                        { required: true, message: 'Please confirm your password' },
                        ({ getFieldValue }) => ({
                          validator: (_, v) => (!v || getFieldValue('password') === v ? Promise.resolve() : Promise.reject(new Error('Passwords do not match'))),
                        }),
                      ]}
                    >
                      <Input.Password size="large" prefix={<LockOutlined className="text-ash" />} autoComplete="new-password" />
                    </Form.Item>
                  )}

                  {mode === 'login' ? (
                    <div className="mb-5 flex items-center justify-between text-sm">
                      <Checkbox defaultChecked>Keep me logged in</Checkbox>
                      <a href={`mailto:${site.supportEmail}?subject=${encodeURIComponent('Password reset')}`} className="font-medium text-terracotta">
                        Forgot password?
                      </a>
                    </div>
                  ) : (
                    <Form.Item
                      name="agree"
                      valuePropName="checked"
                      rules={[{ validator: (_, v) => (v ? Promise.resolve() : Promise.reject(new Error('Please accept to continue'))) }]}
                    >
                      <Checkbox>
                        I agree to the <Link to="/policies/terms" className="text-terracotta">Terms</Link> and{' '}
                        <Link to="/policies/privacy" className="text-terracotta">Privacy Policy</Link>
                      </Checkbox>
                    </Form.Item>
                  )}

                  <Button type="primary" size="large" htmlType="submit" block loading={loading}>
                    {mode === 'login' ? 'Log in' : 'Create account'}
                  </Button>
                </Form>
              </motion.div>
            </AnimatePresence>

            <p className="mt-6 text-center text-sm text-ash">
              Only want to check a parcel? <Link to="/track-order" className="font-semibold text-terracotta">Track your order</Link> without logging in.
            </p>
          </>
        )}
      </motion.div>
    </section>
  )
}

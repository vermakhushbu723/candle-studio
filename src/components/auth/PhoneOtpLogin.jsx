import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, App, Button, Checkbox, Divider, Form, Input } from 'antd'
import { EditOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { api } from '@/api/client'
import { confirmSmsOtp, sendSmsOtp, smsOtpEnabled } from '@/utils/phoneAuth'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const RESEND_SECONDS = 30

/**
 * Passwordless sign-in: mobile number → 6-digit OTP (→ name for a new account), or Google.
 * Calls onSignedIn({ token, user }) on success.
 */
export default function PhoneOtpLogin({ onSignedIn }) {
  const { message } = App.useApp()
  const [step, setStep] = useState('phone') // phone | otp
  const [phone, setPhone] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const [devOtp, setDevOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [wait, setWait] = useState(0)
  const confirmation = useRef(null) // Firebase SMS session
  const idToken = useRef(null) // kept so a retry (e.g. email already used) doesn't need a new SMS

  useEffect(() => {
    if (!wait) return
    const t = setTimeout(() => setWait((w) => w - 1), 1000)
    return () => clearTimeout(t)
  }, [wait])

  const sendOtp = async (number) => {
    setLoading(true)
    try {
      if (smsOtpEnabled) {
        // Real SMS through Firebase (Google sends it)
        const status = await api('/auth/phone/status', { method: 'POST', body: { phone: number } })
        confirmation.current = await sendSmsOtp(number, 'recaptcha-container')
        idToken.current = null
        setIsNewUser(status.isNewUser)
        setDevOtp('')
        message.success(`OTP sent by SMS to +91 ${number}`)
      } else {
        const r = await api('/auth/otp/send', { method: 'POST', body: { phone: number } })
        setIsNewUser(r.isNewUser)
        setDevOtp(r.devOtp ?? '')
        message.success(r.message)
      }
      setPhone(number)
      setStep('otp')
      setWait(RESEND_SECONDS)
    } catch (e) {
      message.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const verify = async (values) => {
    setLoading(true)
    try {
      const profile = { name: values.name, email: values.email || undefined }
      if (smsOtpEnabled) {
        idToken.current ??= await confirmSmsOtp(confirmation.current, values.otp)
        onSignedIn(await api('/auth/phone/firebase', { method: 'POST', body: { idToken: idToken.current, ...profile } }))
      } else {
        onSignedIn(await api('/auth/otp/verify', { method: 'POST', body: { phone, otp: values.otp, ...profile } }))
      }
    } catch (e) {
      message.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6">
      <div id="recaptcha-container" />
      <AnimatePresence mode="wait">
        {step === 'phone' ? (
          <motion.div key="phone" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            <Form layout="vertical" requiredMark={false} onFinish={({ phone: p }) => sendOtp(p)} initialValues={{ agree: true }}>
              <Form.Item name="phone" label="Mobile number" rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: 'Enter a 10-digit mobile number' }]}>
                <Input size="large" maxLength={10} prefix={<span className="flex items-center gap-1.5 text-ash"><PhoneOutlined /> +91</span>} autoComplete="tel-national" inputMode="numeric" placeholder="98XXXXXXXX" />
              </Form.Item>
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
              <Button type="primary" size="large" htmlType="submit" block loading={loading}>Get OTP</Button>
            </Form>
          </motion.div>
        ) : (
          <motion.div key="otp" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            <p className="text-sm text-ash">
              Enter the 6-digit code sent to <b className="text-charcoal">+91 {phone}</b>{' '}
              <button type="button" onClick={() => setStep('phone')} className="cursor-pointer font-semibold text-terracotta"><EditOutlined /> Change</button>
            </p>
            {devOtp && <Alert className="mt-3" type="info" showIcon title={`Test mode — your OTP is ${devOtp}`} description="SMS is not connected yet; the code is shown here for testing." />}
            <Form layout="vertical" requiredMark={false} className="mt-5" onFinish={verify}>
              <Form.Item name="otp" label="OTP" rules={[{ required: true, pattern: /^\d{6}$/, message: 'Enter the 6-digit OTP' }]}>
                <OtpInput />
              </Form.Item>
              {isNewUser && (
                <>
                  <p className="mb-3 text-sm font-medium text-charcoal">New here? Tell us a little about you.</p>
                  <Form.Item name="name" label="Full name" rules={[{ required: true, min: 2, message: 'Please enter your name' }]}>
                    <Input size="large" prefix={<UserOutlined className="text-ash" />} autoComplete="name" />
                  </Form.Item>
                  <Form.Item name="email" label="Email (optional)" rules={[{ type: 'email', message: 'Please enter a valid email' }]}>
                    <Input size="large" prefix={<MailOutlined className="text-ash" />} autoComplete="email" />
                  </Form.Item>
                </>
              )}
              <Button type="primary" size="large" htmlType="submit" block loading={loading}>
                {isNewUser ? 'Verify & create account' : 'Verify & log in'}
              </Button>
              <p className="mt-4 text-center text-sm text-ash">
                Didn’t get it?{' '}
                {wait > 0 ? (
                  <span>Resend in {wait}s</span>
                ) : (
                  <button type="button" onClick={() => sendOtp(phone)} className="cursor-pointer font-semibold text-terracotta">Resend OTP</button>
                )}
              </p>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>

      <Divider plain className="text-ash!">or</Divider>
      <GoogleButton onSignedIn={onSignedIn} />
    </div>
  )
}

/** Six single-digit boxes; behaves like one input for the form (value = "123456"). */
function OtpInput({ value = '', onChange }) {
  const refs = useRef([])
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? '')

  const set = (i, d) => {
    const next = [...digits]
    next[i] = d
    onChange?.(next.join('').slice(0, 6))
    if (d && i < 5) refs.current[i + 1]?.focus()
  }
  const paste = (e) => {
    const code = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (code) {
      e.preventDefault()
      onChange?.(code)
      refs.current[Math.min(code.length, 5)]?.focus()
    }
  }

  return (
    <div className="flex gap-2" onPaste={paste}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={d}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          aria-label={`OTP digit ${i + 1}`}
          data-otp={i}
          onChange={(e) => set(i, e.target.value.replace(/\D/g, '').slice(-1))}
          onKeyDown={(e) => e.key === 'Backspace' && !d && i > 0 && refs.current[i - 1]?.focus()}
          className="h-12 w-full min-w-0 rounded-xl border border-linen bg-white text-center text-xl font-semibold text-charcoal outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
        />
      ))}
    </div>
  )
}

/** "Continue with Google" via Google Identity Services (needs VITE_GOOGLE_CLIENT_ID). */
function GoogleButton({ onSignedIn }) {
  const { message } = App.useApp()
  const ref = useRef(null)
  const [ready, setReady] = useState(false)
  const handler = useRef(onSignedIn)
  useEffect(() => {
    handler.current = onSignedIn
  }, [onSignedIn])

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return
    const init = () => {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async ({ credential }) => {
          try {
            handler.current(await api('/auth/google', { method: 'POST', body: { credential } }))
          } catch (e) {
            message.error(e.message)
          }
        },
      })
      window.google.accounts.id.renderButton(ref.current, { theme: 'outline', size: 'large', shape: 'pill', text: 'continue_with', width: ref.current.offsetWidth || 320 })
      setReady(true)
    }
    if (window.google?.accounts?.id) return init()
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = init
    document.head.appendChild(script)
  }, [message])

  if (!GOOGLE_CLIENT_ID) {
    return (
      <Button size="large" block shape="round" icon={<GoogleIcon />} onClick={() => message.info('Google sign-in will be available soon. Please use your mobile number.')}>
        Continue with Google
      </Button>
    )
  }
  return <div ref={ref} className={`flex min-h-11 justify-center ${ready ? '' : 'animate-pulse rounded-full bg-shell'}`} />
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden className="mr-1 inline-block align-[-3px]">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

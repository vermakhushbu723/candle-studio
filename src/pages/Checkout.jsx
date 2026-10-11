import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, App, Button, Empty, Form, Input, Radio, Result, Steps } from 'antd'
import { motion } from 'framer-motion'
import PageHeader from '@/components/common/PageHeader'
import { siteImages } from '@/data/site'
import OrderSummary from '@/components/common/OrderSummary'
import { useCart } from '@/context/CartContext'
import { api, SESSION_KEY } from '@/api/client'
import { payWithRazorpay } from '@/api/razorpay'
import { readStorage } from '@/utils/format'

const paymentOptions = [
  { value: 'upi', label: 'UPI', note: 'GPay, PhonePe, Paytm' },
  { value: 'card', label: 'Credit / Debit card', note: 'Visa, Mastercard, RuPay' },
  { value: 'cod', label: 'Cash on Delivery', note: 'Available on 22,000+ pin codes' },
]

export default function Checkout() {
  const { message } = App.useApp()
  const { lines, coupon, clearCart } = useCart()
  const [step, setStep] = useState(0)
  const [order, setOrder] = useState(null)
  const [placing, setPlacing] = useState(false)
  const [pending, setPending] = useState(null) // { order, razorpay } while an online payment is unfinished
  const [form] = Form.useForm()
  // Logged-in customers get their details pre-filled
  const [session] = useState(() => readStorage(SESSION_KEY, null))

  if (order) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="wrap py-12">
        <Result
          status="success"
          title={<span className="font-serif text-3xl">Your glow is on its way!</span>}
          subTitle={`Order #${order.id} confirmed. We’ll send tracking details on WhatsApp and email.`}
          extra={[
            <Link key="track" to={`/track-order?order=${order.id}&contact=${encodeURIComponent(order.customer.email)}`}><Button type="primary" size="large">Track order</Button></Link>,
            <Link key="shop" to="/shop"><Button size="large">Keep shopping</Button></Link>,
          ]}
        />
      </motion.div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="wrap py-14">
        <Empty description="Nothing to check out yet"><Link to="/shop"><Button type="primary">Shop candles</Button></Link></Empty>
      </div>
    )
  }

  const next = async () => {
    if (step === 0) await form.validateFields(['fullName', 'phone', 'email', 'line1', 'city', 'state', 'pincode'])
    if (step < 1) return setStep(step + 1)
    const values = await form.validateFields()
    setPlacing(true)
    try {
      // Online payment already started for this cart → reopen it instead of creating a second order
      if (pending && values.payment !== 'cod') return await pay(pending)
      const r = await api('/orders', {
        method: 'POST',
        body: {
          ...form.getFieldsValue(true),
          couponCode: coupon,
          items: lines.map((l) => ({ productId: l.productId, quantity: l.quantity, fragrance: l.fragrance })),
        },
      })
      if (!r.razorpay) return done(r.order) // Cash on Delivery
      setPending(r)
      await pay(r)
    } catch (e) {
      message.error(e.message)
    } finally {
      setPlacing(false)
    }
  }

  /** Opens Razorpay, then lets the API verify the payment signature. */
  const pay = async ({ order: o, razorpay }) => {
    try {
      const result = await payWithRazorpay(razorpay)
      const v = await api(`/orders/${o.id}/verify-payment`, { method: 'POST', body: result })
      done(v.order)
    } catch (e) {
      if (e.dismissed) message.warning('Payment not completed — your order is saved. Tap “Pay now” to try again.')
      else message.error(e.message)
    }
  }

  const done = (o) => {
    setOrder(o)
    setPending(null)
    clearCart()
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <PageHeader image={siteImages.matcha} eyebrow="Checkout" title="Almost there" crumbs={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <section className="wrap grid gap-6 py-9 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-4xl border border-linen bg-white p-5 md:p-6">
          <Steps current={step} onChange={(s) => s < step && setStep(s)} items={[{ title: 'Shipping' }, { title: 'Payment' }]} />
          <Form form={form} layout="vertical" requiredMark={false} className="mt-6" initialValues={{ payment: 'upi', fullName: session?.name, email: session?.email, phone: session?.phone }}>
            <div hidden={step !== 0}>
              <div className="grid gap-x-4 sm:grid-cols-2">
                <Form.Item name="fullName" label="Full name" rules={[{ required: true, message: 'Required' }]}><Input size="large" /></Form.Item>
                <Form.Item name="phone" label="Mobile" rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: '10-digit mobile number' }]}><Input size="large" prefix={<span className="text-ash">+91</span>} /></Form.Item>
              </div>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}><Input size="large" /></Form.Item>
              <Form.Item name="line1" label="Address" rules={[{ required: true, min: 5, message: 'Enter your full address' }]}><Input size="large" placeholder="House no., street, area" /></Form.Item>
              <div className="grid gap-x-4 sm:grid-cols-3">
                <Form.Item name="city" label="City" rules={[{ required: true, message: 'Required' }]}><Input size="large" /></Form.Item>
                <Form.Item name="state" label="State" rules={[{ required: true, message: 'Required' }]}><Input size="large" /></Form.Item>
                <Form.Item name="pincode" label="Pincode" rules={[{ required: true, pattern: /^\d{6}$/, message: '6 digits' }]}><Input size="large" maxLength={6} /></Form.Item>
              </div>
              <Form.Item name="giftNote" label="Gift note (optional)"><Input.TextArea rows={2} placeholder="We’ll handwrite it on a card" /></Form.Item>
            </div>

            <div hidden={step !== 1}>
              {pending && (
                <Alert className="mb-4" type="warning" showIcon title={`Order #${pending.order.id} is waiting for payment`} description="Tap “Pay now” to complete it, or choose Cash on Delivery to place it as COD." />
              )}
              <Form.Item name="payment">
                <Radio.Group className="w-full">
                  <div className="grid gap-3">
                    {paymentOptions.map((o) => (
                      <label key={o.value} className="flex cursor-pointer items-center gap-4 rounded-2xl border border-linen p-5 transition has-[:checked]:border-terracotta has-[:checked]:bg-sand/50">
                        <Radio value={o.value} />
                        <div>
                          <p className="font-medium">{o.label}</p>
                          <p className="text-xs text-ash">{o.note}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </Radio.Group>
              </Form.Item>
            </div>
          </Form>
          <div className="mt-4 flex justify-between gap-3">
            {step > 0 ? <Button size="large" onClick={() => setStep(step - 1)}>Back</Button> : <span />}
            <Button type="primary" size="large" onClick={next} loading={placing}>{step === 1 ? (pending ? 'Pay now' : 'Place order') : 'Continue to payment'}</Button>
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <OrderSummary showItems />
        </div>
      </section>
    </>
  )
}

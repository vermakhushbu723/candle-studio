import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Empty, Form, Input, Radio, Result, Steps } from 'antd'
import { motion } from 'framer-motion'
import PageHeader from '@/components/common/PageHeader'
import { siteImages } from '@/data/site'
import OrderSummary from '@/components/common/OrderSummary'
import { useCart } from '@/context/CartContext'

const paymentOptions = [
  { value: 'upi', label: 'UPI', note: 'GPay, PhonePe, Paytm' },
  { value: 'card', label: 'Credit / Debit card', note: 'Visa, Mastercard, RuPay' },
  { value: 'cod', label: 'Cash on Delivery', note: 'Available on 22,000+ pin codes' },
]

export default function Checkout() {
  const { lines, clearCart } = useCart()
  const [step, setStep] = useState(0)
  const [orderId, setOrderId] = useState(null)
  const [form] = Form.useForm()

  if (orderId) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="wrap py-20">
        <Result
          status="success"
          title={<span className="font-serif text-3xl">Your glow is on its way!</span>}
          subTitle={`Order #${orderId} confirmed. We’ll send tracking details on WhatsApp and email.`}
          extra={[
            <Link key="track" to="/track-order"><Button type="primary" size="large">Track order</Button></Link>,
            <Link key="shop" to="/shop"><Button size="large">Keep shopping</Button></Link>,
          ]}
        />
      </motion.div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="wrap py-24">
        <Empty description="Nothing to check out yet"><Link to="/shop"><Button type="primary">Shop candles</Button></Link></Empty>
      </div>
    )
  }

  const next = async () => {
    if (step === 0) await form.validateFields(['fullName', 'phone', 'email', 'line1', 'city', 'state', 'pincode'])
    if (step < 1) return setStep(step + 1)
    await form.validateFields()
    setOrderId(`CD${Math.floor(10000 + Math.random() * 90000)}`)
    clearCart()
  }

  return (
    <>
      <PageHeader image={siteImages.matcha} eyebrow="Checkout" title="Almost there" crumbs={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <section className="wrap grid gap-10 py-14 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-4xl border border-linen bg-white p-6 md:p-10">
          <Steps current={step} onChange={(s) => s < step && setStep(s)} items={[{ title: 'Shipping' }, { title: 'Payment' }]} />
          <Form form={form} layout="vertical" requiredMark={false} className="mt-10" initialValues={{ payment: 'upi' }}>
            <div hidden={step !== 0}>
              <div className="grid gap-x-4 sm:grid-cols-2">
                <Form.Item name="fullName" label="Full name" rules={[{ required: true, message: 'Required' }]}><Input size="large" /></Form.Item>
                <Form.Item name="phone" label="Mobile" rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: '10-digit mobile number' }]}><Input size="large" addonBefore="+91" /></Form.Item>
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
            <Button type="primary" size="large" onClick={next}>{step === 1 ? 'Place order' : 'Continue to payment'}</Button>
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <OrderSummary showItems />
        </div>
      </section>
    </>
  )
}

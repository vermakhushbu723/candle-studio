import { useState } from 'react'
import { Alert, Button, Form, Input, Steps } from 'antd'
import { CarOutlined, CheckCircleOutlined, GiftOutlined, HomeOutlined, InboxOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import PageHeader from '@/components/common/PageHeader'
import { siteImages } from '@/data/site'

/** Demo tracker — replace `lookupOrder` with your courier (e.g. Shiprocket) API. */
const lookupOrder = (orderId) => {
  const seed = [...orderId].reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  const current = seed % 5
  const base = new Date()
  const dates = [0, 1, 2, 3, 5].map((d) => new Date(base.getTime() + (d - current) * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }))
  return { orderId, current, dates, courier: 'Shiprocket · Delhivery' }
}

const stages = [
  { title: 'Order placed', icon: <GiftOutlined /> },
  { title: 'Packed', icon: <InboxOutlined /> },
  { title: 'Shipped', icon: <CarOutlined /> },
  { title: 'Out for delivery', icon: <HomeOutlined /> },
  { title: 'Delivered', icon: <CheckCircleOutlined /> },
]

export default function TrackOrder() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const onFinish = ({ orderId }) => {
    setLoading(true)
    setTimeout(() => {
      setResult(lookupOrder(orderId.trim().toUpperCase()))
      setLoading(false)
    }, 700)
  }

  return (
    <>
      <PageHeader image={siteImages.beach} eyebrow="Track order" title="Where’s my glow?" subtitle="Enter your order ID and phone/email to see live shipping status." crumbs={[{ label: 'Track Order' }]} />
      <section className="wrap max-w-4xl! py-16">
        <div className="rounded-4xl border border-linen bg-white p-6 md:p-10">
          <Form layout="vertical" requiredMark={false} onFinish={onFinish} className="grid gap-x-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <Form.Item name="orderId" label="Order ID" rules={[{ required: true, message: 'Enter your order ID' }]}>
              <Input size="large" placeholder="e.g. CD10245" />
            </Form.Item>
            <Form.Item name="contact" label="Phone or email" rules={[{ required: true, message: 'Enter phone or email' }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large" htmlType="submit" loading={loading}>Track</Button>
            </Form.Item>
          </Form>

          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }} className="overflow-hidden">
                <div className="mt-6 border-t border-linen pt-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-serif text-2xl">Order #{result.orderId}</p>
                    <span className="text-sm text-ash">{result.courier}</span>
                  </div>
                  <Steps
                    className="mt-8"
                    responsive
                    current={result.current}
                    items={stages.map((s, i) => ({ ...s, description: i <= result.current ? result.dates[i] : `Est. ${result.dates[i]}` }))}
                  />
                  <Alert className="mt-8" type="info" showIcon message="Demo data — connect your courier API in src/pages/TrackOrder.jsx" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}

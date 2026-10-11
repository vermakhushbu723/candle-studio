import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert, Button, Form, Input, Steps } from 'antd'
import { CarOutlined, CheckCircleOutlined, GiftOutlined, HomeOutlined, InboxOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import PageHeader from '@/components/common/PageHeader'
import { siteImages } from '@/data/site'
import { api } from '@/api/client'
import { formatPrice } from '@/utils/format'

// `status` values match the order statuses the studio sets in the admin panel
const stages = [
  { status: 'Order Placed', title: 'Order placed', icon: <GiftOutlined /> },
  { status: 'Packed', title: 'Packed', icon: <InboxOutlined /> },
  { status: 'Shipped', title: 'Shipped', icon: <CarOutlined /> },
  { status: 'Out for Delivery', title: 'Out for delivery', icon: <HomeOutlined /> },
  { status: 'Delivered', title: 'Delivered', icon: <CheckCircleOutlined /> },
]
const shortDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

export default function TrackOrder() {
  const [params] = useSearchParams()
  const [form] = Form.useForm()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onFinish = async ({ orderId, contact }) => {
    setLoading(true)
    setError('')
    try {
      const r = await api(`/orders/track/${encodeURIComponent(orderId.trim().toUpperCase())}`, { query: { contact: contact.trim() } })
      setOrder(r.order)
    } catch (e) {
      setOrder(null)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // Coming from the order confirmation screen / My orders: look the order up once on arrival
  useEffect(() => {
    const orderId = params.get('order')
    const contact = params.get('contact')
    if (orderId && contact) {
      form.setFieldsValue({ orderId, contact })
      // eslint-disable-next-line react/set-state-in-effect -- fetching from the API is the external sync here
      onFinish({ orderId, contact })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally only on mount
  }, [])

  const current = order ? stages.findIndex((s) => s.status === order.status) : -1
  const reachedAt = (status) => order?.statusHistory.findLast((h) => h.status === status)?.at

  return (
    <>
      <PageHeader image={siteImages.beach} eyebrow="Track order" title="Where’s my glow?" subtitle="Enter your order ID and phone/email to see live shipping status." crumbs={[{ label: 'Track Order' }]} />
      <section className="wrap max-w-4xl! py-10">
        <div className="rounded-4xl border border-linen bg-white p-5 md:p-6">
          <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish} className="grid gap-x-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <Form.Item name="orderId" label="Order ID" rules={[{ required: true, message: 'Enter your order ID' }]}>
              <Input size="large" placeholder="e.g. CD104520" />
            </Form.Item>
            <Form.Item name="contact" label="Phone or email" rules={[{ required: true, message: 'Enter phone or email' }]}>
              <Input size="large" placeholder="Used at checkout" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large" htmlType="submit" loading={loading}>Track</Button>
            </Form.Item>
          </Form>

          {error && <Alert type="error" showIcon title={error} description="Check the order ID from your confirmation and use the same phone or email you checked out with." />}

          <AnimatePresence>
            {order && (
              <motion.div key={order.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }} className="overflow-hidden">
                <div className="mt-6 border-t border-linen pt-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-serif text-2xl">Order #{order.id}</p>
                    <span className="text-sm text-ash">{order.courier}{order.awb ? ` · AWB ${order.awb}` : ''}</span>
                  </div>
                  <p className="mt-1 text-sm text-ash">
                    {order.items.reduce((s, i) => s + i.quantity, 0)} item(s) · {formatPrice(order.total)} · placed {shortDate(order.date)}
                  </p>

                  {order.status === 'Payment Pending' ? (
                    <Alert className="mt-5" type="info" showIcon title="Waiting for payment" description="This order will be confirmed as soon as the online payment goes through. If money was debited, it will update shortly." />
                  ) : order.status === 'Cancelled' ? (
                    <Alert className="mt-5" type="warning" showIcon title="This order was cancelled" description="If you didn’t request this, please contact us — we’re happy to help." />
                  ) : (
                    <Steps
                      className="mt-5"
                      responsive
                      current={current}
                      items={stages.map((s, i) => {
                        const at = reachedAt(s.status)
                        return { title: s.title, icon: s.icon, description: i <= current && at ? shortDate(at) : undefined }
                      })}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}

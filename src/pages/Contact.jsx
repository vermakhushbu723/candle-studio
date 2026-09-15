import { useSearchParams } from 'react-router-dom'
import { App, Button, Form, Input, Select } from 'antd'
import { ClockCircleOutlined, EnvironmentOutlined, MailOutlined, WhatsAppOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import PageHeader from '@/components/common/PageHeader'
import { site, siteImages } from '@/data/site'

const channels = [
  { icon: WhatsAppOutlined, title: 'WhatsApp', value: site.whatsapp, href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}` },
  { icon: MailOutlined, title: 'Email', value: site.supportEmail, href: `mailto:${site.supportEmail}` },
  { icon: EnvironmentOutlined, title: 'Studio', value: site.address },
  { icon: ClockCircleOutlined, title: 'Hours', value: 'Mon – Sat, 10 AM – 7 PM IST' },
]

export default function Contact() {
  const { message } = App.useApp()
  const [params] = useSearchParams()
  const [form] = Form.useForm()

  const onFinish = () => {
    message.success('Thanks! We’ll get back to you within 24 hours.')
    form.resetFields()
  }

  return (
    <>
      <PageHeader image={siteImages.tulip} eyebrow="Contact" title="We’d love to hear from you" subtitle="Order help, bulk gifting, custom hampers or just a scent recommendation — we reply within a day." crumbs={[{ label: 'Contact' }]} />
      <section className="wrap grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {channels.map(({ icon: Icon, title, value, href }, i) => {
            const Tag = href ? 'a' : 'div'
            return (
              <motion.div key={title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Tag href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-4 rounded-3xl border border-linen bg-white p-6 transition hover:border-terracotta">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sand text-xl text-terracotta"><Icon /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-ash">{title}</p>
                    <p className="mt-1 font-medium">{value}</p>
                  </div>
                </Tag>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-4xl border border-linen bg-white p-6 md:p-10">
          <h2 className="font-serif text-3xl">Send us a message</h2>
          <Form form={form} layout="vertical" requiredMark={false} className="mt-6" onFinish={onFinish} initialValues={{ topic: params.get('topic') ?? 'order' }}>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                <Input size="large" />
              </Form.Item>
              <Form.Item name="phone" label="Phone" rules={[{ pattern: /^[6-9]\d{9}$/, message: 'Enter a 10-digit mobile number' }]}>
                <Input size="large" addonBefore="+91" />
              </Form.Item>
            </div>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item name="topic" label="Topic">
              <Select
                size="large"
                options={[
                  { value: 'order', label: 'Order support' },
                  { value: 'bulk', label: 'Bulk / corporate gifting' },
                  { value: 'custom', label: 'Custom hamper' },
                  { value: 'other', label: 'Something else' },
                ]}
              />
            </Form.Item>
            <Form.Item name="message" label="Message" rules={[{ required: true, min: 10, message: 'Tell us a little more (10+ characters)' }]}>
              <Input.TextArea rows={5} />
            </Form.Item>
            <Button type="primary" size="large" htmlType="submit" block>Send message</Button>
          </Form>
        </motion.div>
      </section>
    </>
  )
}

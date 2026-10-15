import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { App, Button, Form, Input, Select } from 'antd'
import { ClockCircleOutlined, EnvironmentOutlined, GoogleOutlined, StarFilled, FacebookFilled, InstagramOutlined, MailOutlined, PhoneOutlined, PinterestOutlined, WhatsAppOutlined, YoutubeFilled } from '@ant-design/icons'
import { motion } from 'framer-motion'
import PageHeader from '@/components/common/PageHeader'
import { site, siteImages } from '@/data/site'
import { api } from '@/api/client'

const channels = [
  { icon: WhatsAppOutlined, title: 'WhatsApp', value: site.whatsapp, href: `https://wa.me/${site.whatsapp.replace(/\D/g, '')}` },
  { icon: PhoneOutlined, title: 'Call us', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
  { icon: MailOutlined, title: 'Email', value: site.supportEmail, href: `mailto:${site.supportEmail}` },
  { icon: ClockCircleOutlined, title: 'Hours', value: site.hours },
  { icon: EnvironmentOutlined, title: 'Our studio', value: `${site.location.street}, ${site.location.city}, ${site.location.region} ${site.location.postalCode}`, href: site.googleMapsUrl },
]

const socialIcons = { Instagram: InstagramOutlined, Facebook: FacebookFilled, YouTube: YoutubeFilled, Pinterest: PinterestOutlined }

export default function Contact() {
  const { message } = App.useApp()
  const [params] = useSearchParams()
  const [form] = Form.useForm()
  const [sending, setSending] = useState(false)

  const onFinish = async (values) => {
    setSending(true)
    try {
      const r = await api('/inquiries', { method: 'POST', body: values })
      message.success(r.message)
      form.resetFields()
    } catch (e) {
      message.error(e.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHeader image={siteImages.tulip} eyebrow="Contact" title="We’d love to hear from you" subtitle="Order help, bulk gifting, custom hampers or just a scent recommendation — we reply within a day." crumbs={[{ label: 'Contact' }]} />
      <section className="wrap grid gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {channels.map(({ icon: Icon, title, value, href }, i) => {
            const Tag = href ? 'a' : 'div'
            return (
              <motion.div key={title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Tag href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-4 rounded-3xl border border-linen bg-white p-5 transition hover:border-terracotta">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sand text-xl text-terracotta"><Icon /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-ash">{title}</p>
                    <p className="mt-1 font-medium">{value}</p>
                  </div>
                </Tag>
              </motion.div>
            )
          })}

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: channels.length * 0.1 }} className="rounded-3xl border border-linen bg-white p-5 sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-ash">Follow Jyotessa</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {site.socials.map(({ label, handle, href }) => {
                const Icon = socialIcons[label]
                return (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-shell px-4 py-3 text-sm transition hover:bg-sand hover:text-terracotta">
                    <Icon className="text-lg text-terracotta" />
                    <span className="min-w-0">
                      <span className="block font-semibold">{label}</span>
                      <span className="block truncate text-xs text-ash">{handle}</span>
                    </span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-4xl border border-linen bg-white p-5 md:p-6">
          <h2 className="font-serif text-3xl">Send us a message</h2>
          <Form form={form} layout="vertical" requiredMark={false} className="mt-6" onFinish={onFinish} initialValues={{ topic: params.get('topic') ?? 'order' }}>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                <Input size="large" />
              </Form.Item>
              <Form.Item name="phone" label="Phone" rules={[{ pattern: /^[6-9]\d{9}$/, message: 'Enter a 10-digit mobile number' }]}>
                <Input size="large" prefix={<span className="text-ash">+91</span>} />
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
            <Button type="primary" size="large" htmlType="submit" block loading={sending}>Send message</Button>
          </Form>
        </motion.div>
      </section>

      <section className="wrap pb-10">
        <div className="grid overflow-hidden rounded-4xl border border-linen bg-white lg:grid-cols-[1.4fr_1fr]">
          <iframe
            title="Jyotessa on Google Maps"
            src={site.googleMapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-64 w-full border-0 lg:h-full lg:min-h-72"
          />
          <div className="flex flex-col justify-center gap-4 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-ash">Find us on Google</p>
            <h2 className="font-serif text-2xl md:text-3xl">Loved your Jyotessa candle?</h2>
            <p className="text-sm leading-relaxed text-ash">A quick Google review helps our small, handmade studio reach more candle lovers. It takes 30 seconds.</p>
            <div className="flex flex-wrap gap-3">
              <a href={site.googleReviewUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-charcoal">
                <StarFilled /> Review us on Google
              </a>
              <a href={site.googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-linen px-5 py-2.5 text-sm font-semibold transition hover:border-terracotta hover:text-terracotta">
                <GoogleOutlined /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

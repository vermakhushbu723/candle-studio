import { useState } from 'react'
import { App, Button, Input } from 'antd'
import { motion } from 'framer-motion'

export default function Newsletter() {
  const { message } = App.useApp()
  const [email, setEmail] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return message.error('Please enter a valid email')
    message.success('Welcome to the glow club! Check your inbox for 10% off.')
    setEmail('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="grid items-center gap-8 py-16 lg:grid-cols-2"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-caramel">The Glow Club</p>
        <h3 className="mt-3 font-serif text-3xl md:text-4xl">Get 10% off your first order</h3>
        <p className="mt-3 text-cream/70">New scents, restock alerts and festive drops — no spam, just warm light.</p>
      </div>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <Input size="large" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email" />
        <Button size="large" type="primary" htmlType="submit">Subscribe</Button>
      </form>
    </motion.div>
  )
}

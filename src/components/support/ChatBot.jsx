import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Select } from 'antd'
import { CloseOutlined, PhoneOutlined, SendOutlined, WhatsAppOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { fallback, greeting, inquiryTopics, intents } from '@/data/chatbot'
import { getProduct } from '@/data/products'
import { site } from '@/data/site'
import { formatPrice, readStorage, writeStorage } from '@/utils/format'

const whatsappLink = (text = 'Hi candledust! I need some help.') => `https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
const callLink = `tel:${site.phone.replace(/\s/g, '')}`

let nextId = 1
const botMessage = (payload) => ({ id: nextId++, from: 'bot', ...payload })
const userMessage = (text) => ({ id: nextId++, from: 'user', text })

const replyFor = (text) => intents.find((intent) => intent.match.test(text)) ?? fallback

export default function ChatBot({ open, onClose }) {
  const [messages, setMessages] = useState(() => [botMessage(greeting)])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [inquiryTopic, setInquiryTopic] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, inquiryTopic])

  const send = (text) => {
    const clean = text.trim()
    if (!clean || typing) return
    setInput('')
    setInquiryTopic(null)
    setMessages((m) => [...m, userMessage(clean)])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, botMessage(replyFor(clean))])
    }, 750)
  }

  const submitInquiry = (values) => {
    const ticket = `CD-${Date.now().toString().slice(-6)}`
    // Stored locally for the demo — send `values` to your CRM / email API here
    writeStorage('cd-inquiries', [...readStorage('cd-inquiries', []), { ...values, ticket, createdAt: new Date().toISOString() }])
    setInquiryTopic(null)
    setMessages((m) => [
      ...m,
      userMessage(`📨 ${values.topic}: ${values.message}`),
      botMessage({
        text: `Thank you, ${values.name.split(' ')[0]}! Your ticket is ${ticket}. Our team will reach you on ${values.phone} within 24 hours.`,
        actions: [{ type: 'whatsapp', label: 'Get faster reply on WhatsApp', prefill: `Hi! My ticket is ${ticket}. ${values.message}` }],
      }),
    ])
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="chat"
          role="dialog"
          aria-label="Support chat"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-4 right-4 z-[90] flex h-[min(32rem,calc(100svh-8.5rem))] w-[min(20rem,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-linen bg-cream shadow-[0_30px_80px_-20px_rgba(43,43,43,0.45)]"
        >
          {/* Header */}
          <div className="relative overflow-hidden bg-linear-to-br from-charcoal to-[#4a3528] px-5 py-4 text-cream">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-terracotta/50 blur-2xl" />
            <div className="relative flex items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center rounded-full bg-linear-to-br from-terracotta to-rose text-xl">
                🕯️
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-charcoal bg-emerald-400" />
              </span>
              <div className="flex-1">
                <p className="font-serif text-lg leading-tight">Diya · candledust</p>
                <p className="text-xs text-cream/70">Typically replies instantly</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close chat" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10">
                <CloseOutlined />
              </button>
            </div>
            <div className="relative mt-3 grid grid-cols-2 gap-2">
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-2 text-xs font-semibold text-white hover:brightness-110">
                <WhatsAppOutlined /> WhatsApp
              </a>
              <a href={callLink} className="flex items-center justify-center gap-2 rounded-full bg-white/15 py-2 text-xs font-semibold text-white hover:bg-white/25">
                <PhoneOutlined /> Call us
              </a>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="grain flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <Message key={m.id} message={m} onQuickReply={send} onInquiry={setInquiryTopic} onNavigate={onClose} />
            ))}

            {typing && (
              <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="h-2 w-2 rounded-full bg-caramel" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
                ))}
              </div>
            )}

            {inquiryTopic && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-linen bg-white p-4 shadow-sm">
                <p className="mb-3 font-serif text-lg">Leave us a message</p>
                <Form layout="vertical" size="middle" requiredMark={false} onFinish={submitInquiry} initialValues={{ topic: inquiryTopic }}>
                  <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Required' }]} className="mb-3!">
                    <Input />
                  </Form.Item>
                  <Form.Item name="phone" label="Mobile" rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: '10-digit mobile number' }]} className="mb-3!">
                    <Input addonBefore="+91" maxLength={10} />
                  </Form.Item>
                  <Form.Item name="topic" label="Topic" className="mb-3!">
                    <Select options={inquiryTopics.map((t) => ({ value: t, label: t }))} />
                  </Form.Item>
                  <Form.Item name="message" label="Message" rules={[{ required: true, min: 5, message: 'Tell us a bit more' }]} className="mb-3!">
                    <Input.TextArea rows={3} />
                  </Form.Item>
                  <div className="flex gap-2">
                    <Button onClick={() => setInquiryTopic(null)}>Cancel</Button>
                    <Button type="primary" htmlType="submit" block>Submit</Button>
                  </div>
                </Form>
              </motion.div>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={(e) => { e.preventDefault(); send(input) }} className="flex items-center gap-2 border-t border-linen bg-white p-3">
            <Input variant="borderless" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question…" aria-label="Message" />
            <Button type="primary" shape="circle" htmlType="submit" icon={<SendOutlined />} aria-label="Send" disabled={!input.trim()} />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Message({ message, onQuickReply, onInquiry, onNavigate }) {
  const isBot = message.from === 'bot'
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${isBot ? 'rounded-bl-md bg-white text-charcoal' : 'rounded-br-md bg-terracotta text-white'}`}>
        {message.text}
      </div>

      {message.products && (
        <div className="mt-2 grid w-full gap-2">
          {message.products.map(getProduct).map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} onClick={onNavigate} className="flex items-center gap-3 rounded-2xl bg-white p-2 pr-3 shadow-sm transition hover:ring-1 hover:ring-terracotta">
              <img src={p.images[0]} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{p.name}</span>
              <span className="text-sm font-semibold text-terracotta">{formatPrice(p.price)}</span>
            </Link>
          ))}
        </div>
      )}

      {message.actions && (
        <div className="mt-2 flex flex-wrap gap-2">
          {message.actions.map((a) => {
            const cls = 'rounded-full border px-3 py-1.5 text-xs font-semibold transition'
            if (a.type === 'link') return <Link key={a.label} to={a.to} onClick={onNavigate} className={`${cls} border-terracotta/40 bg-white text-terracotta hover:bg-terracotta hover:text-white`}>{a.label} →</Link>
            if (a.type === 'whatsapp') return <a key={a.label} href={whatsappLink(a.prefill)} target="_blank" rel="noreferrer" className={`${cls} border-transparent bg-[#25D366] text-white hover:brightness-110`}><WhatsAppOutlined /> {a.label}</a>
            if (a.type === 'call') return <a key={a.label} href={callLink} className={`${cls} border-transparent bg-charcoal text-cream hover:bg-cocoa`}><PhoneOutlined /> {a.label}</a>
            return <button key={a.label} type="button" onClick={() => onInquiry(a.topic)} className={`${cls} border-caramel bg-sand text-cocoa hover:bg-caramel hover:text-white`}>✉️ {a.label}</button>
          })}
        </div>
      )}

      {message.quickReplies && (
        <div className="mt-2 flex flex-wrap gap-2">
          {message.quickReplies.map((q) => (
            <button key={q} type="button" onClick={() => onQuickReply(q)} className="rounded-full border border-linen bg-white px-3 py-1.5 text-xs font-medium text-charcoal transition hover:border-terracotta hover:text-terracotta">
              {q}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}

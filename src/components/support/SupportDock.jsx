import { useEffect, useState } from 'react'
import { CloseOutlined, MessageFilled, PhoneFilled, WhatsAppOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import ChatBot from './ChatBot'
import { site } from '@/data/site'

/** Floating Call, WhatsApp and chat launchers (bottom-right). */
export default function SupportDock() {
  const [chatOpen, setChatOpen] = useState(false)
  const [nudge, setNudge] = useState(false)

  // Friendly prompt bubble a few seconds after landing
  useEffect(() => {
    const show = setTimeout(() => setNudge(true), 6000)
    const hide = setTimeout(() => setNudge(false), 16000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  const toggleChat = () => {
    setNudge(false)
    setChatOpen((o) => !o)
  }

  return (
    <>
      <ChatBot open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Launchers hide while the chat is open — the chat header has its own close button */}
      <div className={`fixed bottom-4 right-4 z-[91] flex flex-col items-end gap-3 transition-all duration-300 ${chatOpen ? 'pointer-events-none translate-y-6 opacity-0' : ''}`}>
        <AnimatePresence>
          {!chatOpen && (
            <motion.div key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="flex flex-col items-end gap-3">
              <DockButton href={`tel:${site.phone.replace(/\s/g, '')}`} label="Call us" color="bg-terracotta" ring="bg-terracotta" delay="0.6s">
                <PhoneFilled className="text-xl" />
              </DockButton>
              <DockButton href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hi candledust! I have a question.')}`} external label="WhatsApp us" color="bg-[#25D366]" ring="bg-[#25D366]" delay="0s">
                <WhatsAppOutlined className="text-2xl" />
              </DockButton>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <AnimatePresence>
            {nudge && !chatOpen && (
              <motion.button
                type="button"
                onClick={toggleChat}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-[4.25rem] top-1/2 w-max max-w-[14rem] -translate-y-1/2 rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-left text-sm shadow-xl ring-1 ring-linen"
              >
                Need help choosing a candle? <b className="text-terracotta">Chat with us</b>
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={toggleChat}
            aria-label={chatOpen ? 'Close chat' : 'Open support chat'}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="relative grid h-14 w-14 place-items-center rounded-full bg-linear-to-br from-charcoal to-cocoa text-white shadow-[0_12px_30px_-8px_rgba(43,43,43,0.6)]"
          >
            {!chatOpen && <span className="absolute inset-0 animate-ping rounded-full bg-caramel opacity-40" />}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={chatOpen ? 'close' : 'open'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="relative text-2xl">
                {chatOpen ? <CloseOutlined /> : <MessageFilled />}
              </motion.span>
            </AnimatePresence>
            {!chatOpen && <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-white bg-rose" />}
          </motion.button>
        </div>
      </div>
    </>
  )
}

function DockButton({ href, external, label, color, ring, delay, children }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      aria-label={label}
      className="group relative flex items-center"
    >
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-charcoal px-3 py-1.5 text-xs font-semibold text-cream opacity-0 shadow-lg transition-all duration-300 group-hover:right-[4.25rem] group-hover:opacity-100">
        {label}
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110">
        <span className={`animate-dock-pulse absolute inset-0 rounded-full ${ring}`} style={{ animationDelay: delay }} />
        <span className={`absolute inset-0 rounded-full ${color}`} />
        <span className="relative">{children}</span>
      </span>
    </a>
  )
}

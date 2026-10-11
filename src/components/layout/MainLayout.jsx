import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { App, FloatButton } from 'antd'
import { listenForeground, refreshPushToken } from '@/utils/push'
import { getSession } from '@/utils/session'
import { AnimatePresence, motion } from 'framer-motion'
import AnnouncementBar from './AnnouncementBar'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import ScrollProgress from './ScrollProgress'
import IntroLoader from './IntroLoader'
import SupportDock from '@/components/support/SupportDock'

export default function MainLayout() {
  const { notification } = App.useApp()
  const navigate = useNavigate()

  useEffect(() => {
    if (getSession()) refreshPushToken()
    let stop = () => {}
    listenForeground(({ title, body, link }) => {
      notification.open({
        message: title,
        description: body,
        placement: 'topRight',
        duration: 8,
        onClick: () => {
          if (!link) return
          const url = new URL(link, window.location.origin)
          if (url.origin === window.location.origin) navigate(url.pathname + url.search)
          else window.location.href = link
        },
      })
    }).then((fn) => (stop = fn))
    return () => stop()
  }, [notification, navigate])

  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col">
      <IntroLoader />
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <SupportDock />
      <FloatButton.BackTop visibilityHeight={600} style={{ insetInlineEnd: 'auto', insetInlineStart: 16, bottom: 16 }} />
    </div>
  )
}

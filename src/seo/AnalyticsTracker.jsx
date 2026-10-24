import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, setAnalyticsUser, track, trackPageView } from '@/utils/analytics'
import { useSession } from '@/utils/session'

/** Sends a GA4 page_view on every route change (after SeoManager has set the page title) and site searches. */
export default function AnalyticsTracker() {
  const { pathname, search } = useLocation()
  const session = useSession()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    setAnalyticsUser(session?.id ?? null)
  }, [session?.id])

  useEffect(() => {
    const t = setTimeout(() => trackPageView(pathname + search), 60)
    const q = new URLSearchParams(search).get('q')
    if (pathname === '/shop' && q) track.search(q)
    return () => clearTimeout(t)
  }, [pathname, search])

  return null
}

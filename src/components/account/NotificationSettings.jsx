import { useEffect, useState } from 'react'
import { App, Button, Switch } from 'antd'
import { BellOutlined, CheckCircleFilled } from '@ant-design/icons'
import { api } from '@/api/client'
import { enablePush, pushStatus } from '@/utils/push'

/** Account page card: push on this device + "offers & new arrivals" preference. */
export default function NotificationSettings({ compact = false }) {
  const { message } = App.useApp()
  const [status, setStatus] = useState('loading')
  const [offers, setOffers] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    pushStatus().then(setStatus)
    if (!compact) api('/notifications/preferences').then((r) => setOffers(r.notifyOffers)).catch(() => setOffers(null))
  }, [compact])

  const turnOn = async () => {
    setBusy(true)
    try {
      await enablePush()
      setStatus('granted')
      message.success('Notifications are on for this device')
    } catch (e) {
      message.error(e.message)
      setStatus(await pushStatus())
    } finally {
      setBusy(false)
    }
  }

  const toggleOffers = async (v) => {
    setOffers(v)
    try {
      await api('/notifications/preferences', { method: 'PUT', body: { notifyOffers: v } })
      message.success(v ? 'You’ll hear about new arrivals and offers' : 'Offer updates turned off — you’ll still get order updates')
    } catch (e) {
      setOffers(!v)
      message.error(e.message)
    }
  }

  const pushRow =
    status === 'granted' ? (
      <p className="flex items-center gap-2 text-sm text-emerald-700"><CheckCircleFilled /> Notifications are on for this device</p>
    ) : status === 'default' ? (
      <Button icon={<BellOutlined />} onClick={turnOn} loading={busy} type={compact ? 'primary' : 'default'}>Turn on notifications</Button>
    ) : status === 'denied' ? (
      <p className="text-sm text-ash">Notifications are blocked for this site. Allow them from your browser’s site settings (🔒 next to the address).</p>
    ) : null

  if (compact) return status === 'default' ? pushRow : null

  return (
    <div className="mt-6 rounded-2xl border border-linen p-4">
      <p className="eyebrow">Notifications</p>
      <p className="mt-2 text-sm text-ash">Order updates (confirmed, shipped, delivered) come by email and on this device.</p>
      {pushRow && <div className="mt-3">{pushRow}</div>}
      {offers !== null && (
        <label className="mt-4 flex cursor-pointer items-center justify-between gap-4">
          <span>
            <span className="block text-sm font-medium">New arrivals & offers</span>
            <span className="block text-xs text-ash">Launches, festive collections and coupon codes</span>
          </span>
          <Switch checked={offers} onChange={toggleOffers} />
        </label>
      )}
    </div>
  )
}

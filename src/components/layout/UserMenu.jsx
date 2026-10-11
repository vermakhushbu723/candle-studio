import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { App, Dropdown } from 'antd'
import { CarOutlined, HeartOutlined, LogoutOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { disablePushForThisDevice } from '@/utils/push'
import { initials, saveSession, useSession } from '@/utils/session'

/** Profile picture (Google photo, or initials for mobile-number accounts). */
export function UserAvatar({ user, size = 34 }) {
  const [broken, setBroken] = useState(false)
  const style = { width: size, height: size }
  if (user.avatar && !broken) {
    return <img src={user.avatar} alt="" referrerPolicy="no-referrer" onError={() => setBroken(true)} style={style} className="shrink-0 rounded-full object-cover ring-2 ring-caramel/60" />
  }
  return (
    <span style={{ ...style, fontSize: size * 0.4 }} className="grid shrink-0 place-items-center rounded-full bg-terracotta font-semibold text-cream ring-2 ring-caramel/60">
      {initials(user.name)}
    </span>
  )
}

export async function logoutCustomer() {
  await disablePushForThisDevice() // stop this browser getting the account's notifications
  saveSession(null)
}

/** Navbar account button: login icon for guests, DP + menu once logged in. */
export default function UserMenu() {
  const session = useSession()
  const navigate = useNavigate()
  const { message } = App.useApp()

  if (!session) {
    return (
      <Link to="/login" className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition hover:bg-shell sm:flex" aria-label="Log in">
        <UserOutlined className="text-lg" />
        <span className="hidden lg:inline">Log in</span>
      </Link>
    )
  }

  const first = session.name?.split(' ')[0] ?? 'there'
  const items = [
    {
      key: 'who',
      disabled: true,
      label: (
        <div className="flex items-center gap-3 py-1">
          <UserAvatar user={session} size={40} />
          <div className="min-w-0 leading-tight">
            <p className="truncate font-semibold text-charcoal">{session.name}</p>
            <p className="truncate text-xs text-ash">{session.email || (session.phone ? `+91 ${session.phone}` : '')}</p>
          </div>
        </div>
      ),
    },
    { type: 'divider' },
    { key: '/login', icon: <UserOutlined />, label: 'My account' },
    { key: '/login#orders', icon: <ShoppingOutlined />, label: 'My orders' },
    { key: '/track-order', icon: <CarOutlined />, label: 'Track an order' },
    { key: '/wishlist', icon: <HeartOutlined />, label: 'Wishlist' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Log out', danger: true },
  ]

  const onClick = async ({ key }) => {
    if (key !== 'logout') return navigate(key)
    await logoutCustomer()
    message.success('You have been logged out.')
    navigate('/')
  }

  return (
    <Dropdown menu={{ items, onClick }} trigger={['click']} placement="bottomRight" overlayStyle={{ minWidth: 240 }}>
      <button type="button" aria-label={`Account menu for ${session.name}`} className="flex items-center gap-2 rounded-full py-1 pl-1 pr-1 transition hover:bg-shell lg:pr-3">
        <UserAvatar user={session} />
        <span className="hidden max-w-28 truncate text-sm font-medium lg:inline">Hi, {first}</span>
      </button>
    </Dropdown>
  )
}

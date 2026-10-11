import { useEffect, useState } from 'react'
import { SESSION_KEY } from '@/api/client'
import { readStorage, writeStorage } from '@/utils/format'

const EVENT = 'jy-session-change'

/** The logged-in customer ({ token, name, email, phone, avatar }) or null. Old offline sessions without a token don't count. */
export const getSession = () => {
  const s = readStorage(SESSION_KEY, null)
  return s?.token ? s : null
}

/** Saves (or clears with null) the session and tells every component — navbar, account page, checkout — right away. */
export function saveSession(next) {
  writeStorage(SESSION_KEY, next)
  window.dispatchEvent(new Event(EVENT))
}

/** Live session: updates on login/logout in this tab and in other open tabs. */
export function useSession() {
  const [session, setSession] = useState(getSession)
  useEffect(() => {
    const sync = () => setSession(getSession())
    const onStorage = (e) => e.key === SESSION_KEY && sync()
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', onStorage)
    }
  }, [])
  return session
}

export const initials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('') || '?'

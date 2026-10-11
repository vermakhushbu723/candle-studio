/**
 * Browser push notifications via Firebase Cloud Messaging.
 * Needs VITE_FIREBASE_* + VITE_FIREBASE_VAPID_KEY (Firebase Console → Project settings → Web app / Cloud Messaging).
 * Everything here is a no-op when Firebase isn't configured or the browser can't do push (e.g. iOS Safari outside a home-screen app).
 */
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging'
import { api } from '@/api/client'
import { firebaseApp, firebaseConfig as config } from '@/utils/firebase'

const FIREBASE_SDK_VERSION = '13.0.0' // keep in sync with package.json → firebase
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY
const TOKEN_KEY = 'jy-push-token'

export const pushConfigured = Boolean(config.apiKey && config.projectId && config.appId && config.messagingSenderId && VAPID_KEY)

let messagingPromise
const messaging = () =>
  (messagingPromise ??= (async () => {
    if (!pushConfigured || !(await isSupported())) return null
    return getMessaging(firebaseApp())
  })())

/** 'unsupported' | 'denied' | 'granted' | 'default' */
export async function pushStatus() {
  if (!(await messaging())) return 'unsupported'
  return Notification.permission
}

const deviceName = () => {
  const ua = navigator.userAgent
  const os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iOS' : /Windows/i.test(ua) ? 'Windows' : /Mac/i.test(ua) ? 'Mac' : 'Device'
  const browser = /Edg\//.test(ua) ? 'Edge' : /Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Browser'
  return `${browser} on ${os}`
}

const activated = (reg) =>
  reg.active
    ? Promise.resolve()
    : new Promise((resolve) => {
        const worker = reg.installing || reg.waiting
        if (!worker) return resolve()
        worker.addEventListener('statechange', () => worker.state === 'activated' && resolve())
        setTimeout(resolve, 10000) // never hang the UI
      })

let inflight
/** Asks permission (must be called from a click) and registers this browser for the logged-in customer. */
export function enablePush() {
  // Login and the account page may both ask at once — share one registration so only one token is created
  inflight ??= registerDevice().finally(() => (inflight = undefined))
  return inflight
}

async function registerDevice() {
  const m = await messaging()
  if (!m) throw new Error('Notifications aren’t available in this browser.')
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') throw new Error('Notifications are blocked. Allow them in your browser’s site settings.')
  const qs = new URLSearchParams({ ...config, v: FIREBASE_SDK_VERSION })
  const registration = await navigator.serviceWorker.register(`/firebase-messaging-sw.js?${qs}`)
  await activated(registration) // a brand-new worker can't take a push subscription until it is active
  const ask = () => getToken(m, { vapidKey: VAPID_KEY, serviceWorkerRegistration: registration })
  const token = await ask().catch(() => new Promise((r) => setTimeout(r, 2000)).then(ask)) // one retry for slow first installs
  if (!token) throw new Error('Could not turn on notifications. Please try again.')
  await api('/notifications/devices', { method: 'POST', body: { token, device: deviceName() } })
  try {
    // Firebase rotates tokens now and then — drop the old one so the account doesn't keep a dead device
    const previous = localStorage.getItem(TOKEN_KEY)
    if (previous && previous !== token) await api('/notifications/devices', { method: 'DELETE', body: { token: previous } }).catch(() => undefined)
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    /* storage unavailable */
  }
  return token
}

/** Unlinks this browser from the account (on logout). */
export async function disablePushForThisDevice() {
  let token
  try {
    token = localStorage.getItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    return
  }
  if (token) await api('/notifications/devices', { method: 'DELETE', body: { token } }).catch(() => undefined)
}

/** Re-registers silently on page load when permission was already given (tokens can rotate). */
export async function refreshPushToken() {
  if ((await pushStatus()) !== 'granted') return
  await enablePush().catch(() => undefined)
}

/** Shows notifications that arrive while the site is open in the foreground. */
export async function listenForeground(show) {
  const m = await messaging()
  if (!m) return () => {}
  return onMessage(m, (payload) => show({ title: payload.notification?.title, body: payload.notification?.body, link: payload.data?.link }))
}

/**
 * Device identity for one-per-device offers (Follow & Save).
 * - deviceId: random ID kept in localStorage and a 2-year cookie (survives one of them being cleared)
 * - fingerprint: hash of stable browser/phone traits, so a fully cleared browser on the same phone is still recognised
 */
const KEY = 'jy-device'

const readCookie = () => document.cookie.split('; ').find((c) => c.startsWith(`${KEY}=`))?.split('=')[1]
const writeCookie = (v) => {
  document.cookie = `${KEY}=${v}; path=/; max-age=${60 * 60 * 24 * 730}; SameSite=Lax; Secure`
}

export function getDeviceId() {
  let id = null
  try {
    id = localStorage.getItem(KEY)
  } catch {
    /* storage blocked */
  }
  id ||= readCookie()
  if (!id) id = crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`
  try {
    localStorage.setItem(KEY, id)
  } catch {
    /* storage blocked */
  }
  writeCookie(id)
  return id
}

export async function getFingerprint() {
  const n = navigator
  const traits = [
    n.userAgent,
    n.language,
    n.platform,
    n.hardwareConcurrency,
    n.deviceMemory,
    n.maxTouchPoints,
    screen.width,
    screen.height,
    screen.colorDepth,
    window.devicePixelRatio,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].join('|')
  try {
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(traits))
    return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 40)
  } catch {
    return undefined
  }
}

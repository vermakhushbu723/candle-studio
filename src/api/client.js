import { readStorage } from '@/utils/format'

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5050/api'
export const SESSION_KEY = 'cd-session'

/** Fetch wrapper for the Jyotessa API. Sends the customer's token when logged in. */
export async function api(path, { method = 'GET', body, query } = {}) {
  const url = new URL(API_URL + path)
  Object.entries(query ?? {}).forEach(([k, v]) => v != null && v !== '' && url.searchParams.set(k, v))
  const token = readStorage(SESSION_KEY, null)?.token

  let res
  try {
    res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new Error('We couldn’t reach our servers. Please check your connection and try again.')
  }
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    const error = new Error(json.message ?? 'Something went wrong. Please try again.')
    error.status = res.status
    throw error
  }
  return json
}

export const formatPrice = (value) => `₹${Number(value).toLocaleString('en-IN')}`

export const discountPercent = (price, compareAt) =>
  compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0

export const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}

import { site } from '@/data/site'

let loading
const loadScript = () =>
  (loading ??= new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve()
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = resolve
    s.onerror = () => {
      loading = undefined
      reject(new Error('Could not load the payment window. Please check your connection.'))
    }
    document.body.appendChild(s)
  }))

/**
 * Opens Razorpay Checkout for the options returned by the API (`razorpay` in POST /orders).
 * Resolves with { razorpay_order_id, razorpay_payment_id, razorpay_signature }; rejects if closed or failed.
 */
export async function payWithRazorpay(opts) {
  await loadScript()
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: opts.key,
      order_id: opts.orderId,
      amount: opts.amount,
      currency: opts.currency,
      name: site.name,
      description: 'Candle order',
      prefill: { ...opts.prefill, method: opts.method },
      theme: { color: '#6C2408' },
      handler: resolve,
      modal: { ondismiss: () => reject(Object.assign(new Error('Payment was not completed.'), { dismissed: true })) },
    })
    rzp.on('payment.failed', (r) => reject(new Error(r.error?.description || 'Payment failed. Please try again.')))
    rzp.open()
  })
}

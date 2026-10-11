/**
 * SMS OTP through Firebase Phone Auth — Google sends the SMS, the website checks the code,
 * and our API trusts only the Firebase ID token that comes out of it (POST /auth/phone/firebase).
 * Enabled with VITE_OTP_PROVIDER=firebase; otherwise the API's own (test-mode) OTP is used.
 */
import { RecaptchaVerifier, getAuth, inMemoryPersistence, setPersistence, signInWithPhoneNumber, signOut } from 'firebase/auth'
import { firebaseApp, firebaseConfigured } from '@/utils/firebase'

export const smsOtpEnabled = import.meta.env.VITE_OTP_PROVIDER === 'firebase' && firebaseConfigured

let auth
let verifier

const firebaseAuth = async () => {
  if (!auth) {
    auth = getAuth(firebaseApp())
    auth.languageCode = 'en'
    await setPersistence(auth, inMemoryPersistence) // we keep our own session; Firebase is only used to prove the number
  }
  return auth
}

const friendly = (e) =>
  ({
    'auth/invalid-phone-number': 'Please enter a valid 10-digit mobile number.',
    'auth/too-many-requests': 'Too many attempts from this device. Please try again after some time.',
    'auth/quota-exceeded': 'We’re sending too many OTPs right now. Please try again in a few minutes.',
    'auth/billing-not-enabled': 'OTP by SMS isn’t active yet. Please use Google sign-in for now.',
    'auth/operation-not-allowed': 'OTP by SMS isn’t active yet. Please use Google sign-in for now.',
    'auth/captcha-check-failed': 'Security check failed. Please refresh the page and try again.',
    'auth/invalid-app-credential': 'Security check failed. Please refresh the page and try again.',
    'auth/network-request-failed': 'Network problem. Please check your connection.',
    'auth/invalid-verification-code': 'Incorrect OTP. Please check the SMS and try again.',
    'auth/code-expired': 'This OTP has expired. Please request a new one.',
    'auth/missing-verification-code': 'Please enter the 6-digit OTP.',
  })[e?.code] ?? e?.message ?? 'Something went wrong. Please try again.'

/** Sends the SMS. `containerId` is an empty element for the invisible reCAPTCHA. Returns a confirmation for confirmSmsOtp(). */
export async function sendSmsOtp(phone, containerId) {
  const a = await firebaseAuth()
  try {
    verifier?.clear()
  } catch {
    /* already cleared */
  }
  verifier = new RecaptchaVerifier(a, containerId, { size: 'invisible' })
  try {
    return await signInWithPhoneNumber(a, `+91${phone}`, verifier)
  } catch (e) {
    throw new Error(friendly(e))
  }
}

/** Checks the 6-digit code and returns the Firebase ID token for our API. */
export async function confirmSmsOtp(confirmation, code) {
  try {
    const cred = await confirmation.confirm(code)
    const idToken = await cred.user.getIdToken()
    await signOut(await firebaseAuth())
    return idToken
  } catch (e) {
    throw new Error(friendly(e))
  }
}

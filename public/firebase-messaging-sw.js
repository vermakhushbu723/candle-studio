/* Firebase Cloud Messaging service worker — shows Jyotessa notifications when the site is closed or in the background.
 * The page registers it as /firebase-messaging-sw.js?<firebase config as query params> (see src/utils/push.js),
 * because a service worker cannot read Vite's env variables. */
const params = new URL(self.location.href).searchParams
const version = params.get('v') || '13.0.0'
importScripts(`https://www.gstatic.com/firebasejs/${version}/firebase-app-compat.js`)
importScripts(`https://www.gstatic.com/firebasejs/${version}/firebase-messaging-compat.js`)

firebase.initializeApp({
  apiKey: params.get('apiKey'),
  authDomain: params.get('authDomain'),
  projectId: params.get('projectId'),
  messagingSenderId: params.get('messagingSenderId'),
  appId: params.get('appId'),
})

// Messages with a `notification` payload are displayed by the browser automatically (icon + link come from the API).
firebase.messaging()

// Open (or focus) the right page when a notification is tapped
self.addEventListener('notificationclick', (event) => {
  const link = event.notification?.data?.FCM_MSG?.data?.link || event.notification?.data?.link || '/'
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      const same = wins.find((w) => w.url === link)
      return same ? same.focus() : clients.openWindow(link)
    }),
  )
})

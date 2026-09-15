import { App as AntApp, ConfigProvider } from 'antd'
import { antdTheme } from '@/theme/antdTheme'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import AppRoutes from '@/routes/AppRoutes'

export default function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <AntApp>
        <WishlistProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </WishlistProvider>
      </AntApp>
    </ConfigProvider>
  )
}

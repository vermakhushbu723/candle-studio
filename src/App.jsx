import { App as AntApp, ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { antdTheme } from '@/theme/antdTheme'
import { CatalogProvider } from '@/context/CatalogContext'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import AppRoutes from '@/routes/AppRoutes'

export default function App() {
  return (
    // `layer` puts antd's CSS in @layer antd (ordered in styles/index.css) so Tailwind classes override it
    <StyleProvider layer>
      <ConfigProvider theme={antdTheme}>
        <AntApp>
          <CatalogProvider>
            <WishlistProvider>
              <CartProvider>
                <AppRoutes />
              </CartProvider>
            </WishlistProvider>
          </CatalogProvider>
        </AntApp>
      </ConfigProvider>
    </StyleProvider>
  )
}

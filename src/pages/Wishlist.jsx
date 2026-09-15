import { Link } from 'react-router-dom'
import { Button, Empty } from 'antd'
import PageHeader from '@/components/common/PageHeader'
import { siteImages } from '@/data/site'
import ProductCard from '@/components/common/ProductCard'
import { useWishlist } from '@/context/WishlistContext'
import { getProduct } from '@/data/products'

export default function Wishlist() {
  const { ids } = useWishlist()
  const items = ids.map(getProduct).filter(Boolean)

  return (
    <>
      <PageHeader image={siteImages.daisy} eyebrow="Saved" title="Your wishlist" subtitle="Candles you’ve fallen for — ready whenever you are." crumbs={[{ label: 'Wishlist' }]} />
      <section className="wrap py-14">
        {items.length === 0 ? (
          <Empty className="py-20" description="Tap the heart on any candle to save it here">
            <Link to="/shop"><Button type="primary" size="large">Browse candles</Button></Link>
          </Empty>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </section>
    </>
  )
}

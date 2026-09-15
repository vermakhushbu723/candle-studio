import { Link } from 'react-router-dom'
import { Button } from 'antd'
import CandleVisual from '@/components/common/CandleVisual'

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[70vh] place-items-center py-16 text-center">
      <div>
        <div className="mx-auto w-48">
          <CandleVisual visual={{ shape: 'jar', bg: 'transparent', vessel: '#EADBC8', wax: '#FFF9F5', pearls: true }} lit={false} />
        </div>
        <p className="eyebrow mt-6">404</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">This page blew out</h1>
        <p className="mt-3 text-ash">The page you’re looking for doesn’t exist or has moved.</p>
        <Link to="/"><Button type="primary" size="large" shape="round" className="mt-8">Relight the homepage</Button></Link>
      </div>
    </section>
  )
}

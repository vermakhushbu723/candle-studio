import CandleVisual from './CandleVisual'

export default function PageLoader() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="w-28">
        <CandleVisual visual={{ shape: 'jar', bg: 'transparent', vessel: '#EADBC8', wax: '#FFF9F5', pearls: true }} />
      </div>
    </div>
  )
}

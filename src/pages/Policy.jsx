import { Link, useParams } from 'react-router-dom'
import { Anchor, Button, Result } from 'antd'
import PageHeader from '@/components/common/PageHeader'
import { siteImages } from '@/data/site'
import { policies } from '@/data/content'
import { useCatalog } from '@/context/CatalogContext'
import { fillShipping } from '@/utils/shipping'

export default function Policy() {
  const { id } = useParams()
  const { shipping } = useCatalog()
  const policy = policies[id]
  if (!policy) return <Result status="404" title="Policy not found" extra={<Link to="/"><Button type="primary">Go home</Button></Link>} />

  return (
    <>
      <PageHeader image={siteImages.modak} eyebrow="Policies" title={policy.title} crumbs={[{ label: policy.title }]} />
      <section className="wrap grid grid-cols-1 gap-7 py-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <Anchor offsetTop={110} items={policy.sections.map((s, i) => ({ key: i, href: `#section-${i}`, title: s.heading }))} />
        </aside>
        <div className="max-w-3xl space-y-6">
          {policy.sections.map((s, i) => (
            <div key={s.heading} id={`section-${i}`} className="scroll-mt-28">
              <h2 className="font-serif text-2xl">{i + 1}. {s.heading}</h2>
              <p className="mt-3 leading-relaxed text-ash">{fillShipping(s.text, shipping)}</p>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 border-t border-linen pt-8">
            {Object.entries(policies).filter(([key]) => key !== id).map(([key, p]) => (
              <Link key={key} to={`/policies/${key}`}><Button shape="round">{p.title}</Button></Link>
            ))}
            <Link to="/disclaimer"><Button shape="round">Disclaimer</Button></Link>
          </div>
        </div>
      </section>
    </>
  )
}

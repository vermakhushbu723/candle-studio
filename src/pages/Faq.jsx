import { useState } from 'react'
import { Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import { siteImages } from '@/data/site'
import { FaqList } from '@/components/home/FaqPreview'
import { faqs } from '@/data/content'

export default function Faq() {
  const [query, setQuery] = useState('')
  const q = query.toLowerCase()
  const groups = faqs
    .map((g) => ({ ...g, items: g.items.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q)) }))
    .filter((g) => g.items.length)

  return (
    <>
      <PageHeader image={siteImages.stepPour} eyebrow="Help centre" title="Frequently Asked Questions" subtitle="Everything about pearled wax, handcrafted candles, shipping and returns." crumbs={[{ label: 'FAQs' }]} />
      <section className="wrap max-w-4xl! py-16">
        <Input size="large" allowClear prefix={<SearchOutlined />} placeholder="Search questions…" value={query} onChange={(e) => setQuery(e.target.value)} />
        {groups.map((g) => (
          <div key={g.group} className="mt-12">
            <p className="eyebrow mb-4">{g.group}</p>
            <FaqList items={g.items} />
          </div>
        ))}
        {groups.length === 0 && <p className="mt-12 text-center text-ash">No questions match “{query}”.</p>}
        <div className="mt-16 rounded-4xl bg-shell p-10 text-center">
          <h3 className="font-serif text-2xl">Still have a question?</h3>
          <p className="mt-2 text-ash">Our team replies within 24 hours.</p>
          <Link to="/contact"><Button type="primary" size="large" shape="round" className="mt-6">Contact us</Button></Link>
        </div>
      </section>
    </>
  )
}

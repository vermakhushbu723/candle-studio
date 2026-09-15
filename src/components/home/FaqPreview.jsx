import { Button, Collapse } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import SectionHeading from '@/components/common/SectionHeading'
import { faqs } from '@/data/content'

export default function FaqPreview() {
  const items = faqs.flatMap((g) => g.items).slice(0, 5)
  return (
    <section className="py-20 md:py-28">
      <div className="wrap max-w-4xl!">
        <SectionHeading eyebrow="Good questions" title="Frequently Asked Questions" subtitle="Everything people ask us before their first order." />
        <FaqList items={items} className="mt-12" />
        <div className="mt-10 text-center">
          <Link to="/faq"><Button shape="round" size="large">See all FAQs</Button></Link>
        </div>
      </div>
    </section>
  )
}

export function FaqList({ items, className = '' }) {
  return (
    <Collapse
      accordion
      bordered={false}
      expandIconPlacement="end"
      className={className}
      expandIcon={({ isActive }) => <PlusOutlined className={`text-terracotta transition-transform duration-300 ${isActive ? 'rotate-45' : ''}`} />}
      items={items.map((f, i) => ({
        key: i,
        label: <span className="font-serif text-lg">{f.q}</span>,
        children: <p className="leading-relaxed text-ash">{f.a}</p>,
        className: 'mb-3 rounded-2xl! border border-linen bg-white',
      }))}
    />
  )
}

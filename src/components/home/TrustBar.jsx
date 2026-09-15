import { CarOutlined, CreditCardOutlined, GiftOutlined, SafetyCertificateOutlined } from '@ant-design/icons'

const perks = [
  { icon: CarOutlined, title: 'Free shipping', text: 'On orders above ₹899' },
  { icon: CreditCardOutlined, title: 'COD available', text: '22,000+ pin codes' },
  { icon: SafetyCertificateOutlined, title: '100% soy wax', text: 'No paraffin, no soot' },
  { icon: GiftOutlined, title: 'Gift-ready', text: 'Keepsake packaging' },
]

export default function TrustBar() {
  return (
    <section className="wrap grid grid-cols-2 gap-4 py-12 lg:grid-cols-4">
      {perks.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex items-center gap-4 rounded-2xl border border-linen bg-white p-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sand text-xl text-terracotta"><Icon /></span>
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-xs text-ash">{text}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

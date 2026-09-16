import { CarOutlined, CreditCardOutlined, GiftOutlined, SafetyCertificateOutlined } from '@ant-design/icons'

const perks = [
  { icon: CarOutlined, title: 'Free shipping', text: 'On orders above ₹899' },
  { icon: CreditCardOutlined, title: 'COD available', text: '22,000+ pin codes' },
  { icon: SafetyCertificateOutlined, title: '100% soy wax', text: 'No paraffin, no soot' },
  { icon: GiftOutlined, title: 'Gift-ready', text: 'Keepsake packaging' },
]

export default function TrustBar() {
  return (
    <section className="wrap grid grid-cols-2 gap-3 py-12 sm:gap-4 lg:grid-cols-4">
      {perks.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex flex-col items-center gap-2 rounded-2xl border border-linen bg-white p-4 text-center sm:flex-row sm:gap-4 sm:p-5 sm:text-left">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sand text-lg text-terracotta sm:h-12 sm:w-12 sm:text-xl">
            <Icon />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold sm:text-base">{title}</p>
            <p className="text-xs text-ash">{text}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

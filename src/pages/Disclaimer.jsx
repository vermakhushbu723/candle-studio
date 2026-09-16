import { Link } from 'react-router-dom'
import { Anchor, Button } from 'antd'
import { motion } from 'framer-motion'
import PageHeader from '@/components/common/PageHeader'
import { site, siteImages } from '@/data/site'

const updated = '1 August 2026'

const sections = [
  {
    heading: 'Open Flame & Product Safety',
    bullets: [
      'Our candles involve a genuine open flame. Never leave a lit candle unattended, and always burn it on a stable, heat-safe surface away from curtains, paper and other flammable material.',
      'Keep burning candles and loose wax pearls out of reach of young children and pets. Adult supervision is required at all times while a candle is lit.',
      'The auto-extinguish behaviour described on this site reduces spill risk under normal use — it is not a guarantee against fire in every circumstance, and it does not remove the need for the usual candle-safety precautions above.',
      'Fragrance oils and dyes should be kept away from eyes and broken skin, and used only in the quantities suggested. Discontinue use if irritation occurs.',
    ],
  },
  {
    heading: 'Website Content',
    bullets: [
      'We try to keep product descriptions, pricing and imagery accurate and up to date, but we do not warrant that every detail on this website is complete, current or error-free.',
      'Photographs are for illustration — actual pearl colour, jar shape and included decor may vary slightly by batch.',
      'Customer reviews and testimonials reflect individual experiences. They are not a guarantee that you will have the same result.',
    ],
  },
  {
    heading: 'External Links',
    body: `This site may link to third-party pages, such as our Instagram, Pinterest or WhatsApp. ${site.name} does not control and is not responsible for the content, policies or practices of any third-party site.`,
  },
  {
    heading: 'Limitation of Liability',
    bullets: [
      `To the fullest extent permitted by law, ${site.name} is not liable for any indirect, incidental or consequential loss or damage arising from the use, or inability to use, our products or this website, including damage caused by misuse or by ignoring the safety guidance above.`,
      'Nothing in this disclaimer limits any right you have under applicable Indian consumer-protection law, including your rights under our Return, Refund & Replacement Policy.',
    ],
  },
]

export default function Disclaimer() {
  return (
    <>
      <PageHeader
        image={siteImages.modak}
        eyebrow="Legal"
        title="Disclaimer"
        subtitle={`The information on this website is provided by ${site.name} in good faith. By using this website or buying our products, you agree to the disclaimers below.`}
        crumbs={[{ label: 'Disclaimer' }]}
      />

      <section className="wrap grid gap-12 py-16 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <Anchor
            offsetTop={110}
            items={[...sections, { heading: 'Contact Us' }].map((s, i) => ({ key: i, href: `#disclaimer-${i}`, title: s.heading }))}
          />
        </aside>

        <div className="max-w-3xl space-y-10">
          <p className="text-sm text-ash">Last updated: {updated}</p>

          {sections.map((s, i) => (
            <motion.div
              key={s.heading}
              id={`disclaimer-${i}`}
              className="scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-2xl">{i + 1}. {s.heading}</h2>
              {s.body && <p className="mt-3 leading-relaxed text-ash">{s.body}</p>}
              {s.bullets && (
                <ul className="mt-4 list-disc space-y-2.5 pl-5 leading-relaxed text-ash marker:text-terracotta">
                  {s.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              )}
            </motion.div>
          ))}

          <div id={`disclaimer-${sections.length}`} className="scroll-mt-28 rounded-3xl border border-linen bg-shell p-6 md:p-8">
            <h2 className="font-serif text-2xl">{sections.length + 1}. Contact Us</h2>
            <p className="mt-3 text-ash">Questions about this disclaimer can be sent to:</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[auto_1fr] sm:gap-x-6">
              <dt className="font-semibold">Email</dt>
              <dd className="text-ash"><a href={`mailto:${site.supportEmail}`} className="hover:text-terracotta">{site.supportEmail}</a></dd>
              <dt className="font-semibold">Phone / WhatsApp</dt>
              <dd className="text-ash"><a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-terracotta">{site.phone}</a></dd>
              <dt className="font-semibold">Working hours</dt>
              <dd className="text-ash">{site.hours}</dd>
            </dl>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-linen pt-8">
            {[
              ['Shipping Policy', '/policies/shipping'],
              ['Returns & Refunds', '/policies/returns'],
              ['Privacy Policy', '/policies/privacy'],
              ['Terms of Service', '/policies/terms'],
            ].map(([label, to]) => (
              <Link key={to} to={to}><Button shape="round">{label}</Button></Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

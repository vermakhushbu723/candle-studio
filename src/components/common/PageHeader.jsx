import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function PageHeader({ eyebrow, title, subtitle, crumbs = [], image }) {
  return (
    <section className="grain relative overflow-hidden border-b border-linen bg-shell">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sand blur-3xl" />
      <div className={`wrap relative grid items-center gap-10 py-12 md:py-16 ${image ? 'lg:grid-cols-[1.2fr_1fr]' : ''}`}>
        <div>
          <Breadcrumb items={[{ title: <Link to="/">Home</Link> }, ...crumbs.map((c) => ({ title: c.to ? <Link to={c.to}>{c.label}</Link> : c.label }))]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
            <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-6xl">{title}</h1>
            {subtitle && <p className="mt-4 max-w-2xl text-ash md:text-lg">{subtitle}</p>}
          </motion.div>
        </div>
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease }}
            className="relative hidden aspect-[4/3] overflow-hidden rounded-4xl shadow-[0_30px_80px_-30px_rgba(139,94,60,0.45)] lg:block"
          >
            <img src={image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-charcoal/20 to-transparent" />
          </motion.div>
        )}
      </div>
    </section>
  )
}

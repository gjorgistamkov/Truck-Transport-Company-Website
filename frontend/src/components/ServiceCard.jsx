import { motion } from 'framer-motion'
import { Card } from './Card.jsx'

export function ServiceCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <Card className="h-full transition-transform duration-300 hover:scale-[1.04] hover:shadow-xl hover:shadow-slate-900/10">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-500/15 text-accent-500 ring-1 ring-accent-500/25">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <div className="text-lg font-extrabold text-primary">{title}</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}


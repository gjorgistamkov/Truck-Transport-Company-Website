import { motion } from 'framer-motion'
import { SectionWrapper } from '../components/SectionWrapper.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { ServiceCard } from '../components/ServiceCard.jsx'
import { services } from '../data/content.js'

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' }
}

export function ServicesPage() {
  const heroImage =
    'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=2400&q=80'
  return (
    <div className="bg-gray-50">
      <section className="relative overflow-hidden border-b border-slate-200">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/60 to-transparent" />
        <SectionWrapper className="relative py-16 md:py-20">
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="Services"
              title="Solutions for every transport scenario"
              description="Frigo transport across Europe with fast and safe on-time delivery."
              variant="dark"
            />
          </motion.div>
        </SectionWrapper>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <SectionWrapper>
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="What we do"
              title="International Europe transport with frigo trucks"
              description="We provide refrigerated transport and professional logistics support for your cargo."
            />
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.key} icon={s.icon} title={s.title} description={s.description} />
            ))}
          </div>
        </SectionWrapper>
      </section>
    </div>
  )
}


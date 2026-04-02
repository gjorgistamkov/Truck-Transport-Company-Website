import { motion } from 'framer-motion'
import { Card } from '../components/Card.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { SectionWrapper } from '../components/SectionWrapper.jsx'
import { fleetItems } from '../data/content.js'
import diviTruck1 from '../assets/divi/divi-truck-1.jpg'
import diviTruck2 from '../assets/divi/divi-truck-2.jpg'

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' }
}

export function FleetPage() {
  const heroImage =
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2400&q=80'
  // Source: https://divitransport.wordpress.com/ (downloaded to local assets)
  const fleetImages = {
    'Frigo Truck (Refrigerated)': diviTruck1,
    'Tractor + Trailer': diviTruck2
  }

  return (
    <div className="bg-gray-50">
      <section className="relative overflow-hidden border-b border-slate-200">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/60 to-transparent" />
        <SectionWrapper className="relative py-16 md:py-20">
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="Fleet"
              title="A modern fleet for diverse cargo"
              description="Showcase your truck types with real photos and precise specs."
              variant="dark"
            />
          </motion.div>
        </SectionWrapper>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <SectionWrapper>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fleetItems.map((f) => (
              <motion.div key={f.title} {...fadeUp}>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                  <div className="relative">
                    <img
                      src={fleetImages[f.title] || diviTruck1}
                      alt=""
                      className="h-56 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="text-lg font-extrabold text-primary">{f.title}</div>
                    <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                      {f.specs.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-500" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </section>
    </div>
  )
}


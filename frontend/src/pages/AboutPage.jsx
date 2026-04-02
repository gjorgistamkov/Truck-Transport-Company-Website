import { motion } from 'framer-motion'
import { Card } from '../components/Card.jsx'
import { SectionWrapper } from '../components/SectionWrapper.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { company } from '../data/content.js'

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' }
}

export function AboutPage() {
  const heroImage =
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=2400&q=80'
  return (
    <div className="bg-gray-50">
      <section className="relative overflow-hidden border-b border-slate-200">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/60 to-transparent" />
        <SectionWrapper className="relative py-16 md:py-20">
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="About us"
              title="DI-VI Transport — built on reliability"
              description="We are a transport company with frigo trucks, providing transport in Europe with fast and safe on-time delivery."
              variant="dark"
            />
          </motion.div>
        </SectionWrapper>
      </section>

      <section className="py-16 md:py-20">
        <SectionWrapper className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <motion.div {...fadeUp} className="lg:col-span-7 space-y-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-primary">Our story</h3>
            <p className="text-slate-700 leading-relaxed">
              DI-VI Transport is based in {company.locationShort}. We provide international transport across Europe with
              frigo trucks.
            </p>
            <p className="text-slate-700 leading-relaxed">
              We offer fast and safe transport and delivery on time, and all vehicles have CEMT/ECMT certificates.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 pt-4">
              <Card className="p-6">
                <div className="text-sm font-bold text-primary">Mission</div>
                <p className="mt-2 text-sm text-slate-600">
                  Provide fast and safe transport across Europe with on-time delivery.
                </p>
              </Card>
              <Card className="p-6">
                <div className="text-sm font-bold text-primary">Vision</div>
                <p className="mt-2 text-sm text-slate-600">
                  Build long-term partnerships through reliability, safety, and professional service.
                </p>
              </Card>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="lg:col-span-5">
            <Card className="p-6">
              <div className="text-sm font-bold text-primary">Experience</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Strong operational routines, careful planning, and a practical approach to problem solving.
              </p>
              <div className="mt-6 grid gap-3 text-sm">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <span className="text-slate-700">International routes</span>
                  <span className="text-primary font-extrabold">EU</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <span className="text-slate-700">Customer communication</span>
                  <span className="text-primary font-extrabold">Proactive</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <span className="text-slate-700">Cargo handling</span>
                  <span className="text-primary font-extrabold">Safe</span>
                </div>
              </div>
              <p className="mt-6 text-xs text-slate-500">
                Replace the text and imagery with your exact company history and certifications.
              </p>
            </Card>
          </motion.div>
        </SectionWrapper>
      </section>
    </div>
  )
}


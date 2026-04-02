import { motion } from 'framer-motion'
import { Card } from '../components/Card.jsx'
import { CTASection } from '../components/CTASection.jsx'
import { HeroSection } from '../components/HeroSection.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { SectionWrapper } from '../components/SectionWrapper.jsx'
import { ServiceCard } from '../components/ServiceCard.jsx'
import { Button } from '../components/Button.jsx'
import diviTruck1 from '../assets/divi/divi-truck-1.jpg'
import diviTruck2 from '../assets/divi/divi-truck-2.jpg'
import { brand, company, services, testimonials, whyChooseUs } from '../data/content.js'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' }
}

// Source: https://divitransport.wordpress.com/ (downloaded to local assets)
const heroImage = diviTruck1
// Source: https://divitransport.wordpress.com/ (downloaded to local assets)
const aboutImage = diviTruck2

export function HomePage() {
  return (
    <div className="bg-gray-50">
      <HeroSection
        backgroundImage={heroImage}
        eyebrow="Fast. Safe. On time."
        title={brand.name}
        subtitle="We are a transport company with frigo trucks, providing transport across Europe with fast and safe on-time delivery."
        //primaryCta={{ text: 'Request a Quote', to: '/quote' }}
        //secondaryCta={{ text: 'Contact Us', to: '/contact' }}

        primaryCta={{ text: 'Contact Us', to: '/contact' }}
      />

      <section className="py-16 md:py-20">
        <SectionWrapper>
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="Services"
              title="Transport services across Europe"
              description="International transport with frigo trucks, on-time delivery, and certified vehicles."
            />
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.key} icon={s.icon} title={s.title} description={s.description} />
            ))}
          </div>

          <div className="mt-10">
            <Button as="link" to="/services" variant="secondary">
              Explore all services
            </Button>
          </div>
        </SectionWrapper>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <SectionWrapper>
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="Why choose us"
              title="Fast and safe delivery, on time"
              description="We focus on safe transport and reliable delivery. All vehicles have CEMT/ECMT certificates."
            />
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => {
              const Icon = item.icon
              return (
                <motion.div key={item.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.02 }}>
                  <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-0.5">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-500/15 text-accent-500 ring-1 ring-accent-500/25">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-lg font-extrabold text-primary">{item.title}</div>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </SectionWrapper>
      </section>

      <section className="py-16 md:py-20">
        <SectionWrapper>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeUp}>
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
                <img src={aboutImage} alt="" className="h-[380px] w-full object-cover" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div {...fadeUp}>
              <SectionHeading
                eyebrow="About DI-VI"
                title="About us"
                description={`DI-VI Transport is based in ${company.locationShort}. We work mostly with ${company.lanes
                  .slice(0, 6)
                  .join(', ')} and other European countries.`}
              />

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Card className="p-5">
                  <div className="text-sm font-bold text-slate-700">Dispatch support</div>
                  <div className="mt-2 text-2xl font-black text-primary">24/7</div>
                </Card>
                <Card className="p-5">
                  <div className="text-sm font-bold text-slate-700">Cross-border coverage</div>
                  <div className="mt-2 text-2xl font-black text-primary">EU</div>
                </Card>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button as="link" to="/about" variant="secondary" className="w-full sm:w-auto">
                  Learn more
                </Button>
                {/*<Button as="link" to="/quote" variant="primary" className="w-full sm:w-auto">
                  Request a quote
                </Button> */}
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <SectionWrapper>
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="Testimonials"
              title="Trusted by teams that ship daily"
              description="Static testimonials for now—ready to connect to a CMS or review feed later."
            />
          </motion.div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, idx) => (
              <motion.div key={t.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: idx * 0.03 }}>
                <Card className="h-full">
                  <p className="text-sm leading-relaxed text-slate-600">“{t.quote}”</p>
                  <div className="mt-5 text-xs font-semibold text-slate-500">
                    <span className="text-primary">{t.name}</span> · {t.company}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      <CTASection
        title="Move your cargo with confidence"
        subtitle="Tell us pickup & delivery details and we’ll respond quickly with clear next steps."
        //to="/quote"
        //buttonText="Request a Quote"
        to="/contact"
        buttonText="Contact Us"
      />

      <section className="py-16 md:py-20">
        <SectionWrapper className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div {...fadeUp} className="lg:col-span-7">
            <SectionHeading
              eyebrow="Contact preview"
              title="Need direct support from our dispatch team?"
              description="Prefer email or phone? We coordinate immediately and keep you updated throughout the shipment."
            />
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.02 }} className="lg:col-span-5">
            <Card className="p-7">
              <div className="text-lg font-extrabold text-primary">Get in touch</div>
              <p className="mt-2 text-sm text-slate-600">
                Want pricing or availability? Submit the quote request or contact us for a direct conversation.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button as="link" to="/contact" variant="secondary">
                  Contact us
                </Button>
                {/*<Button as="link" to="/quote" variant="primary">
                  Quote form
                </Button>*/}
              </div>
            </Card>
          </motion.div>
        </SectionWrapper>
      </section>
    </div>
  )
}


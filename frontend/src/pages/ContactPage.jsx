import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../components/Button.jsx'
import { Card } from '../components/Card.jsx'
import { Field } from '../components/Field.jsx'
import { SectionWrapper } from '../components/SectionWrapper.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { company } from '../data/content.js'

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' }
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Valid email is required.'
  if (!form.message.trim()) errors.message = 'Message is required.'
  return errors
}

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSending, setIsSending] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setIsSending(true)
    try {
      // Placeholder for real email integration; keeps UX consistent.
      await new Promise((r) => setTimeout(r, 700))
      toast.success('Message sent. We will contact you shortly.')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="bg-gray-50">
      <section className="relative overflow-hidden border-b border-slate-200">
        {/*<img
          src="https://images.unsplash.com/photo-1473968512647-3d1fd9b7a5f0?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />*/}
        <div className="absolute inset-0 bg-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/60 to-transparent" />
        <SectionWrapper className="relative py-16 md:py-20">
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s talk about your next shipment"
              description="Send us a message or use the quote form for pricing. We respond quickly."
              variant="dark"
            />
          </motion.div>
        </SectionWrapper>
      </section>

      <section className="py-16 md:py-20">
        <SectionWrapper className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <motion.div {...fadeUp} className="lg:col-span-7">
            <Card className="p-7">
              <form onSubmit={onSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" error={errors.name}>
                    <input
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@company.com"
                      type="email"
                    />
                  </Field>
                </div>
                <Field label="Phone (optional)">
                  <input
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+000 000 000"
                  />
                </Field>
                <Field label="Message" error={errors.message}>
                  <textarea
                    className="min-h-32 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us what you need transported..."
                  />
                </Field>
                <Button type="submit" variant="primary" disabled={isSending} className="w-full sm:w-auto">
                  {isSending ? 'Sending…' : 'Send message'}
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="lg:col-span-5">
            <div className="grid gap-6">
              <Card className="p-6">
                <div className="text-lg font-extrabold text-primary">Company details</div>
                <div className="mt-4 grid gap-2 text-sm text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800">Address:</span> {company.locationAddress}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Viber:</span> {company.phones.viber.join(', ')}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">WhatsApp:</span> {company.phones.whatsapp.join(', ')}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Email:</span> {company.email}
                  </div>
                </div>
              </Card>

              <Card className="p-0 overflow-hidden">
                <iframe
                  title="Map"
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=%D0%A1%D1%82%D0%BE%D1%98%D0%B0%D0%BA%D0%BE%D0%B2%D0%BE%201489&output=embed"
                />
              </Card>
            </div>
          </motion.div>
        </SectionWrapper>
      </section>
    </div>
  )
}


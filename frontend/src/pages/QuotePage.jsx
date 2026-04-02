import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../components/Button.jsx'
import { Card } from '../components/Card.jsx'
import { Field } from '../components/Field.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { SectionWrapper } from '../components/SectionWrapper.jsx'
import { createQuoteRequest } from '../services/quotes.js'
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
  if (!form.pickupLocation.trim()) errors.pickupLocation = 'Pickup location is required.'
  if (!form.deliveryLocation.trim()) errors.deliveryLocation = 'Delivery location is required.'
  if (!form.goodsType.trim()) errors.goodsType = 'Type of goods is required.'
  if (!form.weight) errors.weight = 'Weight is required.'
  if (!form.date) errors.date = 'Date is required.'
  return errors
}

export function QuotePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    pickupLocation: '',
    deliveryLocation: '',
    goodsType: '',
    weight: '',
    date: '',
    notes: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), [])

  async function onSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setIsSubmitting(true)
    try {
      const payload = {
        ...form,
        weight: Number(form.weight)
      }
      await createQuoteRequest(payload)
      toast.success('Quote request submitted. We will contact you shortly.')
      setForm({
        name: '',
        email: '',
        phone: '',
        pickupLocation: '',
        deliveryLocation: '',
        goodsType: '',
        weight: '',
        date: '',
        notes: ''
      })
      setErrors({})
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to submit quote request.'
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50">
      <section className="relative overflow-hidden border-b border-slate-200">
        <img
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/60 to-transparent" />
        <SectionWrapper className="relative py-16 md:py-20">
          <motion.div {...fadeUp}>
            <SectionHeading
              eyebrow="Request a quote"
              title="Fast, clear pricing for your shipment"
              description="Fill in the details below. Your request is stored securely and reviewed by our team."
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

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Pickup location" error={errors.pickupLocation}>
                    <input
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                      value={form.pickupLocation}
                      onChange={(e) => setForm((f) => ({ ...f, pickupLocation: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </Field>
                  <Field label="Delivery location" error={errors.deliveryLocation}>
                    <input
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                      value={form.deliveryLocation}
                      onChange={(e) => setForm((f) => ({ ...f, deliveryLocation: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Type of goods" error={errors.goodsType}>
                    <input
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                      value={form.goodsType}
                      onChange={(e) => setForm((f) => ({ ...f, goodsType: e.target.value }))}
                      placeholder="Pallets, food, machinery..."
                    />
                  </Field>
                  <Field label="Weight (kg)" error={errors.weight}>
                    <input
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                      value={form.weight}
                      onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
                      placeholder="e.g. 12000"
                      inputMode="numeric"
                    />
                  </Field>
                  <Field label="Date" error={errors.date} hint="Pickup date">
                    <input
                      className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                      value={form.date}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                      type="date"
                      min={minDate}
                    />
                  </Field>
                </div>

                <Field label="Additional notes (optional)">
                  <textarea
                    className="min-h-32 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Loading requirements, temperature, deadlines..."
                  />
                </Field>

                <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? 'Submitting…' : 'Submit request'}
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="lg:col-span-5">
            <Card className="p-6">
              <div className="text-lg font-extrabold text-primary">What happens next?</div>
              <ul className="mt-4 grid gap-3 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-500" />
                  We review your request and check capacity.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-500" />
                  We contact you with price and timeline.
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-500" />
                  After confirmation, dispatch coordinates pickup.
                </li>
              </ul>
              <p className="mt-5 text-xs text-slate-500">
                Admin users can review, process, and delete requests in the dashboard.
              </p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-slate-800">Direct contact</div>
                <div className="mt-2">Email: {company.email}</div>
                <div className="mt-1">Viber: {company.phones.viber.join(', ')}</div>
                <div className="mt-1">WhatsApp: {company.phones.whatsapp.join(', ')}</div>
              </div>
            </Card>
          </motion.div>
        </SectionWrapper>
      </section>
    </div>
  )
}


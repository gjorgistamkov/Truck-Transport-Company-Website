import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '../components/Button.jsx'
import { Card } from '../components/Card.jsx'
import { Field } from '../components/Field.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { SectionWrapper } from '../components/SectionWrapper.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { loginAdmin } from '../services/auth.js'

function validate(form) {
  const errors = {}
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Valid email is required.'
  if (!form.password) errors.password = 'Password is required.'
  return errors
}

export function AdminLoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/admin', { replace: true })
  }, [isAuthenticated, navigate])

  async function onSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setIsSubmitting(true)
    try {
      const data = await loginAdmin(form)
      login({ token: data.token, adminEmail: data.admin?.email || form.email })
      toast.success('Welcome back.')
      navigate('/admin', { replace: true })
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed.'
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50">
      <section className="border-b border-slate-200 bg-white">
        <SectionWrapper className="py-14">
          <SectionHeading
            eyebrow="Admin"
            title="Sign in"
            description="Access the quote request dashboard."
          />
        </SectionWrapper>
      </section>

      <section className="py-16">
        <SectionWrapper className="max-w-md">
          <Card className="p-7">
            <form onSubmit={onSubmit} className="grid gap-5">
              <Field label="Email" error={errors.email}>
                <input
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="admin@company.com"
                  type="email"
                />
              </Field>
              <Field label="Password" error={errors.password}>
                <input
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  type="password"
                />
              </Field>
              <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </Button>
              <p className="text-xs text-slate-400">
                Credentials are configured in the backend. Use the seed script to create your first admin.
              </p>
            </form>
          </Card>
        </SectionWrapper>
      </section>
    </div>
  )
}


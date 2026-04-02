import { Check, LogOut, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../components/Button.jsx'
import { Card } from '../components/Card.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { SectionWrapper } from '../components/SectionWrapper.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { deleteQuoteRequest, listQuoteRequests, updateQuoteRequestStatus } from '../services/quotes.js'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export function AdminDashboardPage() {
  const { adminEmail, logout } = useAuth()
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionId, setActionId] = useState(null)

  const stats = useMemo(() => {
    const pending = items.filter((i) => i.status === 'pending').length
    const processed = items.filter((i) => i.status === 'processed').length
    return { total: items.length, pending, processed }
  }, [items])

  async function refresh() {
    setIsLoading(true)
    try {
      const data = await listQuoteRequests()
      setItems(Array.isArray(data?.items) ? data.items : data)
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to load quote requests.'
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  async function markProcessed(id) {
    setActionId(id)
    try {
      await updateQuoteRequestStatus(id, 'processed')
      toast.success('Marked as processed.')
      await refresh()
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to update.'
      toast.error(msg)
    } finally {
      setActionId(null)
    }
  }

  async function remove(id) {
    setActionId(id)
    try {
      await deleteQuoteRequest(id)
      toast.success('Deleted.')
      setItems((prev) => prev.filter((x) => x._id !== id))
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to delete.'
      toast.error(msg)
    } finally {
      setActionId(null)
    }
  }

  return (
    <div className="bg-gray-50">
      <section className="border-b border-slate-200 bg-white">
        <SectionWrapper className="py-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Admin dashboard"
            title="Quote requests"
            description="Review incoming quote requests and track processing status."
          />
          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-400 hidden sm:block">{adminEmail || 'admin'}</div>
            <button
              type="button"
              onClick={() => {
                logout()
                toast.success('Signed out.')
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </SectionWrapper>
      </section>

      <section className="py-10">
        <SectionWrapper className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-6">
              <div className="text-xs text-slate-500">Total</div>
              <div className="mt-2 text-3xl font-black text-primary">{stats.total}</div>
            </Card>
            <Card className="p-6">
              <div className="text-xs text-slate-500">Pending</div>
              <div className="mt-2 text-3xl font-black text-primary">{stats.pending}</div>
            </Card>
            <Card className="p-6">
              <div className="text-xs text-slate-500">Processed</div>
              <div className="mt-2 text-3xl font-black text-primary">{stats.processed}</div>
            </Card>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              {isLoading ? 'Loading…' : `${items.length} request(s)`}
            </div>
            <Button variant="secondary" onClick={refresh}>
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <Card className="p-6">
              <div className="text-sm text-slate-600">Loading quote requests…</div>
            </Card>
          ) : items.length === 0 ? (
            <Card className="p-6">
              <div className="text-sm text-slate-600">No quote requests yet.</div>
            </Card>
          ) : (
            <div className="grid gap-4">
              {items.map((q) => (
                <Card key={q._id} className="p-0 overflow-hidden hover:shadow-xl hover:shadow-slate-900/5 transition-all">
                  <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-primary font-extrabold">{q.pickupLocation}</div>
                        <div className="text-slate-400">→</div>
                        <div className="text-primary font-extrabold">{q.deliveryLocation}</div>
                        <span
                          className={[
                            'ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-bold ring-1',
                            q.status === 'processed'
                              ? 'bg-emerald-500/10 text-emerald-700 ring-emerald-400/30'
                              : 'bg-accent-500/15 text-accent-700 ring-accent-500/30'
                          ].join(' ')}
                        >
                          {q.status}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-slate-600">
                        {q.goodsType} · {q.weight} kg · {q.date ? new Date(q.date).toLocaleDateString() : '—'}
                      </div>
                      <div className="mt-4 grid gap-1 text-sm text-slate-600">
                        <div>
                          <span className="text-slate-800 font-semibold">Name:</span> {q.name}
                        </div>
                        <div>
                          <span className="text-slate-800 font-semibold">Email:</span> {q.email}
                        </div>
                        <div>
                          <span className="text-slate-800 font-semibold">Phone:</span> {q.phone || '—'}
                        </div>
                        {q.notes ? (
                          <div className="pt-2">
                            <span className="text-slate-800 font-semibold">Notes:</span> {q.notes}
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-4 text-xs text-slate-500">Created: {formatDate(q.createdAt)}</div>
                    </div>

                    <div className="flex shrink-0 flex-row sm:flex-col gap-2">
                      <button
                        type="button"
                        disabled={actionId === q._id || q.status === 'processed'}
                        onClick={() => markProcessed(q._id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-400/30 px-4 py-2 text-sm font-semibold hover:bg-emerald-500/15 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <Check className="h-4 w-4" />
                        Processed
                      </button>
                      <button
                        type="button"
                        disabled={actionId === q._id}
                        onClick={() => remove(q._id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/10 text-red-700 ring-1 ring-red-400/20 px-4 py-2 text-sm font-semibold hover:bg-red-500/15 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </SectionWrapper>
      </section>
    </div>
  )
}


import { api } from './api.js'

export async function createQuoteRequest(payload) {
  const res = await api.post('/api/quotes', payload)
  return res.data
}

export async function listQuoteRequests() {
  const res = await api.get('/api/quotes')
  return res.data
}

export async function updateQuoteRequestStatus(id, status) {
  const res = await api.put(`/api/quotes/${id}`, { status })
  return res.data
}

export async function deleteQuoteRequest(id) {
  const res = await api.delete(`/api/quotes/${id}`)
  return res.data
}


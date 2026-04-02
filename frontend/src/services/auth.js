import { api } from './api.js'

export async function loginAdmin({ email, password }) {
  const res = await api.post('/api/auth/login', { email, password })
  return res.data
}


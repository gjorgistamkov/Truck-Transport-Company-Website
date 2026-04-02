import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { setAuthToken } from '../services/api.js'

const AuthContext = createContext(null)

const STORAGE_KEY = 'di-vi-auth'

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { token: null, adminEmail: null }
    const parsed = JSON.parse(raw)
    return {
      token: typeof parsed?.token === 'string' ? parsed.token : null,
      adminEmail: typeof parsed?.adminEmail === 'string' ? parsed.adminEmail : null
    }
  } catch {
    return { token: null, adminEmail: null }
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth)

  useEffect(() => {
    setAuthToken(auth.token)
  }, [auth.token])

  const value = useMemo(() => {
    const isAuthenticated = Boolean(auth.token)

    function login({ token, adminEmail }) {
      const next = { token, adminEmail }
      setAuth(next)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }

    function logout() {
      setAuth({ token: null, adminEmail: null })
      localStorage.removeItem(STORAGE_KEY)
    }

    return { ...auth, isAuthenticated, login, logout }
  }, [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


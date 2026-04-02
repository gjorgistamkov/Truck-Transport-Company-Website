const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')

const { buildAuthRoutes } = require('./routes/authRoutes')
const { buildQuoteRoutes } = require('./routes/quoteRoutes')
const { errorHandler } = require('./middleware/errorHandler')
const { notFound } = require('./middleware/notFound')

function createApp(env) {
  const app = express()

  app.use(helmet())
  app.use(
    cors({
      origin: env.CORS_ORIGIN.split(',').map((s) => s.trim()),
      credentials: true
    })
  )
  app.use(express.json({ limit: '1mb' }))
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))

  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false
    })
  )

  app.get('/health', (_req, res) => res.json({ ok: true }))

  app.use('/api/auth', buildAuthRoutes(env))
  app.use('/api/quotes', buildQuoteRoutes(env))

  app.use(notFound)
  app.use(errorHandler)

  return app
}

module.exports = { createApp }


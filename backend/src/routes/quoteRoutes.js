const express = require('express')
const { createQuoteController } = require('../controllers/quoteController')
const { requireAuth } = require('../middleware/auth')

function buildQuoteRoutes(env) {
  const router = express.Router()
  const controller = createQuoteController(env)

  router.post('/', controller.create)
  router.get('/', requireAuth(env), controller.list)
  router.put('/:id', requireAuth(env), controller.update)
  router.delete('/:id', requireAuth(env), controller.remove)

  return router
}

module.exports = { buildQuoteRoutes }


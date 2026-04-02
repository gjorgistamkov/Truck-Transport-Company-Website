const express = require('express')
const { createAuthController } = require('../controllers/authController')

function buildAuthRoutes(env) {
  const router = express.Router()
  const controller = createAuthController(env)

  router.post('/login', controller.login)

  return router
}

module.exports = { buildAuthRoutes }


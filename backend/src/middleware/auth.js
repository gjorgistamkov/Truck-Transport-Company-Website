const jwt = require('jsonwebtoken')
const { HttpError } = require('../utils/httpError')

function requireAuth(env) {
  return function authMiddleware(req, _res, next) {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : null
    if (!token) return next(new HttpError(401, 'Missing authorization token'))

    try {
      const payload = jwt.verify(token, env.JWT_SECRET)
      req.auth = payload
      return next()
    } catch {
      return next(new HttpError(401, 'Invalid or expired token'))
    }
  }
}

module.exports = { requireAuth }


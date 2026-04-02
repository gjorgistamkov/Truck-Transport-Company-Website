const { HttpError } = require('../utils/httpError')

function errorHandler(err, _req, res, _next) {
  const statusCode = err instanceof HttpError ? err.statusCode : 500
  const message = err?.message || 'Unexpected error'
  const details = err instanceof HttpError ? err.details : undefined

  res.status(statusCode).json({
    message,
    ...(details ? { details } : {})
  })
}

module.exports = { errorHandler }


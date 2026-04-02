const jwt = require('jsonwebtoken')
const { z } = require('zod')
const { Admin } = require('../models/Admin')
const { HttpError } = require('../utils/httpError')

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

function buildToken(env, admin) {
  return jwt.sign({ sub: admin._id.toString(), email: admin.email }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  })
}

function createAuthController(env) {
  return {
    async login(req, res, next) {
      try {
        const body = loginSchema.safeParse(req.body)
        if (!body.success) {
          return next(new HttpError(400, 'Invalid login payload', body.error.flatten()))
        }

        const admin = await Admin.findOne({ email: body.data.email.toLowerCase() })
        if (!admin) return next(new HttpError(401, 'Invalid email or password'))

        const ok = await admin.verifyPassword(body.data.password)
        if (!ok) return next(new HttpError(401, 'Invalid email or password'))

        const token = buildToken(env, admin)
        return res.json({ token, admin: { email: admin.email } })
      } catch (err) {
        return next(err)
      }
    }
  }
}

module.exports = { createAuthController }


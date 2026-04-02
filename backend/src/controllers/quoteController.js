const { z } = require('zod')
const { QuoteRequest } = require('../models/QuoteRequest')
const { HttpError } = require('../utils/httpError')
const { sendQuoteEmailNotification } = require('../utils/mailer')

const createSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  pickupLocation: z.string().min(1),
  deliveryLocation: z.string().min(1),
  goodsType: z.string().min(1),
  weight: z.number().nonnegative(),
  date: z.coerce.date(),
  notes: z.string().optional().nullable()
})

const updateSchema = z.object({
  status: z.enum(['pending', 'processed'])
})

function createQuoteController(env) {
  return {
    async create(req, res, next) {
      try {
        const parsed = createSchema.safeParse(req.body)
        if (!parsed.success) {
          return next(new HttpError(400, 'Invalid quote payload', parsed.error.flatten()))
        }

        const doc = await QuoteRequest.create({
          ...parsed.data,
          phone: parsed.data.phone || undefined,
          notes: parsed.data.notes || undefined
        })

        sendQuoteEmailNotification(env, doc).catch(() => {})

        return res.status(201).json({ item: doc })
      } catch (err) {
        return next(err)
      }
    },

    async list(_req, res, next) {
      try {
        const items = await QuoteRequest.find().sort({ createdAt: -1 }).lean()
        return res.json({ items })
      } catch (err) {
        return next(err)
      }
    },

    async update(req, res, next) {
      try {
        const id = req.params.id
        if (!id) return next(new HttpError(400, 'Missing id'))

        const parsed = updateSchema.safeParse(req.body)
        if (!parsed.success) {
          return next(new HttpError(400, 'Invalid update payload', parsed.error.flatten()))
        }

        const updated = await QuoteRequest.findByIdAndUpdate(
          id,
          { $set: { status: parsed.data.status } },
          { new: true }
        )
        if (!updated) return next(new HttpError(404, 'Quote request not found'))

        return res.json({ item: updated })
      } catch (err) {
        return next(err)
      }
    },

    async remove(req, res, next) {
      try {
        const id = req.params.id
        if (!id) return next(new HttpError(400, 'Missing id'))

        const deleted = await QuoteRequest.findByIdAndDelete(id)
        if (!deleted) return next(new HttpError(404, 'Quote request not found'))

        return res.json({ ok: true })
      } catch (err) {
        return next(err)
      }
    }
  }
}

module.exports = { createQuoteController }


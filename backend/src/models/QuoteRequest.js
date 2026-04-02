const mongoose = require('mongoose')

const quoteRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    pickupLocation: { type: String, required: true, trim: true },
    deliveryLocation: { type: String, required: true, trim: true },
    goodsType: { type: String, required: true, trim: true },
    weight: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
    notes: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'processed'], default: 'pending' }
  },
  { timestamps: true }
)

const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema)

module.exports = { QuoteRequest }


const nodemailer = require('nodemailer')

function canSend(env) {
  return Boolean(env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS && env.SMTP_FROM)
}

function createTransport(env) {
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: Number(env.SMTP_PORT) === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS
    }
  })
}

async function sendQuoteEmailNotification(env, quote) {
  if (!canSend(env)) return

  const transport = createTransport(env)
  const subject = `New quote request: ${quote.pickupLocation} → ${quote.deliveryLocation}`

  const lines = [
    `Name: ${quote.name}`,
    `Email: ${quote.email}`,
    `Phone: ${quote.phone || '-'}`,
    `Pickup: ${quote.pickupLocation}`,
    `Delivery: ${quote.deliveryLocation}`,
    `Goods: ${quote.goodsType}`,
    `Weight: ${quote.weight} kg`,
    `Date: ${new Date(quote.date).toISOString().slice(0, 10)}`,
    `Notes: ${quote.notes || '-'}`,
    `Status: ${quote.status}`
  ]

  await transport.sendMail({
    from: env.SMTP_FROM,
    to: env.SMTP_FROM,
    subject,
    text: lines.join('\n')
  })
}

module.exports = { sendQuoteEmailNotification }


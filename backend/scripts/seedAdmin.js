require('dotenv').config()

const { loadEnv } = require('../src/config/env')
const { connectDb } = require('../src/config/db')
const { Admin } = require('../src/models/Admin')

async function seed() {
  const env = loadEnv()
  await connectDb(env.MONGO_URI)

  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    // eslint-disable-next-line no-console
    console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment')
    process.exit(1)
  }

  const normalizedEmail = String(email).toLowerCase().trim()
  const existing = await Admin.findOne({ email: normalizedEmail })
  if (existing) {
    // eslint-disable-next-line no-console
    console.log('Admin already exists:', normalizedEmail)
    return
  }

  const passwordHash = await Admin.hashPassword(String(password))
  await Admin.create({ email: normalizedEmail, passwordHash })
  // eslint-disable-next-line no-console
  console.log('Admin created:', normalizedEmail)
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exit(1)
  })


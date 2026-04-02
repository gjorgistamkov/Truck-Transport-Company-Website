require('dotenv').config()

const { loadEnv } = require('./config/env')
const { connectDb } = require('./config/db')
const { createApp } = require('./app')

async function start() {
  const env = loadEnv()
  await connectDb(env.MONGO_URI)

  const app = createApp(env)
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${env.PORT}`)
  })
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})


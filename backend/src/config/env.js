const { z } = require('zod')

const envSchema = z.object({
  NODE_ENV: z.string().optional().default('development'),
  PORT: z.coerce.number().int().positive().optional().default(5000),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  JWT_SECRET: z.string().min(20, 'JWT_SECRET must be at least 20 characters'),
  JWT_EXPIRES_IN: z.string().optional().default('7d'),
  CORS_ORIGIN: z.string().optional().default('http://localhost:5173'),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional()
})

function loadEnv() {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('\n')
    // eslint-disable-next-line no-console
    console.error(`Invalid environment variables:\n${issues}`)
    process.exit(1)
  }
  return parsed.data
}

module.exports = { loadEnv }


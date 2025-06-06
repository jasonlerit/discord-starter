/* eslint-disable no-console */
/* eslint-disable n/no-process-env */

import { z, ZodError } from "zod/v4"

import { Environment } from "@/common/types/environment.type"

export const EnvSchema = z.object({
  NODE_ENV: z.string().default(Environment.DEVELOPMENT),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
  DISCORD_TOKEN: z.string(),
})

type env = z.infer<typeof EnvSchema>

let env: env

try {
  env = EnvSchema.parse(process.env)
} catch (e) {
  const error = e as ZodError
  console.error("❌ Invalid env:", z.flattenError(error))
  process.exit(1)
}

export default env

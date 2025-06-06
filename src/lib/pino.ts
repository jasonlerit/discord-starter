import pino from "pino"
import pretty from "pino-pretty"

import env from "@/common/env"
import { Environment } from "@/common/types/environment.type"

export const logger = pino(
  {
    level: env.LOG_LEVEL,
  },
  env.NODE_ENV === Environment.PRODUCTION ? undefined : pretty()
)

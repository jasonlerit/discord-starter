import { type Client } from "discord.js"
import path from "path"

import { getFiles } from "@/common/utils/file.util"
import { logger } from "@/lib/pino"

export const modalHandler = async (client: Client) => {
  const dirPath = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "modals")
  const files = getFiles(dirPath)
  for (const file of files) {
    const importedFile = await import(file)
    for (const key in importedFile) {
      const data = importedFile[key]
      if (typeof data.content === "function" && typeof data.run === "function") {
        client.modals.set(data.content().data.custom_id, data)
      } else {
        logger.error(`Invalid modal: ${file}`)
      }
    }
  }
}

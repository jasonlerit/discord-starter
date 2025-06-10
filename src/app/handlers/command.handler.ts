import { Client, REST, Routes } from "discord.js"
import path from "path"

import env from "@/common/env"
import { getFiles } from "@/common/utils/file.util"
import { logger } from "@/lib/pino"

export const commandHandler = async (client: Client) => {
  const commands = []
  const dirPath = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "commands")
  const files = getFiles(dirPath)
  for (const file of files) {
    const importedFile = await import(file)
    if ("data" in importedFile && "execute" in importedFile) {
      commands.push(importedFile.data.toJSON())
      client.commands.set(importedFile.data.name, importedFile)
    } else {
      logger.error(`Invalid command: ${file}`)
    }
  }
  const rest = new REST().setToken(env.DISCORD_TOKEN)
  await rest.put(Routes.applicationCommands(env.DISCORD_CLIENT_ID), {
    body: commands,
  })
}

import "dotenv/config"
import { Client, GatewayIntentBits } from "discord.js"

import env from "@/common/env"
import { logger } from "@/lib/pino"

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.once("ready", () => {
  logger.info(`🤖 Discord bot ${client.user?.tag} is online in ${env.NODE_ENV} mode`)
})

client.on("messageCreate", (message) => {
  if (message.content === "!ping") {
    message.reply("🏓 Pong!")
  }
})

client.login(env.DISCORD_TOKEN)

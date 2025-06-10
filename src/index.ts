import "dotenv/config"
import { Client, Events, GatewayIntentBits } from "discord.js"

import { handleInteractionCreateEvent } from "@/app/events/interaction-create.event"
import { commandHandler } from "@/app/handlers/command.handler"
import { modalHandler } from "@/app/handlers/modal.handler"
import env from "@/common/env"
import { logger } from "@/lib/pino"

declare module "discord.js" {
  interface Client {
    commands: Map<string, Command>
    modals: Map<string, ModalInterface>
  }
  interface Command {
    name: string
    execute: (interaction: Interaction) => Promise<void>
  }
  interface ModalInterface {
    content: () => ModalBuilder
    run: (interaction: ModalSubmitInteraction) => Promise<void>
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.commands = new Map()
client.modals = new Map()

void commandHandler(client)
void modalHandler(client)

client.once("ready", () => {
  logger.info(`🤖 Discord bot ${client.user?.tag} is online in ${env.NODE_ENV} mode`)
})

client.on(Events.InteractionCreate, handleInteractionCreateEvent)

client.login(env.DISCORD_TOKEN)

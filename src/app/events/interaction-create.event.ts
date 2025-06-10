import { ChannelType, Interaction, MessageFlags } from "discord.js"

import { logger } from "@/lib/pino"

export const handleInteractionCreateEvent = async (interaction: Interaction) => {
  try {
    if (interaction.user.bot) return

    const client = interaction.client

    if (interaction.isChatInputCommand()) {
      if (interaction.channel?.type !== ChannelType.GuildText) {
        await interaction.reply({
          content: "Not allowed",
          flags: MessageFlags.Ephemeral,
        })
        return
      }

      const command = client.commands.get(interaction.commandName)

      if (command === undefined) {
        logger.warn(`No command matching ${interaction.commandName} was found.`)
        return
      }

      await command.execute(interaction)
      return
    }

    if (interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId)
      if (modal !== undefined) {
        void modal.run(interaction)
      }
      return
    }
  } catch (error) {
    logger.error(error)
  }
}

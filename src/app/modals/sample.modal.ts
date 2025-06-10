import {
  ActionRowBuilder,
  MessageFlags,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  ModalInterface,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js"

import { logger } from "@/lib/pino"

export const sampleModal: ModalInterface = {
  content: () => {
    return new ModalBuilder()
      .setCustomId("sample_modal")
      .setTitle("Sample Modal")
      .addComponents([
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          new TextInputBuilder().setCustomId("name").setLabel("Name").setStyle(TextInputStyle.Short)
        ),
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          new TextInputBuilder()
            .setCustomId("description")
            .setLabel("Description")
            .setStyle(TextInputStyle.Paragraph)
        ),
      ])
  },
  run: async (interaction: ModalSubmitInteraction) => {
    try {
      const guild = interaction.guild
      if (guild === null) return
      const channel = interaction.channel
      if (channel === null) return

      const name = interaction.fields.getTextInputValue("name")
      const description = interaction.fields.getTextInputValue("description")

      logger.info(name, description)

      await interaction.reply({
        content: "Done",
        flags: MessageFlags.Ephemeral,
      })
    } catch (error) {
      logger.error(error)
    }
  },
}

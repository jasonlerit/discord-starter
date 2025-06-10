import {
  ChannelType,
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js"

import { sampleModal } from "@/app/modals/sample.modal"

export const data = new SlashCommandBuilder().setName("sample").setDescription("Sample command")

export async function execute(interaction: ChatInputCommandInteraction) {
  if (interaction.user.bot) return

  if (interaction.channel?.type !== ChannelType.GuildText) {
    await interaction.reply({
      content: "Not allowed",
      flags: MessageFlags.Ephemeral,
    })
    return
  }

  await interaction.showModal(sampleModal.content())
}

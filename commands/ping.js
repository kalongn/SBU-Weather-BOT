/**
 * Discord Bot ping slash commands
 * @author Ka Long Ngai
 * Time wasted: ~10 mins
 */

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!"),
    async execute(interaction, client) {
        await interaction.reply({
            content: "Pong!",
            //ephemeral: true,
        })
    }
}
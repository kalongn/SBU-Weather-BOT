/**
 * Discord Bot echo slash commands
 * @author Ka Long Ngai
 * Time wasted: ~20 mins
 */

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Echos your input")
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("The message to echo")
                .setRequired(true)
        ),
    async execute(interaction, client) {
        await interaction.reply({
            content: interaction.options.getString("message"),
            //ephemeral:true,
        })
    }
}
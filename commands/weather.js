/**
 * Discord Bot Weather slash commands
 * @author Ka Long Ngai
 * Time wasted: ~3 hours
 */

const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const weather = require("weather-js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("weather")
        .setDescription("Report the weather base on your input location")
        .addStringOption((option) =>
            option
                .setName("location")
                .setDescription("The location to report weather")
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const location = interaction.options.getString("location");

        weather.find({ search: location, degreeType: "F" }, (error, result) => {
            if (error || location.length == 0) {
                console.log(error);
                return;
            }
            const data = result[0];
            const embed = new EmbedBuilder()
                .setTitle(`Weather at ` + location)
                .setColor(0x990000)
                .setThumbnail(data.current.imageUrl)
                .setTimestamp(Date.now())
                .addFields([
                    {
                        name: `City`,
                        value: data.location.name,
                        inline: true,
                    },
                    {
                        name: `Sky Condition`,
                        value: data.current.skytext,
                        inline: true,
                    },
                    {
                        name: `Temperature`,
                        value: data.current.temperature + `°F`,
                        inline: true,
                    },
                    {
                        name: `Wind Speed`,
                        value: data.current.windspeed,
                        inline: true,
                    },
                    {
                        name: `Timezone`,
                        value: `UTC` + data.location.timezone,
                        inline: true,
                    },
                    {
                        name: `Day`,
                        value: data.current.day,
                        inline: true,
                    },
                ]);
            interaction.reply({
                embeds: [embed]
            });
        });
    }
}
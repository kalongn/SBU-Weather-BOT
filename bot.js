/**
 * Discord Bot setup/run script
 * @author Ka Long Ngai
 * Time wasted: ~4 hours
 */

//getting the TOKEN from env file
require("dotenv").config();

//basic setup for the bots
const { Client, Collection } = require('discord.js');
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Route, Routes } = require("discord-api-types/v9");

const client = new Client(
    {
        intents:
            [
                'Guilds', 'GuildMessages', 'MessageContent'
            ]
    }
);

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const CLIENT_ID = client.user.id;
    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
    (async () => {
        try {
            if (process.env.ENV === "production") {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                console.log("Succesfully registered commands globally.");
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                    body: commands
                });
                console.log("Succesfully registered commands locally.");
            }
        } catch (err) {
            if (err) console.error(err);
        }
    })();
}
);

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction, client);
    } catch (err) {
        if (err) console.error(err);
        await interaction.reply({
            content: "An error has occured while executing the command.",
            ephemeral: true
        })
    }
});

//logging into the bot
client.login(process.env.TOKEN);
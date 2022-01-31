const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
const path = require("path");
const { CLIENT_ID, GUILD_ID, TOKEN } = require("./settings/config.js");

const commands = [];
readdirSync("./commands/").map(async dir => {
    readdirSync(`./commands/${dir}`).map(async (cmd) => {
        commands.push(require(path.join(__dirname, `./commands/${dir}/${cmd}`)));
    })
})

const rest = new REST({ version: "9" }).setToken(TOKEN);

(async () => {
    try {
        console.log("[INFOMATION] Start refresting application (/) commands.");
        await rest.put(
            // if you want to use global slashcommand use here => "Routes.applicationCommands(CLIENT_ID)"
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
           // Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        );
        console.log("[INFOMATION] Successfully refreshed application (/) commands.");
    } catch (error) {
        console.log(error);
    }
})();
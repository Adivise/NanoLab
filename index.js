const { Intents, Client, Collection } = require("discord.js");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});

client.config = require("./settings/config.js");
if(!client.token) client.token = client.config.TOKEN;

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

["slash", "commands"].forEach(x => client[x] = new Collection());
["loadEvents", "loadCommands"].forEach(file => require(`./handlers/${file}`)(client));

client.login(client.token)

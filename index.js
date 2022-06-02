const { Client, Collection } = require("discord.js");
const { GenshinKit } = require('@genshin-kit/core');

const client = new Client({ intents: 32767 });

/// Handlers
client.config = require("./settings/config.js");
client.dev = client.config.DEV_ID;
client.genshin = new GenshinKit();

/// Check config
if (!client.token) client.token = client.config.TOKEN;

client.incrementMaxListeners(10);

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

["slash"].forEach(x => client[x] = new Collection());
["loadEvents", "loadCommands", "loadDatabases", "loadCreate"].forEach(file => require(`./handlers/${file}`)(client));

client.login(client.token);
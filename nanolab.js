const { Client, Collection } = require("discord.js");
const { GenshinKit } = require('@genshin-kit/core');

class MainClient extends Client {
	 constructor() {
        super({
            shards: "auto",
            intents: 32767,
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
            },
        });

/// Handlers
this.config = require("./settings/config.js");
this.dev = this.config.DEV_ID;
this.genshin = new GenshinKit();
/// Check config
if (!this.token) this.token = this.config.TOKEN;

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

const client = this;

["slash"].forEach(x => client[x] = new Collection());
["loadEvents", "loadCommands", "loadDatabases", "loadGenshin"].forEach(file => require(`./handlers/${file}`)(client));

	}
		connect() {
        return super.login(this.token);
    };
};
module.exports = MainClient;
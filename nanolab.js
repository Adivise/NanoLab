const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { GenshinKit } = require('@genshin-kit/core');

class MainClient extends Client {
	 constructor() {
        super({
            shards: "auto",
            intents: [
              GatewayIntentBits.Guilds,
              GatewayIntentBits.GuildMembers,
              GatewayIntentBits.GuildMessages,
              GatewayIntentBits.GuildVoiceStates,
              GatewayIntentBits.MessageContent,
            ]
        });

        /// Handlers
        this.config = require("./settings/config.js");
        this.owner = this.config.OWNER_ID;
        this.dev = this.config.DEV_ID;
        this.color = this.config.EMBED_COLOR;
        this.genshin = new GenshinKit();
        /// Check config
        if (!this.token) this.token = this.config.TOKEN;

        process.on('unhandledRejection', error => console.log(error));
        process.on('uncaughtException', error => console.log(error));

        const client = this;

        ["slash"].forEach(x => client[x] = new Collection());
        ["loadEvent", "loadCommand", "loadDatabase"].forEach(file => require(`./handlers/${file}`)(client));

	}
		connect() {
        return super.login(this.token);
    };
};
module.exports = MainClient;
const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");

module.exports = {
    name: ["genshin", "info", "exploration"], // Base Commands!
    description: "Display all exploration",
    category: "Genshin",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false })

        const db = new Database("./settings/models/hoyolab.json", { databaseInObject: true });
        const database = await db.get(interaction.user.id);

        try {
            await client.CheckAndUpdate(interaction);

            const getData = await client.genshin.getUserInfo(database.hyv_uid);
            const world = getData.world_explorations;

            const embed = new EmbedBuilder()
                .setAuthor({ name: `World Exploration [${world.length}]`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: `${world[0].name}`, value: `${numberWithDot(world[0].exploration_percentage) || 0}%`, inline: true },
                    { name: `${world[1].name}`, value: `${numberWithDot(world[1].exploration_percentage) || 0}%`, inline: true },
                    { name: `${world[2].name}`, value: `${numberWithDot(world[2].exploration_percentage) || 0}%`, inline: true },
                    { name: `${world[3].name}`, value: `${numberWithDot(world[3].exploration_percentage) || 0}%`, inline: true },
                    { name: `${world[4].name}`, value: `${numberWithDot(world[4].exploration_percentage) || 0}%`, inline: true },
                    { name: `${world[5].name}`, value: `${numberWithDot(world[5].exploration_percentage) || 0}%`, inline: true },
                    { name: `${world[6].name}`, value: `${numberWithDot(world[6].exploration_percentage) || 0}%`, inline: true },
                    { name: `${world[7].name}`, value: `${numberWithDot(world[7].exploration_percentage) || 0}%`, inline: true }
                )
                .setColor(client.color)
                .setFooter({ text: `Requested by: ${interaction.user.tag} | UID: ${database.hyv_uid}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            return interaction.editReply({ embeds: [embed] });
        } catch (e) {
            return interaction.editReply("Something went wrong, Please try again with `/genshin login` | to correct uid and cookie!");
        }
    }
}

function numberWithDot(x) {
    return x.toString().slice(0, -1);
}

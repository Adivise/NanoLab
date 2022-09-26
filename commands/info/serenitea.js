const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");

module.exports = {
    name: ["genshin", "info", "serenitea"], // Base Commands!
    description: "Display you realtime in serenitea pot",
    category: "Genshin",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false })

        const db = new Database("./settings/models/hoyolab.json", { databaseInObject: true });
        const database = await db.get(interaction.user.id);

        try {
            await client.CheckAndUpdate(interaction);

            const getData = await client.genshin.getUserInfo(database.hyv_uid);
            const home = getData.homes[0];

            const embed = new EmbedBuilder()
                .setAuthor({ name: `Serenitea Pot [${home.comfort_level_name}]`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(home.comfort_level_icon)
                .addFields(
                    { name: "Realm Layout:", value: `${home.name}`, inline: true },
                    { name: "Trust Rank:", value: `${home.level}`, inline: true },
                    { name: "Highest Adeptal Energy:", value: `${home.comfort_num}`, inline: true },
                    { name: "Total Furnishings Obtained:", value: `${home.item_num}`, inline: true },
                    { name: "Visit History:", value: `${home.visit_num}`, inline: true }
                )
                .setColor(client.color)
                .setFooter({ text: `Requested by: ${interaction.user.tag} | UID: ${database.hyv_uid}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            return interaction.editReply({ embeds: [embed] });
        } catch (e) {
            return interaction.editReply("Something went wrong, Please try again with `/genshin login` | to correct uid and cookie!");
        }
    }
}

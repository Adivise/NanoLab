const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");

module.exports = {
    name: ["genshin", "info", "summary"], // Base Commands!
    description: "Display all you achievements",
    category: "Genshin",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false })

        const db = new Database("./settings/models/hoyolab.json", { databaseInObject: true });
        const database = await db.get(interaction.user.id);

        try {
            await client.CheckAndUpdate(interaction, interaction.user.id);

            const getData = await client.genshin.getUserInfo(database.hyv_uid);
            const stats = getData.stats;

            const embed = new EmbedBuilder()
                .setAuthor({ name: "Summary", iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: "Days Active:", value: `${stats.active_day_number}`, inline: true },
                    { name: "Achievements:", value: `${stats.achievement_number}`, inline: true },
                    { name: "Characters:", value: `${stats.avatar_number}`, inline: true },
                    { name: "Waypoints Unlocked:", value: `${stats.way_point_number}`, inline: true },
                    { name: "Anemoculi:", value: `${stats.anemoculus_number}`, inline: true },
                    { name: "Geoculi:", value: `${stats.geoculus_number}`, inline: true },
                    { name: "Electroculi:", value: `${stats.electroculus_number}`, inline: true },
                    { name: "Domains Unlocked:", value: `${stats.domain_number}`, inline: true },
                    { name: "Spiral Abyss:", value: `${stats.spiral_abyss}`, inline: true },
                    { name: "Luxurious Chests Opened:", value: `${stats.luxurious_chest_number}`, inline: true },
                    { name: "Precious Chests Opened:", value: `${stats.precious_chest_number}`, inline: true },
                    { name: "Exquisite Chests Opened:", value: `${stats.exquisite_chest_number}`, inline: true },
                    { name: "Common Chests Opened:", value: `${stats.common_chest_number}`, inline: true },
                    { name: "Remarkable Chests Opened:", value: `${stats.magic_chest_number}`, inline: true }
                    )
                .setColor(client.color)
                .setFooter({ text: `Requested by: ${interaction.user.tag} | UID: ${database.hyv_uid}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            return interaction.editReply({ embeds: [embed] });
        } catch (e) {
            return interaction.editReply("Something went wrong, Please try again with `/genshin login` | to correct uid and cookie!");
        }
    }
}

const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");

module.exports = {
    name: ["genshin", "abyss", "current"], // Base Commands!
    description: "Display Current Abyss Stats",
    category: "Genshin",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false })

        const db = new Database("./settings/models/hoyolab.json", { databaseInObject: true });
        const database = await db.get(interaction.user.id);

        try {
            await client.CheckAndUpdate(interaction);

            const getData = await client.genshin.getSpiralAbyss(database.hyv_uid, 1);

            const format = (date) => {
                const d = new Date(date * 1000);
                return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
            }

            const embed = new EmbedBuilder()
                .setAuthor({ name: `[Current] Spiral Abyss`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(getData.damage_rank[0].avatar_icon)
                .addFields(
                    { name: "Deepest Descent:", value: `${getData.max_floor}`, inline: true },
                    { name: "Battles Fought:", value: `${getData.total_battle_times}`, inline: true },
                    { name: "Battles Won:", value: `${getData.total_win_times}`, inline: true },
                    { name: "Total Star:", value: `${getData.total_star}`, inline: true },
                    { name: "Period:", value: `${format(getData.start_time)} - ${format(getData.end_time)}`, inline: true }
                )
                .setColor(client.color)
                .setFooter({ text: `Requested by: ${interaction.user.tag} | UID: ${database.hyv_uid}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            return interaction.editReply({ embeds: [embed] });
        } catch (e) {
            return interaction.editReply("Something went wrong, `please wait api update` or `you not do abyss` and not login `/genshin login` to login first.");
        }
    }
}

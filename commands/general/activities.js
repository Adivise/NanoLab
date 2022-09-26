const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");

module.exports = {
    name: ["genshin", "activities"], // Base Commands!
    description: "Display you realtime stat in game",
    category: "Genshin",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false })

        const db = new Database("./settings/models/hoyolab.json", { databaseInObject: true });
        const database = await db.get(interaction.user.id);

        try {
            await client.CheckAndUpdate(interaction);

            const getData = await client.genshin.getDailyNote(database.hyv_uid);

            // Format time remaining resin
            const timeRemaining = getData.resin_recovery_time;
            const timeRemainingFormatted = {
                days: Math.floor(timeRemaining / 86400),
                hours: Math.floor((timeRemaining % 86400) / 3600),
                minutes: Math.floor((timeRemaining % 3600) / 60)
            }
            const TString = `${timeRemainingFormatted.days}d ${timeRemainingFormatted.hours}h ${timeRemainingFormatted.minutes}m`;

            // Format time remaining realm
            const timeRemaining2 = getData.home_coin_recovery_time;
            const timeRemainingFormatted2 = {
                days: Math.floor(timeRemaining2 / 86400),
                hours: Math.floor((timeRemaining2 % 86400) / 3600),
                minutes: Math.floor((timeRemaining2 % 3600) / 60)
            }
            const TString2 = `${timeRemainingFormatted2.days}d ${timeRemainingFormatted2.hours}h ${timeRemainingFormatted2.minutes}m`;

            const embed = new EmbedBuilder()
                .setAuthor({ name: "Realtime", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: "Current Resin:", value: `${getData.current_resin}/${getData.max_resin}`, inline: true },
                    { name: "Resin Recovery:", value: `${TString}`, inline: true },
                    { name: "Daily Quest:", value: `${getData.finished_task_num}/${getData.total_task_num} \`${getData.is_extra_task_reward_received ? "✅" : "❌"}\``,  inline: true },
                    { name: "Expedition:", value: `${getData.current_expedition_num}/${getData.max_expedition_num}`,  inline: true },
                    { name: "Realm Currency:", value: `${getData.current_home_coin}/${getData.max_home_coin}`, inline: true },
                    { name: "Realm Recovery:", value: `${TString2}`,  inline: true }
                )
                .setColor(client.color)
                .setFooter({ text: `Requested by: ${interaction.user.tag} | UID: ${database.hyv_uid}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            return interaction.editReply({ embeds: [embed] });
        } catch (e) {
            return interaction.editReply("Something went wrong, Please try again with `/genshin login` | to correct uid and cookie!");
        }
    }
}

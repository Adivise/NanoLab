const { EmbedBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");

module.exports = {
    name: ["genshin", "login"], // Base Commands!
    description: "Login to genshin impact!",
    category: "Genshin",
    run: async (client, interaction) => {
        const hoyo_uid = new TextInputBuilder()
            .setLabel("Genshin UID?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Enter your song name/link!")
            .setCustomId("uid")
            .setRequired(true)
        const hoyo_cookie = new TextInputBuilder()
            .setLabel("Genshin Cookie?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Enter your channel id!")
            .setCustomId("cookie")
            .setRequired(true)

        const modal = new ModalBuilder()
            .setCustomId("logins")
            .setTitle("Genshin Impact - Login")
            .setComponents(
                new ActionRowBuilder().addComponents(hoyo_uid),
                new ActionRowBuilder().addComponents(hoyo_cookie),
            )

        await interaction.showModal(modal);

        const collector = await interaction.awaitModalSubmit({ 
            time: 60000,
            filter: i => i.user.id === interaction.user.id 
        }).catch(error => {
            return null;
        });

        if (collector) {
            await collector.reply("`Success Submit...`");

            const value = collector.fields;

            await client.FillCookies(interaction, value.getTextInputValue("uid"), value.getTextInputValue("cookie"));

            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setTitle('Login - Success')
                .setDescription('You have successfully logged in! \n```You can use /genshin login | Again to switch another account.```')
                .addFields(
                    { name: 'UID', value: '\`\`\`' + collector.fields.getTextInputValue("uid") + '\`\`\`', inline: false },
                    { name: 'Cookie', value: '\`\`\`SECRET COOKIE!\`\`\`', inline: false }
                    )
                .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()});
        
            await interaction.channel.send({ embeds:[embed] })
        }
    }
}

const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { GenPage } = require("../../structures/Pageination.js");
const { Database } = require("st.db");

module.exports = {
    name: ["genshin", "character", "lists"], // Base Commands!
    description: "Display your all characters lists in game",
    category: "Genshin",
    options: [
        {
            name: "page",
            description: "The page you want to get information about.",
            type: ApplicationCommandOptionType.Integer,
            required: false,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false })

        const db = new Database("./settings/models/hoyolab.json", { databaseInObject: true });
        const database = await db.get(interaction.user.id);

        try {
            await client.CheckAndUpdate(interaction);

            const args = interaction.options.getInteger("page");
            const getData = await client.genshin.getAllCharacters(database.hyv_uid);

            let pagesNum = Math.ceil(getData.length / 10);
            if(pagesNum === 0) pagesNum = 1;

            const CharacString = [];
            for (let i = 0; i < getData.length; i++) {
                const obj = getData[i];
                CharacString.push(`\`\`\`${i + 1}. ${obj.name} (Lvl.${obj.level})\`\`\``);
            }
            const pages = [];
            for (let i = 0; i < pagesNum; i++) {
                const str = CharacString.slice(i * 10, i * 10 + 10).join('');
    
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `List Characters [${getData.length}]`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                    .setColor(client.color)
                    .setDescription(`${str == '' ? '  Nothing' : '\n' + str}`)
                    .setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${getData.length} • Total Characters`});

                pages.push(embed);
            }

            if (!args) {
                if (pages.length == pagesNum && getData.length > 1) GenPage(client, interaction, pages, 120000, getData.length);
                else return interaction.editReply({ embeds: [pages[0]] });
            }
            else {
                if (isNaN(args)) return interaction.editReply('Page must be a number.');
                if (args > pagesNum) return interaction.editReply(`There are only ${pagesNum} pages available.`);
                const pageNum = args == 0 ? 1 : args - 1;
                return interaction.editReply({ embeds: [pages[pageNum]] });
            }
        } catch (e) {
            return interaction.editReply("Something went wrong, Please try again with `/genshin login` | to correct uid and cookie!");
        }
    }
}

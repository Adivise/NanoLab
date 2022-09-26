const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { GenPage } = require("../../structures/Pageination.js");
const { Database } = require("st.db");

module.exports = {
    name: ["genshin", "character", "details"], // Base Commands!
    description: "Display your all characters details in game",
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
            
            let pagesNum = Math.ceil(getData.length / 1);
            if(pagesNum === 0) pagesNum = 1;

            const CharacString = {};
            for (let i = 0; i < getData.length; i++) {
                const obj = getData[i];
                CharacString[i] = obj;
            }
    
            const pages = [];
            for (let i = 0; i < pagesNum; i++) {
                const str = CharacString[i];
    
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `Detail Characters [${getData.length}]`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(str.image)
                    .setColor(client.color)
                    .setDescription(`Use the \`/genshin\` to get more information.`)
                    .addFields(
                        { name: "Name:", value: `${str.name}`, inline: true },
                        { name: "Level:", value: `${str.level} \`⬆\``, inline: true },
                        { name: "Element:", value: `${str.element} \`🌎\``, inline: true },
                        { name: "Rarity:", value: `${str.rarity} \`⭐\``, inline: true },
                        { name: "Constellation:", value: `${str.actived_constellation_num}/${str.constellations.length} \`🌠\``, inline: true },
                        { name: "Fetter:", value: `${str.fetter} \`📑\``, inline: true },
                        { name: "Equipment:", value: `[R${str.weapon.affix_level}] ${str.weapon.name} (Lvl.${str.weapon.level})`, inline: true }
                        )
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

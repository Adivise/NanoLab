const { MessageEmbed } = require('discord.js');
const genshin = require('genshin-db');

module.exports = {
    name: "wiki",
    description: "Get genshin impact about from Wiki-fandom",
    options: [
        {
            name: "character",
            description: "search for character",
            type: 1,
            options: [
                {
                    name: "name",
                    description: "character name",
                    type: 3,
                    required: true
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        /// WIP ADD PAGEINATION SOON...

        if (interaction.options.getSubcommand() === "character") {
            const args = interaction.options.getString("name");
            const charac = await genshin.characters(args);
            const talent = await genshin.talents(args);
            const cons = await genshin.constellations(args);

            try {
                const characEmbed = new MessageEmbed()
                    .setAuthor({ name: charac.name + " [INFOMATION]", iconURL: charac.images.sideicon })
                    .setThumbnail(charac.images.icon)
                    .setColor("#000001")
                    .setDescription(`${charac.description}`)
                    .addFields(
                        { name: "Titles:", value: charac.title, inline: true },
                        { name: "Element:", value: charac.element, inline: true },
                        { name: "Weapon Type:", value: charac.weapontype, inline: true },
                        { name: "Grow Type:", value: charac.substat, inline: true },
                        { name: "Rarity:", value: charac.rarity + " 🌟", inline: true },
                        { name: "Gender:", value: charac.gender, inline: true },
                        { name: "Region:", value: charac.region, inline: true },
                        { name: "Birthday:", value: charac.birthday, inline: true },
                        { name: "Constellation:", value: charac.constellation, inline: true },
                        { name: "Affiliation:", value: charac.affiliation, inline: true }
                    )

                const talentEmbed = new MessageEmbed()
                    .setAuthor({ name: talent.name + " [TALENTS]", iconURL: charac.images.sideicon })
                    .setThumbnail(charac.images.icon)
                    .setColor("#000001")
                    .addFields(
                        { name: "🔪 Talent 1: " + talent.combat1.name, value: talent.combat1.info, inline: false },
                        { name: "🔪 Talent 2: " + talent.combat2.name, value: talent.combat2.info, inline: false },
                        { name: "🔪 Talent 3: " + talent.combat3.name, value: talent.combat3.info, inline: false }
                    );
                    
                const passiveEmbed = new MessageEmbed()
                    .setAuthor({ name: talent.name + " [PASSIVES]", iconURL: charac.images.sideicon })
                    .setThumbnail(charac.images.icon)
                    .setColor("#000001")
                    .addFields(
                        { name: "📑 Passive 1: " + talent.passive1.name, value: talent.passive1.info, inline: false },
                        { name: "📑 Passive 2: " + talent.passive2.name, value: talent.passive2.info, inline: false },
                        { name: "📑 Passive 3: " + talent.passive3.name, value: talent.passive3.info, inline: false }
                    )

                const constEmbed = new MessageEmbed()
                    .setAuthor({ name: cons.name + " [CONSTELLATIONS]", iconURL: charac.images.sideicon })
                    .setThumbnail(charac.images.icon)
                    .setColor("#000001")
                    .addFields(
                        { name: "🌠 Constellation 1: " + cons.c1.name, value: cons.c1.effect, inline: false },
                        { name: "🌠 Constellation 2: " + cons.c2.name, value: cons.c2.effect, inline: false },
                        { name: "🌠 Constellation 3: " + cons.c3.name, value: cons.c3.effect, inline: false }
                    )

                const constEmbed2 = new MessageEmbed()
                    .setColor("#000001")
                    .addFields(
                        { name: "🌠 Constellation 4: " + cons.c4.name, value: cons.c4.effect, inline: false },
                        { name: "🌠 Constellation 5: " + cons.c5.name, value: cons.c5.effect, inline: false },
                        { name: "🌠 Constellation 6: " + cons.c6.name, value: cons.c6.effect, inline: false }
                    )
                    .setFooter({ text: `Requested By: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp();

                const embed = [characEmbed, talentEmbed, passiveEmbed, constEmbed, constEmbed2];
        
                return interaction.editReply({ embeds: embed });
            } catch (err) {
                interaction.editReply("Character not found, Please try another name or again.");
            }
        }
    }
}
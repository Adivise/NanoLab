const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "eula",
    description: "View character of Eula",
    options: [
        {
            name: "type",
            description: "Type of character",
            type: 3,
            required: true,
            choices: [
                {
                    name: "INFORMATION",
                    value: "information"
                },
                {
                    name: "SKILL TALENTS",
                    value: "skilltalents"
                },
                {
                    name: "PASSIVE TALENTS",
                    value: "passtalents"
                },
                {
                    name: "CONSTELLATIONS",
                    value: "constellations"
                }
            ]
        }
    ],
    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });

        const genshin = await fetch("https://api.genshin.dev/characters/eula").then(res => res.json());
        const attachment = new MessageAttachment("./assets/characters/Eula.png", "genshin.png");

        if(interaction.options._hoistedOptions.find(c => c.value === "information")) {
            const formatBirthday = genshin.birthday.split("-");
            const birthday = new Date(formatBirthday[0], formatBirthday[1], formatBirthday[2]);
            const month = birthday.getMonth();
            const day = birthday.getDate();
                const embed = new MessageEmbed()
                .setAuthor({ name: genshin.name + " • [INFORMATION]" })
                .setThumbnail("attachment://genshin.png")
                .setColor("#000001")
                .setDescription(`**Rarity:** ${genshin.rarity || "Unknow"} Star \n**Description:** *${genshin.description || "Unknow"}*`)
                .addField("Weapon: ", `${genshin.weapon || "Unknow"}`, true)
                .addField("Gender:", `Female`, true)
                .addField("Birthday:", `${day || "Unknow"}/${month || "Unknow"}`, true)
                .addField("Title:", `${genshin.title || "Unknow"}`, true)
                .addField(`Vision:`, `${genshin.vision || "Unknow"}`, true)
                .addField("Nation:", `${genshin.nation || "Unknow"}`, true)
                .addField("Constellation:", `${genshin.constellation || "Unknow"}`, true)
                .addField("Affiliation:", `${genshin.affiliation || "Unknow"}`, true)
                .addField("SpecialDish:", `${genshin.specialDish || "Unknow"}`, true)
                .setFooter({ text: `Requested By: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
      
                interaction.editReply({ embeds: [embed], files: [attachment] });
            }
            if(interaction.options._hoistedOptions.find(c => c.value === "skilltalents")) {
                const tenlent = genshin.skillTalents;
                    const embed = new MessageEmbed()
                    .setAuthor({ name: genshin.name + " • [SKILL TALENTS]" })
                    .setThumbnail("attachment://genshin.png")
                    .setColor("#000001")
                    .addField(`${tenlent[0].name} • [\`${tenlent[0].unlock}\`]`, `*${tenlent[0].description}*`)
                    .addField(`${tenlent[1].name} • [\`${tenlent[1].unlock}\`]`, `*${tenlent[1].description}*`)
                    .addField(`${tenlent[2].name} • [\`${tenlent[2].unlock}\`]`, `*${tenlent[2].description}*`)
                    .setFooter({ text: `Requested By: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
          
                    interaction.editReply({ embeds: [embed], files: [attachment] });
                }
                if(interaction.options._hoistedOptions.find(c => c.value === "passtalents")) {
                    const tenlent = genshin.passiveTalents;
                        const embed = new MessageEmbed()
                        .setAuthor({ name: genshin.name + " • [PASSIVE TALENTS]" })
                        .setThumbnail("attachment://genshin.png")
                        .setColor("#000001")
                        .addField(`${tenlent[0].name} • [\`${tenlent[0].unlock}\`]`, `*${tenlent[0].description}*`)
                        .addField(`${tenlent[1].name} • [\`${tenlent[1].unlock}\`]`, `*${tenlent[1].description}*`)
                        .addField(`${tenlent[2].name} • [\`${tenlent[2].unlock}\`]`, `*${tenlent[2].description}*`)
                        .setFooter({ text: `Requested By: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
              
                        interaction.editReply({ embeds: [embed], files: [attachment] });
                    }
                    if(interaction.options._hoistedOptions.find(c => c.value === "constellations")) {
                        const tenlent = genshin.constellations;
                            const embed = new MessageEmbed()
                            .setAuthor({ name: genshin.name + " • [CONSTELLATIONS]" })
                            .setThumbnail("attachment://genshin.png")
                            .setColor("#000001")
                            .addField(`${tenlent[0].name} • [\`${tenlent[0].unlock}\`]`, `*${tenlent[0].description}*`)
                            .addField(`${tenlent[1].name} • [\`${tenlent[1].unlock}\`]`, `*${tenlent[1].description}*`)
                            .addField(`${tenlent[2].name} • [\`${tenlent[2].unlock}\`]`, `*${tenlent[2].description}*`)
                            .addField(`${tenlent[3].name} • [\`${tenlent[3].unlock}\`]`, `*${tenlent[3].description}*`)
                            .addField(`${tenlent[4].name} • [\`${tenlent[4].unlock}\`]`, `*${tenlent[4].description}*`)
                            .addField(`${tenlent[5].name} • [\`${tenlent[5].unlock}\`]`, `*${tenlent[5].description}*`)
                            .setFooter({ text: `Requested By: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
                  
                            interaction.editReply({ embeds: [embed], files: [attachment] });
                        }
    }
}
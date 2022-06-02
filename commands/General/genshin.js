const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Hoyoverse = require('../../settings/models/Hoyoverse.js');
const { GenPage } = require('../../structures/Pageination.js');

module.exports = {
    name: "genshin",
    description: "Get information about a user from Genshin",
    options: [
        {
            name: "information",
            description: "Get information about a user from Genshin",
            type: 2,
            options: [
                {
                    name: "summary",
                    description: "Get a summary of a user's Genshin stats",
                    type: 1,
                },
                {
                    name: "exploration",
                    description: "Get a summary of a world exploration",
                    type: 1,
                },
                {
                    name: "serenitea_pot",
                    description: "Get a summary of a Serenitea Pot",
                    type: 1,
                }
            ]
        },
        {
            name: "abyss",
            description: "Get a summary of a spiral abyss",
            type: 2,
            options: [
                {
                    name: "current_stats",
                    description: "Get a summary of a current spriral abyss",
                    type: 1,
                },
                {
                    name: "previous_stats",
                    description: "Get a summary of a previous spriral abyss",
                    type: 1,
                }
            ]
        },
        {
            name: "characters",
            description: "Get information about a character",
            type: 2,
            options: [
                {
                    name: "lists",
                    description: "Get a list of characters",
                    type: 1,
                    options: [
                        {
                            name: "page",
                            description: "The page you want to get information about.",
                            type: 4, /// 4 = Integer
                            required: false,
                        }
                    ]
                },
                {
                    name: "details",
                    description: "Get information about a character",
                    type: 1,
                    options: [
                        {
                            name: "page",
                            description: "The page you want to get information about.",
                            type: 4, /// 4 = Integer
                            required: false,
                        }
                    ]
                }
            ]
        },
        {
            name: "activities",
            description: "Get about a in game realtime stats",
            type: 1
        },
        {
            name: "login",
            description: "Login to Genshin Impact",
            type: 1
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const database = await Hoyoverse.findOne({ user_id: interaction.user.id });

        if (interaction.options.getSubcommand() === "summary") {
            /// Check User
            await client.CheckAndUpdate(interaction, interaction.user.id);

            const getData = await client.genshin.getUserInfo(database.hyv_uid);
            const stats = getData.stats;

            const embed = new MessageEmbed()
                .setAuthor({ name: "Summary", iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .addField("Days Active:", `${stats.active_day_number}`, true)
                .addField("Achievements:", `${stats.achievement_number}`, true)
                .addField("Characters:", `${stats.avatar_number}`, true)
                .addField("Waypoints Unlocked:", `${stats.way_point_number}`, true)
                .addField("Anemoculi:", `${stats.anemoculus_number}`, true)
                .addField("Geoculi:", `${stats.geoculus_number}`, true)
                .addField("Electroculi:", `${stats.electroculus_number}`, true)
                .addField("Domains Unlocked:", `${stats.domain_number}`, true)
                .addField("Spiral Abyss:", `${stats.spiral_abyss}`, true)
                .addField("Luxurious Chests Opened:", `${stats.luxurious_chest_number}`, true)
                .addField("Precious Chests Opened:", `${stats.precious_chest_number}`, true)
                .addField("Exquisite Chests Opened:", `${stats.exquisite_chest_number}`, true)
                .addField("Common Chests Opened:", `${stats.common_chest_number}`, true)
                .addField("Remarkable Chests Opened:", `${stats.magic_chest_number}`, true)
                .addField("Total Chests Opened:", `${stats.luxurious_chest_number + stats.precious_chest_number + stats.exquisite_chest_number + stats.common_chest_number + stats.magic_chest_number}`, true)
                .setColor("#000001")
                .setTimestamp()
                .setFooter({ text: `Requested by: ${interaction.user.tag} | UID: ${database.hyv_uid}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            return interaction.editReply({ embeds: [embed] });
        }

        if (interaction.options.getSubcommand() === "exploration") {
            /// Check User
            await client.CheckAndUpdate(interaction, interaction.user.id);

            const getData = await client.genshin.getUserInfo(database.hyv_uid);
            const world = getData.world_explorations;

            const embed = new MessageEmbed()
                .setAuthor({ name: `World Exploration [${world.length}]`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .addField(`${world[0].name}`, `${numberWithDot(world[0].exploration_percentage)}%`, true)
                .addField(`${world[1].name}`, `${numberWithDot(world[1].exploration_percentage)}%`, true)
                .addField(`${world[2].name}`, `${numberWithDot(world[2].exploration_percentage)}%`, true)
                .addField(`${world[3].name}`, `${numberWithDot(world[3].exploration_percentage)}%`, true)
                .addField(`${world[4].name}`, `${numberWithDot(world[4].exploration_percentage)}%`, true)
                .setColor("#000001")
                .setTimestamp()
                .setFooter({ text: `Requested by: ${interaction.user.tag} | UID: ${database.hyv_uid}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            return interaction.editReply({ embeds: [embed] });
        }

        if (interaction.options.getSubcommand() === "serenitea_pot") {
            /// Check User
            await client.CheckAndUpdate(interaction, interaction.user.id);

            const getData = await client.genshin.getUserInfo(database.hyv_uid);
            const home = getData.homes[0];

            const embed = new MessageEmbed()
                .setAuthor({ name: `Serenitea Pot [${home.comfort_level_name}]`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(home.comfort_level_icon)
                .addField("Realm Layout:", `${home.name}`, true)
                .addField("Trust Rank:", `${home.level}`, true)
                .addField("Highest Adeptal Energy:", `${home.comfort_num}`, true)
                .addField("Total Furnishings Obtained:", `${home.item_num}`, true)
                .addField("Visit History:", `${home.visit_num}`, true)
                .setColor("#000001")
                .setTimestamp()
                .setFooter({ text: `Requested by: ${interaction.user.tag} | UID: ${database.hyv_uid}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            return interaction.editReply({ embeds: [embed] });
        }

        if (interaction.options.getSubcommand() === "current_stats") {
            /// Check User
            await client.CheckAndUpdate(interaction, interaction.user.id);

            const getData = await client.genshin.getSpiralAbyss(database.hyv_uid, 1);

            const format = (date) => {
                const d = new Date(date * 1000);
                return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
            }

            const embed = new MessageEmbed()
                .setAuthor({ name: `[Current] Spiral Abyss`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(getData.damage_rank[0].avatar_icon)
                .addField("Deepest Descent:", `${getData.max_floor}`, true)
                .addField("Battles Fought:", `${getData.total_battle_times}`, true)
                .addField("Battles Won:", `${getData.total_win_times}`, true)
                .addField("Total Star:", `${getData.total_star}`, true)
                .addField("Period:", `${format(getData.start_time)} - ${format(getData.end_time)}`, true)
                .setColor("#000001")
                .setTimestamp()
                .setFooter({ text: `Requested by: ${interaction.user.tag} | UID: ${database.hyv_uid}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            return interaction.editReply({ embeds: [embed] });

        }

        if (interaction.options.getSubcommand() === "previous_stats") {
            /// Check User
            await client.CheckAndUpdate(interaction, interaction.user.id);

            const getData = await client.genshin.getSpiralAbyss(database.hyv_uid, 2);

            const format = (date) => {
                const d = new Date(date * 1000);
                return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
            }

            const embed = new MessageEmbed()
                .setAuthor({ name: `[Previous] Spiral Abyss`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .addField("Deepest Descent:", `${getData.max_floor}`, true)
                .addField("Battles Fought:", `${getData.total_battle_times}`, true)
                .addField("Battles Won:", `${getData.total_win_times}`, true)
                .addField("Total Star:", `${getData.total_star}`, true)
                .addField("Period:", `${format(getData.start_time)} - ${format(getData.end_time)}`, true)
                .setColor("#000001")
                .setTimestamp()
                .setFooter({ text: `Requested by: ${interaction.user.tag} | UID: ${database.hyv_uid}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            return interaction.editReply({ embeds: [embed] });

        }

        if (interaction.options.getSubcommand() === "details") {
            /// Check User
            await client.CheckAndUpdate(interaction, interaction.user.id);

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
    
                const embed = new MessageEmbed()
                    .setAuthor({ name: `Detail Characters [${getData.length}]`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(str.image)
                    .setColor("#000001")
                    .setDescription(`Use the \`/genshin\` to get more information.`)
                    .addField("Name:", `${str.name}`, true)
                    .addField("Level:", `${str.level} \`⬆\``, true)
                    .addField("Element:", `${str.element} \`🌎\``, true)
                    .addField("Rarity:", `${str.rarity} \`⭐\``, true)
                    .addField("Constellation:", `${str.actived_constellation_num}/${str.constellations.length} \`🌠\``, true)
                    .addField("Fetter:", `${str.fetter} \`📑\``, true)
                    .addField("Equipment:", `[R${str.weapon.affix_level}] ${str.weapon.name} (Lvl.${str.weapon.level})`, true)
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
        }

        if (interaction.options.getSubcommand() === "lists") {
            /// Check User
            await client.CheckAndUpdate(interaction, interaction.user.id);

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
    
                const embed = new MessageEmbed()
                    .setAuthor({ name: `List Characters [${getData.length}]`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                    .setColor("#000001")
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

        }

        if (interaction.options.getSubcommand() === "activities") {
            /// Check User
            await client.CheckAndUpdate(interaction, interaction.user.id);

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

            const embed = new MessageEmbed()
                .setAuthor({ name: "Realtime", iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .addField("Current Resin:", `${getData.current_resin}/${getData.max_resin}`, true)
                .addField("Resin Recovery:", `${TString}`, true)
                .addField("Daily Quest:", `${getData.finished_task_num}/${getData.total_task_num} \`${getData.is_extra_task_reward_received ? "✅" : "❌"}\``, true)
                .addField("Expedition:", `${getData.current_expedition_num}/${getData.max_expedition_num}`, true)
                .addField("Realm Currency:", `${getData.current_home_coin}/${getData.max_home_coin}`, true)
                .addField("Realm Recovery:", `${TString2}`, true)
                .setColor("#000001")
                .setTimestamp()
                .setFooter({ text: `Requested by: ${interaction.user.tag} | UID: ${database.hyv_uid}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            return interaction.editReply({ embeds: [embed] });
        }

        if (interaction.options.getSubcommand() === "login") {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setAuthor({ name: "Genshin Impact"})
                .setDescription("```Genshin Impact - Login```")
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()});
    
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("Click Here!")
                        .setURL(`http://localhost:80/`)
                        .setEmoji("🔗")
                        .setStyle("LINK")
                )
            
            return interaction.editReply({ embeds: [embed], components: [row] });
        }
    }
}

function numberWithDot(x) {
    return x.toString().slice(0, -1);
}
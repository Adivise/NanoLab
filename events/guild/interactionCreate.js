module.exports = async(client, interaction) => {
    if (interaction.isCommand()) {
        if (!client.slash.has(interaction.commandName)) return;
        if (!interaction.guild) return;
        const command = client.slash.get(interaction.commandName);
        if(!command) return;

        try {
            if (command.botPerms) {
                if (!interaction.guild.me.permissions.has(command.botPerms)) {  
                    return interaction.reply({ content: "Missing Permission!" + command.botPerms.join(", ") });
            }
        }
            command.run(interaction, client);

        } catch (e) {
            console.log(e)
            await interaction.reply({ content: "Something went wrong!", ephemeral: true });
        }
    }
}
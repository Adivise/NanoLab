const { DiscordModal } = require('discord-modal');

module.exports = async (client) => {
  console.log(`[+] ${client.user.tag} is ready!`);
  await DiscordModal(client);
}
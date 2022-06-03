const Dashbaord = require('../../dashboard/dashboard.js');

module.exports = async (client) => {
  console.log(`[+] ${client.user.tag} is ready!`);
  await Dashbaord(client);
}